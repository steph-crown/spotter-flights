import { Alert, Button, Collapse, IconButton, Typography } from "@mui/material";
import { Refresh, WifiOff, Close } from "@mui/icons-material";
import { useState, useEffect } from "react";

export const NetworkStatusBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsDismissed(false);
      document.body.style.paddingTop = "0";
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsDismissed(false);
      document.body.style.paddingTop = "64px";
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (!isOnline && !isDismissed) {
      document.body.style.paddingTop = "64px";
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.body.style.paddingTop = "0";
    };
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    // Remove padding when dismissed
    document.body.style.paddingTop = "0";
  };

  // Don't show banner if online or dismissed
  if (isOnline || isDismissed) {
    return null;
  }

  return (
    <Collapse in={!isOnline && !isDismissed}>
      <Alert
        severity="error"
        icon={<WifiOff />}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1400, // Higher than most MUI components
          borderRadius: 0,
          boxShadow: 1,
          "& .MuiAlert-message": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          },
        }}
        action={
          <>
            <Button
              color="inherit"
              size="small"
              onClick={handleReload}
              startIcon={<Refresh />}
              sx={{
                mr: 1,
                textTransform: "none",
                fontWeight: "medium",
                fontSize: "0.875rem",
              }}
            >
              Reload
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleDismiss}
            >
              <Close fontSize="inherit" />
            </IconButton>
          </>
        }
      >
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          No network connection. Please check your internet and try again.
        </Typography>
      </Alert>
    </Collapse>
  );
};
