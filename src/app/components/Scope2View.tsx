import React from "react";
import { LayoutGrid, CloudLightning, Waves, Thermometer } from "lucide-react";
import { ScopeLayout } from "./ScopeLayout";
import { EmissionRecord } from "./EmissionTable";

const scope2Records: EmissionRecord[] = [
  { id: 201, branch: "Mumbai Headquarters", year: 2024, month: "February", category: "Purchased Electricity", inputDate: "Feb 10, 2024", invoice: "ELEC-2024-001", activityData: "12,500 kWh", emissionFactor: "0.45 kg CO2e/kWh", emissions: "5.625 tCO2e" },
  { id: 202, branch: "Bangalore Tech Center", year: 2024, month: "January", category: "Purchased Electricity", inputDate: "Jan 10, 2024", invoice: "ELEC-2024-002", activityData: "11,800 kWh", emissionFactor: "0.45 kg CO2e/kWh", emissions: "5.310 tCO2e" },
  { id: 203, branch: "Delhi Manufacturing Plant", year: 2024, month: "February", category: "Steam Consumption", inputDate: "Feb 12, 2024", invoice: "STM-2024-015", activityData: "500 GJ", emissionFactor: "0.06 t CO2e/GJ", emissions: "30.000 tCO2e" },
  { id: 204, branch: "Mumbai Headquarters", year: 2024, month: "January", category: "District Heating", inputDate: "Jan 12, 2024", invoice: "HEAT-2024-08", activityData: "250 MWh", emissionFactor: "0.21 t CO2e/MWh", emissions: "52.500 tCO2e" },
  { id: 205, branch: "Bangalore Tech Center", year: 2024, month: "February", category: "Cooling Systems", inputDate: "Feb 14, 2024", invoice: "COOL-2024-11", activityData: "150 MWh", emissionFactor: "0.18 t CO2e/MWh", emissions: "27.000 tCO2e" },
  { id: 206, branch: "Delhi Manufacturing Plant", year: 2024, month: "January", category: "Purchased Electricity", inputDate: "Jan 15, 2024", invoice: "ELEC-2024-003", activityData: "18,200 kWh", emissionFactor: "0.45 kg CO2e/kWh", emissions: "8.190 tCO2e" },
];

export function Scope2View() {
  const tabs = [
    { name: "All", icon: LayoutGrid },
    { name: "Electricity", icon: CloudLightning },
    { name: "Steam", icon: Waves },
    { name: "Heating & Cooling", icon: Thermometer },
  ];

  return (
    <ScopeLayout 
      title="Scope 2 Indirect Energy Emissions"
      subtitle="Energy Usage Inventory"
      scopeId="S2"
      scopeType="Scope 2"
      records={scope2Records}
      tabs={tabs}
      themeColor="blue"
      headerBg="bg-[#1e40af]"
      accentText="text-blue-700"
      totalEmissions="120.435"
      totalRecords={12}
    />
  );
}