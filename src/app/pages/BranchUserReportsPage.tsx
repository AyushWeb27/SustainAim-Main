import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Wind,
  Filter,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

export function BranchUserReportsPage() {
  const branchUserData = JSON.parse(localStorage.getItem("branchUser") || "{}");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const reports = [
    {
      id: 1,
      title: "Monthly Emissions Summary",
      period: "March 2026",
      generatedDate: "2026-04-01",
      type: "Summary",
      scope: "All Scopes",
      status: "available",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "Scope 1 Detailed Report",
      period: "Q1 2026",
      generatedDate: "2026-04-01",
      type: "Detailed",
      scope: "Scope 1",
      status: "available",
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "Scope 2 Analysis",
      period: "February 2026",
      generatedDate: "2026-03-01",
      type: "Analysis",
      scope: "Scope 2",
      status: "available",
      size: "1.5 MB"
    },
    {
      id: 4,
      title: "Annual Sustainability Report",
      period: "2025",
      generatedDate: "2026-01-15",
      type: "Annual",
      scope: "All Scopes",
      status: "available",
      size: "5.2 MB"
    }
  ];

  const statistics = {
    totalReports: 12,
    thisMonth: 3,
    avgEmissions: 245.6,
    trend: -8.5
  };

  const handleDownload = (reportTitle: string) => {
    toast.success(`Downloading: ${reportTitle}`);
  };

  const handleGenerateReport = () => {
    toast.success("Report generation started. You'll be notified when it's ready.");
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 px-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-neutral-900 mb-2">Branch Reports</h1>
          <p className="text-sm md:text-base text-neutral-600 font-bold">
            View and download emissions reports for {branchUserData.branchName}
          </p>
        </div>
        <Button
          onClick={handleGenerateReport}
          className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center justify-center gap-2 py-5 md:py-3"
        >
          <FileText className="w-4 h-4" />
          Generate New Report
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-neutral-100"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="p-1.5 md:p-2 bg-emerald-50 rounded-lg">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
            </div>
            <p className="text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Total Reports</p>
          </div>
          <p className="text-2xl md:text-3xl font-black text-neutral-900">{statistics.totalReports}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-neutral-100"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="p-1.5 md:p-2 bg-blue-50 rounded-lg">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <p className="text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">This Month</p>
          </div>
          <p className="text-2xl md:text-3xl font-black text-neutral-900">{statistics.thisMonth}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-neutral-100"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="p-1.5 md:p-2 bg-purple-50 rounded-lg">
              <Activity className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <p className="text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Avg Emissions</p>
          </div>
          <div className="flex items-baseline gap-1 md:gap-2">
            <p className="text-2xl md:text-3xl font-black text-neutral-900">{statistics.avgEmissions}</p>
            <p className="text-xs md:text-sm font-bold text-neutral-500">tCO2e</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-neutral-100"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="p-1.5 md:p-2 bg-amber-50 rounded-lg">
              <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
            </div>
            <p className="text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Trend</p>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <p className="text-2xl md:text-3xl font-black text-emerald-600">{Math.abs(statistics.trend)}%</p>
            <span className="text-xs md:text-sm font-bold text-neutral-500">↓ Decrease</span>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-neutral-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div>
            <label className="text-xs font-black text-neutral-500 uppercase tracking-wide mb-2 block">
              Report Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-black text-neutral-500 uppercase tracking-wide mb-2 block">
              Report Type
            </label>
            <select className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
              <option value="all">All Types</option>
              <option value="summary">Summary</option>
              <option value="detailed">Detailed</option>
              <option value="analysis">Analysis</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-black text-neutral-500 uppercase tracking-wide mb-2 block">
              Scope
            </label>
            <select className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
              <option value="all">All Scopes</option>
              <option value="scope1">Scope 1</option>
              <option value="scope2">Scope 2</option>
              <option value="scope3">Scope 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl md:rounded-2xl border-2 border-neutral-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b-2 border-neutral-100">
          <h2 className="text-lg md:text-xl font-black text-neutral-900">Available Reports</h2>
          <p className="text-xs md:text-sm text-neutral-500 font-bold mt-1">
            {reports.length} reports available for download
          </p>
        </div>

        <div className="divide-y divide-neutral-100">
          {reports.map((report) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 md:p-6 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-emerald-50 rounded-xl shrink-0">
                      <FileText className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-neutral-900 mb-2 text-sm md:text-base">{report.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-bold text-xs">
                          {report.type}
                        </Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-bold text-xs">
                          {report.scope}
                        </Badge>
                        <div className="flex items-center gap-1.5 md:gap-2 text-neutral-500">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs font-bold">{report.period}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-3 text-xs text-neutral-500 font-bold">
                        <span>Generated: {report.generatedDate}</span>
                        <span>Size: {report.size}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
                  <Button
                    onClick={() => toast.info("Opening preview...")}
                    variant="outline"
                    className="w-full sm:w-auto font-black text-sm"
                  >
                    Preview
                  </Button>
                  <Button
                    onClick={() => handleDownload(report.title)}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center justify-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <button className="p-6 bg-white border-2 border-neutral-100 rounded-2xl hover:border-emerald-200 hover:shadow-lg transition-all text-left group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all ml-auto" />
          </div>
          <h3 className="font-black text-neutral-900 mb-2">Emissions Analytics</h3>
          <p className="text-sm text-neutral-600 font-bold">
            View detailed emissions analytics and trends
          </p>
        </button>

        <button className="p-6 bg-white border-2 border-neutral-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all text-left group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
              <PieChart className="w-6 h-6 text-blue-600" />
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all ml-auto" />
          </div>
          <h3 className="font-black text-neutral-900 mb-2">Category Breakdown</h3>
          <p className="text-sm text-neutral-600 font-bold">
            Analyze emissions by category and source
          </p>
        </button>

        <button className="p-6 bg-white border-2 border-neutral-100 rounded-2xl hover:border-purple-200 hover:shadow-lg transition-all text-left group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all ml-auto" />
          </div>
          <h3 className="font-black text-neutral-900 mb-2">Custom Reports</h3>
          <p className="text-sm text-neutral-600 font-bold">
            Create custom reports with specific criteria
          </p>
        </button>
      </div>
    </div>
  );
}