import { fetchOpenAiCompatible } from './aiProxy';
import type { ApiConfig } from '../domain/types';

export async function testOpenAiCompatibleConnection(config: ApiConfig): Promise<boolean> {
  if (!config.baseUrl.trim() || !config.apiKey.trim() || !config.model.trim()) {
    return false;
  }

  for (let attempt = 0; attempt <= config.maxRetries; attempt += 1) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), config.timeoutMs);

    try {
      const response = await fetchOpenAiCompatible(config, '/models', {
        method: 'GET',
        signal: controller.signal,
      });

      if (response.ok) {
        return true;
      }
    } catch {
      // Try again until maxRetries is exhausted.
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return false;
}
