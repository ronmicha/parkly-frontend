import { createElement, type ReactNode } from "react";
import { LoginPage, ParkingListPage, WelcomePage } from "../pages";
import { Paths } from "./paths";

type Route = {
  path: Paths;
  element: ReactNode;
};

export const routes: Route[] = [
  { path: Paths.DEFAULT, element: createElement(WelcomePage) },
  { path: Paths.LOGIN, element: createElement(LoginPage) },
  { path: Paths.WELCOME, element: createElement(WelcomePage) },
  { path: Paths.PARKING_LIST, element: createElement(ParkingListPage) },
];
