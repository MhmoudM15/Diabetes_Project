import { useState } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Activity, 
  Settings, 
  Edit2, 
  Save, 
  X,
  Mail,
  Phone,
  Calendar,
  Ruler,
  Weight as WeightIcon,
  Heart,
  TrendingUp,
  Lock,
  UserCheck,
  CheckCircle2
} from "lucide-react";
import { Button } from "../ui/button";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  age: number;
  weight: number;
  height: number;
  diabetesType: "Type 1" | "Type 2" | "Gestational" | "Prediabetes";
  gender: string;
}

interface HealthData {
  hba1c: number;
  bmi: number;
  averageGlucose: number;
  lastUpdated: string;
}

export function ProfilePage() {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-06-15",
    age: 38,
    weight: 175,
    height: 70,
    diabetesType: "Type 2",
    gender: "Male"
  });

  // Health Data State
  const [healthData, setHealthData] = useState<HealthData>({
    hba1c: 6.8,
    bmi: 25.1,
    averageGlucose: 126,
    lastUpdated: "Mar 10, 2026"
  });

  const [assignedDoctor, setAssignedDoctor] = useState({
    name: "Dr. Sarah Johnson",
    specialty: "Endocrinologist",
    email: "s.johnson@hospital.com",
    phone: "+1 (555) 987-6543"
  });

  // Temporary states for editing
  const [tempPersonalInfo, setTempPersonalInfo] = useState<PersonalInfo>(personalInfo);
  const [tempHealthData, setTempHealthData] = useState<HealthData>(healthData);

  const handleEdit = (section: string) => {
    setEditingSection(section);
    // Reset temp states to current values
    if (section === "personal") setTempPersonalInfo(personalInfo);
    if (section === "health") setTempHealthData(healthData);
  };

  const handleSave = (section: string) => {
    if (section === "personal") setPersonalInfo(tempPersonalInfo);
    if (section === "health") setHealthData(tempHealthData);
    
    setEditingSection(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditingSection(null);
  };

  const calculateBMI = (weight: number, height: number) => {
    // BMI = (weight in lbs / (height in inches)^2) * 703
    return ((weight / (height * height)) * 703).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 flex items-center gap-3"
        >
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <p className="text-green-700 font-medium">Profile updated successfully!</p>
        </motion.div>
      )}

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2" style={{ fontSize: "2rem" }}>Profile Settings</h1>
        <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
          Manage your personal information and account preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Information & Health Data */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-gray-900" style={{ fontSize: "1.5rem" }}>
                    Personal Information
                  </h2>
                  <p className="text-gray-600 text-sm">Your basic profile details</p>
                </div>
              </div>
              {editingSection !== "personal" && (
                <Button
                  onClick={() => handleEdit("personal")}
                  className="bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 rounded-xl px-4 py-2"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>

            {editingSection === "personal" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={tempPersonalInfo.firstName}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, firstName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={tempPersonalInfo.lastName}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, lastName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      value={tempPersonalInfo.email}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={tempPersonalInfo.phone}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={tempPersonalInfo.dateOfBirth}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Gender
                    </label>
                    <select
                      value={tempPersonalInfo.gender}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, gender: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Age
                    </label>
                    <input
                      type="number"
                      value={tempPersonalInfo.age}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, age: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Weight (lbs)
                    </label>
                    <input
                      type="number"
                      value={tempPersonalInfo.weight}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, weight: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Height (inches)
                    </label>
                    <input
                      type="number"
                      value={tempPersonalInfo.height}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, height: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Diabetes Type
                    </label>
                    <select
                      value={tempPersonalInfo.diabetesType}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, diabetesType: e.target.value as PersonalInfo["diabetesType"] })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    >
                      <option>Type 1</option>
                      <option>Type 2</option>
                      <option>Gestational</option>
                      <option>Prediabetes</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleSave("personal")}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 rounded-xl px-6 py-3"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="text-gray-900 font-medium">{personalInfo.firstName} {personalInfo.lastName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900 font-medium">{personalInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900 font-medium">{personalInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="text-gray-900 font-medium">{personalInfo.age} years old</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <WeightIcon className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="text-gray-900 font-medium">{personalInfo.weight} lbs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Height</p>
                    <p className="text-gray-900 font-medium">{Math.floor(personalInfo.height / 12)}' {personalInfo.height % 12}"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Diabetes Type</p>
                    <p className="text-gray-900 font-medium">{personalInfo.diabetesType}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="text-gray-900 font-medium">{personalInfo.gender}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Health Data Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-gray-900" style={{ fontSize: "1.5rem" }}>
                    Health Data
                  </h2>
                  <p className="text-gray-600 text-sm">Key health metrics</p>
                </div>
              </div>
              {editingSection !== "health" && (
                null
              )}
            </div>

            {editingSection === "health" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      HbA1c (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={tempHealthData.hba1c}
                      onChange={(e) => setTempHealthData({ ...tempHealthData, hba1c: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      BMI
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={tempHealthData.bmi}
                      onChange={(e) => setTempHealthData({ ...tempHealthData, bmi: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Avg Glucose (mg/dL)
                    </label>
                    <input
                      type="number"
                      value={tempHealthData.averageGlucose}
                      onChange={(e) => setTempHealthData({ ...tempHealthData, averageGlucose: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleSave("health")}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 rounded-xl px-6 py-3"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <p className="text-sm text-blue-700">HbA1c</p>
                    </div>
                    <p className="text-3xl font-medium text-blue-900">{healthData.hba1c}%</p>
                    <p className="text-xs text-blue-700 mt-1">Target: &lt;7%</p>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <WeightIcon className="w-5 h-5 text-green-600" />
                      <p className="text-sm text-green-700">BMI</p>
                    </div>
                    <p className="text-3xl font-medium text-green-900">{healthData.bmi}</p>
                    <p className="text-xs text-green-700 mt-1">Normal Range</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-purple-600" />
                      <p className="text-sm text-purple-700">Avg Glucose</p>
                    </div>
                    <p className="text-3xl font-medium text-purple-900">{healthData.averageGlucose}</p>
                    <p className="text-xs text-purple-700 mt-1">mg/dL (30 days)</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Last updated: {healthData.lastUpdated}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Account Settings */}
        <div className="space-y-6">
          {/* Password Change */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium" style={{ fontSize: "1.125rem" }}>
                  Password
                </h3>
                <p className="text-gray-600 text-sm">Change your password</p>
              </div>
            </div>
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3"
            >
              Change Password
            </Button>
          </motion.div>

          {/* Doctor Assignment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium" style={{ fontSize: "1.125rem" }}>
                  Assigned Doctor
                </h3>
                <p className="text-gray-600 text-sm">Your healthcare provider</p>
              </div>
            </div>

            <div className="bg-teal-50 rounded-2xl p-4 mb-4">
              <p className="text-teal-900 font-medium mb-1">{assignedDoctor.name}</p>
              <p className="text-teal-700 text-sm mb-3">{assignedDoctor.specialty}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-teal-700">
                  <Mail className="w-4 h-4" />
                  <span>{assignedDoctor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-teal-700">
                  <Phone className="w-4 h-4" />
                  <span>{assignedDoctor.phone}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 rounded-xl py-3"
            >
              Request Doctor Change
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}