import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Paper,
  useTheme as useMuiTheme
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  DeleteSweep as ClearIcon
} from '@mui/icons-material';
import { useAppContext } from '../contexts/AppContext';
import type { ComparisonResult } from '../types';

interface HistorySidebarProps {
  onSelectPrompt: (prompt: string) => void;
  width: number;
}

// Helper function to format date
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
};

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const HistorySidebar: React.FC<HistorySidebarProps> = ({ onSelectPrompt, width }) => {
  const { history, clearHistory } = useAppContext();
  const muiTheme = useMuiTheme();

  if (history.length === 0) {
    return (
      <Paper 
        sx={{ 
          width, 
          height: '100%', 
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column' 
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${muiTheme.palette.divider}` }}>
          <Typography variant="h6">History</Typography>
        </Box>
        <Box sx={{ p: 3, textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            No history yet. Start comparing LLM responses to see them here.
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper 
      sx={{ 
        width, 
        height: '100%', 
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          borderBottom: `1px solid ${muiTheme.palette.divider}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6">History</Typography>
        <Tooltip title="Clear history">
          <IconButton size="small" onClick={clearHistory} aria-label="Clear history">
            <ClearIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      <List sx={{ overflowY: 'auto', flex: 1 }}>
        {history.map((item: ComparisonResult, index: number) => (
          <React.Fragment key={item.id}>
            <ListItem
              disablePadding
              secondaryAction={
                <Tooltip title="Remove from history">
                  <IconButton edge="end" size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemButton onClick={() => onSelectPrompt(item.prompt)}>
                <ListItemText
                  primary={truncateText(item.prompt, 40)}
                  secondary={formatDate(item.createdAt)}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: 'medium'
                  }}
                  secondaryTypographyProps={{
                    variant: 'caption',
                    color: 'text.secondary'
                  }}
                />
              </ListItemButton>
            </ListItem>
            {index < history.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default HistorySidebar; 