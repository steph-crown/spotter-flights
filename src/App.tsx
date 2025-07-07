import AppRouter from "@/router/Router";
import { theme } from "@/theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Provider } from "react-redux";
import { store } from "@/store/store";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />

          <AppRouter />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
