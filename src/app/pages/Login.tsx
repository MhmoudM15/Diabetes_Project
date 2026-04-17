import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    accountType: "patient", // Default to patient
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", formData);
    
    // Navigate to appropriate dashboard based on account type
    if (formData.accountType === "doctor") {
      navigate("/dashboard/doctor");
    } else {
      navigate("/dashboard/patient");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-md mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="mb-3 tracking-tight" style={{ fontSize: "2.5rem", lineHeight: "1.2" }}>
              Welcome Back
            </h1>
            <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
              Log in to your account
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-lg"
          >
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              {/* Account Type */}
              <div>
                <label htmlFor="accountType" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                  Account Type
                </label>
                <select
                  id="accountType"
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full mt-8 px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              style={{ fontSize: "1.125rem" }}
            >
              Log In
            </Button>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => navigate("/account-type")}
                >
                  Sign up now
                </button>
              </p>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-6"
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
      <Footer />
    </>
  );
}