export type JsonParseResult<T> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      error: string;
    };

function stripJsonFence(value: string): string {
  const trimmed = value.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced?.[1]?.trim() ?? trimmed;
}

export function safeJsonParse<T = unknown>(value: string): JsonParseResult<T> {
  const stripped = stripJsonFence(value);
  const candidates = [stripped];
  const firstBrace = stripped.indexOf('{');
  const lastBrace = stripped.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    candidates.push(stripped.slice(firstBrace, lastBrace + 1));
  }

  let lastError = 'Unknown JSON parse error';
  for (const candidate of candidates) {
    try {
      return {
        ok: true,
        value: JSON.parse(candidate) as T,
      };
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown JSON parse error';
    }
  }

  return {
    ok: false,
    error: lastError,
  };
}
