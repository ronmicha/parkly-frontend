import { type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { type AppRoute } from "./routes";

type RouterProps = {
  routes: AppRoute[];
};

const Router = ({ routes }: RouterProps) => {
  const pageRoutes = routes.map(({ path, element }, index) => {
    return <Route key={index} path={path} element={element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

type AppRouterProps = {
  routes: AppRoute[];
  renderComponents?: () => ReactNode;
};

export const AppRouter = ({ routes, renderComponents }: AppRouterProps) => {
  return (
    <BrowserRouter>
      <Router routes={routes} />
      {renderComponents?.()}
    </BrowserRouter>
  );
};
