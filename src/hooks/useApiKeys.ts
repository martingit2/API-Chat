import { useState } from 'react';
import type { AIModel } from '../types';


export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<Record<AIModel, string>>(() => {
    const defaultKeys = {} as Record<AIModel, string>;
    const models: AIModel[] = ['gpt-4-turbo', 'gemini-pro', 'claude-3-sonnet'];
    
    models.forEach(model => {
      defaultKeys[model] = localStorage.getItem(`apiKey-${model}`) || '';
    });

    return defaultKeys;
  });

  const saveKey = (model: AIModel, key: string) => {
    const newKeys = { ...apiKeys, [model]: key };
    setApiKeys(newKeys);
    localStorage.setItem(`apiKey-${model}`, key);
  };

  return { apiKeys, saveKey };
}