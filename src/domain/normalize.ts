import type {
  CardType,
  CharacterCardRaw,
  NormalizedCharacterCard,
  ScenarioOpening,
  TagEntry,
} from './types';
import { cleanCardText } from './textCleanup';

function mergeRawCard(raw: CharacterCardRaw): CharacterCardRaw {
  return {
    ...raw,
    ...(raw.data ?? {}),
    id: raw.id,
    data: raw.data,
  };
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string').map(cleanCardText).filter(Boolean);
}

function buildTags(labels: string[]): TagEntry[] {
  return Array.from(new Set(labels.map((label) => cleanCardText(label)).filter(Boolean))).map((label, index) => ({
    id: `tag-${index + 1}`,
    label,
    source: 'card',
    confidence: 1,
  }));
}

function buildOpenings(cardId: string, firstMessage: string, alternateGreetings: string[]): ScenarioOpening[] {
  const openings: ScenarioOpening[] = [];

  if (firstMessage) {
    openings.push({
      id: `${cardId}-opening-main`,
      characterId: cardId,
      title: '默认开场',
      text: firstMessage,
      source: 'first_mes',
      index: 0,
    });
  }

  alternateGreetings.forEach((text, index) => {
    openings.push({
      id: `${cardId}-opening-alt-${index + 1}`,
      characterId: cardId,
      title: `线路 ${index + 1}`,
      text,
      source: 'alternate_greeting',
      index: index + 1,
    });
  });

  return openings;
}

function detectCardType(card: CharacterCardRaw, openings: ScenarioOpening[], tags: TagEntry[]): CardType {
  const cardSearchable = [
    card.name,
    card.description,
    card.creator_notes,
    ...tags.map((tag) => tag.label),
  ]
    .join(' ')
    .toLowerCase();
  const openingSearchable = openings.map((opening) => opening.text).join(' ').toLowerCase();

  if (/(world\s*card|worldbook|lorebook|世界观卡|世界卡|设定集)/i.test(cardSearchable)) {
    return 'world';
  }

  if (/(group|多人|群像|宿舍|小队|全员|多角色|ensemble)/i.test(`${cardSearchable} ${openingSearchable}`)) {
    return 'group';
  }

  if (openings.length >= 3 || /(多线路|if线|路线|线路|route|branch)/i.test(openingSearchable)) {
    return 'multi_scenario';
  }

  return 'single';
}

export function normalizeCharacterCard(raw: CharacterCardRaw): NormalizedCharacterCard {
  const merged = mergeRawCard(raw);
  const id = merged.id;
  const name = cleanCardText(merged.name) || '未命名角色';
  const description = cleanCardText(merged.description);
  const creatorNotes = cleanCardText(merged.creator_notes);
  const firstMessage = cleanCardText(merged.first_mes);
  const alternateGreetings = toStringArray(merged.alternate_greetings);
  const tags = buildTags(toStringArray(merged.tags));
  const scenarioOpenings = buildOpenings(id, firstMessage, alternateGreetings);

  return {
    id,
    name,
    description,
    tags,
    creatorNotes,
    firstMessage,
    alternateGreetings,
    scenarioOpenings,
    cardType: detectCardType(merged, scenarioOpenings, tags),
    rawCard: merged,
  };
}
