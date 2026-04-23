import React from "react";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  subtitle?: string;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon: Icon, 
  iconBgColor, 
  iconColor,
  subtitle
}: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Decorative background circle */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700 ${iconBgColor}`} />
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className={`p-4 rounded-2xl ${iconBgColor} shadow-inner`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black tracking-tight ${
          isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        }`}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {change}
        </div>
      </div>
      
      <div className="relative z-10">
        <p className="text-neutral-400 text-xs font-black uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-3xl font-black text-neutral-900 tracking-tight">{value}</h3>
          {subtitle && <span className="text-xs font-bold text-neutral-400">{subtitle}</span>}
        </div>
      </div>
    </motion.div>
  );
}
