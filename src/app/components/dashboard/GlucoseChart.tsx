import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data for glucose history (last 24 hours with AI predictions)
const glucoseData = [
  { time: "12 AM", glucose: 105, predicted: null },
  { time: "2 AM", glucose: 98, predicted: null },
  { time: "4 AM", glucose: 92, predicted: null },
  { time: "6 AM", glucose: 95, predicted: null },
  { time: "8 AM", glucose: 120, predicted: null },
  { time: "10 AM", glucose: 105, predicted: null },
  { time: "12 PM", glucose: 145, predicted: null },
  { time: "2 PM", glucose: 130, predicted: null },
  { time: "4 PM", glucose: 110, predicted: null },
  { time: "6 PM", glucose: 155, predicted: null },
  { time: "8 PM", glucose: 125, predicted: null },
  { time: "10 PM", glucose: 100, predicted: null },
  // Current time marker
  { time: "Now", glucose: 100, predicted: 100 },
  // AI Predictions for next hours
  { time: "+2h", glucose: null, predicted: 135 },
  { time: "+4h", glucose: null, predicted: 142 },
];

export function GlucoseChart() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-gray-900 mb-1" style={{ fontSize: "1.25rem" }}>
          Glucose Trend Chart
        </h3>
        <p className="text-gray-600 text-sm">Last 24 hours with AI predictions</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={glucoseData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            style={{ fontSize: "0.875rem" }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: "0.875rem" }}
            label={{ value: 'mg/dL', angle: -90, position: 'insideLeft', style: { fontSize: '0.875rem' } }}
            domain={[70, 170]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "white",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              padding: "8px 12px",
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: "0.875rem" }}
          />
          {/* Actual glucose values */}
          <Line 
            type="monotone" 
            dataKey="glucose" 
            stroke="#2563eb" 
            strokeWidth={3}
            dot={{ fill: "#2563eb", r: 4 }}
            activeDot={{ r: 6 }}
            name="Actual"
            connectNulls={false}
          />
          {/* AI Predicted values */}
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="#10b981" 
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
            name="AI Predicted"
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Reference ranges */}
      <div className="mt-4 flex gap-6 justify-center text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <span className="text-gray-600">Normal Range (70-140 mg/dL)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-600" />
          <span className="text-gray-600">Your Levels</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-600">AI Predictions</span>
        </div>
      </div>
    </div>
  );
}