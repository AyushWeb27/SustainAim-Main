import React, { useState } from "react";
import {
  X,
  Calendar,
  Sparkles,
  FileText,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (options: GenerateReportOptions) => void;
  reportType: "ESG" | "GHG";
}

export interface GenerateReportOptions {
  startDate: string;
  endDate: string;
  includeRecommendations: boolean;
  includeInsights: boolean;
  includeBenchmarking: boolean;
  includeHistoricalData: boolean;
  reportFormat: "detailed" | "summary";
  language: string;
}

export function GenerateReportModal({
  isOpen,
  onClose,
  onGenerate,
  reportType,
}: GenerateReportModalProps) {
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-04-03");
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [includeInsights, setIncludeInsights] = useState(true);
  const [includeBenchmarking, setIncludeBenchmarking] = useState(true);
  const [includeHistoricalData, setIncludeHistoricalData] = useState(false);
  const [reportFormat, setReportFormat] = useState<"detailed" | "summary">("detailed");
  const [language, setLanguage] = useState("english");

  const handleGenerate = () => {
    onGenerate({
      startDate,
      endDate,
      includeRecommendations,
      includeInsights,
      includeBenchmarking,
      includeHistoricalData,
      reportFormat,
      language,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b-2 border-neutral-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 ${
                      reportType === "ESG"
                        ? "bg-purple-600"
                        : "bg-emerald-600"
                    } rounded-2xl flex items-center justify-center`}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-neutral-900">
                      Generate {reportType} Report
                    </h2>
                    <p className="text-sm text-neutral-500 font-medium">
                      Configure your report settings
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl hover:bg-neutral-100 flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                {/* Date Range Selection */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-neutral-600" />
                    <h3 className="text-lg font-black text-neutral-900">Date Range</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-purple-500 focus:outline-none font-medium text-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-purple-500 focus:outline-none font-medium text-neutral-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Report Format */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-neutral-600" />
                    <h3 className="text-lg font-black text-neutral-900">Report Format</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setReportFormat("detailed")}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        reportFormat === "detailed"
                          ? reportType === "ESG"
                            ? "border-purple-600 bg-purple-50"
                            : "border-emerald-600 bg-emerald-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-neutral-900">Detailed</span>
                        {reportFormat === "detailed" && (
                          <CheckCircle2
                            className={`w-5 h-5 ${
                              reportType === "ESG" ? "text-purple-600" : "text-emerald-600"
                            }`}
                          />
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 font-medium">
                        Comprehensive analysis with all metrics
                      </p>
                    </button>
                    <button
                      onClick={() => setReportFormat("summary")}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        reportFormat === "summary"
                          ? reportType === "ESG"
                            ? "border-purple-600 bg-purple-50"
                            : "border-emerald-600 bg-emerald-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-neutral-900">Summary</span>
                        {reportFormat === "summary" && (
                          <CheckCircle2
                            className={`w-5 h-5 ${
                              reportType === "ESG" ? "text-purple-600" : "text-emerald-600"
                            }`}
                          />
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 font-medium">
                        Executive summary with key insights
                      </p>
                    </button>
                  </div>
                </div>

                {/* Report Options */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-neutral-600" />
                    <h3 className="text-lg font-black text-neutral-900">Report Options</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Include AI Recommendations",
                        description: "Get AI-powered suggestions for improvement",
                        checked: includeRecommendations,
                        onChange: setIncludeRecommendations,
                      },
                      {
                        label: "Include AI Insights",
                        description: "Detailed analysis and key findings",
                        checked: includeInsights,
                        onChange: setIncludeInsights,
                      },
                      {
                        label: "Include Benchmarking",
                        description: "Compare against industry standards",
                        checked: includeBenchmarking,
                        onChange: setIncludeBenchmarking,
                      },
                      {
                        label: "Include Historical Data",
                        description: "Show trends and historical comparisons",
                        checked: includeHistoricalData,
                        onChange: setIncludeHistoricalData,
                      },
                    ].map((option, index) => (
                      <label
                        key={index}
                        className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100 hover:border-neutral-200 cursor-pointer transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={option.checked}
                          onChange={(e) => option.onChange(e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-2 border-neutral-300"
                        />
                        <div className="flex-1">
                          <div className="font-black text-neutral-900 mb-1">
                            {option.label}
                          </div>
                          <div className="text-xs text-neutral-600 font-medium">
                            {option.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Language Selection */}
                <div>
                  <h3 className="text-lg font-black text-neutral-900 mb-3">Report Language</h3>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-purple-500 focus:outline-none font-bold text-neutral-900"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                    <option value="japanese">Japanese</option>
                  </select>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 p-6 border-t-2 border-neutral-100">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-neutral-200 text-neutral-700 rounded-xl font-black text-sm hover:bg-neutral-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerate}
                  className={`flex items-center gap-2 px-6 py-3 ${
                    reportType === "ESG"
                      ? "bg-purple-600 hover:bg-purple-700 shadow-purple-200"
                      : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                  } text-white rounded-xl font-black text-sm transition-all shadow-lg`}
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Report
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
