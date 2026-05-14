import type { ApiConfig } from '../domain/types';
import { generateWithSillyTavern, SILLYTAVERN_GENERATE_BASE_URL } from '../integrations/sillyTavern';

type ProxyRequestInit = {
  method: 'GET' | 'POST';
  body?: string;
  signal?: AbortSignal;
};

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

function shouldUseLocalProxy(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return ['127.0.0.1', 'localhost', '::1'].includes(window.location.hostname);
}

function isSillyTavernGenerateConfig(config: ApiConfig): boolean {
  return config.baseUrl.trim() === SILLYTAVERN_GENERATE_BASE_URL;
}

function openAiResponse(content: string): Response {
  if (!content.trim()) {
    return new Response(JSON.stringify({ error: 'SillyTavern 生成返回空文本。' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      choices: [{ message: { content } }],
      usage: {},
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  );
}

async function fetchViaSillyTavern(path: string, init: ProxyRequestInit): Promise<Response> {
  if (path === '/models') {
    return new Response(JSON.stringify({ data: [{ id: 'sillytavern-current' }] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (path !== '/chat/completions' || init.method !== 'POST' || !init.body) {
    return new Response(JSON.stringify({ error: 'Unsupported SillyTavern bridge request.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const payload = JSON.parse(init.body) as {
    messages?: Array<{ role?: string; content?: string }>;
  };
  const systemPrompt = payload.messages?.find((message) => message.role === 'system')?.content ?? '';
  const prompt = payload.messages?.filter((message) => message.role !== 'system').map((message) => message.content ?? '').join('\n\n') ?? '';
  const content = await generateWithSillyTavern({ systemPrompt, prompt });
  return openAiResponse(content);
}

export async function fetchOpenAiCompatible(config: ApiConfig, path: string, init: ProxyRequestInit): Promise<Response> {
  if (isSillyTavernGenerateConfig(config)) {
    return fetchViaSillyTavern(path, init);
  }

  if (!shouldUseLocalProxy()) {
    return fetch(joinUrl(config.baseUrl, path), {
      method: init.method,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: init.body,
      signal: init.signal,
    });
  }

  return fetch('/api/ai-proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      baseUrl: config.baseUrl,
      apiKey: config.apiKey,
      path,
      method: init.method,
      body: init.body,
    }),
    signal: init.signal,
  });
}
