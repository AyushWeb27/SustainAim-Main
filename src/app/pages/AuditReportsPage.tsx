import React, { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Filter,
  Search,
  TrendingUp,
  Shield,
  Target,
  Award,
  FileCheck,
  FileWarning,
  FileClock,
  Building2,
  Users,
  Globe,
  Leaf,
  BarChart3,
  ExternalLink
} from "lucide-react";
import { motion } from "motion/react";

interface AuditReport {
  id: string;
  title: string;
  type: "internal" | "external" | "compliance" | "certification";
  status: "completed" | "in-progress" | "pending" | "overdue";
  date: string;
  auditor: string;
  scope: string[];
  findings: number;
  priority: "high" | "medium" | "low";
  downloadUrl?: string;
}

export function AuditReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedReport, setSelectedReport] = useState<AuditReport | null>(null);

  const reports: AuditReport[] = [
    {
      id: "AUD-2026-001",
      title: "Q1 2026 Sustainability Audit",
      type: "internal",
      status: "completed",
      date: "2026-03-28",
      auditor: "Internal Audit Team",
      scope: ["Scope 1", "Scope 2", "Scope 3", "ESG"],
      findings: 3,
      priority: "low"
    },
    {
      id: "AUD-2026-002",
      title: "ISO 14001 Certification Audit",
      type: "certification",
      status: "completed",
      date: "2026-03-15",
      auditor: "Bureau Veritas India",
      scope: ["Environmental Management"],
      findings: 0,
      priority: "high"
    },
    {
      id: "AUD-2026-003",
      title: "Carbon Verification Report 2025",
      type: "external",
      status: "completed",
      date: "2026-02-20",
      auditor: "DNV GL India",
      scope: ["Scope 1", "Scope 2"],
      findings: 2,
      priority: "medium"
    },
    {
      id: "AUD-2026-004",
      title: "CDP Climate Change Disclosure",
      type: "compliance",
      status: "in-progress",
      date: "2026-04-30",
      auditor: "CDP India",
      scope: ["Climate Strategy", "Emissions"],
      findings: 0,
      priority: "high"
    },
    {
      id: "AUD-2025-012",
      title: "Annual ESG Performance Review",
      type: "internal",
      status: "completed",
      date: "2025-12-31",
      auditor: "Internal Audit Team",
      scope: ["ESG", "Governance"],
      findings: 5,
      priority: "medium"
    },
    {
      id: "AUD-2025-011",
      title: "GRI Standards Compliance Audit",
      type: "compliance",
      status: "completed",
      date: "2025-11-15",
      auditor: "EY India",
      scope: ["GRI Reporting"],
      findings: 1,
      priority: "low"
    },
    {
      id: "AUD-2025-010",
      title: "Supply Chain Sustainability Audit",
      type: "external",
      status: "completed",
      date: "2025-10-10",
      auditor: "SGS India",
      scope: ["Scope 3", "Supply Chain"],
      findings: 8,
      priority: "high"
    },
    {
      id: "AUD-2026-005",
      title: "Energy Management Audit",
      type: "internal",
      status: "pending",
      date: "2026-05-15",
      auditor: "Internal Audit Team",
      scope: ["Scope 2", "Energy"],
      findings: 0,
      priority: "medium"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle2;
      case "in-progress": return Clock;
      case "pending": return FileClock;
      case "overdue": return AlertTriangle;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "in-progress": return "text-blue-600 bg-blue-50 border-blue-200";
      case "pending": return "text-amber-600 bg-amber-50 border-amber-200";
      case "overdue": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-neutral-600 bg-neutral-50 border-neutral-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "internal": return Building2;
      case "external": return Globe;
      case "compliance": return Shield;
      case "certification": return Award;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "internal": return "text-blue-600 bg-blue-50";
      case "external": return "text-purple-600 bg-purple-50";
      case "compliance": return "text-amber-600 bg-amber-50";
      case "certification": return "text-emerald-600 bg-emerald-50";
      default: return "text-neutral-600 bg-neutral-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-amber-100 text-amber-700 border-amber-200";
      case "low": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.auditor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    const matchesType = filterType === "all" || report.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Statistics
  const stats = [
    {
      label: "Total Audits",
      value: reports.length,
      icon: FileText,
      color: "blue",
      description: "All time"
    },
    {
      label: "Completed",
      value: reports.filter(r => r.status === "completed").length,
      icon: CheckCircle2,
      color: "emerald",
      description: "Successfully completed"
    },
    {
      label: "In Progress",
      value: reports.filter(r => r.status === "in-progress").length,
      icon: Clock,
      color: "amber",
      description: "Currently active"
    },
    {
      label: "Avg. Findings",
      value: (reports.reduce((acc, r) => acc + r.findings, 0) / reports.length).toFixed(1),
      icon: Target,
      color: "purple",
      description: "Per audit"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-blue-100 rounded-xl">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              Audit Reports
            </h1>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 font-bold">
            Compliance audits, certifications and internal reviews
          </p>
        </div>

        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <Download className="w-4 h-4" />
          Export All Reports
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-${stat.color}-50 border-2 border-${stat.color}-200 rounded-2xl p-6`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 bg-${stat.color}-100 rounded-xl`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
            </div>
            <h3 className={`text-3xl font-black text-${stat.color}-700 mb-2`}>{stat.value}</h3>
            <p className={`text-sm font-bold text-${stat.color}-700 opacity-80`}>{stat.label}</p>
            <p className="text-xs text-neutral-500 font-bold mt-2">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-100 dark:border-neutral-700 p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, auditor, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl font-bold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none transition-all bg-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl font-bold text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all bg-white dark:bg-neutral-700"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl font-bold text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all bg-white dark:bg-neutral-700"
          >
            <option value="all">All Types</option>
            <option value="internal">Internal</option>
            <option value="external">External</option>
            <option value="compliance">Compliance</option>
            <option value="certification">Certification</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-neutral-900 dark:text-white">
            {filteredReports.length} Report{filteredReports.length !== 1 ? 's' : ''}
          </h2>
          <div className="flex items-center gap-2 text-sm text-neutral-500 font-bold">
            <Filter className="w-4 h-4" />
            Active filters
          </div>
        </div>

        {filteredReports.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-100 dark:border-neutral-700 p-12 text-center shadow-lg">
            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="font-black text-neutral-900 dark:text-white mb-2">No reports found</h3>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredReports.map((report, index) => {
              const StatusIcon = getStatusIcon(report.status);
              const TypeIcon = getTypeIcon(report.type);

              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-100 dark:border-neutral-700 p-6 shadow-lg hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-700 transition-all cursor-pointer"
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Icon & ID */}
                    <div className="flex items-center gap-4">
                      <div className={`p-4 ${getTypeColor(report.type)} rounded-2xl`}>
                        <TypeIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-1">
                          {report.id}
                        </p>
                        <h3 className="text-lg font-black text-neutral-900 dark:text-white">
                          {report.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Status */}
                      <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-2">
                          Status
                        </p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 ${getStatusColor(report.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="text-sm font-black capitalize">{report.status.replace('-', ' ')}</span>
                        </div>
                      </div>

                      {/* Date */}
                      <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-2">
                          Date
                        </p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm font-bold text-neutral-900 dark:text-white">
                            {new Date(report.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {/* Auditor */}
                      <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-2">
                          Auditor
                        </p>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                            {report.auditor}
                          </span>
                        </div>
                      </div>

                      {/* Findings */}
                      <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-2">
                          Findings
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-black ${report.findings === 0 ? 'text-emerald-600' : report.findings <= 3 ? 'text-amber-600' : 'text-red-600'}`}>
                            {report.findings}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReport(report);
                        }}
                        className="p-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {report.status === "completed" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Downloading ${report.title}...`);
                          }}
                          className="p-3 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
                          title="Download Report"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Scope Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                    {report.scope.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-bold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedReport(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800 rounded-3xl border-2 border-neutral-100 dark:border-neutral-700 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 ${getTypeColor(selectedReport.type)} rounded-2xl`}>
                  {React.createElement(getTypeIcon(selectedReport.type), { className: "w-8 h-8" })}
                </div>
                <div>
                  <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-1">
                    {selectedReport.id}
                  </p>
                  <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
                    {selectedReport.title}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-3">
                  Status
                </p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${getStatusColor(selectedReport.status)}`}>
                  {React.createElement(getStatusIcon(selectedReport.status), { className: "w-5 h-5" })}
                  <span className="font-black capitalize">{selectedReport.status.replace('-', ' ')}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-3">
                  Type
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 rounded-xl">
                  <span className="font-black capitalize">{selectedReport.type}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-3">
                  Audit Date
                </p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-neutral-400" />
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {new Date(selectedReport.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-3">
                  Auditor
                </p>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-neutral-400" />
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {selectedReport.auditor}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-3">
                  Findings
                </p>
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-black ${selectedReport.findings === 0 ? 'text-emerald-600' : selectedReport.findings <= 3 ? 'text-amber-600' : 'text-red-600'}`}>
                    {selectedReport.findings}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase border-2 ${getPriorityColor(selectedReport.priority)}`}>
                    {selectedReport.priority} Priority
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-3">
                  Scope
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.scope.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-neutral-100 dark:border-neutral-700">
              {selectedReport.status === "completed" && (
                <>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-all">
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all">
                    <ExternalLink className="w-5 h-5" />
                    View Full Report
                  </button>
                </>
              )}
              {selectedReport.status !== "completed" && (
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-600 text-white rounded-xl font-black hover:bg-amber-700 transition-all">
                  <Clock className="w-5 h-5" />
                  Track Progress
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
