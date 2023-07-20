import { ThemeProvider } from "./design-system/theme";
import { QueryClientProvider } from "./api/queryClient";
import { AppRouter } from "./navigation";
import { routes } from "./navigation/routes";
import { UnAuthRedirect } from "./components";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    document.getElementById("splash-screen")?.remove();
  }, []);

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
