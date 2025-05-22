// Load environment variables first
import './vite-env.d.ts';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Log environment variables for debugging
console.log('ENV VARS IN MAIN:', {
  OPENAI_KEY: import.meta.env.VITE_OPENAI_API_KEY ? 'Present (not shown for security)' : 'Not present',
  GOOGLE_KEY: import.meta.env.VITE_GOOGLE_API_KEY ? 'Present (not shown for security)' : 'Not present'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
