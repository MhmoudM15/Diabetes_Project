import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  Brain,
  Send,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  ChevronDown,
  Lightbulb,
  BarChart3,
  MessageSquare,
  X,
  Calendar,
  Target,
  FileText
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  structured?: {
    type: "summary" | "pattern" | "risk" | "intervention";
    data: any;
  };
}

const patientList = [
  { id: "1", name: "Sarah Johnson", age: 45, riskLevel: "Low" },
  { id: "2", name: "Michael Chen", age: 38, riskLevel: "Moderate" },
  { id: "3", name: "Emily Rodriguez", age: 52, riskLevel: "Low" },
  { id: "4", name: "David Thompson", age: 61, riskLevel: "Moderate" },
  { id: "5", name: "Lisa Anderson", age: 29, riskLevel: "Low" },
  { id: "6", name: "Robert Martinez", age: 55, riskLevel: "High" },
  { id: "7", name: "Jennifer Lee", age: 42, riskLevel: "Low" },
  { id: "8", name: "William Brown", age: 67, riskLevel: "High" },
];

const quickPrompts = [
  {
    id: "1",
    icon: BarChart3,
    label: "Weekly Summary",
    prompt: "Summarize this patient's glucose activity this week."
  },
  {
    id: "2",
    icon: TrendingUp,
    label: "Glucose Patterns",
    prompt: "Explain the glucose patterns and trends for this patient."
  },
  {
    id: "3",
    icon: AlertTriangle,
    label: "Risk Analysis",
    prompt: "Identify risk trends and potential complications for this patient."
  },
  {
    id: "4",
    icon: Lightbulb,
    label: "Treatment Plan",
    prompt: "Suggest treatment interventions based on recent data."
  },
  {
    id: "5",
    icon: Target,
    label: "Goal Progress",
    prompt: "How is the patient progressing toward their glucose targets?"
  },
  {
    id: "6",
    icon: FileText,
    label: "Clinical Summary",
    prompt: "Generate a clinical summary for upcoming appointment."
  }
];

// Mock glucose data for visualization
const weeklyGlucoseData = [
  { day: "Mon", avg: 142, min: 98, max: 185 },
  { day: "Tue", avg: 148, min: 105, max: 192 },
  { day: "Wed", avg: 138, min: 92, max: 178 },
  { day: "Thu", avg: 152, min: 110, max: 195 },
  { day: "Fri", avg: 145, min: 102, max: 188 },
  { day: "Sat", avg: 135, min: 95, max: 172 },
  { day: "Sun", avg: 140, min: 100, max: 180 }
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(patientList[0].id);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userPrompt: string, patient: any): Message => {
    const lowercasePrompt = userPrompt.toLowerCase();

    // Weekly Summary Response
    if (lowercasePrompt.includes("summarize") || lowercasePrompt.includes("summary") || lowercasePrompt.includes("weekly")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `Based on my analysis of ${patient.name}'s glucose data from the past 7 days, here's a comprehensive summary:`,
        timestamp: new Date(),
        structured: {
          type: "summary",
          data: {
            overview: `${patient.name} has shown relatively stable glucose control this week with an average reading of 145 mg/dL. The patient experienced 3 hypoglycemic events (glucose < 70 mg/dL) and 8 hyperglycemic events (glucose > 180 mg/dL).`,
            metrics: {
              avgGlucose: 145,
              timeInRange: 68,
              hypoglycemicEvents: 3,
              hyperglycemicEvents: 8,
              readings: 42,
              adherence: 92
            },
            trends: [
              {
                trend: "Post-meal spikes",
                severity: "Moderate",
                description: "Glucose levels consistently elevate above 180 mg/dL within 2 hours of meals, particularly after lunch and dinner."
              },
              {
                trend: "Morning stability",
                severity: "Good",
                description: "Fasting glucose readings remain within target range (80-130 mg/dL) on most days."
              },
              {
                trend: "Nighttime dips",
                severity: "Caution",
                description: "Occasional nocturnal hypoglycemia detected, particularly on nights following high activity days."
              }
            ],
            recommendations: [
              "Consider adjusting rapid-acting insulin dose for lunch and dinner",
              "Review carbohydrate counting accuracy with patient",
              "Monitor for nocturnal hypoglycemia with CGM alerts",
              "Schedule follow-up in 2 weeks to assess intervention effectiveness"
            ]
          }
        }
      };
    }

    // Glucose Patterns Response
    if (lowercasePrompt.includes("pattern") || lowercasePrompt.includes("trend")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `I've identified several key glucose patterns in ${patient.name}'s data:`,
        timestamp: new Date(),
        structured: {
          type: "pattern",
          data: {
            patterns: [
              {
                name: "Dawn Phenomenon",
                description: "Glucose levels rise between 4 AM - 8 AM, averaging 15-20 mg/dL increase",
                frequency: "5 out of 7 days",
                impact: "Moderate",
                recommendation: "Consider adjusting basal insulin timing or adding small bedtime snack"
              },
              {
                name: "Post-Meal Variability",
                description: "Inconsistent post-prandial responses, ranging from 30-80 mg/dL increase",
                frequency: "Throughout week",
                impact: "High",
                recommendation: "Review carb-to-insulin ratios and meal composition with dietitian"
              },
              {
                name: "Exercise Impact",
                description: "Glucose drops 40-60 mg/dL during and up to 4 hours after physical activity",
                frequency: "3-4 times weekly",
                impact: "Moderate",
                recommendation: "Pre-exercise snack strategy and reduced insulin dosing before activity"
              }
            ],
            visualData: weeklyGlucoseData
          }
        }
      };
    }

    // Risk Analysis Response
    if (lowercasePrompt.includes("risk") || lowercasePrompt.includes("complication")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `Here's my risk assessment for ${patient.name}:`,
        timestamp: new Date(),
        structured: {
          type: "risk",
          data: {
            overallRisk: patient.riskLevel,
            riskFactors: [
              {
                factor: "Glycemic Variability",
                level: "Moderate",
                score: 65,
                description: "Coefficient of variation at 38%, indicating moderate glucose instability",
                action: "Focus on reducing post-meal spikes and overnight lows"
              },
              {
                factor: "Hypoglycemia Risk",
                level: "Moderate",
                score: 58,
                description: "3 hypoglycemic events this week, 2 occurring overnight",
                action: "Implement CGM alerts and review basal insulin dosing"
              },
              {
                factor: "Time in Range",
                level: "Low",
                score: 32,
                description: "68% time in range (70-180 mg/dL), below recommended 70%",
                action: "Treatment optimization needed to improve TIR by 5-10%"
              },
              {
                factor: "Medication Adherence",
                level: "Low",
                score: 15,
                description: "92% adherence to medication schedule, generally good compliance",
                action: "Continue current adherence strategies"
              }
            ],
            alerts: [
              {
                type: "Immediate Attention",
                message: "Recurring nocturnal hypoglycemia requires prompt intervention",
                priority: "High"
              },
              {
                type: "Short-term Concern",
                message: "Post-meal hyperglycemia pattern developing",
                priority: "Moderate"
              }
            ]
          }
        }
      };
    }

    // Treatment/Intervention Response
    if (lowercasePrompt.includes("treatment") || lowercasePrompt.includes("intervention") || lowercasePrompt.includes("suggest")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `Based on ${patient.name}'s recent glucose data, here are my evidence-based intervention recommendations:`,
        timestamp: new Date(),
        structured: {
          type: "intervention",
          data: {
            interventions: [
              {
                category: "Medication Adjustment",
                priority: "High",
                recommendations: [
                  {
                    action: "Reduce basal insulin by 2 units (from 22 to 20 units)",
                    rationale: "To address recurring nocturnal hypoglycemia",
                    expectedOutcome: "Reduce overnight lows while maintaining fasting glucose in target",
                    timeline: "Implement immediately, reassess in 3-5 days"
                  },
                  {
                    action: "Increase rapid-acting insulin ratio at lunch (1:10 to 1:8)",
                    rationale: "To better control post-lunch hyperglycemia",
                    expectedOutcome: "Reduce post-meal spikes by 20-30 mg/dL",
                    timeline: "Start tomorrow, monitor for 1 week"
                  }
                ]
              },
              {
                category: "Lifestyle Modifications",
                priority: "Moderate",
                recommendations: [
                  {
                    action: "Add 15g complex carb snack before bedtime",
                    rationale: "Prevent nocturnal hypoglycemia on high-activity days",
                    expectedOutcome: "Stabilize overnight glucose levels",
                    timeline: "Ongoing"
                  },
                  {
                    action: "Pre-exercise glucose check and 15g carb if <120 mg/dL",
                    rationale: "Prevent exercise-induced hypoglycemia",
                    expectedOutcome: "Safer exercise sessions without lows",
                    timeline: "Before each workout"
                  }
                ]
              },
              {
                category: "Monitoring Enhancements",
                priority: "Moderate",
                recommendations: [
                  {
                    action: "Enable CGM low glucose alerts at 75 mg/dL",
                    rationale: "Early warning for hypoglycemia, especially overnight",
                    expectedOutcome: "Catch glucose drops before severe hypoglycemia",
                    timeline: "Configure today"
                  }
                ]
              }
            ],
            followUp: {
              schedule: "2 weeks",
              assessments: [
                "Review glucose logs for nocturnal hypoglycemia reduction",
                "Evaluate post-meal glucose control improvement",
                "Assess patient comfort with medication adjustments",
                "Consider HbA1c test if interventions successful"
              ]
            }
          }
        }
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      role: "assistant",
      content: `I can help you analyze ${patient.name}'s diabetes data. Try asking me to:\n\n• Summarize weekly glucose activity\n• Explain glucose patterns and trends\n• Identify risk factors and complications\n• Suggest treatment interventions\n• Assess progress toward glucose targets\n• Generate clinical summaries\n\nWhat would you like to know?`,
      timestamp: new Date()
    };
  };

  const handleSendMessage = async (prompt?: string) => {
    const messageText = prompt || inputValue.trim();
    if (!messageText) return;

    const patient = patientList.find(p => p.id === selectedPatient);
    if (!patient) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText, patient);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const renderStructuredResponse = (structured: Message["structured"]) => {
    if (!structured) return null;

    switch (structured.type) {
      case "summary":
        return (
          <div className="space-y-4 mt-4">
            {/* Overview */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Weekly Overview
              </h4>
              <p className="text-blue-800 text-sm">{structured.data.overview}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">Avg Glucose</p>
                <p className="text-2xl font-medium text-blue-600">
                  {structured.data.metrics.avgGlucose}
                </p>
                <p className="text-xs text-gray-600">mg/dL</p>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">Time in Range</p>
                <p className="text-2xl font-medium text-green-600">
                  {structured.data.metrics.timeInRange}%
                </p>
                <p className="text-xs text-gray-600">Target: 70%+</p>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">Adherence</p>
                <p className="text-2xl font-medium text-purple-600">
                  {structured.data.metrics.adherence}%
                </p>
                <p className="text-xs text-gray-600">Excellent</p>
              </div>
              <div className="bg-white border-2 border-red-200 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">Low Events</p>
                <p className="text-2xl font-medium text-red-600">
                  {structured.data.metrics.hypoglycemicEvents}
                </p>
                <p className="text-xs text-gray-600">This week</p>
              </div>
              <div className="bg-white border-2 border-orange-200 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">High Events</p>
                <p className="text-2xl font-medium text-orange-600">
                  {structured.data.metrics.hyperglycemicEvents}
                </p>
                <p className="text-xs text-gray-600">This week</p>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">Readings</p>
                <p className="text-2xl font-medium text-gray-900">
                  {structured.data.metrics.readings}
                </p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
            </div>

            {/* Trends */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                Key Trends Identified
              </h4>
              <div className="space-y-3">
                {structured.data.trends.map((trend: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      trend.severity === "Good" ? "bg-green-500" :
                      trend.severity === "Moderate" ? "bg-orange-500" : "bg-yellow-500"
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900 text-sm">{trend.trend}</p>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          trend.severity === "Good" ? "bg-green-100 text-green-700" :
                          trend.severity === "Moderate" ? "bg-orange-100 text-orange-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {trend.severity}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{trend.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-4">
              <h4 className="font-medium text-green-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Recommended Actions
              </h4>
              <ul className="space-y-2">
                {structured.data.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-green-800">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "pattern":
        return (
          <div className="space-y-4 mt-4">
            {/* Glucose Chart */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-4">
              <h4 className="font-medium text-gray-900 mb-3">Weekly Glucose Overview</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={structured.data.visualData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" domain={[50, 220]} />
                    <Tooltip />
                    <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" />
                    <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2} name="Average" />
                    <Line type="monotone" dataKey="max" stroke="#f59e0b" strokeWidth={1} name="High" />
                    <Line type="monotone" dataKey="min" stroke="#10b981" strokeWidth={1} name="Low" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Patterns */}
            <div className="space-y-3">
              {structured.data.patterns.map((pattern: any, idx: number) => (
                <div key={idx} className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-purple-900">{pattern.name}</h4>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      pattern.impact === "High" ? "bg-red-100 text-red-700" :
                      pattern.impact === "Moderate" ? "bg-orange-100 text-orange-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {pattern.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-purple-800 mb-2">{pattern.description}</p>
                  <p className="text-xs text-purple-600 mb-3">
                    <strong>Frequency:</strong> {pattern.frequency}
                  </p>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs font-medium text-gray-900 mb-1">Recommendation:</p>
                    <p className="text-xs text-gray-700">{pattern.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "risk":
        return (
          <div className="space-y-4 mt-4">
            {/* Overall Risk */}
            <div className={`border-2 rounded-2xl p-4 ${
              structured.data.overallRisk === "High" ? "bg-red-50 border-red-200" :
              structured.data.overallRisk === "Moderate" ? "bg-orange-50 border-orange-200" :
              "bg-green-50 border-green-200"
            }`}>
              <div className="flex items-center gap-3">
                <AlertTriangle className={`w-8 h-8 ${
                  structured.data.overallRisk === "High" ? "text-red-600" :
                  structured.data.overallRisk === "Moderate" ? "text-orange-600" :
                  "text-green-600"
                }`} />
                <div>
                  <p className="text-sm text-gray-700">Overall Risk Level</p>
                  <p className={`text-2xl font-medium ${
                    structured.data.overallRisk === "High" ? "text-red-700" :
                    structured.data.overallRisk === "Moderate" ? "text-orange-700" :
                    "text-green-700"
                  }`}>
                    {structured.data.overallRisk}
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="space-y-3">
              {structured.data.riskFactors.map((factor: any, idx: number) => (
                <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{factor.factor}</h4>
                      <p className="text-sm text-gray-600 mt-1">{factor.description}</p>
                    </div>
                    <span className={`ml-3 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                      factor.level === "High" ? "bg-red-100 text-red-700" :
                      factor.level === "Moderate" ? "bg-orange-100 text-orange-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {factor.level}
                    </span>
                  </div>
                  
                  {/* Risk Score Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Risk Score</span>
                      <span className="text-xs font-medium text-gray-900">{factor.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          factor.score >= 70 ? "bg-red-500" :
                          factor.score >= 40 ? "bg-orange-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="text-xs font-medium text-blue-900 mb-1">Recommended Action:</p>
                    <p className="text-xs text-blue-800">{factor.action}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Alerts */}
            {structured.data.alerts.length > 0 && (
              <div className="space-y-2">
                {structured.data.alerts.map((alert: any, idx: number) => (
                  <div
                    key={idx}
                    className={`border-2 rounded-xl p-3 ${
                      alert.priority === "High" ? "bg-red-50 border-red-300" :
                      "bg-orange-50 border-orange-300"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                        alert.priority === "High" ? "text-red-600" : "text-orange-600"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{alert.type}</p>
                        <p className="text-xs text-gray-700 mt-0.5">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "intervention":
        return (
          <div className="space-y-4 mt-4">
            {structured.data.interventions.map((intervention: any, idx: number) => (
              <div key={idx} className="bg-white border-2 border-blue-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${
                    intervention.priority === "High" ? "bg-red-500" :
                    intervention.priority === "Moderate" ? "bg-orange-500" :
                    "bg-green-500"
                  }`} />
                  <h4 className="font-medium text-gray-900">{intervention.category}</h4>
                  <span className={`ml-auto px-2 py-1 rounded-lg text-xs font-medium ${
                    intervention.priority === "High" ? "bg-red-100 text-red-700" :
                    intervention.priority === "Moderate" ? "bg-orange-100 text-orange-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {intervention.priority} Priority
                  </span>
                </div>

                <div className="space-y-3">
                  {intervention.recommendations.map((rec: any, recIdx: number) => (
                    <div key={recIdx} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-100">
                      <p className="font-medium text-blue-900 mb-2">{rec.action}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-700 font-medium">Rationale: </span>
                          <span className="text-gray-600">{rec.rationale}</span>
                        </div>
                        <div>
                          <span className="text-gray-700 font-medium">Expected Outcome: </span>
                          <span className="text-gray-600">{rec.expectedOutcome}</span>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-blue-200">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-700 font-medium">{rec.timeline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Follow-up */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Follow-up Plan</h4>
              </div>
              <p className="text-sm text-green-800 mb-3">
                <strong>Schedule:</strong> {structured.data.followUp.schedule}
              </p>
              <div className="bg-white rounded-xl p-3">
                <p className="text-sm font-medium text-gray-900 mb-2">Assessments:</p>
                <ul className="space-y-1">
                  {structured.data.followUp.assessments.map((assessment: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{assessment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const patient = patientList.find(p => p.id === selectedPatient);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 style={{ fontSize: "2rem" }}>AI Medical Assistant</h1>
            <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
              Get intelligent insights and clinical decision support
            </p>
          </div>
        </div>

        {/* Patient Selector */}
        <div className="mt-4 flex items-center gap-3 bg-white border-2 border-gray-200 rounded-2xl p-4">
          <User className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-medium">Analyzing:</span>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 appearance-none"
          >
            {patientList.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.age} years old) - {p.riskLevel} Risk
              </option>
            ))}
          </select>
          <ChevronDown className="w-5 h-5 text-gray-400 -ml-10 pointer-events-none" />
        </div>
      </motion.div>

      {/* Quick Prompts */}
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-gray-700 font-medium mb-3">Quick Prompts:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickPrompts.map((prompt) => {
              const Icon = prompt.icon;
              return (
                <button
                  key={prompt.id}
                  onClick={() => handleQuickPrompt(prompt.prompt)}
                  className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{prompt.label}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 bg-white border-2 border-gray-200 rounded-3xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <Sparkles className="w-16 h-16 text-purple-400 mb-4" />
              <h3 className="text-gray-900 font-medium mb-2" style={{ fontSize: "1.25rem" }}>
                Welcome to AI Medical Assistant
              </h3>
              <p className="text-gray-600 max-w-md">
                I can help you analyze patient data, identify patterns, assess risks, and recommend evidence-based interventions. 
                Select a patient above and choose a quick prompt or type your own question.
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                    : "bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm"
                } p-4`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">AI Assistant</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.structured && renderStructuredResponse(message.structured)}
                <p className={`text-xs mt-2 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-2xl rounded-bl-sm p-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t-2 border-gray-200 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={`Ask about ${patient?.name}'s glucose data...`}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
