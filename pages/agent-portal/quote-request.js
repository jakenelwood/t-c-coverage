import React from "react";
import { Container, Typography, Box } from "@mui/material";
import QuoteRequestForm from "../../components/QuoteRequestForm";
// import { useSession } from "next-auth/react"; // Commented out for static export
import { useRouter } from "next/router";

const QuoteRequestPage = () => {
  // Temporarily commented out for static HTML export
  // const { data: session, status } = useSession();
  const router = useRouter();

  // Temporarily commented out for static HTML export
  /*
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    return null;
  }
  */

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          New Quote Request
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Fill out the form below to generate a new insurance quote request.
        </Typography>
      </Box>

      <QuoteRequestForm />
    </Container>
  );
};

export default QuoteRequestPage; 