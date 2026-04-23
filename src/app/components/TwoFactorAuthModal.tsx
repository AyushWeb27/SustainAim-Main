import React, { useState } from "react";
import { Shield, Copy, Check, Smartphone, X, AlertCircle, CheckCircle2, Key } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface TwoFactorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TwoFactorAuthModal({ isOpen, onClose }: TwoFactorAuthModalProps) {
  const [step, setStep] = useState<"setup" | "verify" | "backup">("setup");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);

  // Mock data - in production this would come from your backend
  const secretKey = "JBSWY3DPEHPK3PXP JBSWY3DPEHPK3PXP";
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=otpauth://totp/SustainAIM:user@example.com?secret=JBSWY3DPEHPK3PXPJBSWY3DPEHPK3PXP&issuer=SustainAIM";
  const backupCodes = [
    "A1B2-C3D4-E5F6",
    "G7H8-I9J0-K1L2",
    "M3N4-O5P6-Q7R8",
    "S9T0-U1V2-W3X4",
    "Y5Z6-A7B8-C9D0",
    "E1F2-G3H4-I5J6",
    "K7L8-M9N0-O1P2",
    "Q3R4-S5T6-U7V8"
  ];

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey.replace(/\s/g, ""));
    setCopiedSecret(true);
    toast.success("Secret key copied to clipboard");
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const handleCopyBackup = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    setCopiedBackup(true);
    toast.success("Backup codes copied to clipboard");
    setTimeout(() => setCopiedBackup(false), 2000);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    setIsLoading(true);

    // Simulate API verification
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Code verified successfully!");
      setStep("backup");
    }, 1500);
  };

  const handleComplete = () => {
    toast.success("Two-factor authentication enabled!");
    handleClose();
  };

  const handleClose = () => {
    setStep("setup");
    setVerificationCode("");
    setCopiedSecret(false);
    setCopiedBackup(false);
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
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
                    Two-Factor Authentication
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                    {step === "setup" && "Secure your account with 2FA"}
                    {step === "verify" && "Verify your authenticator app"}
                    {step === "backup" && "Save your backup codes"}
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
            <div className="flex items-center justify-between mb-8">
              {[
                { id: "setup", label: "Setup", icon: Smartphone },
                { id: "verify", label: "Verify", icon: Key },
                { id: "backup", label: "Backup", icon: CheckCircle2 }
              ].map((s, index) => (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      step === s.id 
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : index < ["setup", "verify", "backup"].indexOf(step)
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "bg-neutral-100 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 text-neutral-400"
                    }`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-bold mt-2 ${
                      step === s.id ? "text-emerald-600" : "text-neutral-400"
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className={`h-0.5 flex-1 -mt-6 transition-colors ${
                      index < ["setup", "verify", "backup"].indexOf(step)
                        ? "bg-emerald-600"
                        : "bg-neutral-200 dark:bg-neutral-600"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Setup Step */}
            {step === "setup" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Instructions */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-black text-blue-900 dark:text-blue-300 mb-2">Before you begin</h3>
                      <ul className="text-sm text-blue-800 dark:text-blue-400 font-medium space-y-1">
                        <li>• Download an authenticator app (Google Authenticator, Authy, or Microsoft Authenticator)</li>
                        <li>• Keep your phone nearby to scan the QR code</li>
                        <li>• Save your backup codes in a secure location</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="text-center">
                  <p className="text-sm font-black text-neutral-700 dark:text-neutral-300 mb-4">
                    Scan this QR code with your authenticator app
                  </p>
                  <div className="inline-block p-4 bg-white dark:bg-neutral-700 rounded-2xl border-2 border-neutral-200 dark:border-neutral-600 shadow-lg">
                    <img
                      src={qrCodeUrl}
                      alt="2FA QR Code"
                      className="w-64 h-64"
                    />
                  </div>
                </div>

                {/* Manual Entry */}
                <div>
                  <p className="text-sm font-black text-neutral-700 dark:text-neutral-300 mb-3">
                    Or enter this code manually
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 px-4 py-3 bg-neutral-100 dark:bg-neutral-700 rounded-xl font-mono text-sm font-bold text-neutral-900 dark:text-white">
                      {secretKey}
                    </div>
                    <button
                      onClick={handleCopySecret}
                      className="p-3 bg-emerald-100 text-emerald-600 hover:bg-emerald-200 rounded-xl transition-colors"
                      title="Copy secret key"
                    >
                      {copiedSecret ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setStep("verify")}
                  className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                  Continue to Verification
                </button>
              </motion.div>
            )}

            {/* Verify Step */}
            {step === "verify" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-black text-emerald-900 dark:text-emerald-300 mb-2">Enter the code from your app</h3>
                      <p className="text-sm text-emerald-800 dark:text-emerald-400 font-medium">
                        Open your authenticator app and enter the 6-digit code shown for SustainAIM
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                  <div>
                    <label className="block text-sm font-black text-neutral-700 dark:text-neutral-300 mb-3">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="w-full px-6 py-4 text-center text-2xl font-black tracking-widest border-2 border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all bg-transparent"
                      placeholder="000000"
                      maxLength={6}
                      required
                    />
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-2 text-center">
                      Enter the 6-digit code from your authenticator app
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep("setup")}
                      className="flex-1 px-6 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-xl font-black hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all"
                      disabled={isLoading}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading || verificationCode.length !== 6}
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
                  </div>
                </form>
              </motion.div>
            )}

            {/* Backup Codes Step */}
            {step === "backup" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-black text-amber-900 dark:text-amber-300 mb-2">Save these backup codes</h3>
                      <p className="text-sm text-amber-800 dark:text-amber-400 font-medium">
                        Store these codes in a secure location. Each code can only be used once if you lose access to your authenticator app.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Backup Codes Grid */}
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                      Backup Codes
                    </h3>
                    <button
                      onClick={handleCopyBackup}
                      className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
                    >
                      {copiedBackup ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy All
                        </>
                      )}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {backupCodes.map((code, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 bg-white dark:bg-neutral-800 rounded-xl font-mono text-sm font-bold text-neutral-900 dark:text-white text-center border-2 border-neutral-200 dark:border-neutral-600"
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download Option */}
                <button
                  onClick={() => {
                    const blob = new Blob([backupCodes.join("\n")], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "sustainaim-backup-codes.txt";
                    a.click();
                    toast.success("Backup codes downloaded");
                  }}
                  className="w-full px-6 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-xl font-black hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all border-2 border-neutral-200 dark:border-neutral-600"
                >
                  Download as Text File
                </button>

                {/* Complete Button */}
                <button
                  onClick={handleComplete}
                  className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                  Complete Setup
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
