export type LLMModel = 'chatgpt' | 'gemini';

export type ApiConfig = {
  openaiApiKey: string;
  googleApiKey: string;
};

export type LLMResponse = {
  model: LLMModel;
  content: string;
  timestamp: number;
  responseTime: number;
  error?: string;
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
};

export type ComparisonResult = {
  prompt: string;
  responses: LLMResponse[];
  id: string;
  createdAt: number;
};

export type Theme = 'light' | 'dark';

export type AppSettings = {
  theme: Theme;
  apiConfig: ApiConfig;
  syntaxHighlighting: boolean;
}; 