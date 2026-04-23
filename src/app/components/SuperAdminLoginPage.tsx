import React, { useState, useRef } from "react";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Phone, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";
import { SuperAdminForgotPasswordModal } from "./SuperAdminForgotPasswordModal";

interface SuperAdminLoginPageProps {
  onNavigateToRegister: () => void;
  onNavigateToCustomerLogin: () => void;
}

export function SuperAdminLoginPage({ onNavigateToRegister, onNavigateToCustomerLogin }: SuperAdminLoginPageProps) {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  
  // OTP input refs
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginMethod === "phone") {
      // Simulate sending OTP
      console.log("Sending OTP to:", phoneNumber);
      setStep("otp");
    } else {
      // Email/Password login
      if (email === "admin@sustainaim.com" && password === "admin123") {
        window.location.href = "/super-admin/dashboard";
      } else {
        alert("Invalid credentials. Use admin@sustainaim.com / admin123");
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Verifying OTP:", otpCode);
    
    // Simulate OTP verification
    if (otpCode === "123456") {
      window.location.href = "/super-admin/dashboard";
    } else {
      alert("Invalid OTP. Try 123456 for demo.");
    }
  };

  const handleResendOtp = () => {
    console.log("Resending OTP to:", phoneNumber);
    setOtp(["", "", "", "", "", ""]);
    otpInputs.current[0]?.focus();
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in");
    window.location.href = "/super-admin/dashboard";
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-neutral-900/80 backdrop-blur-xl z-50 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button onClick={onNavigateToCustomerLogin} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="font-black text-xl text-white tracking-tighter leading-none">
                  Sustain<span className="text-emerald-400">AIM</span>
                </h1>
                <p className="text-[9px] text-emerald-400 font-black tracking-widest uppercase">
                  Super Admin
                </p>
              </div>
            </button>

            {/* Customer Portal Link */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-500 font-bold hidden sm:inline">
                Not an admin?
              </span>
              <button
                onClick={onNavigateToCustomerLogin}
                className="px-6 py-2.5 bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-neutral-700 hover:text-white transition-all"
              >
                Customer Portal
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
              <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-2xl shadow-emerald-500/20 rotate-3">
                <Shield className="w-10 h-10 text-emerald-400" />
              </div>
              <div>
                <h1 className="font-black text-3xl text-white tracking-tighter leading-none">
                  Sustain<span className="text-emerald-400">AIM</span>
                </h1>
                <p className="text-xs text-emerald-400 font-black tracking-widest uppercase mt-1">
                  Super Admin Portal
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Secure access for<br />
                <span className="text-emerald-400">System Administrators</span>
              </h2>
              <p className="text-lg text-neutral-400 font-bold leading-relaxed">
                Manage customer accounts, monitor platform performance, and configure system-wide settings with enterprise-grade security.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, text: "Military-grade encryption" },
                { icon: Lock, text: "Advanced access controls" },
                { icon: Phone, text: "Multi-factor authentication" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-neutral-300 font-bold">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
              <p className="text-xs text-amber-400 font-bold">
                ⚠️ All login attempts are monitored and recorded. Unauthorized access is strictly prohibited and will be prosecuted.
              </p>
            </div>
          </motion.div>

          {/* Right Section - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-neutral-800 border-2 border-neutral-700 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              <div className="mb-8">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                  Admin Sign In
                </h3>
                <p className="text-neutral-400 font-bold">
                  Access the system administration dashboard
                </p>
              </div>

              <AnimatePresence mode="wait">
                {step === "credentials" ? (
                  <motion.div
                    key="credentials"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Google Sign In Button */}
                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full mb-6 px-6 py-4 bg-neutral-700 border-2 border-neutral-600 rounded-xl font-bold text-neutral-300 hover:bg-neutral-600 hover:text-white transition-all flex items-center justify-center gap-3 group shadow-sm hover:shadow-md"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="text-sm font-bold">Sign in with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1 h-px bg-neutral-700"></div>
                      <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">Or</span>
                      <div className="flex-1 h-px bg-neutral-700"></div>
                    </div>

                    {/* Login Method Toggle */}
                    <div className="flex gap-2 mb-6 p-1 bg-neutral-700 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setLoginMethod("email")}
                        className={`flex-1 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                          loginMethod === "email"
                            ? "bg-emerald-600 text-white shadow-md"
                            : "text-neutral-400 hover:text-neutral-300"
                        }`}
                      >
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoginMethod("phone")}
                        className={`flex-1 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                          loginMethod === "phone"
                            ? "bg-emerald-600 text-white shadow-md"
                            : "text-neutral-400 hover:text-neutral-300"
                        }`}
                      >
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone
                      </button>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {loginMethod === "email" ? (
                        <>
                          {/* Email Input */}
                          <div>
                            <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@sustainaim.com"
                                className="w-full pl-12 pr-4 py-4 bg-neutral-700 border-2 border-neutral-600 rounded-xl font-bold text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none transition-all"
                                required
                              />
                            </div>
                          </div>

                          {/* Password Input */}
                          <div>
                            <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-2">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-4 bg-neutral-700 border-2 border-neutral-600 rounded-xl font-bold text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none transition-all"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          {/* Demo Credentials */}
                          <div className="bg-emerald-900/30 border-2 border-emerald-700 rounded-xl p-4">
                            <p className="text-xs font-bold text-emerald-300 mb-1">Demo Credentials:</p>
                            <p className="text-xs text-emerald-400 font-medium">
                              Email: <span className="font-black">admin@sustainaim.com</span>
                            </p>
                            <p className="text-xs text-emerald-400 font-medium">
                              Password: <span className="font-black">admin123</span>
                            </p>
                          </div>

                          {/* Remember Me & Forgot Password */}
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-emerald-600 focus:ring-emerald-500"
                              />
                              <span className="text-sm font-bold text-neutral-400">Remember me</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => setIsForgotPasswordOpen(true)}
                              className="text-sm font-black text-emerald-400 hover:text-emerald-300 uppercase tracking-widest"
                            >
                              Forgot?
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Phone Number Input */}
                          <div>
                            <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-2">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                              <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+1 (555) 000-0000"
                                className="w-full pl-12 pr-4 py-4 bg-neutral-700 border-2 border-neutral-600 rounded-xl font-bold text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none transition-all"
                                required
                              />
                            </div>
                            <p className="text-xs text-neutral-500 font-medium mt-2">
                              We'll send you a verification code via SMS
                            </p>
                          </div>
                        </>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-xl shadow-emerald-900/50 active:scale-[0.98]"
                      >
                        {loginMethod === "phone" ? "Send OTP" : "Sign In"}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* OTP Verification */}
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h4 className="text-xl font-black text-white mb-2">
                        Verify Your Phone
                      </h4>
                      <p className="text-sm text-neutral-400 font-medium">
                        Enter the 6-digit code sent to<br />
                        <span className="font-black text-neutral-300">{phoneNumber}</span>
                      </p>
                    </div>

                    <form onSubmit={handleOtpVerify} className="space-y-6">
                      {/* OTP Input Fields */}
                      <div className="flex gap-2 justify-center">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => (otpInputs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-12 h-14 text-center text-2xl font-black bg-neutral-700 border-2 border-neutral-600 text-white rounded-xl focus:border-emerald-500 focus:outline-none transition-all"
                          />
                        ))}
                      </div>

                      {/* Demo Info */}
                      <div className="bg-emerald-900/30 border-2 border-emerald-700 rounded-xl p-4">
                        <p className="text-xs font-bold text-emerald-300 text-center">
                          Demo: Use code <span className="font-black">123456</span> to verify
                        </p>
                      </div>

                      {/* Verify Button */}
                      <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-xl shadow-emerald-900/50 active:scale-[0.98]"
                      >
                        Verify & Sign In
                      </button>

                      {/* Resend OTP */}
                      <div className="text-center">
                        <p className="text-sm text-neutral-400 font-medium mb-2">
                          Didn't receive the code?
                        </p>
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="text-sm font-black text-emerald-400 hover:text-emerald-300 uppercase tracking-widest"
                        >
                          Resend OTP
                        </button>
                      </div>

                      {/* Back Button */}
                      <button
                        type="button"
                        onClick={() => setStep("credentials")}
                        className="w-full py-3 text-neutral-400 font-bold text-sm hover:text-neutral-300 transition-colors"
                      >
                        ← Change Phone Number
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Register Link */}
              {step === "credentials" && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-neutral-400 font-bold">
                    Need admin access?{" "}
                    <button onClick={onNavigateToRegister} className="text-emerald-400 font-black hover:text-emerald-300 uppercase tracking-widest">
                      Request Access
                    </button>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center">
                <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
              </div>
              <p className="text-neutral-600 text-xs font-black uppercase tracking-widest">
                © 2026 SustainAIM • All rights reserved
              </p>
            </div>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Security', 'Help'].map((link) => (
                <a key={link} href="#" className="text-xs font-black text-neutral-600 hover:text-emerald-400 uppercase tracking-widest transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      <SuperAdminForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
}