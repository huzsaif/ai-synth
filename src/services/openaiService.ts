import axios from 'axios';
import type { LLMResponse } from '../types';
import { ENV } from '../config/env';

const OPENAI_API_URL = ENV.OPENAI_API_URL;

export const generateChatGPTResponse = async (
  prompt: string,
  apiKey: string = ENV.OPENAI_API_KEY
): Promise<LLMResponse> => {
  const startTime = Date.now();
  
  try {
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    const responseTime = Date.now() - startTime;
    
    return {
      model: 'chatgpt',
      content: response.data.choices[0].message.content,
      timestamp: Date.now(),
      responseTime,
      tokenUsage: {
        promptTokens: response.data.usage.prompt_tokens,
        completionTokens: response.data.usage.completion_tokens,
        totalTokens: response.data.usage.total_tokens
      }
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    const responseTime = Date.now() - startTime;
    
    let errorMessage = 'Failed to get response from ChatGPT';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      model: 'chatgpt',
      content: '',
      timestamp: Date.now(),
      responseTime,
      error: errorMessage
    };
  }
}; 