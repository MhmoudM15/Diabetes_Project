import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { User, Stethoscope } from "lucide-react";

export function AccountType() {
  const navigate = useNavigate();

  const accountTypes = [
    {
      type: "Patient",
      icon: User,
      description: "Track glucose levels, receive AI predictions, and manage daily health.",
      buttonText: "Continue as Patient",
      onClick: () => {
        navigate("/signup/patient");
      },
    },
    {
      type: "Doctor",
      icon: Stethoscope,
      description: "Monitor patients, review AI insights, and provide medical feedback.",
      buttonText: "Continue as Doctor",
      onClick: () => {
        navigate("/signup/doctor");
      },
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
            {accountTypes.map((account, index) => {
              const Icon = account.icon;
              return (
                <motion.div
                  key={account.type}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 h-full flex flex-col items-center text-center hover:border-blue-400 hover:shadow-2xl transition-all duration-300">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors duration-300">
                      <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    
                    <h2 className="mb-3" style={{ fontSize: "1.75rem", lineHeight: "1.2" }}>
                      {account.type}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 flex-grow" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                      {account.description}
                    </p>
                    
                    <Button
                      onClick={account.onClick}
                      size="lg"
                      className="w-full px-6 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                      style={{ fontSize: "1rem" }}
                    >
                      {account.buttonText}
                    </Button>
                  </div>
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
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              ← Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}