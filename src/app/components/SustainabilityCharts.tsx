import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Filter, Calendar, Info } from "lucide-react";
import { motion } from "motion/react";

const performanceData = [
  { month: "Jan", co2: 450, energy: 320 },
  { month: "Feb", co2: 420, energy: 310 },
  { month: "Mar", co2: 480, energy: 340 },
  { month: "Apr", co2: 400, energy: 290 },
  { month: "May", co2: 380, energy: 270 },
  { month: "Jun", co2: 350, energy: 250 },
  { month: "Jul", co2: 320, energy: 230 },
];

const categoryData = [
  { name: "Waste Management", value: 85, color: "#10b981" },
  { name: "Energy Usage", value: 62, color: "#3b82f6" },
  { name: "Supply Chain", value: 45, color: "#f59e0b" },
  { name: "Water Usage", value: 78, color: "#6366f1" },
];

const scopeData = [
  { name: "Scope 1", value: 400, fill: "#10b981" },
  { name: "Scope 2", value: 300, fill: "#3b82f6" },
  { name: "Scope 3", value: 500, fill: "#6366f1" },
];

export function SustainabilityCharts() {
  return (
    <div className="space-y-6 md:space-y-10">
      {/* Top Row: Main Trend + Scope Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border border-neutral-100 shadow-xl shadow-neutral-100/30"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-1">
                <h3 className="text-lg md:text-2xl font-black text-neutral-900 tracking-tight">Environmental Performance</h3>
                <Info className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-300 cursor-help" />
              </div>
              <p className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Carbon & Energy Analytics</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 bg-neutral-50 p-1.5 rounded-[1.5rem] border border-neutral-100">
              <button className="px-4 md:px-5 py-2 md:py-2.5 bg-white shadow-sm rounded-xl text-[9px] md:text-[10px] font-black text-neutral-900 tracking-widest uppercase transition-all">
                MONTHLY
              </button>
              <button className="px-4 md:px-5 py-2 md:py-2.5 text-[9px] md:text-[10px] font-black text-neutral-400 tracking-widest uppercase hover:text-neutral-600 transition-all">
                YEARLY
              </button>
            </div>
          </div>
          
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="12 12" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#a3a3a3", fontSize: 10, fontWeight: 900 }}
                  dy={20}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#a3a3a3", fontSize: 10, fontWeight: 900 }}
                />
                <Tooltip 
                  cursor={{ stroke: '#f0f0f0', strokeWidth: 2 }}
                  contentStyle={{ 
                    borderRadius: "24px", 
                    border: "1px solid #f0f0f0", 
                    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.1)",
                    padding: "20px",
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="co2" 
                  stroke="#10b981" 
                  strokeWidth={5}
                  fillOpacity={1} 
                  fill="url(#colorCo2)" 
                  name="CO2 Impact"
                  activeDot={{ r: 8, strokeWidth: 4, stroke: "#fff", fill: "#10b981" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#3b82f6" 
                  strokeWidth={5}
                  fillOpacity={1} 
                  fill="url(#colorEnergy)" 
                  name="Energy Savings"
                  activeDot={{ r: 8, strokeWidth: 4, stroke: "#fff", fill: "#3b82f6" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right Section: Scope Shares */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] text-white shadow-2xl shadow-neutral-900/50 flex flex-col relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center w-full mb-6">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Live Tracking</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2">Scope Contribution</h3>
              <p className="text-[10px] md:text-[11px] font-bold text-white/40 uppercase tracking-wider">Emission Distribution Analysis</p>
            </div>
            
            {/* Pie Chart */}
            <div className="w-full h-[280px] relative flex flex-col items-center mb-6">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={scopeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {scopeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} cornerRadius={15} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                      border: 'none', 
                      borderRadius: '12px',
                      padding: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-5xl md:text-6xl font-black mb-1">1,240</span>
                <span className="text-[10px] md:text-[11px] font-black text-white/30 uppercase tracking-widest">Total tCO2e</span>
              </div>
            </div>

            {/* Legend Cards */}
            <div className="grid grid-cols-1 w-full gap-3">
              {scopeData.map((item) => {
                const percentage = Math.round((item.value / 1200) * 100);
                return (
                  <div 
                    key={item.name} 
                    className="group relative bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" 
                          style={{ 
                            backgroundColor: `${item.fill}20`,
                            boxShadow: `0 0 20px ${item.fill}40`
                          }}
                        >
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: item.fill }}
                          />
                        </div>
                        <div>
                          <span className="text-sm font-black text-white block">{item.name}</span>
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Emissions</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-white">{percentage}%</div>
                        <div className="text-xs font-bold text-white/40">{item.value} tCO2e</div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ 
                          backgroundColor: item.fill,
                          boxShadow: `0 0 10px ${item.fill}`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Stats */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Avg/Scope</p>
                  <p className="text-2xl font-black text-white">413</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">This Month</p>
                  <p className="text-2xl font-black text-emerald-400">-8.2%</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section: Compliance Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-neutral-100 shadow-xl shadow-neutral-100/20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-4 md:gap-6">
          <div>
            <h3 className="text-lg md:text-2xl font-black tracking-tight text-neutral-900">Efficiency Benchmarks</h3>
            <p className="text-[9px] md:text-[10px] font-black text-neutral-400 tracking-[0.2em] uppercase mt-2">Compliance category breakdown</p>
          </div>
          <button className="px-6 md:px-8 py-3 md:py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black tracking-widest uppercase transition-all shadow-xl shadow-emerald-200 w-full sm:w-auto">
            VIEW STRATEGY MAP
          </button>
        </div>
        
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData} layout="vertical" margin={{ left: 0, right: 30, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="10 10" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: "#171717", fontSize: 10, fontWeight: 900 }}
                width={160}
              />
              <Tooltip 
                cursor={{ fill: "transparent" }} 
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" radius={[0, 20, 20, 0]} barSize={32}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}