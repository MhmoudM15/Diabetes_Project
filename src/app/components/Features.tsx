import { motion } from "motion/react";
import { Activity, Bell, Utensils, Monitor } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "AI Glucose Prediction",
    description: "Advanced algorithms predict your glucose levels hours in advance, helping you stay ahead of potential issues.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Receive intelligent notifications when patterns indicate potential highs or lows, keeping you safe 24/7.",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Utensils,
    title: "Meal Recommendations",
    description: "Get personalized meal suggestions based on your glucose patterns and dietary preferences.",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: Monitor,
    title: "Doctor Monitoring Dashboard",
    description: "Share your data seamlessly with healthcare providers for better care coordination and insights.",
    color: "bg-cyan-50 text-cyan-600"
  }
];

export function Features() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4" style={{ fontSize: "2.5rem" }}>
            Powerful Features for Better Care
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: "1.125rem" }}>
            Our platform combines cutting-edge AI with practical tools to help you manage diabetes effectively
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="w-7 h-7" strokeWidth={2} />
              </div>
              <h3 className="mb-3" style={{ fontSize: "1.25rem" }}>
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
