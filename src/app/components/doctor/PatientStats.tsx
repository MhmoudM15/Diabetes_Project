import { motion } from "motion/react";
import { Users, AlertTriangle, Bell, TrendingUp } from "lucide-react";

export function PatientStats() {
  const stats = [
    {
      label: "Total Patients",
      value: "127",
      change: "+8 this month",
      icon: Users,
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      label: "High Risk Patients",
      value: "12",
      change: "9.4% of total",
      icon: AlertTriangle,
      color: "red",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      borderColor: "border-red-200"
    },
    {
      label: "Alerts Today",
      value: "23",
      change: "5 critical",
      icon: Bell,
      color: "orange",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200"
    },
    {
      label: "Avg Control Rate",
      value: "78%",
      change: "+3% vs last week",
      icon: TrendingUp,
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-white border-2 ${stat.borderColor} rounded-3xl p-6 shadow-sm`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
            <div>
              <p className={`text-4xl font-medium ${stat.textColor} mb-2`}>
                {stat.value}
              </p>
              <p className="text-gray-900 font-medium mb-1">{stat.label}</p>
              <p className="text-sm text-gray-600">{stat.change}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
