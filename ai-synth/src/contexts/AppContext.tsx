import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AppSettings, Theme, ApiConfig, ComparisonResult } from '../types';
import { getSettings, saveSettings, getComparisonHistory, saveComparisonToHistory } from '../utils/storage';
import { ENV } from '../config/env';

interface AppContextType {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  updateApiConfig: (config: Partial<ApiConfig>) => void;
  toggleTheme: () => void;
  history: ComparisonResult[];
  addToHistory: (comparison: ComparisonResult) => void;
  clearHistory: () => void;
}

// Use environment variables for API config if available
const getDefaultApiConfig = (): ApiConfig => ({
  openaiApiKey: ENV.OPENAI_API_KEY || '',
  googleApiKey: ENV.GOOGLE_API_KEY || ''
});

const defaultContextValue: AppContextType = {
  settings: {
    theme: 'light',
    apiConfig: getDefaultApiConfig(),
    syntaxHighlighting: true
  },
  updateSettings: () => {},
  updateApiConfig: () => {},
  toggleTheme: () => {},
  history: [],
  addToHistory: () => {},
  clearHistory: () => {}
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultContextValue.settings);
  const [history, setHistory] = useState<ComparisonResult[]>([]);

  // Load settings and history from localStorage on component mount
  useEffect(() => {
    const storedSettings = getSettings();
    
    // Override stored API keys with environment variables if they exist
    const apiConfig: ApiConfig = {
      openaiApiKey: ENV.OPENAI_API_KEY || storedSettings.apiConfig.openaiApiKey,
      googleApiKey: ENV.GOOGLE_API_KEY || storedSettings.apiConfig.googleApiKey
    };
    
    setSettings({
      ...storedSettings,
      apiConfig
    });
    
    setHistory(getComparisonHistory());
    
    // Debug log
    console.log('App initialized with settings:', { 
      apiConfig,
      envVars: { 
        openAI: ENV.OPENAI_API_KEY ? 'Present (not empty)' : 'Not present (empty)', 
        google: ENV.GOOGLE_API_KEY ? 'Present (not empty)' : 'Not present (empty)' 
      }
    });
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  const updateApiConfig = (config: Partial<ApiConfig>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      apiConfig: {
        ...prevSettings.apiConfig,
        ...config
      }
    }));
  };

  const toggleTheme = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      theme: prevSettings.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const addToHistory = (comparison: ComparisonResult) => {
    setHistory(prevHistory => [comparison, ...prevHistory.slice(0, 9)]);
    saveComparisonToHistory(comparison);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('llm-compare-history');
  };

  const value = {
    settings,
    updateSettings,
    updateApiConfig,
    toggleTheme,
    history,
    addToHistory,
    clearHistory
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}; 