import type { AIModel } from "../types";


export default function ModelSelector({ 
  currentModel, 
  onModelChange,
  apiKeys,
  onApiKeyChange
}: {
  currentModel: AIModel;
  onModelChange: (model: AIModel) => void;
  apiKeys: Record<AIModel, string>;
  onApiKeyChange: (model: AIModel, key: string) => void;
}) {
  return (
    <div className="model-selector">
      <select 
        value={currentModel} 
        onChange={(e) => onModelChange(e.target.value as AIModel)}
      >
        <option value="gpt-4-turbo">GPT-4 Turbo</option>
        <option value="gemini-pro">Gemini Pro</option>
      </select>

      <input
        type="password"
        value={apiKeys[currentModel]}
        onChange={(e) => onApiKeyChange(currentModel, e.target.value)}
        placeholder={`${currentModel} API Key`}
      />
    </div>
  );
}