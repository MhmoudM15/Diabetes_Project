import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Activity } from "lucide-react";

const data = [
  { name: "Low Risk", value: 85, color: "#10b981" },
  { name: "Moderate Risk", value: 30, color: "#f59e0b" },
  { name: "High Risk", value: 12, color: "#ef4444" }
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export function PatientRiskChart() {
  const totalPatients = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
          <Activity className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-gray-900" style={{ fontSize: "1.5rem" }}>
            Patient Risk Distribution
          </h3>
          <p className="text-gray-600 text-sm">Overview of patient risk levels</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '8px 12px'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-gray-700">
                  {value} ({entry.payload.value} patients)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.name} className="text-center p-4 bg-gray-50 rounded-2xl">
            <div 
              className="w-4 h-4 rounded-full mx-auto mb-2" 
              style={{ backgroundColor: item.color }}
            />
            <p className="text-2xl font-medium text-gray-900 mb-1">{item.value}</p>
            <p className="text-sm text-gray-600">{item.name}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}