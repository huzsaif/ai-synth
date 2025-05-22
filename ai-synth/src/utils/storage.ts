import type { ApiConfig, ComparisonResult, Theme, AppSettings } from '../types';

const STORAGE_KEYS = {
  API_CONFIG: 'llm-compare-api-config',
  COMPARISON_HISTORY: 'llm-compare-history',
  SETTINGS: 'llm-compare-settings'
};

const MAX_HISTORY_ITEMS = 10;

// API Config Storage
export const saveApiConfig = (config: ApiConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.API_CONFIG, JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save API config to localStorage:', error);
  }
};

export const getApiConfig = (): ApiConfig | null => {
  try {
    const config = localStorage.getItem(STORAGE_KEYS.API_CONFIG);
    return config ? JSON.parse(config) : null;
  } catch (error) {
    console.error('Failed to get API config from localStorage:', error);
    return null;
  }
};

// Comparison History Storage
export const saveComparisonToHistory = (comparison: ComparisonResult): void => {
  try {
    const historyString = localStorage.getItem(STORAGE_KEYS.COMPARISON_HISTORY);
    const history: ComparisonResult[] = historyString 
      ? JSON.parse(historyString) 
      : [];
    
    // Add new comparison to the beginning of the array
    history.unshift(comparison);
    
    // Limit history size
    if (history.length > MAX_HISTORY_ITEMS) {
      history.pop();
    }
    
    localStorage.setItem(STORAGE_KEYS.COMPARISON_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save comparison to history:', error);
  }
};

export const getComparisonHistory = (): ComparisonResult[] => {
  try {
    const historyString = localStorage.getItem(STORAGE_KEYS.COMPARISON_HISTORY);
    return historyString ? JSON.parse(historyString) : [];
  } catch (error) {
    console.error('Failed to get comparison history:', error);
    return [];
  }
};

export const clearComparisonHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.COMPARISON_HISTORY);
  } catch (error) {
    console.error('Failed to clear comparison history:', error);
  }
};

// Settings Storage
export const getDefaultSettings = (): AppSettings => ({
  theme: 'light' as Theme,
  apiConfig: {
    openaiApiKey: '',
    googleApiKey: ''
  },
  syntaxHighlighting: true
});

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings to localStorage:', error);
  }
};

export const getSettings = (): AppSettings => {
  try {
    const settingsString = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settingsString 
      ? JSON.parse(settingsString) 
      : getDefaultSettings();
  } catch (error) {
    console.error('Failed to get settings from localStorage:', error);
    return getDefaultSettings();
  }
}; 