import { fetchOpenAiCompatible } from './aiProxy';
import { safeJsonParse } from './jsonSafety';
import { buildTasteProfile } from './tasteProfile';
import { estimateTokens } from './tokenEstimate';
import type { ApiConfig, ApiUsage, CardAnalysisResult, NormalizedCharacterCard, TasteProfile, TasteProfileAiSection } from '../domain/types';

type AiTasteProfileResponse = {
  headline?: string;
  sections?: unknown[];
  warnings?: unknown[];
};

type AiTasteProfileSection = {
  title?: unknown;
  body?: unknown;
  relatedTags?: unknown;
};

const SYSTEM_PROMPT = `你现在是用户的“毒舌闺蜜”。你拥有一双看透一切的慧眼，刚刚翻阅了用户在 SillyTavern里资料。你的任务是为ta生成一份专属的「赛博口味与XP体检报告」。Tone：幽默、辛辣、一针见血、网感十足。态度：表面嫌弃吐槽，实则包容宠溺。你可以无情揭穿ta的隐藏癖好，但**绝对不能**进行真正的道德批判、说教或让人感到羞耻。要在吐槽中透出“虽然你XP很邪门，但谁让你是我姐妹/兄弟，我懂你”的亲密感。输出严格 JSON，不要 markdown，不要解释，不要额外文字。`;

const OUTPUT_SCHEMA_HINT = `输出结构必须是：
{
  "headline": "string",
  "sections": [
    {
      "title": "string",
      "body": "string",
      "relatedTags": ["string"]
    }
  ],
  "warnings": []
}
要求：
1. 👑 【专属称号】
用极其精辟、带梗的四到八个字概括ta的核心口味。
这个称号必须放在 headline 字段里，不要再作为 sections 的一段重复输出。

2. 📊 【XP 灵魂成分表】
根据数据，列出 3-4 个构成ta品味的核心成分及百分比，并用一句简短的话吐槽。
(例如：🩹 创伤救赎综合征 40% - “你是来谈恋爱的还是来当赛博华佗的？”)
只输出一次 XP 灵魂成分表，不要在多个 section 中重复同一张成分表。

3. 🔍 【闺蜜的无情阅卷：剧情与人设分析】
从数据中深挖规律，犀利点出ta最无法抗拒的“套路”。（例如ta吃软不吃硬？还是就喜欢被虐？）把ta那点藏不住的xp底裤给我扒出来。

4. 📈 【赛博海王/寡王鉴定：行为数据大起底】
从数据中吐槽ta的“赛博精力”和“专一程度”。可以贴脸调侃，也可以调侃ta的赛博作息和肝度。

事实规则：
- 你只能基于 topTags、representativeCharacters、representativeScenarios 和 reasons 下结论。
- behaviorSummary 和 usageHighlights 只代表使用习惯：玩得久、最近还在玩、隔一阵回坑、一次性尝鲜。可以用它们判断“复购感”和“上头后冷却”，但不要当成现实人格判断。
- 不要自行纠正单卡标签，不要写“某标签其实不成立”这类 warnings；除非输入 warnings 已经明确指出。
- 如果某角色带有“联姻/相亲”等标签，不要臆测为“角色拒绝婚姻”。要看 reasons 和一句话总结：可能是接受联姻、把婚姻当筹码、或把爱情排除在婚姻之外。
- warnings 只放数据质量问题，不放你对剧情设定的主观纠偏。`;

const ESTIMATED_OUTPUT_TOKEN_LIMIT = 1200;

class TasteProfileRequestError extends Error {
  statusCode?: number;
  retryCount: number;

  constructor(message: string, retryCount: number, statusCode?: number) {
    super(message);
    this.name = 'TasteProfileRequestError';
    this.retryCount = retryCount;
    this.statusCode = statusCode;
  }
}

function daysSince(value?: string) {
  if (!value) {
    return undefined;
  }
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    return undefined;
  }
  return Math.max(0, Math.floor((Date.now() - timestamp) / 86400000));
}

function topHours(hourBuckets: number[] | undefined, limit = 3) {
  return (hourBuckets ?? [])
    .map((count, hour) => ({ hour, count }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function buildProfileInput(profile: TasteProfile, cards: NormalizedCharacterCard[]) {
  const usedCards = profile.characterUsages.filter((usage) => usage.chatCount > 0 || usage.totalMessages > 0);
  const usedCardIds = new Set(usedCards.map((usage) => usage.characterId));
  const analyzedCardIds = new Set([
    ...profile.representativeCharacters.map((character) => character.cardId),
    ...profile.characterUsages.map((usage) => usage.characterId),
  ]);
  const recentlyActiveCards = usedCards.filter((usage) => {
    const days = daysSince(usage.lastActiveAt);
    return typeof days === 'number' && days <= 30;
  });
  const longRunCards = usedCards.filter((usage) => (usage.activeDays ?? 0) >= 3);
  const allHourBuckets = usedCards.reduce<number[]>(
    (buckets, usage) => buckets.map((count, hour) => count + (usage.activeHourBuckets?.[hour] ?? 0)),
    Array.from({ length: 24 }, () => 0),
  );
  return {
    collectedCardCount: cards.length,
    analyzedCardCount: profile.analyzedCardCount,
    unplayedCollectedCount: Math.max(0, cards.length - usedCardIds.size),
    unplayedAnalyzedCount: Math.max(0, profile.analyzedCardCount - usedCards.length),
    behaviorSummary: {
      usedCardCount: usedCards.length,
      recentlyActiveCardCount: recentlyActiveCards.length,
      longRunCardCount: longRunCards.length,
      totalChats: usedCards.reduce((sum, usage) => sum + usage.chatCount, 0),
      totalMessages: usedCards.reduce((sum, usage) => sum + usage.totalMessages, 0),
      averageActiveDays: usedCards.length
        ? Number((usedCards.reduce((sum, usage) => sum + (usage.activeDays ?? 0), 0) / usedCards.length).toFixed(1))
        : 0,
      topActiveHours: topHours(allHourBuckets),
    },
    topTags: profile.tagStats.slice(0, 12).map((tag) => ({
      label: tag.label,
      category: tag.category,
      scope: tag.scope,
      frequency: tag.frequency,
      cardCount: tag.cardCount,
      scenarioCount: tag.scenarioCount,
      weightedScore: tag.weightedScore,
      representativeCardName: tag.representativeCardName,
      representativeScenarioName: tag.representativeScenarioName,
      reasons: tag.reasons.slice(0, 2),
    })),
    topCoOccurrences: profile.coOccurrences.slice(0, 10).map((pair) => ({
      labels: pair.labels,
      count: pair.count,
      weightedScore: pair.weightedScore,
    })),
    absentTags: profile.absentTags.map((tag) => ({
      label: tag.label,
      category: tag.category,
      family: tag.family,
    })),
    representativeCharacters: profile.representativeCharacters,
    representativeScenarios: profile.representativeScenarios,
    usageHighlights: usedCards
      .map((usage) => ({
        characterId: usage.characterId,
        cardName: cards.find((card) => card.id === usage.characterId)?.name,
        chatCount: usage.chatCount,
        totalMessages: usage.totalMessages,
        activeDays: usage.activeDays ?? 0,
        daysSinceLastActive: daysSince(usage.lastActiveAt),
        topActiveHours: topHours(usage.activeHourBuckets, 2),
      }))
      .sort((a, b) => b.totalMessages - a.totalMessages || b.activeDays - a.activeDays)
      .slice(0, 12),
    unplayedSample: cards
      .filter((card) => !usedCardIds.has(card.id))
      .slice(0, 12)
      .map((card) => ({
        cardId: card.id,
        cardName: card.name,
        analyzed: analyzedCardIds.has(card.id),
      })),
    warnings: profile.warnings.slice(0, 12),
  };
}

function buildMessages(profile: TasteProfile, cards: NormalizedCharacterCard[]) {
  return [
    { role: 'system' as const, content: SYSTEM_PROMPT },
    {
      role: 'user' as const,
      content: `${OUTPUT_SCHEMA_HINT}\n\n请基于这份本地统计生成“你的XP小票”说破文案：\n${JSON.stringify(buildProfileInput(profile, cards))}`,
    },
  ];
}

function buildRequestPayload(profile: TasteProfile, cards: NormalizedCharacterCard[], config: ApiConfig) {
  return {
    model: config.model,
    temperature: 0.65,
    response_format: { type: 'json_object' },
    messages: buildMessages(profile, cards),
  };
}

function buildDebug(profile: TasteProfile, cards: NormalizedCharacterCard[], config: ApiConfig): NonNullable<TasteProfile['debug']> {
  const messages = buildMessages(profile, cards);
  const systemPrompt = messages[0].content;
  const userPrompt = messages[1].content;
  const systemPromptTokens = estimateTokens(systemPrompt);
  const userPromptTokens = estimateTokens(userPrompt);
  return {
    messages,
    systemPrompt,
    userPrompt,
    requestPayloadPreview: buildRequestPayload(profile, cards, config),
    tokenEstimate: {
      systemPromptTokens,
      userPromptTokens,
      totalInputTokens: systemPromptTokens + userPromptTokens,
      estimatedOutputTokenLimit: ESTIMATED_OUTPUT_TOKEN_LIMIT,
      estimatedTotalTokens: systemPromptTokens + userPromptTokens + ESTIMATED_OUTPUT_TOKEN_LIMIT,
    },
    parseWarnings: [],
    validationErrors: [],
  };
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function sanitizeSections(value: unknown, allowedLabels: Set<string>, validationErrors: string[]): TasteProfileAiSection[] {
  if (!Array.isArray(value)) {
    validationErrors.push('AI 返回 sections 不是数组。');
    return [];
  }

  return value
    .filter((section): section is AiTasteProfileSection => typeof section === 'object' && section !== null)
    .map((section) => ({
      title: readString(section.title).slice(0, 40),
      body: readString(section.body).slice(0, 260),
      relatedTags: Array.isArray(section.relatedTags)
        ? section.relatedTags.map(readString).filter((tag) => allowedLabels.has(tag)).slice(0, 8)
        : [],
    }))
    .filter((section) => section.title && section.body)
    .slice(0, 5);
}

function fallbackSections(profile: TasteProfile): TasteProfileAiSection[] {
  const topTags = profile.tagStats.slice(0, 6).map((tag) => tag.label);
  const topPair = profile.coOccurrences[0]?.labels;
  const scenario = profile.representativeScenarios[0];
  const absent = profile.absentTags.slice(0, 4).map((tag) => tag.label).join('、');
  return [
    {
      title: '小票抬头',
      body: topPair
        ? `你这里最稳定的不是单口味，是「${topPair.join(' + ')}」这种打包购买。不是随便酸一下，是权重、距离、拉扯和那点不肯明说的偏心一起上桌。`
        : `目前最显眼的是 ${topTags.join('、') || '暂无标签'}。小票不够长，但味儿已经开始冒头了。`,
      relatedTags: topTags.slice(0, 4),
    },
    {
      title: '最上头线路',
      body: scenario
        ? `代表线路先记 ${scenario.cardName} 的「${scenario.scenarioName}」。你不是只看角色设定，你会在特定开场里反复确认那条关系线到底能不能失控。`
        : '线路数据还不够，小票机只能先看卡面。等更多卡分析完，哪条线最会让你续杯就藏不住了。',
      relatedTags: scenario?.tags.slice(0, 4) ?? [],
    },
    {
      title: '本期没买',
      body: absent
        ? `有些味型这轮几乎没出现，比如 ${absent}。这不代表你绝对不吃，只说明当前卡库暂时没把它们摆上收银台。`
        : '词典里的冷门项暂时没有明显缺席，说明这批卡已经够杂，CharaLog 需要再精算一下。',
      relatedTags: [],
    },
  ];
}

async function requestTasteProfile(profile: TasteProfile, cards: NormalizedCharacterCard[], config: ApiConfig): Promise<{ content: string; rawApiResponse: unknown; usage?: ApiUsage }> {
  if (!config.baseUrl.trim() || !config.apiKey.trim() || !config.model.trim()) {
    throw new TasteProfileRequestError('AI 配置不完整：请检查 Base URL、API Key 和 Model。', 0);
  }

  let lastError = '';
  let lastStatusCode: number | undefined;

  for (let attempt = 0; attempt <= config.maxRetries; attempt += 1) {
    const controller = new AbortController();
    const timeout = globalThis.setTimeout(
      () => controller.abort(new DOMException(`请求超过 ${Math.round(config.timeoutMs / 1000)} 秒未完成，已自动停止。`, 'TimeoutError')),
      config.timeoutMs,
    );
    try {
      const response = await fetchOpenAiCompatible(config, '/chat/completions', {
        method: 'POST',
        body: JSON.stringify(buildRequestPayload(profile, cards, config)),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.text();
        lastStatusCode = response.status;
        throw new Error(`HTTP ${response.status}: ${body.slice(0, 300)}`);
      }

      const payload = (await response.json()) as { choices?: Array<{ message?: { content?: string } }>; usage?: ApiUsage };
      const content = payload.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('响应里没有 choices[0].message.content。');
      }

      return { content, rawApiResponse: payload, usage: payload.usage };
    } catch (error) {
      lastError = controller.signal.aborted
        ? `请求超过 ${Math.round(config.timeoutMs / 1000)} 秒未完成，已自动停止。可以调大 timeoutMs 后重试。`
        : error instanceof Error
          ? error.message
          : '未知请求错误';
    } finally {
      globalThis.clearTimeout(timeout);
    }
  }

  throw new TasteProfileRequestError(`XP 小票 AI 请求失败：${lastError}`, config.maxRetries, lastStatusCode);
}

export function buildTasteProfileDebugPreview(
  cards: NormalizedCharacterCard[],
  analysisResults: CardAnalysisResult[],
  config: ApiConfig,
): NonNullable<TasteProfile['debug']> {
  return buildDebug(buildTasteProfile(cards, analysisResults), cards, config);
}

export async function generateTasteProfileWithAi(
  cards: NormalizedCharacterCard[],
  analysisResults: CardAnalysisResult[],
  config: ApiConfig,
): Promise<TasteProfile> {
  const localProfile = buildTasteProfile(cards, analysisResults);
  const debug = buildDebug(localProfile, cards, config);

  try {
    const { content, rawApiResponse, usage } = await requestTasteProfile(localProfile, cards, config);
    const parsed = safeJsonParse<AiTasteProfileResponse>(content);
    debug.rawApiResponse = rawApiResponse;
    debug.apiUsage = usage;

    if (!parsed.ok) {
      debug.parseWarnings.push(`AI 返回 JSON 解析失败：${parsed.error}`);
      return buildTasteProfile(cards, analysisResults, {
        aiSections: fallbackSections(localProfile),
        debug,
        extraWarnings: [`XP 小票 AI JSON 解析失败：${parsed.error}`],
      });
    }

    const allowedLabels = new Set(localProfile.tagStats.map((tag) => tag.label));
    const validationErrors: string[] = [];
    const sections = sanitizeSections(parsed.value.sections, allowedLabels, validationErrors);
    debug.validationErrors.push(...validationErrors);
    debug.parsedTasteProfile = parsed.value;

    if (sections.length === 0) {
      debug.validationErrors.push('AI 没有返回可用的小票段落，已使用本地兜底。');
      return buildTasteProfile(cards, analysisResults, {
        aiSections: fallbackSections(localProfile),
        debug,
        extraWarnings: ['AI 没有返回可用的小票段落，已使用本地兜底。'],
      });
    }

    return buildTasteProfile(cards, analysisResults, {
      title: readString(parsed.value.headline).slice(0, 32) || undefined,
      aiSections: sections,
      debug,
    });
  } catch (error) {
    const requestError = error instanceof TasteProfileRequestError ? error : undefined;
    debug.error = {
      statusCode: requestError?.statusCode,
      message: error instanceof Error ? error.message : 'XP 小票 AI 请求失败。',
      retryCount: requestError?.retryCount ?? config.maxRetries,
    };
    return buildTasteProfile(cards, analysisResults, {
      aiSections: fallbackSections(localProfile),
      debug,
      extraWarnings: [debug.error.message],
    });
  }
}
