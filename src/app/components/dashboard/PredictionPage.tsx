import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { TrendingUp, Brain, AlertCircle, Activity } from "lucide-react";

// Mock data combining historical and predicted glucose values
const predictionData = [
  // Historical data (last 6 hours)
  { time: "6h ago", actual: 92, predicted: null, isHistorical: true },
  { time: "5h ago", actual: 98, predicted: null, isHistorical: true },
  { time: "4h ago", actual: 105, predicted: null, isHistorical: true },
  { time: "3h ago", actual: 145, predicted: null, isHistorical: true },
  { time: "2h ago", actual: 130, predicted: null, isHistorical: true },
  { time: "1h ago", actual: 110, predicted: null, isHistorical: true },
  // Current time
  { time: "Now", actual: 118, predicted: 118, isHistorical: false },
  // Future predictions
  { time: "+30m", actual: null, predicted: 125, isHistorical: false },
  { time: "+1h", actual: null, predicted: 132, isHistorical: false },
  { time: "+1.5h", actual: null, predicted: 138, isHistorical: false },
  { time: "+2h", actual: null, predicted: 142, isHistorical: false },
  { time: "+2.5h", actual: null, predicted: 145, isHistorical: false },
  { time: "+3h", actual: null, predicted: 147, isHistorical: false },
  { time: "+3.5h", actual: null, predicted: 148, isHistorical: false },
  { time: "+4h", actual: null, predicted: 149, isHistorical: false },
];

// Current glucose and predictions
const currentGlucose = 118;
const prediction2h = 142;
const prediction4h = 149;
const riskLevel = "Moderate";

const riskConfig = {
  Low: {
    color: "bg-green-100 text-green-700 border-green-200",
    dotColor: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    iconColor: "text-green-600",
  },
  Moderate: {
    color: "bg-orange-100 text-orange-700 border-orange-200",
    dotColor: "bg-orange-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    iconColor: "text-orange-600",
  },
  High: {
    color: "bg-red-100 text-red-700 border-red-200",
    dotColor: "bg-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    iconColor: "text-red-600",
  },
};

const currentRiskConfig = riskConfig[riskLevel as keyof typeof riskConfig];

export function PredictionPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2" style={{ fontSize: "2rem" }}>AI Glucose Predictions</h1>
        <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
          Time-series forecasting of your glucose levels
        </p>
      </motion.div>

      {/* Prediction Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: 2-Hour Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">In 2 Hours</h3>
              <p className="text-gray-500 text-xs">AI Prediction</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl text-gray-900 font-medium">{prediction2h}</span>
            <span className="text-gray-600">mg/dL</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 rounded-full h-2 transition-all"
                style={{ width: `${(prediction2h / 200) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {prediction2h > currentGlucose ? "↑" : "↓"} 
              {Math.abs(prediction2h - currentGlucose)} mg/dL
            </span>
          </div>
        </motion.div>

        {/* Card 2: 4-Hour Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">In 4 Hours</h3>
              <p className="text-gray-500 text-xs">AI Prediction</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl text-gray-900 font-medium">{prediction4h}</span>
            <span className="text-gray-600">mg/dL</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 rounded-full h-2 transition-all"
                style={{ width: `${(prediction4h / 200) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {prediction4h > currentGlucose ? "↑" : "↓"} 
              {Math.abs(prediction4h - currentGlucose)} mg/dL
            </span>
          </div>
        </motion.div>

        {/* Card 3: Risk Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`bg-white border-2 ${currentRiskConfig.color.split(' ')[2]} rounded-3xl p-6 shadow-sm`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 ${currentRiskConfig.bgColor} rounded-xl flex items-center justify-center`}>
              <AlertCircle className={`w-6 h-6 ${currentRiskConfig.iconColor}`} />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Risk Level</h3>
              <p className="text-gray-500 text-xs">Next 4 Hours</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${currentRiskConfig.dotColor} animate-pulse`} />
            <span className="text-3xl text-gray-900 font-medium">{riskLevel}</span>
          </div>
          <div className="mt-4 space-y-2">
            {["Low", "Moderate", "High"].map((level) => (
              <div key={level} className="flex items-center gap-2">
                <div 
                  className={`flex-1 h-2 rounded-full transition-all ${
                    level === riskLevel 
                      ? riskConfig[level as keyof typeof riskConfig].dotColor 
                      : "bg-gray-200"
                  }`} 
                />
                <span className="text-xs text-gray-500 w-16">{level}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Prediction Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
      >
        <div className="mb-6">
          <h2 className="text-gray-900 mb-2" style={{ fontSize: "1.5rem" }}>
            Glucose Prediction Timeline
          </h2>
          <p className="text-gray-600 text-sm">
            Historical data and AI-powered predictions for the next 4 hours
          </p>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              style={{ fontSize: "0.875rem" }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: "0.875rem" }}
              label={{ 
                value: 'Glucose (mg/dL)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fontSize: '0.875rem' } 
              }}
              domain={[70, 180]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "white",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px",
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: "0.875rem", paddingTop: "20px" }}
            />
            
            {/* Normal range reference lines */}
            <ReferenceLine 
              y={70} 
              stroke="#ef4444" 
              strokeDasharray="3 3" 
              label={{ value: "Low", position: "right", fill: "#ef4444", fontSize: 12 }}
            />
            <ReferenceLine 
              y={140} 
              stroke="#f59e0b" 
              strokeDasharray="3 3" 
              label={{ value: "Target", position: "right", fill: "#f59e0b", fontSize: 12 }}
            />

            {/* Current time marker */}
            <ReferenceLine 
              x="Now" 
              stroke="#3b82f6" 
              strokeDasharray="5 5"
              label={{ value: "Current", position: "top", fill: "#3b82f6", fontSize: 12 }}
            />

            {/* Actual glucose line (historical) */}
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ fill: "#2563eb", r: 5 }}
              activeDot={{ r: 7 }}
              name="Current Glucose"
              connectNulls={false}
            />
            
            {/* Predicted glucose line */}
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#10b981" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: "#10b981", r: 5 }}
              activeDot={{ r: 7 }}
              name="AI Prediction"
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Chart Legend */}
        <div className="mt-6 flex flex-wrap gap-6 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-600 rounded" />
            <span className="text-gray-600">Current Glucose</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-green-500 rounded" style={{ backgroundImage: "linear-gradient(to right, #10b981 50%, transparent 50%)", backgroundSize: "8px 100%" }} />
            <span className="text-gray-600">AI Prediction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-red-400 rounded" style={{ backgroundImage: "linear-gradient(to right, #ef4444 50%, transparent 50%)", backgroundSize: "4px 100%" }} />
            <span className="text-gray-600">Low Threshold (70)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-orange-400 rounded" style={{ backgroundImage: "linear-gradient(to right, #f59e0b 50%, transparent 50%)", backgroundSize: "4px 100%" }} />
            <span className="text-gray-600">Target Range (140)</span>
          </div>
        </div>
      </motion.div>

      {/* AI Explanation Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white border-2 border-blue-200 rounded-3xl p-8 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900 mb-3" style={{ fontSize: "1.5rem" }}>
              AI Prediction Explanation
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-2xl p-4">
                <h3 className="text-blue-900 font-medium mb-2">Why is your glucose predicted to rise?</h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Your glucose may increase in the next 2 hours due to recent carbohydrate intake. 
                  Based on your meal log from 45 minutes ago (estimated 60g carbs), we predict a gradual 
                  rise peaking around 149 mg/dL in 4 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h4 className="text-gray-900 font-medium mb-2 text-sm">Influencing Factors</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Recent meal: 60g carbohydrates
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Last insulin dose: 3.5 hours ago
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Activity level: Sedentary
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Time of day: Post-lunch
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-2xl p-4">
                  <h4 className="text-green-900 font-medium mb-2 text-sm">Recommended Actions</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                      Monitor glucose in 1-2 hours
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                      Consider light activity (10-15 min walk)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                      Stay hydrated
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                      Avoid additional carbs for 2 hours
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-2 border-gray-200 rounded-2xl p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-gray-900 font-medium mb-1 text-sm">Model Confidence</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      This prediction has an 87% confidence level based on your historical patterns. 
                      Actual glucose levels may vary based on factors like stress, illness, or unexpected activity. 
                      Always verify with a glucose meter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
