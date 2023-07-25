import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./design-system/theme";
import { QueryClientProvider } from "./api/queryClient";
import { AppRouter, routes } from "./navigation";
import { useRemoveSplashScreen } from "./hooks";

const App = () => {
  useRemoveSplashScreen();

  return (
    <QueryClientProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppRouter routes={routes} />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
