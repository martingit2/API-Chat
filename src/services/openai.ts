import type { ChatMessage } from "../types";


export async function streamOpenAIResponse(
  apiKey: string,
  messages: ChatMessage[],
  onData: (chunk: string) => void,
  options: { temperature?: number; maxTokens?: number } = {}
) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo',
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      stream: true,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2048
    })
  });

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No reader available');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data:') && !line.includes('[DONE]')) {
        try {
          const data = JSON.parse(line.slice(5).trim());
          const chunk = data.choices[0]?.delta?.content;
          if (chunk) onData(chunk);
        } catch (e) {
          console.error('Error parsing stream chunk:', e);
        }
      }
    }
  }
}