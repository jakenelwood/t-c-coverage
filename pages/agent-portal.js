/*eslint-disable*/
import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Divider,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";

import styles from "/styles/jss/nextjs-material-kit-pro/pages/loginPageStyle.js";

const useStyles = makeStyles((theme) => ({
  ...styles,
  container: {
    ...styles.container,
    paddingTop: "100px",
    paddingBottom: "50px",
  },
  tabContent: {
    padding: "20px 0",
  },
  stepperContainer: {
    width: "100%",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  stepContent: {
    padding: "20px 0",
  },
  formField: {
    marginBottom: "20px",
  },
  root: {
    padding: theme.spacing(4),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  form: {
    width: "100%",
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

const steps = [
  "Personal Information",
  "Quote Types",
  "Auto Details",
  "Home Details",
  "Specialty Details",
  "Review & Generate",
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AgentPortal() {
  const classes = useStyles();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    pniname: "",
    pniaddr: "",
    pniemail: "",
    pniphone: "",
    pnidob: "",
    pnissn: "",
    pnims: "",
    pniedocc: "",
    "pni-prioraddr": "",

    // Quote Types
    quote_types: [],

    // Auto Details
    "a-current-carrier": "",
    "a-mos-current-carrier": "",
    "a-climits": "",
    "a-qlimits": "",
    "a-exp-dt": "",
    aprem: "",
    vehicles: [],

    // Home Details
    "h-current-insurance-carrier": "",
    "hmos-with-current-carrier": "",
    "h-expiration-date": "",
    husage: "",
    hfrmtyp: "",
    hnofm: "",
    hyr_built: "",
    hstorystyle: "",
    hgarage: "",
    hsqft: "",
    hbasementpct: "",
    hwalkout: "",
    hfullbath: "",
    hthreeqtrbath: "",
    hhalfbath: "",
    hsidingtype: "",
    hfireplc: "",
    hwoodstove: "",
    hattstruc: "",
    hdetstruc: "",
    hsprinkled: "",
    "hmi-from-fd": "",
    hrfd: "",
    hhydrantdist: "",
    hroofyrrep: "",
    hrooftype: "",
    hdecktype: "",
    hdecksize: "",
    hporchtype: "",
    hporchsize: "",
    hpool: "",
    pldpth: "",
    dvbrd: "",
    htramp: "",
    hfence: "",
    "hfence-height": "",
    hheatsysyr: "",
    hheatsystype: "",
    "h-electricalyr": "",
    helecamps: "",
    halarm: "",
    hplumbyr: "",
    hplumbmat: "",
    hsumppump: "",
    hsrvcln: "",
    hseptsewer: "",
    hfloodins: "",
    hreconcost: "",
    hperspropval: "",
    hscheditemtype: "",
    hscheditemval: "",
    hebiketype: "",
    hebikeval: "",
    hpets: "",
    hbiztype: "",
    "h-bitingpets": "",
    hdeductible: "",
    hwindhail: "",
    hmortgage: "",
    hprem: "",
    hbnkrptcy: "",
    humbraval: "",
    humbuninsur: "",
    hmrvt: "",

    // Specialty Details
    specialty_items: [],
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleQuoteTypeChange = (type) => (event) => {
    const newTypes = event.target.checked
      ? [...formData.quote_types, type]
      : formData.quote_types.filter((t) => t !== type);
    setFormData({ ...formData, quote_types: newTypes });
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request");
      }

      const data = await response.json();
      router.push(`/quotes/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="pniname"
                value={formData.pniname}
                onChange={handleInputChange("pniname")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="pniemail"
                type="email"
                value={formData.pniemail}
                onChange={handleInputChange("pniemail")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Address"
                name="pniaddr"
                value={formData.pniaddr}
                onChange={handleInputChange("pniaddr")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone"
                name="pniphone"
                value={formData.pniphone}
                onChange={handleInputChange("pniphone")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Date of Birth"
                name="pnidob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.pnidob}
                onChange={handleInputChange("pnidob")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="SSN"
                name="pnissn"
                value={formData.pnissn}
                onChange={handleInputChange("pnissn")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Marital Status"
                name="pnims"
                value={formData.pnims}
                onChange={handleInputChange("pnims")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Occupation"
                name="pniedocc"
                value={formData.pniedocc}
                onChange={handleInputChange("pniedocc")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Prior Address"
                name="pni-prioraddr"
                value={formData["pni-prioraddr"]}
                onChange={handleInputChange("pni-prioraddr")}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.quote_types.includes("auto")}
                  onChange={handleQuoteTypeChange("auto")}
                />
              }
              label="Auto Insurance"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.quote_types.includes("home")}
                  onChange={handleQuoteTypeChange("home")}
                />
              }
              label="Home Insurance"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.quote_types.includes("specialty")}
                  onChange={handleQuoteTypeChange("specialty")}
                />
              }
              label="Specialty Insurance"
            />
          </FormGroup>
        );

      case 2:
        return formData.quote_types.includes("auto") ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Carrier"
                name="a-current-carrier"
                value={formData["a-current-carrier"]}
                onChange={handleInputChange("a-current-carrier")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Months with Current Carrier"
                name="a-mos-current-carrier"
                value={formData["a-mos-current-carrier"]}
                onChange={handleInputChange("a-mos-current-carrier")}
              />
            </Grid>
            {/* Add more auto-specific fields */}
          </Grid>
        ) : (
          <Typography>Auto insurance not selected</Typography>
        );

      case 3:
        return formData.quote_types.includes("home") ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Carrier"
                name="h-current-insurance-carrier"
                value={formData["h-current-insurance-carrier"]}
                onChange={handleInputChange("h-current-insurance-carrier")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Months with Current Carrier"
                name="hmos-with-current-carrier"
                value={formData["hmos-with-current-carrier"]}
                onChange={handleInputChange("hmos-with-current-carrier")}
              />
            </Grid>
            {/* Add more home-specific fields */}
          </Grid>
        ) : (
          <Typography>Home insurance not selected</Typography>
        );

      case 4:
        return formData.quote_types.includes("specialty") ? (
          <Grid container spacing={3}>
            {/* Add specialty-specific fields */}
          </Grid>
        ) : (
          <Typography>Specialty insurance not selected</Typography>
        );

      case 5:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
              Review Your Quote Request
            </Typography>
            <Divider className={classes.divider} />
            {/* Add review content */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Header
        color="primary"
        brand="Twin Cities Coverage"
        links={<HeaderLinks />}
        fixed
      />
      <div className={classes.container}>
        <GridContainer justifyContent="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitle}>Quote Request Generator</h4>
                <p>Create insurance quote requests for your clients</p>
              </CardHeader>
              <CardBody>
                <Tabs 
                  value={activeStep} 
                  onChange={(event, newValue) => setActiveStep(newValue)} 
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  {steps.map((label) => (
                    <Tab key={label} label={label} />
                  ))}
                </Tabs>
                
                <TabPanel value={activeStep} index={0}>
                  <div className={classes.stepperContainer}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </div>
                  
                  <div className={classes.stepContent}>
                    {renderStepContent(activeStep)}
                  </div>
                  
                  <div className={classes.buttonContainer}>
                    <Button 
                      disabled={activeStep === 0} 
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button 
                      color="primary" 
                      onClick={handleNext}
                      disabled={activeStep === steps.length - 1}
                    >
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </div>
                </TabPanel>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <a href="/" className={classes.footerLink}>
                Home
              </a>
              <a href="/about-us" className={classes.footerLink}>
                About
              </a>
              <a href="/privacy-policy" className={classes.footerLink}>
                Privacy Policy
              </a>
              <a href="/login" className={classes.footerLink}>
                Agent Login
              </a>
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