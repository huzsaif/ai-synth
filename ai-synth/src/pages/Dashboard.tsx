import React, { useState } from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import Header from '../components/Header';
import SettingsDialog from '../components/SettingsDialog';
import PromptInput from '../components/PromptInput';
import ResponseViewer from '../components/ResponseViewer';
import HistorySidebar from '../components/HistorySidebar';
import { compareResponses } from '../services/llmService';
import { useAppContext } from '../contexts/AppContext';
import type { LLMResponse } from '../types';

const HISTORY_SIDEBAR_WIDTH = 280;

const Dashboard: React.FC = () => {
  const { settings, addToHistory } = useAppContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatgptResponse, setChatgptResponse] = useState<LLMResponse | undefined>();
  const [geminiResponse, setGeminiResponse] = useState<LLMResponse | undefined>();

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleCompare = async (prompt: string) => {
    setIsLoading(true);
    setChatgptResponse(undefined);
    setGeminiResponse(undefined);
    
    try {
      const result = await compareResponses(prompt, settings.apiConfig);
      
      // Find responses by model
      const chatgpt = result.responses.find(r => r.model === 'chatgpt');
      const gemini = result.responses.find(r => r.model === 'gemini');
      
      setChatgptResponse(chatgpt);
      setGeminiResponse(gemini);
      
      // Add to history
      addToHistory(result);
      
    } catch (error) {
      console.error('Error during comparison:', error);
      // If error is not already captured in the response objects
      if (!chatgptResponse?.error && !geminiResponse?.error) {
        setChatgptResponse({
          model: 'chatgpt',
          content: '',
          timestamp: Date.now(),
          responseTime: 0,
          error: 'Failed to get response. Please try again.'
        });
        setGeminiResponse({
          model: 'gemini',
          content: '',
          timestamp: Date.now(),
          responseTime: 0,
          error: 'Failed to get response. Please try again.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPromptFromHistory = (historyPrompt: string) => {
    handleCompare(historyPrompt);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Header onOpenSettings={handleOpenSettings} />
      
      {/* History Sidebar */}
      <Box 
        component="aside" 
        sx={{ 
          width: HISTORY_SIDEBAR_WIDTH, 
          flexShrink: 0,
          height: '100%'
        }}
      >
        <Toolbar /> {/* Spacer to push content below app bar */}
        <HistorySidebar 
          width={HISTORY_SIDEBAR_WIDTH} 
          onSelectPrompt={handleSelectPromptFromHistory} 
        />
      </Box>
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          overflow: 'auto', 
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Toolbar /> {/* Spacer to push content below app bar */}
        
        <Container maxWidth="xl" sx={{ mb: 4 }}>
          {/* Prompt Input Section */}
          <PromptInput 
            onSubmit={handleCompare} 
            isLoading={isLoading}
          />
          
          {/* Responses Section */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 3, 
            flexGrow: 1, 
            minHeight: 500 
          }}>
            <Box sx={{ flex: 1, display: 'flex' }}>
              <ResponseViewer 
                response={chatgptResponse} 
                isLoading={isLoading} 
                model="chatgpt" 
              />
            </Box>
            <Box sx={{ flex: 1, display: 'flex' }}>
              <ResponseViewer 
                response={geminiResponse} 
                isLoading={isLoading} 
                model="gemini" 
              />
            </Box>
          </Box>
        </Container>
      </Box>
      
      {/* Settings Dialog */}
      <SettingsDialog 
        open={isSettingsOpen} 
        onClose={handleCloseSettings} 
      />
    </Box>
  );
};

export default Dashboard; 