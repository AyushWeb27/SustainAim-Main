import React from "react";
import { LayoutGrid, ShoppingBag, Truck, Trash2, Plane, Users, Package, Building2 } from "lucide-react";
import { ScopeLayout } from "./ScopeLayout";
import { EmissionRecord } from "./EmissionTable";

const scope3Records: EmissionRecord[] = [
  { id: 301, branch: "Mumbai Headquarters", year: 2024, month: "February", category: "Purchased Goods", inputDate: "Feb 20, 2024", invoice: "PUR-2024-501", activityData: "5,000 Units", emissionFactor: "1.2 kg CO2e/unit", emissions: "6.000 tCO2e" },
  { id: 302, branch: "Bangalore Tech Center", year: 2024, month: "January", category: "Upstream Transport", inputDate: "Jan 18, 2024", invoice: "LOG-2024-022", activityData: "12,000 t-km", emissionFactor: "0.15 kg CO2e/t-km", emissions: "1.800 tCO2e" },
  { id: 303, branch: "Delhi Manufacturing Plant", year: 2024, month: "February", category: "Waste Generated", inputDate: "Feb 15, 2024", invoice: "WST-2024-009", activityData: "800 Kg", emissionFactor: "0.45 kg CO2e/kg", emissions: "0.360 tCO2e" },
  { id: 304, branch: "Mumbai Headquarters", year: 2024, month: "January", category: "Business Travel", inputDate: "Jan 25, 2024", invoice: "FLT-2024-112", activityData: "15,000 Km", emissionFactor: "0.18 kg CO2e/km", emissions: "2.700 tCO2e" },
  { id: 305, branch: "Bangalore Tech Center", year: 2024, month: "February", category: "Employee Commute", inputDate: "Feb 28, 2024", invoice: "COM-2024-01", activityData: "45,000 Km", emissionFactor: "0.12 kg CO2e/km", emissions: "5.400 tCO2e" },
  { id: 306, branch: "Delhi Manufacturing Plant", year: 2024, month: "January", category: "Purchased Goods", inputDate: "Jan 22, 2024", invoice: "PUR-2024-502", activityData: "8,500 Units", emissionFactor: "1.2 kg CO2e/unit", emissions: "10.200 tCO2e" },
  { id: 307, branch: "Mumbai Headquarters", year: 2023, month: "December", category: "Upstream Transport", inputDate: "Dec 28, 2023", invoice: "LOG-2023-099", activityData: "9,500 t-km", emissionFactor: "0.15 kg CO2e/t-km", emissions: "1.425 tCO2e" },
];

export function Scope3View() {
  const tabs = [
    { name: "All", icon: LayoutGrid },
    { name: "Goods & Services", icon: ShoppingBag },
    { name: "Transportation & Distribution", icon: Truck },
    { name: "Waste", icon: Trash2 },
    { name: "Business Travel", icon: Plane },
    { name: "Employee Commuting", icon: Users },
    { name: "Sold Products", icon: Package },
    { name: "Other Assets", icon: Building2 },
  ];

  return (
    <ScopeLayout 
      title="Scope 3 Other Indirect Emissions"
      subtitle="Value Chain Inventory"
      scopeId="S3"
      scopeType="Scope 3"
      records={scope3Records}
      tabs={tabs}
      themeColor="indigo"
      headerBg="bg-[#4338ca]"
      accentText="text-indigo-700"
      totalEmissions="452.890"
      totalRecords={42}
    />
  );
}