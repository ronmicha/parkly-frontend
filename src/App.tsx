import { QueryClientProvider } from "./api";
import { AppRouter } from "./navigation";

const App = () => {
  return (
    <QueryClientProvider>
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
