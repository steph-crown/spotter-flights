import AppRouter from "@/router/Router";
import { theme } from "@/theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  // const { mode, setMode } = useColorScheme();
  // if (!mode) {
  //   return null;
  // }

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        {/* <Button
        onClick={() => {
          setMode("light");∏
        }}
        variant="contained"
      >
        Light
      </Button>
      <Button
        onClick={() => {
          setMode("system");
        }}
      >
        System
      </Button>
      <Button
        onClick={() => {
          setMode("dark");
        }}
      >
        Dark
      </Button> */}
        <CssBaseline enableColorScheme />

        <AppRouter />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
