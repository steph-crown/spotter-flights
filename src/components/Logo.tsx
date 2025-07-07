import LogoIcon from "@/assets/logo.svg?react";
import { Typography, useColorScheme, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

export function Logo() {
  const { mode } = useColorScheme();
  const { palette } = useTheme();

  return (
    <Link
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        color:
          mode === "light"
            ? palette.primary.main
            : palette.primary.contrastText,
        textDecoration: "none",
      }}
    >
      <LogoIcon
        style={{
          height: "2.5rem",
          width: "2.5rem",
        }}
      />

      <Typography variant="body2" fontWeight={600}>
        Spotter Flights
      </Typography>
    </Link>
  );
}
