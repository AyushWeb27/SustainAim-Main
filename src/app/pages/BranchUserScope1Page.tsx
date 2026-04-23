import { BranchScopePage } from "../components/BranchScopePage";

export function BranchUserScope1Page() {
  return (
    <BranchScopePage
      scopeNumber={1}
      scopeName="Scope 1 - Direct Emissions"
      scopeDescription="Direct GHG emissions from sources owned or controlled by your branch (Company vehicles, fuel combustion, process emissions, fugitive emissions)"
      iconColor="text-emerald-600"
      bgColor="bg-emerald-50"
      borderColor="border-emerald-200"
    />
  );
}