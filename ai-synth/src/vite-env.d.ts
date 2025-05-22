/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_GOOGLE_API_KEY: string;
  readonly VITE_OPENAI_API_URL: string;
  readonly VITE_GEMINI_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}