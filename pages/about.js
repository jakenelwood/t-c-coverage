import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../components/Layout';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundImage: "url('/tcc-images/about-us-image.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '50vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(4, 0),
}));

const BenefitCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
}));

export default function AboutPage() {
  // Same carrier logo mapping as in index.js
  const carrierLogos = {
    "AAA": "Carrier-AAA.webp",
    "American Collectors": "Carrier-American-Collectors-1.webp",
    "Auto-Owners": "Carrier-Auto-Owners-Insurance-1.webp",
    "Dairyland": "Carrier-Dairyland-1.webp",
    "Foremost": "Carrier-Foremost-3.png",
    "National General": "Carrier-National-General-1.png",
    "Nationwide": "Carrier-Nationwide-1.webp",
    "Progressive": "Carrier-Progressive-5.webp",
    "Safeco": "Carrier-Safeco-Insurance-2.webp",
    "Travelers": "Carrier-Travelers-2.webp",
    "West Bend": "Carrier-West-Bend-1.webp",
    "Hartford": "hartford.jpeg"
  };

  return (
    <Layout>
      <HeroSection>
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            About Twin Cities Coverage
          </Typography>
          <Typography variant="h5">
            Helping Minnesota families protect what matters most.
          </Typography>
        </Box>
      </HeroSection>

      <Container maxWidth="lg">
        <ContentSection>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Our Mission
          </Typography>
          
          <Typography variant="body1" paragraph>
            Insurance should protect what matters most in life — at the right price.
          </Typography>
          
          <Typography variant="body1" paragraph>
            At Twin Cities Coverage, we help Minnesota families quickly and easily compare personalized insurance options from trusted national carriers.
            With access to companies like Progressive, Travelers, Safeco, Nationwide, and more, we make sure you're choosing from some of the best in the industry — all without the hassle of shopping around yourself.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Our simple process puts you in control.
            One form. Multiple quotes. Real savings.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Whether you're protecting your car, your home, or your future, we're here to make insurance simpler, smarter, and built around your life.
          </Typography>

          <Box my={6}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Why Choose Us
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <BenefitCard>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Compare Real Quotes
                    </Typography>
                    <Typography>
                      Get multiple quotes from top carriers all in one place, saving you time and effort.
                    </Typography>
                  </CardContent>
                </BenefitCard>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <BenefitCard>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Trusted National Carriers
                    </Typography>
                    <Typography>
                      Access to some of the most respected insurance providers in the industry.
                    </Typography>
                  </CardContent>
                </BenefitCard>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <BenefitCard>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Personalized Coverage Recommendations
                    </Typography>
                    <Typography>
                      Get tailored insurance options that fit your specific needs and budget.
                    </Typography>
                  </CardContent>
                </BenefitCard>
              </Grid>
            </Grid>
          </Box>

          <Box my={6}>
            <Typography variant="h5" component="h3" gutterBottom align="center">
              Our Carrier Partners
            </Typography>
            
            <Grid container spacing={2} justifyContent="center">
              {Object.keys(carrierLogos).map((carrier) => (
                <Grid item xs={6} sm={3} md={2} key={carrier}>
                  <img 
                    src={`/carrier-logos/${carrierLogos[carrier]}`}
                    alt={carrier}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box my={6} textAlign="center">
            <Typography variant="h5" gutterBottom>
              Ready to Compare Quotes?
            </Typography>
            <Box 
              component="a" 
              href="/"
              sx={{
                display: 'inline-block',
                bgcolor: 'primary.main',
                color: 'white',
                py: 1.5,
                px: 4,
                borderRadius: 1,
                textDecoration: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              Get My Quotes
            </Box>
          </Box>
          
          <Typography variant="caption" color="text.secondary" align="center" display="block">
            Twin Cities Coverage helps Minnesota residents compare insurance options for auto, home, renters, and umbrella policies.
          </Typography>
        </ContentSection>
      </Container>
    </Layout>
  );
} 