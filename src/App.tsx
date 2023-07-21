import { ThemeProvider } from "./design-system/theme";
import { QueryClientProvider } from "./api/queryClient";
import { AppRouter } from "./navigation";
import { routes } from "./navigation/routes";
import { UnAuthRedirect } from "./components";
import { useEffect } from "react";

const useRemoveSplashScreen = () => {
  useEffect(() => {
    const splashScreenEl = document.getElementById("splash-screen");
    if (splashScreenEl) {
      splashScreenEl.style.opacity = "0";
      splashScreenEl.ontransitionend = () => {
        splashScreenEl.remove();
      };
    }
  }, []);
};

const App = () => {
  useRemoveSplashScreen();

  return (
    <QueryClientProvider>
      <ThemeProvider>
        <AppRouter routes={routes}>
          <UnAuthRedirect />
        </AppRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
