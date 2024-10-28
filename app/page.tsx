'use client';  // Add this at the top of the file

import { Container, Box, Typography, Stack, Paper, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRef } from 'react';

export default function Home() {
  const sliderRef = useRef<Slider>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateRows: 'auto 1fr 20px',
          gap: 2,
          py: 4
        }}
      >
        <AppBar position="static" sx={{ gridRow: 1, backgroundColor: 'white', boxShadow: 0 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box sx={{ width: 140, height: 40, position: 'relative' }}>
              <Image
                src="/logo.png"
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
              <Button color="inherit" sx={{ color: 'black' }}>Inicio</Button>
              <Button color="inherit" sx={{ color: 'black' }}>Productos</Button>
              <Button color="inherit" sx={{ color: 'black' }}>Contacto</Button>
            </Stack>

            {/* Right Section */}
            <Stack direction="row" spacing={2}>
              <IconButton color="inherit" sx={{ color: 'black' }}>
                <ShoppingCartIcon />
              </IconButton>
              <Button 
                variant="contained" 
                sx={{ 
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  }
                }}
              >
                Login
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ gridRow: 2 }}>
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2,
              width: '100%',
              minHeight: 400
            }}
          >
            {/* Left Paper - Featured Product */}
            <Paper 
              elevation={3} 
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <Box sx={{ position: 'relative', flexGrow: 1, minHeight: 300 }}>
                <Image
                  src="/product1.jpg"
                  alt="Producto Principal"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Typography variant="h6">Producto Destacado</Typography>
              <Typography variant="body2">Descripción del producto destacado</Typography>
              <Typography variant="h6" color="primary">S/. 299.99</Typography>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                fullWidth
              >
                Añadir al Carrito
              </Button>
            </Paper>

            {/* Right Column */}
            <Stack spacing={2}>
              {/* Top Right Paper */}
              <Paper 
                elevation={3} 
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <Box sx={{ position: 'relative', height: 200 }}>
                  <Image
                    src="/product2.jpg"
                    alt="Producto 2"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <Typography variant="h6">Producto 2</Typography>
                <Typography variant="body2">Descripción breve del producto</Typography>
                <Typography variant="h6" color="primary">S/. {199.99 + 2 * 50}</Typography>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  fullWidth
                >
                  Añadir al Carrito
                </Button>
              </Paper>

              {/* Bottom Right Paper */}
              <Paper 
                elevation={3} 
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <Box sx={{ position: 'relative', height: 200 }}>
                  <Image
                    src="/product3.jpg"
                    alt="Producto 3"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <Typography variant="h6">Producto 3</Typography>
                <Typography variant="body2">Descripción breve del producto</Typography>
                <Typography variant="h6" color="primary">S/. {199.99 + 3 * 50}</Typography>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  fullWidth
                >
                  Añadir al Carrito
                </Button>
              </Paper>
            </Stack>

            {/* Modified Carousel Section */}
            <Box
              sx={{
                mt: 4,
                width: '100%',
                position: 'relative',
                minHeight: 300,
                overflow: 'hidden',
                gridColumn: '1 / -1', // Asegura que ocupe todo el ancho
              }}
            >
              <Typography variant="h5" gutterBottom>
                Productos Destacados
              </Typography>
              
              <Box sx={{ position: 'relative' }}>
                <Slider
                  ref={sliderRef}
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={3}
                  slidesToScroll={1}
                  autoplay={true}
                  autoplaySpeed={3000}
                  responsive={[
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 2,
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                      }
                    }
                  ]}
                >
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Box key={item} sx={{ px: 1 }}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2
                        }}
                      >
                        <Box sx={{ position: 'relative', height: 200 }}>
                          <Image
                            src={`/carousel${item}.jpg`}
                            alt={`Producto ${item}`}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
                        <Typography variant="h6">Producto {item}</Typography>
                        <Typography variant="body2">
                          Descripción breve del producto {item}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Slider>

                {/* Navigation Buttons */}
                <IconButton
                  onClick={previous}
                  sx={{
                    position: 'absolute',
                    left: { xs: -16, md: -32 },  // Added missing closing brace
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'grey.100' },
                    zIndex: 1,
                    boxShadow: 1
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>

                <IconButton
                  onClick={next}
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'grey.100' },
                    zIndex: 1,
                    boxShadow: 1
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box 
          component="footer" 
          sx={{ 
            gridRow: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="body2">
            Created by @ec-home automation peru sac.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
