import { Box, CircularProgress, Typography } from "@mui/material";

interface BlockLoaderProps {
  message?: string;
  size?: number;
}

export function BlockLoader({
  message = "Loading...",
  size = 40,
}: BlockLoaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        gap: 2,
      }}
    >
      <CircularProgress size={size} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
