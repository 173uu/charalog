import { computeCardSourceHash, getCachedAnalysis, setCachedAnalysis } from './analysisCache';
import { fetchOpenAiCompatible } from './aiProxy';
import { buildCardAnalysisInput, type CardAnalysisInput } from './cardAnalysisInput';
import { safeJsonParse } from './jsonSafety';
import { recallCandidateTags } from './recallCandidateTags';
import { estimateTokens } from './tokenEstimate';
import { normalizeForMatch } from '../domain/textCleanup';
import type {
  AiAnalysisDebugInfo,
  AiCardType,
  AiScenarioTagGroup,
  AiSelectedTag,
  AiSuggestedTag,
  ApiConfig,
  ApiUsage,
  BatchAnalysisProgress,
  CardAnalysisResult,
  NormalizedCharacterCard,
  ScenarioOneLineSummary,
} from '../domain/types';

export type AnalyzeProgressCallback = (progress: BatchAnalysisProgress) => void;

type AiBatchResponse = {
  results?: unknown[];
};

const ALLOWED_CARD_TYPES: AiCardType[] = [
  'single_character',
  'single_character_multi_scenario',
  'multi_character',
  'world_setting',
  'fandom',
  'scenario_collection',
  'unknown',
];

export const SYSTEM_PROMPT = `你是 CharaLog 的角色卡标签精选器和一句话文案写手，服务于 SillyTavern 角色卡档案分析。
你只分析输入里提供的角色卡证据段、first_mes 入口解析、被选择的 openings、候选标签和本地行为摘要；不分析用户真实人格，不做心理诊断，不读取或推断完整聊天正文。
你必须严格输出 JSON，不要 markdown，不要解释，不要额外文字。

- 正式标签只能从输入的 localCandidateTags 中选择，放入 baseTags/scenarioTags/worldTags/castTags；正式标签宁可少选，也不要硬贴。
- baseTags 建议 0-4 个。它们必须能概括主角色长期稳定的人设、核心关系或核心情感结构；不要为了凑满数量选择泛泛的氛围词。
- localCandidateTags 是本地检索出来的候选线索，不是答案；score 只表示“可能相关”，不能替代证据判断，也不能因为分高就自动采用。
- suggestedTags 是你主动提出的“词典缺口建议”，不参与正式统计。每张卡都要检查是否有 1-5 个比 localCandidateTags 更准确的核心标签、关系标签、性格标签或线路标签；只要有清楚证据，就放入 suggestedTags。
- suggestedTags 不要重复 localCandidateTags 里已经存在的 label；它应该表达词典没有覆盖好、但对一句话总结和标签判断很关键的味道。
- baseTags 只能基于 cardDigest.evidenceSections、cardDigest.firstMesDigest.characterIntroEvidence、rawTags 中稳定成立的主角色证据，scope 必须是 card。
- 不要把地点、校园/日常场景、聊天语气、开场玩法、状态栏格式、NPC 关系史、住所资产、世界观背景当成 baseTags；除非证据明确说它们是主角色长期核心人设。
- first_mes 可能同时包含角色介绍、线路目录、世界书开关、玩法提示、UI 壳和 NPC 信息。只有 characterIntroEvidence 能支持主角色 baseTags。
- cardDigest.firstMesDigest.routeManifest 只说明线路供给和世界书/玩法提示，不能直接当作主角色稳定性格。
- openings 中如果带 routeManifestItem，优先把它理解为线路摘要，而不是完整开场白正文。
- scenarioTags 只能基于 openings 中实际发送的 selected openings 或 routeManifestItem；如果 opening 的 selectionReason 不是 played，它只能说明卡片供给，不能被当作用户偏好。
- 不要把只出现在 opening、routeManifest 或 linkedEvidence 的关系设定误判成整张卡 baseTag。
- 明显属于 NPC、配角、群像成员、世界书说明或玩法规则的内容，不要混成主角色性格；需要时只能放到 scenarioTags/worldTags/castTags，证据不足就不要选。
- cardDigest.skippedOpenings 只用于理解哪些内容没有发送，不要据此脑补标签。
- 如果正式词典候选不够准确，不要用相近但错误的词典标签凑数；请少选正式标签，并在 suggestedTags 中提出更准确的新标签。如果证据不足，在 warnings 中说明。
- warnings 只用于数据质量问题，例如输入证据不足、候选标签明显缺失、JSON 字段异常；不要在 warnings 里写剧情纠偏、标签反驳或“某角色其实不是某标签”这类主观判断。

文案规则：
- oneLineSummary 不是剧情简介，而是一句核心情感冲突。
- 语气像 CharaLog：毒舌闺蜜、精准、有趣，但不羞辱用户。
- 每个角色身上都有一个标志性的姿态：他/她面对世界、面对用户时最典型的样子。用具体意象写出来。`;

export const OUTPUT_SCHEMA_HINT = `输出结构必须是：
{
  "results": [
    {
      "cardId": "string",
      "cardType": "single_character | single_character_multi_scenario | multi_character | world_setting | fandom | scenario_collection | unknown",
      "baseTags": [{"label":"string","category":"string","scope":"card","confidence":0.0,"reason":"string"}],
      "scenarioTags": [{"scenarioId":"string","scenarioName":"string","tags":[{"label":"string","category":"string","scope":"scenario","confidence":0.0,"reason":"string"}]}],
      "worldTags": [],
      "castTags": [],
      "suggestedTags": [{"label":"string","category":"string","scope":"card | scenario | world | cast","confidence":0.0,"reason":"string","evidence":"string"}],
      "oneLineSummary": "string",
      "scenarioOneLineSummaries": [{"scenarioId":"string","summary":"string"}],
      "warnings": []
    }
  ]
}`;

const ESTIMATED_OUTPUT_TOKEN_LIMIT = 1600;
const DEFAULT_MAX_BATCH_INPUT_TOKENS = 24000;
const GEMINI_MAX_BATCH_INPUT_TOKENS = 96000;
const LONG_CONTEXT_MAX_BATCH_INPUT_TOKENS = 64000;

class AiRequestError extends Error {
  statusCode?: number;
  retryCount: number;

  constructor(message: string, retryCount: number, statusCode?: number) {
    super(message);
    this.name = 'AiRequestError';
    this.retryCount = retryCount;
    this.statusCode = statusCode;
  }
}

function fallbackCardType(card: NormalizedCharacterCard): AiCardType {
  if (card.cardType === 'single') {
    return 'single_character';
  }
  if (card.cardType === 'multi_scenario') {
    return 'single_character_multi_scenario';
  }
  if (card.cardType === 'group') {
    return 'multi_character';
  }
  if (card.cardType === 'world') {
    return 'world_setting';
  }
  return 'unknown';
}

function clampConfidence(value: unknown): number {
  const numberValue = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numberValue)) {
    return 0;
  }
  return Math.max(0, Math.min(1, numberValue));
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function sanitizeWarnings(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map(readString)
    .map((warning) => warning.trim())
    .filter(Boolean)
    .filter((warning) => /输入|JSON|字段|候选.*缺|证据不足|无法判断|数量|解析|配置|请求|超时|不匹配/i.test(warning))
    .slice(0, 8);
}

function buildMessages(inputs: CardAnalysisInput[]) {
  return [
    { role: 'system' as const, content: SYSTEM_PROMPT },
    {
      role: 'user' as const,
      content: `${OUTPUT_SCHEMA_HINT}\n\n请分析下面的角色卡输入：\n${JSON.stringify({ cards: inputs })}`,
    },
  ];
}

function buildRequestPayload(inputs: CardAnalysisInput[], config: ApiConfig) {
  return {
    model: config.model,
    temperature: 0.2,
    response_format: { type: 'json_object' },
    messages: buildMessages(inputs),
  };
}

function buildCardAnalysisInputPreview(input: CardAnalysisInput): AiAnalysisDebugInfo['cardAnalysisInputPreview'] {
  return {
    cardId: input.cardId,
    name: input.name,
    cardTypeHint: input.cardTypeHint,
    sourceLengths: input.cardDigest.sourceLengths,
    evidenceSectionCount: input.cardDigest.evidenceSections.length,
    evidenceSectionsPreview: input.cardDigest.evidenceSections.slice(0, 12).map((section) => ({
      sourceType: section.sourceType,
      categoryHint: section.categoryHint,
      length: section.text.length,
      score: section.score,
      matchedTags: section.matchedTags,
      reason: section.reason,
    })),
    firstMesRouteCount: input.cardDigest.firstMesDigest.routeManifestCount,
    firstMesIntroEvidenceCount: input.cardDigest.firstMesDigest.characterIntroEvidence.length,
    firstMesWorldBookHintCount: input.cardDigest.firstMesDigest.worldBookHints.length,
    selectedOpeningsCount: input.openings.length,
    skippedOpeningsCount: input.cardDigest.skippedOpenings.length,
    skippedOpeningsSummary: input.cardDigest.skippedOpeningsSummary,
    openingExcerptLengths: input.openings.map((opening) => ({
      scenarioId: opening.scenarioId,
      title: opening.title,
      length: opening.contentExcerpt.length,
      selectionReason: opening.selectionReason as never,
      hasRouteManifestItem: input.cardDigest.firstMesDigest.routeManifestCount > 0 && opening.contentExcerpt.length < 180,
    })),
    candidateTagsCount: input.localCandidateTags.length,
    candidateTagsPreview: input.localCandidateTags.slice(0, 20).map((tag) => ({
      label: tag.label,
      category: tag.category,
      score: tag.score,
      scopeHint: tag.scopeHint,
      matchedFields: tag.matchedFields,
    })),
  };
}

function buildDebugInfo(inputs: CardAnalysisInput[], config: ApiConfig, inputIndex = 0): AiAnalysisDebugInfo {
  const messages = buildMessages(inputs);
  const systemPrompt = messages[0].content;
  const userPrompt = messages[1].content;
  const systemPromptTokens = estimateTokens(systemPrompt);
  const userPromptTokens = estimateTokens(userPrompt);

  return {
    messages,
    systemPrompt,
    userPrompt,
    requestPayloadPreview: buildRequestPayload(inputs, config),
    cardAnalysisInputPreview: buildCardAnalysisInputPreview(inputs[inputIndex] ?? inputs[0]),
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

export function buildCardAnalysisDebugPreview(card: NormalizedCharacterCard, config: ApiConfig, usage?: CardAnalysisResult['usage']): AiAnalysisDebugInfo {
  return buildDebugInfo([buildCardAnalysisInput(card, usage)], config);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sanitizeTags(value: unknown, allowedLabels: Set<string>, expectedScope: AiSelectedTag['scope']): AiSelectedTag[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((tag) => ({
      label: readString(tag.label),
      category: readString(tag.category),
      scope: readString(tag.scope) === expectedScope ? expectedScope : expectedScope,
      confidence: clampConfidence(tag.confidence),
      reason: readString(tag.reason).slice(0, 160),
    }))
    .filter((tag) => tag.label && allowedLabels.has(tag.label));
}

function collectCardLevelAllowedLabels(input: CardAnalysisInput): Set<string> {
  const labels = new Set<string>(input.rawTags);
  input.cardDigest.evidenceSections.forEach((section) => {
    section.matchedTags.forEach((label) => labels.add(label));
  });
  input.cardDigest.firstMesDigest.characterIntroEvidence.forEach((section) => {
    section.matchedTags.forEach((label) => labels.add(label));
  });
  return labels;
}

function collectScenarioAllowedLabels(input: CardAnalysisInput, scenarioId: string): Set<string> {
  const labels = new Set<string>();
  const opening = input.openings.find((item) => item.scenarioId === scenarioId);
  opening?.matchedTags.forEach((label) => labels.add(label));
  opening?.linkedEvidence?.forEach((section) => {
    section.matchedTags.forEach((label) => labels.add(label));
  });
  const openingText = normalizeForMatch(
    [opening?.title, opening?.contentExcerpt, ...(opening?.linkedEvidence?.map((section) => section.text) ?? [])].filter(Boolean).join(' '),
  );
  input.localCandidateTags.forEach((tag) => {
    const label = normalizeForMatch(tag.label);
    const snippetMatched = tag.matchedSnippets.some((snippet) => {
      const normalizedSnippet = normalizeForMatch(snippet).slice(0, 24);
      return normalizedSnippet.length >= 2 && openingText.includes(normalizedSnippet);
    });
    if ((label && openingText.includes(label)) || snippetMatched) {
      labels.add(tag.label);
    }
  });
  return labels;
}

function sanitizeSuggestedTags(value: unknown, dictionaryLabels: Set<string>): AiSuggestedTag[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const allowedScopes = new Set<AiSuggestedTag['scope']>(['card', 'scenario', 'world', 'cast']);
  const seen = new Set<string>();
  return value
    .filter(isRecord)
    .map((tag) => {
      const label = readString(tag.label).trim().slice(0, 24);
      const scope = readString(tag.scope) as AiSuggestedTag['scope'];
      return {
        label,
        category: readString(tag.category).trim().slice(0, 24) || undefined,
        scope: allowedScopes.has(scope) ? scope : 'card',
        confidence: clampConfidence(tag.confidence),
        reason: readString(tag.reason).slice(0, 180),
        evidence: readString(tag.evidence).slice(0, 180),
      };
    })
    .filter((tag) => tag.label && tag.reason && tag.evidence && !dictionaryLabels.has(tag.label))
    .filter((tag) => {
      const key = `${tag.scope}:${tag.label}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .slice(0, 8);
}

function sanitizeScenarioTags(value: unknown, allowedLabels: Set<string>, input: CardAnalysisInput): AiScenarioTagGroup[] {
  const openingIds = new Set(input.openings.map((opening) => opening.scenarioId));
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((group) => {
      const scenarioId = readString(group.scenarioId);
      const fallbackName = input.openings.find((opening) => opening.scenarioId === scenarioId)?.title ?? '未识别线路';
      const scenarioAllowedLabels = collectScenarioAllowedLabels(input, scenarioId);
      return {
        scenarioId,
        scenarioName: readString(group.scenarioName) || fallbackName,
        tags: sanitizeTags(group.tags, allowedLabels, 'scenario').filter((tag) => scenarioAllowedLabels.has(tag.label)),
      };
    })
    .filter((group) => openingIds.has(group.scenarioId));
}

function sanitizeScenarioSummaries(value: unknown, input: CardAnalysisInput): ScenarioOneLineSummary[] {
  const openingIds = new Set(input.openings.map((opening) => opening.scenarioId));
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((summary) => ({
      scenarioId: readString(summary.scenarioId),
      summary: readString(summary.summary).slice(0, 120),
    }))
    .filter((summary) => openingIds.has(summary.scenarioId) && summary.summary);
}

function mapInputCandidateTags(input: CardAnalysisInput): CardAnalysisResult['localCandidateTags'] {
  return input.localCandidateTags.map((tag, index) => ({
    tagId: `${input.cardId}-candidate-${index}`,
    label: tag.label,
    category: tag.category,
    score: tag.score,
    scopeHint: tag.scopeHint,
    matchedFields: tag.matchedFields,
    matchedSnippets: tag.matchedSnippets,
  }));
}

function createFallbackResult(card: NormalizedCharacterCard, warning: string, debug?: AiAnalysisDebugInfo): CardAnalysisResult {
  const localCandidateTags = recallCandidateTags(card);
  const sourceHash = computeCardSourceHash(card);

  return {
    cardId: card.id,
    cardType: fallbackCardType(card),
    baseTags: localCandidateTags
      .filter((tag) => tag.scopeHint === 'card')
      .slice(0, 6)
      .map((tag) => ({
        label: tag.label,
        category: tag.category,
        scope: 'card',
        confidence: Math.min(0.72, tag.score / 20),
        reason: 'AI 分析失败，暂用本地候选标签兜底。',
      })),
    scenarioTags: card.scenarioOpenings.map((opening) => ({
      scenarioId: opening.id,
      scenarioName: opening.title,
      tags: localCandidateTags
        .filter((tag) => tag.scopeHint === 'scenario')
        .slice(0, 5)
        .map((tag) => ({
          label: tag.label,
          category: tag.category,
          scope: 'scenario',
          confidence: Math.min(0.68, tag.score / 20),
          reason: 'AI 分析失败，暂用本地候选标签兜底。',
        })),
    })),
    worldTags: [],
    castTags: [],
    suggestedTags: [],
    oneLineSummary: '这张卡还没被 AI 读明白，先按本地闻到的味儿挂起待重审。',
    scenarioOneLineSummaries: [],
    warnings: [warning],
    localCandidateTags,
    generatedAt: new Date().toISOString(),
    sourceHash,
    debug,
  };
}

function createFallbackResultFromInput(input: CardAnalysisInput, warning: string, debug?: AiAnalysisDebugInfo): CardAnalysisResult {
  return {
    cardId: input.cardId,
    cardType: 'unknown',
    baseTags: input.localCandidateTags
      .filter((tag) => tag.scopeHint === 'card')
      .slice(0, 6)
      .map((tag) => ({
        label: tag.label,
        category: tag.category,
        scope: 'card',
        confidence: Math.min(0.72, tag.score / 20),
        reason: 'AI 分析失败，暂用本地候选标签兜底。',
      })),
    scenarioTags: input.openings.map((opening) => ({
      scenarioId: opening.scenarioId,
      scenarioName: opening.title,
      tags: input.localCandidateTags
        .filter((tag) => tag.scopeHint === 'scenario')
        .slice(0, 5)
        .map((tag) => ({
          label: tag.label,
          category: tag.category,
          scope: 'scenario',
          confidence: Math.min(0.68, tag.score / 20),
          reason: 'AI 分析失败，暂用本地候选标签兜底。',
        })),
    })),
    worldTags: [],
    castTags: [],
    suggestedTags: [],
    oneLineSummary: '这张卡还没被 AI 读明白，先按本地闻到的味儿挂起待重审。',
    scenarioOneLineSummaries: [],
    warnings: [warning],
    localCandidateTags: mapInputCandidateTags(input),
    generatedAt: new Date().toISOString(),
    sourceHash: 'input-only',
    debug,
  };
}

function validateCardResult(raw: unknown, card: NormalizedCharacterCard, input: CardAnalysisInput, debug?: AiAnalysisDebugInfo): CardAnalysisResult {
  if (!isRecord(raw)) {
    const nextDebug = debug ? { ...debug, validationErrors: [...debug.validationErrors, 'AI 返回的单卡结果不是对象。'] } : undefined;
    return createFallbackResult(card, 'AI 返回的单卡结果不是对象。', nextDebug);
  }

  const localCandidateTags = recallCandidateTags(card);
  const allowedLabels = new Set(input.localCandidateTags.map((tag) => tag.label));
  const cardLevelAllowedLabels = collectCardLevelAllowedLabels(input);
  const cardType = readString(raw.cardType) as AiCardType;
  const warnings = sanitizeWarnings(raw.warnings);

  if (readString(raw.cardId) !== card.id) {
    warnings.push(`AI 返回 cardId 不匹配，已按输入卡 ${card.id} 归档。`);
  }

  const result: CardAnalysisResult = {
    cardId: card.id,
    cardType: ALLOWED_CARD_TYPES.includes(cardType) ? cardType : fallbackCardType(card),
    baseTags: sanitizeTags(raw.baseTags, allowedLabels, 'card').filter((tag) => cardLevelAllowedLabels.has(tag.label)),
    scenarioTags: sanitizeScenarioTags(raw.scenarioTags, allowedLabels, input),
    worldTags: sanitizeTags(raw.worldTags, allowedLabels, 'world'),
    castTags: sanitizeTags(raw.castTags, allowedLabels, 'cast'),
    suggestedTags: sanitizeSuggestedTags(raw.suggestedTags, allowedLabels),
    oneLineSummary: readString(raw.oneLineSummary).slice(0, 140) || '这张卡的核心冲突还没被模型说利索，先记为待重审。',
    scenarioOneLineSummaries: sanitizeScenarioSummaries(raw.scenarioOneLineSummaries, input),
    warnings,
    localCandidateTags,
    generatedAt: new Date().toISOString(),
    sourceHash: computeCardSourceHash(card),
    debug,
  };

  if (result.baseTags.length + result.scenarioTags.flatMap((group) => group.tags).length === 0) {
    result.warnings.push('AI 没有从候选标签中选出有效标签。');
    result.debug?.validationErrors.push('AI 没有从候选标签中选出有效标签。');
  }

  if (result.debug) {
    const { debug: _debug, ...serializableResult } = result;
    result.debug.parsedCardAnalysisResult = serializableResult;
  }

  return result;
}

function validateInputOnlyResult(raw: unknown, input: CardAnalysisInput, debug?: AiAnalysisDebugInfo, extraWarning?: string): CardAnalysisResult {
  if (!isRecord(raw)) {
    const nextDebug = debug ? { ...debug, validationErrors: [...debug.validationErrors, 'AI 返回的单卡结果不是对象。'] } : undefined;
    return createFallbackResultFromInput(input, 'AI 返回的单卡结果不是对象。', nextDebug);
  }

  const allowedLabels = new Set(input.localCandidateTags.map((tag) => tag.label));
  const cardLevelAllowedLabels = collectCardLevelAllowedLabels(input);
  const cardType = readString(raw.cardType) as AiCardType;
  const warnings = sanitizeWarnings(raw.warnings);
  if (extraWarning) {
    warnings.push(extraWarning);
  }
  if (readString(raw.cardId) !== input.cardId) {
    warnings.push(`AI 返回 cardId 不匹配，已按输入卡 ${input.cardId} 归档。`);
  }

  const result: CardAnalysisResult = {
    cardId: input.cardId,
    cardType: ALLOWED_CARD_TYPES.includes(cardType) ? cardType : 'unknown',
    baseTags: sanitizeTags(raw.baseTags, allowedLabels, 'card').filter((tag) => cardLevelAllowedLabels.has(tag.label)),
    scenarioTags: sanitizeScenarioTags(raw.scenarioTags, allowedLabels, input),
    worldTags: sanitizeTags(raw.worldTags, allowedLabels, 'world'),
    castTags: sanitizeTags(raw.castTags, allowedLabels, 'cast'),
    suggestedTags: sanitizeSuggestedTags(raw.suggestedTags, allowedLabels),
    oneLineSummary: readString(raw.oneLineSummary).slice(0, 140) || '这张卡的核心冲突还没被模型说利索，先记为待重审。',
    scenarioOneLineSummaries: sanitizeScenarioSummaries(raw.scenarioOneLineSummaries, input),
    warnings,
    localCandidateTags: mapInputCandidateTags(input),
    generatedAt: new Date().toISOString(),
    sourceHash: 'input-only',
    debug,
  };

  if (result.debug) {
    const { debug: _debug, ...serializableResult } = result;
    result.debug.parsedCardAnalysisResult = serializableResult;
  }

  return result;
}

async function requestChatCompletions(
  inputs: CardAnalysisInput[],
  config: ApiConfig,
): Promise<{ content: string; rawApiResponse: unknown; usage?: ApiUsage }> {
  if (!config.baseUrl.trim() || !config.apiKey.trim() || !config.model.trim()) {
    throw new AiRequestError('AI 配置不完整：请检查 Base URL、API Key 和 Model。', 0);
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
        body: JSON.stringify(buildRequestPayload(inputs, config)),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.text();
        lastStatusCode = response.status;
        throw new Error(`HTTP ${response.status}: ${body.slice(0, 300)}`);
      }

      const payload = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
        error?: unknown;
        usage?: ApiUsage;
      };
      const content = payload.choices?.[0]?.message?.content;
      if (!content) {
        const errorMessage =
          typeof payload.error === 'string'
            ? payload.error
            : payload.error && typeof payload.error === 'object' && 'message' in payload.error
              ? String((payload.error as { message?: unknown }).message ?? '')
              : '';
        throw new Error(errorMessage || 'AI 返回格式不是 Chat Completions：缺少 choices[0].message.content。');
      }

      return { content, rawApiResponse: payload, usage: payload.usage };
    } catch (error) {
      lastError = controller.signal.aborted
        ? `请求超过 ${Math.round(config.timeoutMs / 1000)} 秒未完成，已自动停止。可以调大 timeoutMs，或减少 batchSize 后重试。`
        : error instanceof Error
          ? error.message
          : '未知请求错误';
    } finally {
      globalThis.clearTimeout(timeout);
    }
  }

  throw new AiRequestError(`AI 请求失败：${lastError}`, config.maxRetries, lastStatusCode);
}

async function analyzeNormalizedCardBatch(
  cards: NormalizedCharacterCard[],
  config: ApiConfig,
  usageByCardId?: Map<string, NonNullable<CardAnalysisResult['usage']>>,
): Promise<CardAnalysisResult[]> {
  const inputs = cards.map((card) => buildCardAnalysisInput(card, usageByCardId?.get(card.id)));
  const { content, rawApiResponse, usage } = await requestChatCompletions(inputs, config);
  const parsed = safeJsonParse<AiBatchResponse>(content);

  if (!parsed.ok) {
    return cards.map((card, index) => {
      const debug = {
        ...buildDebugInfo(inputs, config, index),
        rawApiResponse,
        apiUsage: usage,
        parseWarnings: [`AI 返回 JSON 解析失败：${parsed.error}`],
      };
      return createFallbackResult(card, `AI 返回 JSON 解析失败：${parsed.error}`, debug);
    });
  }

  const rawResults = Array.isArray(parsed.value.results) ? parsed.value.results : [];
  const warningsByCard = new Map<string, string[]>();
  if (rawResults.length !== cards.length) {
    cards.forEach((card) => {
      warningsByCard.set(card.id, [`AI 返回 results 数量 ${rawResults.length} 与输入 ${cards.length} 不一致。`]);
    });
  }

  const rawByCardId = new Map<string, unknown>();
  rawResults.filter(isRecord).forEach((result) => {
    rawByCardId.set(readString(result.cardId), result);
  });

  return cards.map((card, index) => {
    const input = inputs[index];
    const raw = rawByCardId.get(card.id) ?? rawResults[index];
    if (!raw) {
      const debug = { ...buildDebugInfo(inputs, config, index), rawApiResponse, apiUsage: usage, parseWarnings: ['AI 没有返回这张卡的结果。'] };
      return createFallbackResult(card, 'AI 没有返回这张卡的结果。', debug);
    }

    const debug = {
      ...buildDebugInfo(inputs, config, index),
      rawApiResponse,
      apiUsage: usage,
      parseWarnings: warningsByCard.get(card.id) ?? [],
    };
    const result = validateCardResult(raw, card, input, debug);
    result.usage = usageByCardId?.get(card.id);
    result.warnings.push(...(warningsByCard.get(card.id) ?? []));
    try {
      setCachedAnalysis(result);
    } catch {
      // Cache is best-effort; returning a valid AI result matters more than persistence.
    }
    return result;
  });
}

export async function analyzeCardBatch(inputs: CardAnalysisInput[], config: ApiConfig): Promise<CardAnalysisResult[]> {
  const { content, rawApiResponse, usage } = await requestChatCompletions(inputs, config);
  const parsed = safeJsonParse<AiBatchResponse>(content);

  if (!parsed.ok) {
    return inputs.map((input, index) =>
      createFallbackResultFromInput(input, `AI 返回 JSON 解析失败：${parsed.error}`, {
        ...buildDebugInfo(inputs, config, index),
        rawApiResponse,
        apiUsage: usage,
        parseWarnings: [`AI 返回 JSON 解析失败：${parsed.error}`],
      }),
    );
  }

  const rawResults = Array.isArray(parsed.value.results) ? parsed.value.results : [];
  if (rawResults.length !== inputs.length) {
    return inputs.map((input, index) => {
      const warning = `AI 返回 results 数量 ${rawResults.length} 与输入 ${inputs.length} 不一致。`;
      const raw = rawResults[index];
      if (!raw) {
        return createFallbackResultFromInput(input, warning, {
          ...buildDebugInfo(inputs, config, index),
          rawApiResponse,
          apiUsage: usage,
          parseWarnings: [warning],
        });
      }
      return validateInputOnlyResult(raw, input, buildDebugInfo(inputs, config, index), warning);
    });
  }

  return inputs.map((input, index) =>
    validateInputOnlyResult(rawResults[index], input, {
      ...buildDebugInfo(inputs, config, index),
      rawApiResponse,
      apiUsage: usage,
    }),
  );
}

function estimateCardInputTokens(card: NormalizedCharacterCard, usage?: CardAnalysisResult['usage']): number {
  return estimateTokens(JSON.stringify(buildCardAnalysisInput(card, usage)));
}

function resolveMaxBatchInputTokens(model: string): number {
  const normalizedModel = model.toLowerCase();
  if (normalizedModel.includes('gemini')) {
    return GEMINI_MAX_BATCH_INPUT_TOKENS;
  }
  if (normalizedModel.includes('flash') || normalizedModel.includes('long') || normalizedModel.includes('128k') || normalizedModel.includes('200k')) {
    return LONG_CONTEXT_MAX_BATCH_INPUT_TOKENS;
  }
  return DEFAULT_MAX_BATCH_INPUT_TOKENS;
}

function buildTokenAwareBatches(
  cards: NormalizedCharacterCard[],
  batchSize: number,
  maxBatchInputTokens: number,
  usageByCardId?: Map<string, NonNullable<CardAnalysisResult['usage']>>,
): NormalizedCharacterCard[][] {
  const batches: NormalizedCharacterCard[][] = [];
  let currentBatch: NormalizedCharacterCard[] = [];
  let currentTokens = estimateTokens(SYSTEM_PROMPT) + estimateTokens(OUTPUT_SCHEMA_HINT);

  cards.forEach((card) => {
    const cardTokens = estimateCardInputTokens(card, usageByCardId?.get(card.id));
    const wouldExceedCount = currentBatch.length >= batchSize;
    const wouldExceedTokens = currentBatch.length > 0 && currentTokens + cardTokens > maxBatchInputTokens;

    if (wouldExceedCount || wouldExceedTokens) {
      batches.push(currentBatch);
      currentBatch = [];
      currentTokens = estimateTokens(SYSTEM_PROMPT) + estimateTokens(OUTPUT_SCHEMA_HINT);
    }

    currentBatch.push(card);
    currentTokens += cardTokens;
  });

  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  return batches;
}

function countSuccessfulResults(results: CardAnalysisResult[]): number {
  return results.filter(
    (result) =>
      !result.debug?.error &&
      result.warnings.every(
        (warning) =>
          !warning.includes('AI 配置不完整') &&
          !warning.includes('AI 请求失败') &&
          !warning.includes('AI 返回 JSON 解析失败') &&
          !warning.includes('AI 没有返回') &&
          !warning.includes('AI 返回的单卡结果不是对象') &&
          !warning.includes('AI 没有从候选标签中选出有效标签'),
      ),
  ).length;
}

export async function analyzeCardsInBatches(
  cards: NormalizedCharacterCard[],
  config: ApiConfig,
  onProgress?: AnalyzeProgressCallback,
  usageByCardId?: Map<string, NonNullable<CardAnalysisResult['usage']>>,
): Promise<CardAnalysisResult[]> {
  const batchSize = Math.max(1, config.batchSize);
  const maxBatchInputTokens = resolveMaxBatchInputTokens(config.model);
  const cachedResults = new Map(cards.map((card) => [card.id, getCachedAnalysis(card)]));
  const cardsToAnalyze = cards.filter((card) => !cachedResults.get(card.id));
  const batches = buildTokenAwareBatches(cardsToAnalyze, batchSize, maxBatchInputTokens, usageByCardId);
  const totalBatches = batches.length;
  const results: CardAnalysisResult[] = cards.flatMap((card) => {
    const cached = cachedResults.get(card.id);
    return cached ? [{ ...cached, usage: cached.usage ?? usageByCardId?.get(card.id) }] : [];
  });
  let failedBatches = 0;
  let failedCards = 0;
  let stoppedByError = '';
  let currentBatchNumber = 0;

  onProgress?.({
    cardsRead: cards.length,
    cardsToAnalyze: cardsToAnalyze.length,
    currentBatch: 0,
    totalBatches,
    batchSize,
    maxBatchInputTokens,
    completedCards: results.length,
    successfulCards: countSuccessfulResults(results),
    failedCards,
    failedBatches,
    status: 'running',
  });

  for (let index = 0; index < totalBatches; index += 1) {
    const batch = batches[index];
    currentBatchNumber = index + 1;

    onProgress?.({
      cardsRead: cards.length,
      cardsToAnalyze: cardsToAnalyze.length,
      currentBatch: index + 1,
      totalBatches,
      batchSize,
      maxBatchInputTokens,
      completedCards: results.length,
      successfulCards: countSuccessfulResults(results),
      failedCards,
      failedBatches,
      currentCardName: batch[0]?.name,
      status: 'running',
    });

    try {
      results.push(...(await analyzeNormalizedCardBatch(batch, config, usageByCardId)));
    } catch (error) {
      failedBatches += 1;
      const batchInputs = batch.map((item) => buildCardAnalysisInput(item, usageByCardId?.get(item.id)));
      stoppedByError = error instanceof Error ? error.message : '这批 AI 请求失败，已停止后续批次。';
      failedCards += batch.length;
      results.push(
        ...batch.map((card, cardIndex) => {
          const requestError = error instanceof AiRequestError ? error : undefined;
          const debug = buildDebugInfo(batchInputs, config, cardIndex);
          debug.error = {
            statusCode: requestError?.statusCode,
            message: stoppedByError,
            retryCount: requestError?.retryCount ?? config.maxRetries,
            failedBatchIndex: index + 1,
          };
          return createFallbackResult(card, stoppedByError, debug);
        }),
      );
      onProgress?.({
        cardsRead: cards.length,
        cardsToAnalyze: cardsToAnalyze.length,
        currentBatch: index + 1,
        totalBatches,
        batchSize,
        maxBatchInputTokens,
        completedCards: results.length,
        successfulCards: countSuccessfulResults(results),
        failedCards,
        failedBatches,
        currentCardName: batch[0]?.name,
        status: 'failed',
        errorMessage: stoppedByError,
      });
      break;
    }
  }

  const orderedResults = cards.flatMap((card) => {
    const result = results.find((item) => item.cardId === card.id);
    return result ? [result] : [];
  });

  onProgress?.({
    cardsRead: cards.length,
    cardsToAnalyze: cardsToAnalyze.length,
    currentBatch: stoppedByError ? currentBatchNumber : totalBatches,
    totalBatches,
    batchSize,
    maxBatchInputTokens,
    completedCards: orderedResults.length,
    successfulCards: countSuccessfulResults(orderedResults),
    failedCards,
    failedBatches,
    status: stoppedByError ? 'failed' : 'completed',
    errorMessage: stoppedByError || undefined,
  });

  return orderedResults;
}
