import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { Theme as AppTheme } from '../types';
import { useAppContext } from './AppContext';

// Define theme context
const ThemeContext = createContext<{
  theme: AppTheme;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// Theme Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, toggleTheme } = useAppContext();
  
  // Create Material-UI theme based on current theme setting
  const muiTheme = useMemo(() => {
    return createTheme({
      palette: {
        mode: settings.theme,
        primary: {
          main: settings.theme === 'light' ? '#1976d2' : '#90caf9',
        },
        secondary: {
          main: settings.theme === 'light' ? '#9c27b0' : '#ce93d8',
        },
        background: {
          default: settings.theme === 'light' ? '#f5f5f5' : '#121212',
          paper: settings.theme === 'light' ? '#ffffff' : '#1e1e1e',
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              boxShadow: settings.theme === 'light' 
                ? '0px 2px 4px rgba(0, 0, 0, 0.1)' 
                : '0px 2px 4px rgba(0, 0, 0, 0.3)',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 6,
              textTransform: 'none',
            },
          },
        },
      },
    });
  }, [settings.theme]);

  // Context value
  const value = {
    theme: settings.theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 