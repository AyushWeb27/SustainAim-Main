import React, { useState } from "react";
import {
  MessageCircle,
  Send,
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  Paperclip,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Zap,
  HelpCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function BranchUserContactAdminPage() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "general",
    priority: "medium",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "general", label: "General Inquiry", icon: MessageCircle, color: "emerald" },
    { value: "technical", label: "Technical Support", icon: Zap, color: "blue" },
    { value: "data", label: "Data Entry Help", icon: FileText, color: "purple" },
    { value: "access", label: "Access & Permissions", icon: User, color: "amber" },
    { value: "report", label: "Report Issues", icon: AlertCircle, color: "red" },
    { value: "feedback", label: "Feedback", icon: Sparkles, color: "pink" },
  ];

  const priorities = [
    { value: "low", label: "Low Priority", color: "neutral" },
    { value: "medium", label: "Medium Priority", color: "blue" },
    { value: "high", label: "High Priority", color: "amber" },
    { value: "urgent", label: "Urgent", color: "red" },
  ];

  const adminContacts = [
    {
      name: "Rajesh Kumar",
      role: "Branch Administrator",
      email: "rajesh.kumar@sustainaim.com",
      phone: "+91 98765 43210",
      location: "Mumbai, India",
      availability: "Mon-Fri, 9:00 AM - 6:00 PM IST",
    },
  ];

  const responseTime = {
    low: "48-72 hours",
    medium: "24-48 hours",
    high: "12-24 hours",
    urgent: "Within 6 hours",
  };

  const quickHelp = [
    {
      icon: HelpCircle,
      title: "Check Help Center",
      description: "Find answers to common questions",
      link: "/branch-user/help",
      color: "emerald",
    },
    {
      icon: FileText,
      title: "View Documentation",
      description: "Browse comprehensive guides",
      link: "/branch-user/documentation",
      color: "blue",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! Your admin will respond soon.");
      setFormData({
        subject: "",
        category: "general",
        priority: "medium",
        message: "",
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const selectedCategory = categories.find((c) => c.value === formData.category);
  const CategoryIcon = selectedCategory?.icon || MessageCircle;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black">Contact Admin</h1>
          </div>
          <p className="text-purple-50 text-lg font-medium">
            Get help from your branch administrator for support, access requests, and inquiries
          </p>
        </div>
      </div>

      {/* Quick Help Options */}
      <div>
        <h2 className="text-sm font-black text-neutral-500 uppercase tracking-widest mb-4">
          Before You Contact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickHelp.map((item, idx) => {
            const Icon = item.icon;
            const colorClasses = {
              emerald: "from-emerald-500 to-emerald-600 shadow-emerald-200",
              blue: "from-blue-500 to-blue-600 shadow-blue-200",
            };

            return (
              <motion.a
                key={idx}
                href={item.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex items-center gap-4 bg-white rounded-2xl p-6 border-2 border-neutral-100 hover:border-purple-200 hover:shadow-xl transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[item.color as keyof typeof colorClasses]} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-600 font-medium">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 border-b-2 border-purple-200">
              <h2 className="text-2xl font-black text-neutral-900 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                Send a Message
              </h2>
              <p className="text-sm text-neutral-600 font-medium mt-2">
                Fill out the form below and your admin will respond based on priority
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Subject */}
              <div>
                <label className="block text-sm font-black text-neutral-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Brief description of your inquiry"
                  required
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-purple-500 focus:outline-none transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-black text-neutral-700 mb-3">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => handleInputChange("category", category.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          formData.category === category.value
                            ? "bg-purple-50 border-purple-500 shadow-lg shadow-purple-200"
                            : "bg-white border-neutral-200 hover:border-purple-300"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            formData.category === category.value ? "text-purple-600" : "text-neutral-500"
                          }`}
                        />
                        <span
                          className={`text-xs font-black ${
                            formData.category === category.value ? "text-purple-900" : "text-neutral-700"
                          }`}
                        >
                          {category.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-black text-neutral-700 mb-3">
                  Priority <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {priorities.map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      onClick={() => handleInputChange("priority", priority.value)}
                      className={`px-4 py-3 rounded-xl border-2 font-black text-sm transition-all ${
                        formData.priority === priority.value
                          ? "bg-purple-50 border-purple-500 text-purple-900 shadow-lg shadow-purple-200"
                          : "bg-white border-neutral-200 text-neutral-700 hover:border-purple-300"
                      }`}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-neutral-500 font-bold mt-2 flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Expected response time:{" "}
                  <span className="text-neutral-700">
                    {responseTime[formData.priority as keyof typeof responseTime]}
                  </span>
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-black text-neutral-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Describe your inquiry or issue in detail..."
                  required
                  rows={8}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-purple-500 focus:outline-none transition-all resize-none"
                />
                <p className="text-xs text-neutral-500 font-bold mt-2">
                  {formData.message.length} / 2000 characters
                </p>
              </div>

              {/* Attachment (placeholder) */}
              <div>
                <label className="block text-sm font-black text-neutral-700 mb-2">Attachments (Optional)</label>
                <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6 text-center hover:border-purple-300 transition-all cursor-pointer">
                  <Paperclip className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                  <p className="text-sm text-neutral-600 font-bold">
                    Click to attach files or drag and drop
                  </p>
                  <p className="text-xs text-neutral-500 font-medium mt-1">
                    Supported: PDF, PNG, JPG, XLSX (Max 10MB)
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-black text-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-xl shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Admin Information Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Admin Card */}
          {adminContacts.map((admin, idx) => (
            <div key={idx} className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-neutral-900">{admin.name}</h3>
                  <p className="text-sm text-neutral-600 font-bold">{admin.role}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">Email</p>
                    <a
                      href={`mailto:${admin.email}`}
                      className="text-sm text-purple-600 font-bold hover:underline"
                    >
                      {admin.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">Phone</p>
                    <a href={`tel:${admin.phone}`} className="text-sm text-purple-600 font-bold hover:underline">
                      {admin.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-sm text-neutral-700 font-bold">{admin.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                      Availability
                    </p>
                    <p className="text-sm text-neutral-700 font-bold">{admin.availability}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Response Time Info */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-emerald-600 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-emerald-900">Quick Response Guaranteed</h3>
                <p className="text-sm text-emerald-800 font-medium mt-1">
                  Your admin responds based on message priority
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {priorities.map((priority) => (
                <div key={priority.value} className="flex items-center justify-between text-sm">
                  <span className="text-emerald-800 font-bold">{priority.label}:</span>
                  <span className="text-emerald-900 font-black">
                    {responseTime[priority.value as keyof typeof responseTime]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Support Tips */}
          <div className="bg-white rounded-2xl border-2 border-neutral-100 p-6">
            <h3 className="font-black text-neutral-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Support Tips
            </h3>
            <ul className="space-y-3 text-sm text-neutral-700 font-medium">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0 mt-2" />
                <span>Be specific about your issue or request</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0 mt-2" />
                <span>Include relevant details and timestamps</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0 mt-2" />
                <span>Attach screenshots if applicable</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0 mt-2" />
                <span>Check Help Center for quick answers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
