import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";

const PersonalInfoStep = () => {
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext();

  return (
    <Grid container spacing={3}>
      {/* Primary Insured Information */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Primary Insured Information
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Full Name"
          name="primaryInsured.name"
          value={values.primaryInsured.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.primaryInsured?.name && Boolean(errors.primaryInsured?.name)}
          helperText={touched.primaryInsured?.name && errors.primaryInsured?.name}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email"
          name="primaryInsured.email"
          type="email"
          value={values.primaryInsured.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.primaryInsured?.email && Boolean(errors.primaryInsured?.email)}
          helperText={touched.primaryInsured?.email && errors.primaryInsured?.email}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Phone Number"
          name="primaryInsured.phone"
          value={values.primaryInsured.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.primaryInsured?.phone && Boolean(errors.primaryInsured?.phone)}
          helperText={touched.primaryInsured?.phone && errors.primaryInsured?.phone}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Date of Birth"
          name="primaryInsured.dob"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={values.primaryInsured.dob}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.primaryInsured?.dob && Boolean(errors.primaryInsured?.dob)}
          helperText={touched.primaryInsured?.dob && errors.primaryInsured?.dob}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          name="primaryInsured.address"
          value={values.primaryInsured.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.primaryInsured?.address && Boolean(errors.primaryInsured?.address)}
          helperText={touched.primaryInsured?.address && errors.primaryInsured?.address}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Mailing Address (if different)"
          name="primaryInsured.mailingAddress"
          value={values.primaryInsured.mailingAddress}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Social Security Number"
          name="primaryInsured.ssn"
          value={values.primaryInsured.ssn}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.primaryInsured?.ssn && Boolean(errors.primaryInsured?.ssn)}
          helperText={touched.primaryInsured?.ssn && errors.primaryInsured?.ssn}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Marital Status</InputLabel>
          <Select
            name="primaryInsured.maritalStatus"
            value={values.primaryInsured.maritalStatus}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.primaryInsured?.maritalStatus && Boolean(errors.primaryInsured?.maritalStatus)}
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="married">Married</MenuItem>
            <MenuItem value="divorced">Divorced</MenuItem>
            <MenuItem value="widowed">Widowed</MenuItem>
          </Select>
          {touched.primaryInsured?.maritalStatus && errors.primaryInsured?.maritalStatus && (
            <FormHelperText error>{errors.primaryInsured.maritalStatus}</FormHelperText>
          )}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Occupation"
          name="primaryInsured.occupation"
          value={values.primaryInsured.occupation}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.primaryInsured?.occupation && Boolean(errors.primaryInsured?.occupation)}
          helperText={touched.primaryInsured?.occupation && errors.primaryInsured?.occupation}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Prior Address (if less than 3 years at current address)"
          name="primaryInsured.priorAddress"
          value={values.primaryInsured.priorAddress}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
    </Grid>
  );
};

export default PersonalInfoStep; 