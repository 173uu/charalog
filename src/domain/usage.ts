import { matchChatToOpening } from './matching';
import type { CharacterUsage, ChatRaw, ScenarioOpening, ScenarioUsage } from './types';

function maxDate(values: string[]): string | undefined {
  return values.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
}

export function computeCharacterUsage(chats: ChatRaw[], openings: ScenarioOpening[]): CharacterUsage {
  const characterId = openings[0]?.characterId ?? chats[0]?.characterId ?? 'unknown-character';
  const relatedChats = chats.filter((chat) => chat.characterId === characterId);
  const scenarioMap = new Map<string, ScenarioUsage>();

  openings.forEach((opening) => {
    scenarioMap.set(opening.id, {
      scenarioId: opening.id,
      openingTitle: opening.title,
      chatCount: 0,
      totalMessages: 0,
      userMessages: 0,
    });
  });

  relatedChats.forEach((chat) => {
    const match = matchChatToOpening(chat, openings);
    const scenarioId = match.scenarioId ?? 'unknown-opening';
    const existing =
      scenarioMap.get(scenarioId) ??
      {
        scenarioId,
        openingTitle: '未识别开场',
        chatCount: 0,
        totalMessages: 0,
        userMessages: 0,
      };

    const totalMessages = chat.messages.length;
    const userMessages = chat.messages.filter((message) => message.role === 'user').length;

    scenarioMap.set(scenarioId, {
      ...existing,
      chatCount: existing.chatCount + 1,
      totalMessages: existing.totalMessages + totalMessages,
      userMessages: existing.userMessages + userMessages,
      lastActiveAt: maxDate([existing.lastActiveAt, chat.updatedAt].filter(Boolean) as string[]),
    });
  });

  const scenarioStats = Array.from(scenarioMap.values()).filter(
    (scenario) => scenario.chatCount > 0 || scenario.scenarioId !== 'unknown-opening',
  );

  return {
    characterId,
    chatCount: relatedChats.length,
    totalMessages: relatedChats.reduce((sum, chat) => sum + chat.messages.length, 0),
    userMessages: relatedChats.reduce(
      (sum, chat) => sum + chat.messages.filter((message) => message.role === 'user').length,
      0,
    ),
    lastActiveAt: maxDate(relatedChats.map((chat) => chat.updatedAt)),
    scenarioStats,
  };
}
