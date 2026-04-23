import React from "react";
import { motion } from "motion/react";

interface ESGGaugeProps {
  score: number;
  label: string;
}

export function ESGGauge({ score, label }: ESGGaugeProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-xl shadow-neutral-100/30 flex flex-col items-center justify-center relative group overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-1000" />
      
      <div className="relative z-10 text-center mb-6">
        <h3 className="text-xl font-black text-neutral-900 tracking-tight">{label}</h3>
        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Live Quality Index</p>
      </div>

      <div className="relative flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-neutral-50"
          />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-black text-neutral-900 tracking-tighter"
          >
            {score}
          </motion.span>
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full mt-1">Excellent</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 w-full gap-4">
        <div className="bg-neutral-50 p-4 rounded-2xl text-center">
          <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Target</p>
          <p className="text-lg font-black text-neutral-900">95%</p>
        </div>
        <div className="bg-neutral-50 p-4 rounded-2xl text-center">
          <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Gap</p>
          <p className="text-lg font-black text-rose-500">-7%</p>
        </div>
      </div>
    </div>
  );
}
