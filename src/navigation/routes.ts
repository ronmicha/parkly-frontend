import { createElement, type ReactNode } from "react";
import { LoginPage, ParkingListPage } from "../pages";
import { Paths } from "./paths";

type Route = {
  path: Paths;
  element: ReactNode;
};

export const routes: Route[] = [
  { path: Paths.DEFAULT, element: createElement(LoginPage) },
  { path: Paths.LOGIN, element: createElement(LoginPage) },
  { path: Paths.PARKING_LIST, element: createElement(ParkingListPage) },
];
