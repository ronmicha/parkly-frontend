import { createElement, type ReactNode } from "react";
import { AdminPage, LoginPage, ParkingListPage, WelcomePage } from "../pages";
import { UserManagement } from "../components";
import { Paths } from "./paths";

export type AppRoute = {
  path: Paths;
  element: ReactNode;
  index?: boolean;
  routes?: AppRoute[];
};

export const routes: AppRoute[] = [
  { path: Paths.DEFAULT, element: createElement(WelcomePage) },
  { path: Paths.LOGIN, element: createElement(LoginPage) },
  { path: Paths.WELCOME, element: createElement(WelcomePage) },
  { path: Paths.PARKING_LIST, element: createElement(ParkingListPage) },
  {
    path: Paths.ADMIN,
    element: createElement(AdminPage),
    routes: [
      {
        path: Paths.ADMIN_USERS,
        index: true,
        element: createElement(UserManagement),
      },
      {
        path: Paths.ADMIN_PARKING_SLOTS,
        element: createElement(UserManagement),
      },
    ],
  },
];
