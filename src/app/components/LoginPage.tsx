import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";

interface LoginPageProps {
  onNavigateToRegister: () => void;
}

export function LoginPage({ onNavigateToRegister }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password, rememberMe });
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

            {/* Sign Up Link */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-600 font-bold hidden sm:inline">
                Don't have an account?
              </span>
              <button
                onClick={onNavigateToRegister}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
              >
                Sign Up
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
              Welcome back to your <span className="text-emerald-600">sustainability</span> command center
            </h2>
            <p className="text-lg text-neutral-500 font-bold leading-relaxed">
              Access real-time environmental analytics, manage emissions data, and track your organization's carbon footprint with precision.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8">
            {[
              { value: "2.4K+", label: "Active Users" },
              { value: "99.9%", label: "Uptime" },
              { value: "ISO 27001", label: "Certified" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                <p className="text-2xl font-black text-neutral-900">{stat.value}</p>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Section - Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-8 md:p-12 border border-neutral-100 shadow-2xl shadow-neutral-200/50"
        >
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-neutral-900 tracking-tight">Sign In</h3>
                <p className="text-sm text-neutral-400 font-bold mt-1">Access your dashboard</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-14 pr-5 py-4 bg-neutral-50 border-2 border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm"
                  placeholder="your.email@company.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-14 pr-14 py-4 bg-neutral-50 border-2 border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm"
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-neutral-300 rounded-lg bg-white peer-checked:bg-emerald-600 peer-checked:border-emerald-600 transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-bold text-neutral-600 group-hover:text-neutral-900 transition-colors">
                  Remember me
                </span>
              </label>
              <a href="#" className="text-sm font-black text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider">
                Forgot?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 group"
            >
              Sign In to Dashboard
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
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={() => console.log("Google sign in clicked")}
            className="w-full py-5 bg-white text-neutral-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-50 transition-all border-2 border-neutral-200 shadow-lg flex items-center justify-center gap-3 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign In with Google
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-100"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-xs font-black text-neutral-400 uppercase tracking-widest">
                New to SustainAIM?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <button
            onClick={onNavigateToRegister}
            className="w-full py-5 bg-neutral-50 text-neutral-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-100 transition-all border-2 border-neutral-100"
          >
            Create Account
          </button>

          {/* Footer Note */}
          <p className="mt-8 text-center text-xs text-neutral-400 font-bold leading-relaxed">
            By signing in, you agree to our{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-black">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-black">
              Privacy Policy
            </a>
          </p>
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
