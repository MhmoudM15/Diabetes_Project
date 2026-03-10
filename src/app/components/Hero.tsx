import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center px-6 overflow-hidden">
      {/* Large blurry blue circle background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400 rounded-full opacity-20 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="mb-6 tracking-tight"
            style={{ fontSize: "3.5rem", lineHeight: "1.1" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            AI-Powered Diabetes Monitoring & Care
          </motion.h1>
          
          <motion.p 
            className="mb-12 text-gray-600 max-w-2xl mx-auto"
            style={{ fontSize: "1.25rem", lineHeight: "1.8" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Take control of your diabetes with intelligent predictions, personalized guidance, 
            and real-time monitoring—all in one platform
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              style={{ fontSize: "1.125rem" }}
              onClick={() => navigate("/account-type")}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full transition-all"
              style={{ fontSize: "1.125rem" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-100 rounded-full opacity-50 blur-3xl" />
      </div>
    </section>
  );
}