import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  DollarSign,
  Activity,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  Globe,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";

export function SuperAdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30days");
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Mock analytics data
  const overviewMetrics = [
    {
      label: "Total Revenue",
      value: "$247,890",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "emerald",
      details: "vs. last month",
    },
    {
      label: "New Customers",
      value: "847",
      change: "+12.5%",
      trend: "up",
      icon: Building2,
      color: "blue",
      details: "vs. last month",
    },
    {
      label: "Active Users",
      value: "18,234",
      change: "+8.3%",
      trend: "up",
      icon: Users,
      color: "purple",
      details: "vs. last month",
    },
    {
      label: "Churn Rate",
      value: "2.4%",
      change: "-0.8%",
      trend: "down",
      icon: TrendingDown,
      color: "red",
      details: "vs. last month",
    },
  ];

  const revenueByPlan = [
    { plan: "Enterprise", revenue: "$144,000", percentage: 58, customers: 60, color: "purple" },
    { plan: "Professional", revenue: "$78,000", percentage: 31, customers: 130, color: "blue" },
    { plan: "Starter", revenue: "$25,890", percentage: 11, customers: 657, color: "neutral" },
  ];

  const topCustomers = [
    { name: "TechCorp Global", revenue: "$24,000", plan: "Enterprise", growth: "+15%" },
    { name: "CleanEnergy Partners", revenue: "$24,000", plan: "Enterprise", growth: "+12%" },
    { name: "Global Shipping Ltd", revenue: "$24,000", plan: "Enterprise", growth: "+18%" },
    { name: "GreenManufacturing Inc", revenue: "$6,000", plan: "Professional", growth: "+8%" },
    { name: "FoodService Group", revenue: "$6,000", plan: "Professional", growth: "+5%" },
  ];

  const regionData = [
    { region: "North America", customers: 1247, revenue: "$112,340", percentage: 45 },
    { region: "Europe", customers: 856, revenue: "$78,920", percentage: 32 },
    { region: "Asia Pacific", customers: 543, revenue: "$42,130", percentage: 17 },
    { region: "Others", customers: 201, revenue: "$14,500", percentage: 6 },
  ];

  const monthlyData = [
    { month: "Jan", revenue: 185000, customers: 2543, users: 16234 },
    { month: "Feb", revenue: 198000, customers: 2678, users: 17012 },
    { month: "Mar", revenue: 210000, customers: 2847, users: 18234 },
  ];

  const activityMetrics = [
    { label: "Avg. Session Duration", value: "24m 32s", change: "+5.2%", icon: Clock },
    { label: "Daily Active Users", value: "12,456", change: "+8.7%", icon: Activity },
    { label: "Feature Adoption", value: "78%", change: "+12.3%", icon: Target },
    { label: "System Uptime", value: "99.9%", change: "+0.1%", icon: Zap },
  ];

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-sm font-bold text-neutral-900 focus:outline-none focus:border-emerald-500 transition-all"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="12months">Last 12 Months</option>
              <option value="ytd">Year to Date</option>
            </select>

            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-sm font-bold text-neutral-900 focus:outline-none focus:border-emerald-500 transition-all"
            >
              <option value="all">All Metrics</option>
              <option value="revenue">Revenue</option>
              <option value="customers">Customers</option>
              <option value="users">Users</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-3 border-2 border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-xl text-sm font-black transition-all">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-black transition-all shadow-lg shadow-emerald-200">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border-2 border-neutral-100 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${metric.color}-50`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
                <div className="flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                  )}
                  <span className="text-xs font-black text-emerald-600">
                    {metric.change}
                  </span>
                </div>
              </div>
              <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                {metric.label}
              </p>
              <p className="text-3xl font-black text-neutral-900 mb-1">{metric.value}</p>
              <p className="text-xs text-neutral-500 font-medium">{metric.details}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Breakdown */}
        <div className="xl:col-span-2 bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-neutral-900">Revenue Breakdown by Plan</h3>
              <p className="text-sm text-neutral-500 font-bold mt-1">Total: $247,890</p>
            </div>
            <PieChart className="w-6 h-6 text-neutral-400" />
          </div>

          <div className="space-y-4">
            {revenueByPlan.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-${item.color}-600`}></div>
                    <span className="font-black text-neutral-900">{item.plan}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-500 font-bold">
                      {item.customers} customers
                    </span>
                    <span className="font-black text-neutral-900">{item.revenue}</span>
                  </div>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-3">
                  <div
                    className={`bg-${item.color}-600 h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Metrics */}
        <div className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-neutral-900">Activity Metrics</h3>
              <p className="text-sm text-neutral-500 font-bold mt-1">Real-time insights</p>
            </div>
            <Activity className="w-6 h-6 text-neutral-400" />
          </div>

          <div className="space-y-4">
            {activityMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100 hover:border-emerald-200 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-emerald-100">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">
                      {metric.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black text-neutral-900">{metric.value}</p>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      {metric.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-neutral-900">Monthly Trends</h3>
            <p className="text-sm text-neutral-500 font-bold mt-1">Q1 2026 Performance</p>
          </div>
          <LineChart className="w-6 h-6 text-neutral-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b-2 border-neutral-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Month
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Revenue
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Growth
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Customers
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Active Users
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {monthlyData.map((data, idx) => {
                const growth = idx > 0 ? (((data.revenue - monthlyData[idx - 1].revenue) / monthlyData[idx - 1].revenue) * 100).toFixed(1) : "0";
                return (
                  <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-black text-neutral-900">{data.month} 2026</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-neutral-900">
                        ${(data.revenue / 1000).toFixed(0)}K
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black ${
                        parseFloat(growth) >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                      }`}>
                        {parseFloat(growth) >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {growth}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-neutral-900">{data.customers.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-neutral-900">{data.users.toLocaleString()}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-neutral-900">Top Customers by Revenue</h3>
              <p className="text-sm text-neutral-500 font-bold mt-1">Highest contributors</p>
            </div>
            <Building2 className="w-6 h-6 text-neutral-400" />
          </div>

          <div className="space-y-3">
            {topCustomers.map((customer, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100 hover:border-emerald-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-black">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-black text-neutral-900">{customer.name}</p>
                    <p className="text-xs text-neutral-500 font-bold">{customer.plan}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-neutral-900">{customer.revenue}</p>
                  <p className="text-xs text-emerald-600 font-bold">{customer.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-neutral-900">Regional Distribution</h3>
              <p className="text-sm text-neutral-500 font-bold mt-1">Customer breakdown</p>
            </div>
            <Globe className="w-6 h-6 text-neutral-400" />
          </div>

          <div className="space-y-4">
            {regionData.map((region, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-neutral-900">{region.region}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-neutral-500 font-bold">
                      {region.customers} customers
                    </span>
                    <span className="font-black text-neutral-900">{region.revenue}</span>
                  </div>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-2xl text-white shadow-xl">
          <BarChart3 className="w-8 h-8 mb-4 opacity-80" />
          <h3 className="text-xl font-black mb-2">Custom Reports</h3>
          <p className="text-emerald-100 text-sm mb-4 font-bold">
            Create detailed analytics reports
          </p>
          <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-all">
            Create Report
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-xl">
          <Calendar className="w-8 h-8 mb-4 opacity-80" />
          <h3 className="text-xl font-black mb-2">Schedule Reports</h3>
          <p className="text-blue-100 text-sm mb-4 font-bold">
            Automated report delivery
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all">
            Set Schedule
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-2xl text-white shadow-xl">
          <Target className="w-8 h-8 mb-4 opacity-80" />
          <h3 className="text-xl font-black mb-2">Set Goals</h3>
          <p className="text-purple-100 text-sm mb-4 font-bold">
            Define and track KPI targets
          </p>
          <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold text-sm hover:bg-purple-50 transition-all">
            Manage Goals
          </button>
        </div>
      </div>
    </div>
  );
}
