import { QueryClientProvider } from "./api/queryClient";
import { AppRouter } from "./navigation";

const App = () => {
  return (
    <QueryClientProvider>
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
