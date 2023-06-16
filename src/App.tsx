import { AppRouter } from "./router";
import { QueryClientProvider } from "./api";

const App = () => {
  return (
    <QueryClientProvider>
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
