import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Video,
  Shield,
  Users,
  Zap,
  ChevronRight,
  Download,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Settings,
  BarChart3,
  Leaf,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { AIChatWidget } from "../components/AIChatWidget";

export function BranchUserHelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  const quickActions = [
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      color: "emerald",
      link: "#tutorials",
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Comprehensive guides",
      color: "blue",
      link: "/branch-user/documentation",
    },
    {
      icon: MessageCircle,
      title: "Contact Admin",
      description: "Get help from your admin",
      color: "purple",
      link: "/branch-user/contact-admin",
    },
    {
      icon: FileText,
      title: "FAQs",
      description: "Common questions answered",
      color: "amber",
      link: "#faqs",
    },
  ];

  const categories = [
    { id: "all", label: "All Topics", icon: HelpCircle },
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "emissions", label: "Emissions Data", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "account", label: "Account", icon: Users },
    { id: "troubleshooting", label: "Troubleshooting", icon: AlertCircle },
  ];

  const helpArticles = [
    {
      category: "getting-started",
      title: "Welcome to SustainAIM Branch Portal",
      description: "Learn the basics of navigating your dashboard and accessing key features",
      readTime: "5 min read",
      popular: true,
    },
    {
      category: "getting-started",
      title: "Setting Up Your Profile",
      description: "Complete your profile and configure your preferences",
      readTime: "3 min read",
      popular: true,
    },
    {
      category: "emissions",
      title: "Understanding Scope 1 Emissions",
      description: "Direct emissions from owned or controlled sources",
      readTime: "8 min read",
      popular: true,
    },
    {
      category: "emissions",
      title: "Tracking Scope 2 Emissions",
      description: "Indirect emissions from purchased energy",
      readTime: "7 min read",
      popular: false,
    },
    {
      category: "emissions",
      title: "Managing Scope 3 Emissions",
      description: "All other indirect emissions in your value chain",
      readTime: "10 min read",
      popular: false,
    },
    {
      category: "emissions",
      title: "Data Entry Best Practices",
      description: "Tips for accurate and efficient emissions tracking",
      readTime: "6 min read",
      popular: true,
    },
    {
      category: "reports",
      title: "Generating Emissions Reports",
      description: "Create comprehensive reports for your branch",
      readTime: "5 min read",
      popular: true,
    },
    {
      category: "reports",
      title: "Understanding Analytics Dashboard",
      description: "Interpret your emissions data and trends",
      readTime: "8 min read",
      popular: false,
    },
    {
      category: "reports",
      title: "Exporting Data",
      description: "Download reports in various formats",
      readTime: "4 min read",
      popular: false,
    },
    {
      category: "account",
      title: "Managing Your Account Settings",
      description: "Update profile, password, and preferences",
      readTime: "4 min read",
      popular: false,
    },
    {
      category: "account",
      title: "Understanding Permissions",
      description: "Learn about your access levels and capabilities",
      readTime: "5 min read",
      popular: true,
    },
    {
      category: "troubleshooting",
      title: "Common Login Issues",
      description: "Resolve authentication and access problems",
      readTime: "3 min read",
      popular: true,
    },
    {
      category: "troubleshooting",
      title: "Data Not Saving",
      description: "Fix issues with data persistence",
      readTime: "4 min read",
      popular: false,
    },
    {
      category: "troubleshooting",
      title: "Browser Compatibility",
      description: "Ensure optimal performance across browsers",
      readTime: "3 min read",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "How do I enter emissions data?",
      answer:
        "Navigate to the respective Scope section (Scope 1, 2, or 3) from the sidebar. Click the 'Add Entry' button and fill in the required information including date, category, quantity, and description.",
    },
    {
      question: "What are the different emission scopes?",
      answer:
        "Scope 1: Direct emissions from owned sources (fuel combustion, company vehicles). Scope 2: Indirect emissions from purchased energy (electricity, heating). Scope 3: All other indirect emissions in your value chain (business travel, waste).",
    },
    {
      question: "How often should I update emissions data?",
      answer:
        "We recommend updating your emissions data at least monthly for accurate tracking. However, you can enter data as frequently as needed based on your organization's requirements.",
    },
    {
      question: "Can I edit or delete previous entries?",
      answer:
        "Yes, if you have edit permissions, you can modify or delete entries from the respective Scope pages. Click the three-dot menu on any entry to access edit and delete options.",
    },
    {
      question: "How do I generate reports?",
      answer:
        "Go to the Reports section from the sidebar. Select your date range, emission scopes, and report format. Click 'Generate Report' to create your custom sustainability report.",
    },
    {
      question: "Who can I contact for technical support?",
      answer:
        "You can contact your Branch Admin through the 'Contact Admin' page. For immediate assistance, use the built-in messaging feature or send an email to the provided contact address.",
    },
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Contact Admin",
      description: "Direct message to your branch administrator",
      action: "Send Message",
      color: "emerald",
      link: "/branch-user/contact-admin",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@sustainaim.com",
      action: "Send Email",
      color: "blue",
      link: "mailto:support@sustainaim.com",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+91 1800-XXX-XXXX",
      action: "Call Now",
      color: "purple",
      link: "tel:+911800XXXXXX",
    },
  ];

  const filteredArticles =
    activeCategory === "all"
      ? helpArticles
      : helpArticles.filter((article) => article.category === activeCategory);

  const searchedArticles = searchQuery
    ? filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredArticles;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black">Help & Support</h1>
          </div>
          <p className="text-emerald-50 text-lg font-medium mb-6">
            Find answers, learn about features, and get support for your sustainability tracking
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
            <input
              type="text"
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-neutral-900 font-bold placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-black text-neutral-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            const colorClasses = {
              emerald: "from-emerald-500 to-emerald-600 shadow-emerald-200",
              blue: "from-blue-500 to-blue-600 shadow-blue-200",
              purple: "from-purple-500 to-purple-600 shadow-purple-200",
              amber: "from-amber-500 to-amber-600 shadow-amber-200",
            };

            return (
              <motion.a
                key={idx}
                href={action.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-2xl p-6 border-2 border-neutral-100 hover:border-emerald-200 hover:shadow-xl transition-all cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[action.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-neutral-900 mb-2">{action.title}</h3>
                <p className="text-sm text-neutral-600 font-medium">{action.description}</p>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-black text-neutral-900 mb-6">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-sm transition-all ${
                  activeCategory === category.id
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                    : "bg-white text-neutral-700 border-2 border-neutral-100 hover:border-emerald-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Help Articles */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-neutral-900">
            {activeCategory === "all" ? "All Articles" : categories.find((c) => c.id === activeCategory)?.label}
          </h2>
          <span className="text-sm text-neutral-500 font-bold">{searchedArticles.length} articles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {searchedArticles.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-2xl p-6 border-2 border-neutral-100 hover:border-emerald-200 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {article.popular && (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-lg border border-emerald-200">
                      POPULAR
                    </span>
                  )}
                  <span className="text-xs text-neutral-500 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-black text-neutral-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-neutral-600 font-medium">{article.description}</p>
            </motion.div>
          ))}
        </div>

        {searchedArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-black text-neutral-900 mb-2">No articles found</h3>
            <p className="text-neutral-600 font-medium">Try adjusting your search or browse different categories</p>
          </div>
        )}
      </div>

      {/* FAQs */}
      <div id="faqs">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-50 rounded-xl">
            <Lightbulb className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-neutral-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border-2 border-neutral-100"
            >
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-black text-neutral-900 pr-4">{faq.question}</h3>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-neutral-600 font-medium leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-neutral-900 mb-3">Still Need Help?</h2>
          <p className="text-neutral-600 font-medium text-lg">
            Our support team is here to assist you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            const colorClasses = {
              emerald: "from-emerald-500 to-emerald-600 shadow-emerald-200 hover:shadow-emerald-300",
              blue: "from-blue-500 to-blue-600 shadow-blue-200 hover:shadow-blue-300",
              purple: "from-purple-500 to-purple-600 shadow-purple-200 hover:shadow-purple-300",
            };

            return (
              <motion.a
                key={idx}
                href={method.link}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-neutral-100 hover:border-emerald-200 hover:shadow-xl transition-all text-center group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[method.color as keyof typeof colorClasses]} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-black text-neutral-900 mb-2">{method.title}</h3>
                <p className="text-sm text-neutral-600 font-medium mb-4">{method.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-black text-emerald-600 group-hover:gap-3 transition-all">
                  {method.action}
                  <ExternalLink className="w-4 h-4" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 p-8">
        <h2 className="text-2xl font-black text-neutral-900 mb-6">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/branch-user/documentation"
            className="flex items-center gap-4 p-5 bg-neutral-50 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 border-2 border-transparent transition-all group"
          >
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Book className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-neutral-900 mb-1">Full Documentation</h3>
              <p className="text-sm text-neutral-600 font-medium">Complete guides and references</p>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </a>

          <a
            href="#tutorials"
            className="flex items-center gap-4 p-5 bg-neutral-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent transition-all group"
          >
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-neutral-900 mb-1">Video Tutorials</h3>
              <p className="text-sm text-neutral-600 font-medium">Visual step-by-step guides</p>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </a>

          <a
            href="/branch-user/privacy"
            className="flex items-center gap-4 p-5 bg-neutral-50 rounded-xl hover:bg-purple-50 hover:border-purple-200 border-2 border-transparent transition-all group"
          >
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-neutral-900 mb-1">Privacy Policy</h3>
              <p className="text-sm text-neutral-600 font-medium">Learn how we protect your data</p>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
          </a>

          <a
            href="#system-status"
            className="flex items-center gap-4 p-5 bg-neutral-50 rounded-xl hover:bg-green-50 hover:border-green-200 border-2 border-transparent transition-all group"
          >
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-neutral-900 mb-1">System Status</h3>
              <p className="text-sm text-neutral-600 font-medium">Check service health</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-black rounded-lg">
              All Systems Operational
            </span>
          </a>
        </div>
      </div>

      {/* AI Chat Widget */}
      <AIChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        isMinimized={isChatMinimized}
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