import { ThemeProvider } from "./design-system/theme";
import { QueryClientProvider } from "./api/queryClient";
import { AppRouter, routes } from "./navigation";
import { UnAuthRedirect } from "./components";
import { useRemoveSplashScreen } from "./hooks";

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
