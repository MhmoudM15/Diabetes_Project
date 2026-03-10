import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { useState } from "react";

export function PatientSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    diabetesType: "",
    height: "",
    weight: "",
    doctor: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Patient signup data:", formData);
    // Redirect to dashboard
    navigate("/dashboard/patient");
  };

  return (
    <>
      <div className="h-16" /> {/* Whitespace between header and section */}
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="mb-3 tracking-tight" style={{ fontSize: "2.5rem", lineHeight: "1.2" }}>
              Create Patient Account
            </h1>
            <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
              Start monitoring your diabetes with AI-powered insights
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
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

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
                  placeholder="Create a strong password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Re-enter your password"
                />
              </div>

              {/* Age and Diabetes Type - Two columns */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="age" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Age"
                    min="1"
                    max="120"
                  />
                </div>

                <div>
                  <label htmlFor="diabetesType" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                    Diabetes Type
                  </label>
                  <select
                    id="diabetesType"
                    name="diabetesType"
                    value={formData.diabetesType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Select type</option>
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                    <option value="gestational">Gestational</option>
                    <option value="prediabetes">Prediabetes</option>
                  </select>
                </div>
              </div>

              {/* Height and Weight - Two columns */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="height" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="e.g., 170"
                    min="50"
                    max="250"
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="e.g., 70"
                    min="20"
                    max="300"
                  />
                </div>
              </div>

              {/* Doctor (Optional) */}
              <div>
                <label htmlFor="doctor" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                  Doctor <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Your doctor's name"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full mt-8 px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              style={{ fontSize: "1.125rem" }}
            >
              Create Patient Account
            </Button>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Log in
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
              onClick={() => navigate("/account-type")}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              ← Back to Account Type
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}