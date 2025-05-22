import axios from 'axios';
import type { LLMResponse } from '../types';
import { ENV } from '../config/env';

const GEMINI_API_URL = ENV.GEMINI_API_URL;

export const generateGeminiResponse = async (
  prompt: string,
  apiKey: string = ENV.GOOGLE_API_KEY
): Promise<LLMResponse> => {
  const startTime = Date.now();
  
  try {
    if (!apiKey) {
      throw new Error('Google API key is not configured');
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const responseTime = Date.now() - startTime;
    const textResponse = response.data.candidates[0]?.content?.parts?.[0]?.text || '';
    
    // Note: Gemini API doesn't provide token usage in the same way OpenAI does
    return {
      model: 'gemini',
      content: textResponse,
      timestamp: Date.now(),
      responseTime
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    const responseTime = Date.now() - startTime;
    
    let errorMessage = 'Failed to get response from Gemini';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
      if (error.response.data?.error?.message) {
        errorMessage += ` - ${error.response.data.error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      model: 'gemini',
      content: '',
      timestamp: Date.now(),
      responseTime,
      error: errorMessage
    };
  }
}; 