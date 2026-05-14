import { getDictionaryVersion } from './dictionary';
import type { CardAnalysisResult, NormalizedCharacterCard } from '../domain/types';

export const dictionaryVersion = getDictionaryVersion();
export const analysisPromptVersion = 'card-analysis-v19-regex-route-widgets';

const CACHE_KEY = 'charalog.cardAnalysisCache.v2';
const LEGACY_CACHE_KEYS = ['charalog.cardAnalysisCache.v1'];
const MAX_CACHE_ENTRIES = 80;

type CacheMap = Record<string, CardAnalysisResult>;

function stableHash(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return `h${(hash >>> 0).toString(16)}`;
}

function stringifyHashSource(value: unknown): string {
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

function readCache(): CacheMap {
  if (typeof localStorage === 'undefined') {
    return {};
  }

  LEGACY_CACHE_KEYS.forEach((key) => localStorage.removeItem(key));

  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? '{}') as CacheMap;
  } catch {
    return {};
  }
}

function writeCache(cache: CacheMap) {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(CACHE_KEY, JSON.stringify(trimCache(cache)));
}

function trimCache(cache: CacheMap): CacheMap {
  const entries = Object.entries(cache);
  if (entries.length <= MAX_CACHE_ENTRIES) {
    return cache;
  }
  return Object.fromEntries(entries.slice(-MAX_CACHE_ENTRIES));
}

function stripResultForCache(result: CardAnalysisResult): CardAnalysisResult {
  const { debug: _debug, localCandidateTags, ...rest } = result;
  return {
    ...rest,
    localCandidateTags: localCandidateTags.slice(0, 40).map((tag) => ({
      ...tag,
      matchedSnippets: tag.matchedSnippets.slice(0, 1),
    })),
  };
}

export function computeCardSourceHash(card: NormalizedCharacterCard): string {
  return stableHash(
    JSON.stringify({
      description: card.description,
      personality: stringifyHashSource(card.rawCard.personality ?? card.rawCard.data?.personality),
      scenario: stringifyHashSource(card.rawCard.scenario ?? card.rawCard.data?.scenario),
      creator_notes: card.creatorNotes,
      system_prompt: stringifyHashSource(card.rawCard.system_prompt ?? card.rawCard.data?.system_prompt),
      post_history_instructions: stringifyHashSource(card.rawCard.post_history_instructions ?? card.rawCard.data?.post_history_instructions),
      character_book: stringifyHashSource(card.rawCard.character_book ?? card.rawCard.data?.character_book),
      tags: card.tags.map((tag) => tag.label),
      first_mes: card.firstMessage,
      alternate_greetings: card.alternateGreetings,
      dictionaryVersion,
      analysisPromptVersion,
    }),
  );
}

function cacheKey(cardId: string, sourceHash: string) {
  return `${cardId}:${sourceHash}`;
}

export function getCachedAnalysis(card: NormalizedCharacterCard): CardAnalysisResult | undefined {
  const sourceHash = computeCardSourceHash(card);
  return readCache()[cacheKey(card.id, sourceHash)];
}

export function setCachedAnalysis(result: CardAnalysisResult) {
  const cache = readCache();
  cache[cacheKey(result.cardId, result.sourceHash)] = stripResultForCache(result);
  try {
    writeCache(cache);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      try {
        localStorage.removeItem(CACHE_KEY);
        writeCache({ [cacheKey(result.cardId, result.sourceHash)]: stripResultForCache(result) });
      } catch {
        // Cache is optional; analysis results should still be returned to the UI.
      }
      return;
    }
    // Cache is optional; ignore storage failures so AI analysis does not become a false failure.
  }
}
