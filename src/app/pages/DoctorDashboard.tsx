import { useState } from "react";
import { motion } from "motion/react";
import { 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  FileText, 
  ClipboardList,
  MessageSquare,
  Menu,
  X,
  User
} from "lucide-react";
import { PatientStats } from "../components/doctor/PatientStats";
import { PatientRiskChart } from "../components/doctor/PatientRiskChart";
import { RecentAlertsPanel } from "../components/doctor/RecentAlertsPanel";
import { PatientManagement } from "../components/doctor/PatientManagement";
import { CriticalAlertsPage } from "../components/doctor/CriticalAlertsPage";
import { PatientAnalytics } from "../components/doctor/PatientAnalytics";
import { ClinicalNotes } from "../components/doctor/ClinicalNotes";
import { AIAssistant } from "../components/doctor/AIAssistant";

export function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "patients", label: "Patients", icon: Users },
    { id: "high-risk", label: "High Risk Alerts", icon: AlertTriangle },
    { id: "clinical-notes", label: "Clinical Notes", icon: ClipboardList },
    { id: "ai-assistant", label: "AI Assistant", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border-2 border-gray-200"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`
          fixed lg:sticky top-0 h-screen bg-white border-r-2 border-gray-200 
          w-64 flex flex-col z-40 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b-2 border-gray-200">
          <h2 className="text-2xl text-blue-600 tracking-tight">Smart Medical AI System</h2>
          <p className="text-sm text-gray-600 mt-1">Doctor Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                      transition-all text-left
                      ${isActive 
                        ? "bg-blue-50 text-blue-600 border-2 border-blue-200" 
                        : "text-gray-700 hover:bg-gray-50 border-2 border-transparent"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t-2 border-gray-200">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
              <p className="text-sm text-gray-600">Endocrinologist</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {activeTab === "dashboard" && (
            <>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h1 className="mb-2" style={{ fontSize: "2rem" }}>Welcome, Dr. Johnson!</h1>
                <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
                  Monitor and manage your patient's diabetes health
                </p>
              </motion.div>

              {/* Patient Statistics Cards */}
              <div className="mb-6">
                <PatientStats />
              </div>

              {/* Charts and Alerts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Patient Risk Chart */}
                <PatientRiskChart />

                {/* Recent Alerts Panel */}
                <RecentAlertsPanel />
              </div>
            </>
          )}

          {/* Patients Tab */}
          {activeTab === "patients" && (
            <PatientManagement />
          )}

          {/* High Risk Alerts Tab */}
          {activeTab === "high-risk" && (
            <CriticalAlertsPage />
          )}

          {/* Clinical Notes Tab */}
          {activeTab === "clinical-notes" && (
            <ClinicalNotes />
          )}

          {/* AI Assistant Tab */}
          {activeTab === "ai-assistant" && (
            <AIAssistant />
          )}

          {/* Placeholder for other tabs */}
          {!["dashboard", "patients", "high-risk", "clinical-notes", "ai-assistant"].includes(activeTab) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border-2 border-gray-200 rounded-3xl p-12 text-center"
            >
              <h2 className="mb-4" style={{ fontSize: "1.875rem" }}>
                {menuItems.find(item => item.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
                This section is coming soon...
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}