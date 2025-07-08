import { Box } from "@mui/material";

export function FlightArrow() {
  return (
    <Box
      sx={{
        color: "text.secondaryChannel",
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg width="64" height="6" viewBox="0 0 64 6" fill="none">
        <path
          d="M64 3.00001L59 0.113255L59 5.88676L64 3.00001ZM-3.51825e-08 3.5L32 3.5L32 2.5L3.51825e-08 2.5L-3.51825e-08 3.5ZM32 3.5L59.5 3.50001L59.5 2.50001L32 2.5L32 3.5Z"
          fill="currentColor"
        />
        <circle cx="29" cy="3" r="3" fill="currentColor" />
      </svg>
    </Box>
  );
}
