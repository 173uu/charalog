import { cleanCardText, normalizeForMatch, unwrapCodeFences } from '../domain/textCleanup';
import type {
  CandidateTag,
  CardDigest,
  CardEvidenceSection,
  CharacterUsage,
  EvidenceCategoryHint,
  EvidenceSourceType,
  FirstMesDigest,
  FirstMesRouteManifestItem,
  NormalizedCharacterCard,
  OpeningSkipReason,
  OpeningSelectionReason,
  ScenarioOpening,
  SelectedOpeningDigest,
  SkippedOpeningDigest,
} from '../domain/types';

const MAX_BLOCK_LENGTH = 640;
const MAX_EVIDENCE_SECTIONS = 18;
const MAX_SELECTED_OPENINGS = 4;
const MAX_PLAYED_OPENINGS = 3;
const MAX_OPENING_EXCERPT = 360;
const MAX_FIRST_MES_INTRO_BLOCKS = 4;
const CRITICAL_EXCERPT_RE =
  /\{\{user\}\}|<user>|user\b|love_attitude|emotional_state|relationship_status|relationship_with|关系状态|关系设定|关系描述|情感态度|恋爱期|矛盾期|决裂期|婚姻|名分|妻子|丈夫|太太|夫人|伴侣|爱人|女友|男友|联姻|相亲|婚约|订婚|结婚|不会娶|不会嫁|未来|承诺|底线|边界|阶级|家族|现实|利益|筹码|宠溺|纵容|偏爱|占有|掌控|凉薄|权谋/i;

const CATEGORY_LIMITS: Record<EvidenceCategoryHint, number> = {
  identity: 4,
  personality: 6,
  relationship: 7,
  world: 2,
  interaction_rule: 4,
  boundary: 3,
  scenario_manifest: 4,
  style: 2,
  unknown: 2,
};

type TextBlock = {
  id: string;
  sourceType: EvidenceSourceType;
  sourceLabel: string;
  text: string;
  index: number;
};

type CharacterBookEntryBlock = TextBlock & {
  entryLabel: string;
};

type CharacterBookEntryMeta = {
  index: number;
  label: string;
  content: string;
  keys: string[];
  secondaryKeys: string[];
  enabled: boolean;
  constant: boolean;
  selective: boolean;
};

const CATEGORY_PATTERNS: Array<{
  category: EvidenceCategoryHint;
  weight: number;
  patterns: RegExp[];
}> = [
  {
    category: 'identity',
    weight: 7,
    patterns: [/identity|职业|身份|核心身份|年龄|性别|身高|生日|age|gender|height|birthday|family|家族|红三代|高干|港圈|京圈|掌权|书记|总裁|继承人/i],
  },
  {
    category: 'personality',
    weight: 7,
    patterns: [/personality|traits|emotional_state|性格|气质|核心特征|优点|缺点|习惯|喜好|厌恶|情绪|态度|archetype|default|romantic|likes|dislikes|嘴硬|疯狗|克制|疏离|温柔|掌控/i],
  },
  {
    category: 'relationship',
    weight: 8,
    patterns: [/\{\{user\}\}|relationship|love_attitude|关系|关系设定|关系描述|表妹|青梅|初恋|恋爱|前任|旧情|青梅竹马|相亲|婚约|联姻|伴侣|白月光|替身|重逢|破镜|名分|妻子|宠溺|纵容/i],
  },
  {
    category: 'world',
    weight: 6,
    patterns: [/world|世界观|设定|背景|地点|setting|lore|城市|政商|豪门|名流|娱乐圈|工作室|港风|官场|家族势力/i],
  },
  {
    category: 'interaction_rule',
    weight: 5,
    patterns: [/rule|规则|writing_rule|禁止|不允许|不得|必须|回复|开场白|线路|route|if线|互动|OOC/i],
  },
  {
    category: 'boundary',
    weight: 5,
    patterns: [/雷点|边界|boundary|禁忌|不接受|dislikes|禁止|绝对界限|限制|避雷|consent|自愿/i],
  },
  {
    category: 'scenario_manifest',
    weight: 6,
    patterns: [/开场|开场白|线路|route|if线|alt|greeting|第[一二三四五六七八九十0-9]+条/i],
  },
  {
    category: 'style',
    weight: 2,
    patterns: [/文风|叙事|氛围|慢热|喜剧|酸涩|沉重|节奏|镜头|描写/i],
  },
];

const UI_OR_CODE_PATTERNS = [
  /<!doctype html/i,
  /<html[\s>]/i,
  /<style[\s>]/i,
  /<\/style>/i,
  /<script[\s>]/i,
  /function\s+\w+\s*\(/i,
  /document\./i,
  /window\./i,
  /StatusPanel/i,
  /状态栏|状态面板|播放器|档案系统|DOCTYPE|CSS|HTML/i,
];

const PLACEHOLDER_PATTERNS = [/这里是开场白|希望大家多多repo|^\s*【?开场】?\s*$/i, /^【[^】]{0,12}的开场】$/i];
const ROUTE_MANIFEST_LINE_PATTERN = /^\s*(?:route\s*)?(?:[0-9]{1,2}|[一二三四五六七八九十]{1,3}|[①②③④⑤⑥⑦⑧⑨⑩])\s*[.、:：）)\-]\s*(.+)$/i;
const ROUTE_MANIFEST_SIGNAL_PATTERN = /线路|路线|世界书|开关|打开对应|攻略难度|可在世界书选择|你是|初恋|青梅|员工|甲方|对象|club|419/i;
const FIRST_MES_INTRO_PATTERN = /角色|介绍|身份|性格|背景|设定|他是|她是|你将遇到|人物|主角|男主|女主|{{char}}|char/i;
const FIRST_MES_INTERACTION_HINT_PATTERN = /玩法|攻略|难度|选择|选项|点击|跳转|打开|开启|关闭|世界书|world.?book/i;
const FIRST_MES_NPC_PATTERN = /NPC|配角|群像|其他角色|同伴|朋友|家人|下属|员工列表|角色列表/i;

const SIMPLE_ROUTE_MANIFEST_LINE_RE = /^\s*(?:route\s*)?([0-9]{1,2})\s*[.)\-:\u3001\uff1a\uff0e\uff09]\s*(.{2,240})$/i;
const NAMED_ROUTE_MANIFEST_LINE_RE = /^\s*(?:线路|路线|开场白|开场|route)\s*([0-9]{1,2}|[一二三四五六七八九十]{1,3})\s*[.)\-:\u3001\uff1a\uff0e\uff09]\s*(.{2,240})$/i;
const IMPORTANT_RELATIONSHIP_RE = /\{\{user\}\}|love_attitude|emotional_state|relationship|relation|user\b|对你|对她|对他|婚姻|伴侣|宠溺|纵容|名分|妻子/i;
const IMPORTANT_PERSONALITY_RE = /personality|traits|core_trait|archetype|temperament|likes|dislikes|性格|气质|核心特征|优点|缺点|情绪|态度/i;
const LOW_VALUE_WORLD_DETAIL_RE = /residence|property|apartment|villa|mansion|house|address|decoration|bedroom|living room|wine cellar|pool|floor-to-ceiling|居所|住所|房产|别墅|公寓|老宅|酒窖|泳池|落地窗|装修|地段/i;

const NORMATIVE_CHARACTER_BOOK_PATTERNS = [
  /状态栏|状态面板|手机|通讯|小手机|推送|弹幕|论坛|微博|私信/i,
  /规范|规则|格式|模板|指令|输出|回复|必须|禁止|不得|不要|校验|代码|标签表/i,
  /好感度|数值|变量|JSON|XML|HTML|CSS|UI|OOC|system|prompt|canon/i,
  /status\s*bar|phone|mobile|comms|format|template|rule|instruction|response|output/i,
  /动态推进|时间线概念|赛事进程|故事发展的主轴|休赛周|季后赛|转会期/i,
  /AI在扮演|扮演中|角色一致性校验|Character Consistency Check|显示格式规范|严格遵守/i,
  /主动推进|防止\s*AI|防止ai|弄混|任何交互时|是否完全符合该角色/i,
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringifyUnknown(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  try {
    return JSON.stringify(value);
  } catch {
    return '';
  }
}

function collectNestedStrings(value: unknown, limit = 80): string[] {
  const strings: string[] = [];
  const visit = (current: unknown) => {
    if (strings.length >= limit || current == null) {
      return;
    }
    if (typeof current === 'string') {
      strings.push(current);
      return;
    }
    if (Array.isArray(current)) {
      for (const item of current) {
        visit(item);
      }
      return;
    }
    if (typeof current === 'object') {
      for (const item of Object.values(current)) {
        visit(item);
      }
    }
  };
  visit(value);
  return strings;
}

function decodeJsStringContent(value: string): string {
  return value
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\n')
    .replace(/\\t/g, ' ')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, '\\');
}

function cleanCardTextForBlocks(value: unknown): string {
  const raw = unwrapCodeFences(stringifyUnknown(value));
  return raw
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(?:character|info|setting|rules|writing_rule|profile|relationship|personality)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^{}]*(?:color|font|background|margin|padding|display|position|width|height)[^{}]*\}/gi, ' ')
    .replace(/\b(?:function|const|let|var|=>|document\.|window\.|console\.log)\b[\s\S]*?(?:;|\n|$)/gi, ' ')
    .replace(/\/(?:[^/\\]|\\.)+\/[gimsuy]*\s*(?:=>|,|\n|$)/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function compactExcerpt(text: string, maxLength = MAX_BLOCK_LENGTH): string {
  const cleaned = cleanCardText(text);
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  const criticalMatch = cleaned.match(CRITICAL_EXCERPT_RE);
  if (criticalMatch?.index && criticalMatch.index > Math.floor(maxLength * 0.45)) {
    const headLength = Math.floor(maxLength * 0.28);
    const tailLength = maxLength - headLength - 8;
    const windowStart = Math.max(0, criticalMatch.index - Math.floor(tailLength * 0.35));
    const focused = cleaned.slice(windowStart, windowStart + tailLength).trim();
    return `${cleaned.slice(0, headLength).trim()} ... ${focused}...`;
  }
  return `${cleaned.slice(0, maxLength).trim()}...`;
}

function textSignalLength(text: string): number {
  return Array.from(cleanCardText(text).matchAll(/[\p{Letter}\p{Number}]/gu)).length;
}

function hasEnoughTextSignal(text: string, minSignal = 18): boolean {
  const cleaned = cleanCardText(text);
  if (!cleaned) {
    return false;
  }
  const signalLength = textSignalLength(cleaned);
  return signalLength >= minSignal && signalLength / Math.max(cleaned.length, 1) >= 0.28;
}

function isScenarioLikeCharacterBookLabel(label: string): boolean {
  return /开场|开场白|opening|greeting|route|线路|支线|if\s*线|if线|正常线|隐藏线|三选一|多选一|be线|he线/i.test(label);
}

function isScenarioLikeCharacterBookLabelV2(label: string): boolean {
  const normalized = normalizeForMatch(label);
  return (
    /opening|greeting|route|if\s*line|be\s*line|he\s*line/i.test(label) ||
    /开场|开场白|线路|支线|if线|正常线|隐藏线|三选一|多选一|骨科|相亲|重逢|破镜|青梅竹马/.test(label) ||
    /opening|greeting|route|if line|be line|he line/.test(normalized)
  );
}

function splitTextIntoBlocks(sourceType: EvidenceSourceType, sourceLabel: string, value: unknown): TextBlock[] {
  const cleaned = cleanCardTextForBlocks(value);
  if (!cleaned) {
    return [];
  }

  const roughParts = cleaned
    .split(
      /\n{2,}|(?=(?:^|\s)(?:identity|background|personality|traits|emotional_state|love_attitude|relationship|world|setting|likes|dislikes|goals|rules?|writing_rule|NSFW|Kinks|name|gender|height|age|birthday|family|职业|身份|核心身份|背景|经历|外貌|身高|年龄|性别|性格|气质|核心特征|优点|缺点|喜好|厌恶|关系|关系设定|关系描述|与\{\{user\}\}|对\{\{user\}\}|世界观|设定|地点|规则|开场|线路|文风)\s*[：:])|(?=^\s*[-*]\s+)/gim,
    )
    .map((part) => part.trim())
    .filter(Boolean);

  const parts = roughParts.length > 1 ? roughParts : cleaned.split(/(?<=。|；|;|\.)\s+/).filter(Boolean);

  return parts
    .map((part, index) => ({
      id: `${sourceType}-${index}`,
      sourceType,
      sourceLabel,
      text: compactExcerpt(part),
      index,
    }))
    .filter((block) => hasEnoughTextSignal(block.text));
}

function readStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  }
  return typeof value === 'string' && value.trim() ? [value] : [];
}

function collectCharacterBookEntries(card: NormalizedCharacterCard): CharacterBookEntryMeta[] {
  const books = [card.rawCard.character_book, card.rawCard.data?.character_book].filter(isRecord);
  const entries = books.flatMap((book) => (Array.isArray(book.entries) ? book.entries : []));

  return entries.flatMap((entry, index): CharacterBookEntryMeta[] => {
    if (!isRecord(entry)) {
      return [];
    }
    const label = typeof entry.comment === 'string' && entry.comment ? entry.comment : `character_book ${index + 1}`;
    const content = stringifyUnknown(entry.content);
    const enabled = entry.enabled !== false && entry.disable !== true && entry.disabled !== true;
    return [
      {
        index,
        label,
        content,
        keys: readStringList(entry.keys),
        secondaryKeys: readStringList(entry.secondary_keys),
        enabled,
        constant: entry.constant === true,
        selective: entry.selective === true,
      },
    ];
  });
}

function isNormativeCharacterBookEntry(entry: CharacterBookEntryMeta): boolean {
  const text = `${entry.label}\n${entry.content}`;
  return NORMATIVE_CHARACTER_BOOK_PATTERNS.some((pattern) => pattern.test(text));
}

function termMatchesText(term: string, text: string): boolean {
  const normalizedTerm = normalizeForMatch(term);
  const normalizedText = normalizeForMatch(text);
  if (!normalizedTerm || !normalizedText) {
    return false;
  }
  if (/^[a-z0-9]+$/i.test(normalizedTerm) && normalizedTerm.length <= 4) {
    const escapedTerm = normalizedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z0-9])${escapedTerm}($|[^a-z0-9])`, 'i').test(normalizedText);
  }
  return normalizedText.includes(normalizedTerm);
}

function entryKeysMatchContext(entry: CharacterBookEntryMeta, context: string): boolean {
  if (entry.keys.length === 0) {
    return false;
  }
  const primaryMatched = entry.keys.some((key) => termMatchesText(key, context));
  if (!primaryMatched) {
    return false;
  }
  return entry.secondaryKeys.length === 0 || entry.secondaryKeys.some((key) => termMatchesText(key, context));
}

function collectCharacterBookBlocks(card: NormalizedCharacterCard): TextBlock[] {
  const stableContext = [
    card.name,
    card.description,
    card.creatorNotes,
    card.tags.map((tag) => tag.label).join(' '),
    stringifyUnknown(card.rawCard.personality ?? card.rawCard.data?.personality),
    stringifyUnknown(card.rawCard.scenario ?? card.rawCard.data?.scenario),
  ].join(' ');

  return collectCharacterBookEntries(card).flatMap((entry) => {
    if (!entry.enabled || isNormativeCharacterBookEntry(entry)) {
      return [];
    }
    if (card.cardType !== 'world' && isScenarioLikeCharacterBookLabelV2(entry.label)) {
      return [];
    }
    if (card.cardType !== 'world' && !entry.constant && entry.keys.length > 0 && !entryKeysMatchContext(entry, stableContext)) {
      return [];
    }
    return splitTextIntoBlocks('characterBook', entry.label, entry.content).map((block, blockIndex) => ({
      ...block,
      id: `characterBook-${entry.index}-${blockIndex}`,
    }));
  });
}

function collectScenarioCharacterBookBlocks(card: NormalizedCharacterCard): TextBlock[] {
  if (card.cardType === 'world') {
    return [];
  }

  const openingContext = card.scenarioOpenings.map((opening) => `${opening.title}\n${opening.text}`).join('\n');

  return collectCharacterBookEntries(card).flatMap((entry) => {
    if (!entry.enabled || isNormativeCharacterBookEntry(entry)) {
      return [];
    }
    if (!isScenarioLikeCharacterBookLabelV2(entry.label) && !entryKeysMatchContext(entry, openingContext)) {
      return [];
    }
    return splitTextIntoBlocks('characterBook', entry.label, entry.content).map((block, blockIndex) => ({
      ...block,
      id: `scenarioCharacterBook-${entry.index}-${blockIndex}`,
    }));
  });
}

function categoryForBlock(text: string): { categoryHint: EvidenceCategoryHint; score: number; reasons: string[] } {
  if (/^\s*traits\s*[:：]/i.test(text) && /sexual_|top时|bottom时|伴侣变化|事后护理|求饶|喘/i.test(text)) {
    return {
      categoryHint: 'interaction_rule',
      score: 12,
      reasons: ['heading:sexual_traits'],
    };
  }
  if (/^\s*(?:personality|archetype|speech_style|emotional_behaviors|public_traits|private_traits|romantic_traits)\s*[:：]/i.test(text)) {
    return {
      categoryHint: 'personality',
      score: 22,
      reasons: ['heading:personality'],
    };
  }
  if (/^\s*(?:identity|background_story|appearance|age|gender|height|birthday)\s*[:：]/i.test(text)) {
    return {
      categoryHint: 'identity',
      score: 18,
      reasons: ['heading:identity'],
    };
  }
  if (/^\s*(?:NSFW_information|Sex_related|Kinks|Limits)\s*[:：]/i.test(text)) {
    return {
      categoryHint: 'interaction_rule',
      score: 12,
      reasons: ['heading:nsfw'],
    };
  }

  const normalized = normalizeForMatch(text);
  const matches = CATEGORY_PATTERNS.map((group) => {
    const count = group.patterns.reduce((sum, pattern) => sum + (pattern.test(normalized) || pattern.test(text) ? 1 : 0), 0);
    return {
      category: group.category,
      score: count * group.weight,
    };
  }).filter((item) => item.score > 0);

  const best = matches.sort((a, b) => b.score - a.score)[0];
  return {
    categoryHint: best?.category ?? 'unknown',
    score: best?.score ?? 0,
    reasons: matches.slice(0, 3).map((item) => `${item.category}+${item.score}`),
  };
}

function matchedTagsForText(text: string, candidateTags: CandidateTag[]): string[] {
  const normalized = normalizeForMatch(text);
  return candidateTags
    .filter((tag) => normalized.includes(normalizeForMatch(tag.label)) || tag.matchedSnippets.some((snippet) => normalized.includes(normalizeForMatch(snippet).slice(0, 24))))
    .sort((a, b) => b.score - a.score)
    .map((tag) => tag.label)
    .filter((label, index, labels) => labels.indexOf(label) === index)
    .slice(0, 8);
}

function scoreBlock(block: TextBlock, candidateTags: CandidateTag[]): CardEvidenceSection | undefined {
  const isNormativeBlock =
    UI_OR_CODE_PATTERNS.some((pattern) => pattern.test(block.text) || pattern.test(block.sourceLabel)) ||
    NORMATIVE_CHARACTER_BOOK_PATTERNS.some((pattern) => pattern.test(block.text) || pattern.test(block.sourceLabel));

  if (isNormativeBlock) {
    return undefined;
  }

  const category = categoryForBlock(block.text);
  const matchedTags = matchedTagsForText(block.text, candidateTags);

  if (category.categoryHint === 'interaction_rule' && matchedTags.length === 0) {
    return undefined;
  }

  const sourceWeight =
    block.sourceType === 'description' || block.sourceType === 'characterBook'
      ? 5
      : block.sourceType === 'creatorNotes'
        ? 3
        : block.sourceType === 'systemPrompt' || block.sourceType === 'postHistoryInstructions'
          ? 1
          : 2;
  let score = sourceWeight + category.score + matchedTags.length * 4 + Math.min(4, block.text.length / 140);
  if (category.categoryHint === 'relationship' && IMPORTANT_RELATIONSHIP_RE.test(block.text)) {
    score += 12;
  }
  if (category.categoryHint === 'personality' && IMPORTANT_PERSONALITY_RE.test(block.text)) {
    score += 8;
  }
  const isLowValueWorldDetail = LOW_VALUE_WORLD_DETAIL_RE.test(`${block.sourceLabel}\n${block.text}`);
  if (isLowValueWorldDetail) {
    score -= 10;
  }
  if (isLowValueWorldDetail && score < 8 && matchedTags.length === 0) {
    return undefined;
  }

  if (score < 7 && category.categoryHint === 'unknown' && matchedTags.length === 0) {
    return undefined;
  }

  return {
    id: block.id,
    sourceType: block.sourceType,
    sourceLabel: block.sourceLabel,
    categoryHint: category.categoryHint,
    text: block.text,
    score: Math.round(score * 10) / 10,
    matchedTags,
    reason: [block.sourceType, ...category.reasons, matchedTags.length ? `matchedTags:${matchedTags.length}` : ''].filter(Boolean).join(' / '),
  };
}

function scoreFirstMesIntroBlock(block: TextBlock, candidateTags: CandidateTag[]): CardEvidenceSection | undefined {
  const scored = scoreBlock(block, candidateTags);
  if (scored) {
    return scored;
  }
  if (!FIRST_MES_INTRO_PATTERN.test(block.text) && matchedTagsForText(block.text, candidateTags).length === 0) {
    return undefined;
  }
  const matchedTags = matchedTagsForText(block.text, candidateTags);
  return {
    id: block.id,
    sourceType: block.sourceType,
    sourceLabel: block.sourceLabel,
    categoryHint: 'identity',
    text: block.text,
    score: 7 + matchedTags.length * 4,
    matchedTags,
    reason: [block.sourceType, 'first_mes_intro', matchedTags.length ? `matchedTags:${matchedTags.length}` : ''].filter(Boolean).join(' / '),
  };
}

function bucketEvidence(sections: CardEvidenceSection[]): CardEvidenceSection[] {
  const selected: CardEvidenceSection[] = [];
  const byCategory = new Map<EvidenceCategoryHint, CardEvidenceSection[]>();

  const uniqueSections = Array.from(
    sections
      .reduce((byFingerprint, section) => {
        const fingerprint = normalizeForMatch(section.text).slice(0, 220);
        const existing = byFingerprint.get(fingerprint);
        if (!existing || section.score > existing.score) {
          byFingerprint.set(fingerprint, section);
        }
        return byFingerprint;
      }, new Map<string, CardEvidenceSection>())
      .values(),
  );

  uniqueSections.forEach((section) => {
    byCategory.set(section.categoryHint, [...(byCategory.get(section.categoryHint) ?? []), section]);
  });

  byCategory.forEach((items, category) => {
    selected.push(
      ...items
        .sort((a, b) => b.score - a.score || a.text.length - b.text.length)
        .slice(0, CATEGORY_LIMITS[category]),
    );
  });

  return selected.sort((a, b) => b.score - a.score).slice(0, MAX_EVIDENCE_SECTIONS);
}

function evidenceFingerprint(section: CardEvidenceSection): string {
  return normalizeForMatch(section.text).slice(0, 220);
}

function dedupeEvidenceSections(sections: CardEvidenceSection[]): CardEvidenceSection[] {
  return Array.from(
    sections
      .reduce((byFingerprint, section) => {
        const fingerprint = evidenceFingerprint(section);
        const existing = byFingerprint.get(fingerprint);
        if (!existing || section.score > existing.score) {
          byFingerprint.set(fingerprint, section);
        }
        return byFingerprint;
      }, new Map<string, CardEvidenceSection>())
      .values(),
  );
}

function scenarioEvidenceLinkScore(evidence: CardEvidenceSection, opening: ScenarioOpening): number {
  const label = normalizeForMatch(evidence.sourceLabel);
  const title = normalizeForMatch(opening.title);
  const openingText = normalizeForMatch(opening.text);
  const evidenceText = normalizeForMatch(evidence.text);
  let score = 0;

  if (label && title && (label.includes(title) || title.includes(label))) {
    score += 10;
  }

  const labelTokens = label.split(' ').filter((token) => token.length >= 2);
  score += labelTokens.filter((token) => title.includes(token) || openingText.includes(token)).length * 2;

  if (evidenceText && openingText && (openingText.includes(evidenceText.slice(0, 80)) || evidenceText.includes(openingText.slice(0, 80)))) {
    score += 7;
  }

  return score;
}

function isDuplicateOfOpening(evidence: CardEvidenceSection, opening: ScenarioOpening): boolean {
  const openingText = normalizeForMatch(opening.text);
  const evidenceText = normalizeForMatch(evidence.text);
  if (!openingText || !evidenceText) {
    return false;
  }
  const shorter = openingText.length < evidenceText.length ? openingText : evidenceText;
  const longer = openingText.length < evidenceText.length ? evidenceText : openingText;
  return shorter.length >= 30 && longer.includes(shorter.slice(0, Math.min(180, shorter.length)));
}

function linkScenarioEvidence(
  openings: SelectedOpeningDigest[],
  scenarioEvidence: CardEvidenceSection[],
  allOpenings: ScenarioOpening[],
): SelectedOpeningDigest[] {
  if (scenarioEvidence.length === 0) {
    return openings;
  }

  return openings.map((opening) => {
    const sourceOpening = allOpenings.find((item) => item.id === opening.scenarioId);
    if (!sourceOpening) {
      return opening;
    }

    const linkedEvidence = dedupeEvidenceSections(
      scenarioEvidence
        .filter((evidence) => !isDuplicateOfOpening(evidence, sourceOpening))
        .map((evidence) => ({
          evidence,
          score: scenarioEvidenceLinkScore(evidence, sourceOpening),
        }))
        .filter((item) => item.score >= 4)
        .sort((a, b) => b.score - a.score || b.evidence.score - a.evidence.score)
        .map((item) => item.evidence),
    ).slice(0, 3);

    return linkedEvidence.length > 0 ? { ...opening, linkedEvidence } : opening;
  });
}

function textFingerprint(text: string): string {
  return normalizeForMatch(text).slice(0, 180);
}

function routeIndexFromMarker(marker: string): number {
  const circled = '①②③④⑤⑥⑦⑧⑨⑩'.indexOf(marker);
  if (circled >= 0) {
    return circled + 1;
  }

  const chineseDigits: Record<string, number> = {
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
    十: 10,
  };
  if (/^十[一二三四五六七八九]$/.test(marker)) {
    return 10 + (chineseDigits[marker[1]] ?? 0);
  }
  if (/^[一二三四五六七八九]十$/.test(marker)) {
    return (chineseDigits[marker[0]] ?? 0) * 10;
  }
  if (/^[一二三四五六七八九]十[一二三四五六七八九]$/.test(marker)) {
    return (chineseDigits[marker[0]] ?? 0) * 10 + (chineseDigits[marker[2]] ?? 0);
  }
  return chineseDigits[marker] ?? (Number(marker) || 0);
}

function parseRouteManifestLine(line: string): FirstMesRouteManifestItem | undefined {
  const match =
    line.match(NAMED_ROUTE_MANIFEST_LINE_RE) ??
    line.match(SIMPLE_ROUTE_MANIFEST_LINE_RE) ??
    line.match(/^\s*(?:route\s*)?([0-9]{1,2}|[一二三四五六七八九十]|[①②③④⑤⑥⑦⑧⑨⑩])\s*[.、:：）)\-]\s*(.+)$/i);
  if (!match) {
    return undefined;
  }

  const rawText = cleanCardText(match[2]);
  if (!rawText || rawText.length < 2 || rawText.length > 240 || UI_OR_CODE_PATTERNS.some((pattern) => pattern.test(rawText))) {
    return undefined;
  }

  const parentheticalHints = Array.from(rawText.matchAll(/[（(]([^（）()]{2,120})[）)]/g)).map((item) => item[1].trim());
  const hintText = parentheticalHints.join('；');
  const routeLabel = rawText.replace(/[（(][^（）()]{2,120}[）)]/g, '').trim() || rawText;
  const userRoleMatch = rawText.match(/(?:你是|you are)\s*([^，。；;,（）()]{2,48})/i);
  const worldBookHint = parentheticalHints.find((hint) => /世界书|world.?book|打开|开启|关闭/i.test(hint));
  const difficultyHint = parentheticalHints.find((hint) => /攻略|难度|difficulty/i.test(hint));

  return {
    index: routeIndexFromMarker(match[1]),
    rawText,
    routeLabel,
    userRole: userRoleMatch?.[1]?.trim(),
    relationshipSetup: routeLabel,
    worldBookHint,
    difficultyHint: difficultyHint ?? (/攻略|难度/i.test(hintText) ? hintText : undefined),
  };
}

function inferRouteManifestFromFirstMesMenu(card: NormalizedCharacterCard): FirstMesRouteManifestItem[] {
  if (card.alternateGreetings.length < 2) {
    return [];
  }

  const searchableMenuText = [
    card.firstMessage,
    stringifyUnknown(card.rawCard.description),
    stringifyUnknown(card.rawCard.mes_example),
    stringifyUnknown(card.rawCard.creatorcomment),
    stringifyUnknown(card.rawCard.extensions),
    ...collectNestedStrings(card.rawCard.extensions),
    stringifyUnknown(card.rawCard.data?.description),
    stringifyUnknown(card.rawCard.data?.mes_example),
    stringifyUnknown(card.rawCard.data?.creatorcomment),
    stringifyUnknown(card.rawCard.data?.extensions),
    ...collectNestedStrings(card.rawCard.data?.extensions),
  ].join('\n');
  const customDescriptionItems: FirstMesRouteManifestItem[] = Array.from(
    searchableMenuText.matchAll(
      /(?:^|[,{]\s*)([0-9]{1,2})\s*:\s*\{\s*description\s*:\s*(["'`])((?:\\[\s\S]|(?!\2)[\s\S]){2,260})\2/gi,
    ),
  )
    .map((match) => {
      const index = Number(match[1]);
      const rawText = cleanCardText(decodeJsStringContent(match[3])).replace(/\s+/g, ' ').trim();
      if (!index || !rawText || rawText.length < 2 || rawText.length > 220 || UI_OR_CODE_PATTERNS.some((pattern) => pattern.test(rawText))) {
        return undefined;
      }
      const item: FirstMesRouteManifestItem = {
        index,
        rawText,
        routeLabel: rawText,
        relationshipSetup: rawText,
      };
      return item;
    })
    .filter((item): item is FirstMesRouteManifestItem => Boolean(item))
    .filter((item, index, items) => items.findIndex((candidate) => candidate.index === item.index) === index)
    .slice(0, card.alternateGreetings.length);

  if (customDescriptionItems.length >= 2) {
    return customDescriptionItems;
  }

  const htmlWidgetItems: FirstMesRouteManifestItem[] = Array.from(
    searchableMenuText.matchAll(/onclick=\\?"switchToNarrative\((\d{1,2})\)\\?"[\s\S]{0,260}?【([^】]{1,40})】(?:\s|<br\s*\/?>|\\n|\\r)*([\s\S]*?)(?=<\/div>|\\?"\s*,|\n\s*<div|\n\s*\\?")/gi),
  )
    .map((match) => {
      const index = Number(match[1]);
      const routeLabel = cleanCardText(match[2]).trim();
      const summary = cleanCardText(match[3]).replace(/\\[rn]/g, ' ').replace(/\s+/g, ' ').trim();
      if (!index || !routeLabel || (!summary && routeLabel.length < 2)) {
        return undefined;
      }
      const item: FirstMesRouteManifestItem = {
        index,
        rawText: summary ? `${routeLabel}：${summary}` : routeLabel,
        routeLabel,
        relationshipSetup: summary || routeLabel,
      };
      return item;
    })
    .filter((item): item is FirstMesRouteManifestItem => Boolean(item))
    .filter((item, index, items) => items.findIndex((candidate) => candidate.index === item.index) === index)
    .slice(0, card.alternateGreetings.length);

  if (htmlWidgetItems.length >= 2) {
    return htmlWidgetItems;
  }

  const cleanedFirstMes = cleanCardText(card.firstMessage);
  const namedOpeningItems: FirstMesRouteManifestItem[] = Array.from(
    cleanedFirstMes.matchAll(
      /(?:【([^】]{2,80})】\s*)?(?:[✦★☆◆◇\-\s(（\\\/'"]{0,16})开场白\s*([0-9]{1,2}|[一二三四五六七八九十]{1,3})\s*[：:]\s*([\s\S]*?)(?=(?:【[^】]{2,80}】\s*)?(?:[✦★☆◆◇\-\s(（\\\/'"]{0,16})开场白\s*(?:[0-9]{1,2}|[一二三四五六七八九十]{1,3})\s*[：:]|作者|$)/g,
    ),
  )
    .map((match) => {
      const worldLine = match[1]?.trim();
      const index = routeIndexFromMarker(match[2]);
      const label = cleanCardText(match[3]).replace(/[✦★☆◆◇]+/g, ' ').replace(/\s+/g, ' ').trim();
      if (!index || !label || label.length < 2 || label.length > 140) {
        return undefined;
      }
      const rawText = worldLine ? `${label}（${worldLine}）` : label;
      const item: FirstMesRouteManifestItem = {
        index,
        rawText,
        routeLabel: label,
        relationshipSetup: label,
        worldBookHint: worldLine,
      };
      return item;
    })
    .filter((item): item is FirstMesRouteManifestItem => Boolean(item))
    .slice(0, card.alternateGreetings.length);

  if (namedOpeningItems.length >= 2) {
    return namedOpeningItems;
  }

  const firstMesWithLines = card.firstMessage.replace(/\r\n?/g, '\n');
  const routeListAnchorMatch = firstMesWithLines.match(/(?:开局一览|开场一览|开篇一览|线路一览|路线一览|故事开篇|选择故事开篇|选择开篇|选择线路)/);
  if (routeListAnchorMatch?.index != null) {
    const anchoredText = firstMesWithLines.slice(routeListAnchorMatch.index);
    const markdownItems: FirstMesRouteManifestItem[] = [];
    let current:
      | {
          index: number;
          routeLabel: string;
          lines: string[];
        }
      | undefined;
    const pushCurrent = () => {
      if (!current?.routeLabel || current.routeLabel.length > 120) {
        return;
      }
      const summary = cleanCardText(current.lines.join('\n'))
        .replace(/\*+/g, ' ')
        .replace(/请通过右下小箭头左右滑动选择/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const rawText = [current.routeLabel, summary].filter(Boolean).join('：').slice(0, 260);
      markdownItems.push({
        index: current.index,
        rawText,
        routeLabel: current.routeLabel,
        relationshipSetup: summary || current.routeLabel,
      });
    };

    const routeLines = anchoredText.includes('\n') ? anchoredText.split(/\n+/) : splitFirstMesLines(anchoredText);
    for (const line of routeLines) {
      const routeLine = line.match(/^\s*([0-9]{1,2}|[一二三四五六七八九十]{1,3})\s*[.)、．]\s*(.+?)\s*$/);
      if (routeLine) {
        pushCurrent();
        const index = routeIndexFromMarker(routeLine[1]);
        const rest = routeLine[2].trim();
        const labeled = rest.match(/^\*\*([^*]{1,120})\*\*\s*(.*)$/) ?? rest.match(/^【([^】]{1,120})】\s*(.*)$/);
        const routeLabel = cleanCardText(labeled?.[1] ?? rest).replace(/\*+/g, '').trim();
        const inlineSummary = (labeled?.[2] ?? '').trim();
        current = index && routeLabel ? { index, routeLabel, lines: inlineSummary ? [inlineSummary] : [] } : undefined;
        continue;
      }
      if (!current) {
        continue;
      }
      if (/^\s*#{1,6}\s+/.test(line) || /^\s*(作者|原作者|严禁|禁止|该角色卡)/.test(line)) {
        pushCurrent();
        current = undefined;
        continue;
      }
      const trimmed = line.trim();
      if (trimmed && !/^(?:\*?请通过右下小箭头|[-*_]{3,})/.test(trimmed)) {
        current.lines.push(trimmed);
      }
    }
    pushCurrent();

    const uniqueMarkdownItems = markdownItems
      .filter((item): item is FirstMesRouteManifestItem => Boolean(item))
      .filter((item, index, items) => items.findIndex((candidate) => candidate.index === item.index) === index)
      .slice(0, card.alternateGreetings.length);

    if (uniqueMarkdownItems.length >= 2) {
      return uniqueMarkdownItems;
    }
  }

  const anchors = ['选择故事开篇', '选择开篇', '选择线路', '故事开篇'];
  const anchor = anchors
    .map((text) => ({ text, index: card.firstMessage.lastIndexOf(text) }))
    .filter((item) => item.index >= 0)
    .sort((a, b) => b.index - a.index)[0];
  if (!anchor) {
    return [];
  }

  const tail = card.firstMessage.slice(anchor.index + anchor.text.length);
  const labels = Array.from(tail.matchAll(/[^。!！]+[。!！]?/g))
    .map((match) => cleanCardText(match[0]))
    .map((label) => label.replace(/\s+/g, ' ').trim())
    .filter((label) => label.length >= 2 && label.length <= 80)
    .slice(0, card.alternateGreetings.length);

  if (labels.length < 2) {
    return [];
  }

  return labels.map((label, index) => ({
    index: index + 1,
    rawText: label,
    routeLabel: label,
    relationshipSetup: label,
  }));
}

function splitFirstMesLines(text: string): string[] {
  const rawLines = text
    .split(/\n+|(?=\s*(?:(?:线路|路线|开场白|开场)\s*)?(?:route\s*)?(?:[0-9]{1,2}|[一二三四五六七八九十]{1,3}|[①②③④⑤⑥⑦⑧⑨⑩])\s*[.、:：）)\-]\s*)/i)
    .map((line) => cleanCardText(line))
    .filter(Boolean);
  return rawLines.length > 0 ? rawLines : cleanCardText(text).split(/\n+/).map((line) => line.trim()).filter(Boolean);
}

function isRouteManifestFirstMes(text: string): boolean {
  const routeLines = splitFirstMesLines(text).map(parseRouteManifestLine).filter(Boolean);
  if (routeLines.length >= 2) {
    return true;
  }
  const cleaned = cleanCardText(text);
  return /(?:选择故事开篇|选择开篇|选择线路|故事开篇)/.test(cleaned) && Array.from(cleaned.matchAll(/[^。!！]+[。!！]?/g)).length >= 3;
}

function buildFirstMesDigest(card: NormalizedCharacterCard, candidateTags: CandidateTag[]): FirstMesDigest {
  const lines = splitFirstMesLines(card.firstMessage);
  const explicitRouteManifest = lines.map(parseRouteManifestLine).filter((item): item is FirstMesRouteManifestItem => Boolean(item));
  const inferredRouteManifest = inferRouteManifestFromFirstMesMenu(card);
  const maxExplicitIndex = Math.max(0, ...explicitRouteManifest.map((item) => item.index));
  const maxInferredIndex = Math.max(0, ...inferredRouteManifest.map((item) => item.index));
  const routeManifest =
    inferredRouteManifest.length >= 2 && (explicitRouteManifest.length < 2 || maxInferredIndex >= maxExplicitIndex)
      ? inferredRouteManifest
      : explicitRouteManifest;
  const isManifest = routeManifest.length >= 2;
  const worldBookHints = lines.filter((line) => /世界书|world.?book|打开对应|开启|关闭/i.test(line)).map((line) => compactExcerpt(line, 180));
  const interactionHints = lines.filter((line) => FIRST_MES_INTERACTION_HINT_PATTERN.test(line)).map((line) => compactExcerpt(line, 180));
  const introText = lines
    .filter((line) => !parseRouteManifestLine(line))
    .filter((line) => !FIRST_MES_INTERACTION_HINT_PATTERN.test(line))
    .filter((line) => !FIRST_MES_NPC_PATTERN.test(line))
    .filter((line) => FIRST_MES_INTRO_PATTERN.test(line) || (!isManifest && hasEnoughTextSignal(line, 32)))
    .join('\n');
  const characterIntroEvidence = splitTextIntoBlocks('firstMes', 'first_mes intro', introText)
    .map((block) => scoreFirstMesIntroBlock(block, candidateTags))
    .filter((section): section is CardEvidenceSection => Boolean(section))
    .filter((section) => section.categoryHint !== 'interaction_rule' && section.categoryHint !== 'scenario_manifest')
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_FIRST_MES_INTRO_BLOCKS);

  return {
    characterIntroEvidence,
    routeManifest,
    worldBookHints: Array.from(new Set(worldBookHints)).slice(0, 8),
    interactionHints: Array.from(new Set(interactionHints)).slice(0, 8),
    discardedUiTextLength: UI_OR_CODE_PATTERNS.some((pattern) => pattern.test(card.firstMessage)) ? card.firstMessage.length : 0,
  };
}

function classifyOpeningSkip(opening: ScenarioOpening): OpeningSkipReason | undefined {
  const raw = opening.text.trim();
  const cleaned = cleanCardText(opening.text);
  if (!cleaned) {
    return 'empty';
  }
  if (PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(cleaned))) {
    return 'placeholder';
  }
  if (opening.source === 'first_mes' && isRouteManifestFirstMes(opening.text)) {
    return 'route_manifest';
  }
  if (!hasEnoughTextSignal(cleaned, 24)) {
    return 'decorative_or_ui';
  }
  if (UI_OR_CODE_PATTERNS.some((pattern) => pattern.test(raw) || pattern.test(cleaned))) {
    return 'decorative_or_ui';
  }
  return undefined;
}

function selectOpenings(
  card: NormalizedCharacterCard,
  candidateTags: CandidateTag[],
  usage?: CharacterUsage,
): { selectedOpenings: SelectedOpeningDigest[]; skippedOpenings: SkippedOpeningDigest[] } {
  const selected: SelectedOpeningDigest[] = [];
  const skipped: SkippedOpeningDigest[] = [];
  const seen = new Set<string>();
  const scenarioStats = usage?.scenarioStats ?? [];

  const candidates = card.scenarioOpenings.map((opening) => {
    const skipReason = classifyOpeningSkip(opening);
    const fingerprint = textFingerprint(opening.text);
    const duplicate = fingerprint && seen.has(fingerprint);
    seen.add(fingerprint);
    const scenarioUsage = scenarioStats.find((scenario) => scenario.scenarioId === opening.id);
    const matchedTags = matchedTagsForText(opening.text, candidateTags);
    const reason: OpeningSelectionReason =
      scenarioUsage && scenarioUsage.chatCount > 0
        ? 'played'
        : opening.source === 'first_mes'
          ? 'first_valid'
          : matchedTags.length > 0
            ? 'candidate_tag_hit'
            : 'diverse_sample';
    const score = (scenarioUsage?.totalMessages ?? 0) * 3 + matchedTags.length * 6 + (opening.source === 'first_mes' ? 2 : 0) + Math.max(0, 5 - opening.index);

    return {
      opening,
      skipReason: duplicate ? 'duplicate' as OpeningSkipReason : skipReason,
      scenarioUsage,
      matchedTags,
      reason,
      score,
    };
  });

  const playable = candidates.filter((candidate) => !candidate.skipReason);
  const played = playable.filter((candidate) => candidate.reason === 'played').sort((a, b) => b.score - a.score).slice(0, MAX_PLAYED_OPENINGS);
  const fallbackOpenings =
    played.length > 0
      ? []
      : playable
          .filter((candidate) => candidate.reason !== 'played')
          .sort((a, b) => b.score - a.score)
          .slice(0, MAX_SELECTED_OPENINGS);
  const chosen = [...played, ...fallbackOpenings].filter(
    (candidate, index, all) => all.findIndex((item) => item.opening.id === candidate.opening.id) === index,
  );
  const chosenIds = new Set(chosen.map((candidate) => candidate.opening.id));

  candidates.forEach((candidate) => {
    if (candidate.skipReason) {
      skipped.push({
        scenarioId: candidate.opening.id,
        title: candidate.opening.title,
        reason: candidate.skipReason,
      });
      return;
    }
    if (!chosenIds.has(candidate.opening.id)) {
      skipped.push({
        scenarioId: candidate.opening.id,
        title: candidate.opening.title,
        reason: 'unplayed_over_budget',
      });
    }
  });

  chosen.forEach((candidate) => {
    selected.push({
      scenarioId: candidate.opening.id,
      title: candidate.opening.title,
      source: candidate.opening.source,
      index: candidate.opening.index,
      textExcerpt: compactExcerpt(candidate.opening.text, candidate.reason === 'played' ? 520 : MAX_OPENING_EXCERPT),
      selectionReason: candidate.reason,
      matchedTags: candidate.matchedTags,
      totalMessages: candidate.scenarioUsage?.totalMessages,
      chatCount: candidate.scenarioUsage?.chatCount,
    });
  });

  return { selectedOpenings: selected, skippedOpenings: skipped };
}

function countSkipped(skippedOpenings: SkippedOpeningDigest[]): Record<OpeningSkipReason, number> {
  return skippedOpenings.reduce<Record<OpeningSkipReason, number>>(
    (counts, opening) => ({
      ...counts,
      [opening.reason]: counts[opening.reason] + 1,
    }),
    {
      placeholder: 0,
      decorative_or_ui: 0,
      route_manifest: 0,
      duplicate: 0,
      unplayed_over_budget: 0,
      empty: 0,
    },
  );
}

export function buildCardDigest(card: NormalizedCharacterCard, candidateTags: CandidateTag[], usage?: CharacterUsage): CardDigest {
  const data = card.rawCard.data;
  const firstMesDigest = buildFirstMesDigest(card, candidateTags);
  const sourceValues: Array<[EvidenceSourceType, string, unknown]> = [
    ['description', 'description', card.description],
    ['personality', 'personality', card.rawCard.personality ?? data?.personality],
    ['scenario', 'scenario', card.rawCard.scenario ?? data?.scenario],
    ['creatorNotes', 'creator_notes', card.creatorNotes || card.rawCard.creatorcomment || data?.creatorcomment],
    ['systemPrompt', 'system_prompt', card.rawCard.system_prompt ?? data?.system_prompt],
    ['postHistoryInstructions', 'post_history_instructions', card.rawCard.post_history_instructions ?? data?.post_history_instructions],
  ];
  if (card.cardType === 'world') {
    sourceValues.push([
      'extensionsWorld',
      'extensions/world',
      [
        stringifyUnknown(card.rawCard.character_book),
        stringifyUnknown(card.rawCard.extensions),
        stringifyUnknown(data && 'character_book' in data ? data.character_book : ''),
        stringifyUnknown(data && 'extensions' in data ? data.extensions : ''),
      ].join(' '),
    ]);
  }

  const blocks = [
    ...sourceValues.flatMap(([sourceType, sourceLabel, value]) => splitTextIntoBlocks(sourceType, sourceLabel, value)),
    ...collectCharacterBookBlocks(card),
  ];
  const scenarioEvidence = collectScenarioCharacterBookBlocks(card)
    .map((block) => scoreBlock(block, candidateTags))
    .filter((section): section is CardEvidenceSection => Boolean(section));

  const evidenceSections = bucketEvidence(
    [
      ...blocks
      .map((block) => scoreBlock(block, candidateTags))
      .filter((section): section is CardEvidenceSection => Boolean(section)),
      ...firstMesDigest.characterIntroEvidence,
    ],
  );
  const { selectedOpenings, skippedOpenings } = selectOpenings(card, candidateTags, usage);
  const selectedOpeningsWithEvidence = linkScenarioEvidence(selectedOpenings, scenarioEvidence, card.scenarioOpenings);

  return {
    cardId: card.id,
    name: card.name,
    cardTypeHint: card.cardType,
    sourceLengths: {
      description: card.description.length,
      personality: stringifyUnknown(card.rawCard.personality ?? data?.personality).length,
      scenario: stringifyUnknown(card.rawCard.scenario ?? data?.scenario).length,
      creatorNotes: card.creatorNotes.length,
      systemPrompt: stringifyUnknown(card.rawCard.system_prompt ?? data?.system_prompt).length,
      postHistoryInstructions: stringifyUnknown(card.rawCard.post_history_instructions ?? data?.post_history_instructions).length,
      characterBook: collectCharacterBookBlocks(card).reduce((sum, block) => sum + block.text.length, 0),
      scenarioCharacterBook: collectScenarioCharacterBookBlocks(card).reduce((sum, block) => sum + block.text.length, 0),
      firstMes: card.firstMessage.length,
      alternateGreetings: card.alternateGreetings.reduce((sum, greeting) => sum + greeting.length, 0),
    },
    firstMesDigest,
    evidenceSections,
    selectedOpenings: selectedOpeningsWithEvidence,
    skippedOpenings,
    skippedOpeningsSummary: countSkipped(skippedOpenings),
  };
}
