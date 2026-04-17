import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";

export function DoctorSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    specialization: "",
    hospital: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Doctor signup data:", formData);
    // Navigate to doctor dashboard after signup
    navigate("/dashboard/doctor");
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
              Create Doctor Account
            </h1>
            <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
              Join our platform to monitor and support your patients
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
                  placeholder="Dr. Your Name"
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
                  placeholder="doctor@hospital.com"
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
                  placeholder="Confirm your password"
                />
              </div>

              {/* Medical License ID */}
              <div>
                <label htmlFor="licenseNumber" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                  Medical License ID
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your medical license ID"
                />
              </div>

              {/* Hospital / Clinic */}
              <div>
                <label htmlFor="hospital" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                  Hospital / Clinic
                </label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Your hospital or clinic name"
                />
              </div>

              {/* Specialization */}
              <div>
                <label htmlFor="specialization" className="block text-gray-700 mb-2" style={{ fontSize: "0.95rem" }}>
                  Specialization
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select specialization</option>
                  <option value="endocrinology">Endocrinology</option>
                  <option value="internal-medicine">Internal Medicine</option>
                  <option value="family-medicine">Family Medicine</option>
                  <option value="diabetology">Diabetology</option>
                  <option value="general-practice">General Practice</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full mt-8 px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              style={{ fontSize: "1.125rem" }}
            >
              Create Doctor Account
            </Button>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => navigate("/login")}
                >
                  Login here
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
              onClick={() => navigate("/account-type")}
            >
              ← Back to Account Selection
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}