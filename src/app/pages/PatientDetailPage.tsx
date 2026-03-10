import { useState } from "react";
import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  User,
  Calendar,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Heart,
  Pill,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Button } from "../components/ui/button";

// Mock patient data
const patientData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    age: 45,
    gender: "Female",
    diabetesType: "Type 2",
    diagnosisDate: "Jan 15, 2020",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Boston, MA 02101",
    emergencyContact: "John Johnson - +1 (555) 987-6543",
    
    // Current Status
    latestGlucose: 52,
    glucoseTime: "5 min ago",
    riskLevel: "High",
    status: "Critical",
    hba1c: 7.2,
    bmi: 26.3,
    weight: 165,
    height: 66,
    
    // Medications
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", adherence: 92 },
      { name: "Insulin Glargine", dosage: "20 units", frequency: "Once daily", adherence: 88 },
    ],
    
    // Recent visits
    recentVisits: [
      { date: "Mar 8, 2026", reason: "Routine checkup", notes: "HbA1c stable, continue current treatment" },
      { date: "Feb 10, 2026", reason: "Follow-up", notes: "Adjusted insulin dosage" },
      { date: "Jan 15, 2026", reason: "Annual exam", notes: "Overall health good" },
    ],

    // Glucose history (7 days)
    glucoseHistory: [
      { date: "Mar 4", value: 142 },
      { date: "Mar 5", value: 156 },
      { date: "Mar 6", value: 128 },
      { date: "Mar 7", value: 138 },
      { date: "Mar 8", value: 165 },
      { date: "Mar 9", value: 148 },
      { date: "Mar 10", value: 52 },
    ],

    // Alerts
    recentAlerts: [
      { time: "5 min ago", type: "critical", message: "Severe hypoglycemia detected: 52 mg/dL" },
      { time: "2 days ago", type: "warning", message: "Missed evening glucose reading" },
      { time: "5 days ago", type: "info", message: "Medication adherence below 90%" },
    ]
  }
};

// Add more mock patients with similar structure
for (let i = 2; i <= 12; i++) {
  patientData[i.toString()] = {
    ...patientData["1"],
    id: i.toString(),
    name: `Patient ${i}`,
    latestGlucose: 100 + i * 10,
    status: i % 3 === 0 ? "Critical" : "Active",
    riskLevel: i % 3 === 0 ? "High" : i % 2 === 0 ? "Moderate" : "Low"
  };
}

export function PatientDetailPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const patient = patientData[patientId || "1"];

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Patient not found</h1>
          <Button onClick={() => navigate("/dashboard/doctor")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getGlucoseStatus = (glucose: number) => {
    if (glucose < 70) return { label: "Low", color: "red", icon: TrendingDown };
    if (glucose > 180) return { label: "High", color: "orange", icon: TrendingUp };
    return { label: "Normal", color: "green", icon: Activity };
  };

  const glucoseStatus = getGlucoseStatus(patient.latestGlucose);
  const StatusIcon = glucoseStatus.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-10">
        <div className="p-8">
          <button
            onClick={() => navigate("/dashboard/doctor")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Patients
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white text-2xl">
                  {patient.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>

              {/* Patient Info */}
              <div>
                <h1 className="mb-2" style={{ fontSize: "2rem" }}>{patient.name}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {patient.age} years old
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {patient.diabetesType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Diagnosed: {patient.diagnosisDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className={`
              px-6 py-3 rounded-2xl border-2 font-medium
              ${patient.status === "Critical" ? "bg-red-50 border-red-200 text-red-700" : "bg-green-50 border-green-200 text-green-700"}
            `}>
              {patient.status === "Critical" && <AlertTriangle className="w-5 h-5 inline mr-2" />}
              {patient.status}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            {["overview", "glucose", "medications", "visits", "notes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-3 rounded-xl font-medium transition-all
                  ${activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white border-2 border-${glucoseStatus.color}-200 rounded-3xl p-6 shadow-sm`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 bg-${glucoseStatus.color}-50 rounded-xl flex items-center justify-center`}>
                    <StatusIcon className={`w-6 h-6 text-${glucoseStatus.color}-600`} />
                  </div>
                  <p className="text-gray-700">Latest Glucose</p>
                </div>
                <p className={`text-4xl font-medium text-${glucoseStatus.color}-600 mb-1`}>
                  {patient.latestGlucose}
                </p>
                <p className="text-sm text-gray-600">mg/dL • {patient.glucoseTime}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border-2 border-purple-200 rounded-3xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-gray-700">HbA1c</p>
                </div>
                <p className="text-4xl font-medium text-purple-600 mb-1">{patient.hba1c}%</p>
                <p className="text-sm text-gray-600">Target: &lt;7%</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border-2 border-blue-200 rounded-3xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-700">BMI</p>
                </div>
                <p className="text-4xl font-medium text-blue-600 mb-1">{patient.bmi}</p>
                <p className="text-sm text-gray-600">{patient.weight} lbs • {Math.floor(patient.height / 12)}'{patient.height % 12}"</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`bg-white border-2 rounded-3xl p-6 shadow-sm ${
                  patient.riskLevel === "High" ? "border-red-200" : 
                  patient.riskLevel === "Moderate" ? "border-orange-200" : "border-green-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    patient.riskLevel === "High" ? "bg-red-50" : 
                    patient.riskLevel === "Moderate" ? "bg-orange-50" : "bg-green-50"
                  }`}>
                    <AlertTriangle className={`w-6 h-6 ${
                      patient.riskLevel === "High" ? "text-red-600" : 
                      patient.riskLevel === "Moderate" ? "text-orange-600" : "text-green-600"
                    }`} />
                  </div>
                  <p className="text-gray-700">Risk Level</p>
                </div>
                <p className={`text-2xl font-medium mb-1 ${
                  patient.riskLevel === "High" ? "text-red-600" : 
                  patient.riskLevel === "Moderate" ? "text-orange-600" : "text-green-600"
                }`}>
                  {patient.riskLevel} Risk
                </p>
                <p className="text-sm text-gray-600">Based on 30-day data</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Glucose Trend Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
              >
                <h3 className="text-gray-900 mb-6" style={{ fontSize: "1.5rem" }}>
                  7-Day Glucose Trend
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={patient.glucoseHistory}>
                      <defs>
                        <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          padding: '8px 12px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="url(#glucoseGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Recent Alerts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm"
              >
                <h3 className="text-gray-900 mb-4" style={{ fontSize: "1.25rem" }}>
                  Recent Alerts
                </h3>
                <div className="space-y-3">
                  {patient.recentAlerts.map((alert: any, index: number) => (
                    <div
                      key={index}
                      className={`p-4 rounded-2xl border-2 ${
                        alert.type === "critical" ? "bg-red-50 border-red-200" :
                        alert.type === "warning" ? "bg-orange-50 border-orange-200" :
                        "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                          alert.type === "critical" ? "text-red-600" :
                          alert.type === "warning" ? "text-orange-600" :
                          "text-blue-600"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 leading-relaxed">{alert.message}</p>
                          <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact Information and Medications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900" style={{ fontSize: "1.5rem" }}>
                    Contact Information
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-900">{patient.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-gray-900">{patient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-gray-900">{patient.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Emergency Contact</p>
                      <p className="text-gray-900">{patient.emergencyContact}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Current Medications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <Pill className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-gray-900" style={{ fontSize: "1.5rem" }}>
                    Current Medications
                  </h3>
                </div>
                <div className="space-y-4">
                  {patient.medications.map((med: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{med.name}</p>
                          <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Adherence</span>
                          <span className={`font-medium ${med.adherence >= 90 ? "text-green-600" : "text-orange-600"}`}>
                            {med.adherence}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${med.adherence >= 90 ? "bg-green-500" : "bg-orange-500"}`}
                            style={{ width: `${med.adherence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== "overview" && (
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-12 text-center">
            <h2 className="mb-4" style={{ fontSize: "1.875rem" }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} View
            </h2>
            <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
              Detailed {activeTab} information coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
