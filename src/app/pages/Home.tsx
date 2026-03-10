import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { FinalCTA } from "../components/FinalCTA";
import { Testimonials } from "../components/Testimonials";

export function Home() {
  return (
    <>
      <div className="h-16" /> {/* Whitespace between header and hero */}
      <Hero />
      <Features />
      <HowItWorks />
      <FinalCTA />
      <Testimonials />
    </>
  );
}
