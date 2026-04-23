import React from "react";
import { LayoutGrid, Fuel, Wind, Factory } from "lucide-react";
import { ScopeLayout } from "./ScopeLayout";
import { EmissionRecord } from "./EmissionTable";

const scope1Records: EmissionRecord[] = [
  { id: 101, branch: "Mumbai Headquarters", year: 2024, month: "February", category: "Stationary Combustion", inputDate: "Feb 15, 2024", invoice: "GAS-2024-101", activityData: "5,000 m3", emissionFactor: "2.1 kg CO2e/m3", emissions: "10.500 tCO2e" },
  { id: 102, branch: "Bangalore Tech Center", year: 2024, month: "January", category: "Mobile Combustion", inputDate: "Jan 15, 2024", invoice: "FUEL-2024-055", activityData: "1,200 L", emissionFactor: "2.3 kg CO2e/L", emissions: "2.760 tCO2e" },
  { id: 103, branch: "Delhi Manufacturing Plant", year: 2024, month: "February", category: "Fugitive Emissions", inputDate: "Feb 18, 2024", invoice: "REFR-2024-12", activityData: "50 Kg", emissionFactor: "1430 kg CO2e/kg", emissions: "71.500 tCO2e" },
  { id: 104, branch: "Mumbai Headquarters", year: 2024, month: "January", category: "Process Emissions", inputDate: "Jan 22, 2024", invoice: "CHEM-2024-08", activityData: "2,500 Kg", emissionFactor: "0.8 kg CO2e/kg", emissions: "2.000 tCO2e" },
  { id: 105, branch: "Bangalore Tech Center", year: 2023, month: "December", category: "Stationary Combustion", inputDate: "Dec 10, 2023", invoice: "GAS-2023-999", activityData: "4,800 m3", emissionFactor: "2.1 kg CO2e/m3", emissions: "10.080 tCO2e" },
  { id: 106, branch: "Delhi Manufacturing Plant", year: 2024, month: "January", category: "Mobile Combustion", inputDate: "Jan 20, 2024", invoice: "FUEL-2024-056", activityData: "2,800 L", emissionFactor: "2.3 kg CO2e/L", emissions: "6.440 tCO2e" },
  { id: 107, branch: "Mumbai Headquarters", year: 2023, month: "December", category: "Fugitive Emissions", inputDate: "Dec 25, 2023", invoice: "REFR-2023-45", activityData: "35 Kg", emissionFactor: "1430 kg CO2e/kg", emissions: "50.050 tCO2e" },
];

export function Scope1View() {
  const tabs = [
    { name: "All", icon: LayoutGrid },
    { name: "Fossil Fuel", icon: Fuel },
    { name: "Fugitives", icon: Wind },
    { name: "Process Emission", icon: Factory },
  ];

  return (
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
  );
}