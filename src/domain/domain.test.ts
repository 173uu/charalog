import { describe, expect, it } from 'vitest';
import { analyzeCardsInBatches } from '../core/analyzeCardBatch';
import { defaultApiConfig } from '../core/settingsStorage';
import { recallCandidateTags } from '../core/recallCandidateTags';
import dictionaryData from '../core/dictionary';
import { validateDictionary } from '../core/validateDictionary';
import { buildTasteProfile } from '../core/tasteProfile';
import { buildCardDigest } from '../core/cardDigest';
import { buildCardAnalysisInput, buildOpeningSummaryMap } from '../core/cardAnalysisInput';
import { matchChatToOpening } from './matching';
import { normalizeCharacterCard } from './normalize';
import { cleanCardText } from './textCleanup';
import { computeCharacterUsage } from './usage';
import { mockCharacterCards } from '../mock/cards';
import { mockChats } from '../mock/chats';
import { mockAnalysisResults, normalizedMockCards } from '../mock/profile';
import type { CharacterCardRaw, CharacterUsage } from './types';

describe('CharaLog MVP domain flow', () => {
  it('normalizes root and data fields while cleaning script/style noise', () => {
    const worldCard = normalizeCharacterCard(mockCharacterCards.find((card) => card.id === 'card-ash-city-lore')!);

    expect(worldCard.name).toBe('灰潮城世界观');
    expect(worldCard.cardType).toBe('world');
    expect(worldCard.creatorNotes).not.toContain('console.log');
    expect(worldCard.scenarioOpenings).toHaveLength(3);
  });

  it('preserves fenced YAML card text for AI evidence', () => {
    const card = normalizeCharacterCard({
      id: 'fenced-yaml-card',
      name: 'Fenced YAML Card',
      description:
        '<info><character>```yaml\nidentity: private heir\npersonality: controlled, distant, possessive\nrelationship: {{user}} is his cousin and protected weak point\nworld: old family business circle\n```</character></info>',
      first_mes:
        '```html\n<div><style>.x{color:red}</style><p>First scene says he is tense around {{user}} after a family dinner.</p></div>\n```',
      tags: [],
    });
    const input = buildCardAnalysisInput(card);

    expect(cleanCardText(card.rawCard.description)).toContain('personality');
    expect(card.description).toContain('relationship');
    expect(card.firstMessage).toContain('First scene');
    expect(input.cardDigest.sourceLengths.description).toBeGreaterThan(80);
    expect(input.cardDigest.sourceLengths.firstMes).toBeGreaterThan(20);
    expect(input.cardDigest.evidenceSections.some((section) => section.categoryHint === 'personality')).toBe(true);
    expect(input.cardDigest.evidenceSections.some((section) => section.categoryHint === 'relationship' && section.text.includes('{{user}}'))).toBe(true);
  });

  it('matches a chat to the closest local opening', () => {
    const zhang = normalizeCharacterCard(mockCharacterCards.find((card) => card.id === 'card-zhang-jingci')!);
    const contractChat = mockChats.find((chat) => chat.id === 'chat-zhang-2')!;
    const result = matchChatToOpening(contractChat, zhang.scenarioOpenings);

    expect(result.scenarioId).toBe('card-zhang-jingci-opening-alt-1');
    expect(result.confidence).toBeGreaterThan(0.9);
    expect(result.detectionMethod).toBe('first_role_message_similarity');
  });

  it('computes per-character and per-scenario usage', () => {
    const zhang = normalizeCharacterCard(mockCharacterCards.find((card) => card.id === 'card-zhang-jingci')!);
    const usage = computeCharacterUsage(mockChats, zhang.scenarioOpenings);

    expect(usage.chatCount).toBe(2);
    expect(usage.totalMessages).toBe(8);
    expect(usage.userMessages).toBe(3);
    expect(usage.scenarioStats.find((scenario) => scenario.scenarioId.endsWith('alt-1'))?.totalMessages).toBe(5);
  });

  it('recalls local dictionary tags from the real dictionary', () => {
    const zhang = normalizeCharacterCard(mockCharacterCards.find((card) => card.id === 'card-zhang-jingci')!);
    const candidates = recallCandidateTags(zhang);
    const pull = candidates.find((tag) => tag.label === '拉扯');

    expect(pull?.scopeHint).toBe('card');
    expect(pull?.matchedFields).toContain('rawTags');
  });

  it('does not recall short Latin tags from partial CSS or English words', () => {
    const card = normalizeCharacterCard({
      id: 'short-latin-boundary-card',
      name: 'Short Latin Boundary',
      description: 'The card uses blue, black, block and blur as UI words, but it never says the orientation tag.',
      first_mes: '<div class="blue-black-block blur">opening shell</div>',
      alternate_greetings: ['background color blue; display: block;'],
      tags: [],
    });
    const candidates = recallCandidateTags(card);

    expect(candidates.find((tag) => tag.label === 'BL')).toBeUndefined();
  });

  it('does not treat first_mes worldbook instructions as a world card', () => {
    const card = normalizeCharacterCard({
      id: 'worldbook-instruction-character-card',
      name: 'Instruction Character',
      description: 'identity: bankrupt graduate student. personality: social, humorous, privately detached.',
      first_mes: '玩法说明：世界书默认关闭。1. 现任线 2. 前任线 3. 生日线',
      alternate_greetings: ['opening one', 'opening two', 'opening three'],
      tags: [],
    });
    const input = buildCardAnalysisInput(card);

    expect(card.cardType).toBe('multi_scenario');
    expect(input.cardDigest.evidenceSections.some((section) => section.sourceType === 'extensionsWorld')).toBe(false);
  });

  it('ignores negated and incidental dictionary term hits', () => {
    const card = normalizeCharacterCard({
      id: 'incidental-term-card',
      name: 'Incidental Term Test',
      description:
        'personality: 他并不毒舌，只是幽默。童年经历让他养成了稳定的好脾气。父母对他道德绑架式溺爱。digital society direction.',
      first_mes: 'A normal opening.',
      tags: [],
    });
    const labels = recallCandidateTags(card).map((tag) => tag.label);

    expect(labels).not.toContain('毒舌');
    expect(labels).not.toContain('养成');
    expect(labels).not.toContain('老婆奴');
    expect(labels).not.toContain('BDSM');
  });

  it('validates the real dictionary shape', () => {
    const diagnostics = validateDictionary(dictionaryData);

    expect(diagnostics.totalTags).toBeGreaterThan(0);
    expect(diagnostics.categoryDistribution['角色气质']).toBeGreaterThan(0);
    expect(diagnostics.issues.filter((issue) => issue.message.includes('aliases 不是数组'))).toHaveLength(0);
  });

  it('stops batch analysis after the first failed request', async () => {
    const cards = mockCharacterCards.map(normalizeCharacterCard);
    const progressLog: Array<{ currentBatch: number; status: string; errorMessage?: string }> = [];
    const results = await analyzeCardsInBatches(
      cards,
      {
        ...defaultApiConfig,
        batchSize: 3,
      },
      (progress) => progressLog.push({ currentBatch: progress.currentBatch, status: progress.status, errorMessage: progress.errorMessage }),
    );

    expect(results.length).toBeLessThan(cards.length);
    expect(results[0]).toMatchObject({
      cardId: cards[0].id,
      cardType: 'single_character',
    });
    expect(results[0].baseTags.length).toBeGreaterThan(0);
    expect(results[0].warnings.join(' ')).toContain('AI 配置不完整');
    expect(progressLog.some((progress) => progress.currentBatch === 1)).toBe(true);
    expect(progressLog.some((progress) => progress.currentBatch === 2)).toBe(false);
    expect(progressLog.at(-1)).toMatchObject({
      status: 'failed',
      errorMessage: 'AI 配置不完整：请检查 Base URL、API Key 和 Model。',
    });
  });

  it('builds a local taste profile from analyzed cards without chat text', () => {
    const profile = buildTasteProfile(normalizedMockCards, mockAnalysisResults);

    expect(profile.analyzedCardCount).toBe(normalizedMockCards.length);
    expect(profile.tagStats.length).toBeGreaterThan(0);
    expect(profile.coOccurrences.every((pair) => pair.count >= 3)).toBe(true);
    expect(profile.representativeCharacters.length).toBeGreaterThan(0);
    expect(profile.absentTags.length).toBeGreaterThan(0);
  });

  it('builds a card digest that skips placeholder and decorative openings', () => {
    const card = normalizeCharacterCard({
      id: 'digest-card',
      name: 'Digest Test',
      description: 'identity: 港圈掌权人\npersonality: 克制、疏离、嘴硬。\nrelationship: 与{{user}}久别重逢。',
      first_mes: '【开场】',
      alternate_greetings: [
        '<!DOCTYPE html><html><style>.box{color:red}</style><body>档案系统</body></html>',
        '雨夜里，他在车边等你。多年未见，他还是那副体面到让人牙痒的样子。',
      ],
      tags: [],
    });
    const digest = buildCardDigest(card, recallCandidateTags(card));

    expect(digest.evidenceSections.length).toBeGreaterThan(0);
    expect(digest.selectedOpenings).toHaveLength(1);
    expect(digest.selectedOpenings[0].scenarioId).toBe('digest-card-opening-alt-2');
    expect(digest.skippedOpeningsSummary.placeholder).toBe(1);
    expect(digest.skippedOpeningsSummary.decorative_or_ui).toBe(1);
  });

  it('prioritizes played openings instead of sending every route', () => {
    const card = normalizeCharacterCard({
      id: 'played-opening-card',
      name: 'Played Opening Test',
      description: 'relationship: 久别重逢，拉扯。',
      first_mes: '第一条有效开场白，他在雨里看着你，旧情和新仇都没说出口。',
      alternate_greetings: [
        '第二条有效开场白，他在办公室里压着火气问你为什么回来。',
        '第三条有效开场白，他在机场认出你，手里的票皱得不成样子。',
        '第四条有效开场白，他在酒会隔着人群看你，偏偏不肯先低头。',
        '第五条有效开场白，他在雪夜把车停在你楼下，说只是路过。',
      ],
      tags: [],
    });
    const digest = buildCardDigest(card, recallCandidateTags(card), {
      characterId: card.id,
      chatCount: 4,
      totalMessages: 120,
      userMessages: 60,
      lastActiveAt: '2026-05-10T00:00:00.000Z',
      scenarioStats: card.scenarioOpenings.map((opening, index) => ({
        scenarioId: opening.id,
        openingTitle: opening.title,
        chatCount: 1,
        totalMessages: 20 + index * 10,
        userMessages: 10,
        lastActiveAt: '2026-05-10T00:00:00.000Z',
      })),
    });

    expect(digest.selectedOpenings).toHaveLength(3);
    expect(digest.selectedOpenings.every((opening) => opening.selectionReason === 'played')).toBe(true);
    expect(digest.skippedOpeningsSummary.unplayed_over_budget).toBe(2);
  });

  it('uses first_mes route manifest as selected route summary instead of full alternate greeting text', () => {
    const card = normalizeCharacterCard({
      id: 'first-mes-route-manifest-card',
      name: '张经典',
      description: '张经典是表面克制、私下占有欲很重的港圈掌权者。',
      first_mes: [
        '角色介绍：张经典对外冷淡体面，对你却总在失控边缘刹车。',
        '1. 你是张经典的甲方',
        '2. 你是张经典的初恋（打开对应初恋世界书，攻略难度也可在世界书选择）',
        '3. 你是暑期放假来深圳找正在“深漂”的张经典的青梅竹马（居家隔离线，打开对应青梅竹马世界书）',
      ].join('\n'),
      alternate_greetings: [
        '完整甲方开场白：会议室的投影还亮着，张经典把合同推到你面前，里面有一整段不该直接发送给 AI 的长正文。',
        '完整初恋开场白：雨夜、旧伞、重逢和很多很多细节，这些只有用户真的选中时才该进入正文。',
      ],
      tags: [],
    });
    const usage = {
      characterId: card.id,
      chatCount: 1,
      totalMessages: 30,
      userMessages: 14,
      lastActiveAt: '2026-05-10T00:00:00.000Z',
      scenarioStats: [
        {
          scenarioId: `${card.id}-opening-alt-1`,
          openingTitle: '线路 1',
          chatCount: 1,
          totalMessages: 30,
          userMessages: 14,
          lastActiveAt: '2026-05-10T00:00:00.000Z',
        },
      ],
    };

    const input = buildCardAnalysisInput(card, usage);

    expect(input.cardDigest.firstMesDigest.routeManifestCount).toBe(3);
    expect('routeManifest' in input.cardDigest.firstMesDigest).toBe(false);
    expect('interactionHints' in input.cardDigest.firstMesDigest).toBe(false);
    expect('selectedRouteSummaries' in input.cardDigest.firstMesDigest).toBe(false);
    expect(input.cardDigest.firstMesDigest.characterIntroEvidence.length).toBeGreaterThan(0);
    expect(input.cardDigest.skippedOpeningsSummary.route_manifest).toBe(1);
    expect(input.openings[0].scenarioId).toBe(`${card.id}-opening-alt-1`);
    expect('routeSummary' in input.openings[0]).toBe(false);
    expect(input.openings[0].contentExcerpt).toContain('你是张经典的甲方');
    expect(input.openings[0].contentExcerpt).not.toContain('完整甲方开场白');
  });

  it('uses short route manifest labels even when they do not contain obvious route keywords', () => {
    const card = normalizeCharacterCard({
      id: 'short-route-manifest-card',
      name: 'Short Route Manifest Test',
      description: 'identity: private heir. relationship: he protects {{user}}.',
      first_mes: ['Route list', '1. Bullied? The heir backs you up!', '2. Blank self-roll route'].join('\n'),
      alternate_greetings: [
        'Music Player Song Title. A very long full first route opening that should not be sent to AI when a manifest summary exists.',
        'A blank route where the user can roll their own setup.',
      ],
      tags: [],
    });
    const input = buildCardAnalysisInput(card, {
      characterId: card.id,
      chatCount: 1,
      totalMessages: 20,
      userMessages: 8,
      scenarioStats: [
        {
          scenarioId: `${card.id}-opening-alt-1`,
          openingTitle: 'route 1',
          chatCount: 1,
          totalMessages: 20,
          userMessages: 8,
        },
      ],
    });

    expect(input.cardDigest.firstMesDigest.routeManifestCount).toBe(2);
    expect(input.openings).toHaveLength(1);
    expect(input.openings[0].contentExcerpt).toContain('Bullied? The heir backs you up!');
    expect(input.openings[0].contentExcerpt).not.toContain('Music Player');
  });

  it('maps first_mes menu button labels to alternate greetings by order', () => {
    const card = normalizeCharacterCard({
      id: 'menu-route-manifest-card',
      name: 'Menu Route Manifest Test',
      description: 'identity: private heir. relationship: he protects {{user}}.',
      first_mes: [
        'Story opening',
        '选择故事开篇',
        '被人欺负了？太子爷替你撑腰！',
        '他第一次带你去参加聚会。',
        '空白，可以自roll。',
      ].join(' '),
      alternate_greetings: [
        'Music Player Song Title. Full route one opening should stay out of AI input.',
        'Full route two opening should stay out of AI input.',
        'Blank self-roll route.',
      ],
      tags: [],
    });
    const input = buildCardAnalysisInput(card, {
      characterId: card.id,
      chatCount: 1,
      totalMessages: 20,
      userMessages: 8,
      scenarioStats: [
        {
          scenarioId: `${card.id}-opening-alt-1`,
          openingTitle: 'route 1',
          chatCount: 1,
          totalMessages: 20,
          userMessages: 8,
        },
      ],
    });

    expect(input.cardDigest.firstMesDigest.routeManifestCount).toBe(3);
    expect(input.openings[0].contentExcerpt).toBe('被人欺负了？太子爷替你撑腰！');
    expect(input.openings[0].contentExcerpt).not.toContain('Music Player');
  });

  it('extracts named opening summaries and world-line hints from default first_mes menus', () => {
    const card = normalizeCharacterCard({
      id: 'named-opening-menu-card',
      name: 'Named Opening Menu Test',
      description: 'identity: fallen young master. relationship: {{user}} is the person who changes his life.',
      first_mes: [
        '默认开场',
        '【世界线A：对家篇 - 22岁的公司副总】 ✦ 开场白一：谁把小何惹毛了？他正气势汹汹地找你算账！',
        '✦ 开场白十一：离家出走的小爷在饥寒交迫时，被你的德牧一头撞进了生活。',
        '✦ 开场白十二：清晨的临别温存，他一边放狠话不准你看别人，一边像孩子一样哀求你等他。',
      ].join(' '),
      alternate_greetings: Array.from({ length: 12 }, (_, index) => `完整线路 ${index + 1} 正文：这里是很长很长的开场白，不应该在有目录摘要时进入 AI 输入。`),
      tags: [],
    });
    const input = buildCardAnalysisInput(card, {
      characterId: card.id,
      chatCount: 2,
      totalMessages: 60,
      userMessages: 24,
      scenarioStats: [
        {
          scenarioId: `${card.id}-opening-alt-11`,
          openingTitle: '线路 11',
          chatCount: 1,
          totalMessages: 30,
          userMessages: 12,
        },
        {
          scenarioId: `${card.id}-opening-alt-12`,
          openingTitle: '线路 12',
          chatCount: 1,
          totalMessages: 30,
          userMessages: 12,
        },
      ],
    });

    expect(input.cardDigest.firstMesDigest.routeManifestCount).toBe(3);
    expect(input.openings.map((opening) => opening.contentExcerpt)).toEqual([
      '离家出走的小爷在饥寒交迫时，被你的德牧一头撞进了生活。',
      '清晨的临别温存，他一边放狠话不准你看别人，一边像孩子一样哀求你等他。',
    ]);
    expect(input.openings[0].contentExcerpt).not.toContain('完整线路 11 正文');
  });

  it('extracts route summaries from html switchToNarrative widgets outside first_mes', () => {
    const card = normalizeCharacterCard({
      id: 'html-widget-route-card',
      name: 'HTML Widget Route Test',
      description: [
        '<div class="widget" onclick="switchToNarrative(1)">【对象】<br>六月摄影棚，导演安排恋人感双人宣传照，他当你面吐槽粉丝互撕还要演深情</div>',
        '<div class="widget" onclick="switchToNarrative(2)">【一夜情】<br>午后，他驾车偶遇你，耿耿于怀你留钱的事，怒火中烧</div>',
      ].join('\n'),
      first_mes: '【开场白】',
      alternate_greetings: [
        '完整对象线路正文：摄影棚里有很长很长的开场正文。',
        '完整一夜情线路正文：街边偶遇有很长很长的开场正文。',
      ],
      tags: [],
    });
    const summaries = buildOpeningSummaryMap(card);

    expect(summaries.get(`${card.id}-opening-alt-1`)).toContain('对象：六月摄影棚');
    expect(summaries.get(`${card.id}-opening-alt-1`)).not.toContain('完整对象线路正文');
    expect(summaries.get(`${card.id}-opening-alt-2`)).toContain('一夜情：午后');
  });

  it('extracts route summaries from regex customDescriptions widgets', () => {
    const card = normalizeCharacterCard({
      id: 'regex-route-widget-card',
      name: 'Regex Route Widget Test',
      first_mes: '【開場白】',
      data: {
        alternate_greetings: ['完整线路 1 正文。', '完整线路 2 正文。', '完整线路 3 正文。'],
        extensions: {
          regex_scripts: [
            {
              replaceString: `
                <script>
                  const customDescriptions = {
                    1: { description: "就要成功了。他跟你提分手。" },
                    2: { description: "电视上的他正含笑官宣当红明星是他的“女友”。" },
                    3: { description: "你成为他的助理。" }
                  };
                </script>
              `,
            },
          ],
        },
      },
      tags: [],
    });
    const summaries = buildOpeningSummaryMap(card);

    expect(summaries.get(`${card.id}-opening-alt-1`)).toContain('就要成功了。他跟你提分手。');
    expect(summaries.get(`${card.id}-opening-alt-2`)).toContain('电视上的他正含笑官宣');
    expect(summaries.get(`${card.id}-opening-alt-3`)).toContain('你成为他的助理。');
  });

  it('extracts markdown route lists after route-list anchors instead of numbered instructions', () => {
    const card = normalizeCharacterCard({
      id: 'markdown-route-list-card',
      name: 'Markdown Route List Test',
      first_mes: [
        '## 游玩相关',
        '1. 状态栏二选一，中途可随时切换',
        '2. 若角色状态不对，可打开人设修正',
        '## 开局一览',
        '1. **无业-现任**',
        '陈谦文回国了，现在住在你——他的恋人家中过渡。',
        '*（user默认是老同学）*',
        '2. **无业-前任**',
        '朋友把他抓走去参加派对。',
      ].join('\n'),
      alternate_greetings: ['完整线路 1 正文。', '完整线路 2 正文。'],
      tags: [],
    });
    const summaries = buildOpeningSummaryMap(card);

    expect(summaries.get(`${card.id}-opening-alt-1`)).toContain('无业-现任：陈谦文回国了');
    expect(summaries.get(`${card.id}-opening-alt-1`)).not.toContain('状态栏二选一');
    expect(summaries.get(`${card.id}-opening-alt-2`)).toContain('无业-前任：朋友把他抓走');
  });

  it('prioritizes user relationship and personality evidence over residence details', () => {
    const card = normalizeCharacterCard({
      id: 'relationship-priority-card',
      name: 'Relationship Priority Test',
      description: [
        'identity: private heir',
        'emotional_state:',
        '  love_attitude:',
        '    - To {{user}}, he is unusually patient, indulgent, and protective.',
        '    - He likes {{user}}, but marriage is his boundary and class bargain.',
        'personality: controlling, restrained, proud, and emotionally avoidant.',
        'world: main residence is a villa, apartment, mansion, wine cellar, pool, and decoration details.',
      ].join('\n'),
      first_mes: 'A real opening where he notices {{user}} has been wronged.',
      tags: [],
    });
    const digest = buildCardDigest(card, recallCandidateTags(card));
    const relationship = digest.evidenceSections.find((section) => section.categoryHint === 'relationship' && section.text.includes('{{user}}'));
    const lowValueResidence = digest.evidenceSections.find((section) => /villa|apartment|wine cellar|pool/i.test(section.text));

    expect(relationship).toBeDefined();
    expect(digest.evidenceSections.some((section) => section.categoryHint === 'personality')).toBe(true);
    expect(relationship!.score).toBeGreaterThan(lowValueResidence?.score ?? 0);
  });

  it('preserves critical marriage and status evidence from long relationship blocks', () => {
    const card = normalizeCharacterCard({
      id: 'marriage-evidence-card',
      name: 'Marriage Evidence Test',
      description: [
        'background: 豪门继承人，习惯用资源和规则处理关系。',
        'emotional_state:',
        '  love_attitude:',
        '    - 对{{user}}，他有超乎寻常的耐心和宠溺，乐意花钱、花时间哄她。',
        '    - 他喜欢{{user}}，但婚姻在他的阶层里是筹码，是联盟，唯独不会是爱情归宿。',
        '    - 他可以给{{user}}除了妻子名分之外的一切，甚至想过让她成为公开的秘密。',
        '    - “黎太太”这个名分是他的边界，他仍会接受联姻，把爱情排除在婚姻之外。',
        'personality: 克制、傲慢、掌控欲强。',
      ].join('\n'),
      first_mes: '雨夜里，他知道你被人欺负了，仍然选择替你撑腰。',
      alternate_greetings: ['被人欺负了？太子爷替你撑腰！'],
      tags: [],
    });
    const usage: CharacterUsage = {
      characterId: card.id,
      chatCount: 1,
      totalMessages: 20,
      userMessages: 8,
      lastActiveAt: '2026-05-10T00:00:00.000Z',
      scenarioStats: [
        {
          scenarioId: card.scenarioOpenings[1].id,
          openingTitle: card.scenarioOpenings[1].title,
          chatCount: 1,
          totalMessages: 20,
          userMessages: 8,
          lastActiveAt: '2026-05-10T00:00:00.000Z',
        },
      ],
    };
    const input = buildCardAnalysisInput(card, usage);
    const relationshipText = input.cardDigest.evidenceSections
      .filter((section) => section.categoryHint === 'relationship')
      .map((section) => section.text)
      .join('\n');

    expect(relationshipText).toContain('黎太太');
    expect(relationshipText).toContain('婚姻');
    expect(relationshipText).toContain('{{user}}');
  });

  it('deduplicates card evidence and skips route-labeled character book blocks for character cards', () => {
    const repeatedText = '在外界看来，这就是赤裸裸的农夫与蛇。天才少年在被豪门战队签下之后，一脚踹开了曾经提携自己的恩人。';
    const card = normalizeCharacterCard({
      id: 'dedupe-evidence-card',
      name: 'Dedupe Evidence Test',
      description: '身份：电竞选手。关系：前任，恩人，白月光。',
      first_mes: '雨夜里，他站在基地门口看着你。',
      character_book: {
        entries: [
          { comment: '公开舆论', content: repeatedText },
          { comment: '公开舆论备份', content: repeatedText },
          { comment: '【三选一】和好吧（正常线）', content: '这条是线路说明，不该进入角色本体 digest。' },
        ],
      },
    });
    const digest = buildCardDigest(card, recallCandidateTags(card));

    expect(digest.evidenceSections.filter((section) => section.text === repeatedText)).toHaveLength(1);
    expect(digest.evidenceSections.some((section) => section.sourceLabel.includes('正常线'))).toBe(false);
  });

  it('links route-labeled character book evidence to selected openings', () => {
    const card = normalizeCharacterCard({
      id: 'scenario-evidence-card',
      name: 'Scenario Evidence Test',
      description: '身份：电竞选手。关系：前任。',
      first_mes: '雨夜里，他站在基地门口看着你。',
      alternate_greetings: ['【骨科·兄弟】他在旧屋门口喊你哥哥，关系里的禁忌感只属于这条线路。'],
      tags: [],
      character_book: {
        entries: [
          { comment: '【骨科·兄弟】', content: '骨科线设定：你们是没有血缘但以兄弟身份长大的旧关系，这只属于骨科线路。' },
          { comment: '公开舆论', content: '稳定本体设定：他在外界眼里是年轻的电竞选手。' },
        ],
      },
    });
    const usage = {
      characterId: card.id,
      chatCount: 1,
      totalMessages: 20,
      userMessages: 10,
      lastActiveAt: '2026-05-10T00:00:00.000Z',
      scenarioStats: [
        {
          scenarioId: card.scenarioOpenings[1].id,
          openingTitle: card.scenarioOpenings[1].title,
          chatCount: 1,
          totalMessages: 20,
          userMessages: 10,
          lastActiveAt: '2026-05-10T00:00:00.000Z',
        },
      ],
    };
    const digest = buildCardDigest(card, recallCandidateTags(card), usage);

    expect(digest.evidenceSections.some((section) => section.sourceLabel.includes('骨科'))).toBe(false);
    expect(digest.selectedOpenings[0].linkedEvidence?.[0]?.sourceLabel).toContain('骨科');
  });

  it('does not duplicate opening text as linked scenario evidence', () => {
    const repeatedOpening = '【骨科·兄弟】他在旧屋门口喊你哥哥，关系里的禁忌感只属于这条线路。那一刻雨声很重，他没有再往前走。';
    const card = normalizeCharacterCard({
      id: 'duplicate-opening-evidence-card',
      name: 'Duplicate Opening Evidence Test',
      description: '身份：电竞选手。',
      first_mes: '雨夜里，他站在基地门口看着你。',
      alternate_greetings: [repeatedOpening],
      tags: [],
      character_book: {
        entries: [{ comment: '【骨科·兄弟】', content: repeatedOpening }],
      },
    });
    const digest = buildCardDigest(card, recallCandidateTags(card), {
      characterId: card.id,
      chatCount: 1,
      totalMessages: 20,
      userMessages: 10,
      lastActiveAt: '2026-05-10T00:00:00.000Z',
      scenarioStats: [
        {
          scenarioId: card.scenarioOpenings[1].id,
          openingTitle: card.scenarioOpenings[1].title,
          chatCount: 1,
          totalMessages: 20,
          userMessages: 10,
          lastActiveAt: '2026-05-10T00:00:00.000Z',
        },
      ],
    });

    expect(digest.selectedOpenings[0].linkedEvidence).toBeUndefined();
  });

  it('filters disabled and normative character book entries from card digest', () => {
    const card = normalizeCharacterCard({
      id: 'worldbook-activation-card',
      name: 'Worldbook Activation Test',
      description: 'identity: esports player. relationship: old friend.',
      first_mes: 'A long enough opening where he waits at the training base after midnight and refuses to say why.',
      tags: [],
      character_book: {
        entries: [
          { comment: 'Status Bar Rules', enabled: true, constant: true, content: 'Must output JSON status bar. BL 豪门 手机标签表。' },
          { comment: 'Disabled Lore', enabled: false, constant: true, content: 'This disabled lore should never enter evidence.' },
          { comment: 'Team Lore', enabled: true, constant: true, content: 'The team is an esports club with a strict academy pipeline and public rivalry.' },
        ],
      },
    });
    const digest = buildCardDigest(card, recallCandidateTags(card));

    expect(digest.evidenceSections.some((section) => section.sourceLabel === 'Status Bar Rules')).toBe(false);
    expect(digest.evidenceSections.some((section) => section.sourceLabel === 'Disabled Lore')).toBe(false);
    expect(digest.evidenceSections.some((section) => section.sourceLabel === 'Team Lore')).toBe(true);
  });

  it('drops roleplay instruction evidence that is not useful for tag analysis', () => {
    const card = normalizeCharacterCard({
      id: 'roleplay-rule-filter-card',
      name: 'Roleplay Rule Filter Test',
      description: 'identity: esports player. personality: arrogant but loyal.',
      first_mes: 'A real opening where he waits after training and tries to hide that he cares.',
      tags: [],
      character_book: {
        entries: [
          {
            comment: '【owl】动态赛程（防止ai弄混年内赛程）',
            enabled: true,
            constant: true,
            content:
              '**【动态推进】** AI在扮演中需要有明确的时间线概念，主动推进赛事进程，以此作为故事发展的主轴和背景。',
          },
          {
            comment: 'Character Consistency Check',
            enabled: true,
            constant: true,
            content: '角色一致性校验：交互的行为和内容是否完全符合该角色的性格、知识背景和行为模式？显示格式规范：必须严格遵守。',
          },
          {
            comment: 'Public Persona',
            enabled: true,
            constant: true,
            content: 'He is known as a young esports carry with a sharp public image and a stubborn need to win.',
          },
        ],
      },
    });
    const digest = buildCardDigest(card, recallCandidateTags(card));

    expect(digest.evidenceSections.some((section) => section.sourceLabel.includes('动态赛程'))).toBe(false);
    expect(digest.evidenceSections.some((section) => section.sourceLabel.includes('Consistency'))).toBe(false);
    expect(digest.evidenceSections.some((section) => section.sourceLabel === 'Public Persona')).toBe(true);
  });

  it('limits AI candidate tags to selected openings instead of every alternate greeting', () => {
    const card = normalizeCharacterCard({
      id: 'selected-opening-candidates-card',
      name: 'Selected Opening Candidate Test',
      description: 'identity: esports player. relationship: old friend.',
      first_mes: 'The default opening is a real scene in the training room, but it is not the played route today.',
      alternate_greetings: [
        'Played route: he sits beside you after practice and tries to sound casual about the old tension.',
        'Unplayed route: BL is written here only to make sure an unused route cannot pollute this AI run.',
      ],
      tags: [],
    });
    const input = buildCardAnalysisInput(card, {
      characterId: card.id,
      chatCount: 1,
      totalMessages: 20,
      userMessages: 10,
      lastActiveAt: '2026-05-10T00:00:00.000Z',
      scenarioStats: [
        {
          scenarioId: card.scenarioOpenings[1].id,
          openingTitle: card.scenarioOpenings[1].title,
          chatCount: 1,
          totalMessages: 20,
          userMessages: 10,
          lastActiveAt: '2026-05-10T00:00:00.000Z',
        },
      ],
    });

    expect(input.openings).toHaveLength(1);
    expect(input.openings[0].scenarioId).toBe(card.scenarioOpenings[1].id);
    expect(input.localCandidateTags.some((tag) => tag.label === 'BL')).toBe(false);
  });

  it('sends opening text only through the top-level openings channel', () => {
    const card = normalizeCharacterCard({
      id: 'single-opening-channel-card',
      name: 'Single Opening Channel Test',
      description: '身份：电竞选手。',
      first_mes: '这是一条足够长的开场白，只应该在 openings 字段里出现一次，不能在 cardDigest 里再复制一份。',
      tags: [],
    });
    const input = buildCardAnalysisInput(card);
    const serializedDigest = JSON.stringify(input.cardDigest);

    expect(input.openings[0].contentExcerpt).toContain('只应该在 openings 字段里出现一次');
    expect(serializedDigest).not.toContain('只应该在 openings 字段里出现一次');
    expect(input.cardDigest.selectedOpeningIds).toEqual([card.scenarioOpenings[0].id]);
  });
});
