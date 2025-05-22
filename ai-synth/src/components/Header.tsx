import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box,
  useTheme as useMuiTheme
} from '@mui/material';
import { 
  Brightness4 as DarkModeIcon, 
  Brightness7 as LightModeIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useAppContext } from '../contexts/AppContext';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { settings, toggleTheme } = useAppContext();
  const muiTheme = useMuiTheme();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: muiTheme.palette.primary.main,
        boxShadow: 2
      }}
    >
      <Toolbar>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}
        >
          LLM Compare
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            color="inherit" 
            onClick={toggleTheme} 
            sx={{ ml: 1 }}
            aria-label="Toggle theme"
          >
            {settings.theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          
          <IconButton 
            color="inherit" 
            onClick={onOpenSettings} 
            sx={{ ml: 1 }}
            aria-label="Open settings"
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 