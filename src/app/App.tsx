import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { FinalCTA } from "./components/FinalCTA";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="h-16" /> {/* Whitespace between header and hero */}
      <Hero />
      <Features />
      <HowItWorks />
      <FinalCTA />
      <Testimonials />
      <Footer />
    </div>
  );
}