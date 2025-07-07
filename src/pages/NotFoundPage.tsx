import React from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = (): void => {
    navigate("/");
  };

  const handleGoBack = (): void => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      <Typography
        variant="h1"
        sx={{ fontSize: "6rem", fontWeight: "bold", color: "primary.main" }}
      >
        404
      </Typography>

      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button variant="contained" onClick={handleGoHome}>
          Go Home
        </Button>

        <Button variant="outlined" onClick={handleGoBack}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
