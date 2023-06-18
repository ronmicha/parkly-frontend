import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren } from "react";

type QueryClientProviderProps = PropsWithChildren<{
  isDevtoolsOpen?: boolean;
}>;

const queryClient = new QueryClient();

export const QueryClientProvider = ({
  children,
  isDevtoolsOpen = false,
}: QueryClientProviderProps): JSX.Element => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={!!isDevtoolsOpen} />
      {children}
    </ReactQueryClientProvider>
  );
};
