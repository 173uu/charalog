import { buildCardDigest } from './cardDigest';
import { recallCandidateTags } from './recallCandidateTags';
import { cleanCardText, normalizeForMatch } from '../domain/textCleanup';
import type { CandidateTag, CardDigest, CharacterUsage, FirstMesDigest, FirstMesRouteManifestItem, NormalizedCharacterCard, SelectedOpeningDigest } from '../domain/types';

const MAX_CANDIDATE_SNIPPETS_PER_TAG = 2;
const MAX_CANDIDATE_SNIPPET_LENGTH = 96;
const MAX_CANDIDATE_SCORE_HINT = 8;

type FirstMesDigestForAnalysisInput = Omit<FirstMesDigest, 'routeManifest' | 'interactionHints'> & {
  routeManifestCount: number;
};

type CardDigestForAnalysisInput = Omit<CardDigest, 'selectedOpenings' | 'firstMesDigest'> & {
  firstMesDigest: FirstMesDigestForAnalysisInput;
  selectedOpeningIds: string[];
};

export interface CardAnalysisInput {
  cardId: string;
  name: string;
  cardTypeHint: NormalizedCharacterCard['cardType'];
  rawTags: string[];
  cardDigest: CardDigestForAnalysisInput;
  openings: Array<{
    scenarioId: string;
    title: string;
    contentExcerpt: string;
    selectionReason: string;
    matchedTags: string[];
    linkedEvidence?: Array<{
      sourceLabel: string;
      categoryHint: string;
      text: string;
      matchedTags: string[];
      reason: string;
    }>;
    totalMessages?: number;
    chatCount?: number;
  }>;
  localCandidateTags: Array<
    Pick<
      CandidateTag,
      'label' | 'category' | 'family' | 'parentId' | 'priority' | 'scopePreference' | 'score' | 'scopeHint' | 'matchedFields' | 'matchedSnippets'
    >
  >;
}

function filterMatchedTags(labels: string[], allowedLabels: Set<string>): string[] {
  return labels.filter((label) => allowedLabels.has(label));
}

function findRouteManifestItem(cardDigest: CardDigest, opening: SelectedOpeningDigest): FirstMesRouteManifestItem | undefined {
  if (cardDigest.firstMesDigest.routeManifest.length === 0) {
    return undefined;
  }

  return cardDigest.firstMesDigest.routeManifest.find((item) => item.index === opening.index);
}

function openingTextForAnalysis(cardDigest: CardDigest, opening: SelectedOpeningDigest): string {
  const routeManifestItem = findRouteManifestItem(cardDigest, opening);
  return routeManifestItem?.rawText ?? opening.textExcerpt;
}

export function buildOpeningSummaryMap(card: NormalizedCharacterCard): Map<string, string> {
  const broadCandidateTags = recallCandidateTags(card, {
    firstMesText: '',
    includeAllAlternateGreetings: false,
  });
  const cardDigest = buildCardDigest(card, broadCandidateTags);
  const summaries = new Map<string, string>();
  card.scenarioOpenings.forEach((opening) => {
    const routeManifestItem =
      cardDigest.firstMesDigest.routeManifest.find((item) => item.index === opening.index);
    if (routeManifestItem) {
      summaries.set(opening.id, routeManifestItem.rawText);
    }
  });
  return summaries;
}

function compactFirstMesDigestForAnalysis(cardDigest: CardDigest): FirstMesDigestForAnalysisInput {
  const { routeManifest: _routeManifest, interactionHints: _interactionHints, ...firstMesDigest } = cardDigest.firstMesDigest;

  return {
    ...firstMesDigest,
    routeManifestCount: cardDigest.firstMesDigest.routeManifest.length,
  };
}

function compactSnippet(snippet: string): string {
  const cleaned = cleanCardText(snippet).replace(/\\+"/g, '"').replace(/[{}\[\]]/g, ' ').replace(/\s+/g, ' ').trim();
  if (cleaned.length <= MAX_CANDIDATE_SNIPPET_LENGTH) {
    return cleaned;
  }
  return `${cleaned.slice(0, MAX_CANDIDATE_SNIPPET_LENGTH).trim()}...`;
}

function compactCandidateSnippets(candidate: CandidateTag, usedSnippetKeys: Set<string>): string[] {
  const snippets: string[] = [];

  candidate.matchedSnippets.forEach((snippet) => {
    if (snippets.length >= MAX_CANDIDATE_SNIPPETS_PER_TAG) {
      return;
    }

    const compacted = compactSnippet(snippet);
    const key = normalizeForMatch(compacted).slice(0, 80);
    if (!key || usedSnippetKeys.has(key)) {
      return;
    }

    usedSnippetKeys.add(key);
    snippets.push(compacted);
  });

  return snippets;
}

export function buildCardAnalysisInput(card: NormalizedCharacterCard, usage?: CharacterUsage): CardAnalysisInput {
  const broadCandidateTags = recallCandidateTags(card, {
    firstMesText: '',
    includeAllAlternateGreetings: false,
  });
  const cardDigest = buildCardDigest(card, broadCandidateTags, usage);
  const { selectedOpenings, ...cardDigestWithoutOpeningText } = cardDigest;
  const selectedOpeningTexts = selectedOpenings.map((opening) => openingTextForAnalysis(cardDigest, opening));
  const linkedEvidenceTexts = selectedOpenings.flatMap((opening) => opening.linkedEvidence?.map((evidence) => evidence.text) ?? []);
  const localCandidateTags = recallCandidateTags(card, {
    firstMesText: cardDigest.firstMesDigest.characterIntroEvidence.map((section) => section.text).join(' '),
    alternateGreetings: selectedOpeningTexts,
    extraScenarioTexts: linkedEvidenceTexts,
    includeAllAlternateGreetings: false,
  });
  const allowedCandidateLabels = new Set(localCandidateTags.map((tag) => tag.label));
  const usedCandidateSnippetKeys = new Set<string>();
  const filteredEvidenceSections = cardDigestWithoutOpeningText.evidenceSections.map((section) => ({
    ...section,
    matchedTags: filterMatchedTags(section.matchedTags, allowedCandidateLabels),
  }));

  return {
    cardId: card.id,
    name: card.name,
    cardTypeHint: card.cardType,
    rawTags: card.tags.map((tag) => tag.label),
    cardDigest: {
      ...cardDigestWithoutOpeningText,
      firstMesDigest: compactFirstMesDigestForAnalysis(cardDigest),
      evidenceSections: filteredEvidenceSections,
      selectedOpeningIds: selectedOpenings.map((opening) => opening.scenarioId),
    },
    openings: selectedOpenings.map((opening) => ({
      scenarioId: opening.scenarioId,
      title: opening.title,
      contentExcerpt: openingTextForAnalysis(cardDigest, opening),
      selectionReason: opening.selectionReason,
      matchedTags: filterMatchedTags(opening.matchedTags, allowedCandidateLabels),
      linkedEvidence: opening.linkedEvidence?.map((evidence) => ({
        sourceLabel: evidence.sourceLabel,
        categoryHint: evidence.categoryHint,
        text: evidence.text,
        matchedTags: filterMatchedTags(evidence.matchedTags, allowedCandidateLabels),
        reason: evidence.reason,
      })),
      totalMessages: opening.totalMessages,
      chatCount: opening.chatCount,
    })),
    localCandidateTags: localCandidateTags.map((tag) => ({
      label: tag.label,
      category: tag.category,
      family: tag.family,
      parentId: tag.parentId,
      priority: tag.priority,
      scopePreference: tag.scopePreference,
      score: Math.min(tag.score, MAX_CANDIDATE_SCORE_HINT),
      scopeHint: tag.scopeHint,
      matchedFields: tag.matchedFields,
      matchedSnippets: compactCandidateSnippets(tag, usedCandidateSnippetKeys),
    })),
  };
}
