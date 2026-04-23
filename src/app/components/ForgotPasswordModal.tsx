import React, { useState, useRef } from "react";
import { Lock, Mail, Phone, CheckCircle2, X, Eye, EyeOff, ArrowLeft, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<"method" | "otp" | "reset" | "success">("method");
  const [resetMethod, setResetMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(newPassword);
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;

  const getStrengthColor = (strength: number) => {
    if (strength <= 1) return "bg-red-500";
    if (strength <= 2) return "bg-orange-500";
    if (strength <= 3) return "bg-amber-500";
    if (strength <= 4) return "bg-emerald-500";
    return "bg-emerald-600";
  };

  const getStrengthLabel = (strength: number) => {
    if (strength <= 1) return "Very Weak";
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength <= 4) return "Strong";
    return "Very Strong";
  };

  const requirements = [
    { label: "At least 8 characters", met: newPassword.length >= 8 },
    { label: "Contains uppercase & lowercase", met: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword) },
    { label: "Contains a number", met: /\d/.test(newPassword) },
    { label: "Contains a special character", met: /[^a-zA-Z0-9]/.test(newPassword) }
  ];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`OTP sent to ${resetMethod === "email" ? email : phoneNumber}`);
      setStep("otp");
      setTimeout(() => otpInputs.current[0]?.focus(), 100);
    }, 1500);
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

    if (otpCode.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification (demo code: 123456)
    setTimeout(() => {
      setIsLoading(false);
      if (otpCode === "123456") {
        toast.success("OTP verified successfully!");
        setStep("reset");
      } else {
        toast.error("Invalid OTP. Try 123456 for demo.");
      }
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordStrength < 3) {
      toast.error("Password is not strong enough");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      toast.success("Password reset successfully!");
    }, 1500);
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    toast.info(`OTP resent to ${resetMethod === "email" ? email : phoneNumber}`);
    setTimeout(() => otpInputs.current[0]?.focus(), 100);
  };

  const handleClose = () => {
    setStep("method");
    setResetMethod("email");
    setEmail("");
    setPhoneNumber("");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-neutral-800 rounded-3xl border-2 border-neutral-100 dark:border-neutral-700 p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-2xl">
                  <Lock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
                    {step === "method" && "Forgot Password"}
                    {step === "otp" && "Verify OTP"}
                    {step === "reset" && "Set New Password"}
                    {step === "success" && "Password Reset"}
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                    {step === "method" && "Choose how to reset your password"}
                    {step === "otp" && "Enter the code we sent you"}
                    {step === "reset" && "Create a strong password"}
                    {step === "success" && "Successfully updated"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Steps */}
            {step !== "success" && (
              <div className="flex items-center justify-between mb-8">
                {[
                  { id: "method", label: "Method" },
                  { id: "otp", label: "Verify" },
                  { id: "reset", label: "Reset" }
                ].map((s, index) => (
                  <div key={s.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors text-xs font-black ${
                        step === s.id 
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : ["method", "otp", "reset"].indexOf(s.id) < ["method", "otp", "reset"].indexOf(step)
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "bg-neutral-100 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 text-neutral-400"
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`text-xs font-bold mt-2 ${
                        step === s.id ? "text-emerald-600" : "text-neutral-400"
                      }`}>
                        {s.label}
                      </span>
                    </div>
                    {index < 2 && (
                      <div className={`h-0.5 flex-1 -mt-6 transition-colors ${
                        ["method", "otp", "reset"].indexOf(step) > index
                          ? "bg-emerald-600"
                          : "bg-neutral-200 dark:bg-neutral-600"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {/* Step 1: Choose Method */}
              {step === "method" && (
                <motion.div
                  key="method"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Method Toggle */}
                  <div className="flex gap-2 p-1 bg-neutral-100 dark:bg-neutral-700 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setResetMethod("email")}
                      className={`flex-1 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                        resetMethod === "email"
                          ? "bg-white dark:bg-neutral-600 text-emerald-600 shadow-md"
                          : "text-neutral-500 hover:text-neutral-700"
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
                          ? "bg-white dark:bg-neutral-600 text-emerald-600 shadow-md"
                          : "text-neutral-500 hover:text-neutral-700"
                      }`}
                    >
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone
                    </button>
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-6">
                    {resetMethod === "email" ? (
                      <div>
                        <label className="block text-sm font-black text-neutral-700 dark:text-neutral-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl font-bold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all bg-transparent"
                            placeholder="you@company.com"
                            required
                          />
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-2">
                          We'll send a 6-digit verification code to this email
                        </p>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-black text-neutral-700 dark:text-neutral-300 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl font-bold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all bg-transparent"
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-2">
                          We'll send a 6-digit verification code via SMS
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading || (resetMethod === "email" ? !email : !phoneNumber)}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send Verification Code"
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Step 2: Verify OTP */}
              {step === "otp" && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {resetMethod === "email" ? (
                        <Mail className="w-8 h-8 text-emerald-600" />
                      ) : (
                        <Phone className="w-8 h-8 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                      Code sent to<br />
                      <span className="font-black text-neutral-900 dark:text-white">
                        {resetMethod === "email" ? email : phoneNumber}
                      </span>
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    {/* OTP Input */}
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
                          className="w-12 h-14 text-center text-2xl font-black border-2 border-neutral-200 dark:border-neutral-600 rounded-xl focus:border-emerald-500 focus:outline-none transition-all bg-transparent text-neutral-900 dark:text-white"
                        />
                      ))}
                    </div>

                    {/* Demo Info */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
                      <p className="text-xs font-bold text-blue-900 dark:text-blue-300 text-center">
                        Demo: Use code <span className="font-black">123456</span> to verify
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading || otp.join("").length !== 6}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Verifying...
                          </span>
                        ) : (
                          "Verify Code"
                        )}
                      </button>

                      <div className="text-center">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-2">
                          Didn't receive the code?
                        </p>
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="text-sm font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest"
                        >
                          Resend Code
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep("method")}
                        className="w-full flex items-center justify-center gap-2 py-3 text-neutral-600 dark:text-neutral-400 font-bold text-sm hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Change {resetMethod === "email" ? "Email" : "Phone Number"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 3: Reset Password */}
              {step === "reset" && (
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <form onSubmit={handleResetPassword} className="space-y-6">
                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-black text-neutral-700 dark:text-neutral-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-3 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl font-bold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all bg-transparent"
                          placeholder="Enter new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Password Strength */}
                      {newPassword && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                              Password Strength:
                            </span>
                            <span className={`text-xs font-black ${
                              passwordStrength <= 2 ? 'text-red-600' : 
                              passwordStrength <= 3 ? 'text-amber-600' : 
                              'text-emerald-600'
                            }`}>
                              {getStrengthLabel(passwordStrength)}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((bar) => (
                              <div
                                key={bar}
                                className={`h-1.5 flex-1 rounded-full transition-colors ${
                                  bar <= passwordStrength ? getStrengthColor(passwordStrength) : 'bg-neutral-200 dark:bg-neutral-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-black text-neutral-700 dark:text-neutral-300 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-3 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl font-bold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all bg-transparent"
                          placeholder="Confirm new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Password Match Indicator */}
                      {confirmPassword && (
                        <div className="mt-2 flex items-center gap-2">
                          {passwordsMatch ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span className="text-xs font-bold text-emerald-600">Passwords match</span>
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4 text-red-600" />
                              <span className="text-xs font-bold text-red-600">Passwords do not match</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Requirements */}
                    {newPassword && (
                      <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-4">
                        <p className="text-xs font-black text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-3">
                          Password Requirements
                        </p>
                        <div className="space-y-2">
                          {requirements.map((req, index) => (
                            <div key={index} className="flex items-center gap-2">
                              {req.met ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-neutral-300 dark:border-neutral-500 shrink-0" />
                              )}
                              <span className={`text-xs font-medium ${
                                req.met ? 'text-emerald-700 dark:text-emerald-400' : 'text-neutral-500 dark:text-neutral-400'
                              }`}>
                                {req.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading || passwordStrength < 3 || !passwordsMatch}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Resetting...
                        </span>
                      ) : (
                        "Reset Password"
                      )}
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
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-3">
                    Password Reset Successfully!
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 font-medium mb-8">
                    Your password has been updated. You can now sign in with your new password.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                  >
                    Back to Sign In
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
