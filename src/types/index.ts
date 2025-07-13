export type AIModel = 'gpt-4-turbo' | 'gemini-pro' | 'claude-3-sonnet';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatThread {
  id: string;
  title: string;
  messages: ChatMessage[];
  model: AIModel;
  temperature: number;
  maxTokens: number;
}