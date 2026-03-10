import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Activity, TrendingUp, TrendingDown, ArrowRight, Clock } from "lucide-react";

export function RealTimeGlucose() {
  const [glucose, setGlucose] = useState(142);
  const [trend, setTrend] = useState<"up" | "down" | "stable">("stable");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time glucose updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGlucose(prev => {
        // Random walk simulation
        const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
        const newValue = Math.max(70, Math.min(200, prev + change));
        
        // Determine trend
        if (change > 2) setTrend("up");
        else if (change < -2) setTrend("down");
        else setTrend("stable");
        
        setLastUpdated(new Date());
        return newValue;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getGlucoseStatus = () => {
    if (glucose < 70) return { label: "Low", color: "red", bgColor: "bg-red-50", borderColor: "border-red-300", textColor: "text-red-700" };
    if (glucose > 180) return { label: "High", color: "orange", bgColor: "bg-orange-50", borderColor: "border-orange-300", textColor: "text-orange-700" };
    return { label: "Normal", color: "green", bgColor: "bg-green-50", borderColor: "border-green-300", textColor: "text-green-700" };
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-6 h-6 text-orange-600" />;
      case "down":
        return <TrendingDown className="w-6 h-6 text-blue-600" />;
      default:
        return <ArrowRight className="w-6 h-6 text-gray-600" />;
    }
  };

  const getTrendLabel = () => {
    switch (trend) {
      case "up":
        return "Rising";
      case "down":
        return "Falling";
      default:
        return "Stable";
    }
  };

  const status = getGlucoseStatus();

  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl shadow-sm overflow-hidden h-full">
      {/* Header */}
      <div className="p-6 border-b-2 border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Real-Time Glucose</h3>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                <span>Updated {Math.floor((new Date().getTime() - lastUpdated.getTime()) / 1000)}s ago</span>
              </div>
            </div>
          </div>
          <motion.div
            key={glucose}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Main Display */}
      <div className="p-8">
        <div className="text-center">
          {/* Large Glucose Value */}
          <motion.div
            key={glucose}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <div className="text-7xl font-medium text-gray-900 tracking-tight">
              {glucose}
            </div>
            <div className="text-gray-600 mt-1" style={{ fontSize: "1.125rem" }}>
              mg/dL
            </div>
          </motion.div>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${status.bgColor} ${status.borderColor} ${status.textColor} border-2 rounded-full font-medium mb-6`}>
            <div className={`w-2 h-2 rounded-full bg-${status.color}-600`} />
            {status.label}
          </div>

          {/* Trend Indicator */}
          <div className="flex items-center justify-center gap-3 pt-6 border-t-2 border-gray-200">
            {getTrendIcon()}
            <div className="text-left">
              <p className="text-sm text-gray-600">Trend</p>
              <p className="font-medium text-gray-900">{getTrendLabel()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Target Range */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-4">
          <p className="text-sm text-gray-700 mb-2 font-medium">Target Range: 70-180 mg/dL</p>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            {/* Target range indicator */}
            <div className="absolute left-0 h-full w-full">
              <div className="absolute h-full bg-green-500 opacity-20" style={{ left: '0%', width: '100%' }} />
              {/* Current position indicator */}
              <motion.div
                key={glucose}
                initial={{ left: `${Math.min(100, Math.max(0, ((glucose - 50) / 150) * 100))}%` }}
                animate={{ left: `${Math.min(100, Math.max(0, ((glucose - 50) / 150) * 100))}%` }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>50</span>
            <span>125</span>
            <span>200</span>
          </div>
        </div>
      </div>
    </div>
  );
}
