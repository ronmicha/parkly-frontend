import { type PropsWithChildren } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { type AppRoute } from "./routes";

const createRoutes = (routes: AppRoute[]) => {
  return routes.map(({ path, element, index, routes }, i) => (
    // @ts-ignore TypeScript is annoying!
    <Route key={i} path={path} index={index} element={element}>
      {routes ? createRoutes(routes) : null}
    </Route>
  ));
};

type AppRouterProps = PropsWithChildren<{
  routes: AppRoute[];
}>;

export const AppRouter = ({ routes, children }: AppRouterProps) => {
  return (
    <BrowserRouter>
      <Routes>{createRoutes(routes)}</Routes>
      {children}
    </BrowserRouter>
  );
};
