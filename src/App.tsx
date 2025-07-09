import AppRouter from "@/router/Router";
import { store } from "@/store/store";
import { theme } from "@/theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import "./App.css";
import { NetworkStatusBanner } from "@/components/NetworkStatusBanner";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <NetworkStatusBanner />

        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
