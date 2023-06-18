import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { UnAuthRedirect } from "./UnAuthRedirect";

const Router = () => {
  const pageRoutes = routes.map(({ path, element }, index) => {
    return <Route key={index} path={path} element={element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Router />
      <UnAuthRedirect />
    </BrowserRouter>
  );
};
