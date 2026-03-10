import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { AccountType } from "./pages/AccountType";
import { PatientSignup } from "./pages/PatientSignup";
import { DoctorSignup } from "./pages/DoctorSignup";
import { PatientDashboard } from "./pages/PatientDashboard";
import { DoctorDashboard } from "./pages/DoctorDashboard";
import { PatientDetailPage } from "./pages/PatientDetailPage";
import { Login } from "./pages/Login";

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
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard/patient",
    Component: PatientDashboard,
  },
  {
    path: "/dashboard/doctor",
    Component: DoctorDashboard,
  },
  {
    path: "/dashboard/doctor/patient/:patientId",
    Component: PatientDetailPage,
  },
]);