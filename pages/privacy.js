import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function PrivacyPage() {
  const router = useRouter();
  
  // Function to redirect to home page with form dialog open
  const handleQuoteClick = () => {
    router.push('/');
  };
  
  return (
    <Layout onQuoteClick={handleQuoteClick}>
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
            Your privacy is important to us.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            1. Introduction
          </Typography>
          <Typography paragraph>
            At Twin Cities Coverage, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </Typography>
          <Typography paragraph>
            Please read this Privacy Policy carefully. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
          </Typography>
        </section>

        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            2. Information We Collect
          </Typography>
          <Typography paragraph>
            We may collect personal information that you voluntarily provide to us when you express interest in obtaining information about our services, participate in activities on our website, or otherwise contact us. The personal information we collect may include names, addresses, email addresses, phone numbers, dates of birth, and other information relevant to providing insurance quotes and services.
          </Typography>
        </section>

        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            3. How We Use Information
          </Typography>
          <Typography paragraph>
            We use the information we collect for various purposes, including to:
          </Typography>
          <ul>
            <Typography component="li">Provide, operate, and maintain our website and services</Typography>
            <Typography component="li">Connect you with insurance carriers and obtain quotes</Typography>
            <Typography component="li">Improve, personalize, and expand our website and services</Typography>
            <Typography component="li">Understand and analyze how you use our website</Typography>
            <Typography component="li">Communicate with you about our services, updates, and other information</Typography>
          </ul>
        </section>

        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            4. Data Protection
          </Typography>
          <Typography paragraph>
            We implement reasonable precautions to protect the security and confidentiality of your personal information. However, no electronic transmission or storage of information can be entirely secure, so we cannot guarantee absolute security.
          </Typography>
        </section>

        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            5. Information Sharing
          </Typography>
          <Typography paragraph>
            We may share information with third parties that perform services for us or on our behalf, including insurance carriers to obtain quotes, payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
          </Typography>
        </section>

        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            6. SMS/Text Messaging Consent
          </Typography>
          <Typography paragraph>
            By providing your phone number and submitting your information through our website, you consent to receive informational and marketing text messages (SMS) from Twin Cities Coverage. Message and data rates may apply. Message frequency may vary. You may opt out of receiving text messages at any time by replying "STOP" to any message or contacting us at brian@twincitiescoverage.com.
          </Typography>
        </section>

        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            7. Your Rights
          </Typography>
          <Typography paragraph>
            You have the right to access, correct, or delete your personal information. You can also opt-out of marketing communications at any time. To exercise these rights, please contact us at brian@twincitiescoverage.com.
          </Typography>
        </section>

        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            8. Contact Us
          </Typography>
          <Typography paragraph>
            If you have questions or concerns about this Privacy Policy, please contact us at brian@twincitiescoverage.com.
          </Typography>
        </section>
      </Container>
    </Layout>
  );
} 