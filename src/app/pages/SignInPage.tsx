import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Phone, CheckCircle, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";
import { ForgotPasswordModal } from "../components/ForgotPasswordModal";

export function SignInPage() {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+91",
    country: "India",
    flag: "🇮🇳",
  });
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  
  // OTP input refs
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Country codes list
  const countries = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "United States", flag: "🇺🇸" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+34", country: "Spain", flag: "🇪🇸" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+52", country: "Mexico", flag: "🇲🇽" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
    { code: "+60", country: "Malaysia", flag: "🇲🇾" },
    { code: "+62", country: "Indonesia", flag: "🇮🇩" },
    { code: "+66", country: "Thailand", flag: "🇹🇭" },
  ];

  // Filter countries based on search query
  const filteredCountries = countries.filter(country =>
    country.country.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
    country.code.includes(countrySearchQuery)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginMethod === "phone") {
      // Simulate sending OTP
      console.log("Sending OTP to:", phoneNumber);
      setStep("otp");
    } else {
      // Email/Password login
      console.log("Login attempt:", { email, password, rememberMe });
      navigate("/pricing");
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
    
    // Simulate OTP verification (in production, verify with backend)
    if (otpCode === "123456") {
      navigate("/pricing");
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
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="font-black text-xl text-neutral-900 tracking-tighter leading-none">
                  Sustain<span className="text-[#2c7873]">AIM</span>
                </h1>
              </div>
            </Link>

            {/* Sign Up Link */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-600 font-bold hidden sm:inline">
                Don't have an account?
              </span>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-[#2c7873] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#004445] transition-all shadow-lg shadow-[#2c7873]/20"
              >
                Sign Up
              </Link>
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
              <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-[#2c7873]/20 rotate-3">
                <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="font-black text-3xl text-neutral-900 tracking-tighter leading-none">
                  Sustain<span className="text-[#2c7873]">AIM</span>
                </h1>
                <p className="text-xs text-neutral-400 font-black tracking-widest uppercase mt-1">
                  Customer Portal
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter leading-tight">
                Welcome back to your<br />
                <span className="text-[#2c7873]">Sustainability</span> Hub
              </h2>
              <p className="text-lg text-neutral-600 font-bold leading-relaxed">
                Track emissions, generate reports, and accelerate your organization's journey to net-zero.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, text: "Enterprise-grade security" },
                { icon: Lock, text: "Bank-level encryption" },
                { icon: Phone, text: "Multi-factor authentication" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d8f3f3] rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#004445]" />
                  </div>
                  <p className="text-neutral-700 font-bold">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Section - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white border-2 border-neutral-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-3xl font-black text-neutral-900 mb-2 tracking-tight">
                  Sign In
                </h3>
                <p className="text-neutral-500 font-bold">
                  Access your sustainability dashboard
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
                      className="w-full mb-6 px-6 py-4 bg-white border-2 border-neutral-200 rounded-xl font-bold text-neutral-700 hover:bg-neutral-50 transition-all flex items-center justify-center gap-3 group shadow-sm hover:shadow-md"
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
                      <div className="flex-1 h-px bg-neutral-200"></div>
                      <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Or</span>
                      <div className="flex-1 h-px bg-neutral-200"></div>
                    </div>

                    {/* Login Method Toggle */}
                    <div className="flex gap-2 mb-6 p-1 bg-neutral-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setLoginMethod("email")}
                        className={`flex-1 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                          loginMethod === "email"
                            ? "bg-white text-[#2c7873] shadow-md"
                            : "text-neutral-500 hover:text-neutral-700"
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
                            ? "bg-white text-[#2c7873] shadow-md"
                            : "text-neutral-500 hover:text-neutral-700"
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
                            <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-[#2c7873] focus:outline-none transition-all"
                                required
                              />
                            </div>
                          </div>

                          {/* Password Input */}
                          <div>
                            <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-4 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-[#2c7873] focus:outline-none transition-all"
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

                          {/* Remember Me & Forgot Password */}
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-neutral-300 text-[#2c7873] focus:ring-[#2c7873]"
                              />
                              <span className="text-sm font-bold text-neutral-600">Remember me</span>
                            </label>
                            <a
                              href="#"
                              className="text-sm font-black text-[#2c7873] hover:text-[#004445] uppercase tracking-widest"
                              onClick={() => setShowForgotPasswordModal(true)}
                            >
                              Forgot?
                            </a>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Phone Number Input */}
                          <div>
                            <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                              Phone Number
                            </label>
                            <div className="flex gap-3">
                              {/* Country Code Selector */}
                              <div className="relative w-[140px] shrink-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowCountryDropdown(!showCountryDropdown);
                                    if (showCountryDropdown) {
                                      setCountrySearchQuery("");
                                    }
                                  }}
                                  className="w-full flex items-center justify-between gap-2 px-3 py-4 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 hover:border-[#2c7873] focus:border-[#2c7873] focus:outline-none transition-all bg-white h-[56px]"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{selectedCountry.flag}</span>
                                    <span className="text-sm font-black">{selectedCountry.code}</span>
                                  </div>
                                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Country Dropdown */}
                                {showCountryDropdown && (
                                  <div className="absolute top-full left-0 mt-2 w-80 bg-white border-2 border-neutral-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                                    {/* Search Input */}
                                    <div className="p-3 border-b-2 border-neutral-100 bg-white">
                                      <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <input
                                          type="text"
                                          value={countrySearchQuery}
                                          onChange={(e) => setCountrySearchQuery(e.target.value)}
                                          placeholder="Search country or code..."
                                          className="w-full pl-10 pr-4 py-2.5 border-2 border-neutral-200 rounded-lg font-bold text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#2c7873] focus:outline-none transition-all"
                                          onClick={(e) => e.stopPropagation()}
                                          autoFocus
                                        />
                                      </div>
                                    </div>

                                    {/* Countries List */}
                                    <div className="max-h-64 overflow-y-auto">
                                      {filteredCountries.length > 0 ? (
                                        filteredCountries.map((country) => (
                                          <button
                                            key={country.code}
                                            type="button"
                                            onClick={() => {
                                              setSelectedCountry(country);
                                              setShowCountryDropdown(false);
                                              setCountrySearchQuery("");
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#d8f3f3] transition-colors text-left ${
                                              selectedCountry.code === country.code ? 'bg-[#d8f3f3]' : ''
                                            }`}
                                          >
                                            <span className="text-xl">{country.flag}</span>
                                            <span className="flex-1 font-bold text-neutral-700 text-sm">{country.country}</span>
                                            <span className="font-black text-[#2c7873] text-sm">{country.code}</span>
                                          </button>
                                        ))
                                      ) : (
                                        <div className="px-4 py-8 text-center">
                                          <p className="text-sm font-bold text-neutral-400">No countries found</p>
                                          <p className="text-xs text-neutral-400 mt-1">Try a different search term</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Phone Number Input */}
                              <div className="relative flex-1">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                  type="tel"
                                  value={phoneNumber}
                                  onChange={(e) => setPhoneNumber(e.target.value)}
                                  placeholder="98765 43210"
                                  className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-[#2c7873] focus:outline-none transition-all h-[56px]"
                                  required
                                />
                              </div>
                            </div>
                            <p className="text-xs text-neutral-500 font-medium mt-2.5">
                              We'll send you a verification code via SMS
                            </p>
                          </div>
                        </>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#2c7873] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#004445] transition-all shadow-xl shadow-[#2c7873]/20 active:scale-[0.98]"
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
                      <div className="w-16 h-16 bg-[#d8f3f3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-[#004445]" />
                      </div>
                      <h4 className="text-xl font-black text-neutral-900 mb-2">
                        Verify Your Phone
                      </h4>
                      <p className="text-sm text-neutral-500 font-medium">
                        Enter the 6-digit code sent to<br />
                        <span className="font-black text-neutral-700">{selectedCountry.code} {phoneNumber}</span>
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
                            className="w-12 h-14 text-center text-2xl font-black border-2 border-neutral-200 rounded-xl focus:border-[#2c7873] focus:outline-none transition-all"
                          />
                        ))}
                      </div>

                      {/* Demo Info */}
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-blue-900 text-center">
                          Demo: Use code <span className="font-black">123456</span> to verify
                        </p>
                      </div>

                      {/* Verify Button */}
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#2c7873] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#004445] transition-all shadow-xl shadow-[#2c7873]/20 active:scale-[0.98]"
                      >
                        Verify & Sign In
                      </button>

                      {/* Resend OTP */}
                      <div className="text-center">
                        <p className="text-sm text-neutral-500 font-medium mb-2">
                          Didn't receive the code?
                        </p>
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="text-sm font-black text-[#2c7873] hover:text-[#004445] uppercase tracking-widest"
                        >
                          Resend OTP
                        </button>
                      </div>

                      {/* Back Button */}
                      <button
                        type="button"
                        onClick={() => setStep("credentials")}
                        className="w-full py-3 text-neutral-600 font-bold text-sm hover:text-neutral-900 transition-colors"
                      >
                        ← Change Phone Number
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sign Up Link */}
              {step === "credentials" && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-neutral-500 font-bold">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-[#2c7873] font-black hover:text-[#004445] uppercase tracking-widest">
                      Sign Up
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-100 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center">
                <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
              </div>
              <p className="text-neutral-400 text-xs font-black uppercase tracking-widest">
                © 2026 SustainAIM • All rights reserved
              </p>
            </div>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Security', 'Help'].map((link) => (
                <a key={link} href="#" className="text-xs font-black text-neutral-400 hover:text-[#2c7873] uppercase tracking-widest transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />
    </div>
  );
}