import { type RouteProps } from "react-router";
import { Paths } from "./paths";
import { AdminPage, LoginPage, ParkingListPage, WelcomePage } from "../pages";

export type AppRoute = Pick<RouteProps, "path" | "element" | "index"> & {
  routes?: AppRoute[];
};

export const routes: AppRoute[] = [
  { path: Paths.DEFAULT, element: <WelcomePage /> },
  { path: Paths.LOGIN, element: <LoginPage /> },
  { path: Paths.WELCOME, element: <WelcomePage /> },
  { path: Paths.PARKING_LIST, element: <ParkingListPage /> },
  { path: Paths.ADMIN, element: <AdminPage /> },
];
