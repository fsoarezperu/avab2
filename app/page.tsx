'use client';

import { Container, Box, Typography, Stack, Paper, AppBar, Toolbar, Button, IconButton, Grid } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="sticky" sx={{ 
        backgroundColor: 'white', 
        boxShadow: 0,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0, sm: 0 } }}>
            {/* Logo */}
            <Box sx={{ width: 100, height: 40, position: 'relative' }}>
              <Image
                src="/new_logox2.png"
                alt="Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>

            {/* Navigation Links */}
            <Stack 
              direction="row" 
              spacing={4}
              sx={{ 
                display: { xs: 'none', md: 'flex' }
              }}
            >
              <Button sx={{ color: 'text.primary', textTransform: 'none' }}>Inicio</Button>
              <Button sx={{ color: 'text.primary', textTransform: 'none' }}>Productos</Button>
              <Button sx={{ color: 'text.primary', textTransform: 'none' }}>Contacto</Button>
            </Stack>

            {/* Cart and Login */}
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton color="inherit" sx={{ color: 'text.primary' }}>
                <ShoppingCartIcon />
              </IconButton>
              
              {session ? (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2 
                }}>
                  {/* Nombre del usuario */}
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      display: { xs: 'none', sm: 'block' },
                      color: 'text.primary'
                    }}
                  >
                    {session.user?.name}
                  </Typography>

                  {/* Imagen del usuario */}
                  <Box
                    component="img"
                    src={session.user?.image || '/default-avatar.png'}
                    alt="Profile"
                    sx={{
                      width: 35,
                      height: 35,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid',
                      borderColor: 'primary.main'
                    }}
                  />

                  <Button
                    onClick={() => signIn('google')}
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: 'none',
                    }}
                  >
                    Ir al Dashboard
                  </Button>

                  {/* Botón de cerrar sesión */}
                  <Button
                    onClick={() => signOut()}
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
                    Cerrar Sesión
                  </Button>
                </Box>
              ) : (
                <Button
                  onClick={() => signIn('google', {
                    callbackUrl: '/dashboard',
                    redirect: true,
                  })}
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: 'none',
                  }}
                >
                  Iniciar Sesión
                </Button>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container 
        component="main" 
        maxWidth="xl" 
        sx={{ 
          flex: 1,
          py: 8,
          px: { xs: 2, sm: 4 }
        }}
      >
        {/* Featured Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
            Featured Products
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  <Box sx={{ 
                    position: 'relative', 
                    paddingTop: '100%',
                    backgroundColor: 'grey.100'
                  }}>
                    <Image
                      src={`/product${item}.jpg`}
                      alt={`Product ${item}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                      Product {item}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center'
                    }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'primary.main'
                        }}
                      >
                        S/. {(199.99 + item * 50).toFixed(2)}
                      </Typography>
                      <IconButton 
                        color="primary"
                        sx={{ 
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white'
                          }
                        }}
                      >
                        <AddShoppingCartIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* New Arrivals Section */}
        <Box>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
            New Arrivals
          </Typography>
          <Grid container spacing={4}>
            {[5, 6, 7, 8].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  <Box sx={{ 
                    position: 'relative', 
                    paddingTop: '100%',
                    backgroundColor: 'grey.100'
                  }}>
                    <Image
                      src={`/product${item}.jpg`}
                      alt={`Product ${item}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                      Product {item}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center'
                    }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'primary.main'
                        }}
                      >
                        S/. {(199.99 + item * 50).toFixed(2)}
                      </Typography>
                      <IconButton 
                        color="primary"
                        sx={{ 
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white'
                          }
                        }}
                      >
                        <AddShoppingCartIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'grey.50',
          py: 6,
          mt: 'auto'
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                About Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                EC-HOME AUTOMATION PERU SAC specializes in home automation solutions.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Button sx={{ color: 'text.secondary', justifyContent: 'flex-start', textTransform: 'none' }}>
                  Privacy Policy
                </Button>
                <Button sx={{ color: 'text.secondary', justifyContent: 'flex-start', textTransform: 'none' }}>
                  Terms & Conditions
                </Button>
                <Button sx={{ color: 'text.secondary', justifyContent: 'flex-start', textTransform: 'none' }}>
                  Contact Us
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton sx={{ color: 'text.secondary' }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: 'text.secondary' }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton sx={{ color: 'text.secondary' }}>
                  <XIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center" 
            sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}
          >
            © 2024 EC-HOME AUTOMATION PERU SAC. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
