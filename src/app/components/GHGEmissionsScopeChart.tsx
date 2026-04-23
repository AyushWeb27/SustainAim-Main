import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { motion } from "motion/react";
import { Factory, Zap, Building2, TrendingDown } from "lucide-react";

const scopeData = [
  { 
    name: "Scope 1", 
    value: 1245, 
    percentage: 22,
    color: "#10B981",
    description: "Direct Emissions",
    icon: Factory,
    trend: "-5.2%"
  },
  { 
    name: "Scope 2", 
    value: 892, 
    percentage: 16,
    color: "#3B82F6",
    description: "Energy Indirect",
    icon: Zap,
    trend: "-8.4%"
  },
  { 
    name: "Scope 3", 
    value: 3567, 
    percentage: 62,
    color: "#8B5CF6",
    description: "Other Indirect",
    icon: Building2,
    trend: "-3.1%"
  },
];

const totalEmissions = scopeData.reduce((sum, item) => sum + item.value, 0);

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="font-black text-sm"
    >
      {`${percentage}%`}
    </text>
  );
};

export function GHGEmissionsScopeChart() {
  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-neutral-100 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight mb-2">
            GHG Emissions by Scope
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Breakdown of greenhouse gas emissions across all three scopes
          </p>
        </div>
        <div className="flex items-center gap-3 bg-neutral-900 px-6 py-4 rounded-2xl">
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Emissions</p>
            <p className="text-2xl font-black text-white">{totalEmissions.toLocaleString()} <span className="text-sm font-bold text-neutral-400">tCO₂e</span></p>
          </div>
        </div>
      </div>

      {/* Chart and Stats Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center h-[420px]"
        >
          <ResponsiveContainer width="100%" height={420}>
            <PieChart>
              <defs>
                {scopeData.map((entry) => (
                  <linearGradient key={entry.name} id={`gradient-${entry.name.replace(' ', '-')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.8} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={scopeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={160}
                innerRadius={90}
                paddingAngle={4}
                dataKey="percentage"
                animationBegin={0}
                animationDuration={1000}
              >
                {scopeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#gradient-${entry.name.replace(' ', '-')})`}
                    style={{
                      filter: `drop-shadow(0 4px 12px ${entry.color}40)`,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  borderRadius: "16px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  padding: "12px 16px",
                  backgroundColor: "white",
                }}
                itemStyle={{ color: "#1F2937", fontWeight: 700 }}
                formatter={(value: any, name: string, props: any) => [
                  `${props.payload.value.toLocaleString()} tCO₂e (${value}%)`,
                  props.payload.name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Statistics Cards */}
        <div className="space-y-4">
          {scopeData.map((scope, index) => {
            const Icon = scope.icon;
            return (
              <motion.div
                key={scope.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-6 border border-neutral-100 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${scope.color}20`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: scope.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-neutral-900 mb-1">{scope.name}</h3>
                      <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
                        {scope.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black mb-1" style={{ color: scope.color }}>
                      {scope.percentage}%
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-100 px-2 py-1 rounded-lg">
                      <TrendingDown className="w-3 h-3 text-emerald-700" />
                      <span className="text-xs font-black text-emerald-700">{scope.trend}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-500">Emissions Volume</span>
                    <span className="font-black text-neutral-900">{scope.value.toLocaleString()} tCO₂e</span>
                  </div>
                  <div className="relative w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        backgroundColor: scope.color,
                        boxShadow: `0 0 12px ${scope.color}60`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${scope.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Total Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white mt-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-100 uppercase tracking-wider mb-2">
                  Total GHG Emissions
                </p>
                <p className="text-3xl font-black mb-1">{totalEmissions.toLocaleString()} tCO₂e</p>
                <p className="text-sm text-emerald-100">Current reporting period</p>
              </div>
              <div className="text-right bg-white/10 px-4 py-3 rounded-xl backdrop-blur-sm">
                <p className="text-xs font-bold text-emerald-100 mb-1">vs Last Period</p>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-emerald-200" />
                  <p className="text-2xl font-black text-white">-5.6%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-10 border-t border-neutral-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 mb-3">
            <Factory className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
            Largest Source
          </p>
          <p className="text-xl font-black text-neutral-900">Scope 3</p>
          <p className="text-sm text-neutral-500">62% of total emissions</p>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-3">
            <TrendingDown className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
            Best Improvement
          </p>
          <p className="text-xl font-black text-blue-600">Scope 2</p>
          <p className="text-sm text-neutral-500">-8.4% reduction achieved</p>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 mb-3">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
            Target for 2026
          </p>
          <p className="text-xl font-black text-purple-600">4,800 tCO₂e</p>
          <p className="text-sm text-neutral-500">15% reduction goal</p>
        </div>
      </div>
    </div>
  );
}
