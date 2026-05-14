import dictionaryData from '../data/dictionary.json';
import type { DictionaryData, DictionaryTagEntry, RecallScopePreference, TagCategory } from '../domain/types';

export const builtInDictionaryCategories: TagCategory[] = [
  '角色气质',
  '身份阶层',
  '关系结构',
  '情感走向',
  '互动机制',
  '世界观题材',
  '结局倾向',
  '雷点偏好',
  '雷点/偏好',
  '其他',
];

export function getAllowedDictionaryCategories(dictionary: unknown = dictionaryData): TagCategory[] {
  if (typeof dictionary === 'object' && dictionary !== null && '_meta' in dictionary) {
    const categories = (dictionary as DictionaryData)._meta?.categories;
    if (Array.isArray(categories) && categories.every((category) => typeof category === 'string')) {
      return Array.from(new Set([...builtInDictionaryCategories, ...categories]));
    }
  }

  return builtInDictionaryCategories;
}

export const allowedDictionaryCategories: TagCategory[] = getAllowedDictionaryCategories();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function normalizeScopePreference(value: unknown): RecallScopePreference | undefined {
  return value === 'any' || value === 'card' || value === 'scenario' || value === 'cast' || value === 'world' || value === 'unknown'
    ? value
    : undefined;
}

export function looksLikeMojibake(value: unknown): boolean {
  if (typeof value !== 'string' || !value) {
    return false;
  }

  return /(?:�|闁|閻|鐎|缂|濠|婵|鈧|粹€|偓|瀣|顐|妯|鐓|鐤|鎼|閺夋|閸|濞|闂)/.test(value);
}

function normalizeDictionaryEntry(entry: unknown): DictionaryTagEntry | undefined {
  if (!isRecord(entry) || typeof entry.id !== 'string' || typeof entry.label !== 'string' || typeof entry.category !== 'string') {
    return undefined;
  }

  if (looksLikeMojibake([entry.label, entry.category, entry.family, entry.description].filter((value) => typeof value === 'string').join(' '))) {
    return undefined;
  }

  return {
    id: entry.id,
    label: entry.label,
    category: entry.category,
    family: typeof entry.family === 'string' ? entry.family : undefined,
    aliases: stringArray(entry.aliases),
    negativeAliases: stringArray(entry.negativeAliases),
    description: typeof entry.description === 'string' ? entry.description : undefined,
    examples: stringArray(entry.examples),
    parentId: typeof entry.parentId === 'string' ? entry.parentId : undefined,
    priority: typeof entry.priority === 'number' ? entry.priority : undefined,
    scopePreference: normalizeScopePreference(entry.scopePreference),
    status: typeof entry.status === 'string' ? entry.status : undefined,
  };
}

export function getDictionaryEntries(dictionary: unknown = dictionaryData): DictionaryTagEntry[] {
  const rawEntries = Array.isArray(dictionary)
    ? dictionary
    : typeof dictionary === 'object' && dictionary !== null && 'tags' in dictionary
      ? (dictionary as Partial<DictionaryData>).tags
      : [];

  return Array.isArray(rawEntries)
    ? rawEntries.map(normalizeDictionaryEntry).filter((entry): entry is DictionaryTagEntry => Boolean(entry))
    : [];
}

export function getDictionaryVersion(dictionary: unknown = dictionaryData): string {
  if (typeof dictionary === 'object' && dictionary !== null && '_meta' in dictionary) {
    return String((dictionary as DictionaryData)._meta?.version ?? 'dictionary-local');
  }

  return 'dictionary-local';
}

export default dictionaryData;
