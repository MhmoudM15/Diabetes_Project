import { useState } from "react";
import { motion } from "motion/react";
import { 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Activity,
  Clock,
  Filter,
  Eye,
  MessageSquare,
  CheckCircle,
  Search,
  AlertCircle,
  X
} from "lucide-react";
import { useNavigate } from "react-router";

interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  alertType: "Hypoglycemia" | "Hyperglycemia" | "Prediction Risk" | "Missed Reading" | "Medication Non-Adherence";
  severity: "Critical" | "High" | "Medium";
  value: string;
  time: string;
  timestamp: Date;
  status: "New" | "Viewed" | "Resolved";
  description: string;
}

const mockAlerts: Alert[] = [
  {
    id: "A001",
    patientId: "1",
    patientName: "Sarah Johnson",
    patientAge: 45,
    alertType: "Hypoglycemia",
    severity: "Critical",
    value: "52 mg/dL",
    time: "5 min ago",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: "New",
    description: "Severe hypoglycemia detected. Immediate attention required."
  },
  {
    id: "A002",
    patientId: "2",
    patientName: "Michael Chen",
    patientAge: 38,
    alertType: "Hyperglycemia",
    severity: "Critical",
    value: "285 mg/dL",
    time: "12 min ago",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    status: "New",
    description: "Glucose level significantly elevated. Risk of complications."
  },
  {
    id: "A003",
    patientId: "8",
    patientName: "William Brown",
    patientAge: 67,
    alertType: "Prediction Risk",
    severity: "High",
    value: "85% risk",
    time: "30 min ago",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    status: "Viewed",
    description: "AI prediction shows high risk of hyperglycemia in next 4 hours."
  },
  {
    id: "A004",
    patientId: "4",
    patientName: "David Thompson",
    patientAge: 61,
    alertType: "Hyperglycemia",
    severity: "High",
    value: "210 mg/dL",
    time: "1 hour ago",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    status: "Viewed",
    description: "Persistent hyperglycemia. Consider treatment adjustment."
  },
  {
    id: "A005",
    patientId: "3",
    patientName: "Emily Rodriguez",
    patientAge: 52,
    alertType: "Missed Reading",
    severity: "Medium",
    value: "6 hours",
    time: "1 hour ago",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    status: "New",
    description: "No glucose readings in the past 6 hours."
  },
  {
    id: "A006",
    patientId: "10",
    patientName: "Christopher Davis",
    patientAge: 58,
    alertType: "Prediction Risk",
    severity: "High",
    value: "78% risk",
    time: "2 hours ago",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "Viewed",
    description: "AI prediction indicates potential glucose spike after meal."
  },
  {
    id: "A007",
    patientId: "7",
    patientName: "Jennifer Lee",
    patientAge: 42,
    alertType: "Hypoglycemia",
    severity: "High",
    value: "65 mg/dL",
    time: "2 hours ago",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "Resolved",
    description: "Low glucose level. Patient notified."
  },
  {
    id: "A008",
    patientId: "5",
    patientName: "Lisa Anderson",
    patientAge: 29,
    alertType: "Medication Non-Adherence",
    severity: "Medium",
    value: "65%",
    time: "3 hours ago",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    status: "New",
    description: "Medication adherence dropped below 70% this week."
  },
  {
    id: "A009",
    patientId: "9",
    patientName: "Amanda White",
    patientAge: 33,
    alertType: "Hyperglycemia",
    severity: "Medium",
    value: "195 mg/dL",
    time: "4 hours ago",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: "Resolved",
    description: "Elevated glucose after meal. Within expected range."
  },
  {
    id: "A010",
    patientId: "6",
    patientName: "Robert Martinez",
    patientAge: 55,
    alertType: "Prediction Risk",
    severity: "Medium",
    value: "62% risk",
    time: "5 hours ago",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    status: "Resolved",
    description: "Moderate risk of nocturnal hypoglycemia."
  }
];

export function CriticalAlertsPage() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("active"); // active = new + viewed
  const [selectedAlerts, setSelectedAlerts] = useState<Set<string>>(new Set());
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState<Alert | null>(null);

  // Filter alerts
  const filteredAlerts = alerts
    .filter(alert => {
      const matchesSearch = alert.patientName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = severityFilter === "all" || alert.severity.toLowerCase() === severityFilter.toLowerCase();
      const matchesStatus = 
        statusFilter === "all" || 
        (statusFilter === "active" && (alert.status === "New" || alert.status === "Viewed")) ||
        alert.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesSeverity && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by severity first (Critical > High > Medium)
      const severityOrder = { "Critical": 0, "High": 1, "Medium": 2 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      // Then by timestamp (newest first)
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

  const getSeverityStyles = (severity: Alert["severity"]) => {
    switch (severity) {
      case "Critical":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          border: "border-red-300",
          icon: "text-red-600"
        };
      case "High":
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          border: "border-orange-300",
          icon: "text-orange-600"
        };
      case "Medium":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          border: "border-yellow-300",
          icon: "text-yellow-600"
        };
    }
  };

  const getAlertIcon = (type: Alert["alertType"]) => {
    switch (type) {
      case "Hypoglycemia":
        return TrendingDown;
      case "Hyperglycemia":
        return TrendingUp;
      case "Prediction Risk":
        return Activity;
      default:
        return AlertCircle;
    }
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/dashboard/doctor/patient/${patientId}`);
  };

  const handleSendMessage = (alert: Alert) => {
    setMessageRecipient(alert);
    setShowMessageModal(true);
  };

  const handleMarkResolved = (alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, status: "Resolved" as const } : alert
      )
    );
    selectedAlerts.delete(alertId);
    setSelectedAlerts(new Set(selectedAlerts));
  };

  const handleBulkResolve = () => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        selectedAlerts.has(alert.id) ? { ...alert, status: "Resolved" as const } : alert
      )
    );
    setSelectedAlerts(new Set());
  };

  const handleSelectAlert = (alertId: string) => {
    const newSelected = new Set(selectedAlerts);
    if (newSelected.has(alertId)) {
      newSelected.delete(alertId);
    } else {
      newSelected.add(alertId);
    }
    setSelectedAlerts(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedAlerts.size === filteredAlerts.length) {
      setSelectedAlerts(new Set());
    } else {
      setSelectedAlerts(new Set(filteredAlerts.map(a => a.id)));
    }
  };

  const stats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === "Critical" && a.status !== "Resolved").length,
    high: alerts.filter(a => a.severity === "High" && a.status !== "Resolved").length,
    new: alerts.filter(a => a.status === "New").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2" style={{ fontSize: "2rem" }}>Critical Patient Alerts</h1>
        <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
          Monitor and respond to urgent patient notifications
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Alerts</p>
              <p className="text-3xl font-medium text-gray-900 mt-1">{stats.total}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-700 text-sm">Critical</p>
              <p className="text-3xl font-medium text-red-700 mt-1">{stats.critical}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-700 text-sm">High Priority</p>
              <p className="text-3xl font-medium text-orange-700 mt-1">{stats.high}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 text-sm">New Alerts</p>
              <p className="text-3xl font-medium text-blue-700 mt-1">{stats.new}</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border-2 border-gray-200 rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search by patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Severity Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors appearance-none bg-white min-w-[180px]"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors appearance-none bg-white min-w-[160px]"
            >
              <option value="active">Active Only</option>
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="viewed">Viewed</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedAlerts.size > 0 && (
          <div className="mt-4 flex items-center justify-between bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-blue-900 font-medium">
              {selectedAlerts.size} alert{selectedAlerts.size !== 1 ? 's' : ''} selected
            </p>
            <button
              onClick={handleBulkResolve}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Mark All Resolved
            </button>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-gray-600">
            Showing <span className="font-medium text-gray-900">{filteredAlerts.length}</span> of{" "}
            <span className="font-medium text-gray-900">{alerts.length}</span> alerts
          </p>
          {(searchTerm || severityFilter !== "all" || statusFilter !== "active") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSeverityFilter("all");
                setStatusFilter("active");
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </motion.div>

      {/* Alerts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Patient</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Alert Type</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium w-48">Glucose Value</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Severity</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Time</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alert, index) => {
                const styles = getSeverityStyles(alert.severity);
                const Icon = getAlertIcon(alert.alertType);
                const isSelected = selectedAlerts.has(alert.id);

                return (
                  <motion.tr
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className={`
                      border-b border-gray-100 transition-colors hover:bg-gray-50
                      ${alert.status === "Resolved" ? "opacity-60" : ""}
                    `}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {alert.patientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{alert.patientName}</p>
                          <p className="text-sm text-gray-600">{alert.patientAge} years old</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 ${styles.bg} rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${styles.icon}`} />
                        </div>
                        <span className="text-gray-900">{alert.alertType}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      {(alert.alertType === "Hypoglycemia" || alert.alertType === "Hyperglycemia") ? (
                        <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${styles.bg} ${styles.text} border-2 ${styles.border}`}>
                          {alert.value}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500 italic">
                          N/A
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${styles.bg} ${styles.text}`}>
                        {alert.severity}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{alert.time}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {alert.status === "New" && (
                          <>
                            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                            <span className="text-sm font-medium text-blue-600">New</span>
                          </>
                        )}
                        {alert.status === "Viewed" && (
                          <span className="text-sm text-gray-600">Viewed</span>
                        )}
                        {alert.status === "Resolved" && (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600">Resolved</span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewPatient(alert.patientId)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                          title="View Patient"
                        >
                          <Eye className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleSendMessage(alert)}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
                          title="Send Message"
                        >
                          <MessageSquare className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                        </button>
                        {alert.status !== "Resolved" && (
                          <button
                            onClick={() => handleMarkResolved(alert.id)}
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
                            title="Mark Resolved"
                          >
                            <CheckCircle className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredAlerts.length === 0 && (
          <div className="py-12 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
              No alerts found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSeverityFilter("all");
                setStatusFilter("active");
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Message Modal */}
      {showMessageModal && messageRecipient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900" style={{ fontSize: "1.5rem" }}>
                Send Message
              </h3>
              <button
                onClick={() => setShowMessageModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">To:</p>
                <p className="font-medium text-gray-900">{messageRecipient.patientName}</p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-4">
                <p className="text-sm text-blue-700 mb-1">Alert:</p>
                <p className="text-gray-900">{messageRecipient.description}</p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  rows={4}
                  placeholder="Type your message here..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowMessageModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle send message
                  setShowMessageModal(false);
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Send Message
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}