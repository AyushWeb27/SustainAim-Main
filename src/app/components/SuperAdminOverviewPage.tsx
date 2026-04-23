import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  Activity,
  Zap,
  IndianRupee,
  Globe,
  Eye,
  Edit,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CheckCircle2,
  AlertCircle,
  XCircle,
  DollarSign,
  Package
} from "lucide-react";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export function SuperAdminOverviewPage() {
  const [timeRange, setTimeRange] = useState("7d");

  // System Metrics Cards
  const systemMetrics = [
    {
      label: "Total Revenue",
      value: "₹84.2L",
      change: "+12.5%",
      trend: "up",
      icon: IndianRupee,
      color: "emerald",
      subtitle: "This month"
    },
    {
      label: "Total Customers",
      value: "2,847",
      change: "+8.2%",
      trend: "up",
      icon: Building2,
      color: "blue",
      subtitle: "Active accounts"
    },
    {
      label: "Active Users",
      value: "18,234",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "purple",
      subtitle: "Daily active"
    },
    {
      label: "Emissions Tracked",
      value: "1.2M",
      change: "+18.7%",
      trend: "up",
      icon: Activity,
      color: "orange",
      subtitle: "Total records"
    },
    {
      label: "System Uptime",
      value: "99.9%",
      change: "+0.1%",
      trend: "up",
      icon: Zap,
      color: "amber",
      subtitle: "Last 30 days"
    },
    {
      label: "Avg Response Time",
      value: "142ms",
      change: "-8.3%",
      trend: "down",
      icon: Globe,
      color: "teal",
      subtitle: "API latency"
    },
    {
      label: "Support Tickets",
      value: "89",
      change: "-12.5%",
      trend: "down",
      icon: CheckCircle2,
      color: "green",
      subtitle: "Open tickets"
    },
    {
      label: "Churn Rate",
      value: "2.3%",
      change: "-1.2%",
      trend: "down",
      icon: TrendingDown,
      color: "red",
      subtitle: "Last quarter"
    }
  ];

  // Revenue Chart Data (Last 12 Months)
  const revenueData = [
    { month: "Jan", revenue: 45, customers: 180, target: 50 },
    { month: "Feb", revenue: 52, customers: 195, target: 55 },
    { month: "Mar", revenue: 48, customers: 210, target: 60 },
    { month: "Apr", revenue: 61, customers: 225, target: 65 },
    { month: "May", revenue: 55, customers: 238, target: 65 },
    { month: "Jun", revenue: 67, customers: 252, target: 70 },
    { month: "Jul", revenue: 72, customers: 265, target: 75 },
    { month: "Aug", revenue: 68, customers: 278, target: 75 },
    { month: "Sep", revenue: 78, customers: 291, target: 80 },
    { month: "Oct", revenue: 85, customers: 304, target: 85 },
    { month: "Nov", revenue: 92, customers: 318, target: 90 },
    { month: "Dec", revenue: 84, customers: 284, target: 95 }
  ];

  // Customer Growth Data
  const customerGrowthData = [
    { month: "Jan", new: 42, churned: 8, active: 180 },
    { month: "Feb", new: 38, churned: 5, active: 195 },
    { month: "Mar", new: 45, churned: 7, active: 210 },
    { month: "Apr", new: 52, churned: 6, active: 225 },
    { month: "May", new: 48, churned: 9, active: 238 },
    { month: "Jun", new: 55, churned: 7, active: 252 },
    { month: "Jul", new: 58, churned: 5, active: 265 },
    { month: "Aug", new: 51, churned: 6, active: 278 },
    { month: "Sep", new: 62, churned: 8, active: 291 },
    { month: "Oct", new: 67, churned: 7, active: 304 },
    { month: "Nov", new: 72, churned: 9, active: 318 },
    { month: "Dec", new: 48, churned: 14, active: 284 }
  ];

  // Subscription Distribution
  const subscriptionData = [
    { name: "1 Month", value: 420, color: "#3b82f6" },
    { name: "6 Months", value: 680, color: "#10b981" },
    { name: "1 Year", value: 1234, color: "#8b5cf6" },
    { name: "3 Years", value: 513, color: "#f59e0b" }
  ];

  // Emissions by Scope
  const emissionsData = [
    { scope: "Scope 1", value: 456000, percentage: 38 },
    { scope: "Scope 2", value: 384000, percentage: 32 },
    { scope: "Scope 3", value: 360000, percentage: 30 }
  ];

  // Top Performing Customers
  const topCustomers = [
    {
      id: 1,
      name: "TechCorp Global",
      plan: "3 Years",
      revenue: "₹12.5L",
      emissions: "145,890",
      users: 450,
      status: "Active",
      growth: "+24%"
    },
    {
      id: 2,
      name: "CleanEnergy Partners",
      plan: "1 Year",
      revenue: "₹8.9L",
      emissions: "98,234",
      users: 320,
      status: "Active",
      growth: "+18%"
    },
    {
      id: 3,
      name: "GreenManufacturing Inc",
      plan: "1 Year",
      revenue: "₹7.2L",
      emissions: "76,543",
      users: 120,
      status: "Active",
      growth: "+32%"
    },
    {
      id: 4,
      name: "EcoRetail Solutions",
      plan: "6 Months",
      revenue: "₹5.4L",
      emissions: "54,321",
      users: 85,
      status: "Active",
      growth: "+12%"
    },
    {
      id: 5,
      name: "Sustainable Logistics",
      plan: "6 Months",
      revenue: "₹4.8L",
      emissions: "48,765",
      users: 62,
      status: "Active",
      growth: "+15%"
    }
  ];

  // Recent Transactions
  const recentTransactions = [
    {
      id: "TXN-2847",
      customer: "TechCorp Global",
      amount: "₹23,988",
      plan: "1 Year",
      date: "2 hours ago",
      status: "Success",
      method: "UPI"
    },
    {
      id: "TXN-2846",
      customer: "GreenManufacturing Inc",
      amount: "₹14,994",
      plan: "6 Months",
      date: "5 hours ago",
      status: "Success",
      method: "Card"
    },
    {
      id: "TXN-2845",
      customer: "Urban Development Co",
      amount: "₹23,988",
      plan: "1 Year",
      date: "8 hours ago",
      status: "Failed",
      method: "Net Banking"
    },
    {
      id: "TXN-2844",
      customer: "CleanEnergy Partners",
      amount: "₹53,964",
      plan: "3 Years",
      date: "1 day ago",
      status: "Success",
      method: "UPI"
    },
    {
      id: "TXN-2843",
      customer: "EcoRetail Solutions",
      amount: "₹2,999",
      plan: "1 Month",
      date: "1 day ago",
      status: "Success",
      method: "Card"
    }
  ];

  // System Health Metrics
  const systemHealthData = [
    { time: "00:00", cpu: 45, memory: 62, requests: 1200 },
    { time: "04:00", cpu: 38, memory: 58, requests: 890 },
    { time: "08:00", cpu: 72, memory: 75, requests: 3400 },
    { time: "12:00", cpu: 85, memory: 82, requests: 4200 },
    { time: "16:00", cpu: 78, memory: 79, requests: 3800 },
    { time: "20:00", cpu: 65, memory: 71, requests: 2600 },
    { time: "24:00", cpu: 52, memory: 64, requests: 1800 }
  ];

  // Cash Flow Data (Monthly)
  const cashFlowData = [
    { month: "Jan", income: 45.2, expenses: 28.5, profit: 16.7 },
    { month: "Feb", income: 52.8, expenses: 31.2, profit: 21.6 },
    { month: "Mar", income: 48.5, expenses: 29.8, profit: 18.7 },
    { month: "Apr", income: 61.3, expenses: 35.4, profit: 25.9 },
    { month: "May", income: 55.7, expenses: 32.1, profit: 23.6 },
    { month: "Jun", income: 67.2, expenses: 38.9, profit: 28.3 },
    { month: "Jul", income: 72.8, expenses: 41.2, profit: 31.6 },
    { month: "Aug", income: 68.4, expenses: 39.7, profit: 28.7 },
    { month: "Sep", income: 78.9, expenses: 44.3, profit: 34.6 },
    { month: "Oct", income: 85.6, expenses: 48.2, profit: 37.4 },
    { month: "Nov", income: 92.3, expenses: 52.1, profit: 40.2 },
    { month: "Dec", income: 84.2, expenses: 47.5, profit: 36.7 }
  ];

  // Daily Cash Flow (Last 30 Days)
  const dailyCashFlowData = [
    { day: "Day 1", amount: 2.8, type: "in" },
    { day: "Day 2", amount: 3.2, type: "in" },
    { day: "Day 3", amount: 1.5, type: "out" },
    { day: "Day 4", amount: 4.1, type: "in" },
    { day: "Day 5", amount: 2.3, type: "out" },
    { day: "Day 6", amount: 3.7, type: "in" },
    { day: "Day 7", amount: 5.2, type: "in" },
    { day: "Day 8", amount: 2.9, type: "out" },
    { day: "Day 9", amount: 4.5, type: "in" },
    { day: "Day 10", amount: 3.8, type: "in" },
    { day: "Day 11", amount: 1.9, type: "out" },
    { day: "Day 12", amount: 4.8, type: "in" },
    { day: "Day 13", amount: 3.2, type: "in" },
    { day: "Day 14", amount: 2.6, type: "out" },
    { day: "Day 15", amount: 5.1, type: "in" },
    { day: "Day 16", amount: 4.3, type: "in" },
    { day: "Day 17", amount: 2.2, type: "out" },
    { day: "Day 18", amount: 3.9, type: "in" },
    { day: "Day 19", amount: 4.6, type: "in" },
    { day: "Day 20", amount: 3.1, type: "out" },
    { day: "Day 21", amount: 5.4, type: "in" },
    { day: "Day 22", amount: 3.7, type: "in" },
    { day: "Day 23", amount: 2.8, type: "out" },
    { day: "Day 24", amount: 4.9, type: "in" },
    { day: "Day 25", amount: 5.8, type: "in" },
    { day: "Day 26", amount: 3.4, type: "out" },
    { day: "Day 27", amount: 4.2, type: "in" },
    { day: "Day 28", amount: 3.5, type: "in" },
    { day: "Day 29", amount: 2.7, type: "out" },
    { day: "Day 30", amount: 6.1, type: "in" }
  ];

  // Cash Flow by Category
  const cashByCategoryData = [
    { category: "Subscriptions", amount: 72.5, color: "#10b981", percentage: 68 },
    { category: "Add-ons", amount: 18.3, color: "#3b82f6", percentage: 17 },
    { category: "Consulting", amount: 12.4, color: "#8b5cf6", percentage: 12 },
    { category: "Training", amount: 3.2, color: "#f59e0b", percentage: 3 }
  ];

  return (
    <div className="space-y-8">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-neutral-500" />
          <span className="text-sm font-bold text-neutral-700">Time Range:</span>
          <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl p-1">
            {["24h", "7d", "30d", "90d", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  timeRange === range
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* System Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          const isPositiveTrend = metric.trend === "up";
          const isGoodMetric = 
            metric.label.includes("Revenue") ||
            metric.label.includes("Customers") ||
            metric.label.includes("Users") ||
            metric.label.includes("Emissions") ||
            metric.label.includes("Uptime") ||
            (metric.label.includes("Response") && !isPositiveTrend) ||
            (metric.label.includes("Tickets") && !isPositiveTrend) ||
            (metric.label.includes("Churn") && !isPositiveTrend);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${metric.color}-50`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-black ${
                  isGoodMetric
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}>
                  {isPositiveTrend ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {metric.change}
                </div>
              </div>
              <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                {metric.label}
              </p>
              <p className="text-3xl font-black text-neutral-900 mb-1">{metric.value}</p>
              <p className="text-xs text-neutral-400 font-medium">{metric.subtitle}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Revenue Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-neutral-900">Revenue Trend</h3>
              <p className="text-xs text-neutral-500 font-bold mt-1">Monthly revenue vs target (₹ Lakhs)</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                <span className="text-neutral-600">Revenue</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-neutral-300 rounded-full"></div>
                <span className="text-neutral-600">Target</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" style={{ fontSize: "12px", fontWeight: "600" }} />
              <YAxis stroke="#999" style={{ fontSize: "12px", fontWeight: "600" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "2px solid #e5e5e5",
                  borderRadius: "12px",
                  fontWeight: "600"
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#colorRevenue)"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#d1d5db"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Customer Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-neutral-900">Customer Growth</h3>
              <p className="text-xs text-neutral-500 font-bold mt-1">New vs churned customers</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                <span className="text-neutral-600">New</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-neutral-600">Churned</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" style={{ fontSize: "12px", fontWeight: "600" }} />
              <YAxis stroke="#999" style={{ fontSize: "12px", fontWeight: "600" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "2px solid #e5e5e5",
                  borderRadius: "12px",
                  fontWeight: "600"
                }}
              />
              <Bar dataKey="new" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="churned" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Subscription & Emissions Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subscription Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-xl font-black text-neutral-900">Subscription Plans</h3>
            <p className="text-xs text-neutral-500 font-bold mt-1">Distribution by plan duration</p>
          </div>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #e5e5e5",
                    borderRadius: "12px",
                    fontWeight: "600"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {subscriptionData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-bold text-neutral-700">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-neutral-900">{item.value}</p>
                    <p className="text-xs text-neutral-500">
                      {((item.value / subscriptionData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Emissions by Scope */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-xl font-black text-neutral-900">Emissions Tracking</h3>
            <p className="text-xs text-neutral-500 font-bold mt-1">Total emissions by scope (tCO₂e)</p>
          </div>
          <div className="space-y-4">
            {emissionsData.map((scope, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-neutral-700">{scope.scope}</span>
                  <span className="text-sm font-black text-neutral-900">
                    {scope.value.toLocaleString()} ({scope.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${scope.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                    className={`h-full rounded-full ${
                      idx === 0 ? "bg-blue-500" : idx === 1 ? "bg-emerald-500" : "bg-purple-500"
                    }`}
                  ></motion.div>
                </div>
              </div>
            ))}
            <div className="mt-6 pt-6 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-neutral-700 uppercase tracking-widest">Total Emissions</span>
                <span className="text-2xl font-black text-neutral-900">
                  {(emissionsData.reduce((a, b) => a + b.value, 0) / 1000).toFixed(1)}K tCO₂e
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* System Health Monitor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-neutral-900">System Health</h3>
            <p className="text-xs text-neutral-500 font-bold mt-1">Real-time system performance metrics</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-neutral-600">CPU</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-neutral-600">Memory</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-neutral-600">Requests</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={systemHealthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#999" style={{ fontSize: "12px", fontWeight: "600" }} />
            <YAxis stroke="#999" style={{ fontSize: "12px", fontWeight: "600" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "2px solid #e5e5e5",
                borderRadius: "12px",
                fontWeight: "600"
              }}
            />
            <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="memory" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Cash Flow Analytics Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <IndianRupee className="w-8 h-8 text-emerald-600" />
          <div>
            <h2 className="text-2xl font-black text-neutral-900">Cash Flow Analytics</h2>
            <p className="text-sm text-neutral-500">Comprehensive financial overview and trends</p>
          </div>
        </div>

        {/* Cash Flow Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Monthly Cash Flow Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl border-2 border-emerald-200 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-neutral-900">Monthly Cash Flow</h3>
                <p className="text-xs text-neutral-500 font-bold mt-1">Income vs Expenses (₹ Lakhs)</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-neutral-600">Income</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-neutral-600">Expenses</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-neutral-600">Profit</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#666" style={{ fontSize: "11px", fontWeight: "700" }} />
                <YAxis stroke="#666" style={{ fontSize: "11px", fontWeight: "700" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #10b981",
                    borderRadius: "12px",
                    fontWeight: "700",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorIncome)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={3}
                  fill="url(#colorExpenses)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#colorProfit)"
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-emerald-200">
              <div className="text-center">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Total Income</p>
                <p className="text-2xl font-black text-emerald-600">₹{cashFlowData.reduce((sum, d) => sum + d.income, 0).toFixed(1)}L</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Total Expenses</p>
                <p className="text-2xl font-black text-red-600">₹{cashFlowData.reduce((sum, d) => sum + d.expenses, 0).toFixed(1)}L</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Net Profit</p>
                <p className="text-2xl font-black text-blue-600">₹{cashFlowData.reduce((sum, d) => sum + d.profit, 0).toFixed(1)}L</p>
              </div>
            </div>
          </motion.div>

          {/* Daily Cash Flow (Last 30 Days) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border-2 border-blue-200 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-neutral-900">Daily Cash Flow</h3>
                <p className="text-xs text-neutral-500 font-bold mt-1">Last 30 days (₹ Lakhs)</p>
              </div>
              <div className="bg-blue-100 px-4 py-2 rounded-xl">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Net: +₹89.2L</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dailyCashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#666" 
                  style={{ fontSize: "9px", fontWeight: "700" }}
                  interval={4}
                />
                <YAxis stroke="#666" style={{ fontSize: "11px", fontWeight: "700" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #3b82f6",
                    borderRadius: "12px",
                    fontWeight: "700",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                  formatter={(value: any, name: string, props: any) => [
                    `₹${value}L`,
                    props.payload.type === "in" ? "Cash In" : "Cash Out"
                  ]}
                />
                <Bar 
                  dataKey="amount" 
                  radius={[6, 6, 0, 0]}
                  fill="#3b82f6"
                >
                  {dailyCashFlowData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.type === "in" ? "#10b981" : "#ef4444"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-200">
              <div>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Cash In</p>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                  <p className="text-xl font-black text-emerald-600">
                    ₹{dailyCashFlowData.filter(d => d.type === "in").reduce((sum, d) => sum + d.amount, 0).toFixed(1)}L
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Cash Out</p>
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="w-5 h-5 text-red-600" />
                  <p className="text-xl font-black text-red-600">
                    ₹{dailyCashFlowData.filter(d => d.type === "out").reduce((sum, d) => sum + d.amount, 0).toFixed(1)}L
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cash Flow by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border-2 border-purple-200 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-neutral-900">Revenue by Category</h3>
              <p className="text-xs text-neutral-500 font-bold mt-1">Breakdown of income sources (₹ Lakhs)</p>
            </div>
            <div className="bg-purple-100 px-4 py-2 rounded-xl">
              <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                Total: ₹{cashByCategoryData.reduce((sum, d) => sum + d.amount, 0).toFixed(1)}L
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cashByCategoryData.map((category, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-neutral-200 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <DollarSign className="w-6 h-6" style={{ color: category.color }} />
                  </div>
                  <div 
                    className="px-3 py-1 rounded-lg text-xs font-black"
                    style={{ 
                      backgroundColor: `${category.color}20`,
                      color: category.color
                    }}
                  >
                    {category.percentage}%
                  </div>
                </div>
                
                <h4 className="text-sm font-bold text-neutral-600 mb-2">{category.category}</h4>
                <p className="text-3xl font-black text-neutral-900 mb-3">₹{category.amount}L</p>
                
                <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ duration: 1, delay: 0.8 + idx * 0.1 }}
                    className="h-full rounded-full"
                    style={{ 
                      backgroundColor: category.color,
                      boxShadow: `0 0 8px ${category.color}60`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Top Performing Customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl border border-neutral-200 shadow-sm"
        >
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-neutral-900">Top Customers</h3>
                <p className="text-xs text-neutral-500 font-bold mt-1">Highest revenue contributors</p>
              </div>
              <button className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {topCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-sm text-neutral-900">{customer.name}</p>
                        <p className="text-xs text-neutral-500">{customer.users} users</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-black bg-emerald-50 text-emerald-700">
                        {customer.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-neutral-900">{customer.revenue}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-emerald-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-black">{customer.growth}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl border border-neutral-200 shadow-sm"
        >
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-neutral-900">Recent Transactions</h3>
                <p className="text-xs text-neutral-500 font-bold mt-1">Latest payment activities</p>
              </div>
              <button className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-sm text-neutral-900">{transaction.customer}</p>
                        <p className="text-xs text-neutral-500">{transaction.id} • {transaction.date}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-neutral-900">{transaction.amount}</p>
                      <p className="text-xs text-neutral-500">{transaction.plan}</p>
                    </td>
                    <td className="px-6 py-4">
                      {transaction.status === "Success" ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-black text-emerald-600">Success</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span className="text-xs font-black text-red-600">Failed</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}