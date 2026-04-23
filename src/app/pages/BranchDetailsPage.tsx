import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Users,
  Calendar,
  Edit,
  UserPlus,
  TrendingUp,
  Download,
  Filter,
  Trash2,
  Shield,
  Eye,
  Edit3,
  MoreVertical,
  Check,
  X as XIcon,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { UserAllotmentModal } from "../components/UserAllotmentModal";
import { AddRecordModal } from "../components/AddRecordModal";
import { AddUserModal } from "../components/AddUserModal";
import { DeleteUserConfirmation } from "../components/DeleteUserConfirmation";
import { EditBranchModal } from "../components/EditBranchModal";
import { ExportDataModal } from "../components/ExportDataModal";
import { EditUserModal } from "../components/EditUserModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock branch data
const MOCK_BRANCH = {
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
  status: "Active",
  employeeCount: 245,
  scope1Total: 1250.5,
  scope2Total: 890.2,
  scope3Total: 3420.8,
  assignedUsers: [
    {
      id: "1",
      name: "Amit Sharma",
      email: "amit.sharma@company.com",
      phone: "+91 98765 11111",
      role: "Environmental Manager",
      department: "Sustainability",
      accessLevel: "admin",
      addedDate: "2024-01-15",
      permissions: {
        scope1: { view: true, edit: true },
        scope2: { view: true, edit: true },
        scope3: { view: true, edit: true },
      },
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya.patel@company.com",
      phone: "+91 98765 22222",
      role: "Data Analyst",
      department: "Operations",
      accessLevel: "editor",
      addedDate: "2024-02-10",
      permissions: {
        scope1: { view: true, edit: true },
        scope2: { view: true, edit: false },
        scope3: { view: true, edit: false },
      },
    },
    {
      id: "3",
      name: "Vikram Singh",
      email: "vikram.singh@company.com",
      phone: "+91 98765 33333",
      role: "Sustainability Coordinator",
      department: "Operations",
      accessLevel: "viewer",
      addedDate: "2024-03-05",
      permissions: {
        scope1: { view: true, edit: false },
        scope2: { view: true, edit: false },
        scope3: { view: true, edit: false },
      },
    },
  ],
};

// Mock emissions data
const MOCK_SCOPE1_DATA = [
  {
    id: "1",
    inputDate: "2024-03-15",
    year: "2024",
    month: "March",
    category: "Mobile Combustion",
    source: "Company Fleet",
    activity: "Diesel Consumption",
    invoiceBill: "INV-2024-001",
    quantity: 1500,
    unit: "Liters",
    emissionFactor: 2.68,
    emissions: 4020,
    branch: "Mumbai Headquarters"
  },
  {
    id: "2",
    inputDate: "2024-03-10",
    year: "2024",
    month: "March",
    category: "Stationary Combustion",
    source: "Natural Gas Boiler",
    activity: "Heating System",
    invoiceBill: "INV-2024-002",
    quantity: 800,
    unit: "m³",
    emissionFactor: 1.89,
    emissions: 1512,
    branch: "Mumbai Headquarters"
  },
  {
    id: "3",
    inputDate: "2024-02-20",
    year: "2024",
    month: "February",
    category: "Mobile Combustion",
    source: "Company Vehicles",
    activity: "Petrol Consumption",
    invoiceBill: "INV-2024-003",
    quantity: 1200,
    unit: "Liters",
    emissionFactor: 2.31,
    emissions: 2772,
    branch: "Delhi Regional Office"
  },
];

const MOCK_SCOPE2_DATA = [
  {
    id: "1",
    inputDate: "2024-03-15",
    year: "2024",
    month: "March",
    category: "Purchased Electricity",
    source: "Grid Electricity",
    activity: "Office Operations",
    invoiceBill: "ELEC-2024-001",
    quantity: 12500,
    unit: "kWh",
    emissionFactor: 0.82,
    emissions: 10250,
    branch: "Mumbai Headquarters"
  },
  {
    id: "2",
    inputDate: "2024-02-28",
    year: "2024",
    month: "February",
    category: "Purchased Electricity",
    source: "Grid Electricity",
    activity: "Manufacturing Unit",
    invoiceBill: "ELEC-2024-002",
    quantity: 8900,
    unit: "kWh",
    emissionFactor: 0.82,
    emissions: 7298,
    branch: "Chennai Factory"
  },
];

const MOCK_SCOPE3_DATA = [
  {
    id: "1",
    inputDate: "2024-03-12",
    year: "2024",
    month: "March",
    category: "Employee Commuting",
    source: "Employee Commute",
    activity: "Daily Transportation",
    invoiceBill: "N/A",
    quantity: 2500,
    unit: "km",
    emissionFactor: 0.12,
    emissions: 300,
    branch: "Mumbai Headquarters"
  },
  {
    id: "2",
    inputDate: "2024-03-08",
    year: "2024",
    month: "March",
    category: "Business Travel",
    source: "Business Travel",
    activity: "Domestic Flights",
    invoiceBill: "TRAVEL-2024-001",
    quantity: 5,
    unit: "trips",
    emissionFactor: 150,
    emissions: 750,
    branch: "Bangalore Tech Center"
  },
  {
    id: "3",
    inputDate: "2024-02-15",
    year: "2024",
    month: "February",
    category: "Upstream Transportation",
    source: "Logistics Partner",
    activity: "Freight Transport",
    invoiceBill: "LOG-2024-001",
    quantity: 3500,
    unit: "km",
    emissionFactor: 0.18,
    emissions: 630,
    branch: "Pune Warehouse"
  },
];

export function BranchDetailsPage() {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState(MOCK_BRANCH);
  const [isUserAllotmentOpen, setIsUserAllotmentOpen] = useState(false);
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [isEditBranchOpen, setIsEditBranchOpen] = useState(false);
  const [isExportDataOpen, setIsExportDataOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [currentScope, setCurrentScope] = useState<"scope1" | "scope2" | "scope3">("scope1");
  const [recordToEdit, setRecordToEdit] = useState<any>(null);

  // Emissions data state
  const [scope1Data, setScope1Data] = useState(MOCK_SCOPE1_DATA);
  const [scope2Data, setScope2Data] = useState(MOCK_SCOPE2_DATA);
  const [scope3Data, setScope3Data] = useState(MOCK_SCOPE3_DATA);

  const handleAssignUsers = (users: any[]) => {
    setBranch({
      ...branch,
      assignedUsers: [...(branch.assignedUsers || []), ...users],
    });
    toast.success("Users assigned successfully!");
  };

  const handleAddUser = (user: any) => {
    setBranch({
      ...branch,
      assignedUsers: [...branch.assignedUsers, user],
    });
    toast.success(`${user.name} added successfully!`);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      setBranch({
        ...branch,
        assignedUsers: branch.assignedUsers.filter((u) => u.id !== userToDelete.id),
      });
      toast.success(`${userToDelete.name} removed from branch`);
      setUserToDelete(null);
      setIsDeleteUserOpen(false);
    }
  };

  const handleEditBranch = (updatedBranch: any) => {
    setBranch({
      ...branch,
      ...updatedBranch,
    });
    toast.success("Branch updated successfully!");
  };

  const handleEditUser = (updatedUser: any) => {
    setBranch({
      ...branch,
      assignedUsers: branch.assignedUsers.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      ),
    });
    toast.success(`${updatedUser.name} updated successfully!`);
  };

  const handleExportData = (options: any) => {
    // Prepare export data
    const exportData: any = {};

    if (options.data.branchInfo) {
      exportData.branchInfo = {
        name: branch.name,
        location: branch.location,
        city: branch.city,
        state: branch.state,
        pincode: branch.pincode,
        manager: branch.manager,
        phone: branch.phone,
        email: branch.email,
        branchType: branch.branchType,
        status: branch.status,
        employeeCount: branch.employeeCount,
      };
    }

    if (options.data.users) {
      exportData.users = branch.assignedUsers;
    }

    if (options.data.scope1) {
      exportData.scope1Emissions = scope1Data;
    }

    if (options.data.scope2) {
      exportData.scope2Emissions = scope2Data;
    }

    if (options.data.scope3) {
      exportData.scope3Emissions = scope3Data;
    }

    if (options.data.summary) {
      exportData.summary = {
        scope1Total: branch.scope1Total,
        scope2Total: branch.scope2Total,
        scope3Total: branch.scope3Total,
        totalEmissions: totalEmissions,
        dateRange: options.dateRange,
      };
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${branch.name.replace(/\s+/g, '-')}_${timestamp}`;

    // Export based on format
    if (options.format === 'json') {
      // Export as JSON
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } else if (options.format === 'csv') {
      // Export as CSV (simplified - combine all data)
      let csvContent = '';
      
      // Branch Info
      if (exportData.branchInfo) {
        csvContent += 'Branch Information\n';
        Object.entries(exportData.branchInfo).forEach(([key, value]) => {
          csvContent += `${key},${value}\n`;
        });
        csvContent += '\n';
      }

      // Scope 1
      if (exportData.scope1Emissions) {
        csvContent += 'Scope 1 Emissions\n';
        csvContent += 'Date,Source,Activity,Quantity,Unit,Emissions\n';
        exportData.scope1Emissions.forEach((record: any) => {
          csvContent += `${record.date},${record.source},${record.activity},${record.quantity},${record.unit},${record.emissions}\n`;
        });
        csvContent += '\n';
      }

      // Scope 2
      if (exportData.scope2Emissions) {
        csvContent += 'Scope 2 Emissions\n';
        csvContent += 'Date,Source,Activity,Quantity,Unit,Emissions\n';
        exportData.scope2Emissions.forEach((record: any) => {
          csvContent += `${record.date},${record.source},${record.activity},${record.quantity},${record.unit},${record.emissions}\n`;
        });
        csvContent += '\n';
      }

      // Scope 3
      if (exportData.scope3Emissions) {
        csvContent += 'Scope 3 Emissions\n';
        csvContent += 'Date,Source,Activity,Quantity,Unit,Emissions\n';
        exportData.scope3Emissions.forEach((record: any) => {
          csvContent += `${record.date},${record.source},${record.activity},${record.quantity},${record.unit},${record.emissions}\n`;
        });
        csvContent += '\n';
      }

      const csvBlob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(csvBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      // For PDF and Excel, show a message (would require additional libraries)
      toast.success(`Preparing ${options.format.toUpperCase()} export...`, {
        description: 'Export feature coming soon for this format'
      });
      return;
    }

    toast.success('Data exported successfully!', {
      description: `Downloaded as ${options.format.toUpperCase()}`
    });
  };

  const openDeleteModal = (user: any) => {
    setUserToDelete(user);
    setIsDeleteUserOpen(true);
  };

  const handleAddRecord = (record: any) => {
    if (recordToEdit) {
      // Update existing record
      if (currentScope === "scope1") {
        setScope1Data(scope1Data.map((r) => r.id === record.id ? record : r));
      } else if (currentScope === "scope2") {
        setScope2Data(scope2Data.map((r) => r.id === record.id ? record : r));
      } else {
        setScope3Data(scope3Data.map((r) => r.id === record.id ? record : r));
      }
      toast.success("Emission record updated successfully!");
    } else {
      // Add new record
      const newRecord = {
        id: Date.now().toString(),
        ...record,
      };

      if (currentScope === "scope1") {
        setScope1Data([...scope1Data, newRecord]);
      } else if (currentScope === "scope2") {
        setScope2Data([...scope2Data, newRecord]);
      } else {
        setScope3Data([...scope3Data, newRecord]);
      }
      toast.success("Emission record added successfully!");
    }
    setRecordToEdit(null);
  };

  const handleEditRecord = (scope: string, record: any) => {
    setCurrentScope(scope as "scope1" | "scope2" | "scope3");
    setRecordToEdit(record);
    setIsAddRecordOpen(true);
  };

  const handleDeleteRecord = (scope: string, recordId: string) => {
    if (scope === "scope1") {
      setScope1Data(scope1Data.filter((r) => r.id !== recordId));
    } else if (scope === "scope2") {
      setScope2Data(scope2Data.filter((r) => r.id !== recordId));
    } else {
      setScope3Data(scope3Data.filter((r) => r.id !== recordId));
    }
    toast.success("Record deleted");
  };

  const openAddRecordModal = (scope: "scope1" | "scope2" | "scope3") => {
    setCurrentScope(scope);
    setRecordToEdit(null);
    setIsAddRecordOpen(true);
  };

  const getScopeTypeLabel = (scope: "scope1" | "scope2" | "scope3") => {
    if (scope === "scope1") return "Scope 1";
    if (scope === "scope2") return "Scope 2";
    return "Scope 3";
  };

  const getScopeThemeColor = (scope: "scope1" | "scope2" | "scope3") => {
    if (scope === "scope1") return "emerald";
    if (scope === "scope2") return "blue";
    return "indigo";
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

  const getAccessLevelBadge = (level: string) => {
    const levels: Record<string, { bg: string; text: string }> = {
      admin: { bg: "bg-purple-100", text: "text-purple-700" },
      editor: { bg: "bg-blue-100", text: "text-blue-700" },
      viewer: { bg: "bg-neutral-100", text: "text-neutral-700" },
    };
    return levels[level] || levels.viewer;
  };

  const totalEmissions = branch.scope1Total + branch.scope2Total + branch.scope3Total;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/dashboard/branches")}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Branches
      </Button>

      {/* Header Section */}
      <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-700">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          {/* Branch Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-black text-3xl text-neutral-900 dark:text-white">
                    {branch.name}
                  </h1>
                  <Badge className={`${getBranchTypeColor(branch.branchType)} border font-bold`}>
                    {branch.branchType}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    {branch.status}
                  </Badge>
                </div>
                <p className="text-neutral-500">{branch.description}</p>
              </div>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">{branch.location}</p>
                  <p className="text-xs text-neutral-500">{branch.city}, {branch.state} - {branch.pincode}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">Manager</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">{branch.manager}</p>
                  <p className="text-xs text-neutral-500">{branch.employeeCount} employees</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">{branch.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">{branch.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => setIsUserAllotmentOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Assign Users
            </Button>
            <Button
              onClick={() => setIsEditBranchOpen(true)}
              variant="outline"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Branch
            </Button>
            <Button
              onClick={() => setIsExportDataOpen(true)}
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Assigned Users */}
        {branch.assignedUsers && branch.assignedUsers.length > 0 && (
          <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-700">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
              Assigned Users ({branch.assignedUsers.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {branch.assignedUsers.map((user) => (
                <Badge key={user.id} variant="secondary" className="gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-xs">{user.name}</p>
                    <p className="text-[10px] text-neutral-500">{user.role}</p>
                  </div>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Emissions Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-sm font-bold text-neutral-500">Scope 1</p>
          </div>
          <p className="text-3xl font-black text-neutral-900 dark:text-white">
            {branch.scope1Total}
            <span className="text-sm text-neutral-500 ml-1">tCO2e</span>
          </p>
          <p className="text-xs text-emerald-600 font-bold mt-2">Direct Emissions</p>
        </Card>

        <Card className="p-6 border border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm font-bold text-neutral-500">Scope 2</p>
          </div>
          <p className="text-3xl font-black text-neutral-900 dark:text-white">
            {branch.scope2Total}
            <span className="text-sm text-neutral-500 ml-1">tCO2e</span>
          </p>
          <p className="text-xs text-blue-600 font-bold mt-2">Indirect Emissions</p>
        </Card>

        <Card className="p-6 border border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-sm font-bold text-neutral-500">Scope 3</p>
          </div>
          <p className="text-3xl font-black text-neutral-900 dark:text-white">
            {branch.scope3Total}
            <span className="text-sm text-neutral-500 ml-1">tCO2e</span>
          </p>
          <p className="text-xs text-indigo-600 font-bold mt-2">Value Chain</p>
        </Card>

        <Card className="p-6 border border-neutral-100 dark:border-neutral-700 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white dark:text-neutral-900" />
            </div>
            <p className="text-sm font-bold text-neutral-500">Total</p>
          </div>
          <p className="text-3xl font-black text-neutral-900 dark:text-white">
            {totalEmissions.toFixed(2)}
            <span className="text-sm text-neutral-500 ml-1">tCO2e</span>
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-bold mt-2">Combined Emissions</p>
        </Card>
      </div>

      {/* Main Tabs - Users and Emissions */}
      <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 overflow-hidden">
        <Tabs defaultValue="users" className="w-full">
          <div className="border-b border-neutral-100 dark:border-neutral-700 px-6">
            <TabsList className="bg-transparent">
              <TabsTrigger value="users" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
                <Users className="w-4 h-4 mr-2" />
                Users Management
              </TabsTrigger>
              <TabsTrigger value="scope1" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
                Scope 1 Emissions
              </TabsTrigger>
              <TabsTrigger value="scope2" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                Scope 2 Emissions
              </TabsTrigger>
              <TabsTrigger value="scope3" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Scope 3 Emissions
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Users Tab */}
          <TabsContent value="users" className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h3 className="font-black text-xl sm:text-2xl text-neutral-900 dark:text-white">Branch Users</h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">Manage users and their permissions for this branch</p>
              </div>
              <Button
                onClick={() => setIsAddUserModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            {branch.assignedUsers.length > 0 && (
              <>
                {/* User Stats Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 opacity-60" />
                    </div>
                    <p className="text-emerald-100 text-xs sm:text-sm font-bold mb-1">Total Users</p>
                    <p className="text-3xl sm:text-4xl font-black">{branch.assignedUsers.length}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 opacity-60" />
                    </div>
                    <p className="text-blue-100 text-xs sm:text-sm font-bold mb-1">Admins</p>
                    <p className="text-3xl sm:text-4xl font-black">
                      {branch.assignedUsers.filter((u) => u.accessLevel === "admin").length}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Edit3 className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 opacity-60" />
                    </div>
                    <p className="text-purple-100 text-xs sm:text-sm font-bold mb-1">Editors</p>
                    <p className="text-3xl sm:text-4xl font-black">
                      {branch.assignedUsers.filter((u) => u.accessLevel === "editor").length}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Eye className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 opacity-60" />
                    </div>
                    <p className="text-orange-100 text-xs sm:text-sm font-bold mb-1">Viewers</p>
                    <p className="text-3xl sm:text-4xl font-black">
                      {branch.assignedUsers.filter((u) => u.accessLevel === "viewer").length}
                    </p>
                  </motion.div>
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {branch.assignedUsers.map((user, index) => {
                    const accessBadge = getAccessLevelBadge(user.accessLevel);
                    return (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="p-4 sm:p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 group bg-white dark:bg-neutral-800">
                          {/* User Header */}
                          <div className="flex items-start justify-between mb-4 sm:mb-6 gap-2">
                            <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                              <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-lg sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  {user.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-800 flex items-center justify-center">
                                  <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-black text-base sm:text-lg text-neutral-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                  {user.name}
                                </h4>
                                <p className="text-xs sm:text-sm font-bold text-neutral-500 mb-2 truncate">{user.role}</p>
                                <Badge className={`${accessBadge.bg} ${accessBadge.text} border-0 font-bold text-xs`}>
                                  <Shield className="w-3 h-3 mr-1" />
                                  {user.accessLevel}
                                </Badge>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button
                                  className="h-8 w-8 sm:h-9 sm:w-9 p-0 flex items-center justify-center rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 flex-shrink-0 transition-colors"
                                  aria-label="User options"
                                >
                                  <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-44 sm:w-48">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setUserToEdit(user);
                                    setIsEditUserOpen(true);
                                  }}
                                  className="cursor-pointer text-sm"
                                >
                                  <Edit3 className="w-4 h-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openDeleteModal(user)}
                                  className="text-red-600 focus:text-red-600 cursor-pointer text-sm"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Contact Information Card */}
                          <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 space-y-2 sm:space-y-2.5">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm flex-shrink-0">
                                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-neutral-500 font-bold mb-0.5">Email</p>
                                <p className="text-xs sm:text-sm text-neutral-900 dark:text-white font-bold truncate">{user.email}</p>
                              </div>
                            </div>

                            {user.phone && (
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm flex-shrink-0">
                                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-neutral-500 font-bold mb-0.5">Phone</p>
                                  <p className="text-xs sm:text-sm text-neutral-900 dark:text-white font-bold">{user.phone}</p>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm flex-shrink-0">
                                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-neutral-500 font-bold mb-0.5">Department</p>
                                <p className="text-xs sm:text-sm text-neutral-900 dark:text-white font-bold truncate">{user.department}</p>
                              </div>
                            </div>
                          </div>

                          {/* Permissions Section */}
                          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 rounded-xl p-3 sm:p-4 border border-emerald-100 dark:border-emerald-900/20">
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
                                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                              </div>
                              <p className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-wider">
                                Scope Permissions
                              </p>
                            </div>

                            <div className="space-y-2 sm:space-y-3">
                              {/* Scope 1 */}
                              <div className="bg-white dark:bg-neutral-800 rounded-lg p-2.5 sm:p-3 border border-neutral-200 dark:border-neutral-700">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0"></div>
                                    <span className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white">Scope 1</span>
                                  </div>
                                  <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                                    {user.permissions.scope1.view ? (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-emerald-50 text-emerald-700 border-emerald-300 font-bold px-1.5 sm:px-2 h-5 sm:h-6">
                                        <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        <span className="hidden xs:inline">View</span>
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-neutral-100 text-neutral-400 border-neutral-200 px-1.5 sm:px-2 h-5 sm:h-6">
                                        <XIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </Badge>
                                    )}
                                    {user.permissions.scope1.edit ? (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-emerald-100 text-emerald-700 border-emerald-400 font-bold px-1.5 sm:px-2 h-5 sm:h-6">
                                        <Edit3 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        <span className="hidden xs:inline">Edit</span>
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-neutral-100 text-neutral-400 border-neutral-200 px-1.5 sm:px-2 h-5 sm:h-6">
                                        <XIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Scope 2 */}
                              <div className="bg-white dark:bg-neutral-800 rounded-lg p-2.5 sm:p-3 border border-neutral-200 dark:border-neutral-700">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                                    <span className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white">Scope 2</span>
                                  </div>
                                  <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                                    {user.permissions.scope2.view ? (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-blue-50 text-blue-700 border-blue-300 font-bold px-1.5 sm:px-2 h-5 sm:h-6">
                                        <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        <span className="hidden xs:inline">View</span>
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-neutral-100 text-neutral-400 border-neutral-200 px-1.5 sm:px-2 h-5 sm:h-6">
                                        <XIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </Badge>
                                    )}
                                    {user.permissions.scope2.edit ? (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-blue-100 text-blue-700 border-blue-400 font-bold px-1.5 sm:px-2 h-5 sm:h-6">
                                        <Edit3 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        <span className="hidden xs:inline">Edit</span>
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-neutral-100 text-neutral-400 border-neutral-200 px-1.5 sm:px-2 h-5 sm:h-6">
                                        <XIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Scope 3 */}
                              <div className="bg-white dark:bg-neutral-800 rounded-lg p-2.5 sm:p-3 border border-neutral-200 dark:border-neutral-700">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0"></div>
                                    <span className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white">Scope 3</span>
                                  </div>
                                  <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                                    {user.permissions.scope3.view ? (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-indigo-50 text-indigo-700 border-indigo-300 font-bold px-1.5 sm:px-2 h-5 sm:h-6">
                                        <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        <span className="hidden xs:inline">View</span>
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-neutral-100 text-neutral-400 border-neutral-200 px-1.5 sm:px-2 h-5 sm:h-6">
                                        <XIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </Badge>
                                    )}
                                    {user.permissions.scope3.edit ? (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-indigo-100 text-indigo-700 border-indigo-400 font-bold px-1.5 sm:px-2 h-5 sm:h-6">
                                        <Edit3 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        <span className="hidden xs:inline">Edit</span>
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 bg-neutral-100 text-neutral-400 border-neutral-200 px-1.5 sm:px-2 h-5 sm:h-6">
                                        <XIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer - Added Date */}
                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-500" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs text-neutral-500 font-bold">Added on</p>
                                <p className="text-xs text-neutral-900 dark:text-white font-black truncate">
                                  {new Date(user.addedDate).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}

            {branch.assignedUsers.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center py-12 sm:py-16 bg-gradient-to-br from-neutral-50 to-emerald-50 dark:from-neutral-900 dark:to-emerald-900/10 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 px-4"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-neutral-900 dark:text-white mb-2">No Users Assigned Yet</h4>
                <p className="text-xs sm:text-sm text-neutral-500 mb-6 sm:mb-8 max-w-md mx-auto">
                  Start building your team by adding users to this branch. They'll be able to access and manage emissions data based on their permissions.
                </p>
                <Button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Add Your First User
                </Button>
              </motion.div>
            )}
          </TabsContent>

          {/* Scope 1 Tab */}
          <TabsContent value="scope1" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-xl text-neutral-900 dark:text-white">Scope 1: Direct Emissions</h3>
                <p className="text-sm text-neutral-500 mt-1">Track emissions from owned or controlled sources</p>
              </div>
              <Button
                onClick={() => openAddRecordModal("scope1")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Add Record
              </Button>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1400px]">
                <thead>
                  <tr className="bg-emerald-600 text-white">
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">SR. NO.</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">BRANCH</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">YEAR</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">MONTH</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">CATEGORY</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">INPUT DATE</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">INVOICE/BILL</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">ACTIVITY DATA</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">EMISSION FACTOR</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">EMISSION (TCO2E)</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-center whitespace-nowrap">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
                  {scope1Data.map((record, index) => (
                    <tr key={record.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-bold text-neutral-900 dark:text-white">{index + 1}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">
                        <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                          {record.branch}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.year}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.month}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.category}</td>
                      <td className="px-4 py-4 text-sm font-bold text-neutral-900 dark:text-white">{record.inputDate}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.invoiceBill}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">
                        <div className="flex flex-col">
                          <span className="font-bold text-neutral-900 dark:text-white">{record.activity}</span>
                          <span className="text-xs text-neutral-500">{record.quantity} {record.unit}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-neutral-900 dark:text-white">{record.emissionFactor}</td>
                      <td className="px-4 py-4">
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold whitespace-nowrap">
                          {record.emissions} tCO2e
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditRecord("scope1", record)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRecord("scope1", record.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Scope 2 Tab */}
          <TabsContent value="scope2" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-xl text-neutral-900 dark:text-white">Scope 2: Indirect Emissions</h3>
                <p className="text-sm text-neutral-500 mt-1">Track emissions from purchased energy</p>
              </div>
              <Button
                onClick={() => openAddRecordModal("scope2")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Record
              </Button>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1400px]">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">SR. NO.</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">BRANCH</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">YEAR</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">MONTH</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">CATEGORY</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">INPUT DATE</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">INVOICE/BILL</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">ACTIVITY DATA</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">EMISSION FACTOR</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">EMISSION (TCO2E)</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-center whitespace-nowrap">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
                  {scope2Data.map((record, index) => (
                    <tr key={record.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-bold text-neutral-900 dark:text-white">{index + 1}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">
                          {record.branch}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.year}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.month}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.category}</td>
                      <td className="px-4 py-4 text-sm font-bold text-neutral-900 dark:text-white">{record.inputDate}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.invoiceBill}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">
                        <div className="flex flex-col">
                          <span className="font-bold text-neutral-900 dark:text-white">{record.activity}</span>
                          <span className="text-xs text-neutral-500">{record.quantity} {record.unit}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-neutral-900 dark:text-white">{record.emissionFactor}</td>
                      <td className="px-4 py-4">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold whitespace-nowrap">
                          {record.emissions} tCO2e
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditRecord("scope2", record)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRecord("scope2", record.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Scope 3 Tab */}
          <TabsContent value="scope3" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-xl text-neutral-900 dark:text-white">Scope 3: Value Chain Emissions</h3>
                <p className="text-sm text-neutral-500 mt-1">Track emissions from the value chain</p>
              </div>
              <Button
                onClick={() => openAddRecordModal("scope3")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Add Record
              </Button>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1400px]">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">SR. NO.</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">BRANCH</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">YEAR</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">MONTH</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">CATEGORY</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">INPUT DATE</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">INVOICE/BILL</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">ACTIVITY DATA</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">EMISSION FACTOR</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider whitespace-nowrap">EMISSION (TCO2E)</th>
                    <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-center whitespace-nowrap">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
                  {scope3Data.map((record, index) => (
                    <tr key={record.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-bold text-neutral-900 dark:text-white">{index + 1}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">
                        <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold">
                          {record.branch}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.year}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.month}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.category}</td>
                      <td className="px-4 py-4 text-sm font-bold text-neutral-900 dark:text-white">{record.inputDate}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{record.invoiceBill}</td>
                      <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">
                        <div className="flex flex-col">
                          <span className="font-bold text-neutral-900 dark:text-white">{record.activity}</span>
                          <span className="text-xs text-neutral-500">{record.quantity} {record.unit}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-neutral-900 dark:text-white">{record.emissionFactor}</td>
                      <td className="px-4 py-4">
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-bold whitespace-nowrap">
                          {record.emissions} tCO2e
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditRecord("scope3", record)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRecord("scope3", record.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <UserAllotmentModal
        isOpen={isUserAllotmentOpen}
        onClose={() => setIsUserAllotmentOpen(false)}
        branchName={branch.name}
        onAssign={handleAssignUsers}
      />
      <AddRecordModal
        isOpen={isAddRecordOpen}
        onClose={() => {
          setIsAddRecordOpen(false);
          setRecordToEdit(null);
        }}
        onSubmit={handleAddRecord}
        scopeType={getScopeTypeLabel(currentScope) as "Scope 1" | "Scope 2" | "Scope 3"}
        themeColor={getScopeThemeColor(currentScope)}
        editRecord={recordToEdit}
        currentBranchName={branch.name}
      />
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        branchName={branch.name}
        onAddUser={handleAddUser}
      />
      <DeleteUserConfirmation
        isOpen={isDeleteUserOpen}
        onClose={() => setIsDeleteUserOpen(false)}
        onConfirm={handleDeleteUser}
        userName={userToDelete?.name || ""}
      />
      <EditBranchModal
        isOpen={isEditBranchOpen}
        onClose={() => setIsEditBranchOpen(false)}
        branch={branch}
        onEdit={handleEditBranch}
      />
      <ExportDataModal
        isOpen={isExportDataOpen}
        onClose={() => setIsExportDataOpen(false)}
        branchName={branch.name}
        onExport={handleExportData}
      />
      <EditUserModal
        isOpen={isEditUserOpen}
        onClose={() => setIsEditUserOpen(false)}
        user={userToEdit}
        branchName={branch.name}
        onEditUser={handleEditUser}
      />
    </div>
  );
}