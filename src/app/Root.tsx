import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export function Root() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
