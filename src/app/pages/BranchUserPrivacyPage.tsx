import React from "react";
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  FileText,
  Globe,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Building2,
  Calendar,
  Cookie,
  Share2,
  Download,
  Trash2,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";

export function BranchUserPrivacyPage() {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      color: "emerald",
      items: [
        {
          heading: "Account Information",
          description:
            "When you register, we collect your name, email address, phone number, branch affiliation, and role within your organization.",
        },
        {
          heading: "Emissions Data",
          description:
            "All emissions data you enter including Scope 1, 2, and 3 emissions, dates, quantities, categories, and descriptions.",
        },
        {
          heading: "Usage Information",
          description:
            "We collect information about how you use our platform including login times, pages visited, features used, and device information.",
        },
        {
          heading: "Communication Data",
          description:
            "Messages sent to administrators, support tickets, feedback, and any other communications through our platform.",
        },
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      color: "blue",
      items: [
        {
          heading: "Service Delivery",
          description:
            "To provide and maintain the SustainAIM platform, process your emissions data, and generate reports and analytics.",
        },
        {
          heading: "Communication",
          description:
            "To send you important updates, respond to your inquiries, and provide customer support.",
        },
        {
          heading: "Improvements",
          description:
            "To analyze usage patterns, improve our services, develop new features, and enhance user experience.",
        },
        {
          heading: "Compliance",
          description:
            "To comply with legal obligations, enforce our terms of service, and protect against fraudulent or illegal activity.",
        },
      ],
    },
    {
      icon: Eye,
      title: "Data Sharing & Disclosure",
      color: "purple",
      items: [
        {
          heading: "Within Your Organization",
          description:
            "Your emissions data is accessible to authorized users within your organization based on their permission levels.",
        },
        {
          heading: "Service Providers",
          description:
            "We may share data with trusted third-party service providers who assist in operating our platform (hosting, analytics, support).",
        },
        {
          heading: "Legal Requirements",
          description:
            "We may disclose information if required by law, court order, or governmental regulation.",
        },
        {
          heading: "Business Transfers",
          description:
            "In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.",
        },
        {
          heading: "What We Don't Do",
          description:
            "We never sell your personal data to third parties or use it for purposes unrelated to our services.",
        },
      ],
    },
    {
      icon: Database,
      title: "Data Security",
      color: "amber",
      items: [
        {
          heading: "Encryption",
          description:
            "All data transmitted to and from our platform is encrypted using industry-standard SSL/TLS protocols.",
        },
        {
          heading: "Access Controls",
          description:
            "We implement strict access controls, role-based permissions, and multi-factor authentication options.",
        },
        {
          heading: "Regular Audits",
          description:
            "Our systems undergo regular security audits and vulnerability assessments by independent security experts.",
        },
        {
          heading: "Data Backup",
          description:
            "We maintain regular encrypted backups to ensure data integrity and availability in case of system failures.",
        },
        {
          heading: "Incident Response",
          description:
            "We have established procedures to detect, respond to, and notify users of any security breaches promptly.",
        },
      ],
    },
  ];

  const yourRights = [
    {
      icon: Eye,
      title: "Access",
      description: "Request a copy of your personal data we hold",
    },
    {
      icon: FileText,
      title: "Correction",
      description: "Update or correct inaccurate information",
    },
    {
      icon: Trash2,
      title: "Deletion",
      description: "Request deletion of your personal data",
    },
    {
      icon: Download,
      title: "Portability",
      description: "Export your data in a machine-readable format",
    },
    {
      icon: AlertCircle,
      title: "Object",
      description: "Object to certain data processing activities",
    },
    {
      icon: Lock,
      title: "Restriction",
      description: "Request restriction of data processing",
    },
  ];

  const dataRetention = [
    {
      type: "Account Data",
      period: "Duration of account + 30 days after deletion",
      icon: UserCheck,
    },
    {
      type: "Emissions Data",
      period: "As long as required for compliance (typically 7 years)",
      icon: Database,
    },
    {
      type: "Usage Logs",
      period: "90 days from collection",
      icon: FileText,
    },
    {
      type: "Communication Records",
      period: "3 years from last communication",
      icon: Mail,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black">Privacy Policy</h1>
          </div>
          <p className="text-neutral-300 text-lg font-medium mb-4">
            How we collect, use, and protect your data
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-neutral-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: April 7, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>India Data Protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-emerald-50 rounded-2xl p-8 border-2 border-emerald-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-600 rounded-xl">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-emerald-900 mb-2">Your Privacy Matters</h2>
            <p className="text-emerald-800 font-medium leading-relaxed">
              At SustainAIM, we are committed to protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use, share, and protect your data when you use
              our Branch Portal. By using our services, you agree to the practices described in this policy.
            </p>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      {sections.map((section, idx) => {
        const Icon = section.icon;
        const colorClasses = {
          emerald: {
            bg: "from-emerald-500 to-emerald-600",
            shadow: "shadow-emerald-200",
            border: "border-emerald-200",
            text: "text-emerald-600",
          },
          blue: {
            bg: "from-blue-500 to-blue-600",
            shadow: "shadow-blue-200",
            border: "border-blue-200",
            text: "text-blue-600",
          },
          purple: {
            bg: "from-purple-500 to-purple-600",
            shadow: "shadow-purple-200",
            border: "border-purple-200",
            text: "text-purple-600",
          },
          amber: {
            bg: "from-amber-500 to-amber-600",
            shadow: "shadow-amber-200",
            border: "border-amber-200",
            text: "text-amber-600",
          },
        };

        const colors = colorClasses[section.color as keyof typeof colorClasses];

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl border-2 border-neutral-100 overflow-hidden shadow-lg"
          >
            <div className="flex items-center gap-4 p-6 bg-neutral-50 border-b-2 border-neutral-100">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} ${colors.shadow} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-neutral-900">{section.title}</h2>
            </div>

            <div className="p-8 space-y-6">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="space-y-2">
                  <h3 className="font-black text-neutral-900 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                    {item.heading}
                  </h3>
                  <p className="text-neutral-700 font-medium leading-relaxed pl-4">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}

      {/* Your Rights */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 overflow-hidden shadow-lg">
        <div className="flex items-center gap-4 p-6 bg-neutral-50 border-b-2 border-neutral-100">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-200 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-neutral-900">Your Data Rights</h2>
        </div>

        <div className="p-8">
          <p className="text-neutral-700 font-medium mb-6">
            Under data protection laws, you have the following rights regarding your personal information:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yourRights.map((right, idx) => {
              const Icon = right.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-5 bg-neutral-50 rounded-xl border-2 border-neutral-100 hover:border-indigo-200 transition-all"
                >
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-neutral-900 mb-1">{right.title}</h3>
                    <p className="text-sm text-neutral-600 font-medium">{right.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 p-6 bg-indigo-50 rounded-xl border-2 border-indigo-200">
            <p className="text-sm text-indigo-900 font-bold">
              <strong>To exercise these rights:</strong> Contact your Branch Administrator or email us at{" "}
              <a href="mailto:privacy@sustainaim.com" className="underline">
                privacy@sustainaim.com
              </a>
              . We will respond within 30 days.
            </p>
          </div>
        </div>
      </div>

      {/* Data Retention */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 overflow-hidden shadow-lg">
        <div className="flex items-center gap-4 p-6 bg-neutral-50 border-b-2 border-neutral-100">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 shadow-lg shadow-rose-200 flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-neutral-900">Data Retention</h2>
        </div>

        <div className="p-8">
          <p className="text-neutral-700 font-medium mb-6">
            We retain different types of data for varying periods based on legal requirements and business needs:
          </p>

          <div className="space-y-4">
            {dataRetention.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-5 bg-neutral-50 rounded-xl border-2 border-neutral-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-100 rounded-lg">
                      <Icon className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-black text-neutral-900">{item.type}</h3>
                      <p className="text-sm text-neutral-600 font-medium">{item.period}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cookies */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 p-8 shadow-lg">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-amber-100 rounded-xl">
            <Cookie className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-neutral-900 mb-2">Cookies & Tracking</h2>
            <p className="text-neutral-700 font-medium">
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide
              personalized features.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-neutral-50 rounded-xl border-2 border-neutral-100">
            <h3 className="font-black text-neutral-900 mb-2">Essential Cookies</h3>
            <p className="text-sm text-neutral-600 font-medium">Required for basic platform functionality</p>
          </div>
          <div className="p-5 bg-neutral-50 rounded-xl border-2 border-neutral-100">
            <h3 className="font-black text-neutral-900 mb-2">Analytics Cookies</h3>
            <p className="text-sm text-neutral-600 font-medium">Help us understand how you use our platform</p>
          </div>
          <div className="p-5 bg-neutral-50 rounded-xl border-2 border-neutral-100">
            <h3 className="font-black text-neutral-900 mb-2">Preference Cookies</h3>
            <p className="text-sm text-neutral-600 font-medium">Remember your settings and preferences</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-black mb-4">Questions About Privacy?</h2>
        <p className="text-neutral-300 font-medium mb-6">
          If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please
          contact us:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-1">Email</p>
              <a href="mailto:privacy@sustainaim.com" className="text-white font-bold hover:text-emerald-400 transition-colors">
                privacy@sustainaim.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-1">Phone</p>
              <a href="tel:+911800XXXXXX" className="text-white font-bold hover:text-emerald-400 transition-colors">
                +91 1800-XXX-XXXX
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-1">Address</p>
              <p className="text-white font-bold">Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Updates */}
      <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-black text-blue-900 mb-2">Policy Updates</h3>
            <p className="text-blue-800 font-medium">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal
              requirements. We will notify you of any material changes via email or platform notification. Your
              continued use of the platform after such changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
