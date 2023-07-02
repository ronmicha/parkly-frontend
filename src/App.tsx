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
      <AppRouter routes={routes} renderComponents={renderComponents} />
    </QueryClientProvider>
  );
};

export default App;
