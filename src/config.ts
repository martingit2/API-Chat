import type { AIModel } from "./types";


export const MODEL_CONFIG = {
  'gpt-4-turbo': {
    MAX_TOKENS: 4096,
    DEFAULT_TEMP: 0.7,
    ENDPOINT: 'https://api.openai.com/v1/chat/completions'
  },
  'gemini-pro': {
    MAX_TOKENS: 2048,
    DEFAULT_TEMP: 0.5,
    ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
  },
  'claude-3-sonnet': {
    MAX_TOKENS: 4096,
    DEFAULT_TEMP: 0.7,
    ENDPOINT: 'https://api.anthropic.com/v1/messages'
  }
} as const;

export const getApiKey = (model: AIModel): string => {
  return import.meta.env[`VITE_${model.toUpperCase().replace('-', '_')}_API_KEY`] || '';
};