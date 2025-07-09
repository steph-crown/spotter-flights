import { Alert, Button, Collapse, IconButton, Typography } from "@mui/material";
import { Refresh, WifiOff, Close } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";

const BANNER_HEIGHT = "64px";

export const NetworkStatusBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isDismissed, setIsDismissed] = useState(false);

  const setPaddingTop = useCallback((padding: string) => {
    document.body.style.paddingTop = padding;
  }, []);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    setIsDismissed(false);
    setPaddingTop("0");
  }, [setPaddingTop]);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    setIsDismissed(false);
    setPaddingTop(BANNER_HEIGHT);
  }, [setPaddingTop]);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    setPaddingTop("0");
  }, [setPaddingTop]);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (!isOnline && !isDismissed) {
      setPaddingTop(BANNER_HEIGHT);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      setPaddingTop("0");
    };
  }, [handleOnline, handleOffline, isOnline, isDismissed, setPaddingTop]);

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
          zIndex: 1400,
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
