/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import makeStyles from '@mui/styles/makeStyles';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// @mui/icons-material
import Favorite from "@mui/icons-material/Favorite";
// core components
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import InputAdornment from "@mui/material/InputAdornment";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";
import InfoArea from "/components/InfoArea/InfoArea.js";

// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import landingPageStyle from "/styles/jss/nextjs-material-kit-pro/pages/landingPageStyle.js";

// Sections for this page
import SectionProduct from "/pages-sections/landing-page/SectionProduct.js";
import SectionTeam from "/pages-sections/landing-page/SectionTeam.js";
import SectionWork from "/pages-sections/landing-page/SectionWork.js";

const useStyles = makeStyles(landingPageStyle);

export default function LandingPage({ ...rest }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Header
        color="transparent"
        brand="Twin Cities Coverage"
        links={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 300,
          color: "info"
        }}
        {...rest}
      />
      <Parallax image="/tcc-images/landing-page-image.jpg" filter="dark">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={7} md={7}>
              <h1 className={classes.title}>Personalized Coverage. Smarter Savings.</h1>
              <h4>
                Protect what matters most while improving your coverage and paying less
              </h4>
            </GridItem>
            <GridItem xs={12} sm={5} md={5}>
              <Card className={classes.cardSignup}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4 className={classes.cardTitle}>Get Your Quotes</h4>
                </CardHeader>
                <CardBody>
                  <form className={classes.form}>
                    <CustomInput
                      id="firstName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "First Name",
                        type: "text",
                      }}
                    />
                    <CustomInput
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Home Address",
                        type: "text",
                      }}
                    />
                    <CustomInput
                      id="phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Phone Number",
                        type: "tel",
                      }}
                    />
                    <CustomInput
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Email Address",
                        type: "email",
                      }}
                    />
                  </form>
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button color="primary" size="lg" simple>
                    Get My Personalized Quotes
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {/* Why Choose Us Section */}
          <div className={classes.section}>
            <GridContainer justifyContent="center">
              <GridItem xs={12} sm={8} md={8}>
                <h2 className={classNames(classes.title, classes.textCenter)}>Why Choose Us</h2>
                <h5 className={classNames(classes.description, classes.textCenter)}>
                  Twin Cities Coverage helps you find the right insurance coverage at the right price.
                </h5>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <InfoArea
                  title="Save Time"
                  description="One form. Multiple quotes. No need to shop around to different companies yourself."
                  icon={AccessTimeIcon}
                  iconColor="info"
                  vertical
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <InfoArea
                  title="Personalized Coverage"
                  description="We help you find the right coverage for your specific needs - not just the cheapest option."
                  icon={SecurityIcon}
                  iconColor="success"
                  vertical
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <InfoArea
                  title="Trusted Carriers"
                  description="We work with reputable national insurance companies known for reliable coverage and claims service."
                  icon={VerifiedUserIcon}
                  iconColor="danger"
                  vertical
                />
              </GridItem>
            </GridContainer>
          </div>
          
          {/* Carrier Logos Section */}
          <div className={classes.section}>
            <GridContainer justifyContent="center">
              <GridItem xs={12} sm={8} md={8}>
                <h2 className={classNames(classes.title, classes.textCenter)}>
                  Our Carrier Partners
                </h2>
                <h5 className={classNames(classes.description, classes.textCenter)}>
                  Proudly Partnered With Trusted Carriers
                </h5>
              </GridItem>
            </GridContainer>
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
                  src="/carrier-logos/Carrier-American-Collectors-1.webp"
                  alt="American Collectors Insurance"
                  className={classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/Carrier-Auto-Owners-Insurance-1.webp"
                  alt="Auto-Owners Insurance"
                  className={classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/Carrier-Dairyland-1.webp"
                  alt="Dairyland Insurance"
                  className={classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/Carrier-Foremost-3.png"
                  alt="Foremost Insurance"
                  className={classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/Carrier-National-General-1.png"
                  alt="National General Insurance"
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
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/Carrier-Progressive-5.webp"
                  alt="Progressive Insurance"
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
                  src="/carrier-logos/Carrier-Travelers-2.webp"
                  alt="Travelers Insurance"
                  className={classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/Carrier-West-Bend-1.webp"
                  alt="West Bend Insurance"
                  className={classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3}>
                <img
                  src="/carrier-logos/hartford.jpeg"
                  alt="Hartford Insurance"
                  className={classes.imgFluid}
                />
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
