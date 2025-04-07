import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useFormikContext } from "formik";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";

const ReviewStep = ({ onSubmit, isSubmitting, submitError }) => {
  const { values } = useFormikContext();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const renderPersonalInfo = () => (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Name"
            secondary={values.fullName || "N/A"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Email"
            secondary={values.email || "N/A"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Phone"
            secondary={values.phone || "N/A"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Address"
            secondary={values.address || "N/A"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Date of Birth"
            secondary={formatDate(values.dateOfBirth)}
          />
        </ListItem>
      </List>
    </Paper>
  );

  const renderAutoInfo = () => {
    if (!values.quoteTypes?.includes("auto")) return null;

    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Auto Insurance Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Current Carrier"
              secondary={values.currentCarrier || "N/A"}
            />
          </ListItem>
          {values.vehicles?.map((vehicle, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={`Vehicle ${index + 1}`}
                  secondary={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="VIN"
                  secondary={vehicle.vin || "N/A"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Primary Driver"
                  secondary={vehicle.primaryDriver || "N/A"}
                />
              </ListItem>
              {index < values.vehicles.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    );
  };

  const renderHomeInfo = () => {
    if (!values.quoteTypes?.includes("home")) return null;

    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Home Insurance Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Property Type"
              secondary={values.coverageType || "N/A"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Year Built"
              secondary={values.yearBuilt || "N/A"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Square Footage"
              secondary={values.squareFootage || "N/A"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Construction Type"
              secondary={values.constructionType || "N/A"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Dwelling Coverage"
              secondary={formatCurrency(values.dwellingCoverage)}
            />
          </ListItem>
        </List>
      </Paper>
    );
  };

  const renderSpecialtyInfo = () => {
    if (!values.quoteTypes?.includes("specialty")) return null;

    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Specialty Insurance Information
        </Typography>
        <List>
          {values.specialtyItems?.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={`Item ${index + 1}`}
                  secondary={`${item.type}: ${item.year} ${item.make} ${item.model}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Value"
                  secondary={formatCurrency(item.value)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Storage Location"
                  secondary={item.storageLocation || "N/A"}
                />
              </ListItem>
              {index < values.specialtyItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    );
  };

  const renderUmbrellaInfo = () => {
    if (!values.quoteTypes?.includes("umbrella")) return null;

    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Umbrella Coverage
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Current Auto Liability"
              secondary={formatCurrency(values.currentAutoLiability)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Current Home Liability"
              secondary={formatCurrency(values.currentHomeLiability)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Desired Umbrella Limit"
              secondary={formatCurrency(values.desiredUmbrellaLimit)}
            />
          </ListItem>
        </List>
      </Paper>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Review Your Information
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please review all the information below before submitting your quote request.
        </Typography>
      </Grid>

      {renderPersonalInfo()}
      {renderAutoInfo()}
      {renderHomeInfo()}
      {renderSpecialtyInfo()}
      {renderUmbrellaInfo()}

      {submitError && (
        <Grid item xs={12}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        </Grid>
      )}

      <Grid item xs={12}>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => onSubmit("download")}
            disabled={isSubmitting}
          >
            Download Documents
          </Button>
          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            onClick={() => onSubmit("email")}
            disabled={isSubmitting}
          >
            Send for Quoting
          </Button>
        </Box>
      </Grid>

      {isSubmitting && (
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default ReviewStep; 