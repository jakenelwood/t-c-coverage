/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// @mui/icons-material
import Favorite from "@mui/icons-material/Favorite";
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Parallax from "/components/Parallax/Parallax.js";
import Footer from "/components/Footer/Footer.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";
import InfoArea from "/components/InfoArea/InfoArea.js";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";

// Icons
import CompareIcon from "@mui/icons-material/Compare";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PersonalizeIcon from "@mui/icons-material/Tune";

import aboutUsStyle from "/styles/jss/nextjs-material-kit-pro/pages/aboutUsStyle.js";

const useStyles = makeStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage: "url('/tcc-images/about-hero.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "50vh",
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
  aboutSection: {
    padding: theme.spacing(8, 0),
  },
  benefitCard: {
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
  ctaSection: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: theme.spacing(6, 0),
    marginTop: theme.spacing(6),
  },
}));

export default function AboutUs() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div>
      <Header
        brand="Twin Cities Coverage"
        links={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 300,
          color: "info",
        }}
      />
      <Parallax image="/tcc-images/about-us-image.jpg" filter="dark" small>
        <div className={classes.container}>
          <GridContainer justifyContent="center">
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <h1 className={classes.title}>About Twin Cities Coverage</h1>
              <h4>
                Helping Minnesota families protect what matters most.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {/* Hero Section */}
          <div className={classes.hero}>
            <Container>
              <div className={classes.heroContent}>
                <Typography variant="h2" component="h1" gutterBottom>
                  About Twin Cities Coverage
                </Typography>
                <Typography variant="h5">
                  Helping Minnesota families protect what matters most.
                </Typography>
              </div>
            </Container>
          </div>

          {/* About Section */}
          <div className={classes.aboutSection}>
            <Typography variant="body1" paragraph>
              Insurance should protect what matters most in life — at the right price.
            </Typography>
            <Typography variant="body1" paragraph>
              At Twin Cities Coverage, we help Minnesota families quickly and easily compare
              personalized insurance options from trusted national carriers. With access to
              companies like Progressive, Travelers, Safeco, Nationwide, and more, we make
              sure you're choosing from some of the best in the industry — all without the
              hassle of shopping around yourself.
            </Typography>
            <Typography variant="body1" paragraph>
              Our simple process puts you in control. One form. Multiple quotes. Real savings.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you're protecting your car, your home, or your future, we're here to
              make insurance simpler, smarter, and built around your life.
            </Typography>
          </div>

          {/* Benefits Cards */}
          <div className={classes.section}>
            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <InfoArea
                  title="Compare Real Quotes"
                  description="Access multiple insurance quotes with a single form - saving you time and ensuring you get the best value for your coverage needs."
                  icon={CompareIcon}
                  iconColor="info"
                  vertical
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <InfoArea
                  title="Trusted National Carriers"
                  description="We partner with top-rated national insurance companies known for their reliability, financial strength, and quality claims service."
                  icon={VerifiedUserIcon}
                  iconColor="success"
                  vertical
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <InfoArea
                  title="Personalized Coverage Recommendations"
                  description="Get expert guidance to ensure your protection matches your unique needs - not just the minimum coverage."
                  icon={PersonalizeIcon}
                  iconColor="danger"
                  vertical
                />
              </GridItem>
            </GridContainer>
          </div>

          {/* Carrier Logos Section */}
          <div className={classes.carrierGrid}>
            <Typography variant="h6" align="center" gutterBottom>
              Our Trusted Partners
            </Typography>
            <GridContainer justifyContent="center">
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/Carrier-AAA.webp"
                  alt="AAA Insurance"
                  className={classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/Carrier-Progressive-5.webp"
                  alt="Progressive Insurance"
                  className={classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/Carrier-Travelers-2.webp"
                  alt="Travelers Insurance"
                  className={classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/Carrier-Safeco-Insurance-2.webp"
                  alt="Safeco Insurance"
                  className={classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/Carrier-Nationwide-1.webp"
                  alt="Nationwide Insurance"
                  className={classes.imgFluid}
                />
              </GridItem>
            </GridContainer>
          </div>
          
          {/* Call to Action Section */}
          <div className={classes.ctaSection}>
            <Container>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h4" gutterBottom>
                    Ready to Compare Quotes?
                  </Typography>
                  <Typography variant="body1">
                    Get started with your personalized insurance quotes today.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={() => router.push("/")}
                  >
                    Get My Quotes
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>
          
          {/* SEO Footer Text */}
          <div className={classes.section}>
            <GridContainer justifyContent="center">
              <GridItem xs={12} className={classes.textCenter}>
                <p className={classes.smallText}>
                  Twin Cities Coverage helps Minnesota residents compare insurance options for auto, home, renters, and umbrella policies.
                </p>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a href="/" className={classes.block}>
                    Home
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="/about-us" className={classes.block}>
                    About
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="/privacy-policy" className={classes.block}>
                    Privacy Policy
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="/login" className={classes.block}>
                    Agent Login
                  </a>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              &copy; {1900 + new Date().getYear()} Twin Cities Coverage
            </div>
          </div>
        }
      />
    </div>
  );
}
