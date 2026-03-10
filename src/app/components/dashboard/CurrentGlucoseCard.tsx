import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, ArrowRight, Clock } from "lucide-react";

export function CurrentGlucoseCard() {
  const [glucose, setGlucose] = useState(108);
  const [trend, setTrend] = useState<"up" | "down" | "stable">("stable");
  const [lastSynced, setLastSynced] = useState("2m ago");

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGlucose(prev => {
        const change = Math.floor(Math.random() * 11) - 5;
        const newValue = Math.max(70, Math.min(200, prev + change));
        
        if (change > 2) setTrend("up");
        else if (change < -2) setTrend("down");
        else setTrend("stable");
        
        const seconds = Math.floor(Math.random() * 5) + 1;
        setLastSynced(`${seconds}m ago`);
        return newValue;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="w-3 h-3" />;
    if (trend === "down") return <TrendingDown className="w-3 h-3" />;
    return <ArrowRight className="w-3 h-3" />;
  };

  const getTrendColor = () => {
    if (glucose < 70) return "text-red-600";
    if (glucose > 180) return "text-orange-600";
    return "text-green-600";
  };

  const getTrendLabel = () => {
    if (glucose < 70) return "Low";
    if (glucose > 180) return "High";
    return "Stable Trend";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">Current Glucose</p>
        <ArrowRight className="w-4 h-4 text-blue-600" />
      </div>
      
      <motion.div
        key={glucose}
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        className="mb-2"
      >
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-medium text-gray-900">{glucose}</span>
          <span className="text-gray-600">mg/dL</span>
        </div>
      </motion.div>

      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{getTrendLabel()}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Last synced: {lastSynced}</span>
        </div>
      </div>
    </div>
  );
}
