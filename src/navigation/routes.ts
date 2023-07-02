import { createElement, type ReactNode } from "react";
import { AdminPage, LoginPage, ParkingListPage, WelcomePage } from "../pages";
import { Paths } from "./paths";

export type AppRoute = {
  path: Paths;
  element: ReactNode;
};

export const routes: AppRoute[] = [
  { path: Paths.DEFAULT, element: createElement(WelcomePage) },
  { path: Paths.LOGIN, element: createElement(LoginPage) },
  { path: Paths.WELCOME, element: createElement(WelcomePage) },
  { path: Paths.PARKING_LIST, element: createElement(ParkingListPage) },
  { path: Paths.ADMIN, element: createElement(AdminPage) },
];
