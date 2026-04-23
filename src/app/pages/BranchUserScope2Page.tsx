import { BranchScopePage } from "../components/BranchScopePage";

export function BranchUserScope2Page() {
  return (
    <BranchScopePage
      scopeNumber={2}
      scopeName="Scope 2 - Energy Indirect Emissions"
      scopeDescription="Indirect GHG emissions from consumption of purchased electricity, heat, or steam"
      iconColor="text-blue-600"
      bgColor="bg-blue-50"
      borderColor="border-blue-200"
    />
  );
}
