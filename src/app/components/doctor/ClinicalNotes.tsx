import { useState } from "react";
import { motion } from "motion/react";
import {
  FileText,
  Save,
  Clock,
  User,
  Calendar,
  Search,
  Filter,
  Brain,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  CheckCircle,
  X,
  Plus,
  ChevronDown,
  Activity
} from "lucide-react";

interface ClinicalNote {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  doctorName: string;
  noteText: string;
  date: string;
  timestamp: Date;
  aiInsights: {
    glucoseTrend: "improving" | "stable" | "declining";
    averageGlucose: number;
    alerts: number;
    riskLevel: "Low" | "Moderate" | "High";
    recommendations: string[];
  };
  status: "draft" | "final";
}

const mockNotes: ClinicalNote[] = [
  {
    id: "N001",
    patientId: "1",
    patientName: "Sarah Johnson",
    patientAge: 45,
    doctorName: "Dr. Sarah Johnson",
    noteText: "Patient continues to show excellent glucose control with average readings in target range. Recent dietary modifications have been particularly effective. HbA1c improved from 7.2% to 6.8%. Patient reports good adherence to medication schedule and regular exercise routine. No adverse events or hypoglycemic episodes reported this week. Continue current treatment plan with monthly follow-up.",
    date: "March 8, 2026",
    timestamp: new Date("2026-03-08"),
    aiInsights: {
      glucoseTrend: "improving",
      averageGlucose: 142,
      alerts: 2,
      riskLevel: "Low",
      recommendations: [
        "Current treatment plan is effective",
        "Consider reducing basal insulin by 1-2 units if trend continues",
        "Patient ready for extended monitoring intervals"
      ]
    },
    status: "final"
  },
  {
    id: "N002",
    patientId: "2",
    patientName: "Michael Chen",
    patientAge: 38,
    doctorName: "Dr. Sarah Johnson",
    noteText: "Patient experiencing challenges with post-meal glucose spikes. Discussed carbohydrate counting strategies and timing of rapid-acting insulin. Recommended pre-bolusing 15 minutes before meals. Patient agrees to use continuous glucose monitoring more consistently. Will reassess insulin-to-carb ratio next visit. Encouraged patient regarding recent weight loss progress (5 lbs this month).",
    date: "March 7, 2026",
    timestamp: new Date("2026-03-07"),
    aiInsights: {
      glucoseTrend: "stable",
      averageGlucose: 178,
      alerts: 8,
      riskLevel: "Moderate",
      recommendations: [
        "Adjust insulin-to-carb ratio from 1:10 to 1:8",
        "Increase pre-meal bolus timing",
        "Monitor post-meal glucose at 2-hour mark"
      ]
    },
    status: "final"
  },
  {
    id: "N003",
    patientId: "3",
    patientName: "Emily Rodriguez",
    patientAge: 52,
    doctorName: "Dr. Sarah Johnson",
    noteText: "Follow-up on recent hypoglycemic episode. Patient reports better awareness of early symptoms after our last discussion. Adjusted basal insulin from 24 to 22 units. Recommended increased frequency of bedtime snacks. Patient's overnight glucose readings have stabilized. Continue monitoring closely for next two weeks. Patient expresses confidence in management plan.",
    date: "March 5, 2026",
    timestamp: new Date("2026-03-05"),
    aiInsights: {
      glucoseTrend: "improving",
      averageGlucose: 135,
      alerts: 4,
      riskLevel: "Low",
      recommendations: [
        "Basal insulin adjustment appropriate",
        "Monitor for overcorrection",
        "Nocturnal glucose trend shows improvement"
      ]
    },
    status: "final"
  },
  {
    id: "N004",
    patientId: "4",
    patientName: "David Thompson",
    patientAge: 61,
    doctorName: "Dr. Sarah Johnson",
    noteText: "Initial consultation for newly diagnosed Type 2 diabetes. Started patient on Metformin 500mg BID. Provided comprehensive diabetes education including SMBG technique, dietary guidelines, and exercise recommendations. Patient motivated and asking good questions. Scheduled diabetes educator appointment and dietitian consult. Follow-up in 2 weeks to assess medication tolerance and review glucose logs.",
    date: "March 3, 2026",
    timestamp: new Date("2026-03-03"),
    aiInsights: {
      glucoseTrend: "stable",
      averageGlucose: 195,
      alerts: 6,
      riskLevel: "Moderate",
      recommendations: [
        "Establish baseline glucose patterns",
        "Monitor for metformin tolerance",
        "Consider lifestyle intervention support"
      ]
    },
    status: "final"
  }
];

const patientList = [
  { id: "1", name: "Sarah Johnson", age: 45 },
  { id: "2", name: "Michael Chen", age: 38 },
  { id: "3", name: "Emily Rodriguez", age: 52 },
  { id: "4", name: "David Thompson", age: 61 },
  { id: "5", name: "Lisa Anderson", age: 29 },
  { id: "6", name: "Robert Martinez", age: 55 },
  { id: "7", name: "Jennifer Lee", age: 42 },
  { id: "8", name: "William Brown", age: 67 },
];

export function ClinicalNotes() {
  const [notes, setNotes] = useState<ClinicalNote[]>(mockNotes);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "draft" | "final">("all");
  
  // New note form state
  const [selectedPatient, setSelectedPatient] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteDate, setNoteDate] = useState(new Date().toISOString().split('T')[0]);
  const [noteStatus, setNoteStatus] = useState<"draft" | "final">("draft");

  // AI insights for new note
  const getAIInsights = (patientId: string) => {
    // Mock AI insights - in real app, this would call an API
    return {
      glucoseTrend: "stable" as const,
      averageGlucose: 152,
      alerts: 3,
      riskLevel: "Moderate" as const,
      recommendations: [
        "Patient glucose trending within acceptable range",
        "Consider medication adherence review",
        "Schedule follow-up in 2-4 weeks"
      ]
    };
  };

  const handleSaveNote = () => {
    if (!selectedPatient || !noteText) {
      alert("Please select a patient and enter note text");
      return;
    }

    const patient = patientList.find(p => p.id === selectedPatient);
    if (!patient) return;

    const newNote: ClinicalNote = {
      id: `N${(notes.length + 1).toString().padStart(3, '0')}`,
      patientId: selectedPatient,
      patientName: patient.name,
      patientAge: patient.age,
      doctorName: "Dr. Sarah Johnson",
      noteText,
      date: new Date(noteDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      timestamp: new Date(noteDate),
      aiInsights: getAIInsights(selectedPatient),
      status: noteStatus
    };

    setNotes([newNote, ...notes]);
    
    // Reset form
    setSelectedPatient("");
    setNoteText("");
    setNoteDate(new Date().toISOString().split('T')[0]);
    setNoteStatus("draft");
    setIsEditorOpen(false);
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter(n => n.id !== noteId));
    }
  };

  // Filter notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.noteText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || note.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600 bg-green-50 border-green-200";
      case "declining":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200";
      case "Moderate":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between"
      >
        <div>
          <h1 className="mb-2" style={{ fontSize: "2rem" }}>Clinical Notes</h1>
          <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
            Document patient evaluations and track clinical decisions
          </p>
        </div>
        
        <button
          onClick={() => setIsEditorOpen(!isEditorOpen)}
          className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg"
        >
          {isEditorOpen ? (
            <>
              <X className="w-5 h-5" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              New Note
            </>
          )}
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Notes</p>
              <p className="text-3xl font-medium text-blue-600 mt-1">{notes.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Final Notes</p>
              <p className="text-3xl font-medium text-green-600 mt-1">
                {notes.filter(n => n.status === "final").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white border-2 border-orange-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Draft Notes</p>
              <p className="text-3xl font-medium text-orange-600 mt-1">
                {notes.filter(n => n.status === "draft").length}
              </p>
            </div>
            <Edit className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">This Week</p>
              <p className="text-3xl font-medium text-purple-600 mt-1">
                {notes.filter(n => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return n.timestamp > weekAgo;
                }).length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </motion.div>

      {/* Note Editor */}
      {isEditorOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-3xl p-8 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Edit className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900" style={{ fontSize: "1.5rem" }}>New Clinical Note</h2>
              <p className="text-gray-600 text-sm">Document patient evaluation and treatment decisions</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Patient Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Patient <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                >
                  <option value="">Select a patient...</option>
                  {patientList.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} ({patient.age} years old)
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={noteDate}
                  onChange={(e) => setNoteDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* AI Insights Preview */}
            {selectedPatient && (
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h3 className="font-medium text-gray-900">AI Insights for Selected Patient</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Average Glucose</p>
                    <p className="text-xl font-medium text-gray-900">152 mg/dL</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Recent Alerts</p>
                    <p className="text-xl font-medium text-orange-600">3</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Trend</p>
                    <div className="flex items-center gap-1">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-600">Stable</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Risk Level</p>
                    <p className="text-sm font-medium text-orange-600">Moderate</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-purple-900 mb-2">AI Recommendations:</p>
                  <ul className="space-y-1">
                    {getAIInsights(selectedPatient).recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-purple-800 flex items-start gap-2">
                        <span className="text-purple-600 mt-0.5">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Note Text */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Clinical Note <span className="text-red-500">*</span>
              </label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter detailed clinical evaluation, treatment decisions, patient progress, and follow-up plan..."
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
                rows={8}
              />
              <p className="text-sm text-gray-600 mt-2">
                {noteText.length} characters • {noteText.split(' ').filter(w => w).length} words
              </p>
            </div>

            {/* Status Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Note Status</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="draft"
                    checked={noteStatus === "draft"}
                    onChange={(e) => setNoteStatus(e.target.value as "draft")}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">Save as Draft</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="final"
                    checked={noteStatus === "final"}
                    onChange={(e) => setNoteStatus(e.target.value as "final")}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">Mark as Final</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSaveNote}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                <Save className="w-5 h-5" />
                Save Note
              </button>
              <button
                onClick={() => {
                  setIsEditorOpen(false);
                  setSelectedPatient("");
                  setNoteText("");
                  setNoteDate(new Date().toISOString().split('T')[0]);
                }}
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border-2 border-gray-200 rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search notes by patient name or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors appearance-none bg-white min-w-[160px]"
            >
              <option value="all">All Status</option>
              <option value="final">Final Only</option>
              <option value="draft">Draft Only</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-gray-600">
            Showing <span className="font-medium text-gray-900">{filteredNotes.length}</span> of{" "}
            <span className="font-medium text-gray-900">{notes.length}</span> notes
          </p>
          {(searchTerm || filterStatus !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </motion.div>

      {/* Notes Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-gray-900 font-medium" style={{ fontSize: "1.25rem" }}>
          Notes History
        </h2>

        {filteredNotes.length === 0 ? (
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
              No notes found matching your criteria
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

            {/* Notes */}
            <div className="space-y-6">
              {filteredNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-3 top-6 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg" />

                  {/* Note Card */}
                  <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                          {note.patientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900" style={{ fontSize: "1.125rem" }}>
                            {note.patientName}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {note.date}
                            </span>
                            <span className="text-sm text-gray-600">{note.patientAge} years old</span>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              note.status === "final" 
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}>
                              {note.status === "final" ? "Final" : "Draft"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                        </button>
                      </div>
                    </div>

                    {/* Note Text */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                      <p className="text-gray-700 leading-relaxed">{note.noteText}</p>
                    </div>

                    {/* AI Insights */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <h4 className="font-medium text-gray-900">AI Insights at Time of Note</h4>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Glucose Trend</p>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border-2 ${getTrendColor(note.aiInsights.glucoseTrend)}`}>
                            {getTrendIcon(note.aiInsights.glucoseTrend)}
                            <span className="text-sm font-medium capitalize">
                              {note.aiInsights.glucoseTrend}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mb-1">Average Glucose</p>
                          <p className="text-lg font-medium text-gray-900">
                            {note.aiInsights.averageGlucose} <span className="text-sm text-gray-600">mg/dL</span>
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mb-1">Alerts (7 days)</p>
                          <p className="text-lg font-medium text-orange-600">
                            {note.aiInsights.alerts}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mb-1">Risk Level</p>
                          <span className={`inline-block px-2 py-1 rounded-lg text-sm font-medium border-2 ${getRiskColor(note.aiInsights.riskLevel)}`}>
                            {note.aiInsights.riskLevel}
                          </span>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-3">
                        <p className="text-sm font-medium text-gray-900 mb-2">AI Recommendations:</p>
                        <ul className="space-y-1">
                          {note.aiInsights.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
                      <span>By {note.doctorName}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {Math.floor((new Date().getTime() - note.timestamp.getTime()) / (1000 * 60 * 60 * 24))} days ago
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
