import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { AccountType } from "./pages/AccountType";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "account-type", Component: AccountType },
    ],
  },
]);
