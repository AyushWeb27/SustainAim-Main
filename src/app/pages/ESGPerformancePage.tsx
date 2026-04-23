import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Leaf,
  Users,
  Shield,
  Target,
  Award,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Globe,
  Building2,
  FileText,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  PieChart as RePieChart,
  Pie
} from "recharts";

export function ESGPerformancePage() {
  const [timeRange, setTimeRange] = useState("12months");
  const [selectedCategory, setSelectedCategory] = useState("overall");

  // ESG Score Data
  const esgScores = {
    overall: 78,
    environmental: 82,
    social: 75,
    governance: 77,
    trend: "+5%"
  };

  // Performance Trend Data
  const performanceTrend = [
    { month: "Jan", environmental: 75, social: 70, governance: 72, overall: 72 },
    { month: "Feb", environmental: 76, social: 71, governance: 73, overall: 73 },
    { month: "Mar", environmental: 78, social: 72, governance: 74, overall: 75 },
    { month: "Apr", environmental: 79, social: 73, governance: 75, overall: 76 },
    { month: "May", environmental: 80, social: 74, governance: 75, overall: 76 },
    { month: "Jun", environmental: 81, social: 74, governance: 76, overall: 77 },
    { month: "Jul", environmental: 81, social: 75, governance: 76, overall: 77 },
    { month: "Aug", environmental: 82, social: 75, governance: 76, overall: 78 },
    { month: "Sep", environmental: 82, social: 75, governance: 77, overall: 78 },
    { month: "Oct", environmental: 82, social: 75, governance: 77, overall: 78 },
    { month: "Nov", environmental: 82, social: 75, governance: 77, overall: 78 },
    { month: "Dec", environmental: 82, social: 75, governance: 77, overall: 78 }
  ];

  // Radar Chart Data
  const radarData = [
    { category: "Carbon Emissions", value: 85, fullMark: 100 },
    { category: "Energy Efficiency", value: 78, fullMark: 100 },
    { category: "Water Management", value: 82, fullMark: 100 },
    { category: "Waste Reduction", value: 80, fullMark: 100 },
    { category: "Employee Welfare", value: 75, fullMark: 100 },
    { category: "Diversity & Inclusion", value: 72, fullMark: 100 },
    { category: "Community Impact", value: 78, fullMark: 100 },
    { category: "Board Diversity", value: 76, fullMark: 100 },
    { category: "Ethics & Compliance", value: 88, fullMark: 100 },
    { category: "Risk Management", value: 80, fullMark: 100 }
  ];

  // Category Distribution
  const categoryData = [
    { name: "Environmental", value: 40, color: "#10b981" },
    { name: "Social", value: 35, color: "#3b82f6" },
    { name: "Governance", value: 25, color: "#8b5cf6" }
  ];

  // Key Metrics
  const metrics = [
    {
      label: "Carbon Intensity",
      value: "142 tCO₂e",
      change: -12,
      trend: "down",
      icon: Leaf,
      color: "emerald",
      period: "vs last year"
    },
    {
      label: "Energy Efficiency",
      value: "85%",
      change: 8,
      trend: "up",
      icon: Zap,
      color: "amber",
      period: "vs target"
    },
    {
      label: "Employee Satisfaction",
      value: "4.2/5",
      change: 5,
      trend: "up",
      icon: Users,
      color: "blue",
      period: "vs last quarter"
    },
    {
      label: "Governance Score",
      value: "77/100",
      change: 3,
      trend: "up",
      icon: Shield,
      color: "purple",
      period: "vs last year"
    }
  ];

  // Achievement Badges
  const achievements = [
    {
      title: "Carbon Neutral 2025",
      description: "On track to achieve carbon neutrality",
      status: "in-progress",
      progress: 78,
      icon: Target,
      color: "emerald"
    },
    {
      title: "Zero Waste Goal",
      description: "85% waste diversion achieved",
      status: "in-progress",
      progress: 85,
      icon: Leaf,
      color: "green"
    },
    {
      title: "Diversity Excellence",
      description: "40% women in leadership achieved",
      status: "achieved",
      progress: 100,
      icon: Users,
      color: "blue"
    },
    {
      title: "ESG Reporting",
      description: "GRI Standards compliant",
      status: "achieved",
      progress: 100,
      icon: FileText,
      color: "purple"
    }
  ];

  // Recent Activities
  const recentActivities = [
    {
      title: "Q4 2025 ESG Report Published",
      description: "Comprehensive sustainability performance report",
      date: "2 days ago",
      type: "report",
      icon: FileText,
      color: "blue"
    },
    {
      title: "Carbon Emission Reduction",
      description: "12% reduction in Scope 1 & 2 emissions",
      date: "1 week ago",
      type: "achievement",
      icon: TrendingDown,
      color: "emerald"
    },
    {
      title: "Employee Training Completed",
      description: "Sustainability awareness program for 500+ employees",
      date: "2 weeks ago",
      type: "social",
      icon: Users,
      color: "purple"
    },
    {
      title: "Governance Policy Updated",
      description: "Enhanced risk management framework implemented",
      date: "3 weeks ago",
      type: "governance",
      icon: Shield,
      color: "amber"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
      amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
      blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
      purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
      green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" }
    };
    return colors[color] || colors.emerald;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return ArrowUpRight;
    if (trend === "down") return ArrowDownRight;
    return Minus;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-emerald-100 rounded-xl">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              ESG Performance
            </h1>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 font-bold">
            Environmental, Social & Governance metrics and insights
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl font-bold text-neutral-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-all"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Overall ESG Score */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-6 h-6" />
              <span className="text-sm font-black uppercase tracking-widest">Overall ESG Score</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-7xl font-black">{esgScores.overall}</span>
              <span className="text-3xl font-bold">/100</span>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xl font-black">{esgScores.trend}</span>
              </div>
            </div>
            <p className="text-emerald-100 font-bold mt-4">
              Above industry average • Top 25% performers
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { label: "Environmental", value: esgScores.environmental, icon: Leaf, color: "bg-emerald-400" },
              { label: "Social", value: esgScores.social, icon: Users, color: "bg-blue-400" },
              { label: "Governance", value: esgScores.governance, icon: Shield, color: "bg-purple-400" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black mb-1">{item.value}</div>
                <div className="text-sm font-bold text-emerald-100">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const colors = getColorClasses(metric.color);
          const TrendIcon = getTrendIcon(metric.trend);
          const isPositive = metric.trend === "up" || (metric.trend === "down" && metric.label.includes("Carbon"));

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 ${metric.color === "emerald" ? "bg-emerald-100" : metric.color === "amber" ? "bg-amber-100" : metric.color === "blue" ? "bg-blue-100" : "bg-purple-100"} rounded-xl`}>
                  <metric.icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 ${isPositive ? "bg-emerald-100" : "bg-red-100"} rounded-lg`}>
                  <TrendIcon className={`w-3 h-3 ${isPositive ? "text-emerald-600" : "text-red-600"}`} />
                  <span className={`text-xs font-black ${isPositive ? "text-emerald-700" : "text-red-700"}`}>
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>
              <h3 className={`text-2xl font-black ${colors.text} mb-2`}>{metric.value}</h3>
              <p className={`text-sm font-bold ${colors.text} opacity-70`}>{metric.label}</p>
              <p className="text-xs text-neutral-500 font-bold mt-2">{metric.period}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Performance Trend */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-100 dark:border-neutral-700 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-neutral-900 dark:text-white">Performance Trend</h2>
            <Activity className="w-5 h-5 text-neutral-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontWeight: 'bold'
                }}
              />
              <Legend wrapperStyle={{ fontWeight: 'bold', fontSize: '12px' }} />
              <Line type="monotone" dataKey="environmental" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
              <Line type="monotone" dataKey="social" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
              <Line type="monotone" dataKey="governance" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-100 dark:border-neutral-700 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-neutral-900 dark:text-white">ESG Distribution</h2>
            <PieChart className="w-5 h-5 text-neutral-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontWeight: 'bold'
                }}
              />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Chart - Detailed Metrics */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-100 dark:border-neutral-700 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-neutral-900 dark:text-white">Detailed Performance Metrics</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-bold mt-1">
              Comprehensive breakdown across all ESG categories
            </p>
          </div>
          <Target className="w-5 h-5 text-neutral-400" />
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="category" style={{ fontSize: '11px', fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} style={{ fontSize: '10px', fontWeight: 'bold' }} />
            <Radar name="Performance" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontWeight: 'bold'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Achievements & Goals */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-100 dark:border-neutral-700 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-neutral-900 dark:text-white">Achievements & Goals</h2>
          <Award className="w-5 h-5 text-neutral-400" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => {
            const colors = getColorClasses(achievement.color);
            return (
              <div key={index} className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-6`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${achievement.color === "emerald" ? "bg-emerald-100" : achievement.color === "green" ? "bg-green-100" : achievement.color === "blue" ? "bg-blue-100" : "bg-purple-100"} rounded-xl`}>
                    <achievement.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-black ${colors.text}`}>{achievement.title}</h3>
                      {achievement.status === "achieved" && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      )}
                      {achievement.status === "in-progress" && (
                        <Clock className="w-5 h-5 text-amber-500" />
                      )}
                    </div>
                    <p className={`text-sm font-medium ${colors.text} opacity-70 mb-4`}>
                      {achievement.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className={colors.text}>Progress</span>
                        <span className={colors.text}>{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${achievement.status === "achieved" ? "bg-emerald-500" : "bg-amber-500"}`}
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-100 dark:border-neutral-700 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-neutral-900 dark:text-white">Recent Activities</h2>
          <Clock className="w-5 h-5 text-neutral-400" />
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => {
            const colors = getColorClasses(activity.color);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
              >
                <div className={`p-2.5 ${colors.bg} rounded-xl`}>
                  <activity.icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-neutral-900 dark:text-white mb-1">{activity.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-bold">
                    <Calendar className="w-3 h-3" />
                    {activity.date}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
