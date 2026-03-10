import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  Calendar,
  Clock,
  Apple,
  Droplet,
  Brain,
  ChevronDown,
  CheckCircle
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from "recharts";

// Mock glucose data with AI predictions
const glucoseData = [
  // Historical data
  { time: "12 AM", actual: 142, predicted: null, isHistorical: true },
  { time: "2 AM", actual: 138, predicted: null, isHistorical: true },
  { time: "4 AM", actual: 145, predicted: null, isHistorical: true },
  { time: "6 AM", actual: 128, predicted: null, isHistorical: true },
  { time: "8 AM", actual: 165, predicted: null, isHistorical: true },
  { time: "10 AM", actual: 148, predicted: null, isHistorical: true },
  { time: "12 PM", actual: 185, predicted: null, isHistorical: true },
  { time: "2 PM", actual: 152, predicted: null, isHistorical: true },
  { time: "4 PM", actual: 138, predicted: null, isHistorical: true },
  { time: "6 PM", actual: 192, predicted: null, isHistorical: true },
  // Current time
  { time: "Now", actual: 118, predicted: 118, isHistorical: false },
  // AI predictions
  { time: "+2h", actual: null, predicted: 135, isHistorical: false },
  { time: "+4h", actual: null, predicted: 168, isHistorical: false },
  { time: "+6h", actual: null, predicted: 195, isHistorical: false },
  { time: "+8h", actual: null, predicted: 178, isHistorical: false },
];

const mealLogs = [
  {
    id: "M1",
    type: "Dinner",
    time: "6:30 PM",
    date: "Today",
    items: ["Grilled chicken", "Brown rice", "Steamed vegetables"],
    carbs: 45,
    calories: 520,
    preGlucose: 138,
    postGlucose: 192,
    icon: "🍽️"
  },
  {
    id: "M2",
    type: "Lunch",
    time: "12:15 PM",
    date: "Today",
    items: ["Turkey sandwich", "Apple", "Mixed nuts"],
    carbs: 52,
    calories: 485,
    preGlucose: 148,
    postGlucose: 185,
    icon: "🥪"
  },
  {
    id: "M3",
    type: "Breakfast",
    time: "7:30 AM",
    date: "Today",
    items: ["Oatmeal", "Blueberries", "Almonds"],
    carbs: 38,
    calories: 320,
    preGlucose: 128,
    postGlucose: 165,
    icon: "🥣"
  },
  {
    id: "M4",
    type: "Dinner",
    time: "6:45 PM",
    date: "Yesterday",
    items: ["Salmon", "Quinoa", "Asparagus"],
    carbs: 42,
    calories: 560,
    preGlucose: 135,
    postGlucose: 175,
    icon: "🐟"
  },
  {
    id: "M5",
    type: "Lunch",
    time: "12:00 PM",
    date: "Yesterday",
    items: ["Greek salad", "Grilled chicken", "Whole wheat pita"],
    carbs: 35,
    calories: 420,
    preGlucose: 142,
    postGlucose: 168,
    icon: "🥗"
  }
];

const insulinLogs = [
  {
    id: "I1",
    type: "Rapid-acting",
    name: "Insulin Aspart",
    dosage: 8,
    unit: "units",
    time: "6:15 PM",
    date: "Today",
    reason: "Pre-meal",
    glucoseBefore: 138,
    glucoseAfter: 118,
    status: "Effective"
  },
  {
    id: "I2",
    type: "Rapid-acting",
    name: "Insulin Aspart",
    dosage: 10,
    unit: "units",
    time: "12:00 PM",
    date: "Today",
    reason: "Pre-meal",
    glucoseBefore: 148,
    glucoseAfter: 152,
    status: "Monitoring"
  },
  {
    id: "I3",
    type: "Long-acting",
    name: "Insulin Glargine",
    dosage: 20,
    unit: "units",
    time: "8:00 AM",
    date: "Today",
    reason: "Basal",
    glucoseBefore: 142,
    glucoseAfter: 128,
    status: "Effective"
  },
  {
    id: "I4",
    type: "Rapid-acting",
    name: "Insulin Aspart",
    dosage: 7,
    unit: "units",
    time: "7:15 AM",
    date: "Today",
    reason: "Pre-meal",
    glucoseBefore: 128,
    glucoseAfter: 142,
    status: "Effective"
  },
  {
    id: "I5",
    type: "Rapid-acting",
    name: "Insulin Aspart",
    dosage: 9,
    unit: "units",
    time: "6:30 PM",
    date: "Yesterday",
    reason: "Pre-meal",
    glucoseBefore: 135,
    glucoseAfter: 125,
    status: "Effective"
  }
];

export function PatientAnalytics() {
  const [timeRange, setTimeRange] = useState("24h");
  const [showPredictions, setShowPredictions] = useState(true);

  // Calculate statistics
  const historicalData = glucoseData.filter(d => d.actual !== null);
  const avgGlucose = Math.round(
    historicalData.reduce((sum, d) => sum + (d.actual || 0), 0) / historicalData.length
  );
  const minGlucose = Math.min(...historicalData.map(d => d.actual || Infinity));
  const maxGlucose = Math.max(...historicalData.map(d => d.actual || 0));
  const currentGlucose = glucoseData.find(d => d.time === "Now")?.actual || 118;

  // Determine risk level
  const getRiskLevel = () => {
    if (avgGlucose < 70 || avgGlucose > 180) return { level: "High", color: "red" };
    if (avgGlucose < 80 || avgGlucose > 160) return { level: "Moderate", color: "orange" };
    return { level: "Low", color: "green" };
  };

  const riskLevel = getRiskLevel();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-1">{payload[0].payload.time}</p>
          {payload[0].value && (
            <p className="text-sm text-blue-600">
              Actual: <span className="font-medium">{payload[0].value} mg/dL</span>
            </p>
          )}
          {payload[1]?.value && (
            <p className="text-sm text-purple-600">
              Predicted: <span className="font-medium">{payload[1].value} mg/dL</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2" style={{ fontSize: "2rem" }}>Patient Analytics</h1>
        <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
          Comprehensive glucose tracking and insights
        </p>
      </motion.div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`bg-${riskLevel.color}-50 border-2 border-${riskLevel.color}-200 rounded-2xl p-6`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 bg-${riskLevel.color}-100 rounded-xl flex items-center justify-center`}>
              <AlertTriangle className={`w-6 h-6 text-${riskLevel.color}-600`} />
            </div>
            <p className="text-gray-700 font-medium">Risk Level</p>
          </div>
          <p className={`text-3xl font-medium text-${riskLevel.color}-600`}>{riskLevel.level}</p>
          <p className="text-sm text-gray-600 mt-1">Based on 24h average</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border-2 border-blue-200 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-700 font-medium">Average Glucose</p>
          </div>
          <p className="text-3xl font-medium text-blue-600">{avgGlucose}</p>
          <p className="text-sm text-gray-600 mt-1">mg/dL (24h avg)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white border-2 border-purple-200 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-gray-700 font-medium">Glucose Range</p>
          </div>
          <p className="text-3xl font-medium text-purple-600">{minGlucose}-{maxGlucose}</p>
          <p className="text-sm text-gray-600 mt-1">mg/dL (24h range)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white border-2 border-orange-200 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-gray-700 font-medium">Last Alert</p>
          </div>
          <p className="text-2xl font-medium text-orange-600">Post-meal</p>
          <p className="text-sm text-gray-600 mt-1">2 hours ago</p>
        </motion.div>
      </div>

      {/* Glucose Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900 mb-2" style={{ fontSize: "1.5rem" }}>
              Glucose Trend & AI Predictions
            </h2>
            <p className="text-gray-600">Historical data with predictive analytics</p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setShowPredictions(!showPredictions)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-colors ${
                showPredictions
                  ? "bg-purple-50 border-purple-200 text-purple-700"
                  : "bg-gray-50 border-gray-200 text-gray-700"
              }`}
            >
              <Brain className="w-4 h-4" />
              AI Predictions
            </button>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={glucoseData}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[50, 220]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Target range lines */}
              <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" label="Low" />
              <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="3 3" label="High" />
              
              {/* Actual glucose */}
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#actualGradient)"
                name="Actual Glucose"
                connectNulls={false}
              />
              
              {/* Predicted glucose */}
              {showPredictions && (
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#a855f7"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  fill="url(#predictedGradient)"
                  name="AI Prediction"
                  connectNulls={true}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Actual Glucose</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-gray-600">AI Prediction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-red-500"></div>
            <span className="text-gray-600">Low Threshold (70)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-orange-500"></div>
            <span className="text-gray-600">High Threshold (180)</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meal Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Apple className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-gray-900" style={{ fontSize: "1.5rem" }}>Meal Logs</h2>
              <p className="text-gray-600 text-sm">Recent meals and glucose impact</p>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mealLogs.map((meal, index) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{meal.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{meal.type}</h3>
                      <p className="text-sm text-gray-600">{meal.date} • {meal.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{meal.carbs}g carbs</p>
                    <p className="text-xs text-gray-600">{meal.calories} cal</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {meal.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white rounded-lg text-xs text-gray-700 border border-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Pre: <span className="font-medium text-gray-900">{meal.preGlucose}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-600">
                      Post: <span className="font-medium text-gray-900">{meal.postGlucose}</span>
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    meal.postGlucose - meal.preGlucose < 40 
                      ? "bg-green-100 text-green-700" 
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    +{meal.postGlucose - meal.preGlucose} mg/dL
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insulin Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Droplet className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-900" style={{ fontSize: "1.5rem" }}>Insulin Logs</h2>
              <p className="text-gray-600 text-sm">Dosage history and effectiveness</p>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {insulinLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{log.name}</h3>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                        {log.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{log.date} • {log.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-medium text-blue-600">{log.dosage}</p>
                    <p className="text-xs text-gray-600">{log.unit}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                    <Calendar className="w-3 h-3" />
                    {log.reason}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-blue-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Before: <span className="font-medium text-gray-900">{log.glucoseBefore}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {log.glucoseBefore > log.glucoseAfter ? (
                      <TrendingDown className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      After: <span className="font-medium text-gray-900">{log.glucoseAfter}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {log.status === "Effective" && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        {log.status}
                      </span>
                    )}
                    {log.status === "Monitoring" && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium">
                        <Clock className="w-3 h-3" />
                        {log.status}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}