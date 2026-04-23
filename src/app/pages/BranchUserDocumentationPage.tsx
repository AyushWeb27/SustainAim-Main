import React, { useState } from "react";
import {
  Book,
  Search,
  ChevronRight,
  FileText,
  Download,
  ExternalLink,
  Zap,
  BarChart3,
  Settings,
  Shield,
  Users,
  Code,
  Lightbulb,
  CheckCircle2,
  Leaf,
  Building2,
  Globe,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

export function BranchUserDocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview", icon: Book },
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "emissions", label: "Emissions Tracking", icon: BarChart3 },
    { id: "reports", label: "Reports & Analytics", icon: FileText },
    { id: "account", label: "Account Management", icon: Users },
    { id: "security", label: "Security", icon: Shield },
    { id: "api", label: "API Reference", icon: Code },
  ];

  const documentationContent = {
    overview: {
      title: "Welcome to SustainAIM Documentation",
      description: "Comprehensive guide to using the Branch Portal",
      content: [
        {
          heading: "About SustainAIM",
          text: "SustainAIM is a comprehensive sustainability management platform designed to help organizations track, analyze, and reduce their carbon emissions across all operational scopes.",
        },
        {
          heading: "Key Features",
          items: [
            "Real-time emissions tracking across Scope 1, 2, and 3",
            "Comprehensive analytics and reporting",
            "Role-based access control",
            "Customizable dashboards",
            "Data export and integration capabilities",
            "AI-powered insights and recommendations",
          ],
        },
        {
          heading: "System Requirements",
          items: [
            "Modern web browser (Chrome, Firefox, Safari, Edge)",
            "Stable internet connection",
            "JavaScript enabled",
            "Minimum screen resolution: 1024x768",
          ],
        },
      ],
    },
    "getting-started": {
      title: "Getting Started",
      description: "Quick start guide for new users",
      content: [
        {
          heading: "First Login",
          text: "After receiving your credentials from your administrator, navigate to the Branch User login page and enter your email/phone number and password.",
        },
        {
          heading: "Dashboard Overview",
          text: "Your dashboard provides a real-time overview of your branch's emissions data, recent activities, and key metrics. The sidebar navigation allows quick access to all major sections.",
        },
        {
          heading: "Navigation Structure",
          items: [
            "Dashboard - Overview of all emissions data",
            "Scope 1 - Direct emissions tracking",
            "Scope 2 - Energy-related emissions",
            "Scope 3 - Indirect emissions in value chain",
            "Reports - Generate and view reports",
            "Profile - Manage your account",
            "Settings - Configure preferences",
          ],
        },
        {
          heading: "Setting Up Your Profile",
          text: "Complete your profile by adding your photo, contact information, and notification preferences. This ensures you receive important updates and your data is properly attributed.",
        },
      ],
    },
    emissions: {
      title: "Emissions Tracking",
      description: "Learn how to track and manage emissions data",
      content: [
        {
          heading: "Understanding Emission Scopes",
          text: "The Greenhouse Gas Protocol categorizes emissions into three scopes:",
        },
        {
          heading: "Scope 1: Direct Emissions",
          items: [
            "Fuel combustion in owned/controlled sources",
            "Company vehicles and fleet",
            "On-site manufacturing processes",
            "Refrigerant leaks and fugitive emissions",
          ],
        },
        {
          heading: "Scope 2: Indirect Energy Emissions",
          items: [
            "Purchased electricity consumption",
            "Purchased heating and cooling",
            "Steam consumption",
          ],
        },
        {
          heading: "Scope 3: Value Chain Emissions",
          items: [
            "Business travel",
            "Employee commuting",
            "Waste disposal",
            "Purchased goods and services",
            "Downstream transportation",
          ],
        },
        {
          heading: "Adding Emissions Data",
          text: "Navigate to the relevant Scope section, click 'Add Entry', fill in the required fields (date, category, quantity, unit, description), and save. All entries are timestamped and attributed to your user account.",
        },
        {
          heading: "Data Quality Guidelines",
          items: [
            "Use accurate measurements when possible",
            "Include detailed descriptions",
            "Attach supporting documents if available",
            "Review and verify data before submission",
            "Update entries promptly when corrections are needed",
          ],
        },
      ],
    },
    reports: {
      title: "Reports & Analytics",
      description: "Generate insights from your emissions data",
      content: [
        {
          heading: "Report Types",
          text: "SustainAIM offers various report formats to meet different needs:",
        },
        {
          heading: "Available Reports",
          items: [
            "Emissions Summary - Overview of all scope emissions",
            "Trend Analysis - Time-based emission patterns",
            "Category Breakdown - Emissions by source type",
            "Compliance Reports - Regulatory requirement formats",
            "Custom Reports - Tailored to your specifications",
          ],
        },
        {
          heading: "Generating Reports",
          text: "Go to the Reports section, select date range, choose emission scopes, select report type, configure filters and parameters, then click 'Generate Report'. Reports can be viewed online or exported in PDF, Excel, or CSV formats.",
        },
        {
          heading: "Understanding Analytics",
          text: "The analytics dashboard provides visual representations of your emissions data through charts, graphs, and key performance indicators. Use these insights to identify trends and opportunities for reduction.",
        },
      ],
    },
    account: {
      title: "Account Management",
      description: "Manage your profile and preferences",
      content: [
        {
          heading: "Profile Settings",
          text: "Access your profile page to update personal information, upload profile photo, change password, set notification preferences, and configure display settings.",
        },
        {
          heading: "Notification Preferences",
          items: [
            "Email notifications for important updates",
            "In-app notifications for real-time alerts",
            "Weekly summary reports",
            "Data approval requests",
            "System maintenance notifications",
          ],
        },
        {
          heading: "Permission Levels",
          text: "Your access to features is determined by permissions granted by your administrator. Common permissions include View, Edit, Create, Delete, Export, and Approve capabilities for each scope.",
        },
        {
          heading: "Managing Sessions",
          text: "For security, sessions automatically expire after 30 minutes of inactivity. You can view active sessions and terminate them from your security settings.",
        },
      ],
    },
    security: {
      title: "Security & Privacy",
      description: "Protecting your data and account",
      content: [
        {
          heading: "Account Security",
          text: "SustainAIM implements industry-standard security measures to protect your data and maintain privacy.",
        },
        {
          heading: "Security Features",
          items: [
            "Encrypted data transmission (SSL/TLS)",
            "Secure password hashing",
            "Two-factor authentication (optional)",
            "Session management and timeout",
            "Audit logging of all activities",
            "Regular security updates",
          ],
        },
        {
          heading: "Best Practices",
          items: [
            "Use strong, unique passwords",
            "Enable two-factor authentication",
            "Never share your credentials",
            "Log out when using shared computers",
            "Report suspicious activity immediately",
            "Keep your profile information updated",
          ],
        },
        {
          heading: "Data Privacy",
          text: "Your emissions data is stored securely and only accessible to authorized users within your organization. We comply with data protection regulations including GDPR and local privacy laws.",
        },
      ],
    },
    api: {
      title: "API Reference",
      description: "Integration and automation capabilities",
      content: [
        {
          heading: "API Overview",
          text: "SustainAIM provides REST APIs for programmatic access to emissions data and automation of workflows. Contact your administrator for API credentials.",
        },
        {
          heading: "Authentication",
          text: "API requests require authentication using Bearer tokens. Include your token in the Authorization header: 'Authorization: Bearer YOUR_API_TOKEN'",
        },
        {
          heading: "Common Endpoints",
          items: [
            "GET /api/emissions - Retrieve emissions data",
            "POST /api/emissions - Create new entry",
            "PUT /api/emissions/:id - Update entry",
            "DELETE /api/emissions/:id - Delete entry",
            "GET /api/reports - Generate reports",
            "GET /api/analytics - Fetch analytics data",
          ],
        },
        {
          heading: "Rate Limits",
          text: "API requests are limited to 1000 calls per hour per user. Exceeded limits will result in 429 (Too Many Requests) responses.",
        },
        {
          heading: "Data Formats",
          text: "All API requests and responses use JSON format. Dates should be in ISO 8601 format (YYYY-MM-DD).",
        },
      ],
    },
  };

  const quickLinks = [
    {
      icon: Zap,
      title: "Quick Start Guide",
      description: "Get up and running in 5 minutes",
      color: "emerald",
    },
    {
      icon: FileText,
      title: "User Manual",
      description: "Complete PDF guide",
      color: "blue",
      downloadable: true,
    },
    {
      icon: Code,
      title: "API Documentation",
      description: "Developer resources",
      color: "purple",
    },
    {
      icon: Lightbulb,
      title: "Best Practices",
      description: "Tips and recommendations",
      color: "amber",
    },
  ];

  const currentContent = documentationContent[activeSection as keyof typeof documentationContent];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Book className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black">Documentation</h1>
          </div>
          <p className="text-blue-50 text-lg font-medium mb-6">
            Everything you need to know about using SustainAIM Branch Portal
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-neutral-900 font-bold placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLinks.map((link, idx) => {
          const Icon = link.icon;
          const colorClasses = {
            emerald: "from-emerald-500 to-emerald-600 shadow-emerald-200",
            blue: "from-blue-500 to-blue-600 shadow-blue-200",
            purple: "from-purple-500 to-purple-600 shadow-purple-200",
            amber: "from-amber-500 to-amber-600 shadow-amber-200",
          };

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-2xl p-6 border-2 border-neutral-100 hover:border-blue-200 hover:shadow-xl transition-all cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[link.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-neutral-900 mb-2">{link.title}</h3>
              <p className="text-sm text-neutral-600 font-medium mb-3">{link.description}</p>
              {link.downloadable && (
                <span className="inline-flex items-center gap-2 text-sm font-black text-blue-600">
                  <Download className="w-4 h-4" />
                  Download PDF
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Main Documentation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border-2 border-neutral-100 p-4 sticky top-8">
            <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4 px-2">
              Table of Contents
            </h3>
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-black transition-all ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-left flex-1">{section.label}</span>
                    {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border-2 border-neutral-100 p-8 md:p-12 shadow-lg"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-black text-neutral-900 mb-3">{currentContent.title}</h2>
              <p className="text-lg text-neutral-600 font-medium">{currentContent.description}</p>
            </div>

            <div className="prose prose-neutral max-w-none space-y-8">
              {currentContent.content.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xl font-black text-neutral-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    </div>
                    {section.heading}
                  </h3>

                  {section.text && (
                    <p className="text-neutral-700 font-medium leading-relaxed pl-11">
                      {section.text}
                    </p>
                  )}

                  {section.items && (
                    <ul className="space-y-2 pl-11">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                          <span className="text-neutral-700 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Footer */}
            <div className="mt-12 pt-8 border-t-2 border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => {
                  const currentIdx = sections.findIndex((s) => s.id === activeSection);
                  if (currentIdx > 0) setActiveSection(sections[currentIdx - 1].id);
                }}
                disabled={sections.findIndex((s) => s.id === activeSection) === 0}
                className="flex items-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-700 rounded-xl font-black text-sm hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Previous
              </button>

              <button
                onClick={() => {
                  const currentIdx = sections.findIndex((s) => s.id === activeSection);
                  if (currentIdx < sections.length - 1) setActiveSection(sections[currentIdx + 1].id);
                }}
                disabled={sections.findIndex((s) => s.id === activeSection) === sections.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Need More Help */}
          <div className="mt-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border-2 border-emerald-200">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-emerald-600 rounded-2xl">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-emerald-900 mb-2">Need More Help?</h3>
                <p className="text-emerald-800 font-medium mb-4">
                  Can't find what you're looking for? Our support team is ready to assist you.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/branch-user/help"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                  >
                    Visit Help Center
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="/branch-user/contact-admin"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white text-emerald-700 rounded-xl font-black text-sm hover:bg-emerald-50 transition-all border-2 border-emerald-200"
                  >
                    Contact Admin
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
