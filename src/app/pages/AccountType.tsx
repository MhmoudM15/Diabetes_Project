import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { User, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router";

export function AccountType() {
  const navigate = useNavigate();

  const accountTypes = [
    {
      icon: User,
      title: "Patient",
      description: "Monitor your glucose levels with AI-powered insights and predictions",
      buttonText: "Continue as Patient",
      onClick: () => navigate("/signup/patient"),
    },
    {
      icon: Stethoscope,
      title: "Healthcare Provider",
      description: "Manage patients, view critical alerts, and access advanced analytics",
      buttonText: "Continue as Doctor",
      onClick: () => navigate("/signup/doctor"),
    },
  ];

  return (
    <>
      <div className="h-16" /> {/* Whitespace between header and section */}
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="mb-4 tracking-tight" style={{ fontSize: "2.5rem", lineHeight: "1.2" }}>
              Choose Your Account Type
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {accountTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white border-3 border-gray-200 rounded-3xl p-10 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl group"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                  </div>
                  
                  <h2 className="mb-3" style={{ fontSize: "1.75rem", lineHeight: "1.2" }}>
                    {type.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 flex-grow" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                    {type.description}
                  </p>
                  
                  <Button
                    size="lg"
                    className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all group-hover:scale-105"
                    style={{ fontSize: "1.125rem" }}
                    onClick={type.onClick}
                  >
                    {type.buttonText}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-8"
          >
            <button
              className="text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}