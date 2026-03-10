import { useState } from "react";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

// Generate 24-hour data
const generate24HourData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    const hour = i;
    const formattedHour = hour === 0 ? "12am" : hour < 12 ? `${hour}am` : hour === 12 ? "12pm" : `${hour - 12}pm`;
    
    // Create realistic glucose patterns
    let baseValue = 100;
    if (hour >= 6 && hour <= 8) baseValue = 130; // Morning spike
    if (hour >= 12 && hour <= 14) baseValue = 150; // Lunch spike
    if (hour >= 18 && hour <= 20) baseValue = 145; // Dinner spike
    if (hour >= 22 || hour <= 4) baseValue = 95; // Night lows
    
    const variance = Math.random() * 20 - 10;
    const glucose = Math.round(baseValue + variance);
    
    data.push({
      time: formattedHour,
      glucose: Math.max(70, Math.min(180, glucose))
    });
  }
  return data;
};

const generate7DayData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map(day => ({
    time: day,
    glucose: Math.round(100 + Math.random() * 40)
  }));
};

const generate30DayData = () => {
  const data = [];
  for (let i = 1; i <= 30; i += 3) {
    data.push({
      time: `Day ${i}`,
      glucose: Math.round(100 + Math.random() * 40)
    });
  }
  return data;
};

export function GlucoseTrendChart() {
  const [period, setPeriod] = useState<"1D" | "1W" | "1M">("1D");

  const getData = () => {
    switch (period) {
      case "1D":
        return generate24HourData();
      case "1W":
        return generate7DayData();
      case "1M":
        return generate30DayData();
      default:
        return generate24HourData();
    }
  };

  const data = getData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-lg">
          <p className="text-xs text-gray-600 mb-1">{payload[0].payload.time}</p>
          <p className="text-sm font-medium text-gray-900">
            {payload[0].value} mg/dL
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-gray-900 font-medium mb-1">Glucose Trend (Last 24h)</h3>
          <p className="text-sm text-gray-500">Target Range: 70 - 180 mg/dL</p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {(["1D", "1W", "1M"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                period === p
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <motion.div
        key={period}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis 
              stroke="#9ca3af"
              domain={[50, 200]}
              ticks={[50, 90, 130, 170, 200]}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Target range reference lines */}
            <ReferenceLine 
              y={70} 
              stroke="#ef4444" 
              strokeDasharray="3 3" 
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            <ReferenceLine 
              y={180} 
              stroke="#f59e0b" 
              strokeDasharray="3 3" 
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            
            <Area 
              type="monotone" 
              dataKey="glucose" 
              stroke="#3b82f6" 
              strokeWidth={2}
              fill="url(#glucoseGradient)"
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
