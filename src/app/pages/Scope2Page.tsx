import React from "react";
import { LayoutGrid, Zap, Building, Wind, Download, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { ScopeLayout } from "../components/ScopeLayout";
import { EmissionRecord } from "../components/EmissionTable";

const scope2Records: EmissionRecord[] = [
  { id: 201, year: 2024, month: "February", category: "Purchased Electricity", inputDate: "Feb 15, 2024", invoice: "ELEC-2024-201", activityData: "15,000 kWh", emissionFactor: "0.5 kg CO2e/kWh", emissions: "7.500 tCO2e" },
  { id: 202, year: 2024, month: "January", category: "Purchased Heat", inputDate: "Jan 15, 2024", invoice: "HEAT-2024-102", activityData: "8,000 kWh", emissionFactor: "0.3 kg CO2e/kWh", emissions: "2.400 tCO2e" },
  { id: 203, year: 2024, month: "February", category: "Purchased Cooling", inputDate: "Feb 18, 2024", invoice: "COOL-2024-50", activityData: "5,000 kWh", emissionFactor: "0.4 kg CO2e/kWh", emissions: "2.000 tCO2e" },
  { id: 204, year: 2024, month: "January", category: "Purchased Electricity", inputDate: "Jan 22, 2024", invoice: "ELEC-2024-180", activityData: "14,500 kWh", emissionFactor: "0.5 kg CO2e/kWh", emissions: "7.250 tCO2e" },
  { id: 205, year: 2023, month: "December", category: "Purchased Heat", inputDate: "Dec 10, 2023", invoice: "HEAT-2023-999", activityData: "9,000 kWh", emissionFactor: "0.3 kg CO2e/kWh", emissions: "2.700 tCO2e" },
];

export function Scope2Page() {
  const tabs = [
    { name: "All", icon: LayoutGrid },
    { name: "Electricity", icon: Zap },
    { name: "Steam", icon: Wind },
    { name: "Heating & Cooling", icon: Building },
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
            Scope 2
          </motion.h2>
          <p className="text-neutral-400 font-black uppercase tracking-[0.25em] mt-2 md:mt-3 text-[9px] md:text-[10px]">
            Carbon Resource Management
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <button className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-white border border-neutral-100 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:shadow-xl hover:shadow-neutral-100 transition-all flex-1 sm:flex-none justify-center">
            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" />
            PERIOD: FEB 2026
          </button>
          <button className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 transform active:scale-95 flex-1 sm:flex-none justify-center">
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Export
          </button>
        </div>
      </div>

      <ScopeLayout 
        title="Scope 2 Indirect Emissions"
        subtitle="Energy Indirect Emissions"
        scopeId="S2"
        scopeType="Scope 2"
        records={scope2Records}
        tabs={tabs}
        themeColor="blue"
        headerBg="bg-[#1e40af]"
        accentText="text-blue-700"
        totalEmissions="21.850"
        totalRecords={12}
      />
    </>
  );
}