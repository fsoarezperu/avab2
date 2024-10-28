'use client';

import { useSession, signOut } from "next-auth/react";
import { Container, Box, Typography, Grid, Paper, Stack, Button, AppBar, Toolbar, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar Superior */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: 'text.primary'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="subtitle2">
              {session?.user?.name}
            </Typography>
            <Avatar 
              src={session?.user?.image || ''} 
              alt={session?.user?.name || ''}
              sx={{ width: 32, height: 32 }}
            />
            <Button
              onClick={() => signOut({ callbackUrl: '/' })}
              startIcon={<LogoutIcon />}
              variant="outlined"
              size="small"
              sx={{
                textTransform: 'none',
                borderColor: 'text.primary',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              Sign Out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar - Ajusta el margen superior para el nuevo navbar */}
      <Box
        sx={{
          width: 240,
          flexShrink: 0,
          bgcolor: 'grey.900',
          height: '100vh',
          color: 'white',
          p: 2,
          pt: 8 // Añade padding top para el navbar
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Store Dashboard
          </Typography>
          
          <Stack spacing={1}>
            <Button
              startIcon={<DashboardIcon />}
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

      {/* Main content - Ajusta el margen superior para el nuevo navbar */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 3,
        pt: 10 // Añade padding top para el navbar
      }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 4 }}>
            Welcome back, {session?.user?.name}
          </Typography>

          <Grid container spacing={3}>
            {/* Stats cards */}
            {[
              { title: 'Total Orders', value: '156', color: '#1976d2' },
              { title: 'Total Sales', value: 'S/. 15,690', color: '#2e7d32' },
              { title: 'Active Customers', value: '89', color: '#ed6c02' },
              { title: 'Products', value: '234', color: '#9c27b0' }
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderTop: 3,
                    borderColor: stat.color
                  }}
                >
                  <Typography variant="h4" sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography color="text.secondary">
                    {stat.title}
                  </Typography>
                </Paper>
              </Grid>
            ))}

            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Recent Orders
                </Typography>
                {/* Aquí puedes agregar una tabla de órdenes recientes */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
} 