// Environment variables accessor
// The 'import.meta.env' is specific to Vite applications

export const ENV = {
  // API Keys
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  GOOGLE_API_KEY: import.meta.env.VITE_GOOGLE_API_KEY || '',
  
  // API Endpoints
  OPENAI_API_URL: import.meta.env.VITE_OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions',
  GEMINI_API_URL: import.meta.env.VITE_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
};