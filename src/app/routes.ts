import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { AccountType } from "./pages/AccountType";
import { PatientSignup } from "./pages/PatientSignup";
import { DoctorSignup } from "./pages/DoctorSignup";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "account-type", Component: AccountType },
      { path: "signup/patient", Component: PatientSignup },
      { path: "signup/doctor", Component: DoctorSignup },
    ],
  },
]);