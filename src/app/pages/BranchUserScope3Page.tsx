import { BranchScopePage } from "../components/BranchScopePage";

export function BranchUserScope3Page() {
  return (
    <BranchScopePage
      scopeNumber={3}
      scopeName="Scope 3 - Value Chain Emissions"
      scopeDescription="All other indirect emissions from your branch's value chain activities"
      iconColor="text-indigo-600"
      bgColor="bg-indigo-50"
      borderColor="border-indigo-200"
    />
  );
}
