import { Brain, TrendingUp } from "lucide-react";

export function AIPredictionsCard() {
  const predictions = [
    { time: "30 min", value: 115, change: "+6%" },
    { time: "1 hour", value: 122, change: "+13%" }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4 text-blue-600" />
        <p className="text-sm text-gray-600">AI Predictions</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {predictions.map((pred, idx) => (
          <div key={idx}>
            <div className="text-3xl font-medium text-gray-900 mb-1">
              {pred.value}
            </div>
            <p className="text-xs text-gray-500 mb-1">{pred.time}</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-600">{pred.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
