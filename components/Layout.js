import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Container, 
  Box, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText,
  ListItemButton,
  Divider,
  useMediaQuery
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: theme.spacing(0, 1),
}));

const LogoButton = styled(Button)(({ theme }) => ({
  color: 'white',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
  }
}));

export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    router.push(path);
    setDrawerOpen(false);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Privacy Policy', path: '/privacy' },
    { text: 'Agent Login', path: '/login', isButton: true }
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Container maxWidth="lg" sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: isMobile ? '0 8px' : '0 16px'
          }}>
            <Link href="/" passHref>
              <LogoButton color="inherit">
                Twin Cities Coverage
              </LogoButton>
            </Link>
            
            {isMobile ? (
              <IconButton 
                edge="end" 
                color="inherit" 
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {menuItems.map((item, index) => (
                  <Link key={index} href={item.path} passHref>
                    <NavButton 
                      color="inherit" 
                      variant={item.isButton ? "outlined" : "text"}
                      sx={{
                        ...(router.pathname === item.path && {
                          borderBottom: '2px solid white',
                          borderRadius: 0,
                        })
                      }}
                    >
                      {item.text}
                    </NavButton>
                  </Link>
                ))}
              </Box>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': { 
            width: '70%', 
            maxWidth: '300px',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                sx={{
                  py: 2,
                  ...(router.pathname === item.path && {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                  })
                }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      {/* Add toolbar spacing to prevent content from hiding under AppBar */}
      <Toolbar />
      <main>{children}</main>
      <footer>
        <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
          © {new Date().getFullYear()} Twin Cities Coverage. All rights reserved.
        </Container>
      </footer>
    </>
  );
} 