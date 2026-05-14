import { getAllowedDictionaryCategories, getDictionaryEntries, looksLikeMojibake } from './dictionary';
import type { DictionaryTagEntry, RecallScopePreference } from '../domain/types';

export interface DictionaryDuplicate {
  value: string;
  ids: string[];
}

export interface DictionaryValidationIssue {
  id?: string;
  label?: string;
  message: string;
}

export interface DictionaryValidationResult {
  totalTags: number;
  categoryDistribution: Record<string, number>;
  familyDistribution: Record<string, number>;
  statusDistribution: Record<string, number>;
  duplicateIds: DictionaryDuplicate[];
  duplicateLabels: DictionaryDuplicate[];
  duplicateAliases: DictionaryDuplicate[];
  longLabels: Array<{ id: string; label: string; length: number }>;
  mojibakeEntries: Array<{ id: string; label: string }>;
  issues: DictionaryValidationIssue[];
}

const MAX_LABEL_LENGTH = 24;
const VALID_SCOPE_PREFERENCES = new Set<RecallScopePreference>(['any', 'card', 'scenario', 'cast', 'world', 'unknown']);

function addDistribution(distribution: Record<string, number>, key: string) {
  const normalizedKey = key || '未分组';
  distribution[normalizedKey] = (distribution[normalizedKey] ?? 0) + 1;
}

function findDuplicates(values: Array<{ value: string; id: string }>): DictionaryDuplicate[] {
  const map = new Map<string, string[]>();

  values.forEach(({ value, id }) => {
    const normalized = value.trim().toLowerCase();
    if (!normalized) {
      return;
    }

    map.set(normalized, [...(map.get(normalized) ?? []), id]);
  });

  return Array.from(map.entries())
    .filter(([, ids]) => ids.length > 1)
    .map(([value, ids]) => ({ value, ids }));
}

function getRawDictionaryRows(dictionary: unknown): unknown[] {
  if (Array.isArray(dictionary)) {
    return dictionary;
  }
  if (typeof dictionary === 'object' && dictionary !== null && 'tags' in dictionary) {
    const tags = (dictionary as { tags?: unknown }).tags;
    return Array.isArray(tags) ? tags : [];
  }
  return [];
}

export function validateDictionary(dictionary: unknown): DictionaryValidationResult {
  const tags = getDictionaryEntries(dictionary);
  const allowedCategories = new Set(getAllowedDictionaryCategories(dictionary));
  const categoryDistribution: Record<string, number> = {};
  const familyDistribution: Record<string, number> = {};
  const statusDistribution: Record<string, number> = {};
  const issues: DictionaryValidationIssue[] = [];
  const idValues: Array<{ value: string; id: string }> = [];
  const labelValues: Array<{ value: string; id: string }> = [];
  const aliasValues: Array<{ value: string; id: string }> = [];
  const longLabels: Array<{ id: string; label: string; length: number }> = [];
  const mojibakeEntries = getRawDictionaryRows(dictionary).flatMap((entry, index) => {
    if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) {
      return [];
    }
    const row = entry as Partial<DictionaryTagEntry>;
    const id = typeof row.id === 'string' ? row.id : `row-${index}`;
    const label = typeof row.label === 'string' ? row.label : '';
    const searchable = [row.label, row.category, row.family, row.description].filter((value): value is string => typeof value === 'string').join(' ');
    return looksLikeMojibake(searchable) ? [{ id, label }] : [];
  });

  tags.forEach((entry: Partial<DictionaryTagEntry>, index) => {
    const id = typeof entry.id === 'string' ? entry.id : `row-${index}`;
    const label = typeof entry.label === 'string' ? entry.label.trim() : '';
    const category = typeof entry.category === 'string' ? entry.category : '';
    const aliases = entry.aliases;
    const negativeAliases = entry.negativeAliases;

    idValues.push({ value: id, id });
    if (label) {
      labelValues.push({ value: label, id });
    }

    addDistribution(categoryDistribution, category);
    addDistribution(familyDistribution, typeof entry.family === 'string' ? entry.family : '');
    addDistribution(statusDistribution, typeof entry.status === 'string' ? entry.status : 'active');

    if (!label) {
      issues.push({ id, message: 'label 为空' });
    }

    if (!allowedCategories.has(category)) {
      issues.push({ id, label, message: `category 不在 _meta.categories 范围内：${category || '空'}` });
    }

    if (!Array.isArray(aliases)) {
      issues.push({ id, label, message: 'aliases 不是数组' });
    } else {
      aliases.forEach((alias) => {
        if (typeof alias === 'string') {
          aliasValues.push({ value: alias, id });
        }
      });
    }

    if (negativeAliases !== undefined && !Array.isArray(negativeAliases)) {
      issues.push({ id, label, message: 'negativeAliases 不是数组' });
    }

    if (entry.examples !== undefined && !Array.isArray(entry.examples)) {
      issues.push({ id, label, message: 'examples 不是数组' });
    }

    if (entry.priority !== undefined && typeof entry.priority !== 'number') {
      issues.push({ id, label, message: 'priority 不是数字' });
    }

    if (entry.scopePreference !== undefined && !VALID_SCOPE_PREFERENCES.has(entry.scopePreference)) {
      issues.push({ id, label, message: `scopePreference 无效：${entry.scopePreference}` });
    }

    if (label.length > MAX_LABEL_LENGTH) {
      longLabels.push({ id, label, length: label.length });
    }
  });

  const duplicateIds = findDuplicates(idValues);
  duplicateIds.forEach((duplicate) => {
    issues.push({ message: `id 重复：${duplicate.value}` });
  });

  return {
    totalTags: tags.length,
    categoryDistribution,
    familyDistribution,
    statusDistribution,
    duplicateIds,
    duplicateLabels: findDuplicates(labelValues),
    duplicateAliases: findDuplicates(aliasValues),
    longLabels,
    mojibakeEntries,
    issues,
  };
}
