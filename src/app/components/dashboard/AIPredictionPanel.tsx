import { TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

const predictions = [
  { time: "In 2 hours", value: 135, trend: "stable" },
  { time: "In 4 hours", value: 142, trend: "rising" },
];

const riskLevel = "Moderate"; // Can be "Low", "Moderate", or "High"

const riskConfig = {
  Low: {
    color: "bg-green-100 text-green-700 border-green-200",
    dotColor: "bg-green-500",
  },
  Moderate: {
    color: "bg-orange-100 text-orange-700 border-orange-200",
    dotColor: "bg-orange-500",
  },
  High: {
    color: "bg-red-100 text-red-700 border-red-200",
    dotColor: "bg-red-500",
  },
};

export function AIPredictionPanel() {
  const currentRiskConfig = riskConfig[riskLevel as keyof typeof riskConfig];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-gray-900" style={{ fontSize: "1.125rem" }}>
            AI Predictions
          </h3>
          <p className="text-gray-600 text-sm">Glucose forecast</p>
        </div>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <motion.div
            key={prediction.time}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-50 rounded-2xl p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm font-medium">{prediction.time}</span>
              <span 
                className={`text-xs px-2 py-1 rounded-full ${
                  prediction.trend === "stable" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {prediction.trend}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl text-gray-900 font-medium">{prediction.value}</span>
              <span className="text-gray-600 text-sm">mg/dL</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Risk Level Indicator */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700 font-medium">Risk Level</span>
        </div>
        <div className={`border-2 ${currentRiskConfig.color} rounded-2xl p-4 flex items-center gap-3`}>
          <div className={`w-3 h-3 rounded-full ${currentRiskConfig.dotColor} animate-pulse`} />
          <span className="font-medium text-lg">{riskLevel}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-xl">
        <p className="text-sm text-blue-700">
          💡 Predictions based on your recent activity and meal patterns
        </p>
      </div>
    </div>
  );
}