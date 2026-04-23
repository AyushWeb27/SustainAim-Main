import React, { useState } from "react";
import { Plus, Building2, MapPin, Phone, Mail, Users, TrendingUp, Calendar, MoreVertical, Eye, Edit, Trash2, UserPlus, Search, Filter, ArrowUpRight, Sparkles, Factory, Warehouse, Store } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { AddBranchModal } from "../components/AddBranchModal";
import { UserAllotmentModal } from "../components/UserAllotmentModal";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// Mock data for branches
const INITIAL_BRANCHES = [
  {
    id: "1",
    name: "Mumbai Headquarters",
    location: "Bandra Kurla Complex, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pincode: "400051",
    manager: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "mumbai@company.com",
    establishedDate: "2020-01-15",
    branchType: "headquarters",
    description: "Main headquarters and primary operations center",
    createdAt: "2020-01-15T00:00:00.000Z",
    status: "Active",
    employeeCount: 245,
    scope1Total: 1250.5,
    scope2Total: 890.2,
    scope3Total: 3420.8,
    assignedUsers: [],
  },
  {
    id: "2",
    name: "Bangalore Tech Center",
    location: "Electronic City Phase 1, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    pincode: "560100",
    manager: "Priya Patel",
    phone: "+91 98765 43211",
    email: "bangalore@company.com",
    establishedDate: "2021-06-20",
    branchType: "regional",
    description: "Technology and innovation hub",
    createdAt: "2021-06-20T00:00:00.000Z",
    status: "Active",
    employeeCount: 180,
    scope1Total: 850.3,
    scope2Total: 620.5,
    scope3Total: 2180.4,
    assignedUsers: [],
  },
  {
    id: "3",
    name: "Delhi Manufacturing Plant",
    location: "Okhla Industrial Area, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    pincode: "110020",
    manager: "Amit Sharma",
    phone: "+91 98765 43212",
    email: "delhi@company.com",
    establishedDate: "2019-03-10",
    branchType: "factory",
    description: "Primary manufacturing and production facility",
    createdAt: "2019-03-10T00:00:00.000Z",
    status: "Active",
    employeeCount: 320,
    scope1Total: 2850.7,
    scope2Total: 1450.9,
    scope3Total: 4820.3,
    assignedUsers: [],
  },
];

export function BranchManagementPage() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUserAllotmentOpen, setIsUserAllotmentOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBranch = (branch: any) => {
    setBranches([...branches, branch]);
    toast.success("Branch added successfully!", {
      description: `${branch.name} has been added to your organization.`,
    });
  };

  const handleDeleteBranch = (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    setBranches(branches.filter((b) => b.id !== branchId));
    toast.success("Branch deleted", {
      description: `${branch?.name} has been removed.`,
    });
  };

  const handleAssignUsers = (users: any[]) => {
    if (selectedBranch) {
      setBranches(
        branches.map((b) =>
          b.id === selectedBranch.id
            ? { ...b, assignedUsers: [...(b.assignedUsers || []), ...users] }
            : b
        )
      );
      toast.success("Users assigned successfully!", {
        description: `${users.length} user(s) assigned to ${selectedBranch.name}`,
      });
    }
  };

  const openUserAllotment = (branch: any) => {
    setSelectedBranch(branch);
    setIsUserAllotmentOpen(true);
  };

  const getBranchTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      headquarters: "bg-purple-100 text-purple-700 border-purple-200",
      regional: "bg-blue-100 text-blue-700 border-blue-200",
      factory: "bg-orange-100 text-orange-700 border-orange-200",
      warehouse: "bg-yellow-100 text-yellow-700 border-yellow-200",
      retail: "bg-pink-100 text-pink-700 border-pink-200",
      service: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    return colors[type] || "bg-neutral-100 text-neutral-700 border-neutral-200";
  };

  const totalEmissions = (branch: any) => {
    return (branch.scope1Total + branch.scope2Total + branch.scope3Total).toFixed(2);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-black text-4xl text-neutral-900 dark:text-white tracking-tight">
            Branch Management
          </h1>
          <p className="text-neutral-500 mt-2">
            Manage all your organization branches and track emissions across locations
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Branch
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-bold">Total Branches</p>
              <p className="text-2xl font-black text-neutral-900 dark:text-white">{branches.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-bold">Total Employees</p>
              <p className="text-2xl font-black text-neutral-900 dark:text-white">
                {branches.reduce((sum, b) => sum + b.employeeCount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-bold">Total Emissions</p>
              <p className="text-2xl font-black text-neutral-900 dark:text-white">
                {branches
                  .reduce((sum, b) => sum + b.scope1Total + b.scope2Total + b.scope3Total, 0)
                  .toFixed(0)}
                <span className="text-sm text-neutral-500 ml-1">tCO2e</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-bold">Active Locations</p>
              <p className="text-2xl font-black text-neutral-900 dark:text-white">
                {branches.filter((b) => b.status === "Active").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-4 border border-neutral-100 dark:border-neutral-700">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search branches by name, city, or state..."
          className="w-full"
        />
      </div>

      {/* Branch Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBranches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-black text-xl text-neutral-900 dark:text-white">
                    {branch.name}
                  </h3>
                  <Badge className={`${getBranchTypeColor(branch.branchType)} border font-bold text-xs`}>
                    {branch.branchType}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <MapPin className="w-4 h-4" />
                  <span>{branch.city}, {branch.state}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/dashboard/branches/${branch.id}`)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openUserAllotment(branch)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Assign Users
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Branch
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteBranch(branch.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Branch
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              {branch.manager && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Manager</p>
                    <p className="font-bold text-neutral-900 dark:text-white">{branch.manager}</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                {branch.phone && (
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Phone className="w-3 h-3" />
                    <span>{branch.phone}</span>
                  </div>
                )}
                {branch.email && (
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{branch.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Emissions Summary */}
            <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-4 mb-4">
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                Emissions Overview
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Scope 1</p>
                  <p className="font-black text-emerald-600">{branch.scope1Total} <span className="text-xs">tCO2e</span></p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Scope 2</p>
                  <p className="font-black text-blue-600">{branch.scope2Total} <span className="text-xs">tCO2e</span></p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Scope 3</p>
                  <p className="font-black text-indigo-600">{branch.scope3Total} <span className="text-xs">tCO2e</span></p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Total Emissions</p>
                  <p className="font-black text-lg text-neutral-900 dark:text-white">
                    {totalEmissions(branch)} <span className="text-xs text-neutral-500">tCO2e</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {branch.employeeCount} employees
                </Badge>
                {branch.assignedUsers && branch.assignedUsers.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {branch.assignedUsers.length} assigned
                  </Badge>
                )}
              </div>
              <Button
                onClick={() => navigate(`/dashboard/branches/${branch.id}`)}
                variant="ghost"
                size="sm"
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              >
                View Details →
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredBranches.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700">
          <Building2 className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500 font-bold text-lg">No branches found</p>
          <p className="text-sm text-neutral-400 mt-2">
            {searchQuery ? "Try adjusting your search criteria" : "Add your first branch to get started"}
          </p>
        </div>
      )}

      {/* Modals */}
      <AddBranchModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBranch}
      />
      <UserAllotmentModal
        isOpen={isUserAllotmentOpen}
        onClose={() => setIsUserAllotmentOpen(false)}
        branchName={selectedBranch?.name || ""}
        onAssign={handleAssignUsers}
      />
    </div>
  );
}