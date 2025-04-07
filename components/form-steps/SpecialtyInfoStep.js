import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { useFormikContext } from "formik";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const SpecialtyInfoStep = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext();
  const [numSpecialtyItems, setNumSpecialtyItems] = useState(1);

  const addSpecialtyItem = () => {
    if (numSpecialtyItems < 8) {
      setNumSpecialtyItems(numSpecialtyItems + 1);
    }
  };

  const removeSpecialtyItem = (index) => {
    if (numSpecialtyItems > 1) {
      setNumSpecialtyItems(numSpecialtyItems - 1);
      // Clear the values for the removed item
      const itemPrefix = `specialty${index + 1}`;
      const fieldsToClear = [
        "type",
        "year",
        "make",
        "model",
        "vin",
        "value",
        "storageLocation",
        "usage",
        "primaryOperator",
        "comprehensiveDeductible",
        "collisionDeductible",
        "horsepower",
        "topSpeed",
        "ccSize",
      ];
      fieldsToClear.forEach((field) => {
        setFieldValue(`${itemPrefix}${field}`, "");
      });
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Umbrella Coverage Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Umbrella Coverage
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Current Auto Liability Limit"
          name="currentAutoLiability"
          value={values.currentAutoLiability}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Current Home Liability Limit"
          name="currentHomeLiability"
          value={values.currentHomeLiability}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Desired Umbrella Limit</InputLabel>
          <Select
            name="desiredUmbrellaLimit"
            value={values.desiredUmbrellaLimit || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="1000000">$1,000,000</MenuItem>
            <MenuItem value="2000000">$2,000,000</MenuItem>
            <MenuItem value="3000000">$3,000,000</MenuItem>
            <MenuItem value="5000000">$5,000,000</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 3 }} />
      </Grid>

      {/* Specialty Items Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Specialty Items
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Add up to 8 specialty items (boats, motorcycles, ATVs, etc.)
        </Typography>
      </Grid>

      {Array.from({ length: numSpecialtyItems }).map((_, index) => (
        <React.Fragment key={index}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Item {index + 1}
              {index > 0 && (
                <IconButton
                  size="small"
                  onClick={() => removeSpecialtyItem(index)}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name={`specialty${index + 1}type`}
                value={values[`specialty${index + 1}type`] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="boat">Boat</MenuItem>
                <MenuItem value="motorcycle">Motorcycle</MenuItem>
                <MenuItem value="atv">ATV</MenuItem>
                <MenuItem value="snowmobile">Snowmobile</MenuItem>
                <MenuItem value="rv">RV</MenuItem>
                <MenuItem value="classic">Classic Car</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Year"
              name={`specialty${index + 1}year`}
              type="number"
              value={values[`specialty${index + 1}year`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Make"
              name={`specialty${index + 1}make`}
              value={values[`specialty${index + 1}make`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Model"
              name={`specialty${index + 1}model`}
              value={values[`specialty${index + 1}model`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="VIN/Serial Number"
              name={`specialty${index + 1}vin`}
              value={values[`specialty${index + 1}vin`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Market Value"
              name={`specialty${index + 1}value`}
              type="number"
              value={values[`specialty${index + 1}value`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Storage Location"
              name={`specialty${index + 1}storageLocation`}
              value={values[`specialty${index + 1}storageLocation`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Usage</InputLabel>
              <Select
                name={`specialty${index + 1}usage`}
                value={values[`specialty${index + 1}usage`] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="pleasure">Pleasure</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="racing">Racing</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Primary Operator"
              name={`specialty${index + 1}primaryOperator`}
              value={values[`specialty${index + 1}primaryOperator`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Comprehensive Deductible"
              name={`specialty${index + 1}comprehensiveDeductible`}
              type="number"
              value={values[`specialty${index + 1}comprehensiveDeductible`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Collision Deductible"
              name={`specialty${index + 1}collisionDeductible`}
              type="number"
              value={values[`specialty${index + 1}collisionDeductible`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Horsepower"
              name={`specialty${index + 1}horsepower`}
              type="number"
              value={values[`specialty${index + 1}horsepower`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Top Speed (mph)"
              name={`specialty${index + 1}topSpeed`}
              type="number"
              value={values[`specialty${index + 1}topSpeed`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Engine Size (cc)"
              name={`specialty${index + 1}ccSize`}
              type="number"
              value={values[`specialty${index + 1}ccSize`]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          {index < numSpecialtyItems - 1 && (
            <Grid item xs={12}>
              <Divider sx={{ my: 3 }} />
            </Grid>
          )}
        </React.Fragment>
      ))}

      {numSpecialtyItems < 8 && (
        <Grid item xs={12}>
          <Button
            startIcon={<AddIcon />}
            onClick={addSpecialtyItem}
            variant="outlined"
          >
            Add Another Item
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default SpecialtyInfoStep; 