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
import { Container, Typography, Box } from "@mui/material";
import Button from "/components/CustomButtons/Button.js";

import privacyPolicyStyle from "/styles/jss/nextjs-material-kit-pro/pages/aboutUsStyle.js";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8, 0),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
  },
}));

export default function PrivacyPolicy() {
  const classes = useStyles();

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
      <Parallax image="/img/bg9.jpg" filter="dark" small>
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
              <h1 className={classes.title}>Privacy Policy</h1>
              <h4>Your privacy is important to us.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justifyContent="center">
            <GridItem md={10} sm={10}>
              <div className={classes.privacy}>
                <Container className={classes.root}>
                  <Typography variant="h2" component="h1" align="center" className={classes.title}>
                    Privacy Policy
                  </Typography>
                  <Typography variant="h5" align="center" gutterBottom>
                    Your privacy is important to us.
                  </Typography>

                  <Box className={classes.section}>
                    <Typography variant="h4" className={classes.sectionTitle}>
                      1. Introduction
                    </Typography>
                    <Typography variant="body1" paragraph>
                      At Twin Cities Coverage, we are committed to protecting your privacy and
                      ensuring the security of your personal information. This Privacy Policy
                      explains how we collect, use, and safeguard your information when you use
                      our services.
                    </Typography>
                  </Box>

                  <Box className={classes.section}>
                    <Typography variant="h4" className={classes.sectionTitle}>
                      2. Information We Collect
                    </Typography>
                    <Typography variant="body1" paragraph>
                      We collect information that you provide directly to us, including:
                    </Typography>
                    <Typography variant="body1" component="ul">
                      <li>Personal identification information (name, address, phone number, email)</li>
                      <li>Insurance-related information (vehicles, properties, coverage needs)</li>
                      <li>Financial information (payment details, credit history)</li>
                      <li>Communication preferences</li>
                    </Typography>
                  </Box>

                  <Box className={classes.section}>
                    <Typography variant="h4" className={classes.sectionTitle}>
                      3. How We Use Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                      We use the information we collect to:
                    </Typography>
                    <Typography variant="body1" component="ul">
                      <li>Provide and improve our insurance services</li>
                      <li>Process your insurance applications and quotes</li>
                      <li>Communicate with you about your insurance needs</li>
                      <li>Send you important updates and information</li>
                      <li>Comply with legal obligations</li>
                    </Typography>
                  </Box>

                  <Box className={classes.section}>
                    <Typography variant="h4" className={classes.sectionTitle}>
                      4. Data Protection
                    </Typography>
                    <Typography variant="body1" paragraph>
                      We implement appropriate security measures to protect your personal
                      information from unauthorized access, alteration, disclosure, or
                      destruction. These measures include encryption, secure servers, and
                      regular security assessments.
                    </Typography>
                  </Box>

                  <Box className={classes.section}>
                    <Typography variant="h4" className={classes.sectionTitle}>
                      5. Information Sharing
                    </Typography>
                    <Typography variant="body1" paragraph>
                      We may share your information with:
                    </Typography>
                    <Typography variant="body1" component="ul">
                      <li>Insurance carriers and underwriters</li>
                      <li>Service providers who assist in our operations</li>
                      <li>Legal authorities when required by law</li>
                      <li>Third parties with your explicit consent</li>
                    </Typography>
                  </Box>

                  <Box className={classes.section}>
                    <Typography variant="h4" className={classes.sectionTitle}>
                      6. SMS/Text Messaging Consent
                    </Typography>
                    <Typography variant="body1" paragraph>
                      By providing your phone number and submitting your information through our
                      website, you consent to receive informational and marketing text messages
                      (SMS) from Twin Cities Coverage. Message and data rates may apply.
                      Message frequency may vary. You may opt out of receiving text messages at
                      any time by replying "STOP" to any message or contacting us at
                      brian@twincitiescoverage.com.
                    </Typography>
                  </Box>

                  <Box className={classes.section}>
                    <Typography variant="h4" className={classes.sectionTitle}>
                      7. Your Rights
                    </Typography>
                    <Typography variant="body1" paragraph>
                      You have the right to:
                    </Typography>
                    <Typography variant="body1" component="ul">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate information</li>
                      <li>Request deletion of your information</li>
                      <li>Opt-out of marketing communications</li>
                      <li>File a complaint with regulatory authorities</li>
                    </Typography>
                  </Box>

                  <Box className={classes.section}>
                    <Typography variant="h4" className={classes.sectionTitle}>
                      8. Contact Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                      If you have any questions about this Privacy Policy or our privacy
                      practices, please contact us at:
                    </Typography>
                    <Typography variant="body1">
                      Email: brian@twincitiescoverage.com
                      <br />
                      Phone: [Your Phone Number]
                      <br />
                      Address: [Your Business Address]
                    </Typography>
                  </Box>
                </Container>
              </div>
            </GridItem>
          </GridContainer>
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