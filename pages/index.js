import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage: "url('/tcc-images/hero-bg.jpg')",
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
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    color: "white",
    textAlign: "center",
  },
  miniForm: {
    backgroundColor: "white",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(4),
  },
  featureCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(3),
  },
  carrierGrid: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  carrierLogo: {
    maxWidth: "100%",
    height: "auto",
    margin: theme.spacing(2),
  },
}));

export default function LandingPage() {
  const classes = useStyles();
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

  return (
    <>
      {/* Hero Section */}
      <div className={classes.hero}>
        <Container>
          <div className={classes.heroContent}>
            <Typography variant="h2" component="h1" gutterBottom>
              Personalized Coverage. Smarter Savings.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Protect what matters most while improving your coverage and paying less
            </Typography>

            {/* Mini Form */}
            <form onSubmit={handleSubmit} className={classes.miniForm}>
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
            </form>
          </div>
        </Container>
      </div>

      {/* Why Choose Us Section */}
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card className={classes.featureCard}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Save Time
                </Typography>
                <Typography>
                  Get multiple quotes from trusted carriers in minutes, not hours.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.featureCard}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Personalized Coverage
                </Typography>
                <Typography>
                  Customized insurance solutions tailored to your specific needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.featureCard}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Trusted Carriers
                </Typography>
                <Typography>
                  Access to top-rated insurance providers in the industry.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Carrier Logos Section */}
        <div className={classes.carrierGrid}>
          <Typography variant="h6" align="center" gutterBottom>
            Proudly Partnered With Trusted Carriers
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {[
              "AAA",
              "American Collectors",
              "Auto-Owners",
              "Dairyland",
              "Foremost",
              "National General",
              "Nationwide",
              "Progressive",
              "Safeco",
              "Travelers",
              "West Bend",
              "Hartford",
            ].map((carrier) => (
              <Grid item xs={6} sm={4} md={3} key={carrier}>
                <img
                  src={`/carrier-logos/${carrier.toLowerCase().replace(/\s+/g, "-")}.png`}
                  alt={carrier}
                  className={classes.carrierLogo}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
}
