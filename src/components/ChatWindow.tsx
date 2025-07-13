import { useState } from 'react';
import MessageList from './MessageList';
import type { AIModel, ChatMessage } from '../types';



interface ChatWindowProps {
  messages: ChatMessage[];
  onSend: (content: string) => void;
  apiKeys: Record<AIModel, string>;
}

export default function ChatWindow({ messages, onSend, apiKeys }: ChatWindowProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="chat-window">
      <MessageList messages={messages} />
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}