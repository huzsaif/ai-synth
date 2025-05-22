import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAppContext } from '../contexts/AppContext';

interface PromptInputProps {
  onSubmit: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const { settings } = useAppContext();
  const MAX_CHARS = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  const isSubmitDisabled = 
    isLoading || 
    !prompt.trim() || 
    !settings.apiConfig.openaiApiKey || 
    !settings.apiConfig.googleApiKey;

  let helperText = '';
  if (!settings.apiConfig.openaiApiKey) {
    helperText = 'OpenAI API key not configured. Please check settings.';
  } else if (!settings.apiConfig.googleApiKey) {
    helperText = 'Google API key not configured. Please check settings.';
  }

  return (
    <Paper
      elevation={3}
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        mb: 4,
        width: '100%',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Enter your prompt
      </Typography>
      
      <TextField
        multiline
        rows={4}
        placeholder="Type your prompt here..."
        fullWidth
        value={prompt}
        onChange={(e) => {
          if (e.target.value.length <= MAX_CHARS) {
            setPrompt(e.target.value);
          }
        }}
        disabled={isLoading}
        error={!!helperText}
        helperText={helperText || `${prompt.length}/${MAX_CHARS} characters`}
        sx={{ mb: 2 }}
        inputProps={{
          maxLength: MAX_CHARS,
        }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          type="submit"
          disabled={isSubmitDisabled}
        >
          {isLoading ? 'Comparing...' : 'Compare'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PromptInput; 