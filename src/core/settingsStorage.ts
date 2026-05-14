import type { ApiConfig } from '../domain/types';
import { hasSillyTavernGenerateBridge, SILLYTAVERN_GENERATE_BASE_URL } from '../integrations/sillyTavern';

const SETTINGS_KEY = 'charalog.apiConfig.v1';

export const defaultApiConfig: ApiConfig = {
  baseUrl: 'https://api.openai.com/v1',
  apiKey: '',
  model: 'gpt-4.1-mini',
  timeoutMs: 120000,
  maxRetries: 2,
  batchSize: 8,
  enableDebugMode: false,
};

function runtimeDefaultApiConfig(): ApiConfig {
  if (hasSillyTavernGenerateBridge()) {
    return {
      ...defaultApiConfig,
      baseUrl: SILLYTAVERN_GENERATE_BASE_URL,
      apiKey: 'sillytavern',
      model: 'sillytavern-current',
      maxRetries: 0,
    };
  }
  return defaultApiConfig;
}

function normalizeApiConfig(config: ApiConfig): ApiConfig {
  const timeoutMs = Number.isFinite(config.timeoutMs) && config.timeoutMs > 30000 ? config.timeoutMs : defaultApiConfig.timeoutMs;
  return {
    ...config,
    timeoutMs,
  };
}

export function loadApiConfig(): ApiConfig {
  const runtimeDefault = runtimeDefaultApiConfig();
  if (typeof localStorage === 'undefined') {
    return runtimeDefault;
  }

  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    return runtimeDefault;
  }

  try {
    const stored = JSON.parse(raw) as Partial<ApiConfig>;
    if (hasSillyTavernGenerateBridge()) {
      return normalizeApiConfig({
        ...runtimeDefault,
        timeoutMs: stored.timeoutMs ?? runtimeDefault.timeoutMs,
        batchSize: stored.batchSize ?? runtimeDefault.batchSize,
        enableDebugMode: stored.enableDebugMode ?? runtimeDefault.enableDebugMode,
      });
    }
    return normalizeApiConfig({
      ...runtimeDefault,
      ...stored,
    });
  } catch {
    return runtimeDefault;
  }
}

export function saveApiConfig(config: ApiConfig) {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(config));
}
