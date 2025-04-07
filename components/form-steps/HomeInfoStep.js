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

const HomeInfoStep = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Home Insurance Information
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

      {/* Property Information */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Property Information
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Coverage Type</InputLabel>
          <Select
            name="coverageType"
            value={values.coverageType || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="owner">Owner Occupied</MenuItem>
            <MenuItem value="renter">Renter</MenuItem>
            <MenuItem value="condo">Condo</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Usage</InputLabel>
          <Select
            name="usage"
            value={values.usage || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="primary">Primary Residence</MenuItem>
            <MenuItem value="secondary">Secondary Residence</MenuItem>
            <MenuItem value="rental">Rental Property</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Year Built"
          name="yearBuilt"
          type="number"
          value={values.yearBuilt}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Square Footage"
          name="squareFootage"
          type="number"
          value={values.squareFootage}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Construction Type</InputLabel>
          <Select
            name="constructionType"
            value={values.constructionType || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="frame">Frame</MenuItem>
            <MenuItem value="masonry">Masonry</MenuItem>
            <MenuItem value="fire-resistive">Fire Resistive</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Roof Type</InputLabel>
          <Select
            name="roofType"
            value={values.roofType || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="asphalt">Asphalt Shingle</MenuItem>
            <MenuItem value="metal">Metal</MenuItem>
            <MenuItem value="tile">Tile</MenuItem>
            <MenuItem value="wood">Wood Shake</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Additional Features */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Additional Features
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Number of Bathrooms"
          name="bathrooms"
          type="number"
          value={values.bathrooms}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Number of Bedrooms"
          name="bedrooms"
          type="number"
          value={values.bedrooms}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="hasFireplace"
              checked={values.hasFireplace || false}
              onChange={handleChange}
            />
          }
          label="Fireplace"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="hasGarage"
              checked={values.hasGarage || false}
              onChange={handleChange}
            />
          }
          label="Garage"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="hasPool"
              checked={values.hasPool || false}
              onChange={handleChange}
            />
          }
          label="Swimming Pool"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="hasAlarm"
              checked={values.hasAlarm || false}
              onChange={handleChange}
            />
          }
          label="Security System"
        />
      </Grid>

      {/* Coverage Options */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Coverage Options
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Dwelling Coverage"
          name="dwellingCoverage"
          type="number"
          value={values.dwellingCoverage}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Personal Property Coverage"
          name="personalPropertyCoverage"
          type="number"
          value={values.personalPropertyCoverage}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Liability Coverage"
          name="liabilityCoverage"
          type="number"
          value={values.liabilityCoverage}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Medical Payments"
          name="medicalPayments"
          type="number"
          value={values.medicalPayments}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="hasFloodInsurance"
              checked={values.hasFloodInsurance || false}
              onChange={handleChange}
            />
          }
          label="Flood Insurance"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="hasEarthquakeInsurance"
              checked={values.hasEarthquakeInsurance || false}
              onChange={handleChange}
            />
          }
          label="Earthquake Insurance"
        />
      </Grid>
    </Grid>
  );
};

export default HomeInfoStep; 