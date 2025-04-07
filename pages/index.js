import React from "react";
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
} from "@mui/material";
import { useRouter } from "next/router";
import Layout from '../components/Layout';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundImage: "url('/tcc-images/landing-page-image.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
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
  textAlign: "center",
}));

const MiniForm = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(4),
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
  const [formData, setFormData] = React.useState({
    firstName: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <HeroContent>
            <Typography variant="h2" component="h1" gutterBottom>
              Personalized Coverage. Smarter Savings.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Protect what matters most while improving your coverage and paying less
            </Typography>

            {/* Mini Form */}
            <MiniForm component="form" onSubmit={handleSubmit}>
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
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Why Choose Us Section */}
      <Container>
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
              <Grid item xs={6} sm={4} md={3} key={carrier}>
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
