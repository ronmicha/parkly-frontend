import { ThemeProvider } from "./design-system/theme";
import { QueryClientProvider } from "./api/queryClient";
import { AppRouter } from "./navigation";
import { routes } from "./navigation/routes";
import { UnAuthRedirect } from "./components";

const renderComponents = () => {
  return <UnAuthRedirect />;
};

const App = () => {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <AppRouter routes={routes} renderComponents={renderComponents} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
