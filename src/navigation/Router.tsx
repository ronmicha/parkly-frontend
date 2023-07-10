import { type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { type AppRoute } from "./routes";

type RouterProps = {
  routes: AppRoute[];
};

const createRoutes = ({ routes }: RouterProps) => {
  return routes.map(({ path, element, index, routes }, i) => (
    <Route key={i} path={path} index={Boolean(index)} element={element}>
      {routes ? createRoutes({ routes }) : null}
    </Route>
  ));
};

type AppRouterProps = {
  routes: AppRoute[];
  renderComponents?: () => ReactNode;
};

export const AppRouter = ({ routes, renderComponents }: AppRouterProps) => {
  return (
    <BrowserRouter>
      <Routes>{createRoutes({ routes })}</Routes>
      {renderComponents?.()}
    </BrowserRouter>
  );
};
