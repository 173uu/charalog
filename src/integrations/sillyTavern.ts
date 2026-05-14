import { normalizeCharacterCard } from '../domain/normalize';
import type { CardAnalysisResult, CharacterCardRaw, CharacterUsage, NormalizedCharacterCard } from '../domain/types';

export const SILLYTAVERN_GENERATE_BASE_URL = 'sillytavern://generate';

type SillyTavernGenerateInput = {
  systemPrompt?: string;
  prompt: string;
};

type SillyTavernBridge = {
  __CHARALOG_GET_SILLYTAVERN_CONTEXT__?: () => unknown;
  __CHARALOG_GENERATE_RAW__?: (input: SillyTavernGenerateInput) => Promise<unknown> | unknown;
  __CHARALOG_LOAD_SILLYTAVERN_LIBRARY__?: () => Promise<unknown>;
  __CHARALOG_LOAD_CARD_USAGE__?: (input: { name: string; avatar: string }) => Promise<unknown>;
  __CHARALOG_LIBRARY_PROGRESS__?: (progress: SillyTavernLibraryProgress) => void;
};

export type SillyTavernLibraryProgress = {
  phase: 'idle' | 'characters' | 'chat-list' | 'chat-body' | 'done' | 'error';
  totalCharacters?: number;
  loadedCharacters?: number;
  currentCharacterName?: string;
  totalCharacterChats?: number;
  loadedCharacterChats?: number;
  loadedChats?: number;
  message?: string;
};

function bridge(): SillyTavernBridge {
  return globalThis as typeof globalThis & SillyTavernBridge;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function readFirstRecord(value: unknown): Record<string, unknown> | undefined {
  return Array.isArray(value) && isRecord(value[0]) ? value[0] : undefined;
}

function extractGeneratedText(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(extractGeneratedText).filter(Boolean).join('\n');
  }
  if (!isRecord(value)) {
    return value == null ? '' : String(value);
  }

  const direct =
    readString(value.content) ||
    readString(value.text) ||
    readString(value.message) ||
    readString(value.result) ||
    readString(value.response) ||
    readString(value.output);
  if (direct) {
    return direct;
  }

  if (isRecord(value.message)) {
    const messageContent = extractGeneratedText(value.message.content);
    if (messageContent) {
      return messageContent;
    }
  }

  const firstChoice = readFirstRecord(value.choices);
  if (firstChoice) {
    const choiceContent =
      (isRecord(firstChoice.message) ? extractGeneratedText(firstChoice.message.content) : '') ||
      extractGeneratedText(firstChoice.text) ||
      extractGeneratedText(firstChoice.content);
    if (choiceContent) {
      return choiceContent;
    }
  }

  return '';
}

function readArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function slugify(value: string) {
  return value
    .trim()
    .replace(/\.[^.]+$/, '')
    .replace(/[^\p{Letter}\p{Number}_-]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}

export function hasSillyTavernBridge(): boolean {
  return typeof bridge().__CHARALOG_GET_SILLYTAVERN_CONTEXT__ === 'function';
}

export function hasSillyTavernGenerateBridge(): boolean {
  return typeof bridge().__CHARALOG_GENERATE_RAW__ === 'function';
}

export async function generateWithSillyTavern(input: SillyTavernGenerateInput): Promise<string> {
  const generate = bridge().__CHARALOG_GENERATE_RAW__;
  if (typeof generate !== 'function') {
    throw new Error('当前页面没有 CharaLog SillyTavern 生成桥接。');
  }

  const result = await generate(input);
  const content = extractGeneratedText(result).trim();
  if (!content) {
    throw new Error('酒馆生成返回空文本。请确认当前酒馆 API 已连接、模型可用，并且后台生成没有被其他请求占用。');
  }
  return content;
}

function getSillyTavernContext(): Record<string, unknown> | undefined {
  const getter = bridge().__CHARALOG_GET_SILLYTAVERN_CONTEXT__;
  if (typeof getter !== 'function') {
    return undefined;
  }

  const context = getter();
  return isRecord(context) ? context : undefined;
}

function getCurrentCharacterIndex(context: Record<string, unknown>, characters: unknown[]): number {
  const candidates = [
    context.characterId,
    context.this_chid,
    context.chid,
    isRecord(context.character) ? context.character.id : undefined,
  ];
  for (const candidate of candidates) {
    const numeric = typeof candidate === 'number' ? candidate : Number(candidate);
    if (Number.isInteger(numeric) && numeric >= 0 && numeric < characters.length) {
      return numeric;
    }
  }
  return 0;
}

function toRawCard(value: unknown, fallbackId: string, index = 0): CharacterCardRaw | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const data = isRecord(value.data) ? value.data : undefined;
  const name = readString(value.name) || readString(data?.name);
  const avatar = readString(value.avatar) || readString(data?.avatar);
  const id = readString(value.id) || slugify(avatar || name) || `${fallbackId}-${index + 1}`;
  return {
    ...value,
    id: `st-live-${id}`,
    data,
  } as CharacterCardRaw;
}

function normalizeForMatch(value: string): string {
  return value.replace(/\s+/g, '').replace(/[^\p{Letter}\p{Number}{{}}]+/gu, '').slice(0, 1200);
}

function overlapScore(a: string, b: string): number {
  const left = normalizeForMatch(a);
  const right = normalizeForMatch(b);
  if (!left || !right) {
    return 0;
  }
  if (left.includes(right.slice(0, Math.min(120, right.length))) || right.includes(left.slice(0, Math.min(120, left.length)))) {
    return 1000 + Math.min(left.length, right.length);
  }

  let score = 0;
  for (let size = 80; size >= 12; size -= 8) {
    for (let index = 0; index + size <= Math.min(left.length, 360); index += 12) {
      if (right.includes(left.slice(index, index + size))) {
        score += size;
      }
    }
  }
  return score;
}

function getMessageText(message: unknown): string {
  if (!isRecord(message)) {
    return typeof message === 'string' ? message : '';
  }
  return readString(message.mes) || readString(message.message) || readString(message.content) || readString(message.text);
}

function findPlayedOpening(card: NormalizedCharacterCard, messages: unknown[]) {
  const chat = readArray(messages);
  const firstCharacterMessage = chat.find((message) => isRecord(message) && message.is_user !== true && getMessageText(message).trim());
  const firstText = getMessageText(firstCharacterMessage);
  if (!firstText) {
    return undefined;
  }

  const candidates = card.scenarioOpenings.filter((opening) => opening.source !== 'first_mes');
  const ranked = candidates
    .map((opening) => ({ opening, score: overlapScore(firstText, opening.text) }))
    .sort((a, b) => b.score - a.score);
  return ranked[0] && ranked[0].score >= 40 ? ranked[0].opening : undefined;
}

function countUserMessages(messages: unknown[], context?: Record<string, unknown>): number {
  const userName = readString(context?.name1);
  return messages.filter((message) => isRecord(message) && (message.is_user === true || (userName && readString(message.name) === userName))).length;
}

function readDateString(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) {
    return undefined;
  }
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString();
  }
  const stDateMatch = value.match(/(\d{4})-(\d{1,2})-(\d{1,2})\s*@\s*(\d{1,2})h\s*(\d{1,2})m/i);
  if (!stDateMatch) {
    return undefined;
  }
  const [, year, month, day, hour, minute] = stDateMatch;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

function mergeDateKeys(...groups: Array<unknown[] | undefined>) {
  return Array.from(
    new Set(
      groups
        .flatMap((group) => group ?? [])
        .filter((value): value is string => typeof value === 'string' && value.length >= 10)
        .map((value) => value.slice(0, 10)),
    ),
  );
}

function readHourBuckets(value: unknown) {
  const source = Array.isArray(value) ? value : [];
  return Array.from({ length: 24 }, (_, index) => {
    const numeric = Number(source[index] ?? 0);
    return Number.isFinite(numeric) && numeric > 0 ? numeric : 0;
  });
}

function mergeHourBuckets(...groups: Array<number[] | undefined>) {
  return Array.from({ length: 24 }, (_, index) => groups.reduce((sum, group) => sum + (group?.[index] ?? 0), 0));
}

function earliestDate(values: Array<string | undefined>) {
  const timestamps = values.map((value) => (value ? Date.parse(value) : Number.NaN)).filter((value) => Number.isFinite(value));
  return timestamps.length ? new Date(Math.min(...timestamps)).toISOString() : undefined;
}

function latestDate(values: Array<string | undefined>) {
  const timestamps = values.map((value) => (value ? Date.parse(value) : Number.NaN)).filter((value) => Number.isFinite(value));
  return timestamps.length ? new Date(Math.max(...timestamps)).toISOString() : undefined;
}

function buildUsageFromChats(card: NormalizedCharacterCard, chats: unknown[], context?: Record<string, unknown>): CharacterUsage | undefined {
  const normalizedChats = chats
    .map((chat, index) => {
      const record = isRecord(chat) ? chat : {};
      const messages = readArray(record.messages);
      const totalMessages = typeof record.totalMessages === 'number' ? record.totalMessages : messages.length;
      const userMessages = typeof record.userMessages === 'number' ? record.userMessages : countUserMessages(messages, context);
      const firstActiveAt = readDateString(record.firstActiveAt);
      const lastActiveAt = readDateString(record.lastActiveAt);
      const activeDateKeys = mergeDateKeys(readArray(record.activeDateKeys));
      const activeHourBuckets = readHourBuckets(record.activeHourBuckets);
      return {
        id: readString(record.file_name) || `chat-${index + 1}`,
        messages,
        totalMessages,
        userMessages,
        firstActiveAt,
        lastActiveAt,
        activeDateKeys,
        activeHourBuckets,
      };
    })
    .filter((chat) => chat.messages.length > 0 || chat.totalMessages > 0);
  if (!normalizedChats.length) {
    return undefined;
  }

  const totalMessages = normalizedChats.reduce((sum, chat) => sum + chat.totalMessages, 0);
  const userMessages = normalizedChats.reduce((sum, chat) => sum + chat.userMessages, 0);
  const firstActiveAt = earliestDate(normalizedChats.map((chat) => chat.firstActiveAt));
  const lastActiveAt = latestDate(normalizedChats.map((chat) => chat.lastActiveAt));
  const activeDateKeys = mergeDateKeys(...normalizedChats.map((chat) => chat.activeDateKeys));
  const activeHourBuckets = mergeHourBuckets(...normalizedChats.map((chat) => chat.activeHourBuckets));
  const scenarioById = new Map<
    string,
    {
      totalMessages: number;
      userMessages: number;
      chatCount: number;
      openingTitle: string;
      firstActiveAt?: string;
      lastActiveAt?: string;
      activeDateKeys: string[];
      activeHourBuckets: number[];
    }
  >();

  normalizedChats.forEach((chat) => {
    const playedOpening = findPlayedOpening(card, chat.messages);
    if (!playedOpening) {
      return;
    }
    const current = scenarioById.get(playedOpening.id) ?? {
      totalMessages: 0,
      userMessages: 0,
      chatCount: 0,
      openingTitle: playedOpening.title,
      activeDateKeys: [],
      activeHourBuckets: Array.from({ length: 24 }, () => 0),
    };
    current.totalMessages += chat.totalMessages;
    current.userMessages += chat.userMessages;
    current.chatCount += 1;
    current.firstActiveAt = earliestDate([current.firstActiveAt, chat.firstActiveAt]);
    current.lastActiveAt = latestDate([current.lastActiveAt, chat.lastActiveAt]);
    current.activeDateKeys = mergeDateKeys(current.activeDateKeys, chat.activeDateKeys);
    current.activeHourBuckets = mergeHourBuckets(current.activeHourBuckets, chat.activeHourBuckets);
    scenarioById.set(playedOpening.id, current);
  });

  return {
    characterId: card.id,
    chatCount: normalizedChats.length,
    totalMessages,
    userMessages,
    firstActiveAt,
    lastActiveAt,
    activeDays: Math.max(activeDateKeys.length, normalizedChats.length > 0 ? 1 : 0),
    activeHourBuckets,
    scenarioStats: Array.from(scenarioById.entries()).map(([scenarioId, stat]) => ({
      scenarioId,
      openingTitle: stat.openingTitle,
      chatCount: stat.chatCount,
      totalMessages: stat.totalMessages,
      userMessages: stat.userMessages,
      firstActiveAt: stat.firstActiveAt,
      lastActiveAt: stat.lastActiveAt,
      activeDays: Math.max(stat.activeDateKeys.length, stat.chatCount > 0 ? 1 : 0),
      activeHourBuckets: stat.activeHourBuckets,
    })),
  };
}

export async function loadSillyTavernCardUsage(card: NormalizedCharacterCard): Promise<CharacterUsage | undefined> {
  const loader = bridge().__CHARALOG_LOAD_CARD_USAGE__;
  if (typeof loader !== 'function') {
    return undefined;
  }
  const name = card.name;
  const avatar = readString(card.rawCard.avatar) || readString(card.rawCard.data?.avatar);
  if (!name || !avatar) {
    return undefined;
  }
  const payload = await loader({ name, avatar });
  if (!isRecord(payload)) {
    return undefined;
  }
  const context = getSillyTavernContext();
  return buildUsageFromChats(card, readArray(payload.chats), context);
}

function buildUsage(card: NormalizedCharacterCard, context: Record<string, unknown>): CharacterUsage | undefined {
  const chat = readArray(context.chat);
  if (!chat.length) {
    return undefined;
  }

  return buildUsageFromChats(card, [{ file_name: 'current-chat', messages: chat }], context);
}

export function loadSillyTavernInitialData():
  | {
      cards: NormalizedCharacterCard[];
      usageByCardId: Map<string, NonNullable<CardAnalysisResult['usage']>>;
    }
  | undefined {
  const context = getSillyTavernContext();
  if (!context) {
    return undefined;
  }

  const characters = readArray(context.characters);
  const selected = characters[getCurrentCharacterIndex(context, characters)] ?? context.character;
  const rawCard = toRawCard(selected, 'current-character');
  if (!rawCard) {
    return undefined;
  }

  const card = normalizeCharacterCard(rawCard);
  const usage = buildUsage(card, context);
  return {
    cards: [card],
    usageByCardId: new Map(usage ? [[card.id, usage]] : []),
  };
}

export async function loadSillyTavernLibraryData(
  onProgress?: (progress: SillyTavernLibraryProgress) => void,
):
  Promise<
    | {
        cards: NormalizedCharacterCard[];
        usageByCardId: Map<string, NonNullable<CardAnalysisResult['usage']>>;
      }
    | undefined
  > {
  const loader = bridge().__CHARALOG_LOAD_SILLYTAVERN_LIBRARY__;
  if (typeof loader !== 'function') {
    return loadSillyTavernInitialData();
  }

  const globalBridge = bridge();
  const previousProgress = globalBridge.__CHARALOG_LIBRARY_PROGRESS__;
  if (onProgress) {
    globalBridge.__CHARALOG_LIBRARY_PROGRESS__ = onProgress;
  }
  let payload: unknown;
  try {
    payload = await loader();
  } finally {
    globalBridge.__CHARALOG_LIBRARY_PROGRESS__ = previousProgress;
  }
  if (!isRecord(payload)) {
    return loadSillyTavernInitialData();
  }

  const context = getSillyTavernContext();
  const rawCharacters = readArray(payload.characters);
  const chatsByAvatar = isRecord(payload.chatsByAvatar) ? payload.chatsByAvatar : {};
  const cards = rawCharacters
    .map((character, index) => toRawCard(character, 'character', index))
    .filter((card): card is CharacterCardRaw => Boolean(card))
    .map((card) => normalizeCharacterCard(card));
  const usageByCardId = new Map<string, NonNullable<CardAnalysisResult['usage']>>();

  cards.forEach((card) => {
    const avatar = readString(card.rawCard.avatar) || readString(card.rawCard.data?.avatar);
    const chats = readArray(chatsByAvatar[avatar]);
    const usage = buildUsageFromChats(card, chats, context);
    if (usage) {
      usageByCardId.set(card.id, usage);
    }
  });

  return cards.length ? { cards, usageByCardId } : loadSillyTavernInitialData();
}
