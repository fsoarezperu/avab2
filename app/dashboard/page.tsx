'use client';

import { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import {
  Container, Box, Typography, Grid, Paper, Stack, Button, AppBar, Toolbar, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Dashboard() {
  const { data: session } = useSession();
  const [currentView, setCurrentView] = useState('dashboard');
  const [customerData, setCustomerData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    notes: '',
    customerGroup: '',
    storeCredit: '',
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(customerData);
  };

  const renderMainContent = () => {
    switch(currentView) {
      case 'addCustomer':
        return (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Add a Customer
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Customer Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Customer Group</InputLabel>
                    <Select
                      value={customerData.customerGroup}
                      label="Customer Group"
                      onChange={(e) => setCustomerData({...customerData, customerGroup: e.target.value})}
                    >
                      <MenuItem value="retail">Retail</MenuItem>
                      <MenuItem value="wholesale">Wholesale</MenuItem>
                      <MenuItem value="vip">VIP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="First Name"
                    value={customerData.firstName}
                    onChange={(e) => setCustomerData({...customerData, firstName: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Last Name"
                    value={customerData.lastName}
                    onChange={(e) => setCustomerData({...customerData, lastName: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={customerData.company}
                    onChange={(e) => setCustomerData({...customerData, company: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Customer Notes"
                    value={customerData.notes}
                    onChange={(e) => setCustomerData({...customerData, notes: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Store Credit"
                    type="number"
                    value={customerData.storeCredit}
                    onChange={(e) => setCustomerData({...customerData, storeCredit: e.target.value})}
                    InputProps={{
                      startAdornment: <Typography>S/.</Typography>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={customerData.status}
                      label="Status"
                      onChange={(e) => setCustomerData({...customerData, status: e.target.value})}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() => setCurrentView('dashboard')}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Save Customer
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        );
      default:
        return (
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
          </Grid>
        );
    }
  };

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
              startIcon={<PeopleIcon />}
              onClick={() => setCurrentView('addCustomer')}
              sx={{ 
                color: 'white',
                justifyContent: 'flex-start',
                textTransform: 'none',
                py: 1
              }}
            >
              Add Customer
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
          {renderMainContent()}
        </Container>
      </Box>
    </Box>
  );
} 