import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function readRequestBody(req: import('node:http').IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function joinUrl(baseUrl: string, requestPath: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${requestPath.replace(/^\/+/, '')}`;
}

function isSafeProxyTarget(baseUrl: string): boolean {
  try {
    const url = new URL(baseUrl);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function aiProxyPlugin() {
  return {
    name: 'charalog-ai-proxy',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use('/api/ai-proxy', async (req, res) => {
        try {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.end('Method Not Allowed');
            return;
          }

          const body = await readRequestBody(req);
          const parsed = JSON.parse(body) as {
            baseUrl?: unknown;
            apiKey?: unknown;
            path?: unknown;
            method?: unknown;
            body?: unknown;
          };
          const baseUrl = typeof parsed.baseUrl === 'string' ? parsed.baseUrl.trim() : '';
          const apiKey = typeof parsed.apiKey === 'string' ? parsed.apiKey : '';
          const requestPath = typeof parsed.path === 'string' && parsed.path.startsWith('/') ? parsed.path : '';
          const method = parsed.method === 'GET' ? 'GET' : 'POST';

          if (!baseUrl || !apiKey || !requestPath || !isSafeProxyTarget(baseUrl)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid AI proxy request.' }));
            return;
          }

          const upstream = await fetch(joinUrl(baseUrl, requestPath), {
            method,
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: method === 'POST' && typeof parsed.body === 'string' ? parsed.body : undefined,
          });
          const responseText = await upstream.text();
          res.statusCode = upstream.status;
          res.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'application/json');
          res.end(responseText);
        } catch (error) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'AI proxy failed.' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), aiProxyPlugin()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
});
