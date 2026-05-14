import type { ChatRaw, OpeningMatchResult, ScenarioOpening } from './types';
import { normalizeForMatch } from './textCleanup';

function getFirstCharacterMessage(chat: ChatRaw): string | undefined {
  return chat.messages.find((message) => message.role === 'character')?.content;
}

function diceSimilarity(left: string, right: string): number {
  const a = normalizeForMatch(left);
  const b = normalizeForMatch(right);

  if (!a || !b) {
    return 0;
  }

  if (a === b || a.includes(b) || b.includes(a)) {
    return 1;
  }

  const grams = (value: string) => {
    const normalized = value.replace(/\s+/g, '');
    if (normalized.length <= 2) {
      return new Set([normalized]);
    }

    const result = new Set<string>();
    for (let index = 0; index < normalized.length - 1; index += 1) {
      result.add(normalized.slice(index, index + 2));
    }
    return result;
  };

  const leftGrams = grams(a);
  const rightGrams = grams(b);
  let overlap = 0;

  leftGrams.forEach((gram) => {
    if (rightGrams.has(gram)) {
      overlap += 1;
    }
  });

  return (2 * overlap) / (leftGrams.size + rightGrams.size);
}

export function matchChatToOpening(chat: ChatRaw, openings: ScenarioOpening[]): OpeningMatchResult {
  const firstCharacterMessage = getFirstCharacterMessage(chat);

  if (!firstCharacterMessage) {
    return {
      confidence: 0,
      detectionMethod: 'no_character_message',
    };
  }

  const best = openings
    .map((opening) => ({
      opening,
      confidence: diceSimilarity(firstCharacterMessage, opening.text),
    }))
    .sort((a, b) => b.confidence - a.confidence)[0];

  if (!best || best.confidence < 0.36) {
    return {
      confidence: best?.confidence ?? 0,
      detectionMethod: 'no_match',
    };
  }

  return {
    scenarioId: best.opening.id,
    confidence: Number(best.confidence.toFixed(3)),
    detectionMethod: 'first_role_message_similarity',
  };
}
