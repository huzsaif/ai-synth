import { generateChatGPTResponse } from './openaiService';
import { generateGeminiResponse } from './geminiService';
import type { LLMModel, LLMResponse, ComparisonResult, ApiConfig } from '../types';
import { ENV } from '../config/env';

export const generateResponse = async (
  prompt: string,
  model: LLMModel,
  apiConfig: ApiConfig
): Promise<LLMResponse> => {
  // Use environment variables as fallbacks if API keys are not provided in apiConfig
  const openaiKey = apiConfig.openaiApiKey || ENV.OPENAI_API_KEY;
  const googleKey = apiConfig.googleApiKey || ENV.GOOGLE_API_KEY;
  
  if (model === 'chatgpt') {
    return generateChatGPTResponse(prompt, openaiKey);
  } else if (model === 'gemini') {
    return generateGeminiResponse(prompt, googleKey);
  }
  
  throw new Error(`Unsupported model: ${model}`);
};

export const compareResponses = async (
  prompt: string,
  apiConfig: ApiConfig
): Promise<ComparisonResult> => {
  try {
    // Launch both API requests in parallel
    const [chatgptResponse, geminiResponse] = await Promise.all([
      generateResponse(prompt, 'chatgpt', apiConfig),
      generateResponse(prompt, 'gemini', apiConfig)
    ]);

    const result: ComparisonResult = {
      prompt,
      responses: [chatgptResponse, geminiResponse],
      id: generateUniqueId(),
      createdAt: Date.now()
    };

    return result;
  } catch (error) {
    console.error('Error comparing responses:', error);
    throw error;
  }
};

// Helper function to generate a unique ID
const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}; 