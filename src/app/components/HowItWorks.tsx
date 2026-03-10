import { motion } from "motion/react";
import { Database, Brain, LineChart, BellRing } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Log Glucose Data",
    description: "Easily input your glucose readings manually or sync with your continuous glucose monitor.",
    step: "01"
  },
  {
    icon: Brain,
    title: "AI Analyzes Patterns",
    description: "Our AI engine processes your data to identify trends, patterns, and potential risks.",
    step: "02"
  },
  {
    icon: LineChart,
    title: "Receive Predictions",
    description: "Get accurate forecasts of future glucose levels based on your unique patterns.",
    step: "03"
  },
  {
    icon: BellRing,
    title: "Get Smart Alerts",
    description: "Stay informed with timely notifications and personalized recommendations.",
    step: "04"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4" style={{ fontSize: "2.5rem" }}>
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: "1.125rem" }}>
            Four simple steps to take control of your diabetes management
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 mx-24" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="text-center">
                <motion.div 
                  className="relative inline-flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center relative z-10">
                    <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-inner">
                      <step.icon className="w-10 h-10 text-blue-600" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold z-20 shadow-lg">
                    {step.step}
                  </div>
                </motion.div>
                
                <h3 className="mb-3" style={{ fontSize: "1.25rem" }}>
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
