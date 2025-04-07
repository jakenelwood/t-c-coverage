/*eslint-disable*/
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Avatar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Layout from '../components/Layout';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to redirect to home page with form dialog open
  const handleQuoteClick = () => {
    router.push('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Mock login - in real implementation, this would be an API call
      if (formData.email && formData.password) {
        // Placeholder for API call
        console.log('Login attempt:', formData.email);
        
        // For demo purposes
        setLoading(false);
        setError('Login functionality will be connected to API endpoint');
      } else {
        setLoading(false);
        setError('Please enter both email and password');
      }
    } catch (err) {
      setLoading(false);
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <Layout onQuoteClick={handleQuoteClick}>
      <Container maxWidth="xs" sx={{ my: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            
            <Typography component="h1" variant="h5" gutterBottom>
              Agent Login
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              
              <Typography variant="body2" color="text.secondary" align="center">
                This portal is for authorized agents only.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}
