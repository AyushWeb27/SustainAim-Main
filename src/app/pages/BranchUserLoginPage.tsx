import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { motion } from "motion/react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export function BranchUserLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Store branch user info in localStorage
        localStorage.setItem("branchUser", JSON.stringify({
          email,
          name: "Branch User",
          branchId: "1",
          branchName: "Mumbai Headquarters",
          role: "Branch Manager",
          permissions: {
            scope1: { view: true, edit: true },
            scope2: { view: true, edit: true },
            scope3: { view: true, edit: false }
          }
        }));

        toast.success("Login successful! Welcome to your branch dashboard.");
        navigate("/branch-user/dashboard");
      } else {
        toast.error("Please enter valid credentials.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-neutral-200/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-200">
              <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <h1 className="font-black text-2xl text-neutral-900 tracking-tighter leading-none">
                Sustain<span className="text-emerald-600">AIM</span>
              </h1>
              <div className="flex items-center gap-1.5 mt-1">
                <Building2 className="w-3 h-3 text-emerald-500" />
                <p className="text-[10px] text-neutral-500 font-black tracking-widest uppercase">Branch Portal</p>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-black text-neutral-900 mb-2">Branch User Access</h2>
          <p className="text-neutral-500 font-bold text-sm">
            Sign in to manage your branch emissions data
          </p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl shadow-neutral-900/10 p-8 border border-neutral-100"
        >
          {/* Info Banner */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6">
            <div className="flex gap-3">
              <div className="p-2 bg-emerald-100 rounded-xl h-fit">
                <Shield className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-black text-emerald-900 uppercase tracking-wide mb-1">
                  Branch User Login
                </p>
                <p className="text-xs text-emerald-700 font-bold leading-relaxed">
                  Access limited to your branch data and assigned permissions.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-black text-neutral-700 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@branch.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-black text-neutral-700 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-xs font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-wide transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl font-black text-sm uppercase tracking-wide shadow-lg shadow-emerald-600/30 transition-all group"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In to Branch Portal
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <div className="flex gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-blue-900 uppercase tracking-wide mb-1">
                  Demo Credentials
                </p>
                <p className="text-xs text-blue-700 font-bold">
                  Email: <span className="font-mono">user@branch.com</span><br />
                  Password: <span className="font-mono">password123</span>
                </p>
              </div>
            </div>
          </div>

          {/* What You'll Get - Scope 1 Access */}
          <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-xl">
            <div className="flex gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-emerald-900 uppercase tracking-wide mb-2">
                  ✓ After Login You'll Get
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    <p className="text-xs text-emerald-700 font-bold">
                      <span className="font-black">Scope 1 Access:</span> 6 emission records (65.5 tCO2e)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    <p className="text-xs text-emerald-700 font-bold">
                      <span className="font-black">Full Edit Access</span> to manage emissions data
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    <p className="text-xs text-emerald-700 font-bold">
                      Branch: <span className="font-black">Mumbai Headquarters</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500 font-bold">
              Need help accessing your account?{" "}
              <button className="text-emerald-600 font-black hover:text-emerald-700 uppercase tracking-wide">
                Contact Admin
              </button>
            </p>
          </div>
        </motion.div>

        {/* Back to Main */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-xs text-neutral-500 font-bold hover:text-neutral-700 transition-colors"
          >
            ← Back to Main Site
          </button>
        </div>
      </motion.div>
    </div>
  );
}