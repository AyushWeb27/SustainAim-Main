import React, { useState } from "react";
import {
  FileText,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  RefreshCw,
  Sparkles,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Leaf,
  Factory,
  Car,
  Plane,
  Building2,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { PDFHistory } from "./PDFHistory";
import { GenerateReportModal, GenerateReportOptions } from "./GenerateReportModal";

export function AIGHGReportPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateReport = (options: GenerateReportOptions) => {
    console.log("Generating report with options:", options);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      toast.success("AI GHG Report generated successfully!");
    }, 3000);
  };

  // Mock AI-generated data
  const reportData = {
    totalEmissions: 12847.5,
    emissionsTrend: -12.3,
    complianceScore: 87,
    scope1: {
      emissions: 3421.2,
      percentage: 26.6,
      trend: -8.5,
    },
    scope2: {
      emissions: 4512.8,
      percentage: 35.1,
      trend: -15.2,
    },
    scope3: {
      emissions: 4913.5,
      percentage: 38.3,
      trend: -11.8,
    },
  };

  const aiInsights = [
    {
      icon: TrendingDown,
      color: "emerald",
      title: "Significant Emission Reduction",
      description:
        "Your organization has achieved a 12.3% reduction in total GHG emissions compared to last quarter, exceeding your target by 3.8%.",
      impact: "high",
    },
    {
      icon: Lightbulb,
      color: "blue",
      title: "Energy Efficiency Improvement",
      description:
        "Scope 2 emissions decreased by 15.2% due to improved energy efficiency measures and increased renewable energy adoption.",
      impact: "high",
    },
    {
      icon: AlertCircle,
      color: "amber",
      title: "Supply Chain Opportunities",
      description:
        "Supply chain emissions (Scope 3) represent 38.3% of total emissions. Consider engaging suppliers in emission reduction initiatives.",
      impact: "medium",
    },
    {
      icon: CheckCircle2,
      color: "emerald",
      title: "Compliance Achievement",
      description:
        "Your current emission levels are well within regulatory requirements. Compliance score: 87/100.",
      impact: "high",
    },
  ];

  const aiRecommendations = [
    {
      title: "Transition to Renewable Energy",
      description:
        "Increase renewable energy procurement from 45% to 70% to further reduce Scope 2 emissions by an estimated 18%.",
      priority: "High",
      potentialReduction: "814 tCO2e",
      timeline: "6-12 months",
    },
    {
      title: "Fleet Electrification",
      description:
        "Replace 30% of diesel vehicles with electric alternatives to reduce direct emissions by approximately 12%.",
      priority: "High",
      potentialReduction: "410 tCO2e",
      timeline: "12-18 months",
    },
    {
      title: "Supplier Engagement Program",
      description:
        "Implement a supplier sustainability program requiring emission reduction targets from top 20 suppliers.",
      priority: "Medium",
      potentialReduction: "736 tCO2e",
      timeline: "18-24 months",
    },
    {
      title: "Energy-Efficient Equipment Upgrades",
      description:
        "Upgrade HVAC systems and lighting to energy-efficient alternatives across all facilities.",
      priority: "Medium",
      potentialReduction: "325 tCO2e",
      timeline: "6-12 months",
    },
  ];

  const emissionSources = [
    { icon: Factory, label: "Manufacturing", value: 3421.2, color: "emerald" },
    { icon: Building2, label: "Facilities", value: 4512.8, color: "blue" },
    { icon: Car, label: "Transportation", value: 2847.3, color: "purple" },
    { icon: Plane, label: "Business Travel", value: 2066.2, color: "amber" },
  ];

  return (
    <div className="space-y-8">
      {/* Generate Report Modal */}
      <GenerateReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerateReport}
        reportType="GHG"
      />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
                AI-Powered GHG Report
              </h1>
              <p className="text-neutral-500 font-bold mt-1">
                Intelligent insights and recommendations for emission reduction
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50"
          >
            <Sparkles className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </div>

      {isGenerating ? (
        <div className="bg-white rounded-3xl border-2 border-neutral-100 p-12 shadow-xl text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-6"
          >
            <Sparkles className="w-20 h-20 text-emerald-600" />
          </motion.div>
          <h3 className="text-2xl font-black text-neutral-900 mb-2">
            AI is analyzing your data...
          </h3>
          <p className="text-neutral-500 font-medium">
            Please wait while we generate intelligent insights from your emission data
          </p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-black">
                  <TrendingDown className="w-4 h-4" />
                  {reportData.emissionsTrend}%
                </div>
              </div>
              <p className="text-neutral-500 font-bold text-sm mb-1">Total Emissions</p>
              <p className="text-3xl font-black text-neutral-900">
                {reportData.totalEmissions.toLocaleString()}
              </p>
              <p className="text-xs text-neutral-400 font-medium mt-1">tCO2e</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-black">
                  <CheckCircle2 className="w-4 h-4" />
                  Good
                </div>
              </div>
              <p className="text-neutral-500 font-bold text-sm mb-1">Compliance Score</p>
              <p className="text-3xl font-black text-neutral-900">{reportData.complianceScore}</p>
              <p className="text-xs text-neutral-400 font-medium mt-1">out of 100</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-black">
                  <TrendingDown className="w-4 h-4" />
                  {reportData.scope2.trend}%
                </div>
              </div>
              <p className="text-neutral-500 font-bold text-sm mb-1">Scope 2 (Energy)</p>
              <p className="text-3xl font-black text-neutral-900">
                {reportData.scope2.emissions.toLocaleString()}
              </p>
              <p className="text-xs text-neutral-400 font-medium mt-1">tCO2e</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-black">
                  <TrendingDown className="w-4 h-4" />
                  {reportData.scope3.trend}%
                </div>
              </div>
              <p className="text-neutral-500 font-bold text-sm mb-1">Scope 3 (Supply Chain)</p>
              <p className="text-3xl font-black text-neutral-900">
                {reportData.scope3.emissions.toLocaleString()}
              </p>
              <p className="text-xs text-neutral-400 font-medium mt-1">tCO2e</p>
            </motion.div>
          </div>

          {/* Emission Sources */}
          <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-xl">
            <h2 className="text-2xl font-black text-neutral-900 mb-6">Emission Sources Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {emissionSources.map((source, index) => {
                const Icon = source.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 bg-${source.color}-50 rounded-2xl border-2 border-${source.color}-100`}
                  >
                    <div className={`w-12 h-12 bg-${source.color}-600 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className={`text-sm font-black text-${source.color}-900 mb-2`}>
                      {source.label}
                    </p>
                    <p className={`text-2xl font-black text-${source.color}-900`}>
                      {source.value.toLocaleString()}
                    </p>
                    <p className={`text-xs text-${source.color}-700 font-medium mt-1`}>tCO2e</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-100 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-neutral-900">AI-Generated Insights</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {aiInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl border-2 border-neutral-100 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 bg-${insight.color}-50 rounded-xl flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 text-${insight.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-neutral-900 mb-2">
                          {insight.title}
                        </h3>
                        <p className="text-neutral-600 font-medium text-sm leading-relaxed">
                          {insight.description}
                        </p>
                        <span
                          className={`inline-block mt-3 px-3 py-1 rounded-lg text-xs font-black ${
                            insight.impact === "high"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {insight.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-neutral-900">AI Recommendations</h2>
            </div>
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-neutral-50 rounded-2xl border-2 border-neutral-100 hover:border-emerald-200 transition-all"
                >
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-black text-neutral-900">{rec.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-black ${
                            rec.priority === "High"
                              ? "bg-red-50 text-red-700 border-2 border-red-200"
                              : "bg-amber-50 text-amber-700 border-2 border-amber-200"
                          }`}
                        >
                          {rec.priority} Priority
                        </span>
                      </div>
                      <p className="text-neutral-600 font-medium text-sm">{rec.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      <span className="font-black text-emerald-700">
                        Potential Reduction: {rec.potentialReduction}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-neutral-600">Timeline: {rec.timeline}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* PDF History */}
          <PDFHistory type="GHG" />
        </>
      )}
    </div>
  );
}
