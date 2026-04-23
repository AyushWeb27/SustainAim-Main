import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "motion/react";
import { Trash2, TrendingDown } from "lucide-react";

const wasteData = [
  { type: "Plastic", amount: 450, color: "#3B82F6", change: "+5%" },
  { type: "Paper", amount: 320, color: "#10B981", change: "-8%" },
  { type: "Metal", amount: 180, color: "#F59E0B", change: "+2%" },
  { type: "Glass", amount: 240, color: "#8B5CF6", change: "-12%" },
  { type: "Organic", amount: 580, color: "#EC4899", change: "-5%" },
  { type: "E-Waste", amount: 95, color: "#EF4444", change: "+15%" },
];

export function WasteGenerationChart() {
  const totalWaste = wasteData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-neutral-100 shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight mb-2">
            Waste Generation by Type
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Monthly breakdown of waste categories and trends
          </p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100">
          <TrendingDown className="w-5 h-5 text-emerald-600" />
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Total</p>
            <p className="text-xl font-black text-emerald-900">{totalWaste} kg</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-8 h-[350px]">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={wasteData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <defs>
              {wasteData.map((entry) => (
                <linearGradient key={entry.type} id={`gradient-${entry.type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="type"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 700 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 700 }}
              label={{ value: "Weight (kg)", angle: -90, position: "insideLeft", style: { fontSize: 12, fontWeight: 700, fill: "#6B7280" } }}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)", radius: 8 }}
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                padding: "12px 16px",
              }}
              itemStyle={{ color: "#1F2937", fontWeight: 700, fontSize: 13 }}
            />
            <Bar dataKey="amount" radius={[12, 12, 0, 0]} barSize={60}>
              {wasteData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#gradient-${entry.type})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Waste Type Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wasteData.map((waste, index) => (
          <motion.div
            key={waste.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${waste.color}20` }}
                >
                  <Trash2 className="w-5 h-5" style={{ color: waste.color }} />
                </div>
                <div>
                  <h4 className="font-black text-sm text-neutral-900">{waste.type}</h4>
                  <p className="text-xs text-neutral-500">Monthly total</p>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-black text-neutral-900 mb-1">{waste.amount}</p>
                <p className="text-xs font-bold text-neutral-500">kilograms</p>
              </div>
              <div
                className={`px-3 py-1.5 rounded-lg text-xs font-black ${
                  waste.change.startsWith("-")
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {waste.change}
              </div>
            </div>

            {/* Progress bar showing proportion of total */}
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  % of Total
                </span>
                <span className="text-xs font-black text-neutral-900">
                  {Math.round((waste.amount / totalWaste) * 100)}%
                </span>
              </div>
              <div className="relative w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ backgroundColor: waste.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(waste.amount / totalWaste) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-neutral-100">
        <div className="text-center md:text-left">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Most Generated
          </p>
          <p className="text-xl font-black text-neutral-900">Organic Waste</p>
          <p className="text-sm text-neutral-500">580 kg this month</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Best Reduction
          </p>
          <p className="text-xl font-black text-emerald-600">Glass (-12%)</p>
          <p className="text-sm text-neutral-500">240 kg this month</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Needs Attention
          </p>
          <p className="text-xl font-black text-red-600">E-Waste (+15%)</p>
          <p className="text-sm text-neutral-500">95 kg this month</p>
        </div>
      </div>
    </div>
  );
}
