import { motion } from "motion/react";
import { AlertCircle, TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";

interface Alert {
  id: string;
  patientName: string;
  type: "critical" | "warning" | "info";
  message: string;
  value: string;
  time: string;
  status: "new" | "viewed";
}

const alerts: Alert[] = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    type: "critical",
    message: "Severe hypoglycemia detected",
    value: "52 mg/dL",
    time: "5 min ago",
    status: "new"
  },
  {
    id: "2",
    patientName: "Michael Chen",
    type: "critical",
    message: "Hyperglycemia alert",
    value: "285 mg/dL",
    time: "12 min ago",
    status: "new"
  },
  {
    id: "3",
    patientName: "Emily Rodriguez",
    type: "warning",
    message: "Missed glucose reading",
    value: "No data 6hrs",
    time: "1 hour ago",
    status: "viewed"
  },
  {
    id: "4",
    patientName: "David Thompson",
    type: "critical",
    message: "HbA1c threshold exceeded",
    value: "8.2%",
    time: "2 hours ago",
    status: "viewed"
  },
  {
    id: "5",
    patientName: "Lisa Anderson",
    type: "warning",
    message: "Glucose trend concerning",
    value: "Trending up",
    time: "3 hours ago",
    status: "viewed"
  },
  {
    id: "6",
    patientName: "James Wilson",
    type: "info",
    message: "Medication adherence low",
    value: "65% this week",
    time: "4 hours ago",
    status: "viewed"
  }
];

export function RecentAlertsPanel() {
  const getAlertStyles = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-700",
          icon: "text-red-600"
        };
      case "warning":
        return {
          bg: "bg-orange-50",
          border: "border-orange-200",
          text: "text-orange-700",
          icon: "text-orange-600"
        };
      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          icon: "text-blue-600"
        };
    }
  };

  const getAlertIcon = (message: string) => {
    if (message.toLowerCase().includes("trend")) return TrendingUp;
    if (message.toLowerCase().includes("hypo")) return TrendingDown;
    return Activity;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-gray-900" style={{ fontSize: "1.5rem" }}>
              Recent Alerts
            </h3>
            <p className="text-gray-600 text-sm">Critical patient notifications</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-sm font-medium text-red-700">
            {alerts.filter(a => a.status === "new").length} New
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {alerts.map((alert, index) => {
          const styles = getAlertStyles(alert.type);
          const Icon = getAlertIcon(alert.message);

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`
                ${styles.bg} border-2 ${styles.border} rounded-2xl p-4
                ${alert.status === "new" ? "ring-2 ring-offset-2 ring-red-300" : ""}
                hover:shadow-md transition-all cursor-pointer
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${styles.icon}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className={`font-medium ${styles.text}`}>
                        {alert.patientName}
                      </h4>
                      {alert.status === "new" && (
                        <span className="inline-block bg-red-600 text-white text-xs px-2 py-0.5 rounded-full mt-1">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </div>
                  </div>
                  
                  <p className="text-gray-900 text-sm mb-2">{alert.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border ${styles.border}`}>
                      <Activity className={`w-4 h-4 ${styles.icon}`} />
                      <span className={`text-sm font-medium ${styles.text}`}>
                        {alert.value}
                      </span>
                    </div>
                    <button className={`text-sm font-medium ${styles.text} hover:underline`}>
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
