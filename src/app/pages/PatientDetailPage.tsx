import { useState } from "react";
import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  User,
  FileText,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  RefreshCcw,
  Bell,
  Activity,
} from "lucide-react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart,
  ReferenceLine
} from "recharts";

// Glucose data with AI predictions
const glucoseData = [
  // Historical data
  { time: "08 AM", actual: 128, predicted: null },
  { time: "10 AM", actual: 165, predicted: null },
  { time: "12 PM", actual: 185, predicted: null },
  { time: "02 PM", actual: 152, predicted: null },
  { time: "04 PM", actual: 138, predicted: null },
  { time: "06 PM (NOW)", actual: 165, predicted: 165 },
  // AI predictions
  { time: "10:00 PM (EST)", actual: null, predicted: 178 },
  { time: "12:00 AM (EST)", actual: null, predicted: 185 },
];

// Today's meal history
const todayMeals = [
  {
    id: "M1",
    name: "Oatmeal with blueberries",
    calories: 320,
    carbs: 45,
    time: "08:15 AM"
  },
  {
    id: "M2",
    name: "Grilled chicken salad",
    calories: 420,
    carbs: 12,
    time: "12:45 PM"
  },
  {
    id: "M3",
    name: "Apple with almond butter",
    calories: 180,
    carbs: 25,
    time: "03:30 PM"
  },
  {
    id: "M4",
    name: "Baked salmon & quinoa",
    calories: 580,
    carbs: 38,
    time: "07:15 PM"
  }
];

// Mock patient data
const patientData: Record<string, any> = {
  "1": {
    id: "1",
    name: "John Doe",
    age: 45,
    gender: "M/M",
    weight: "28.5",
    diabetesType: "Type 2 Diabetes",
    riskLevel: "High Risk",
    glucoseLevel: "165 mg/dL",
    
    // Current Status
    currentGlucose: 165,
    glucoseChange: "-2%",
    glucose24hAvg: 142,
    glucoseStatus: "Within stable range",
    aiPredict2h: 178,
    aiPredict2hConfidence: 94,
    aiPredict4h: 185,
    aiPredict4hStatus: "Threshold Alert"
  }
};

// Add more mock patients
for (let i = 2; i <= 12; i++) {
  patientData[i.toString()] = {
    ...patientData["1"],
    id: i.toString(),
    name: `Patient ${i}`,
    currentGlucose: 100 + i * 10,
    riskLevel: i % 3 === 0 ? "High Risk" : "Moderate Risk"
  };
}

export function PatientDetailPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"historical" | "ai-predict">("historical");

  const patient = patientData[patientId || "1"];

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Patient not found</h1>
          <button
            onClick={() => navigate("/dashboard/doctor")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-1">{payload[0].payload.time}</p>
          {payload[0].value && (
            <p className="text-sm text-blue-600">
              {payload[0].value} mg/dL
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-6">
          <button
            onClick={() => navigate("/dashboard/doctor")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Patients
          </button>

          <div className="flex items-start justify-between">
            {/* Patient Name and Info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-gray-900 text-2xl font-semibold">{patient.name}</h1>
                <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {patient.riskLevel}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{patient.age} yrs</span>
                </div>
                <span>{patient.gender}</span>
                <span>{patient.weight}</span>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  <span>{patient.diabetesType}</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 font-medium">
                  <Activity className="w-4 h-4" />
                  <span>{patient.glucoseLevel}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                <FileText className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Metrics Cards - More Compact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Current Glucose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-xl p-4"
          >
            <p className="text-gray-500 text-xs font-medium mb-2">CURRENT GLUCOSE</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold text-gray-900">{patient.currentGlucose}</p>
                <p className="text-sm text-gray-600">mg/dL</p>
                <p className="text-xs text-red-600 mt-1">{patient.glucoseChange} from last hour</p>
              </div>
              <TrendingDown className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          {/* 24H Average */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-xl p-4"
          >
            <p className="text-gray-500 text-xs font-medium mb-2">24H AVERAGE</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold text-gray-900">{patient.glucose24hAvg}</p>
                <p className="text-sm text-gray-600">mg/dL</p>
                <p className="text-xs text-green-600 mt-1">{patient.glucoseStatus}</p>
              </div>
              <RefreshCcw className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          {/* AI Predict (2H) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-blue-200 rounded-xl p-4"
          >
            <p className="text-blue-600 text-xs font-medium mb-2">AI PREDICT (2H)</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold text-blue-600">{patient.aiPredict2h}</p>
                <p className="text-sm text-gray-600">mg/dL</p>
                <p className="text-xs text-gray-600 mt-1">Confidence: {patient.aiPredict2hConfidence}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          {/* AI Predict (4H) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border border-red-200 rounded-xl p-4"
          >
            <p className="text-blue-600 text-xs font-medium mb-2">AI PREDICT (4H)</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold text-red-600">{patient.aiPredict4h}</p>
                <p className="text-sm text-gray-600">mg/dL</p>
                <p className="text-xs text-red-600 mt-1">{patient.aiPredict4hStatus}</p>
              </div>
              <Bell className="w-8 h-8 text-red-500" />
            </div>
          </motion.div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Wider (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Glucose Trend & Predictions Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-gray-900 font-semibold text-lg mb-1">
                    Glucose Trend & Predictions
                  </h2>
                  <p className="text-gray-500 text-sm">Real-time monitoring with AI prediction</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("historical")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === "historical"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Historical
                  </button>
                  <button
                    onClick={() => setViewMode("ai-predict")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === "ai-predict"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    AI-Predict
                  </button>
                </div>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={glucoseData}>
                    <defs>
                      <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#9ca3af" 
                      style={{ fontSize: "12px" }}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      domain={[50, 220]} 
                      style={{ fontSize: "12px" }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Target range lines */}
                    <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" />
                    <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="3 3" />
                    
                    {/* Actual glucose */}
                    <Area
                      type="monotone"
                      dataKey="actual"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#glucoseGradient)"
                      connectNulls={false}
                    />
                    
                    {/* Predicted glucose */}
                    {viewMode === "ai-predict" && (
                      <Area
                        type="monotone"
                        dataKey="predicted"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fill="url(#glucoseGradient)"
                        connectNulls={true}
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Today's Meal History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900 font-semibold text-lg">
                  Today's Meal History
                </h2>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-gray-500 text-xs font-medium uppercase">FOOD ITEM</th>
                      <th className="text-left py-3 text-gray-500 text-xs font-medium uppercase">CALORIES</th>
                      <th className="text-left py-3 text-gray-500 text-xs font-medium uppercase">CARBS</th>
                      <th className="text-left py-3 text-gray-500 text-xs font-medium uppercase">TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayMeals.map((meal, index) => (
                      <motion.tr
                        key={meal.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="py-3 text-gray-900 text-sm">{meal.name}</td>
                        <td className="py-3 text-gray-600 text-sm">{meal.calories} kcal</td>
                        <td className="py-3 text-gray-600 text-sm">{meal.carbs}g</td>
                        <td className="py-3 text-gray-600 text-sm">{meal.time}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Narrower (1/3) - Risk Analysis */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6"
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h2 className="text-gray-900 font-semibold text-lg">
                  Risk Analysis
                </h2>
              </div>

              {/* Critical Insight */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h3 className="text-red-700 font-semibold mb-2 text-sm">Critical Insight</h3>
                <p className="text-gray-700 text-xs leading-relaxed">
                  The patient is exhibiting patterns consistent with early-stage complications. Recent data suggests immediate intervention.
                </p>
              </div>

              {/* Key Risk Indicators */}
              <div className="mb-6">
                <h3 className="text-gray-500 font-semibold mb-3 text-xs uppercase tracking-wide">KEY RISK INDICATORS</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0 mt-1.5" />
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Frequent nocturnal spikes detected between 2 AM - 6 AM
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0 mt-1.5" />
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Consistent hyperglycemia (&gt;180 mg/dL) post-dinner
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0 mt-1.5" />
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Post-meal glucose spikes relative to exercise levels
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0 mt-1.5" />
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Carbohydrate intake increasing; recommend patient by 22%
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="mb-6">
                <h3 className="text-gray-500 font-semibold mb-3 text-xs uppercase tracking-wide">AI RECOMMENDATIONS</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="text-blue-900 font-semibold text-xs mb-1">Adjust Basal Rate</h4>
                    <p className="text-blue-800 text-xs leading-relaxed">
                      Increase basal by 1.5 units to counteract post-meal elevation
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="text-blue-900 font-semibold text-xs mb-1">Continuous Monitoring</h4>
                    <p className="text-blue-800 text-xs leading-relaxed">
                      Set alert snapshots to 70 mg/dL for the next 48 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Log Clinical Note Button */}
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                Log Clinical Note
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}