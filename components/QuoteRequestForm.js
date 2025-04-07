import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PersonalInfoStep from "./form-steps/PersonalInfoStep";
import AutoInfoStep from "./form-steps/AutoInfoStep";
import HomeInfoStep from "./form-steps/HomeInfoStep";
import SpecialtyInfoStep from "./form-steps/SpecialtyInfoStep";
import ReviewStep from "./form-steps/ReviewStep";
import { fetchAPI } from "../utils/api";

const steps = [
  "Personal Information",
  "Auto Insurance",
  "Home Insurance",
  "Specialty Insurance",
  "Review & Generate",
];

const initialValues = {
  // Personal Information
  fullName: "",
  email: "",
  phone: "",
  address: "",
  mailingAddress: "",
  dateOfBirth: "",
  ssn: "",
  maritalStatus: "",
  occupation: "",
  priorAddress: "",
  
  // Quote Types
  quoteTypes: [],
  
  // Auto Insurance
  currentCarrier: "",
  monthsWithCurrentCarrier: "",
  vehicles: [],
  drivers: [],
  
  // Home Insurance
  coverageType: "",
  usage: "",
  yearBuilt: "",
  squareFootage: "",
  constructionType: "",
  roofType: "",
  dwellingCoverage: 0,
  personalPropertyCoverage: 0,
  liabilityCoverage: 0,
  medicalPayments: 0,
  floodInsurance: false,
  earthquakeInsurance: false,
  
  // Specialty Insurance
  specialtyItems: [],
  currentAutoLiability: 0,
  currentHomeLiability: 0,
  desiredUmbrellaLimit: 0,
};

const validationSchema = Yup.object().shape({
  // Personal Information Validation
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  ssn: Yup.string().required("Social Security Number is required"),
  maritalStatus: Yup.string().required("Marital status is required"),
  occupation: Yup.string().required("Occupation is required"),
  
  // Quote Types Validation
  quoteTypes: Yup.array().min(1, "Please select at least one quote type"),
  
  // Auto Insurance Validation (if selected)
  vehicles: Yup.array().when("quoteTypes", {
    is: (quoteTypes) => quoteTypes?.includes("auto"),
    then: Yup.array().min(1, "At least one vehicle is required"),
  }),
  
  // Home Insurance Validation (if selected)
  coverageType: Yup.string().when("quoteTypes", {
    is: (quoteTypes) => quoteTypes?.includes("home"),
    then: Yup.string().required("Coverage type is required"),
  }),
  
  // Specialty Insurance Validation (if selected)
  specialtyItems: Yup.array().when("quoteTypes", {
    is: (quoteTypes) => quoteTypes?.includes("specialty"),
    then: Yup.array().min(1, "At least one specialty item is required"),
  }),
});

const QuoteRequestForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Use the fetchAPI utility
      const data = await fetchAPI("quotes/submit", {
        method: "POST",
        body: JSON.stringify(values),
      });
      
      // Handle successful submission
      console.log("Quote request submitted successfully:", data);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <AutoInfoStep />;
      case 2:
        return <HomeInfoStep />;
      case 3:
        return <SpecialtyInfoStep />;
      case 4:
        return (
          <ReviewStep
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            {getStepContent(activeStep)}

            {activeStep < steps.length - 1 && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              </Box>
            )}
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default QuoteRequestForm; 