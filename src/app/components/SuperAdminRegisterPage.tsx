import React, { useState } from "react";
import { Shield, Mail, Lock, Eye, EyeOff, User, Building2, Phone, Key, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface SuperAdminRegisterPageProps {
  onNavigateToLogin: () => void;
  onNavigateToCustomerRegister: () => void;
}

export function SuperAdminRegisterPage({ onNavigateToLogin, onNavigateToCustomerRegister }: SuperAdminRegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    accessCode: "",
    password: "",
    confirmPassword: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (formData.accessCode !== "ADMIN2026") {
      alert("Invalid admin access code!");
      return;
    }
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-neutral-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-neutral-700 p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </motion.div>
          <h2 className="text-2xl font-black text-white mb-3">Registration Submitted!</h2>
          <p className="text-neutral-400 font-bold mb-6">
            Your admin registration request has been submitted for approval. You will receive an email once your account is activated.
          </p>
          <button
            onClick={onNavigateToLogin}
            className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-xl"
          >
            Back to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-3xl"
        />
      </div>

      {/* Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-neutral-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-neutral-700 my-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white px-8 py-8 text-center relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-4 shadow-xl"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-black mb-2">Admin Registration</h1>
          <p className="text-emerald-100 text-sm font-bold">
            Request administrative access to SustainAIM
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Info Box */}
          <div className="bg-blue-900/30 border-2 border-blue-700 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-300 mb-2">Admin Access Requirements:</p>
            <ul className="text-xs text-blue-400 font-medium space-y-1">
              <li>• Valid organization credentials</li>
              <li>• Administrative access code</li>
              <li>• Approval from system administrators</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-black text-neutral-300 mb-2 uppercase tracking-wide">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 bg-neutral-700 border-2 border-neutral-600 rounded-xl text-white font-bold placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-black text-neutral-300 mb-2 uppercase tracking-wide">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@company.com"
                required
                className="w-full px-4 py-3 bg-neutral-700 border-2 border-neutral-600 rounded-xl text-white font-bold placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-black text-neutral-300 mb-2 uppercase tracking-wide">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
                required
                className="w-full px-4 py-3 bg-neutral-700 border-2 border-neutral-600 rounded-xl text-white font-bold placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-black text-neutral-300 mb-2 uppercase tracking-wide">
                <Building2 className="w-4 h-4 inline mr-2" />
                Organization
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="SustainAIM Inc."
                required
                className="w-full px-4 py-3 bg-neutral-700 border-2 border-neutral-600 rounded-xl text-white font-bold placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Admin Access Code */}
          <div>
            <label className="block text-sm font-black text-neutral-300 mb-2 uppercase tracking-wide">
              <Key className="w-4 h-4 inline mr-2" />
              Admin Access Code
            </label>
            <input
              type="text"
              name="accessCode"
              value={formData.accessCode}
              onChange={handleInputChange}
              placeholder="Enter admin access code"
              required
              className="w-full px-4 py-3 bg-neutral-700 border-2 border-neutral-600 rounded-xl text-white font-bold placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-all"
            />
            <p className="text-xs text-neutral-500 font-medium mt-2">
              Demo code: <span className="font-black text-emerald-400">ADMIN2026</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div>
              <label className="block text-sm font-black text-neutral-300 mb-2 uppercase tracking-wide">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create password"
                  required
                  className="w-full px-4 py-3 bg-neutral-700 border-2 border-neutral-600 rounded-xl text-white font-bold placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-black text-neutral-300 mb-2 uppercase tracking-wide">
                <Lock className="w-4 h-4 inline mr-2" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  required
                  className="w-full px-4 py-3 bg-neutral-700 border-2 border-neutral-600 rounded-xl text-white font-bold placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition-colors p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-xl transform hover:scale-105 active:scale-95"
          >
            <Shield className="w-5 h-5" />
            Submit Registration
          </button>

          {/* Navigation Links */}
          <div className="flex items-center justify-between pt-2 text-sm border-t border-neutral-700">
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              ← Back to Login
            </button>
            <button
              type="button"
              onClick={onNavigateToCustomerRegister}
              className="font-bold text-neutral-400 hover:text-neutral-300 transition-colors"
            >
              Customer Register →
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
