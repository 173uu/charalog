import { recallCandidateTags } from '../core/recallCandidateTags';
import { buildTasteProfile } from '../core/tasteProfile';
import { normalizeCharacterCard } from '../domain/normalize';
import { computeCharacterUsage } from '../domain/usage';
import type { CardAnalysisResult, TasteProfile } from '../domain/types';
import { mockCharacterCards } from './cards';
import { mockChats } from './chats';

export const normalizedMockCards = mockCharacterCards.map(normalizeCharacterCard);

export const mockAnalysisResults: CardAnalysisResult[] = normalizedMockCards.map((card) => {
  const localCandidateTags = recallCandidateTags(card);
  const baseTags = localCandidateTags
    .filter((tag) => tag.scopeHint === 'card')
    .slice(0, 8)
    .map((tag) => ({
      label: tag.label,
      category: tag.category,
      scope: 'card' as const,
      confidence: Math.min(0.74, tag.score / 20),
      reason: '开发 mock：来自本地候选标签。',
    }));

  return {
    cardId: card.id,
    cardType:
      card.cardType === 'single'
        ? 'single_character'
        : card.cardType === 'multi_scenario'
          ? 'single_character_multi_scenario'
          : card.cardType === 'group'
            ? 'multi_character'
            : 'world_setting',
    baseTags,
    scenarioTags: card.scenarioOpenings.map((opening) => ({
      scenarioId: opening.id,
      scenarioName: opening.title,
      tags: localCandidateTags
        .filter((tag) => tag.scopeHint === 'scenario')
        .slice(0, 8)
        .map((tag) => ({
          label: tag.label,
          category: tag.category,
          scope: 'scenario' as const,
          confidence: Math.min(0.7, tag.score / 20),
          reason: '开发 mock：来自本地线路候选标签。',
        })),
    })),
    worldTags: [],
    castTags: [],
    suggestedTags: [],
    oneLineSummary: `开发 mock：${card.name} 已召回本地候选标签，等待真实 AI 分析。`,
    scenarioOneLineSummaries: card.scenarioOpenings.map((opening) => ({
      scenarioId: opening.id,
      summary: `开发 mock：${opening.title} 已记录为线路摘要占位。`,
    })),
    warnings: ['mock-response', '尚未调用真实 AI'],
    localCandidateTags,
    usage: computeCharacterUsage(mockChats, card.scenarioOpenings),
    generatedAt: '2026-05-04T23:00:00+08:00',
    sourceHash: 'mock-seed',
  };
});

export const mockTasteProfile: TasteProfile = buildTasteProfile(normalizedMockCards, mockAnalysisResults);
