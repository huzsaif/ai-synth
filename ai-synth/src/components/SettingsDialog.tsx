import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  Box,
  Divider,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Info as InfoIcon } from '@mui/icons-material';
import { useAppContext } from '../contexts/AppContext';
import { ENV } from '../config/env';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onClose }) => {
  const { settings, updateApiConfig, updateSettings } = useAppContext();
  
  // Add console.log to debug environment variables
  useEffect(() => {
    console.log('Environment variables debug:');
    console.log('OpenAI API Key from ENV:', ENV.OPENAI_API_KEY ? 'Present (not empty)' : 'Not present (empty)');
    console.log('Google API Key from ENV:', ENV.GOOGLE_API_KEY ? 'Present (not empty)' : 'Not present (empty)');
    console.log('Settings from context:', settings);
  }, [settings]);
  
  const [openaiKey, setOpenaiKey] = useState(settings.apiConfig.openaiApiKey);
  const [googleKey, setGoogleKey] = useState(settings.apiConfig.googleApiKey);
  const [syntaxHighlighting, setSyntaxHighlighting] = useState(settings.syntaxHighlighting);
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showGoogleKey, setShowGoogleKey] = useState(false);
  
  // Check if environment variables are set
  const hasOpenAiEnvKey = !!ENV.OPENAI_API_KEY;
  const hasGoogleEnvKey = !!ENV.GOOGLE_API_KEY;

  const handleSave = () => {
    updateApiConfig({
      openaiApiKey: openaiKey,
      googleApiKey: googleKey
    });
    
    updateSettings({
      syntaxHighlighting
    });
    
    onClose();
  };

  const toggleOpenaiKeyVisibility = () => {
    setShowOpenaiKey(!showOpenaiKey);
  };

  const toggleGoogleKeyVisibility = () => {
    setShowGoogleKey(!showGoogleKey);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Settings</Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            API Configuration
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            Your API keys are stored locally in your browser and are never sent to our servers.
            {(hasOpenAiEnvKey || hasGoogleEnvKey) && (
              <Box mt={1}>
                <Typography variant="body2" fontWeight="medium">
                  <InfoIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                  Environment variables detected! Environment variables will take precedence over browser settings.
                </Typography>
              </Box>
            )}
          </Alert>
          
          <TextField
            label="OpenAI API Key"
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
            fullWidth
            margin="normal"
            type={showOpenaiKey ? 'text' : 'password'}
            placeholder="sk-..."
            helperText={hasOpenAiEnvKey ? "An environment variable is set for this API key" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle key visibility"
                    onClick={toggleOpenaiKeyVisibility}
                    edge="end"
                  >
                    {showOpenaiKey ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            label="Google API Key"
            value={googleKey}
            onChange={(e) => setGoogleKey(e.target.value)}
            fullWidth
            margin="normal"
            type={showGoogleKey ? 'text' : 'password'}
            helperText={hasGoogleEnvKey ? "An environment variable is set for this API key" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle key visibility"
                    onClick={toggleGoogleKeyVisibility}
                    edge="end"
                  >
                    {showGoogleKey ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Display Options
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={syntaxHighlighting}
                onChange={(e) => setSyntaxHighlighting(e.target.checked)}
                color="primary"
              />
            }
            label="Syntax highlighting for code"
          />
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog; 