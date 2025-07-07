import { createTheme } from "@mui/material/styles";

export const spotterBrand = {
  teal: {
    50: "#e6f7f7",
    100: "#b3e6e650",
    200: "#80d4d4",
    300: "#4dc2c2",
    400: "#1ab0b0",
    500: "#008080",
    600: "#007373",
    700: "#006666",
    800: "#005959",
    900: "#004d4d",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9A9FA4",
    500: "#5f6368",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  neutral: {
    white: "#ffffff",
    black: "#202124",
  },
};

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: spotterBrand.teal[500],
          light: spotterBrand.teal[300],
          dark: spotterBrand.teal[700],
          contrastText: "#ffffff",
        },
        background: {
          default: "#ffffff",
          paper: "#ffffff",
        },
        text: {
          primary: spotterBrand.gray[900],
          secondary: spotterBrand.gray[600],
          disabled: spotterBrand.gray[500],
          primaryChannel: spotterBrand.gray[200],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: spotterBrand.teal[400],
          light: spotterBrand.teal[300],
          dark: spotterBrand.teal[600],
          contrastText: "#ffffff",
        },
        background: {
          // default: "#0a0a0a",
          default: "#202124",
          paper: "#202124",
        },
        text: {
          primary: "#ffffff",
          secondary: spotterBrand.gray[400],
          disabled: spotterBrand.gray[300],
          primaryChannel: spotterBrand.gray[600],
        },
      },
    },
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "1.5rem",
          padding: "0.5rem 1.5rem",
          fontWeight: 500,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  },
});
