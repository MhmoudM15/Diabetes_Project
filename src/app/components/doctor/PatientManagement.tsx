import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, ArrowUpDown, ChevronRight, Activity, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

interface Patient {
  id: string;
  name: string;
  age: number;
  diabetesType: "Type 1" | "Type 2" | "Gestational" | "Prediabetes";
  latestGlucose: number;
  glucoseTime: string;
  riskLevel: "Low" | "Moderate" | "High";
  status: "Active" | "Inactive" | "Critical";
  hba1c: number;
  lastVisit: string;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 45,
    diabetesType: "Type 2",
    latestGlucose: 52,
    glucoseTime: "5 min ago",
    riskLevel: "High",
    status: "Critical",
    hba1c: 7.2,
    lastVisit: "Mar 8, 2026"
  },
  {
    id: "2",
    name: "Michael Chen",
    age: 38,
    diabetesType: "Type 1",
    latestGlucose: 285,
    glucoseTime: "12 min ago",
    riskLevel: "High",
    status: "Critical",
    hba1c: 8.1,
    lastVisit: "Mar 9, 2026"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    age: 52,
    diabetesType: "Type 2",
    latestGlucose: 142,
    glucoseTime: "1 hour ago",
    riskLevel: "Moderate",
    status: "Active",
    hba1c: 7.8,
    lastVisit: "Mar 10, 2026"
  },
  {
    id: "4",
    name: "David Thompson",
    age: 61,
    diabetesType: "Type 2",
    latestGlucose: 156,
    glucoseTime: "2 hours ago",
    riskLevel: "High",
    status: "Active",
    hba1c: 8.2,
    lastVisit: "Mar 7, 2026"
  },
  {
    id: "5",
    name: "Lisa Anderson",
    age: 29,
    diabetesType: "Type 1",
    latestGlucose: 118,
    glucoseTime: "30 min ago",
    riskLevel: "Low",
    status: "Active",
    hba1c: 6.9,
    lastVisit: "Mar 10, 2026"
  },
  {
    id: "6",
    name: "Robert Martinez",
    age: 55,
    diabetesType: "Type 2",
    latestGlucose: 95,
    glucoseTime: "45 min ago",
    riskLevel: "Low",
    status: "Active",
    hba1c: 6.5,
    lastVisit: "Mar 9, 2026"
  },
  {
    id: "7",
    name: "Jennifer Lee",
    age: 42,
    diabetesType: "Type 2",
    latestGlucose: 168,
    glucoseTime: "1 hour ago",
    riskLevel: "Moderate",
    status: "Active",
    hba1c: 7.5,
    lastVisit: "Mar 8, 2026"
  },
  {
    id: "8",
    name: "William Brown",
    age: 67,
    diabetesType: "Type 2",
    latestGlucose: 205,
    glucoseTime: "3 hours ago",
    riskLevel: "High",
    status: "Active",
    hba1c: 8.5,
    lastVisit: "Mar 6, 2026"
  },
  {
    id: "9",
    name: "Amanda White",
    age: 33,
    diabetesType: "Type 1",
    latestGlucose: 112,
    glucoseTime: "20 min ago",
    riskLevel: "Low",
    status: "Active",
    hba1c: 6.8,
    lastVisit: "Mar 10, 2026"
  },
  {
    id: "10",
    name: "Christopher Davis",
    age: 58,
    diabetesType: "Type 2",
    latestGlucose: 178,
    glucoseTime: "1.5 hours ago",
    riskLevel: "Moderate",
    status: "Active",
    hba1c: 7.6,
    lastVisit: "Mar 9, 2026"
  },
  {
    id: "11",
    name: "Jessica Taylor",
    age: 36,
    diabetesType: "Gestational",
    latestGlucose: 135,
    glucoseTime: "2 hours ago",
    riskLevel: "Moderate",
    status: "Active",
    hba1c: 6.2,
    lastVisit: "Mar 10, 2026"
  },
  {
    id: "12",
    name: "Daniel Wilson",
    age: 49,
    diabetesType: "Type 2",
    latestGlucose: 102,
    glucoseTime: "1 hour ago",
    riskLevel: "Low",
    status: "Active",
    hba1c: 6.7,
    lastVisit: "Mar 8, 2026"
  }
];

export function PatientManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter and sort patients
  const filteredPatients = mockPatients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = riskFilter === "all" || patient.riskLevel.toLowerCase() === riskFilter.toLowerCase();
      return matchesSearch && matchesRisk;
    })
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return b.latestGlucose - a.latestGlucose;
      } else {
        return a.latestGlucose - b.latestGlucose;
      }
    });

  const getRiskStyles = (level: Patient["riskLevel"]) => {
    switch (level) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200";
      case "Moderate":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Low":
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getStatusStyles = (status: Patient["status"]) => {
    switch (status) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-gray-100 text-gray-700";
    }
  };

  const getGlucoseStyles = (glucose: number) => {
    if (glucose < 70) return "bg-red-100 text-red-700 border-red-200";
    if (glucose > 180) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-green-100 text-green-700 border-green-200";
  };

  const handlePatientClick = (patientId: string) => {
    navigate(`/dashboard/doctor/patient/${patientId}`);
  };

  const toggleSort = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2" style={{ fontSize: "2rem" }}>Patient Management</h1>
        <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
          Monitor and manage all your diabetes patients
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm"
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

          {/* Risk Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors appearance-none bg-white min-w-[200px]"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>

          {/* Sort by Glucose */}
          <button
            onClick={toggleSort}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors bg-white"
          >
            <ArrowUpDown className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">
              Sort: {sortOrder === "desc" ? "High to Low" : "Low to High"}
            </span>
          </button>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-medium text-gray-900">{filteredPatients.length}</span> of{" "}
            <span className="font-medium text-gray-900">{mockPatients.length}</span> patients
          </p>
          {(searchTerm || riskFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setRiskFilter("all");
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </motion.div>

      {/* Patient Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border-2 border-gray-200 rounded-3xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Patient Name</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Age</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Diabetes Type</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Latest Glucose</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">HbA1c</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Risk Level</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium">Last Visit</th>
                <th className="text-left py-4 px-6 text-gray-700 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  onClick={() => handlePatientClick(patient.id)}
                  className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        {patient.status === "Critical" && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3 text-red-600" />
                            <span className="text-xs text-red-600">Needs attention</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{patient.age}</td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{patient.diabetesType}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border-2 ${getGlucoseStyles(patient.latestGlucose)}`}>
                        <Activity className="w-4 h-4" />
                        {patient.latestGlucose} mg/dL
                      </span>
                      <p className="text-xs text-gray-600 mt-1">{patient.glucoseTime}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700 font-medium">{patient.hba1c}%</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 ${getRiskStyles(patient.riskLevel)}`}>
                      {patient.riskLevel}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusStyles(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{patient.lastVisit}</td>
                  <td className="py-4 px-6">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
              No patients found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setRiskFilter("all");
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}