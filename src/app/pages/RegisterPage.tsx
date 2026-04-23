import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, User, Building2, Phone, CheckCircle, Send } from "lucide-react";
import { motion } from "motion/react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";

export function RegisterPage() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    company: "",
    message: "",
    interestedIn: "emissions-tracking"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Submit inquiry
    console.log("Inquiry submitted:", formData);
    setIsSubmitted(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
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

            {/* Sign In Link */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-600 font-bold hidden sm:inline">
                Already have an account?
              </span>
              <Link
                to="/signin"
                className="px-6 py-2.5 bg-[#2c7873] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#004445] transition-all shadow-lg shadow-[#2c7873]/20"
              >
                Sign In
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
                Get Started with<br />
                <span className="text-[#2c7873]">SustainAIM</span>
              </h2>
              <p className="text-lg text-neutral-600 font-bold leading-relaxed">
                Share your requirements and our team will reach out to help you get started with the right solution.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {[
                { icon: CheckCircle, text: "Free consultation with sustainability experts" },
                { icon: CheckCircle, text: "Custom solution tailored to your needs" },
                { icon: CheckCircle, text: "Quick response within 24 hours" },
                { icon: CheckCircle, text: "No commitment required" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d8f3f3] rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#004445]" />
                  </div>
                  <p className="text-neutral-700 font-bold">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="bg-[#d8f3f3] border border-[#2c7873]/20 rounded-2xl p-6">
              <p className="text-sm font-black text-[#004445] mb-2">
                Trusted by 2,400+ Organizations Worldwide
              </p>
              <p className="text-xs text-neutral-600 font-medium">
                ISO 27001 Certified • GDPR Compliant • SOC 2 Type II
              </p>
            </div>
          </motion.div>

          {/* Right Section - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white border-2 border-neutral-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-3xl font-black text-neutral-900 mb-2 tracking-tight">
                  Submit Inquiry
                </h3>
                <p className="text-neutral-500 font-bold">
                  Tell us about your sustainability needs
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-[#d8f3f3] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-[#004445]" />
                  </div>
                  <h4 className="text-2xl font-black text-neutral-900 mb-3">
                    Inquiry Submitted!
                  </h4>
                  <p className="text-neutral-600 font-bold">
                    Thank you for your interest. Our team will contact you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {/* Inquiry Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Smith"
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-[#2c7873] focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@company.com"
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-[#2c7873] focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                        Phone Number (Indian)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-[#2c7873] focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company Pvt Ltd"
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-[#2c7873] focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Interested In */}
                    <div>
                      <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                        I'm Interested In
                      </label>
                      <select
                        name="interestedIn"
                        value={formData.interestedIn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-[#2c7873] focus:outline-none transition-all"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="climate-change">Climate Change</option>
                        <option value="energy-efficiency">Energy Efficiency</option>
                        <option value="carbon-footprint">Carbon Footprint & Carbon Markets</option>
                        <option value="circular-economy">Circular Economy</option>
                        <option value="waste-management">Waste Management</option>
                        <option value="sustain-ability">Sustain Ability</option>
                        <option value="esg">Environmental Social & Governance</option>
                        <option value="ehs">Environmental Health Safety</option>
                        <option value="hydrogen-economy">Hydrogen Economy</option>
                        <option value="training-internship">Training and Internship</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                        Tell Us About Your Needs
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Describe your sustainability goals and challenges..."
                        rows={4}
                        className="w-full px-4 py-3.5 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-[#2c7873] focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#2c7873] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#004445] transition-all shadow-xl shadow-[#2c7873]/20 active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Submit Inquiry
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Sign In Link */}
              {!isSubmitted && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-neutral-500 font-bold">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-[#2c7873] font-black hover:text-[#004445] uppercase tracking-widest">
                      Sign In
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
    </div>
  );
}