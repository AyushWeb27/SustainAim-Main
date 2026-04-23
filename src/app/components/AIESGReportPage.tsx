import React, { useState } from "react";
import {
  FileText,
  TrendingUp,
  TrendingDown,
  Award,
  Users,
  Shield,
  Leaf,
  Heart,
  Target,
  RefreshCw,
  Sparkles,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Building2,
  Globe,
  DollarSign,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { PDFHistory } from "./PDFHistory";
import { GenerateReportModal, GenerateReportOptions } from "./GenerateReportModal";

export function AIESGReportPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateReport = (options: GenerateReportOptions) => {
    console.log("Generating report with options:", options);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      toast.success("AI ESG Report generated successfully!");
    }, 3000);
  };

  // Mock AI-generated ESG data
  const esgScores = {
    overall: 78,
    environmental: 82,
    social: 76,
    governance: 76,
  };

  const categoryDetails = [
    {
      category: "Environmental",
      score: 82,
      icon: Leaf,
      color: "emerald",
      trend: 8,
      metrics: [
        { label: "Carbon Emissions", score: 85, status: "excellent" },
        { label: "Energy Efficiency", score: 88, status: "excellent" },
        { label: "Waste Management", score: 79, status: "good" },
        { label: "Water Conservation", score: 76, status: "good" },
      ],
    },
    {
      category: "Social",
      score: 76,
      icon: Users,
      color: "blue",
      trend: 5,
      metrics: [
        { label: "Employee Wellbeing", score: 81, status: "excellent" },
        { label: "Diversity & Inclusion", score: 73, status: "good" },
        { label: "Community Engagement", score: 78, status: "good" },
        { label: "Labor Practices", score: 72, status: "fair" },
      ],
    },
    {
      category: "Governance",
      score: 76,
      icon: Shield,
      color: "purple",
      trend: 3,
      metrics: [
        { label: "Board Structure", score: 80, status: "excellent" },
        { label: "Ethics & Compliance", score: 85, status: "excellent" },
        { label: "Risk Management", score: 70, status: "fair" },
        { label: "Transparency", score: 69, status: "fair" },
      ],
    },
  ];

  const aiInsights = [
    {
      icon: TrendingUp,
      color: "emerald",
      title: "Strong Environmental Performance",
      description:
        "Your organization demonstrates exceptional environmental stewardship with an 82/100 score, exceeding industry average by 15 points.",
      impact: "high",
    },
    {
      icon: Users,
      color: "blue",
      title: "Diversity Initiative Impact",
      description:
        "Recent diversity and inclusion programs show positive results, but there's room for improvement in representation at senior levels.",
      impact: "medium",
    },
    {
      icon: AlertTriangle,
      color: "amber",
      title: "Governance Enhancement Needed",
      description:
        "Risk management and transparency scores are below target. Consider implementing enhanced reporting mechanisms and risk frameworks.",
      impact: "high",
    },
    {
      icon: Award,
      color: "purple",
      title: "Industry Leadership Position",
      description:
        "Overall ESG score of 78 places your organization in the top 25% of your industry sector, demonstrating strong commitment to sustainability.",
      impact: "high",
    },
  ];

  const aiRecommendations = [
    {
      category: "Environmental",
      title: "Accelerate Renewable Energy Transition",
      description:
        "Set ambitious targets to reach 100% renewable energy by 2028. This could improve your environmental score by 8-10 points.",
      priority: "High",
      estimatedImprovement: "+8 points",
      timeline: "12-24 months",
    },
    {
      category: "Social",
      title: "Enhanced Diversity Programs",
      description:
        "Implement targeted recruitment and mentorship programs to improve diversity metrics, particularly in leadership positions.",
      priority: "High",
      estimatedImprovement: "+6 points",
      timeline: "18-36 months",
    },
    {
      category: "Governance",
      title: "Strengthen Risk Management Framework",
      description:
        "Adopt ISO 31000 risk management standards and establish a dedicated risk committee at the board level.",
      priority: "High",
      estimatedImprovement: "+7 points",
      timeline: "6-12 months",
    },
    {
      category: "Social",
      title: "Supply Chain Labor Audits",
      description:
        "Conduct comprehensive labor practice audits across your supply chain to ensure ethical standards are maintained.",
      priority: "Medium",
      estimatedImprovement: "+4 points",
      timeline: "12-18 months",
    },
  ];

  const benchmarking = [
    { label: "Your Organization", score: 78, color: "emerald" },
    { label: "Industry Average", score: 67, color: "blue" },
    { label: "Top Performers", score: 88, color: "purple" },
    { label: "Regulatory Minimum", score: 55, color: "amber" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "good":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "fair":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-neutral-50 text-neutral-700 border-neutral-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Generate Report Modal */}
      <GenerateReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerateReport}
        reportType="ESG"
      />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
                AI-Powered ESG Report
              </h1>
              <p className="text-neutral-500 font-bold mt-1">
                Comprehensive analysis of Environmental, Social, and Governance performance
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-black text-sm hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 disabled:opacity-50"
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
            <Sparkles className="w-20 h-20 text-purple-600" />
          </motion.div>
          <h3 className="text-2xl font-black text-neutral-900 mb-2">
            AI is analyzing your ESG data...
          </h3>
          <p className="text-neutral-500 font-medium">
            Please wait while we generate comprehensive ESG insights
          </p>
        </div>
      ) : (
        <>
          {/* Overall ESG Score */}
          <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-3xl border-2 border-purple-100 p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <p className="text-neutral-600 font-bold mb-2">Overall ESG Score</p>
                <div className="flex items-center gap-4">
                  <div className="text-7xl font-black text-purple-600">{esgScores.overall}</div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-black text-emerald-600">+5 points</span>
                    </div>
                    <p className="text-xs text-neutral-500 font-medium">vs. last quarter</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 font-medium mt-3">
                  Top 25% in your industry
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 flex-1">
                {[
                  { label: "Environmental", score: esgScores.environmental, color: "emerald", icon: Leaf },
                  { label: "Social", score: esgScores.social, color: "blue", icon: Users },
                  { label: "Governance", score: esgScores.governance, color: "purple", icon: Shield },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl border-2 border-neutral-100 p-5 text-center"
                    >
                      <div className={`w-10 h-10 bg-${item.color}-50 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <Icon className={`w-5 h-5 text-${item.color}-600`} />
                      </div>
                      <p className="text-3xl font-black text-neutral-900 mb-1">{item.score}</p>
                      <p className="text-xs text-neutral-500 font-bold">{item.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Category Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {categoryDetails.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl border-2 border-neutral-100 p-6 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-${category.color}-50 rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${category.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-neutral-900">{category.category}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-neutral-900">{category.score}</span>
                          <div className={`flex items-center gap-1 px-2 py-0.5 bg-${category.color}-50 rounded-lg`}>
                            <TrendingUp className={`w-3 h-3 text-${category.color}-600`} />
                            <span className={`text-xs font-black text-${category.color}-700`}>+{category.trend}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {category.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm font-bold text-neutral-600">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-neutral-900">{metric.score}</span>
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border-2 ${getStatusColor(metric.status)}`}>
                            {metric.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Benchmarking */}
          <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-xl">
            <h2 className="text-2xl font-black text-neutral-900 mb-6">Industry Benchmarking</h2>
            <div className="space-y-4">
              {benchmarking.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-48 font-bold text-neutral-700 text-sm">{item.label}</div>
                  <div className="flex-1 bg-neutral-100 rounded-full h-8 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full bg-${item.color}-600 rounded-full flex items-center justify-end pr-3`}
                    >
                      <span className="text-white font-black text-sm">{item.score}</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
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
                        <h3 className="text-lg font-black text-neutral-900 mb-2">{insight.title}</h3>
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
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-neutral-900">Strategic Recommendations</h2>
            </div>
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-neutral-50 rounded-2xl border-2 border-neutral-100 hover:border-purple-200 transition-all"
                >
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-black border-2 border-purple-200">
                          {rec.category}
                        </span>
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
                      <h3 className="text-lg font-black text-neutral-900 mb-2">{rec.title}</h3>
                      <p className="text-neutral-600 font-medium text-sm">{rec.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="font-black text-emerald-700">
                        {rec.estimatedImprovement}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-neutral-600">Timeline: {rec.timeline}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* PDF History */}
          <PDFHistory type="ESG" />
        </>
      )}
    </div>
  );
}
