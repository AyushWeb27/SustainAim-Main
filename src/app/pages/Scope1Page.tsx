import React from "react";
import { LayoutGrid, Fuel, Wind, Factory, Download, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { ScopeLayout } from "../components/ScopeLayout";
import { EmissionRecord } from "../components/EmissionTable";

const scope1Records: EmissionRecord[] = [
  { id: 101, year: 2024, month: "February", category: "Stationary Combustion", inputDate: "Feb 15, 2024", invoice: "GAS-2024-101", activityData: "5,000 m3", emissionFactor: "2.1 kg CO2e/m3", emissions: "10.500 tCO2e" },
  { id: 102, year: 2024, month: "January", category: "Mobile Combustion", inputDate: "Jan 15, 2024", invoice: "FUEL-2024-055", activityData: "1,200 L", emissionFactor: "2.3 kg CO2e/L", emissions: "2.760 tCO2e" },
  { id: 103, year: 2024, month: "February", category: "Fugitive Emissions", inputDate: "Feb 18, 2024", invoice: "REFR-2024-12", activityData: "50 Kg", emissionFactor: "1430 kg CO2e/kg", emissions: "71.500 tCO2e" },
  { id: 104, year: 2024, month: "January", category: "Process Emissions", inputDate: "Jan 22, 2024", invoice: "CHEM-2024-08", activityData: "2,500 Kg", emissionFactor: "0.8 kg CO2e/kg", emissions: "2.000 tCO2e" },
  { id: 105, year: 2023, month: "December", category: "Stationary Combustion", inputDate: "Dec 10, 2023", invoice: "GAS-2023-999", activityData: "4,800 m3", emissionFactor: "2.1 kg CO2e/m3", emissions: "10.080 tCO2e" },
];

export function Scope1Page() {
  const tabs = [
    { name: "All", icon: LayoutGrid },
    { name: "Fossil Fuel", icon: Fuel },
    { name: "Fugitives", icon: Wind },
    { name: "Process Emission", icon: Factory },
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
            Scope 1
          </motion.h2>
          <p className="text-neutral-400 font-black uppercase tracking-[0.25em] mt-2 md:mt-3 text-[9px] md:text-[10px]">
            Carbon Resource Management
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <button className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-white border border-neutral-100 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:shadow-xl hover:shadow-neutral-100 transition-all flex-1 sm:flex-none justify-center">
            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
            PERIOD: FEB 2026
          </button>
          <button className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-emerald-600 text-white rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 transform active:scale-95 flex-1 sm:flex-none justify-center">
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Export
          </button>
        </div>
      </div>

      <ScopeLayout 
        title="Scope 1 Direct Emissions"
        subtitle="Direct Emissions Inventory"
        scopeId="S1"
        scopeType="Scope 1"
        records={scope1Records}
        tabs={tabs}
        themeColor="emerald"
        headerBg="bg-[#2d6a4f]"
        accentText="text-emerald-700"
        totalEmissions="96.840"
        totalRecords={18}
      />
    </>
  );
}