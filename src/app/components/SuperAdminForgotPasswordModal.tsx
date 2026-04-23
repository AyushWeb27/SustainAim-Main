import React, { useState, useRef } from "react";
import { X, Mail, Phone, ArrowLeft, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SuperAdminForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuperAdminForgotPasswordModal({ isOpen, onClose }: SuperAdminForgotPasswordModalProps) {
  const [step, setStep] = useState<"method" | "verify" | "reset" | "success">("method");
  const [resetMethod, setResetMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending OTP to:", resetMethod === "email" ? email : phoneNumber);
    setStep("verify");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode === "123456") {
      setStep("reset");
    } else {
      alert("Invalid OTP. Use 123456 for demo.");
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    console.log("Password reset successful!");
    setStep("success");
  };

  const handleResendOtp = () => {
    console.log("Resending OTP...");
    setOtp(["", "", "", "", "", ""]);
    otpInputs.current[0]?.focus();
    alert("OTP resent! Use 123456 for demo.");
  };

  const handleClose = () => {
    setStep("method");
    setEmail("");
    setPhoneNumber("");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-neutral-800 border-2 border-neutral-700 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-700 flex items-center justify-between">
          <h2 className="text-2xl font-black text-white tracking-tight">
            {step === "method" && "Reset Password"}
            {step === "verify" && "Verify OTP"}
            {step === "reset" && "New Password"}
            {step === "success" && "Success!"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Choose Reset Method */}
            {step === "method" && (
              <motion.div
                key="method"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <p className="text-neutral-400 font-bold mb-6">
                  Choose how you want to reset your password
                </p>

                {/* Method Selection */}
                <div className="flex gap-2 mb-6 p-1 bg-neutral-700 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setResetMethod("email")}
                    className={`flex-1 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                      resetMethod === "email"
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-neutral-400 hover:text-neutral-300"
                    }`}
                  >
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetMethod("phone")}
                    className={`flex-1 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                      resetMethod === "phone"
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-neutral-400 hover:text-neutral-300"
                    }`}
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone
                  </button>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-5">
                  {resetMethod === "email" ? (
                    <div>
                      <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-2">
                        Admin Email Address
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
                      <p className="text-xs text-neutral-500 font-medium mt-2">
                        We'll send a verification code to your registered email
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-2">
                        Admin Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-12 pr-4 py-4 bg-neutral-700 border-2 border-neutral-600 rounded-xl font-bold text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none transition-all"
                          required
                        />
                      </div>
                      <p className="text-xs text-neutral-500 font-medium mt-2">
                        We'll send a verification code via SMS
                      </p>
                    </div>
                  )}

                  {/* Demo Info */}
                  <div className="bg-emerald-900/30 border-2 border-emerald-700 rounded-xl p-4">
                    <p className="text-xs font-bold text-emerald-300 mb-1">Demo Mode:</p>
                    <p className="text-xs text-emerald-400 font-medium">
                      Use any email/phone. OTP will be: <span className="font-black">123456</span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-xl shadow-emerald-900/50 active:scale-[0.98]"
                  >
                    Send Verification Code
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Verify OTP */}
            {step === "verify" && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {resetMethod === "email" ? (
                      <Mail className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <Phone className="w-8 h-8 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-sm text-neutral-400 font-medium">
                    Enter the 6-digit code sent to<br />
                    <span className="font-black text-neutral-300">
                      {resetMethod === "email" ? email : phoneNumber}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-6">
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
                      Demo: Use code <span className="font-black">123456</span>
                    </p>
                  </div>

                  {/* Verify Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-xl shadow-emerald-900/50 active:scale-[0.98]"
                  >
                    Verify Code
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
                      Resend Code
                    </button>
                  </div>

                  {/* Back Button */}
                  <button
                    type="button"
                    onClick={() => setStep("method")}
                    className="w-full py-3 text-neutral-400 font-bold text-sm hover:text-neutral-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change Method
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 3: Reset Password */}
            {step === "reset" && (
              <motion.div
                key="reset"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <p className="text-neutral-400 font-bold mb-6">
                  Create a new strong password for your admin account
                </p>

                <form onSubmit={handleResetPassword} className="space-y-5">
                  {/* New Password */}
                  <div>
                    <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-4 bg-neutral-700 border-2 border-neutral-600 rounded-xl font-bold text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-4 bg-neutral-700 border-2 border-neutral-600 rounded-xl font-bold text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-neutral-700 border border-neutral-600 rounded-xl p-4">
                    <p className="text-xs font-black text-neutral-300 mb-2">Password Requirements:</p>
                    <ul className="space-y-1 text-xs text-neutral-400">
                      <li className={`${newPassword.length >= 8 ? 'text-emerald-400' : ''}`}>
                        • At least 8 characters
                      </li>
                      <li className={`${/[A-Z]/.test(newPassword) ? 'text-emerald-400' : ''}`}>
                        • One uppercase letter
                      </li>
                      <li className={`${/[a-z]/.test(newPassword) ? 'text-emerald-400' : ''}`}>
                        • One lowercase letter
                      </li>
                      <li className={`${/[0-9]/.test(newPassword) ? 'text-emerald-400' : ''}`}>
                        • One number
                      </li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-xl shadow-emerald-900/50 active:scale-[0.98]"
                  >
                    Reset Password
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  Password Reset Successful!
                </h3>
                <p className="text-neutral-400 font-bold mb-8">
                  Your admin password has been reset successfully.<br />
                  You can now sign in with your new password.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-xl shadow-emerald-900/50 active:scale-[0.98]"
                >
                  Back to Sign In
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
