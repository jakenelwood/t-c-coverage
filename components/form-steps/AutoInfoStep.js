import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useFormikContext } from "formik";

const AutoInfoStep = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext();
  const [numVehicles, setNumVehicles] = useState(1);
  const [numDrivers, setNumDrivers] = useState(1);

  const addVehicle = () => {
    if (numVehicles < 8) {
      setNumVehicles(numVehicles + 1);
      setFieldValue(`vehicles[${numVehicles}]`, {
        year: "",
        make: "",
        model: "",
        vin: "",
        usage: "",
        miles: "",
        driver: "",
        comp: false,
        collision: false,
        glass: false,
        tow: false,
        rental: false,
        financed: false,
        gap: false,
      });
    }
  };

  const addDriver = () => {
    if (numDrivers < 8) {
      setNumDrivers(numDrivers + 1);
      setFieldValue(`drivers[${numDrivers}]`, {
        name: "",
        dob: "",
        licenseNumber: "",
        licenseState: "",
        accidents: 0,
        violations: 0,
      });
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Auto Insurance Information
        </Typography>
      </Grid>

      {/* Current Insurance Information */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Current Insurance Information
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Current Carrier"
          name="currentCarrier"
          value={values.currentCarrier}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Months with Current Carrier"
          name="monthsWithCarrier"
          type="number"
          value={values.monthsWithCarrier}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      {/* Vehicles */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Vehicles
        </Typography>
      </Grid>

      {Array.from({ length: numVehicles }).map((_, index) => (
        <React.Fragment key={index}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Vehicle {index + 1}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Year"
              name={`vehicles[${index}].year`}
              value={values.vehicles[index]?.year || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Make"
              name={`vehicles[${index}].make`}
              value={values.vehicles[index]?.make || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Model"
              name={`vehicles[${index}].model`}
              value={values.vehicles[index]?.model || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="VIN"
              name={`vehicles[${index}].vin`}
              value={values.vehicles[index]?.vin || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Primary Driver"
              name={`vehicles[${index}].driver`}
              value={values.vehicles[index]?.driver || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Annual Miles"
              name={`vehicles[${index}].miles`}
              type="number"
              value={values.vehicles[index]?.miles || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Usage</InputLabel>
              <Select
                name={`vehicles[${index}].usage`}
                value={values.vehicles[index]?.usage || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="pleasure">Pleasure</MenuItem>
                <MenuItem value="commute">Commute</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name={`vehicles[${index}].comp`}
                  checked={values.vehicles[index]?.comp || false}
                  onChange={handleChange}
                />
              }
              label="Comprehensive Coverage"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={`vehicles[${index}].collision`}
                  checked={values.vehicles[index]?.collision || false}
                  onChange={handleChange}
                />
              }
              label="Collision Coverage"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={`vehicles[${index}].glass`}
                  checked={values.vehicles[index]?.glass || false}
                  onChange={handleChange}
                />
              }
              label="Glass Coverage"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={`vehicles[${index}].tow`}
                  checked={values.vehicles[index]?.tow || false}
                  onChange={handleChange}
                />
              }
              label="Towing Coverage"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={`vehicles[${index}].rental`}
                  checked={values.vehicles[index]?.rental || false}
                  onChange={handleChange}
                />
              }
              label="Rental Car Reimbursement"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={`vehicles[${index}].financed`}
                  checked={values.vehicles[index]?.financed || false}
                  onChange={handleChange}
                />
              }
              label="Vehicle is Financed"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={`vehicles[${index}].gap`}
                  checked={values.vehicles[index]?.gap || false}
                  onChange={handleChange}
                />
              }
              label="GAP Insurance"
            />
          </Grid>
        </React.Fragment>
      ))}

      {numVehicles < 8 && (
        <Grid item xs={12}>
          <Button variant="outlined" onClick={addVehicle}>
            Add Another Vehicle
          </Button>
        </Grid>
      )}

      {/* Drivers */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Drivers
        </Typography>
      </Grid>

      {Array.from({ length: numDrivers }).map((_, index) => (
        <React.Fragment key={index}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Driver {index + 1}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name={`drivers[${index}].name`}
              value={values.drivers[index]?.name || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name={`drivers[${index}].dob`}
              type="date"
              InputLabelProps={{ shrink: true }}
              value={values.drivers[index]?.dob || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="License Number"
              name={`drivers[${index}].licenseNumber`}
              value={values.drivers[index]?.licenseNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="License State"
              name={`drivers[${index}].licenseState`}
              value={values.drivers[index]?.licenseState || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Accidents (Last 3 Years)"
              name={`drivers[${index}].accidents`}
              type="number"
              value={values.drivers[index]?.accidents || 0}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Violations (Last 3 Years)"
              name={`drivers[${index}].violations`}
              type="number"
              value={values.drivers[index]?.violations || 0}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
        </React.Fragment>
      ))}

      {numDrivers < 8 && (
        <Grid item xs={12}>
          <Button variant="outlined" onClick={addDriver}>
            Add Another Driver
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default AutoInfoStep; 