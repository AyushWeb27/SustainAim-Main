import React from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Zap,
  Droplets,
  Wind,
  Activity,
  Calendar,
  Users,
  ChevronRight,
  BarChart3,
  Sparkles,
  Target,
  Shield,
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  Flame,
  CloudRain,
  Factory,
  ArrowUpRight,
  Clock,
  Award
} from "lucide-react";
import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function BranchUserDashboardOverview() {
  const navigate = useNavigate();

  // Get branch user data from localStorage
  const branchUserData = JSON.parse(localStorage.getItem("branchUser") || "{}");
  const permissions = branchUserData.permissions || {};

  // Mock branch-specific data
  const branchStats = {
    totalEmissions: 245.6,
    monthlyChange: -8.5,
    targetProgress: 76,
    complianceScore: 94,
    scope1: { value: 82.3, change: -5.2, hasAccess: permissions.scope1?.view },
    scope2: { value: 98.4, change: -12.1, hasAccess: permissions.scope2?.view },
    scope3: { value: 64.9, change: -7.8, hasAccess: permissions.scope3?.view }
  };

  const recentActivities = [
    {
      id: 1,
      scope: "Scope 1",
      category: "Fuel Combustion",
      value: "12.5",
      date: "2026-04-03",
      time: "10:30 AM",
      status: "approved",
      color: "emerald",
      user: branchUserData.name || "Branch User"
    },
    {
      id: 2,
      scope: "Scope 2",
      category: "Electricity Usage",
      value: "25.3",
      date: "2026-04-02",
      time: "03:15 PM",
      status: "pending",
      color: "blue",
      user: branchUserData.name || "Branch User"
    },
    {
      id: 3,
      scope: "Scope 1",
      category: "Company Vehicles",
      value: "8.7",
      date: "2026-04-01",
      time: "11:45 AM",
      status: "approved",
      color: "emerald",
      user: branchUserData.name || "Branch User"
    },
    {
      id: 4,
      scope: "Scope 3",
      category: "Business Travel",
      value: "15.2",
      date: "2026-03-30",
      time: "02:20 PM",
      status: "approved",
      color: "indigo",
      user: branchUserData.name || "Branch User"
    },
    {
      id: 5,
      scope: "Scope 2",
      category: "Heating & Cooling",
      value: "18.6",
      date: "2026-03-28",
      time: "09:00 AM",
      status: "approved",
      color: "blue",
      user: branchUserData.name || "Branch User"
    }
  ];

  const monthlyTrend = [
    { month: "Jan", emissions: 198.5 },
    { month: "Feb", emissions: 215.3 },
    { month: "Mar", emissions: 245.6 },
    { month: "Apr", emissions: 224.8 }
  ];

  const quickActions = [
    {
      title: "Add Scope 1",
      icon: Flame,
      color: "emerald",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      enabled: permissions.scope1?.edit,
      description: "Direct emissions",
      path: "/branch-user/scope1"
    },
    {
      title: "Add Scope 2",
      icon: Zap,
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      enabled: permissions.scope2?.edit,
      description: "Indirect emissions",
      path: "/branch-user/scope2"
    },
    {
      title: "Add Scope 3",
      icon: Wind,
      color: "indigo",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      enabled: permissions.scope3?.edit,
      description: "Value chain",
      path: "/branch-user/scope3"
    },
    {
      title: "View Reports",
      icon: FileText,
      color: "purple",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      enabled: true,
      description: "Branch analytics",
      path: "/branch-user/reports"
    }
  ];

  return (
    <div className="space-y-6 md:space-y-10">
      {/* Quick Access Banner - Scope 1 Available */}
      {permissions.scope1?.view && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 rounded-2xl md:rounded-3xl p-5 md:p-6 text-white shadow-2xl relative overflow-hidden cursor-pointer hover:shadow-3xl transition-all"
          onClick={() => navigate("/branch-user/scope1")}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 md:p-4 bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl">
                <Flame className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black mb-1">✓ Scope 1 Emissions Data Ready!</h3>
                <p className="text-sm md:text-base text-emerald-50 font-bold">
                  6 emission records loaded • 65.5 tCO2e tracked • {permissions.scope1?.edit ? "Full edit access" : "View access"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-white text-emerald-600 font-black text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2">
                ACTIVE NOW
              </Badge>
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Welcome Section - Similar to Customer Dashboard */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">
        {/* Main Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="xl:col-span-3 bg-neutral-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-12 text-white relative overflow-hidden shadow-2xl shadow-neutral-900/40"
        >
          {/* Abstract background design */}
          <div className="absolute top-0 right-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-emerald-600 rounded-full blur-[100px] md:blur-[120px] opacity-10 -mr-32 md:-mr-40 -mt-32 md:-mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 md:w-80 h-64 md:h-80 bg-blue-600 rounded-full blur-[80px] md:blur-[100px] opacity-5 -ml-16 md:-ml-20 -mb-16 md:-mb-20 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-10 mb-8 md:mb-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4 md:mb-6 bg-white/5 w-fit px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 backdrop-blur-md">
                  <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" />
                  <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase text-white/80">Branch Portal Active</span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-3 md:mb-5">
                  {branchUserData.branchName || "Branch"}<br />
                  <span className="text-emerald-500 italic font-medium">Dashboard</span>
                </h1>
                <p className="text-neutral-400 font-bold text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed max-w-2xl">
                  Welcome back, <span className="text-white font-black">{branchUserData.name || "User"}</span>. Your branch is performing at <span className="text-emerald-400 font-black">{branchStats.targetProgress}% efficiency</span>. Total emissions this month: <span className="text-white font-black">{branchStats.totalEmissions} tCO2e</span>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 shrink-0">
                <div className="bg-white/5 backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 text-center flex flex-col items-center gap-2 min-w-[120px] md:min-w-[140px]">
                  <div className="p-2 md:p-2.5 bg-emerald-500/20 rounded-xl">
                    <Target className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-neutral-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-0.5">Target Progress</p>
                    <p className="text-2xl md:text-3xl font-black">{branchStats.targetProgress}%</p>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 text-center flex flex-col items-center gap-2 min-w-[120px] md:min-w-[140px]">
                  <div className="p-2 md:p-2.5 bg-blue-500/20 rounded-xl">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-neutral-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-0.5">Score</p>
                    <p className="text-2xl md:text-3xl font-black">{branchStats.complianceScore}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
              <button
                onClick={() => navigate("/branch-user/reports")}
                className="px-6 md:px-8 py-3 md:py-4 bg-emerald-500 text-neutral-900 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-2 group"
              >
                View Full Report
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 md:px-8 py-3 md:py-4 bg-white/5 text-white border border-white/10 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center gap-2">
                <Download className="w-4 h-4 md:w-5 md:h-5" />
                Export Data
              </button>
            </div>
          </div>
        </motion.div>

        {/* Role & Permissions Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 text-white relative overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl w-fit mb-4 md:mb-6">
              <Shield className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-2">Your Access</h3>
            <p className="text-blue-100 text-xs md:text-sm font-bold mb-4 md:mb-6">{branchUserData.role || "Branch User"}</p>
            <div className="space-y-2">
              {Object.entries(permissions).map(([scope, perms]: [string, any]) => (
                <div key={scope} className="flex items-center justify-between px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                  <span className="text-xs font-black capitalize">{scope}</span>
                  <span className="text-[10px] font-black uppercase tracking-wide">
                    {perms?.view && perms?.edit ? "✓ Edit" : perms?.view ? "✓ View" : "✗ Locked"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20">
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold">Last sync: Today, 10:30 AM</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scope Statistics */}
      <div>
        <div className="mb-5 md:mb-6 px-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-neutral-900 mb-1 md:mb-2">Emissions by Scope</h2>
              <p className="text-sm md:text-base text-neutral-600 font-bold">Branch emissions breakdown and month-over-month performance</p>
            </div>
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-sm font-black transition-all">
              <Calendar className="w-4 h-4" />
              This Month
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              title: "Scope 1",
              subtitle: "Direct Emissions",
              value: branchStats.scope1.value,
              change: branchStats.scope1.change,
              icon: Flame,
              color: "emerald",
              bgColor: "bg-emerald-50",
              borderColor: "border-emerald-200",
              textColor: "text-emerald-600",
              gradient: "from-emerald-50 via-emerald-100/50 to-white",
              hasAccess: branchStats.scope1.hasAccess,
              path: "/branch-user/scope1"
            },
            {
              title: "Scope 2",
              subtitle: "Energy Indirect",
              value: branchStats.scope2.value,
              change: branchStats.scope2.change,
              icon: Zap,
              color: "blue",
              bgColor: "bg-blue-50",
              borderColor: "border-blue-200",
              textColor: "text-blue-600",
              gradient: "from-blue-50 via-blue-100/50 to-white",
              hasAccess: branchStats.scope2.hasAccess,
              path: "/branch-user/scope2"
            },
            {
              title: "Scope 3",
              subtitle: "Value Chain",
              value: branchStats.scope3.value,
              change: branchStats.scope3.change,
              icon: Wind,
              color: "indigo",
              bgColor: "bg-indigo-50",
              borderColor: "border-indigo-200",
              textColor: "text-indigo-600",
              gradient: "from-indigo-50 via-indigo-100/50 to-white",
              hasAccess: branchStats.scope3.hasAccess,
              path: "/branch-user/scope3"
            }
          ].map((scope, index) => (
            <motion.div
              key={scope.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={scope.hasAccess ? { scale: 1.02, y: -4 } : {}}
              onClick={() => scope.hasAccess && navigate(scope.path)}
              className={`relative bg-gradient-to-br ${scope.gradient} rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 ${scope.borderColor} shadow-lg hover:shadow-2xl transition-all ${
                scope.hasAccess ? "cursor-pointer" : "opacity-60"
              }`}
            >
              {!scope.hasAccess && (
                <div className="absolute inset-0 bg-neutral-50/80 backdrop-blur-sm rounded-2xl md:rounded-3xl flex items-center justify-center z-10">
                  <div className="text-center px-4">
                    <Shield className="w-8 h-8 md:w-10 md:h-10 text-neutral-400 mx-auto mb-2 md:mb-3" />
                    <p className="font-black text-sm md:text-base text-neutral-700">No Access</p>
                    <p className="text-[10px] md:text-xs text-neutral-500 font-bold mt-1">Contact admin</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className={`p-3 md:p-4 bg-white rounded-xl md:rounded-2xl shadow-md`}>
                  <scope.icon className={`w-5 h-5 md:w-6 md:h-6 ${scope.textColor}`} />
                </div>
                <Badge variant="outline" className={`${scope.textColor} border-2 font-black px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs`}>
                  {scope.hasAccess ? (permissions[scope.title.toLowerCase().replace(" ", "")]?.edit ? "Edit" : "View") : "Locked"}
                </Badge>
              </div>

              <h3 className="text-lg md:text-xl font-black text-neutral-900 mb-1">{scope.title}</h3>
              <p className="text-[10px] md:text-xs text-neutral-600 font-black uppercase tracking-wider mb-4 md:mb-6">{scope.subtitle}</p>

              <div className="flex items-baseline gap-2 md:gap-3 mb-3 md:mb-4">
                <p className="text-3xl md:text-4xl font-black text-neutral-900">{scope.value}</p>
                <p className="text-sm md:text-base font-black text-neutral-500">tCO2e</p>
              </div>

              <div className="flex items-center gap-2">
                {scope.change < 0 ? (
                  <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-2 bg-emerald-100 text-emerald-700 rounded-lg md:rounded-xl shadow-sm">
                    <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm font-black">{Math.abs(scope.change)}%</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-2 bg-red-100 text-red-700 rounded-lg md:rounded-xl shadow-sm">
                    <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm font-black">{scope.change}%</span>
                  </div>
                )}
                <span className="text-[10px] md:text-xs text-neutral-600 font-bold">from last month</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="mb-5 md:mb-6 px-1">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 mb-1 md:mb-2">Quick Actions</h2>
          <p className="text-sm md:text-base text-neutral-600 font-bold">Frequently used operations for emissions tracking</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={action.enabled ? { scale: 1.03, y: -2 } : {}}
              whileTap={action.enabled ? { scale: 0.98 } : {}}
              disabled={!action.enabled}
              onClick={() => action.enabled && navigate(action.path)}
              className={`relative p-5 md:p-6 bg-white border-2 border-neutral-100 rounded-xl md:rounded-2xl text-left transition-all hover:shadow-xl group ${
                action.enabled ? "hover:border-emerald-300" : "opacity-50 cursor-not-allowed"
              }`}
            >
              <div className={`inline-flex p-2.5 md:p-3 ${action.bgColor} rounded-xl md:rounded-2xl mb-3 md:mb-4 shadow-sm`}>
                <action.icon className={`w-5 h-5 md:w-6 md:h-6 ${action.textColor}`} />
              </div>
              <h3 className="font-black text-sm md:text-base text-neutral-900 mb-1">{action.title}</h3>
              <p className="text-[10px] md:text-xs text-neutral-500 font-bold">{action.description}</p>
              {action.enabled && (
                <ChevronRight className="absolute top-5 md:top-6 right-5 md:right-6 w-4 h-4 md:w-5 md:h-5 text-neutral-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              )}
              {!action.enabled && (
                <div className="absolute top-5 md:top-6 right-5 md:right-6">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-neutral-300" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 md:mb-6 gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-neutral-900 mb-1 md:mb-2">Recent Emissions Entries</h2>
            <p className="text-sm md:text-base text-neutral-600 font-bold">Latest data submissions and their approval status</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 md:py-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-xs md:text-sm font-black transition-all w-fit">
            View All
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl border-2 border-neutral-100 overflow-hidden shadow-sm">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b-2 border-neutral-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-neutral-500 uppercase tracking-wide">
                    Scope
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-neutral-500 uppercase tracking-wide">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-neutral-500 uppercase tracking-wide">
                    Emissions (tCO2e)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-neutral-500 uppercase tracking-wide">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-neutral-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-neutral-500 uppercase tracking-wide">
                    Submitted By
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`text-${activity.color}-600 border-${activity.color}-200 bg-${activity.color}-50 font-black text-xs`}>
                        {activity.scope}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-neutral-900">{activity.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-black text-lg text-neutral-900">{activity.value}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-neutral-700">
                          <Calendar className="w-4 h-4" />
                          <p className="text-sm font-bold">{activity.date}</p>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-500">
                          <Clock className="w-3 h-3" />
                          <p className="text-xs font-bold">{activity.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {activity.status === "approved" ? (
                        <div className="flex items-center gap-2 text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm font-bold">Approved</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-amber-600">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm font-bold">Pending</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                          <span className="text-xs font-black text-emerald-600">
                            {activity.user.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-neutral-700">{activity.user}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-neutral-100">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-neutral-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="outline" className={`text-${activity.color}-600 border-${activity.color}-200 bg-${activity.color}-50 font-black text-xs`}>
                    {activity.scope}
                  </Badge>
                  {activity.status === "approved" ? (
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">Approved</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-amber-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">Pending</span>
                    </div>
                  )}
                </div>
                <p className="font-bold text-neutral-900 mb-2">{activity.category}</p>
                <p className="font-black text-xl text-neutral-900 mb-3">{activity.value} tCO2e</p>
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span className="font-bold">{activity.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span className="font-bold">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend & Permissions Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Monthly Trend Chart */}
        <div className="bg-white rounded-xl md:rounded-2xl border-2 border-neutral-100 p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-1">Monthly Trend</h3>
              <p className="text-xs md:text-sm text-neutral-600 font-bold">Total emissions over time</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg">
              {branchStats.monthlyChange < 0 ? (
                <>
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-black text-emerald-600">{Math.abs(branchStats.monthlyChange)}%</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-black text-red-600">{branchStats.monthlyChange}%</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {monthlyTrend.map((item, index) => (
              <div key={item.month} className="flex items-center gap-4">
                <div className="w-12 text-sm font-black text-neutral-600">{item.month}</div>
                <div className="flex-1 h-12 bg-neutral-50 rounded-xl relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.emissions / 260) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-end px-4"
                  >
                    <span className="text-xs font-black text-white">{item.emissions}</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Overview */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-100 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl shrink-0">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-1">Your Access Permissions</h3>
              <p className="text-xs md:text-sm text-neutral-600 font-bold">Role: {branchUserData.role || "Branch User"}</p>
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(permissions).map(([scope, perms]: [string, any]) => (
              <div key={scope} className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${perms?.view ? "bg-emerald-500" : "bg-neutral-300"}`} />
                  <span className="text-sm font-black text-neutral-700 capitalize">{scope}</span>
                </div>
                <div className="flex items-center gap-2">
                  {perms?.view && perms?.edit ? (
                    <>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-black text-xs">View</Badge>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200 font-black text-xs">Edit</Badge>
                    </>
                  ) : perms?.view ? (
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 font-black text-xs">View Only</Badge>
                  ) : (
                    <Badge variant="outline" className="text-neutral-500 font-black text-xs">No Access</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-blue-200">
            <p className="text-xs text-neutral-600 font-bold">
              Need additional permissions? Contact your branch administrator to request access upgrades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}