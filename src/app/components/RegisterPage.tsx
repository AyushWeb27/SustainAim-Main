import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ArrowRight, User, Building } from "lucide-react";
import { motion } from "motion/react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";

interface RegisterPageProps {
  onNavigateToLogin: () => void;
}

export function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration attempt:", formData);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="font-black text-xl text-neutral-900 tracking-tighter leading-none">
                  Sustain<span className="text-emerald-600">AIM</span>
                </h1>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-600 font-bold hidden sm:inline">
                Already have an account?
              </span>
              <button
                onClick={onNavigateToLogin}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Section - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-emerald-200 rotate-3">
              <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-black text-3xl text-neutral-900 tracking-tighter leading-none">
                Sustain<span className="text-emerald-600">AIM</span>
              </h1>
              <p className="text-xs text-neutral-400 font-black tracking-widest uppercase mt-1">
                Admin Portal
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-black text-neutral-900 tracking-tighter leading-tight">
              Start your <span className="text-emerald-600">sustainability</span> journey today
            </h2>
            <p className="text-lg text-neutral-500 font-bold leading-relaxed">
              Join thousands of organizations tracking and reducing their environmental impact with our comprehensive ESG management platform.
            </p>
          </div>

          <div className="bg-neutral-900 p-8 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-20 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-black">What's Included</h3>
              <ul className="space-y-4">
                {[
                  "Real-time emissions tracking",
                  "Comprehensive ESG analytics",
                  "Automated compliance reports",
                  "Multi-scope carbon accounting",
                  "24/7 premium support"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="text-sm font-bold text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-8 md:p-12 border border-neutral-100 shadow-2xl shadow-neutral-200/50"
        >
          <div className="mb-8">
            <h3 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">Create Account</h3>
            <p className="text-sm text-neutral-400 font-bold">Get started with SustainAIM</p>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={() => console.log("Google sign up clicked")}
            className="w-full py-5 bg-white text-neutral-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-50 transition-all border-2 border-neutral-200 shadow-lg flex items-center justify-center gap-3 group mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign Up with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-100"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-xs font-black text-neutral-400 uppercase tracking-widest">
                Or sign up with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-xs font-black text-neutral-700 uppercase tracking-widest">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  required
                  className="w-full pl-14 pr-5 py-4 bg-neutral-50 border-2 border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm"
                  placeholder="John Smith"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-black text-neutral-700 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="w-full pl-14 pr-5 py-4 bg-neutral-50 border-2 border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>

            {/* Organization Field */}
            <div className="space-y-2">
              <label htmlFor="organization" className="block text-xs font-black text-neutral-700 uppercase tracking-widest">
                Organization
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="organization"
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleChange("organization", e.target.value)}
                  required
                  className="w-full pl-14 pr-5 py-4 bg-neutral-50 border-2 border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm"
                  placeholder="Your Company Name"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs font-black text-neutral-700 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  className="w-full pl-14 pr-14 py-4 bg-neutral-50 border-2 border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-xs font-black text-neutral-700 uppercase tracking-widest">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required
                  className="w-full pl-14 pr-14 py-4 bg-neutral-50 border-2 border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm"
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group pt-2">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
                  required
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border-2 border-neutral-300 rounded-lg bg-white peer-checked:bg-emerald-600 peer-checked:border-emerald-600 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="text-sm font-bold text-neutral-600 group-hover:text-neutral-900 transition-colors leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-black">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-black">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 group mt-6"
            >
              Create Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-100"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-xs font-black text-neutral-400 uppercase tracking-widest">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <button
            onClick={onNavigateToLogin}
            className="w-full py-5 bg-neutral-50 text-neutral-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-100 transition-all border-2 border-neutral-100"
          >
            Sign In Instead
          </button>
        </motion.div>
      </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-400 font-bold text-sm">
              © 2026 SustainAIM. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Security", "Contact"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-neutral-400 hover:text-emerald-600 font-bold text-sm transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
