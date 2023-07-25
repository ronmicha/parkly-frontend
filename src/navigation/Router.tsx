import { Route, Routes } from "react-router-dom";
import { type AppRoute } from "./routes";
import { useLoginRedirect } from "../hooks";

const createRoutes = (routes: AppRoute[]) => {
  return routes.map(({ path, element, index, routes }, i) => (
    // @ts-ignore TS is annoying!
    <Route key={i} path={path} index={index} element={element}>
      {routes ? createRoutes(routes) : null}
    </Route>
  ));
};

type AppRouterProps = {
  routes: AppRoute[];
};

export const AppRouter = ({ routes }: AppRouterProps) => {
  useLoginRedirect();

  return <Routes>{createRoutes(routes)}</Routes>;
};
