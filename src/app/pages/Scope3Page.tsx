import React from "react";
import { LayoutGrid, Truck, Plane, Users, Package, Download, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { ScopeLayout } from "../components/ScopeLayout";
import { EmissionRecord } from "../components/EmissionTable";

const scope3Records: EmissionRecord[] = [
  { id: 301, year: 2024, month: "February", category: "Business Travel", inputDate: "Feb 15, 2024", invoice: "TRAVEL-2024-301", activityData: "2,500 km", emissionFactor: "0.12 kg CO2e/km", emissions: "0.300 tCO2e" },
  { id: 302, year: 2024, month: "January", category: "Employee Commuting", inputDate: "Jan 15, 2024", invoice: "COMM-2024-105", activityData: "15,000 km", emissionFactor: "0.15 kg CO2e/km", emissions: "2.250 tCO2e" },
  { id: 303, year: 2024, month: "February", category: "Upstream Transportation", inputDate: "Feb 18, 2024", invoice: "FREIGHT-2024-75", activityData: "5,000 tkm", emissionFactor: "0.08 kg CO2e/tkm", emissions: "0.400 tCO2e" },
  { id: 304, year: 2024, month: "January", category: "Purchased Goods", inputDate: "Jan 22, 2024", invoice: "GOODS-2024-150", activityData: "10,000 kg", emissionFactor: "1.2 kg CO2e/kg", emissions: "12.000 tCO2e" },
  { id: 305, year: 2023, month: "December", category: "Business Travel", inputDate: "Dec 10, 2023", invoice: "TRAVEL-2023-999", activityData: "3,200 km", emissionFactor: "0.12 kg CO2e/km", emissions: "0.384 tCO2e" },
];

export function Scope3Page() {
  const tabs = [
    { name: "All", icon: LayoutGrid },
    { name: "Goods & Services", icon: Package },
    { name: "Transportation & Distribution", icon: Truck },
    { name: "Waste", icon: Package },
    { name: "Business Travel", icon: Plane },
    { name: "Employee Commuting", icon: Users },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 px-2 md:px-4">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tighter"
          >
            Scope 3
          </motion.h2>
          <p className="text-neutral-400 font-black uppercase tracking-[0.25em] mt-2 md:mt-3 text-[9px] md:text-[10px]">
            Carbon Resource Management
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <button className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-white border border-neutral-100 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:shadow-xl hover:shadow-neutral-100 transition-all flex-1 sm:flex-none justify-center">
            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-500" />
            PERIOD: FEB 2026
          </button>
          <button className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-indigo-600 text-white rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 transform active:scale-95 flex-1 sm:flex-none justify-center">
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Export
          </button>
        </div>
      </div>

      <ScopeLayout 
        title="Scope 3 Value Chain Emissions"
        subtitle="Value Chain Emissions"
        scopeId="S3"
        scopeType="Scope 3"
        records={scope3Records}
        tabs={tabs}
        themeColor="indigo"
        headerBg="bg-[#4338ca]"
        accentText="text-indigo-700"
        totalEmissions="15.334"
        totalRecords={25}
      />
    </>
  );
}