import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

export function Root() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}