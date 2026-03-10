import { useState } from "react";
import { motion } from "motion/react";
import { 
  LayoutDashboard, 
  Syringe, 
  TrendingUp, 
  UtensilsCrossed, 
  Bell, 
  MessageSquare, 
  User,
  Menu,
  X
} from "lucide-react";
import { GlucoseChart } from "../components/dashboard/GlucoseChart";
import { AIPredictionPanel } from "../components/dashboard/AIPredictionPanel";
import { RiskIndicator } from "../components/dashboard/RiskIndicator";
import { MealRecommendations } from "../components/dashboard/MealRecommendations";
import { AlertCenterPage } from "../components/dashboard/AlertCenter";
import { GlucoseLogging } from "../components/dashboard/GlucoseLogging";
import { PredictionPage } from "../components/dashboard/PredictionPage";
import { DietRecommendations } from "../components/dashboard/DietRecommendations";
import { AIAssistant } from "../components/dashboard/AIAssistant";
import { ProfilePage } from "../components/dashboard/ProfilePage";
import { RealTimeGlucose } from "../components/dashboard/RealTimeGlucose";
import { TrendGraph } from "../components/dashboard/TrendGraph";
import { CurrentGlucoseCard } from "../components/dashboard/CurrentGlucoseCard";
import { AIPredictionsCard } from "../components/dashboard/AIPredictionsCard";
import { StatusSummaryCard } from "../components/dashboard/StatusSummaryCard";
import { GlucoseTrendChart } from "../components/dashboard/GlucoseTrendChart";

export function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "log-glucose", label: "Log Glucose", icon: Syringe },
    { id: "predictions", label: "AI Predictions", icon: TrendingUp },
    { id: "meals", label: "Meal Recommendations", icon: UtensilsCrossed },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "assistant", label: "AI Health Assistant", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: User },
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
          <p className="text-sm text-gray-600 mt-1">Patient Portal</p>
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
              <p className="font-medium text-gray-900">John Doe</p>
              <p className="text-sm text-gray-600">Patient</p>
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
                <h1 className="mb-2" style={{ fontSize: "2rem" }}>Welcome back, John!</h1>
                <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
                  Here's your health overview for today
                </p>
              </motion.div>

              {/* Dashboard Grid */}
              <div className="space-y-6">
                {/* Top Row - Three Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Current Glucose */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <CurrentGlucoseCard />
                  </motion.div>

                  {/* AI Predictions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <AIPredictionsCard />
                  </motion.div>

                  {/* Status Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <StatusSummaryCard />
                  </motion.div>
                </div>

                {/* Full-Width Trend Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <GlucoseTrendChart />
                </motion.div>
              </div>
            </>
          )}

          {/* Glucose Logging Page */}
          {activeTab === "log-glucose" && <GlucoseLogging />}

          {/* Prediction Page */}
          {activeTab === "predictions" && <PredictionPage />}

          {/* Diet Recommendations Page */}
          {activeTab === "meals" && <DietRecommendations />}

          {/* Alert Center Page */}
          {activeTab === "alerts" && <AlertCenterPage />}

          {/* AI Assistant Page */}
          {activeTab === "assistant" && <AIAssistant />}

          {/* Profile Page */}
          {activeTab === "profile" && <ProfilePage />}

          {/* Placeholder content for other tabs */}
          {activeTab !== "dashboard" && activeTab !== "log-glucose" && activeTab !== "predictions" && activeTab !== "meals" && activeTab !== "alerts" && activeTab !== "assistant" && activeTab !== "profile" && (
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