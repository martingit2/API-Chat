import type { ChatMessage } from '../types';
import MarkdownMessage from './MarkdownMessage';


export default function MessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="message-list">
      {messages.map((msg, idx) => (
        <div key={idx} className={`message ${msg.role}`}>
          <div className="message-header">
            {msg.role === 'user' ? 'You' : 'Assistant'}
          </div>
          <MarkdownMessage content={msg.content} />
        </div>
      ))}
    </div>
  );
}