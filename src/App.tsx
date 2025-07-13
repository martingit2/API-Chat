import { useApiKeys } from './hooks/useApiKeys';
import { useChatHistory } from './hooks/useChatHistory';
import ChatWindow from './components/ChatWindow';
import ModelSelector from './components/ModelSelector';
import './styles/styles.css';

export default function App() {
  const { apiKeys, saveKey } = useApiKeys();
  const { currentThread, sendMessage, setCurrentModel } = useChatHistory();

  return (
    <div className="chat-container">
      <ModelSelector
        currentModel={currentThread.model}
        onModelChange={setCurrentModel}
        apiKeys={apiKeys}
        onApiKeyChange={saveKey}
      />
      <ChatWindow 
        messages={currentThread.messages} 
        onSend={sendMessage}
        apiKeys={apiKeys}
      />
    </div>
  );
}