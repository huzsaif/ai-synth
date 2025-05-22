import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
  CircularProgress,
  Button,
  useTheme as useMuiTheme
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import type { LLMResponse } from '../types';
import ReactMarkdown from 'react-markdown';
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAppContext } from '../contexts/AppContext';

interface ResponseViewerProps {
  response?: LLMResponse;
  isLoading: boolean;
  model: 'chatgpt' | 'gemini';
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({ response, isLoading, model }) => {
  const { settings } = useAppContext();
  const muiTheme = useMuiTheme();
  const modelName = model === 'chatgpt' ? 'ChatGPT' : 'Gemini';
  const modelColor = model === 'chatgpt' ? '#10a37f' : '#4285F4';
  const isDarkMode = settings.theme === 'dark';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <Paper
        elevation={2}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderTop: `4px solid ${modelColor}`
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{modelName}</Typography>
          <Chip 
            label="Loading..." 
            size="small" 
            color={model === 'chatgpt' ? 'success' : 'primary'} 
            variant="outlined" 
          />
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size={40} sx={{ color: modelColor }} />
        </Box>
      </Paper>
    );
  }

  if (!response) {
    return (
      <Paper
        elevation={2}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderTop: `4px solid ${modelColor}`
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{modelName}</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Enter a prompt and click "Compare" to see {modelName}'s response
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderTop: `4px solid ${modelColor}`,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{modelName}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {response.error ? (
            <Chip 
              label="Error" 
              size="small" 
              color="error" 
              variant="outlined" 
            />
          ) : (
            <Chip 
              label={`${response.responseTime}ms`} 
              size="small" 
              color={model === 'chatgpt' ? 'success' : 'primary'} 
              variant="outlined" 
            />
          )}
          <Button
            startIcon={<ContentCopy />}
            size="small"
            variant="outlined"
            onClick={() => copyToClipboard(response.content || response.error || '')}
            disabled={!response.content && !response.error}
          >
            Copy
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {response.error ? (
        <Box sx={{ p: 2, bgcolor: muiTheme.palette.error.light + '20', borderRadius: 1 }}>
          <Typography color="error">{response.error}</Typography>
        </Box>
      ) : (
        <Box 
          sx={{ 
            flex: 1, 
            overflow: 'auto',
            '& img': {
              maxWidth: '100%'
            },
            '& pre': {
              margin: 0,
              padding: 0,
              background: 'transparent !important',
            }
          }}
        >
          <ReactMarkdown>
            {response.content}
          </ReactMarkdown>
        </Box>
      )}

      {response.tokenUsage && (
        <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${muiTheme.palette.divider}` }}>
          <Typography variant="caption" color="text.secondary">
            Tokens: {response.tokenUsage.promptTokens} (prompt) + {response.tokenUsage.completionTokens} (completion) = {response.tokenUsage.totalTokens} total
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ResponseViewer; 