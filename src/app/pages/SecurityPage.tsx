import React from "react";
import {
  Shield,
  Lock,
  Key,
  Eye,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Server,
  Database,
  Globe,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

export function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description:
        "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.",
      status: "Active",
    },
    {
      icon: UserCheck,
      title: "Multi-Factor Authentication",
      description:
        "Enhanced security with SMS and authenticator app-based two-factor authentication.",
      status: "Active",
    },
    {
      icon: Database,
      title: "Secure Data Storage",
      description:
        "Data stored in ISO 27001 certified data centers with regular backups and redundancy.",
      status: "Active",
    },
    {
      icon: Eye,
      title: "Activity Monitoring",
      description:
        "Real-time monitoring of account activity with alerts for suspicious behavior.",
      status: "Active",
    },
    {
      icon: Key,
      title: "Access Control",
      description:
        "Role-based access control (RBAC) with granular permissions management.",
      status: "Active",
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description:
        "Regular security audits, penetration testing, and vulnerability assessments.",
      status: "Active",
    },
  ];

  const compliance = [
    { name: "ISO 27001", status: "Certified", color: "emerald" },
    { name: "SOC 2 Type II", status: "Certified", color: "blue" },
    { name: "GDPR Compliant", status: "Compliant", color: "purple" },
    { name: "HIPAA Ready", status: "Ready", color: "indigo" },
  ];

  const recentSecurityUpdates = [
    {
      date: "April 5, 2026",
      title: "Enhanced Password Policy",
      description: "Implemented stronger password requirements and breach detection.",
      type: "improvement",
    },
    {
      date: "March 28, 2026",
      title: "Security Patch Applied",
      description: "Critical security patch applied to all servers.",
      type: "patch",
    },
    {
      date: "March 15, 2026",
      title: "Penetration Test Completed",
      description: "Quarterly penetration test completed with no critical findings.",
      type: "audit",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            Security Center
          </h1>
          <p className="text-neutral-500 font-bold mt-2">
            Your data security and privacy are our top priorities
          </p>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-emerald-50 rounded-xl border-2 border-emerald-200">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
            All Systems Secure
          </span>
        </div>
      </div>

      {/* Security Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl border-2 border-emerald-200 p-8"
      >
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-emerald-900 mb-2">
              Enterprise-Grade Security
            </h2>
            <p className="text-emerald-800 font-bold mb-4">
              SustainAIM employs industry-leading security measures to protect your
              sustainability data. Our platform is built with security at its core,
              ensuring your information remains private and secure.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-black text-emerald-900">
                  256-bit Encryption
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-black text-emerald-900">
                  99.9% Uptime SLA
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-black text-emerald-900">
                  24/7 Monitoring
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security Features Grid */}
      <div>
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          Security Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-black text-neutral-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-600 font-bold mb-3">
                {feature.description}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
                  {feature.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compliance Certifications */}
      <div>
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          Compliance & Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {compliance.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className={`w-16 h-16 bg-${cert.color}-50 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <FileCheck className={`w-8 h-8 text-${cert.color}-600`} />
              </div>
              <h3 className="font-black text-neutral-900 mb-1">{cert.name}</h3>
              <p className={`text-sm font-black text-${cert.color}-600 uppercase tracking-widest`}>
                {cert.status}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Security Updates */}
      <div>
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          Recent Security Updates
        </h2>
        <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8 space-y-6">
          {recentSecurityUpdates.map((update, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 pb-6 border-b-2 border-neutral-100 last:border-0 last:pb-0"
            >
              <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0">
                {update.type === "improvement" && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                )}
                {update.type === "patch" && (
                  <Shield className="w-6 h-6 text-blue-600" />
                )}
                {update.type === "audit" && (
                  <FileCheck className="w-6 h-6 text-purple-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-black text-neutral-900">{update.title}</h3>
                  <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">
                    {update.date}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 font-bold">
                  {update.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Best Practices */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-8">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-blue-900 mb-4">
              Security Best Practices
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-blue-800 font-bold">
                  Enable two-factor authentication on your account
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-blue-800 font-bold">
                  Use strong, unique passwords and update them regularly
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-blue-800 font-bold">
                  Review active sessions and logout from unused devices
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-blue-800 font-bold">
                  Never share your credentials with anyone
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-blue-800 font-bold">
                  Report suspicious activity immediately to our security team
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Security Team */}
      <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8 text-center">
        <Globe className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-neutral-900 mb-2">
          Security Concerns?
        </h2>
        <p className="text-neutral-600 font-bold mb-6 max-w-2xl mx-auto">
          If you discover a security vulnerability or have security-related questions,
          please contact our security team immediately.
        </p>
        <a
          href="mailto:security@sustainaim.com"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
        >
          <Shield className="w-5 h-5" />
          Contact Security Team
        </a>
      </div>
    </div>
  );
}
