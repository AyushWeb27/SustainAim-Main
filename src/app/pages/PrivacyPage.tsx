import React from "react";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Globe,
  CheckCircle2,
  AlertCircle,
  Mail,
  Database,
  UserCheck,
  Settings,
} from "lucide-react";
import { motion } from "motion/react";

export function PrivacyPage() {
  const privacyPrinciples = [
    {
      icon: Lock,
      title: "Data Encryption",
      description:
        "All your data is encrypted both in transit and at rest using industry-standard encryption protocols.",
    },
    {
      icon: UserCheck,
      title: "User Control",
      description:
        "You have complete control over your data with the ability to export, delete, or modify it at any time.",
    },
    {
      icon: Eye,
      title: "Transparency",
      description:
        "We are transparent about what data we collect, how we use it, and who we share it with.",
    },
    {
      icon: Shield,
      title: "Data Protection",
      description:
        "We implement strict access controls and security measures to protect your information from unauthorized access.",
    },
    {
      icon: Database,
      title: "Minimal Collection",
      description:
        "We only collect data that is necessary to provide and improve our services.",
    },
    {
      icon: Globe,
      title: "Global Compliance",
      description:
        "We comply with GDPR, CCPA, and other international data protection regulations.",
    },
  ];

  const dataCategories = [
    {
      category: "Account Information",
      items: [
        "Name and contact information",
        "Email address and phone number",
        "Company details and billing information",
        "Login credentials (encrypted)",
      ],
      purpose: "To create and manage your account, provide support, and process payments.",
    },
    {
      category: "Emissions Data",
      items: [
        "Scope 1, 2, and 3 emissions data",
        "Energy consumption records",
        "Sustainability metrics and reports",
        "Branch and location information",
      ],
      purpose:
        "To provide emissions tracking, reporting, and analytics services as requested by you.",
    },
    {
      category: "Usage Information",
      items: [
        "Login activity and session data",
        "Feature usage and interaction patterns",
        "Device and browser information",
        "IP addresses and location data",
      ],
      purpose:
        "To improve our services, ensure security, and provide personalized experiences.",
    },
  ];

  const yourRights = [
    {
      icon: Eye,
      title: "Right to Access",
      description:
        "Request a copy of all personal data we hold about you at any time.",
    },
    {
      icon: FileText,
      title: "Right to Rectification",
      description:
        "Request correction of any inaccurate or incomplete personal data.",
    },
    {
      icon: AlertCircle,
      title: "Right to Erasure",
      description:
        "Request deletion of your personal data under certain circumstances.",
    },
    {
      icon: Settings,
      title: "Right to Restriction",
      description: "Request restriction of processing of your personal data.",
    },
    {
      icon: Database,
      title: "Right to Portability",
      description:
        "Request transfer of your data to another service provider in a structured format.",
    },
    {
      icon: Shield,
      title: "Right to Object",
      description:
        "Object to processing of your personal data for certain purposes.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-neutral-500 font-bold mt-2">
          Last updated: April 9, 2026
        </p>
      </div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl border-2 border-emerald-200 p-8"
      >
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-emerald-900 mb-2">
              Your Privacy Matters
            </h2>
            <p className="text-emerald-800 font-bold">
              At SustainAIM, we are committed to protecting your privacy and ensuring
              the security of your personal information. This privacy policy explains how
              we collect, use, share, and protect your data when you use our platform.
              We believe in transparency and want you to understand exactly how your
              information is handled.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Privacy Principles */}
      <div>
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          Our Privacy Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {privacyPrinciples.map((principle, idx) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <principle.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-black text-neutral-900 mb-2">
                {principle.title}
              </h3>
              <p className="text-sm text-neutral-600 font-bold">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data We Collect */}
      <div>
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          Information We Collect
        </h2>
        <div className="space-y-6">
          {dataCategories.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-8"
            >
              <h3 className="text-xl font-black text-neutral-900 mb-4">
                {category.category}
              </h3>
              <ul className="space-y-2 mb-6">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-neutral-700 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-100">
                <p className="text-sm font-black text-emerald-900 mb-1">
                  Purpose of Collection:
                </p>
                <p className="text-sm text-emerald-800 font-bold">
                  {category.purpose}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How We Use Data */}
      <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8">
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          How We Use Your Information
        </h2>
        <div className="space-y-4">
          {[
            "Provide, operate, and maintain our sustainability tracking services",
            "Process your transactions and manage your account",
            "Send you important updates, security alerts, and administrative messages",
            "Respond to your comments, questions, and customer service requests",
            "Analyze usage patterns to improve our platform and develop new features",
            "Detect, prevent, and address technical issues and security vulnerabilities",
            "Comply with legal obligations and enforce our terms of service",
            "Generate anonymized analytics and insights about sustainability trends",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-neutral-700 font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sharing */}
      <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8">
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          How We Share Your Information
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-black text-neutral-900 mb-3">
              We DO NOT sell your personal data.
            </h3>
            <p className="text-neutral-700 font-bold mb-4">
              We may share your information only in the following limited circumstances:
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Service Providers",
                description:
                  "Trusted third-party vendors who help us operate our platform (e.g., cloud hosting, payment processing). These providers are contractually obligated to protect your data.",
              },
              {
                title: "Legal Requirements",
                description:
                  "When required by law, court order, or governmental regulation, or to protect our rights and safety.",
              },
              {
                title: "Business Transfers",
                description:
                  "In the event of a merger, acquisition, or sale of assets, your data may be transferred to the acquiring entity.",
              },
              {
                title: "With Your Consent",
                description:
                  "When you explicitly authorize us to share your information with specific third parties.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-neutral-50 rounded-xl p-6 border-2 border-neutral-100">
                <h4 className="font-black text-neutral-900 mb-2">{item.title}</h4>
                <p className="text-sm text-neutral-700 font-bold">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Rights */}
      <div>
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          Your Privacy Rights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yourRights.map((right, idx) => (
            <motion.div
              key={right.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <right.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-black text-neutral-900 mb-2">{right.title}</h3>
              <p className="text-sm text-neutral-600 font-bold">
                {right.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Retention */}
      <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8">
        <div className="flex items-start gap-6">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
            <Database className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-neutral-900 mb-3">
              Data Retention
            </h2>
            <p className="text-neutral-700 font-bold mb-4">
              We retain your personal data only for as long as necessary to fulfill the
              purposes outlined in this privacy policy, unless a longer retention period
              is required or permitted by law. When data is no longer needed, we securely
              delete or anonymize it.
            </p>
            <ul className="space-y-2">
              {[
                "Account data: Retained while your account is active and for 90 days after closure",
                "Emissions data: Retained as per regulatory requirements (typically 7 years)",
                "Usage logs: Retained for 12 months for security and analytics purposes",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <span className="text-neutral-700 font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Cookies */}
      <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8">
        <div className="flex items-start gap-6">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
            <Settings className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-neutral-900 mb-3">
              Cookies and Tracking
            </h2>
            <p className="text-neutral-700 font-bold mb-4">
              We use cookies and similar tracking technologies to enhance your experience,
              analyze usage patterns, and maintain security. You can control cookies
              through your browser settings.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                Cookie Preferences
              </button>
              <button className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-xl font-black text-sm hover:bg-neutral-200 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl border-2 border-blue-200 p-8">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-blue-900 mb-2">
              Questions About Privacy?
            </h2>
            <p className="text-blue-800 font-bold mb-6">
              If you have any questions about this privacy policy or how we handle your
              data, please don't hesitate to contact our Data Protection Officer.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:privacy@sustainaim.com"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg"
              >
                <Mail className="w-4 h-4" />
                privacy@sustainaim.com
              </a>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-black text-sm hover:bg-white/80 transition-all">
                <Users className="w-4 h-4" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Updates Notice */}
      <div className="bg-neutral-100 rounded-2xl p-6 border-2 border-neutral-200">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-neutral-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-black text-neutral-900 mb-1">
              Updates to This Policy
            </h3>
            <p className="text-sm text-neutral-700 font-bold">
              We may update this privacy policy from time to time to reflect changes in
              our practices or legal requirements. We will notify you of any material
              changes via email or through our platform. Your continued use of our
              services after such changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
