import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Filter,
  TrendingDown,
  TrendingUp,
  Activity,
  Bell,
  X
} from "lucide-react";
import { Button } from "../ui/button";

type AlertSeverity = "low" | "moderate" | "critical";
type AlertStatus = "active" | "resolved";
type AlertType = "low-glucose" | "high-glucose" | "missed-reading" | "pattern-detected" | "medication-reminder";

interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  message: string;
  timestamp: string;
  timeAgo: string;
  recommendedActions: string[];
  glucoseValue?: number;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "low-glucose",
    severity: "critical",
    status: "active",
    title: "Critical: Low Glucose Alert",
    message: "Glucose dropped below 70 mg/dL",
    timestamp: "Mar 10, 2026 at 2:45 PM",
    timeAgo: "5 min ago",
    glucoseValue: 62,
    recommendedActions: [
      "Consume 15g of fast-acting carbs immediately",
      "Recheck glucose in 15 minutes",
      "Do not exercise until glucose normalizes",
      "Contact your doctor if symptoms persist"
    ]
  },
  {
    id: "2",
    type: "high-glucose",
    severity: "moderate",
    status: "active",
    title: "Moderate: High Glucose Level",
    message: "Glucose exceeded 180 mg/dL after meal",
    timestamp: "Mar 10, 2026 at 1:30 PM",
    timeAgo: "1 hour ago",
    glucoseValue: 195,
    recommendedActions: [
      "Drink plenty of water",
      "Consider light physical activity",
      "Monitor glucose levels closely",
      "Review your meal plan with your dietitian"
    ]
  },
  {
    id: "3",
    type: "pattern-detected",
    severity: "moderate",
    status: "active",
    title: "Pattern Detected: Morning Spikes",
    message: "Consistent high glucose readings detected in the morning over the past 3 days",
    timestamp: "Mar 10, 2026 at 8:00 AM",
    timeAgo: "6 hours ago",
    recommendedActions: [
      "Review your evening meal timing",
      "Check basal insulin dosage with your doctor",
      "Consider reducing dinner carbohydrates",
      "Monitor overnight glucose levels"
    ]
  },
  {
    id: "4",
    type: "missed-reading",
    severity: "low",
    status: "active",
    title: "Reminder: Missed Glucose Reading",
    message: "You haven't logged your post-breakfast glucose",
    timestamp: "Mar 10, 2026 at 10:00 AM",
    timeAgo: "4 hours ago",
    recommendedActions: [
      "Log your glucose reading now",
      "Set up automatic reminders",
      "Maintain consistent monitoring schedule"
    ]
  },
  {
    id: "5",
    type: "medication-reminder",
    severity: "low",
    status: "active",
    title: "Medication Reminder",
    message: "Time to take your evening insulin dose",
    timestamp: "Mar 9, 2026 at 7:00 PM",
    timeAgo: "Yesterday",
    recommendedActions: [
      "Take insulin as prescribed",
      "Log medication in your tracker",
      "Ensure proper storage of medication"
    ]
  },
  {
    id: "6",
    type: "high-glucose",
    severity: "critical",
    status: "resolved",
    title: "Critical: Severe Hyperglycemia",
    message: "Glucose reached 250 mg/dL - Action taken",
    timestamp: "Mar 9, 2026 at 3:15 PM",
    timeAgo: "Yesterday",
    glucoseValue: 250,
    recommendedActions: [
      "Corrective insulin administered",
      "Glucose normalized after 2 hours",
      "Continue monitoring for next 24 hours"
    ]
  },
  {
    id: "7",
    type: "low-glucose",
    severity: "moderate",
    status: "resolved",
    title: "Low Glucose Warning - Resolved",
    message: "Glucose was 68 mg/dL, now normalized",
    timestamp: "Mar 9, 2026 at 11:30 AM",
    timeAgo: "Yesterday",
    glucoseValue: 68,
    recommendedActions: [
      "Fast-acting carbs consumed",
      "Glucose returned to normal range",
      "No further action needed"
    ]
  }
];

const severityConfig = {
  low: {
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    dotColor: "bg-blue-500",
    icon: AlertCircle,
    label: "Low"
  },
  moderate: {
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    dotColor: "bg-orange-500",
    icon: AlertTriangle,
    label: "Moderate"
  },
  critical: {
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    dotColor: "bg-red-500",
    icon: AlertTriangle,
    label: "Critical"
  }
};

const alertTypeIcons = {
  "low-glucose": TrendingDown,
  "high-glucose": TrendingUp,
  "missed-reading": Clock,
  "pattern-detected": Activity,
  "medication-reminder": Bell
};

export function AlertCenterPage() {
  const [filterType, setFilterType] = useState<"all" | "critical" | "recent" | "resolved">("all");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filterAlerts = (alerts: Alert[]) => {
    switch (filterType) {
      case "critical":
        return alerts.filter(alert => alert.severity === "critical");
      case "recent":
        return alerts.filter(alert => alert.status === "active").slice(0, 5);
      case "resolved":
        return alerts.filter(alert => alert.status === "resolved");
      default:
        return alerts;
    }
  };

  const filteredAlerts = filterAlerts(mockAlerts);

  const activeAlerts = mockAlerts.filter(a => a.status === "active").length;
  const criticalAlerts = mockAlerts.filter(a => a.severity === "critical" && a.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2" style={{ fontSize: "2rem" }}>Health Alert Center</h1>
        <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
          Monitor and manage your glucose alerts and notifications
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Active Alerts</h3>
            </div>
          </div>
          <p className="text-4xl text-gray-900 font-medium">{activeAlerts}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border-2 border-red-200 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Critical Alerts</h3>
            </div>
          </div>
          <p className="text-4xl text-gray-900 font-medium">{criticalAlerts}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white border-2 border-green-200 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Resolved Today</h3>
            </div>
          </div>
          <p className="text-4xl text-gray-900 font-medium">
            {mockAlerts.filter(a => a.status === "resolved" && a.timeAgo.includes("Yesterday")).length}
          </p>
        </motion.div>
      </div>

      {/* Alert Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900 font-medium" style={{ fontSize: "1.125rem" }}>
            Filter Alerts
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { id: "all", label: "All Alerts", count: mockAlerts.length },
            { id: "critical", label: "Critical Only", count: mockAlerts.filter(a => a.severity === "critical").length },
            { id: "recent", label: "Recent", count: 5 },
            { id: "resolved", label: "Resolved", count: mockAlerts.filter(a => a.status === "resolved").length }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterType(filter.id as typeof filterType)}
              className={`
                px-4 py-2 rounded-xl border-2 transition-all text-sm font-medium
                ${filterType === filter.id
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {filter.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                filterType === filter.id ? "bg-blue-200" : "bg-gray-200"
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts List */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-gray-900 mb-4" style={{ fontSize: "1.5rem" }}>
              {filterType === "all" ? "All Alerts" : 
               filterType === "critical" ? "Critical Alerts" :
               filterType === "recent" ? "Recent Alerts" :
               "Resolved Alerts"}
            </h2>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredAlerts.map((alert, index) => {
                  const config = severityConfig[alert.severity];
                  const SeverityIcon = config.icon;
                  const TypeIcon = alertTypeIcons[alert.type];

                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className={`
                        bg-white border-2 ${config.borderColor} rounded-3xl p-6 shadow-sm
                        hover:shadow-md transition-shadow cursor-pointer
                        ${alert.status === "resolved" ? "opacity-60" : ""}
                      `}
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <TypeIcon className={`w-6 h-6 ${config.color}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-gray-900 font-medium" style={{ fontSize: "1.125rem" }}>
                              {alert.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className={`w-2 h-2 rounded-full ${config.dotColor} ${alert.status === "active" ? "animate-pulse" : ""}`} />
                              <span className={`text-sm font-medium ${config.color}`}>
                                {config.label}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-3">{alert.message}</p>

                          {alert.glucoseValue && (
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bgColor} mb-3`}>
                              <Activity className={`w-4 h-4 ${config.color}`} />
                              <span className={`text-sm font-medium ${config.color}`}>
                                {alert.glucoseValue} mg/dL
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{alert.timeAgo}</span>
                            </div>
                            {alert.status === "resolved" && (
                              <div className="flex items-center gap-1 text-green-700 text-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Resolved</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredAlerts.length === 0 && (
                <div className="bg-white border-2 border-gray-200 rounded-3xl p-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2" style={{ fontSize: "1.25rem" }}>
                    No Alerts Found
                  </h3>
                  <p className="text-gray-600">
                    {filterType === "critical" && "You don't have any critical alerts at the moment."}
                    {filterType === "resolved" && "No resolved alerts to display."}
                    {filterType === "recent" && "No recent alerts available."}
                    {filterType === "all" && "You're all caught up!"}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Alert Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm"
        >
          <h3 className="text-gray-900 mb-6 font-medium" style={{ fontSize: "1.25rem" }}>
            Alert Timeline
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

            {/* Timeline Items */}
            <div className="space-y-6">
              {mockAlerts.slice(0, 6).map((alert) => {
                const config = severityConfig[alert.severity];
                
                return (
                  <div key={alert.id} className="relative flex gap-4">
                    {/* Timeline Dot */}
                    <div className={`w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-white relative z-10`}>
                      <div className={`w-3 h-3 rounded-full ${config.dotColor}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <p className="text-gray-900 font-medium text-sm mb-1">
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Alert
                      </p>
                      <p className="text-gray-600 text-xs mb-1">
                        {alert.message.substring(0, 50)}...
                      </p>
                      <p className="text-gray-500 text-xs">{alert.timeAgo}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAlert(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-14 h-14 ${severityConfig[selectedAlert.severity].bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {(() => {
                      const TypeIcon = alertTypeIcons[selectedAlert.type];
                      return <TypeIcon className={`w-7 h-7 ${severityConfig[selectedAlert.severity].color}`} />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${severityConfig[selectedAlert.severity].dotColor} ${selectedAlert.status === "active" ? "animate-pulse" : ""}`} />
                      <span className={`text-sm font-medium ${severityConfig[selectedAlert.severity].color}`}>
                        {severityConfig[selectedAlert.severity].label} Severity
                      </span>
                    </div>
                    <h2 className="text-gray-900 mb-2" style={{ fontSize: "1.5rem" }}>
                      {selectedAlert.title}
                    </h2>
                    <p className="text-gray-600">{selectedAlert.message}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Alert Details */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Time Triggered</p>
                    <p className="text-gray-900 font-medium">{selectedAlert.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      {selectedAlert.status === "resolved" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-green-700 font-medium">Resolved</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <span className="text-orange-700 font-medium">Active</span>
                        </>
                      )}
                    </div>
                  </div>
                  {selectedAlert.glucoseValue && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600 mb-1">Glucose Reading</p>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${severityConfig[selectedAlert.severity].bgColor}`}>
                        <Activity className={`w-5 h-5 ${severityConfig[selectedAlert.severity].color}`} />
                        <span className={`text-xl font-medium ${severityConfig[selectedAlert.severity].color}`}>
                          {selectedAlert.glucoseValue} mg/dL
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommended Actions */}
              <div>
                <h3 className="text-gray-900 font-medium mb-4" style={{ fontSize: "1.125rem" }}>
                  Recommended Actions
                </h3>
                <div className="space-y-3">
                  {selectedAlert.recommendedActions.map((action, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                        {index + 1}
                      </div>
                      <p className="text-blue-900 text-sm leading-relaxed pt-0.5">{action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {selectedAlert.status === "active" && (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => setSelectedAlert(null)}
                    className="bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 rounded-2xl py-3"
                  >
                    Dismiss
                  </Button>
                  <Button
                    onClick={() => setSelectedAlert(null)}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3"
                  >
                    Mark as Resolved
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
