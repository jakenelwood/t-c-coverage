import React from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: theme.spacing(0, 1),
}));

export default function Layout({ children }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" passHref>
              <NavButton color="inherit">
                Twin Cities Coverage
              </NavButton>
            </Link>
            <Box>
              <Link href="/" passHref>
                <NavButton color="inherit">Home</NavButton>
              </Link>
              <Link href="/about" passHref>
                <NavButton color="inherit">About</NavButton>
              </Link>
              <Link href="/privacy" passHref>
                <NavButton color="inherit">Privacy Policy</NavButton>
              </Link>
              <Link href="/login" passHref>
                <NavButton color="inherit" variant="outlined">Agent Login</NavButton>
              </Link>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
      <footer>
        <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
          © {new Date().getFullYear()} Twin Cities Coverage. All rights reserved.
        </Container>
      </footer>
    </>
  );
} 