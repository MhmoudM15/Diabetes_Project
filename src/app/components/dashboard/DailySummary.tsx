import { Activity, Apple, Droplet, Syringe } from "lucide-react";
import { motion } from "motion/react";

const summaryData = [
  {
    icon: Droplet,
    label: "Average Glucose",
    value: "118",
    unit: "mg/dL",
    color: "blue",
  },
  {
    icon: Apple,
    label: "Meals Logged",
    value: "3",
    unit: "today",
    color: "green",
  },
  {
    icon: Syringe,
    label: "Insulin Doses",
    value: "4",
    unit: "doses",
    color: "purple",
  },
  {
    icon: Activity,
    label: "Activity",
    value: "45",
    unit: "minutes",
    color: "orange",
  },
];

const colorConfig = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
};

export function DailySummary() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-gray-900 mb-1" style={{ fontSize: "1.25rem" }}>
          Daily Summary
        </h3>
        <p className="text-gray-600 text-sm">Your health stats for today</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {summaryData.map((item, index) => {
          const Icon = item.icon;
          const colors = colorConfig[item.color as keyof typeof colorConfig];

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-4"
            >
              <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              <p className="text-gray-600 text-sm mb-1">{item.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl text-gray-900">{item.value}</span>
                <span className="text-sm text-gray-600">{item.unit}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
