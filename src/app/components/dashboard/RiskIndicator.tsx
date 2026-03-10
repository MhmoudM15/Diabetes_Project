import { AlertTriangle } from "lucide-react";

const riskLevel = "moderate"; // Can be "low", "moderate", or "high"

const riskConfig = {
  low: {
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    iconColor: "text-green-600",
    label: "Low Risk",
    description: "Your glucose levels are well controlled",
  },
  moderate: {
    color: "orange",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    iconColor: "text-orange-600",
    label: "Moderate Risk",
    description: "Monitor your levels closely today",
  },
  high: {
    color: "red",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    iconColor: "text-red-600",
    label: "High Risk",
    description: "Immediate attention recommended",
  },
};

export function RiskIndicator() {
  const config = riskConfig[riskLevel as keyof typeof riskConfig];

  return (
    <div className={`bg-white border-2 ${config.borderColor} rounded-3xl p-6 shadow-sm`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-10 h-10 ${config.bgColor} rounded-xl flex items-center justify-center`}>
          <AlertTriangle className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        <div>
          <h3 className="text-gray-900" style={{ fontSize: "1.125rem" }}>
            Risk Status
          </h3>
        </div>
      </div>

      <div className={`${config.bgColor} rounded-2xl p-4`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`font-medium ${config.textColor}`} style={{ fontSize: "1.25rem" }}>
            {config.label}
          </span>
        </div>
        <p className={`text-sm ${config.textColor}`}>
          {config.description}
        </p>
      </div>

      {/* Risk Levels */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className={`w-full h-2 rounded-full ${
            riskLevel === "low" ? "bg-green-500" : "bg-gray-200"
          }`} />
          <span className="text-xs text-gray-600 w-16">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-full h-2 rounded-full ${
            riskLevel === "moderate" ? "bg-orange-500" : "bg-gray-200"
          }`} />
          <span className="text-xs text-gray-600 w-16">Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-full h-2 rounded-full ${
            riskLevel === "high" ? "bg-red-500" : "bg-gray-200"
          }`} />
          <span className="text-xs text-gray-600 w-16">High</span>
        </div>
      </div>
    </div>
  );
}
