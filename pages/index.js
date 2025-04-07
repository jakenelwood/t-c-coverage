import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Box,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Fade,
  useTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import Layout from '../components/Layout';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundImage: "url('/tcc-images/landing-page-image.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  color: "white",
  [theme.breakpoints.up('md')]: {
    textAlign: "left",
    paddingRight: theme.spacing(4),
  },
  [theme.breakpoints.down('md')]: {
    textAlign: "center",
  },
}));

const HeroCTABox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const MiniForm = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up('md')]: {
    maxWidth: "500px",
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  fontSize: "1.2rem",
  marginTop: theme.spacing(3),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: theme.spacing(3),
}));

const CarrierGrid = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
}));

const CarrierLogo = styled('img')(({ theme }) => ({
  maxWidth: "100%",
  height: "auto",
  margin: theme.spacing(2),
}));

export default function LandingPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
    setFormDialogOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormDialogOpen = () => {
    setFormDialogOpen(true);
  };

  const handleFormDialogClose = () => {
    setFormDialogOpen(false);
  };

  // Carrier logo mapping - updated with actual file names and extensions
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

  // Quote form component to be reused
  const QuoteForm = ({ onSubmit }) => (
    <MiniForm component="form" onSubmit={onSubmit}>
      <Typography variant="h6" align="center" gutterBottom color="primary">
        Get Your Personalized Quote
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Home Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Get My Personalized Quotes
          </Button>
        </Grid>
      </Grid>
    </MiniForm>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12} md={6}>
              <HeroContent>
                <Typography variant="h2" component="h1" gutterBottom>
                  Personalized Coverage. Smarter Savings.
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Protect what matters most while improving your coverage and paying less
                </Typography>
                
                {!isMobile && (
                  <CTAButton 
                    variant="contained" 
                    color="primary"
                    onClick={handleFormDialogOpen}
                  >
                    Get Your Free Quote Now
                  </CTAButton>
                )}
              </HeroContent>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <HeroCTABox>
                {isMobile && <QuoteForm onSubmit={handleSubmit} />}
              </HeroCTABox>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Quote Form Dialog (for desktop) */}
      <Dialog
        open={formDialogOpen}
        onClose={handleFormDialogClose}
        TransitionComponent={Fade}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Request Your Free Quote
          <IconButton
            aria-label="close"
            onClick={handleFormDialogClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <QuoteForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>

      {/* Why Choose Us Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Save Time
                </Typography>
                <Typography>
                  Get multiple quotes from trusted carriers in minutes, not hours.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Personalized Coverage
                </Typography>
                <Typography>
                  Customized insurance solutions tailored to your specific needs.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Trusted Carriers
                </Typography>
                <Typography>
                  Access to top-rated insurance providers in the industry.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>

        {/* Carrier Logos Section */}
        <CarrierGrid>
          <Typography variant="h6" align="center" gutterBottom>
            Proudly Partnered With Trusted Carriers
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {Object.keys(carrierLogos).map((carrier) => (
              <Grid item xs={6} sm={4} md={2} key={carrier}>
                <CarrierLogo
                  src={`/carrier-logos/${carrierLogos[carrier]}`}
                  alt={carrier}
                />
              </Grid>
            ))}
          </Grid>
        </CarrierGrid>
      </Container>
    </Layout>
  );
}
