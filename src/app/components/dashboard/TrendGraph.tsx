import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, Calendar, ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart
} from "recharts";

// Generate mock data for different time periods
const generateData = (period: string) => {
  switch (period) {
    case "today":
      return [
        { time: "12 AM", glucose: 120 },
        { time: "2 AM", glucose: 115 },
        { time: "4 AM", glucose: 125 },
        { time: "6 AM", glucose: 135 },
        { time: "8 AM", glucose: 165 },
        { time: "10 AM", glucose: 145 },
        { time: "12 PM", glucose: 185 },
        { time: "2 PM", glucose: 155 },
        { time: "4 PM", glucose: 140 },
        { time: "6 PM", glucose: 175 },
        { time: "8 PM", glucose: 150 },
        { time: "10 PM", glucose: 142 }
      ];
    case "week":
      return [
        { time: "Mon", glucose: 145, min: 95, max: 185 },
        { time: "Tue", glucose: 152, min: 105, max: 195 },
        { time: "Wed", glucose: 138, min: 90, max: 175 },
        { time: "Thu", glucose: 148, min: 100, max: 190 },
        { time: "Fri", glucose: 142, min: 98, max: 180 },
        { time: "Sat", glucose: 135, min: 92, max: 170 },
        { time: "Sun", glucose: 140, min: 95, max: 178 }
      ];
    case "month":
      return [
        { time: "Week 1", glucose: 148, min: 100, max: 190 },
        { time: "Week 2", glucose: 145, min: 95, max: 185 },
        { time: "Week 3", glucose: 140, min: 92, max: 180 },
        { time: "Week 4", glucose: 142, min: 98, max: 182 }
      ];
    default:
      return [];
  }
};

export function TrendGraph() {
  const [period, setPeriod] = useState<"today" | "week" | "month">("today");
  const data = generateData(period);

  // Calculate stats
  const avgGlucose = Math.round(
    data.reduce((sum, d) => sum + d.glucose, 0) / data.length
  );
  const maxGlucose = Math.max(...data.map(d => d.glucose));
  const minGlucose = Math.min(...data.map(d => d.glucose));

  // Calculate time in range
  const inRange = data.filter(d => d.glucose >= 70 && d.glucose <= 180).length;
  const timeInRange = Math.round((inRange / data.length) * 100);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-1">{payload[0].payload.time}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={index} className="text-sm text-gray-700">
                <span className="font-medium">{entry.name}:</span> {entry.value} mg/dL
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl shadow-sm overflow-hidden h-full">
      {/* Header */}
      <div className="p-6 border-b-2 border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Glucose Trends</h3>
              <p className="text-sm text-gray-600">Track your glucose patterns over time</p>
            </div>
          </div>
          
          {/* Period Selector */}
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as any)}
              className="appearance-none pl-4 pr-10 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-sm font-medium cursor-pointer"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-6 pt-6 grid grid-cols-4 gap-3">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3">
          <p className="text-xs text-blue-700 mb-1">Average</p>
          <p className="text-xl font-medium text-blue-900">{avgGlucose}</p>
          <p className="text-xs text-blue-600">mg/dL</p>
        </div>
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-3">
          <p className="text-xs text-orange-700 mb-1">Peak</p>
          <p className="text-xl font-medium text-orange-900">{maxGlucose}</p>
          <p className="text-xs text-orange-600">mg/dL</p>
        </div>
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3">
          <p className="text-xs text-green-700 mb-1">Lowest</p>
          <p className="text-xl font-medium text-green-900">{minGlucose}</p>
          <p className="text-xs text-green-600">mg/dL</p>
        </div>
        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3">
          <p className="text-xs text-purple-700 mb-1">In Range</p>
          <p className="text-xl font-medium text-purple-900">{timeInRange}%</p>
          <p className="text-xs text-purple-600">70-180</p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {period === "today" ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  domain={[60, 200]}
                  tick={{ fontSize: 12 }}
                  label={{ value: 'mg/dL', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#6b7280' } }}
                />
                <Tooltip content={<CustomTooltip />} />
                {/* Target range reference lines */}
                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={2} />
                <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth={2} />
                {/* Optimal range shading */}
                <ReferenceLine y={70} stroke="none" />
                <Area 
                  type="monotone" 
                  dataKey="glucose" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fill="url(#glucoseGradient)"
                  name="Glucose"
                />
              </AreaChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  domain={[60, 200]}
                  tick={{ fontSize: 12 }}
                  label={{ value: 'mg/dL', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#6b7280' } }}
                />
                <Tooltip content={<CustomTooltip />} />
                {/* Target range reference lines */}
                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={2} label={{ value: 'Low', position: 'left', fill: '#ef4444', fontSize: 10 }} />
                <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth={2} label={{ value: 'High', position: 'left', fill: '#f59e0b', fontSize: 10 }} />
                <Line 
                  type="monotone" 
                  dataKey="glucose" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Average"
                />
                {period !== "today" && (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey="max" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="High"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="min" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Low"
                    />
                  </>
                )}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t-2 border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full" />
            <span className="text-sm text-gray-700">
              {period === "today" ? "Glucose" : "Average"}
            </span>
          </div>
          {period !== "today" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-orange-500" style={{ borderTop: '2px dashed' }} />
                <span className="text-sm text-gray-700">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-green-500" style={{ borderTop: '2px dashed' }} />
                <span className="text-sm text-gray-700">Low</span>
              </div>
            </>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-red-500" style={{ borderTop: '2px dashed' }} />
            <span className="text-sm text-gray-700">Threshold (70)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-orange-500" style={{ borderTop: '2px dashed' }} />
            <span className="text-sm text-gray-700">Threshold (180)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
