import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  message: {
    marginBottom: theme.spacing(6),
    maxWidth: "600px",
  },
}));

export default function ThankYou() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Container className={classes.root}>
      <Typography variant="h2" component="h1" className={classes.title}>
        Thank You!
      </Typography>
      <Typography variant="h5" className={classes.message}>
        We've received your information and will be in touch shortly to discuss your insurance needs.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push("/")}
        >
          Return to Home
        </Button>
      </Box>
    </Container>
  );
} 