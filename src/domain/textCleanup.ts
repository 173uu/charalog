const SCRIPT_STYLE_BLOCK_RE = /<(script|style)[\s\S]*?<\/\1>/gi;
const HTML_TAG_RE = /<[^>]+>/g;
const CSS_BLOCK_RE = /\{[^{}]*(?:color|font|background|margin|padding|display|position|width|height)[^{}]*\}/gi;
const JS_HINT_RE = /\b(?:function|const|let|var|=>|document\.|window\.|console\.log)\b[\s\S]*?(?:;|\n|$)/gi;
const REGEX_SCRIPT_HINT_RE = /\/(?:[^/\\]|\\.)+\/[gimsuy]*\s*(?:=>|,|\n|$)/g;
const CODE_FENCE_OPEN_RE = /```[a-zA-Z0-9_-]*\s*\r?\n?/g;

export function unwrapCodeFences(value: string): string {
  return value.replace(CODE_FENCE_OPEN_RE, '\n').replace(/```/g, '\n');
}

export function cleanCardText(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  return unwrapCodeFences(value)
    .replace(SCRIPT_STYLE_BLOCK_RE, ' ')
    .replace(CSS_BLOCK_RE, ' ')
    .replace(JS_HINT_RE, ' ')
    .replace(REGEX_SCRIPT_HINT_RE, ' ')
    .replace(HTML_TAG_RE, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeForMatch(value: string): string {
  return cleanCardText(value)
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
