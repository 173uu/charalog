import { getDictionaryEntries } from './dictionary';
import { cleanCardText, normalizeForMatch } from '../domain/textCleanup';
import type {
  CandidateTag,
  DictionaryTagEntry,
  NormalizedCharacterCard,
  RecallMatchedField,
  RecallScopeHint,
  RecallScopePreference,
  TagCategory,
} from '../domain/types';

const FIELD_WEIGHTS: Record<RecallMatchedField, number> = {
  rawTags: 1.6,
  description: 1.2,
  creatorNotes: 1.2,
  systemPrompt: 0.8,
  firstMes: 0.9,
  alternateGreetingContent: 0.9,
  extensionsWorld: 1.1,
};

const CATEGORY_LIMITS: Record<string, number> = {
  '角色气质': 15,
  '身份阶层': 8,
  '关系结构': 15,
  '情感走向': 12,
  '互动机制': 12,
  '世界观题材': 8,
  '结局倾向': 6,
  '雷点偏好': 6,
  '雷点/偏好': 6,
};

const DEFAULT_CATEGORY_LIMIT = 8;
const ACTIVE_STATUSES = new Set<DictionaryTagEntry['status']>([undefined, 'active']);

type RecallFieldContent = {
  field: RecallMatchedField;
  text: string;
};

export type RecallCandidateTagsOptions = {
  alternateGreetings?: string[];
  extraScenarioTexts?: string[];
  includeAllAlternateGreetings?: boolean;
  firstMesText?: string;
};

type ScoreBreakdown = {
  score: number;
  matchedFields: Set<RecallMatchedField>;
  matchedSnippets: string[];
  scopeVotes: Partial<Record<RecallScopeHint, number>>;
};

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

function readRawValue(card: NormalizedCharacterCard, keys: string[]): string {
  return keys.map((key) => stringifyUnknown(card.rawCard[key])).join(' ');
}

function getFieldContents(card: NormalizedCharacterCard, options: RecallCandidateTagsOptions = {}): RecallFieldContent[] {
  const alternateGreetingTexts =
    options.alternateGreetings ??
    (options.includeAllAlternateGreetings === false ? [] : card.alternateGreetings);
  const scenarioTexts = [...alternateGreetingTexts, ...(options.extraScenarioTexts ?? [])];
  const contents: RecallFieldContent[] = [
    {
      field: 'rawTags',
      text: card.tags.map((tag) => tag.label).join(' '),
    },
    {
      field: 'description',
      text: card.description,
    },
    {
      field: 'creatorNotes',
      text: card.creatorNotes,
    },
    {
      field: 'systemPrompt',
      text: readRawValue(card, ['system_prompt', 'systemPrompt', 'personality', 'scenario']),
    },
    {
      field: 'firstMes',
      text: options.firstMesText ?? card.firstMessage,
    },
    {
      field: 'alternateGreetingContent',
      text: scenarioTexts.join(' '),
    },
  ];

  if (card.cardType === 'world') {
    contents.push({
      field: 'extensionsWorld',
      text: [
        stringifyUnknown(card.rawCard.character_book),
        stringifyUnknown(card.rawCard.extensions),
        stringifyUnknown(card.rawCard.data && 'character_book' in card.rawCard.data ? card.rawCard.data.character_book : ''),
        stringifyUnknown(card.rawCard.data && 'extensions' in card.rawCard.data ? card.rawCard.data.extensions : ''),
      ].join(' '),
    });
  }

  return contents.map((content) => ({
    ...content,
    text: cleanCardText(content.text),
  }));
}

function includesTerm(text: string, term: string): boolean {
  const normalizedText = normalizeForMatch(text);
  const normalizedTerm = normalizeForMatch(term);

  if (!normalizedText || !normalizedTerm) {
    return false;
  }

  if (/^[a-z0-9]+$/i.test(normalizedTerm) && normalizedTerm.length <= 4) {
    const escapedTerm = normalizedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z0-9])${escapedTerm}($|[^a-z0-9])`, 'i').test(normalizedText);
  }

  return normalizedText.includes(normalizedTerm);
}

function getSnippet(text: string, term: string): string {
  const cleanText = cleanCardText(text);
  const lowerText = cleanText.toLowerCase();
  const lowerTerm = cleanCardText(term).toLowerCase();
  const index = lowerText.indexOf(lowerTerm);

  if (index < 0) {
    return cleanText.slice(0, 72);
  }

  const start = Math.max(0, index - 24);
  const end = Math.min(cleanText.length, index + lowerTerm.length + 24);
  return cleanText.slice(start, end);
}

function isNegatedTermMatch(text: string, term: string): boolean {
  const cleanText = cleanCardText(text).toLowerCase();
  const cleanTerm = cleanCardText(term).toLowerCase();
  const index = cleanText.indexOf(cleanTerm);
  if (index < 0) {
    return false;
  }

  const prefix = cleanText.slice(Math.max(0, index - 8), index);
  return /(?:并不|不是|没有|不会|不算|不要|避免|禁止|并非|非)\s*$/.test(prefix);
}

function isIncidentalTermMatch(text: string, term: string): boolean {
  const cleanText = cleanCardText(text).toLowerCase();
  const cleanTerm = cleanCardText(term).toLowerCase();
  const index = cleanText.indexOf(cleanTerm);
  if (index < 0) {
    return false;
  }

  const window = cleanText.slice(Math.max(0, index - 24), Math.min(cleanText.length, index + cleanTerm.length + 36));
  if (cleanTerm === '前任' && /(?:前任们|部分前任|前任.{0,8}经验)/.test(window)) {
    return true;
  }
  if (cleanTerm === '养成' && /养成了|养成.{0,8}(?:脾气|习惯|性格|能力)/.test(window)) {
    return true;
  }
  if ((cleanTerm === '溺爱' || cleanTerm === '无底线宠溺') && !/(?:老婆|对象|恋人|伴侣|妻|夫|男友|女友|\{\{user\}\}|user)/i.test(window)) {
    return true;
  }
  return false;
}

function addScopeVote(scopeVotes: ScoreBreakdown['scopeVotes'], field: RecallMatchedField, value: number) {
  if (field === 'alternateGreetingContent') {
    scopeVotes.scenario = (scopeVotes.scenario ?? 0) + value;
    return;
  }

  if (field === 'extensionsWorld') {
    scopeVotes.world = (scopeVotes.world ?? 0) + value;
    return;
  }

  if (field === 'rawTags' || field === 'description' || field === 'creatorNotes') {
    scopeVotes.card = (scopeVotes.card ?? 0) + value;
    return;
  }

  scopeVotes.unknown = (scopeVotes.unknown ?? 0) + value;
}

function normalizeScopePreference(value: RecallScopePreference | undefined): RecallScopeHint | undefined {
  if (value === 'card' || value === 'scenario' || value === 'cast' || value === 'world' || value === 'unknown') {
    return value;
  }

  return undefined;
}

function resolveScopeHint(card: NormalizedCharacterCard, entry: DictionaryTagEntry, scopeVotes: ScoreBreakdown['scopeVotes']): RecallScopeHint {
  const preferredScope = normalizeScopePreference(entry.scopePreference);
  if (preferredScope) {
    return preferredScope;
  }

  const adjustedVotes = { ...scopeVotes };

  if (entry.category.includes('世界观') || card.cardType === 'world') {
    adjustedVotes.world = (adjustedVotes.world ?? 0) + 1.5;
  }

  if (card.cardType === 'group') {
    adjustedVotes.cast = (adjustedVotes.cast ?? 0) + 1;
  }

  return (Object.entries(adjustedVotes).sort(([, a], [, b]) => b - a)[0]?.[0] as RecallScopeHint | undefined) ?? 'unknown';
}

function scoreDictionaryEntry(entry: DictionaryTagEntry, fields: RecallFieldContent[]): ScoreBreakdown {
  const breakdown: ScoreBreakdown = {
    score: 0,
    matchedFields: new Set(),
    matchedSnippets: [],
    scopeVotes: {},
  };

  fields.forEach(({ field, text }) => {
    if (!text) {
      return;
    }

    const weight = FIELD_WEIGHTS[field];
    let fieldScore = 0;
    const positiveTerms = [
      { term: entry.label, value: 5 },
      ...(entry.aliases ?? []).map((alias) => ({ term: alias, value: 3 })),
      ...(entry.examples ?? []).map((example) => ({ term: example, value: 1.2 })),
    ];

    positiveTerms.forEach(({ term, value }) => {
      if (entry.label === 'BDSM' && ['D/s', 'SM', 'S向', 'M向'].includes(term)) {
        return;
      }
      if (!includesTerm(text, term)) {
        return;
      }
      if (isNegatedTermMatch(text, term)) {
        return;
      }
      if (isIncidentalTermMatch(text, term)) {
        return;
      }

      fieldScore += value * weight;

      if (field === 'rawTags') {
        fieldScore += 6 * weight;
      }

      breakdown.matchedFields.add(field);
      if (breakdown.matchedSnippets.length < 4) {
        breakdown.matchedSnippets.push(getSnippet(text, term));
      }
    });

    entry.negativeAliases?.forEach((term) => {
      if (!includesTerm(text, term)) {
        return;
      }

      fieldScore -= 4 * weight;
      breakdown.matchedFields.add(field);
      if (breakdown.matchedSnippets.length < 4) {
        breakdown.matchedSnippets.push(getSnippet(text, term));
      }
    });

    if (fieldScore !== 0) {
      breakdown.score += fieldScore;
      addScopeVote(breakdown.scopeVotes, field, Math.max(0.1, Math.abs(fieldScore)));
    }
  });

  return breakdown;
}

function compareCandidates(a: CandidateTag, b: CandidateTag): number {
  return b.score - a.score || (b.priority ?? 0) - (a.priority ?? 0) || a.label.localeCompare(b.label, 'zh-Hans-CN');
}

function bucketByCategory(candidates: CandidateTag[]): CandidateTag[] {
  const buckets = new Map<TagCategory, CandidateTag[]>();

  candidates.forEach((candidate) => {
    const bucket = buckets.get(candidate.category) ?? [];
    bucket.push(candidate);
    buckets.set(candidate.category, bucket);
  });

  return Array.from(buckets.entries())
    .flatMap(([category, bucket]) =>
      bucket
        .sort(compareCandidates)
        .slice(0, CATEGORY_LIMITS[category] ?? DEFAULT_CATEGORY_LIMIT),
    )
    .sort((a, b) => compareCandidates(a, b) || a.category.localeCompare(b.category, 'zh-Hans-CN'));
}

function isActiveDictionaryEntry(entry: DictionaryTagEntry): boolean {
  return ACTIVE_STATUSES.has(entry.status);
}

export function recallCandidateTags(card: NormalizedCharacterCard, options: RecallCandidateTagsOptions = {}): CandidateTag[] {
  const fields = getFieldContents(card, options);
  const candidates = getDictionaryEntries()
    .filter(isActiveDictionaryEntry)
    .map((entry) => {
      const breakdown = scoreDictionaryEntry(entry, fields);

      if (breakdown.score <= 0 || breakdown.matchedFields.size === 0) {
        return undefined;
      }

      const candidate: CandidateTag = {
        tagId: entry.id,
        label: entry.label,
        category: entry.category,
        score: Number(breakdown.score.toFixed(2)),
        scopeHint: resolveScopeHint(card, entry, breakdown.scopeVotes),
        matchedFields: Array.from(breakdown.matchedFields),
        matchedSnippets: Array.from(new Set(breakdown.matchedSnippets)).slice(0, 4),
      };

      if (entry.family) {
        candidate.family = entry.family;
      }
      if (entry.parentId) {
        candidate.parentId = entry.parentId;
      }
      if (typeof entry.priority === 'number') {
        candidate.priority = entry.priority;
      }
      if (entry.scopePreference) {
        candidate.scopePreference = entry.scopePreference;
      }

      return candidate;
    })
    .filter((candidate): candidate is CandidateTag => candidate !== undefined);

  const byTagId = new Map<string, CandidateTag>();
  candidates.forEach((candidate) => {
    const existing = byTagId.get(candidate.tagId);
    if (!existing || compareCandidates(candidate, existing) < 0) {
      byTagId.set(candidate.tagId, candidate);
    }
  });

  return bucketByCategory(Array.from(byTagId.values()));
}
