import React from "react";
import { useNavigate } from "react-router";
import {
  Zap,
  Droplets,
  Wind,
  CloudRain,
  Download,
  Calendar,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Target
} from "lucide-react";
import { motion } from "motion/react";
import { StatCard } from "../components/StatCard";
import { SustainabilityCharts } from "../components/SustainabilityCharts";
import { GHGEmissionsScopeChart } from "../components/GHGEmissionsScopeChart";
import { WasteGenerationChart } from "../components/WasteGenerationChart";
import { ImpactTable } from "../components/ImpactTable";
import { ESGGauge } from "../components/ESGGauge";

export function DashboardOverview() {
  return (
    <div className="space-y-10">
      {/* Unique Welcome & Quick Stats Section */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Hero Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="xl:col-span-3 bg-neutral-900 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-neutral-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-12"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 bg-white/5 w-fit px-4 md:px-5 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" />
              <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase text-white/80">Premium Intelligence Active</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4 md:mb-6">
              Sustainability <br /> Command <span className="text-emerald-500 italic font-medium">Center</span>
            </h1>
            <p className="text-neutral-400 font-bold text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
              Your organization is currently performing at <span className="text-white font-black">88.4% efficiency</span> across all three emissions scopes. You've offset <span className="text-emerald-400 font-black">12.5 tons</span> of CO2 this month.
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-5">
              <button className="px-8 md:px-10 py-4 md:py-5 bg-emerald-500 text-neutral-900 rounded-xl md:rounded-[2rem] font-black text-xs md:text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-2 md:gap-3 group">
                Review ESG Goals
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 md:px-10 py-4 md:py-5 bg-white/5 text-white border border-white/10 rounded-xl md:rounded-[2rem] font-black text-xs md:text-sm hover:bg-white/10 transition-all backdrop-blur-md">
                Generate Audit
              </button>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 md:gap-6 w-full md:w-auto shrink-0">
            <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-[1.75rem] md:rounded-[2.5rem] border border-white/10 text-center flex flex-col items-center gap-2 md:gap-3 min-w-[140px] md:min-w-[160px]">
              <div className="p-2.5 md:p-3 bg-emerald-500/20 rounded-xl md:rounded-2xl">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-neutral-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1">Impact Score</p>
                <p className="text-3xl md:text-4xl font-black">A+</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-[1.75rem] md:rounded-[2.5rem] border border-white/10 text-center flex flex-col items-center gap-2 md:gap-3 min-w-[140px] md:min-w-[160px]">
              <div className="p-2.5 md:p-3 bg-blue-500/20 rounded-xl md:rounded-2xl">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-neutral-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1">Compliance</p>
                <p className="text-3xl md:text-4xl font-black">100%</p>
              </div>
            </div>
          </div>

          {/* Abstract background design */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[120px] opacity-10 -mr-40 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600 rounded-full blur-[100px] opacity-5 -ml-20 -mb-20 pointer-events-none" />
        </motion.div>

        {/* Unique Circular Progress Widget */}
        <ESGGauge score={88} label="Carbon Efficiency" />
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          title="Total Energy Saved" 
          value="2,450" 
          subtitle="MWh"
          change="+12.5%" 
          isPositive={true}
          icon={Zap}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-500"
        />
        <StatCard 
          title="Carbon Offsets" 
          value="842.0" 
          subtitle="t"
          change="+5.2%" 
          isPositive={true}
          icon={Wind}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-500"
        />
        <StatCard 
          title="Water Conservation" 
          value="12,300" 
          subtitle="L"
          change="-2.1%" 
          isPositive={false}
          icon={Droplets}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatCard 
          title="Active Projects" 
          value="28" 
          subtitle="Total"
          change="+4" 
          isPositive={true}
          icon={CloudRain}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-500"
        />
      </div>

      {/* Analytics & Insights Section */}
      <div className="space-y-10">
        <GHGEmissionsScopeChart />
        <WasteGenerationChart />
        <SustainabilityCharts />

        {/* Sustainability Ledger */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div>
              <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Sustainability Ledger</h3>
              <p className="text-xs text-neutral-400 font-black uppercase tracking-widest mt-1">Cross-scope activity monitoring</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-neutral-50 hover:bg-neutral-100 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
              Export Data <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <ImpactTable />
        </div>
      </div>
    </div>
  );
}