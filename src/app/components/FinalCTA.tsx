import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "100% Free",
  "Unlimited Glucose Monitoring",
  "AI-Powered Insights & Predictions",
  "Community Support & Resources"
];

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="mb-6 text-white"
            style={{ fontSize: "3rem", lineHeight: "1.2" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to Take Control of Your Diabetes?
          </motion.h2>
          
          <motion.p 
            className="mb-10 text-blue-100 max-w-2xl mx-auto"
            style={{ fontSize: "1.25rem", lineHeight: "1.8" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of people using AI-powered insights to manage their diabetes more effectively
          </motion.p>

          {/* Benefits list */}
          <motion.div 
            className="grid md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-left bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" strokeWidth={2.5} />
                <span className="text-white">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button 
              size="lg" 
              className="px-10 py-6 bg-white text-blue-700 hover:bg-gray-100 rounded-full shadow-2xl hover:shadow-3xl transition-all group"
              style={{ fontSize: "1.125rem" }}
              onClick={() => navigate("/account-type")}
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
          </motion.div>

          
        </motion.div>
      </div>
    </section>
  );
}