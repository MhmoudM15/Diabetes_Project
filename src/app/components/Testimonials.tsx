import { motion } from "motion/react";
import { Star, Award, Shield, Users } from "lucide-react";

const testimonials = [
  {
    quote: "This platform has transformed how I manage my diabetes. The AI predictions are incredibly accurate and have helped me avoid several potential emergencies.",
    author: "Sarah M.",
    role: "Type 1 Diabetes Patient",
    rating: 5
  },
  {
    quote: "As a healthcare provider, having access to my patients' real-time data through the monitoring dashboard has greatly improved the quality of care I can provide.",
    author: "Dr. James Chen",
    role: "Endocrinologist",
    rating: 5
  },
  {
    quote: "The meal recommendations are spot-on and have helped me maintain better glucose control than ever before. Highly recommend!",
    author: "Michael R.",
    role: "Type 2 Diabetes Patient",
    rating: 5
  }
];

const credentials = [
  { icon: Shield, text: "HIPAA Compliant" },
  { icon: Award, text: "FDA Registered" },
  { icon: Users, text: "50,000+ Users" },
  { icon: Star, text: "4.9/5 Rating" }
];

export function Testimonials() {
  return (
    null
  );
}
