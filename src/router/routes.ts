import { createElement, type ReactNode } from "react";
import { LoginPage, ParkingList } from "../pages";

enum Paths {
  DEFAULT = "/",
  LOGIN = "/login",
  PARKING_LIST = "/parking-list",
}

type Route = {
  path: Paths;
  element: ReactNode;
};

export const routes: Route[] = [
  { path: Paths.DEFAULT, element: createElement(LoginPage) },
  { path: Paths.LOGIN, element: createElement(LoginPage) },
  { path: Paths.PARKING_LIST, element: createElement(ParkingList) },
];
