import React, { useState } from "react";
import {
  BookOpen,
  Search,
  ChevronRight,
  FileText,
  Video,
  Code,
  Zap,
  Users,
  BarChart3,
  Settings,
  Download,
  ExternalLink,
  PlayCircle,
  Book,
  HelpCircle,
} from "lucide-react";
import { motion } from "motion/react";

export function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Docs", icon: BookOpen },
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "features", label: "Features", icon: Settings },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "api", label: "API Reference", icon: Code },
    { id: "tutorials", label: "Tutorials", icon: Video },
  ];

  const documentation = [
    {
      category: "getting-started",
      title: "Quick Start Guide",
      description: "Get up and running with SustainAIM in minutes",
      type: "guide",
      readTime: "5 min read",
      icon: Zap,
    },
    {
      category: "getting-started",
      title: "Dashboard Overview",
      description: "Learn about the main dashboard features and navigation",
      type: "guide",
      readTime: "8 min read",
      icon: BarChart3,
    },
    {
      category: "features",
      title: "Scope 1 Emissions Tracking",
      description: "Complete guide to tracking direct greenhouse gas emissions",
      type: "guide",
      readTime: "12 min read",
      icon: FileText,
    },
    {
      category: "features",
      title: "Scope 2 Emissions Tracking",
      description: "Track indirect emissions from purchased energy",
      type: "guide",
      readTime: "10 min read",
      icon: FileText,
    },
    {
      category: "features",
      title: "Scope 3 Emissions Tracking",
      description: "Monitor value chain emissions comprehensively",
      type: "guide",
      readTime: "15 min read",
      icon: FileText,
    },
    {
      category: "features",
      title: "Branch Management",
      description: "Manage multiple locations and assign permissions",
      type: "guide",
      readTime: "10 min read",
      icon: Users,
    },
    {
      category: "features",
      title: "User Management & Permissions",
      description: "Control access and assign roles to team members",
      type: "guide",
      readTime: "8 min read",
      icon: Users,
    },
    {
      category: "analytics",
      title: "AI GHG Reports",
      description: "Generate automated greenhouse gas emission reports",
      type: "guide",
      readTime: "12 min read",
      icon: BarChart3,
    },
    {
      category: "analytics",
      title: "AI ESG Reports",
      description: "Create comprehensive ESG performance reports",
      type: "guide",
      readTime: "12 min read",
      icon: BarChart3,
    },
    {
      category: "analytics",
      title: "ESG Performance Metrics",
      description: "Understand and analyze your ESG performance data",
      type: "guide",
      readTime: "10 min read",
      icon: BarChart3,
    },
    {
      category: "analytics",
      title: "Audit Reports",
      description: "Generate compliance and audit documentation",
      type: "guide",
      readTime: "8 min read",
      icon: FileText,
    },
    {
      category: "api",
      title: "API Authentication",
      description: "Learn how to authenticate with the SustainAIM API",
      type: "api",
      readTime: "6 min read",
      icon: Code,
    },
    {
      category: "api",
      title: "Emissions Data API",
      description: "Programmatically access and submit emissions data",
      type: "api",
      readTime: "15 min read",
      icon: Code,
    },
    {
      category: "api",
      title: "Webhooks & Integrations",
      description: "Set up webhooks and third-party integrations",
      type: "api",
      readTime: "10 min read",
      icon: Code,
    },
    {
      category: "tutorials",
      title: "Setting Up Your First Branch",
      description: "Step-by-step video tutorial for branch creation",
      type: "video",
      readTime: "12 min watch",
      icon: Video,
    },
    {
      category: "tutorials",
      title: "Creating Your First Emissions Report",
      description: "Complete walkthrough of report generation",
      type: "video",
      readTime: "18 min watch",
      icon: Video,
    },
    {
      category: "tutorials",
      title: "Advanced Analytics Tips",
      description: "Pro tips for maximizing your analytics insights",
      type: "video",
      readTime: "15 min watch",
      icon: Video,
    },
  ];

  const filteredDocs =
    activeCategory === "all"
      ? documentation
      : documentation.filter((doc) => doc.category === activeCategory);

  const quickLinks = [
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: PlayCircle,
      color: "emerald",
    },
    {
      title: "PDF Guides",
      description: "Download comprehensive guides",
      icon: Download,
      color: "blue",
    },
    {
      title: "API Docs",
      description: "Developer documentation",
      icon: Code,
      color: "purple",
    },
    {
      title: "FAQs",
      description: "Frequently asked questions",
      icon: HelpCircle,
      color: "amber",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
          Documentation
        </h1>
        <p className="text-neutral-500 font-bold mt-2">
          Everything you need to know about using SustainAIM
        </p>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400" />
        <input
          type="text"
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-16 pr-6 py-5 border-2 border-neutral-200 rounded-2xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all text-lg shadow-lg"
        />
      </motion.div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLinks.map((link, idx) => (
          <motion.div
            key={link.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl border-2 border-neutral-100 p-6 hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className={`w-12 h-12 bg-${link.color}-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <link.icon className={`w-6 h-6 text-${link.color}-600`} />
            </div>
            <h3 className="font-black text-neutral-900 mb-1">{link.title}</h3>
            <p className="text-sm text-neutral-500 font-bold">{link.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm whitespace-nowrap transition-all ${
              activeCategory === category.id
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                : "bg-white text-neutral-600 border-2 border-neutral-100 hover:border-emerald-200"
            }`}
          >
            <category.icon className="w-4 h-4" />
            {category.label}
          </button>
        ))}
      </div>

      {/* Documentation Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-neutral-900">
            {activeCategory === "all"
              ? "All Documentation"
              : categories.find((c) => c.id === activeCategory)?.label}
          </h2>
          <span className="text-sm font-black text-neutral-400 uppercase tracking-widest">
            {filteredDocs.length} Articles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-6 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <doc.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>

              <h3 className="font-black text-neutral-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {doc.title}
              </h3>
              <p className="text-sm text-neutral-600 font-bold mb-4">
                {doc.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t-2 border-neutral-100">
                <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">
                  {doc.type}
                </span>
                <span className="text-xs font-bold text-neutral-500">
                  {doc.readTime}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl border-2 border-emerald-200 p-8">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
            <Book className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-emerald-900 mb-2">
              Need More Help?
            </h2>
            <p className="text-emerald-800 font-bold mb-6">
              Can't find what you're looking for? Our support team is here to help you
              24/7 with any questions or issues you may have.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg">
                <ExternalLink className="w-4 h-4" />
                Contact Support
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-xl font-black text-sm hover:bg-white/80 transition-all">
                <PlayCircle className="w-4 h-4" />
                Watch Tutorials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
