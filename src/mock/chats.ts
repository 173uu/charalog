import type { ChatRaw, ChatMessage } from '../domain/types';

function message(id: string, role: ChatMessage['role'], content: string, createdAt: string): ChatMessage {
  return { id, role, content, createdAt };
}

export const mockChats: ChatRaw[] = [
  {
    id: 'chat-lin-xia-1',
    characterId: 'card-lin-xia',
    title: '夜宵和作息悬疑片',
    createdAt: '2026-04-28T21:15:00+08:00',
    updatedAt: '2026-04-28T22:02:00+08:00',
    messages: [
      message('m1', 'character', '门铃响了两声。林夏拎着一袋夜宵站在门口，挑眉看你：“还没睡？很好，看来有人又把作息过成了悬疑片。”', '2026-04-28T21:15:00+08:00'),
      message('m2', 'user', '你怎么又突然出现。', '2026-04-28T21:16:00+08:00'),
      message('m3', 'character', '“突然？我这是抢救邻居作息，属于公益。”', '2026-04-28T21:17:00+08:00'),
      message('m4', 'user', '行吧，夜宵留下。', '2026-04-28T21:20:00+08:00'),
    ],
  },
  {
    id: 'chat-zhang-1',
    characterId: 'card-zhang-jingci',
    title: '旧识重逢',
    createdAt: '2026-04-29T20:00:00+08:00',
    updatedAt: '2026-04-29T20:42:00+08:00',
    messages: [
      message('m5', 'character', '宴会厅的灯落在张靖辞肩头。他停在你面前，声音很轻：“好久不见。你看起来，终于学会不把真心写在脸上了。”', '2026-04-29T20:00:00+08:00'),
      message('m6', 'user', '你倒是没变，还是这么会刺人。', '2026-04-29T20:01:00+08:00'),
      message('m7', 'character', '“刺人也要看对象。你显然值得我认真发挥。”', '2026-04-29T20:03:00+08:00'),
    ],
  },
  {
    id: 'chat-zhang-2',
    characterId: 'card-zhang-jingci',
    title: '契约三个月',
    createdAt: '2026-04-30T19:30:00+08:00',
    updatedAt: '2026-04-30T21:18:00+08:00',
    messages: [
      message('m8', 'character', '合同被推到你面前。张靖辞敲了敲签名处：“三个月，互不越界。你最好真的做得到。”', '2026-04-30T19:30:00+08:00'),
      message('m9', 'user', '这条规则听起来最像会被你先破坏。', '2026-04-30T19:31:00+08:00'),
      message('m10', 'character', '“激将法太旧了。但你用，我可以假装上当。”', '2026-04-30T19:35:00+08:00'),
      message('m11', 'user', '签吧。', '2026-04-30T19:40:00+08:00'),
      message('m12', 'character', '他垂眼笑了一下，很短，像故意不让你抓住证据。', '2026-04-30T19:41:00+08:00'),
    ],
  },
  {
    id: 'chat-group-1',
    characterId: 'card-night-shift-house',
    title: '合租屋厨房事故',
    createdAt: '2026-05-01T00:50:00+08:00',
    updatedAt: '2026-05-01T01:22:00+08:00',
    messages: [
      message('m13', 'character', '厨房警报响起时，你推开门，看见四位室友对着一锅不明物质沉默。', '2026-05-01T00:50:00+08:00'),
      message('m14', 'user', '这是晚饭还是召唤仪式？', '2026-05-01T00:52:00+08:00'),
      message('m15', 'character', '主播举手：“从直播数据看，观众也很想知道。”', '2026-05-01T00:53:00+08:00'),
    ],
  },
  {
    id: 'chat-world-1',
    characterId: 'card-ash-city-lore',
    title: '东区雾墙',
    createdAt: '2026-05-02T03:00:00+08:00',
    updatedAt: '2026-05-02T03:38:00+08:00',
    messages: [
      message('m16', 'character', '地下广播员压低声音：“今晚别走东区。那边的霓虹灯，亮得太像诱饵。”', '2026-05-02T03:00:00+08:00'),
      message('m17', 'user', '那我偏要去看看。', '2026-05-02T03:01:00+08:00'),
      message('m18', 'character', '广播里传来一声笑：“行，勇敢和倒霉有时候确实共用一张脸。”', '2026-05-02T03:05:00+08:00'),
    ],
  },
];
