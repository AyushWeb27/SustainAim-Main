import React, { useState } from "react";
import {
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  Video,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Send,
  Clock,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Leaf,
  BarChart3,
  Settings,
  CreditCard,
  Lock,
  Download,
  PlayCircle,
  Headphones,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import { AIChatWidget } from "../components/AIChatWidget";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportCard {
  icon: any;
  title: string;
  description: string;
  action: string;
  color: string;
}

export function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  const categories = [
    { id: "all", label: "All Topics", icon: Book },
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "emissions", label: "Emissions Tracking", icon: Leaf },
    { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
    { id: "account", label: "Account & Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
  ];

  const faqs: FAQ[] = [
    {
      id: "1",
      category: "getting-started",
      question: "How do I get started with SustainAIM?",
      answer: "Getting started is easy! After signing up, you'll be guided through a quick onboarding process. First, set up your organization profile, then connect your data sources. You can start tracking emissions immediately by adding your first scope 1, 2, or 3 activities. Our dashboard will automatically calculate your carbon footprint and provide insights."
    },
    {
      id: "2",
      category: "getting-started",
      question: "What are Scope 1, 2, and 3 emissions?",
      answer: "Scope 1 emissions are direct emissions from owned or controlled sources (e.g., company vehicles, on-site fuel combustion). Scope 2 emissions are indirect emissions from purchased energy (e.g., electricity, heating). Scope 3 emissions are all other indirect emissions in your value chain (e.g., business travel, supply chain, waste)."
    },
    {
      id: "3",
      category: "emissions",
      question: "How accurate are the emission calculations?",
      answer: "Our calculations use internationally recognized emission factors from databases like DEFRA, EPA, and IPCC. We update these factors regularly to ensure accuracy. For the most precise results, you can also input custom emission factors specific to your operations. Our methodology is aligned with the GHG Protocol standards."
    },
    {
      id: "4",
      category: "emissions",
      question: "Can I import data from other systems?",
      answer: "Yes! SustainAIM supports multiple import methods including CSV uploads, API integrations, and direct connections to popular business tools. You can import data from accounting software, energy management systems, and other sustainability platforms. Our Professional and Enterprise plans include automated data collection."
    },
    {
      id: "5",
      category: "reports",
      question: "What types of reports can I generate?",
      answer: "You can generate comprehensive sustainability reports including carbon footprint summaries, trend analysis, scope breakdowns, and compliance reports (CDP, TCFD, GRI). Reports can be customized with your branding and exported in PDF, Excel, or CSV formats. Scheduled automated reports are available on Professional and Enterprise plans."
    },
    {
      id: "6",
      category: "reports",
      question: "How do I export my data?",
      answer: "Navigate to any report or dashboard, click the 'Export' button in the top-right corner, and select your preferred format (PDF, CSV, or Excel). You can also set up automated exports to be delivered via email on a schedule. All your raw data can be exported from the Settings > Data & Storage section."
    },
    {
      id: "7",
      category: "account",
      question: "How do I upgrade or downgrade my plan?",
      answer: "Go to Settings > Subscription to view your current plan and available options. Click 'Change Plan' to upgrade or downgrade. Changes take effect immediately for upgrades (prorated billing) or at the end of your current billing cycle for downgrades. You won't lose any data when changing plans."
    },
    {
      id: "8",
      category: "account",
      question: "Can I add multiple users to my account?",
      answer: "Yes! The number of users depends on your plan: Starter (1 user), Professional (up to 10 users), Enterprise (unlimited). Add users from Settings > Team Management. You can assign different permission levels to control access to sensitive data and features."
    },
    {
      id: "9",
      category: "security",
      question: "How is my data protected?",
      answer: "We use bank-level 256-bit AES encryption for data at rest and TLS 1.3 for data in transit. Our infrastructure is hosted on secure AWS servers with SOC 2 Type II certification. We perform regular security audits, penetration testing, and maintain compliance with GDPR, ISO 27001, and other international standards."
    },
    {
      id: "10",
      category: "security",
      question: "Do you offer two-factor authentication?",
      answer: "Yes! Two-factor authentication (2FA) is available for all plans. Enable it from Settings > Security. We support authenticator apps (Google Authenticator, Authy) and SMS-based verification. We strongly recommend enabling 2FA for enhanced account security."
    }
  ];

  const supportCards: SupportCard[] = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      color: "emerald"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      action: "Send Email",
      color: "blue"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for urgent issues (Enterprise only)",
      action: "Call Now",
      color: "purple"
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Browse our comprehensive knowledge base",
      action: "View Docs",
      color: "amber"
    }
  ];

  const videoTutorials = [
    {
      title: "Getting Started with SustainAIM",
      duration: "5:30",
      thumbnail: "intro",
      views: "12.5K"
    },
    {
      title: "How to Track Scope 1 Emissions",
      duration: "8:15",
      thumbnail: "scope1",
      views: "8.2K"
    },
    {
      title: "Creating Custom Reports",
      duration: "6:45",
      thumbnail: "reports",
      views: "6.8K"
    },
    {
      title: "Setting Up API Integrations",
      duration: "10:20",
      thumbnail: "api",
      views: "4.5K"
    }
  ];

  const quickLinks = [
    { icon: Zap, label: "Quick Start Guide", color: "emerald" },
    { icon: Download, label: "Download Mobile App", color: "blue" },
    { icon: FileText, label: "API Documentation", color: "purple" },
    { icon: Users, label: "Community Forum", color: "amber" },
    { icon: TrendingUp, label: "Best Practices", color: "green" },
    { icon: Settings, label: "Integration Guides", color: "indigo" }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    // Reset form
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full mb-4"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-black tracking-widest uppercase text-emerald-700">
            We're Here to Help
          </span>
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight mb-3">
          Help & Support Center
        </h1>
        <p className="text-neutral-500 font-bold max-w-2xl mx-auto">
          Find answers to your questions, browse documentation, or contact our support team
        </p>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help articles, guides, and FAQs..."
            className="w-full pl-14 pr-6 py-5 border-2 border-neutral-200 rounded-2xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all shadow-lg"
          />
        </div>
      </motion.div>

      {/* Support Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {supportCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border-2 border-neutral-100 p-6 hover:border-emerald-200 hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className={`w-14 h-14 bg-${card.color}-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <card.icon className={`w-7 h-7 text-${card.color}-600`} />
            </div>
            <h3 className="font-black text-neutral-900 mb-2">{card.title}</h3>
            <p className="text-sm text-neutral-500 font-medium mb-4">{card.description}</p>
            <button className="flex items-center gap-2 text-sm font-black text-emerald-600 group-hover:text-emerald-700 group-hover:gap-3 transition-all">
              {card.action}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl border-2 border-neutral-200 p-8"
      >
        <h2 className="text-xl font-black text-neutral-900 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-emerald-600" />
          Quick Links
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl border-2 border-neutral-100 hover:border-emerald-200 hover:shadow-lg transition-all group"
            >
              <div className={`w-12 h-12 bg-${link.color}-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <link.icon className={`w-6 h-6 text-${link.color}-600`} />
              </div>
              <span className="text-xs font-bold text-neutral-700 text-center">{link.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - FAQs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border-2 border-neutral-100 p-4 shadow-lg"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                    selectedCategory === category.id
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-black text-neutral-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-emerald-600" />
              Frequently Asked Questions
            </h2>
            {filteredFAQs.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-neutral-100 p-12 text-center">
                <AlertCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500 font-bold">No FAQs found matching your search.</p>
              </div>
            ) : (
              filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border-2 border-neutral-100 overflow-hidden hover:border-emerald-200 transition-all shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 mt-1">
                        <HelpCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="font-black text-neutral-900">{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform ${
                        expandedFAQ === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t-2 border-neutral-100 px-6 py-6 bg-neutral-50"
                    >
                      <p className="text-neutral-600 font-medium leading-relaxed ml-14">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))
            )}
          </motion.div>

          {/* Video Tutorials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-neutral-900 flex items-center gap-2">
                <Video className="w-6 h-6 text-emerald-600" />
                Video Tutorials
              </h2>
              <button className="flex items-center gap-2 text-sm font-black text-emerald-600 hover:text-emerald-700">
                View All
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoTutorials.map((video, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl aspect-video mb-3 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                        <PlayCircle className="w-8 h-8 text-emerald-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-neutral-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-black">
                      {video.duration}
                    </div>
                  </div>
                  <h4 className="font-black text-neutral-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-xs text-neutral-500 font-medium">{video.views} views</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl border-2 border-neutral-100 p-6 shadow-xl sticky top-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-neutral-900">Contact Support</h3>
                <p className="text-xs text-neutral-500 font-medium">We'll respond within 24h</p>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-black text-neutral-700 mb-2">Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black text-neutral-700 mb-2">Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black text-neutral-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black text-neutral-700 mb-2">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all resize-none"
                  rows={4}
                  placeholder="Describe your issue..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Support Hours */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-black text-blue-900">Support Hours</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-bold text-blue-800">Monday - Friday</span>
                <span className="font-black text-blue-900">9AM - 6PM PST</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-blue-800">Saturday</span>
                <span className="font-black text-blue-900">10AM - 4PM PST</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-blue-800">Sunday</span>
                <span className="font-black text-blue-900">Closed</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t-2 border-blue-200">
              <div className="flex items-center gap-2 text-blue-700">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold">24/7 for Enterprise customers</span>
              </div>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border-2 border-emerald-200 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-black text-emerald-900">System Status</h3>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-black text-emerald-800">All Systems Operational</span>
            </div>
            <button className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
              View Status Page
              <ExternalLink className="w-3 h-3" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* AI Chat Widget */}
      <AIChatWidget
        isOpen={isChatOpen}
        isMinimized={isChatMinimized}
        onClose={() => setIsChatOpen(false)}
        onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
      />

      {/* Floating AI Chat Button */}
      {!isChatOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 transition-all group"
          title="AI Support Chat"
        >
          <Sparkles className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
        </motion.button>
      )}
    </div>
  );
}