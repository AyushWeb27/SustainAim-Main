import React, { useState } from "react";
import { User, Mail, Phone, Building2, Lock, Eye, EyeOff, CheckCircle, MapPin, CreditCard } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function CreateCustomerPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    plan: "Starter",
    billingCycle: "monthly"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Creating customer account:", formData);
      toast.success("Customer account created successfully!");
      setIsCreating(false);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        companyAddress: "",
        city: "",
        state: "",
        pincode: "",
        password: "",
        plan: "Starter",
        billingCycle: "monthly"
      });
    }, 1500);
  };

  const plans = [
    { value: "Starter", label: "Starter - ₹2,999/month", color: "blue" },
    { value: "Professional", label: "Professional - ₹8,999/month", color: "emerald" },
    { value: "Enterprise", label: "Enterprise - ₹24,999/month", color: "purple" },
    { value: "Ultimate", label: "Ultimate - ₹49,999/month", color: "amber" }
  ];

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-black text-blue-900 mb-2">
              Create Customer Account Directly
            </h3>
            <p className="text-sm text-blue-700 font-bold leading-relaxed">
              Use this form to create customer accounts without requiring them to go through the registration process.
              The account will be created with full access to the selected plan immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Creation Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-neutral-100 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          Customer Account Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-neutral-700 uppercase tracking-widest">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Rajesh Kumar"
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="rajesh@company.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Phone Number (India) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
                    required
                    minLength={8}
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
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <h3 className="text-sm font-black text-neutral-700 uppercase tracking-widest">
              Company Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Tech Solutions Pvt Ltd"
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Company Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Company Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                    placeholder="123, MG Road"
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Mumbai"
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
                  required
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Maharashtra"
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
                  required
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="400001"
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
                  required
                  pattern="[0-9]{6}"
                  maxLength={6}
                />
              </div>
            </div>
          </div>

          {/* Subscription Plan */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <h3 className="text-sm font-black text-neutral-700 uppercase tracking-widest">
              Subscription Plan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Plan Selection */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Select Plan *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all appearance-none"
                    required
                  >
                    {plans.map(plan => (
                      <option key={plan.value} value={plan.value}>
                        {plan.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Billing Cycle */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Billing Cycle *
                </label>
                <select
                  name="billingCycle"
                  value={formData.billingCycle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all appearance-none"
                  required
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly (10% off)</option>
                  <option value="annual">Annual (20% off)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4 pt-6">
            <button
              type="submit"
              disabled={isCreating}
              className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Create Customer Account
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-sm font-black text-emerald-900">
              Instant Access
            </h4>
          </div>
          <p className="text-xs text-emerald-700 font-medium">
            Account is activated immediately with full plan features
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-sm font-black text-blue-900">
              Auto Email
            </h4>
          </div>
          <p className="text-xs text-blue-700 font-medium">
            Welcome email with login credentials sent automatically
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-sm font-black text-purple-900">
              Secure Setup
            </h4>
          </div>
          <p className="text-xs text-purple-700 font-medium">
            Password encrypted and stored securely in database
          </p>
        </div>
      </div>
    </div>
  );
}
