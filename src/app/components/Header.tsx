import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate();

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 pt-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-full shadow-lg border border-gray-200/50 px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center shadow-md">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="font-semibold text-xl text-gray-900">Smart Medical AI System</span>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost"
              className="px-6 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate("/account-type")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}