import { useState, useEffect, useCallback } from 'react';

import { MODEL_CONFIG } from '../config';
import type { AIModel, ChatMessage, ChatThread } from '../types';

export function useChatHistory() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);

  const createNewThread = useCallback((model: AIModel = 'gpt-4-turbo') => {
    const newThread: ChatThread = {
      id: Date.now().toString(),
      title: `New Chat ${threads.length + 1}`,
      messages: [],
      model,
      temperature: MODEL_CONFIG[model].DEFAULT_TEMP,
      maxTokens: MODEL_CONFIG[model].MAX_TOKENS
    };
    
    setThreads(prev => [newThread, ...prev]);
    setCurrentThreadId(newThread.id);
    return newThread;
  }, [threads.length]);

  useEffect(() => {
    const saved = localStorage.getItem('chatThreads');
    if (saved) {
      const parsed = JSON.parse(saved) as ChatThread[];
      setThreads(parsed);
      setCurrentThreadId(parsed[0]?.id || null);
    } else {
      createNewThread();
    }
  }, [createNewThread]);

  useEffect(() => {
    if (threads.length > 0) {
      localStorage.setItem('chatThreads', JSON.stringify(threads));
    }
  }, [threads]);

  const currentThread = threads.find(t => t.id === currentThreadId) || createNewThread();

  const sendMessage = async (content: string) => {
    if (!currentThreadId) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: Date.now()
    };

    setThreads(prev => prev.map(thread => 
      thread.id === currentThreadId
        ? { ...thread, messages: [...thread.messages, userMessage] }
        : thread
    ));

    // Implementer API-kall her
  };

  const setCurrentModel = (model: AIModel) => {
    setThreads(prev => prev.map(thread => 
      thread.id === currentThreadId
        ? { ...thread, model }
        : thread
    ));
  };

  return { 
    threads, 
    currentThread, 
    createNewThread, 
    sendMessage,
    setCurrentModel
  };
}