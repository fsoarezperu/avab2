'use client';

import { Box, Typography, Stack, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';

interface SidebarProps {
  setCurrentView: (view: string) => void;
}

export default function Sidebar({ setCurrentView }: SidebarProps) {
  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: 'grey.900',
        height: '100vh',
        color: 'white',
        p: 2,
        pt: 8
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Store Dashboard
        </Typography>
        
        <Stack spacing={1}>
          <Button
            startIcon={<DashboardIcon />}
            onClick={() => setCurrentView('dashboard')}
            sx={{ 
              color: 'white',
              justifyContent: 'flex-start',
              textTransform: 'none',
              py: 1
            }}
          >
            Dashboard
          </Button>

          <Button
            startIcon={<ShoppingCartIcon />}
            onClick={() => setCurrentView('orders')}
            sx={{ 
              color: 'white',
              justifyContent: 'flex-start',
              textTransform: 'none',
              py: 1
            }}
          >
            Orders
          </Button>

          <Button
            startIcon={<PeopleIcon />}
            onClick={() => setCurrentView('customers')}
            sx={{ 
              color: 'white',
              justifyContent: 'flex-start',
              textTransform: 'none',
              py: 1
            }}
          >
            Customers
          </Button>

          <Button
            startIcon={<AnalyticsIcon />}
            onClick={() => setCurrentView('analytics')}
            sx={{ 
              color: 'white',
              justifyContent: 'flex-start',
              textTransform: 'none',
              py: 1
            }}
          >
            Analytics
          </Button>

          <Button
            startIcon={<SettingsIcon />}
            onClick={() => setCurrentView('settings')}
            sx={{ 
              color: 'white',
              justifyContent: 'flex-start',
              textTransform: 'none',
              py: 1
            }}
          >
            Settings
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
} 