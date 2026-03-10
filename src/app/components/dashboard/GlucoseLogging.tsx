import { useState } from "react";
import { motion } from "motion/react";
import { Droplet, Clock, Calendar, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

type MeasurementType = "fasting" | "before meal" | "after meal" | "bedtime";

interface GlucoseLog {
  id: string;
  date: string;
  time: string;
  value: number;
  type: MeasurementType;
}

// Mock data for recent logs
const initialLogs: GlucoseLog[] = [
  { id: "1", date: "Mar 10, 2026", time: "8:30 AM", value: 120, type: "fasting" },
  { id: "2", date: "Mar 10, 2026", time: "1:15 PM", value: 145, type: "after meal" },
  { id: "3", date: "Mar 9, 2026", time: "7:00 AM", value: 95, type: "fasting" },
  { id: "4", date: "Mar 9, 2026", time: "12:30 PM", value: 155, type: "after meal" },
  { id: "5", date: "Mar 9, 2026", time: "10:00 PM", value: 100, type: "bedtime" },
];

export function GlucoseLogging() {
  const [glucoseValue, setGlucoseValue] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [measurementType, setMeasurementType] = useState<MeasurementType>("fasting");
  const [logs, setLogs] = useState<GlucoseLog[]>(initialLogs);
  const [showInsight, setShowInsight] = useState(false);
  const [errors, setErrors] = useState<{ glucose?: string; time?: string; date?: string }>({});
  const [lastSavedValue, setLastSavedValue] = useState<number>(0);

  const validateForm = () => {
    const newErrors: { glucose?: string; time?: string; date?: string } = {};

    if (!glucoseValue) {
      newErrors.glucose = "Glucose value is required";
    } else if (parseFloat(glucoseValue) < 20 || parseFloat(glucoseValue) > 600) {
      newErrors.glucose = "Please enter a valid glucose value (20-600 mg/dL)";
    }

    if (!time) {
      newErrors.time = "Time is required";
    }

    if (!date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const value = parseFloat(glucoseValue);
    const newLog: GlucoseLog = {
      id: Date.now().toString(),
      date: new Date(date).toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      }),
      time: new Date(`${date} ${time}`).toLocaleTimeString("en-US", { 
        hour: "numeric", 
        minute: "2-digit" 
      }),
      value,
      type: measurementType,
    };

    setLogs([newLog, ...logs]);
    setLastSavedValue(value);
    setShowInsight(true);

    // Reset form
    setGlucoseValue("");
    setTime("");
    setDate("");
    setMeasurementType("fasting");
    setErrors({});

    // Hide insight after 10 seconds
    setTimeout(() => {
      setShowInsight(false);
    }, 10000);
  };

  const getInsightData = (value: number) => {
    if (value < 70) {
      return {
        type: "warning",
        color: "red",
        icon: AlertTriangle,
        title: "Low Glucose Detected",
        message: "Your glucose level is below normal range. Consider having a snack with fast-acting carbs.",
        trend: "Your levels may continue to drop. Monitor closely.",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-700",
        iconColor: "text-red-600",
      };
    } else if (value > 180) {
      return {
        type: "warning",
        color: "orange",
        icon: AlertTriangle,
        title: "High Glucose Detected",
        message: "Your glucose level is above normal range. Stay hydrated and monitor your levels.",
        trend: "Predicted to normalize in 2-3 hours with proper management.",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        textColor: "text-orange-700",
        iconColor: "text-orange-600",
      };
    } else {
      return {
        type: "normal",
        color: "green",
        icon: CheckCircle2,
        title: "Normal Glucose Level",
        message: "Your glucose level is within the target range. Great job!",
        trend: "Predicted to remain stable for the next 2-4 hours.",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-700",
        iconColor: "text-green-600",
      };
    }
  };

  const insightData = getInsightData(lastSavedValue);
  const InsightIcon = insightData.icon;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2" style={{ fontSize: "2rem" }}>Log Blood Glucose</h1>
        <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
          Track your glucose levels throughout the day
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Glucose Entry Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Droplet className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-gray-900" style={{ fontSize: "1.5rem" }}>
                  New Reading
                </h2>
                <p className="text-gray-600 text-sm">Enter your glucose measurement</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Glucose Value */}
              <div>
                <label htmlFor="glucose" className="block text-gray-700 mb-2 font-medium">
                  Glucose Value (mg/dL) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="glucose"
                    value={glucoseValue}
                    onChange={(e) => setGlucoseValue(e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none transition-colors text-lg ${
                      errors.glucose 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                    placeholder="Enter glucose value"
                    min="20"
                    max="600"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    mg/dL
                  </div>
                </div>
                {errors.glucose && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.glucose}
                  </p>
                )}
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-gray-700 mb-2 font-medium">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-colors ${
                        errors.date 
                          ? "border-red-300 focus:border-red-500" 
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="time" className="block text-gray-700 mb-2 font-medium">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-colors ${
                        errors.time 
                          ? "border-red-300 focus:border-red-500" 
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                    />
                  </div>
                  {errors.time && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Measurement Type */}
              <div>
                <label className="block text-gray-700 mb-3 font-medium">
                  Measurement Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["fasting", "before meal", "after meal", "bedtime"] as MeasurementType[]).map((type) => (
                    <label
                      key={type}
                      className={`
                        relative flex items-center justify-center px-4 py-4 border-2 rounded-2xl 
                        cursor-pointer transition-all text-center
                        ${
                          measurementType === type
                            ? "bg-blue-50 border-blue-500 text-blue-700"
                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="measurementType"
                        value={type}
                        checked={measurementType === type}
                        onChange={(e) => setMeasurementType(e.target.value as MeasurementType)}
                        className="sr-only"
                      />
                      <span className="font-medium capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-6 shadow-lg hover:shadow-xl transition-all"
                style={{ fontSize: "1.125rem" }}
              >
                Save Reading
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Right Column - AI Insight Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {showInsight ? (
            <div className={`bg-white border-2 ${insightData.borderColor} rounded-3xl p-6 shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${insightData.bgColor} rounded-xl flex items-center justify-center`}>
                  <InsightIcon className={`w-6 h-6 ${insightData.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium" style={{ fontSize: "1.125rem" }}>
                    AI Insight
                  </h3>
                </div>
              </div>

              <div className={`${insightData.bgColor} rounded-2xl p-4 mb-4`}>
                <h4 className={`${insightData.textColor} font-medium mb-2`}>
                  {insightData.title}
                </h4>
                <p className={`text-sm ${insightData.textColor}`}>
                  {insightData.message}
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                <TrendingUp className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="text-gray-900 font-medium text-sm mb-1">
                    Predicted Trend
                  </h4>
                  <p className="text-sm text-gray-600">
                    {insightData.trend}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-700">
                  💡 Keep logging regularly for better AI predictions
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium" style={{ fontSize: "1.125rem" }}>
                    AI Insight
                  </h3>
                </div>
              </div>
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Save a reading to see AI-powered insights and predictions
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm"
      >
        <h2 className="text-gray-900 mb-6" style={{ fontSize: "1.5rem" }}>
          Recent Logs
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-gray-700 font-medium">Date</th>
                <th className="text-left py-4 px-4 text-gray-700 font-medium">Time</th>
                <th className="text-left py-4 px-4 text-gray-700 font-medium">Glucose Value</th>
                <th className="text-left py-4 px-4 text-gray-700 font-medium">Measurement Type</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-gray-900">{log.date}</td>
                  <td className="py-4 px-4 text-gray-600">{log.time}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-medium ${
                        log.value < 70
                          ? "bg-red-100 text-red-700"
                          : log.value > 180
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {log.value} mg/dL
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600 capitalize">{log.type}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {logs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No logs yet. Start by adding your first reading above.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
