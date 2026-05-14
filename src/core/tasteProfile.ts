import dictionaryData from './dictionary';
import type {
  AiSelectedTag,
  CardAnalysisResult,
  CharacterUsage,
  NormalizedCharacterCard,
  RepresentativeCharacter,
  RepresentativeScenario,
  TagCoOccurrence,
  TasteProfile,
  TasteTagStat,
} from '../domain/types';

type TagAccumulator = TasteTagStat & {
  cardIds: Set<string>;
  scenarioIds: Set<string>;
};

type BuildTasteProfileOptions = {
  title?: string;
  aiSections?: TasteProfile['aiSections'];
  debug?: TasteProfile['debug'];
  extraWarnings?: string[];
};

const ABSENT_TAG_CATEGORIES = new Set(['角色气质', '情感走向', '世界观题材', '身份阶层', '互动机制']);
const QUIET_WARNINGS = ['AI 没有从候选标签中选出有效标签'];

function roundScore(value: number): number {
  return Math.round(value * 100) / 100;
}

function confidenceWeight(tag: AiSelectedTag): number {
  return Math.max(0.2, Math.min(1, tag.confidence || 0.5));
}

function behaviorWeight(usage?: CharacterUsage): number {
  if (!usage) {
    return 1;
  }
  return 1 + Math.log1p(usage.totalMessages) / 4 + usage.chatCount * 0.25;
}

function scenarioBehaviorWeight(usage: CharacterUsage | undefined, scenarioId: string): number {
  const scenario = usage?.scenarioStats.find((item) => item.scenarioId === scenarioId);
  if (!scenario || scenario.totalMessages < 12 || scenario.chatCount < 1) {
    return 0;
  }
  return scenario.totalMessages + scenario.chatCount * 8 + (scenario.activeDays ?? 0) * 4;
}

function getCardName(cardsById: Map<string, NormalizedCharacterCard>, cardId: string) {
  return cardsById.get(cardId)?.name ?? cardId;
}

function makeTagKey(label: string, category: string) {
  return `${label.trim()}::${category.trim()}`;
}

function addTag(
  tagMap: Map<string, TagAccumulator>,
  tag: AiSelectedTag,
  result: CardAnalysisResult,
  cardsById: Map<string, NormalizedCharacterCard>,
  weight: number,
  scenario?: { id: string; name: string },
) {
  const key = makeTagKey(tag.label, tag.category);
  const existing = tagMap.get(key);
  const score = weight * confidenceWeight(tag);
  const next: TagAccumulator =
    existing ??
    ({
      label: tag.label,
      category: tag.category,
      scope: tag.scope,
      frequency: 0,
      cardCount: 0,
      scenarioCount: 0,
      weightedScore: 0,
      representativeCardId: result.cardId,
      representativeCardName: getCardName(cardsById, result.cardId),
      representativeScenarioId: scenario?.id,
      representativeScenarioName: scenario?.name,
      reasons: [],
      cardIds: new Set<string>(),
      scenarioIds: new Set<string>(),
    } satisfies TagAccumulator);

  next.frequency += 1;
  next.weightedScore += score;
  next.cardIds.add(result.cardId);
  if (scenario) {
    next.scenarioIds.add(`${result.cardId}:${scenario.id}`);
  }
  if (next.scope !== tag.scope) {
    next.scope = 'mixed';
  }
  if (score >= next.weightedScore / Math.max(1, next.frequency)) {
    next.representativeCardId = result.cardId;
    next.representativeCardName = getCardName(cardsById, result.cardId);
    next.representativeScenarioId = scenario?.id;
    next.representativeScenarioName = scenario?.name;
  }
  if (tag.reason && next.reasons.length < 4) {
    next.reasons.push(tag.reason);
  }
  tagMap.set(key, next);
}

function addCoOccurrences(
  pairMap: Map<string, TagCoOccurrence>,
  labels: string[],
  result: CardAnalysisResult,
  weight: number,
) {
  const uniqueLabels = Array.from(new Set(labels)).sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
  for (let left = 0; left < uniqueLabels.length; left += 1) {
    for (let right = left + 1; right < uniqueLabels.length; right += 1) {
      const labelsPair: [string, string] = [uniqueLabels[left], uniqueLabels[right]];
      const key = labelsPair.join('::');
      const existing =
        pairMap.get(key) ??
        ({
          labels: labelsPair,
          count: 0,
          weightedScore: 0,
          exampleCardIds: [],
        } satisfies TagCoOccurrence);
      existing.count += 1;
      existing.weightedScore += weight;
      if (!existing.exampleCardIds.includes(result.cardId) && existing.exampleCardIds.length < 4) {
        existing.exampleCardIds.push(result.cardId);
      }
      pairMap.set(key, existing);
    }
  }
}

function buildRepresentativeCharacters(results: CardAnalysisResult[], cardsById: Map<string, NormalizedCharacterCard>): RepresentativeCharacter[] {
  return results
    .map((result) => {
      const tags = [...result.baseTags, ...result.worldTags, ...result.castTags].map((tag) => tag.label);
      const score = (result.usage?.totalMessages ?? 0) + (result.usage?.chatCount ?? 0) * 8 + tags.length;
      return {
        cardId: result.cardId,
        name: getCardName(cardsById, result.cardId),
        score: roundScore(score),
        tags: Array.from(new Set(tags)).slice(0, 8),
        oneLineSummary: result.oneLineSummary,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function buildRepresentativeScenarios(results: CardAnalysisResult[], cardsById: Map<string, NormalizedCharacterCard>): RepresentativeScenario[] {
  return results
    .flatMap((result) =>
      result.scenarioTags.map((group) => {
        const card = cardsById.get(result.cardId);
        const opening = card?.scenarioOpenings.find((item) => item.id === group.scenarioId);
        const usage = result.usage?.scenarioStats.find((item) => item.scenarioId === group.scenarioId);
        const summary =
          result.scenarioOneLineSummaries.find((item) => item.scenarioId === group.scenarioId)?.summary ||
          (opening?.text.trim() ? opening.text.trim().slice(0, 90) : undefined);
        const usageWeight = scenarioBehaviorWeight(result.usage, group.scenarioId);
        const score = usageWeight > 0 ? usageWeight + group.tags.length * 0.35 : 0;
        return {
          cardId: result.cardId,
          cardName: getCardName(cardsById, result.cardId),
          scenarioId: group.scenarioId,
          scenarioName: group.scenarioName,
          score: roundScore(score),
          tags: group.tags.map((tag) => tag.label).slice(0, 8),
          summary,
          totalMessages: usage?.totalMessages,
          chatCount: usage?.chatCount,
        };
      }),
    )
    .filter((scenario) => scenario.score > 0 && (scenario.totalMessages ?? 0) >= 12)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function buildLocalSummary(tagStats: TasteTagStat[], coOccurrences: TagCoOccurrence[]) {
  const top = tagStats.slice(0, 4).map((tag) => tag.label);
  const pair = coOccurrences[0]?.labels.join(' + ');
  if (top.length === 0) {
    return '还没有足够的已分析卡片。小票机已经通电，但收银员现在只能尴尬微笑。';
  }
  if (pair) {
    return `你反复回购的不是单个标签，而是「${pair}」这种组合拳。${top.join('、')}一起出现时，CharaLog 已经能闻到固定口味了。`;
  }
  return `目前最扎眼的是 ${top.join('、')}。不是说你只吃这一口，是这几口已经开始在柜台上排队结账。`;
}

function sampleAbsentTags(seenLabels: Set<string>): TasteProfile['absentTags'] {
  return dictionaryData.tags
    .filter((tag) => ABSENT_TAG_CATEGORIES.has(tag.category) && !seenLabels.has(tag.label))
    .map((tag) => ({ tag, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 10)
    .map(({ tag }) => ({
      id: tag.id,
      label: tag.label,
      category: tag.category,
      family: tag.family,
    }));
}

export function buildTasteProfile(
  cards: NormalizedCharacterCard[],
  analysisResults: CardAnalysisResult[],
  options: BuildTasteProfileOptions = {},
): TasteProfile {
  const cardsById = new Map(cards.map((card) => [card.id, card]));
  const analyzedResults = analysisResults.filter(
    (result) =>
      cardsById.has(result.cardId) &&
      result.sourceHash !== 'usage-seed' &&
      result.sourceHash !== 'st-test-usage-seed' &&
      !result.warnings.includes('pending-analysis') &&
      !result.warnings.includes('st-test-usage-seed') &&
      !result.debug?.error,
  );
  const tagMap = new Map<string, TagAccumulator>();
  const pairMap = new Map<string, TagCoOccurrence>();

  analyzedResults.forEach((result) => {
    const cardWeight = behaviorWeight(result.usage);
    const cardLevelTags = [...result.baseTags, ...result.worldTags, ...result.castTags];
    cardLevelTags.forEach((tag) => addTag(tagMap, tag, result, cardsById, cardWeight));
    addCoOccurrences(pairMap, cardLevelTags.map((tag) => tag.label), result, cardWeight);

    result.scenarioTags.forEach((group) => {
      const scenarioWeight = scenarioBehaviorWeight(result.usage, group.scenarioId);
      if (scenarioWeight <= 0) {
        return;
      }
      group.tags.forEach((tag) =>
        addTag(tagMap, tag, result, cardsById, scenarioWeight, {
          id: group.scenarioId,
          name: group.scenarioName,
        }),
      );
      addCoOccurrences(pairMap, group.tags.map((tag) => tag.label), result, scenarioWeight);
      addCoOccurrences(pairMap, [...cardLevelTags.map((tag) => tag.label), ...group.tags.map((tag) => tag.label)], result, scenarioWeight * 0.65);
    });
  });

  const tagStats = Array.from(tagMap.values())
    .map(({ cardIds, scenarioIds, ...stat }) => ({
      ...stat,
      cardCount: cardIds.size,
      scenarioCount: scenarioIds.size,
      weightedScore: roundScore(stat.weightedScore),
    }))
    .sort((a, b) => b.weightedScore - a.weightedScore || b.frequency - a.frequency);

  const coOccurrences = Array.from(pairMap.values())
    .map((pair) => ({ ...pair, weightedScore: roundScore(pair.weightedScore) }))
    .filter((pair) => pair.count >= 3 && pair.exampleCardIds.length >= 2)
    .sort((a, b) => b.weightedScore - a.weightedScore || b.count - a.count)
    .slice(0, 30);

  const seenLabels = new Set(tagStats.map((tag) => tag.label));

  const warnings = [
    ...(options.extraWarnings ?? []),
    ...analyzedResults.flatMap((result) => result.warnings.map((warning) => `${getCardName(cardsById, result.cardId)}: ${warning}`)),
  ].filter((warning) => !QUIET_WARNINGS.some((quiet) => warning.includes(quiet))).slice(0, 30);

  return {
    id: 'taste-profile-local',
    title: options.title || '你的XP小票',
    summary: options.aiSections?.[0]?.body ?? buildLocalSummary(tagStats, coOccurrences),
    baseTags: analyzedResults.flatMap((result) => result.baseTags).slice(0, 16),
    characterUsages: analyzedResults.map((result) => result.usage).filter((usage): usage is CharacterUsage => Boolean(usage)),
    analyzedCardCount: analyzedResults.length,
    tagStats,
    coOccurrences,
    absentTags: sampleAbsentTags(seenLabels),
    representativeCharacters: buildRepresentativeCharacters(analyzedResults, cardsById),
    representativeScenarios: buildRepresentativeScenarios(analyzedResults, cardsById),
    aiSections: options.aiSections ?? [],
    warnings,
    debug: options.debug,
    generatedAt: new Date().toISOString(),
  };
}
