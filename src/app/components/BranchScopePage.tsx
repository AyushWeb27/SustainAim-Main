import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Shield,
  Plus,
  Download,
  Filter,
  Search,
  Calendar,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Lock,
  TrendingDown,
  TrendingUp,
  BarChart3,
  FileText,
  Upload
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

interface BranchScopePageProps {
  scopeNumber: 1 | 2 | 3;
  scopeName: string;
  scopeDescription: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
}

export function BranchScopePage({
  scopeNumber,
  scopeName,
  scopeDescription,
  iconColor,
  bgColor,
  borderColor
}: BranchScopePageProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get branch user data and permissions
  const branchUserData = JSON.parse(localStorage.getItem("branchUser") || "{}");
  const permissions = branchUserData.permissions || {};
  const scopeKey = `scope${scopeNumber}` as keyof typeof permissions;
  const canView = permissions[scopeKey]?.view || false;
  const canEdit = permissions[scopeKey]?.edit || false;

  // Enhanced mock data for emissions entries
  const mockData = [
    {
      id: 1,
      year: 2026,
      month: "March",
      category: scopeNumber === 1 ? "Fuel Combustion" : scopeNumber === 2 ? "Electricity" : "Business Travel",
      inputDate: "2026-03-15",
      invoice: "INV-2026-001",
      activityData: "1200 kWh",
      emissionFactor: "0.85 kgCO2e/kWh",
      emission: "12.50",
      status: "approved"
    },
    {
      id: 2,
      year: 2026,
      month: "March",
      category: scopeNumber === 1 ? "Company Vehicles" : scopeNumber === 2 ? "Heating" : "Employee Commute",
      inputDate: "2026-03-10",
      invoice: "INV-2026-002",
      activityData: "850 L",
      emissionFactor: "2.68 kgCO2e/L",
      emission: "8.75",
      status: "pending"
    },
    {
      id: 3,
      year: 2026,
      month: "February",
      category: scopeNumber === 1 ? "Process Emissions" : scopeNumber === 2 ? "Cooling" : "Waste Disposal",
      inputDate: "2026-02-28",
      invoice: "INV-2026-003",
      activityData: "2500 kg",
      emissionFactor: "1.25 kgCO2e/kg",
      emission: "15.30",
      status: "approved"
    },
    {
      id: 4,
      year: 2026,
      month: "February",
      category: scopeNumber === 1 ? "Fuel Combustion" : scopeNumber === 2 ? "Electricity" : "Purchased Goods",
      inputDate: "2026-02-20",
      invoice: "INV-2026-004",
      activityData: "1800 kWh",
      emissionFactor: "0.85 kgCO2e/kWh",
      emission: "18.90",
      status: "approved"
    },
    {
      id: 5,
      year: 2026,
      month: "January",
      category: scopeNumber === 1 ? "Fugitive Emissions" : scopeNumber === 2 ? "Electricity" : "Logistics",
      inputDate: "2026-01-15",
      invoice: "INV-2026-005",
      activityData: "950 kWh",
      emissionFactor: "0.85 kgCO2e/kWh",
      emission: "9.85",
      status: "approved"
    },
    {
      id: 6,
      year: 2026,
      month: "January",
      category: scopeNumber === 1 ? "Mobile Combustion" : scopeNumber === 2 ? "Steam" : "Transportation",
      inputDate: "2026-01-08",
      invoice: "INV-2026-006",
      activityData: "600 L",
      emissionFactor: "2.68 kgCO2e/L",
      emission: "6.20",
      status: "approved"
    }
  ];

  // Filter data based on search
  const filteredData = mockData.filter(item =>
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.invoice.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Calculate stats
  const totalEmissions = filteredData.reduce((sum, item) => sum + parseFloat(item.emission), 0);
  const currentMonthData = filteredData.filter(item => item.month === "March");
  const currentMonthEmissions = currentMonthData.reduce((sum, item) => sum + parseFloat(item.emission), 0);
  const avgPerEntry = filteredData.length > 0 ? totalEmissions / filteredData.length : 0;

  // No access view
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Lock className="w-8 h-8 md:w-10 md:h-10 text-neutral-400" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-neutral-900 mb-2 md:mb-3">Access Restricted</h2>
          <p className="text-sm md:text-base text-neutral-600 font-bold mb-4 md:mb-6">
            You don't have permission to view {scopeName} emissions data. Please contact your branch administrator to request access.
          </p>
          <Button
            onClick={() => navigate("/branch-user/dashboard")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black"
          >
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Success Banner - Data Available */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl md:rounded-3xl p-4 md:p-6 text-white shadow-xl"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shrink-0">
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-black mb-1">✓ Emissions Data Loaded Successfully!</h3>
            <p className="text-xs md:text-sm text-emerald-50 font-bold">
              You are viewing {scopeName} with {filteredData.length} emission records. {canEdit ? "You can add, edit, and manage entries." : "You have view-only access."}
            </p>
          </div>
          <Badge className="bg-white text-emerald-600 font-black hidden sm:block">
            ACTIVE
          </Badge>
        </div>
      </motion.div>

      {/* Header */}
      <div className={`bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 ${borderColor} shadow-sm`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Badge variant="outline" className={`${iconColor} ${borderColor} ${bgColor} font-black text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1`}>
                Scope {scopeNumber}
              </Badge>
              <Badge variant="outline" className={canEdit ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-blue-200 bg-blue-50 text-blue-700"}>
                {canEdit ? "Edit Access" : "View Only"}
              </Badge>
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                ✓ {filteredData.length} Records Available
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-neutral-900 mb-2">{scopeName}</h1>
            <p className="text-sm md:text-base text-neutral-600 font-bold mb-3">{scopeDescription}</p>
            <div className="flex items-center gap-2 text-neutral-500">
              <Shield className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm font-bold">
                Branch: {branchUserData.branchName || "Your Branch"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {canEdit && (
              <Button
                onClick={() => toast.success("Add entry modal would open here")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center gap-2 text-xs md:text-sm"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                Add Entry
              </Button>
            )}
            <Button
              variant="outline"
              className="font-black flex items-center gap-2 text-xs md:text-sm"
            >
              <Download className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              variant="outline"
              className="font-black flex items-center gap-2 text-xs md:text-sm"
            >
              <Upload className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Import</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-neutral-100 shadow-sm hover:shadow-md transition-all"
        >
          <p className="text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide mb-1 md:mb-2">Total Emissions</p>
          <p className="text-2xl md:text-3xl font-black text-neutral-900 mb-0.5 md:mb-1">{totalEmissions.toFixed(1)}</p>
          <p className="text-xs md:text-sm text-neutral-500 font-bold">tCO2e</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-neutral-100 shadow-sm hover:shadow-md transition-all"
        >
          <p className="text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide mb-1 md:mb-2">Total Entries</p>
          <p className="text-2xl md:text-3xl font-black text-neutral-900 mb-0.5 md:mb-1">{filteredData.length}</p>
          <p className="text-xs md:text-sm text-neutral-500 font-bold">Records</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-neutral-100 shadow-sm hover:shadow-md transition-all"
        >
          <p className="text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide mb-1 md:mb-2">This Month</p>
          <p className="text-2xl md:text-3xl font-black text-neutral-900 mb-0.5 md:mb-1">{currentMonthEmissions.toFixed(1)}</p>
          <p className="text-xs md:text-sm text-neutral-500 font-bold">tCO2e</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-neutral-100 shadow-sm hover:shadow-md transition-all"
        >
          <p className="text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide mb-1 md:mb-2">Avg per Entry</p>
          <p className="text-2xl md:text-3xl font-black text-neutral-900 mb-0.5 md:mb-1">{avgPerEntry.toFixed(1)}</p>
          <p className="text-xs md:text-sm text-neutral-500 font-bold">tCO2e</p>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-neutral-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by category or invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 bg-neutral-50 border-2 border-neutral-200 rounded-lg md:rounded-xl font-bold text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <Button variant="outline" className="font-black flex items-center gap-2 text-xs md:text-sm">
            <Filter className="w-3 h-3 md:w-4 md:h-4" />
            Filters
          </Button>
          <Button variant="outline" className="font-black flex items-center gap-2 text-xs md:text-sm">
            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Date Range</span>
          </Button>
        </div>
      </div>

      {/* Data Table - Desktop */}
      <div className="hidden md:block bg-white rounded-xl md:rounded-2xl border-2 border-neutral-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b-2 border-neutral-100">
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">SR. NO.</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Year</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Month</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Category</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Input Date</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Invoice/Bill</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Activity Data</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Emission (tCO2e)</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Status</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {paginatedData.map((item, index) => (
                <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="font-black text-sm md:text-base text-neutral-900">{startIndex + index + 1}</span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="font-bold text-xs md:text-sm text-neutral-700">{item.year}</span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="font-bold text-xs md:text-sm text-neutral-700">{item.month}</span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="font-bold text-xs md:text-sm text-neutral-900">{item.category}</span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="font-bold text-xs md:text-sm text-neutral-700">{item.inputDate}</span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="font-mono text-xs font-bold text-neutral-600">{item.invoice}</span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="font-bold text-xs md:text-sm text-neutral-700">{item.activityData}</span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="font-black text-base md:text-lg text-neutral-900">{item.emission}</span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    {item.status === "approved" ? (
                      <div className="flex items-center gap-1.5 md:gap-2 text-emerald-600">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-xs md:text-sm font-bold">Approved</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 md:gap-2 text-amber-600">
                        <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-xs md:text-sm font-bold">Pending</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-1 md:gap-2">
                      <button
                        className="p-1.5 md:p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                        title="View Details"
                      >
                        <Eye className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                      </button>
                      {canEdit && (
                        <>
                          <button
                            className="p-1.5 md:p-2 hover:bg-emerald-50 rounded-lg transition-colors group"
                            title="Edit Entry"
                          >
                            <Edit className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
                          </button>
                          <button
                            className="p-1.5 md:p-2 hover:bg-red-50 rounded-lg transition-colors group"
                            title="Delete Entry"
                          >
                            <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 md:px-6 py-3 md:py-4 border-t-2 border-neutral-100 bg-neutral-50">
            <p className="text-xs md:text-sm text-neutral-600 font-bold">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
            </p>
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1.5 md:p-2 hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-black text-xs md:text-sm transition-colors ${
                    currentPage === page
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 md:p-2 hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-4 border-2 border-neutral-100 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <Badge className={`${bgColor} ${iconColor} ${borderColor} font-black text-xs`}>
                #{startIndex + index + 1}
              </Badge>
              {item.status === "approved" ? (
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">Approved</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-amber-600">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">Pending</span>
                </div>
              )}
            </div>

            <h3 className="font-black text-neutral-900 mb-2">{item.category}</h3>

            <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
              <div>
                <p className="text-neutral-500 font-bold mb-1">Date</p>
                <p className="font-black text-neutral-900">{item.inputDate}</p>
              </div>
              <div>
                <p className="text-neutral-500 font-bold mb-1">Invoice</p>
                <p className="font-mono font-bold text-neutral-700">{item.invoice}</p>
              </div>
              <div>
                <p className="text-neutral-500 font-bold mb-1">Activity</p>
                <p className="font-bold text-neutral-900">{item.activityData}</p>
              </div>
              <div>
                <p className="text-neutral-500 font-bold mb-1">Emissions</p>
                <p className="font-black text-lg text-emerald-600">{item.emission} tCO2e</p>
              </div>
            </div>

            {canEdit && (
              <div className="flex items-center gap-2 pt-3 border-t border-neutral-100">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 font-bold text-xs transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-emerald-600 font-bold text-xs transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 font-bold text-xs transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            )}
          </motion.div>
        ))}

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-neutral-200 rounded-lg font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="text-sm font-bold text-neutral-600">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-neutral-200 rounded-lg font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Info Banner */}
      {!canEdit && (
        <div className="bg-blue-50 border-2 border-blue-100 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="p-2 md:p-3 bg-blue-100 rounded-xl shrink-0">
              <Eye className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-black text-sm md:text-base text-neutral-900 mb-1 md:mb-2">View-Only Access</h3>
              <p className="text-xs md:text-sm text-neutral-700 font-bold">
                You have view-only permission for {scopeName}. To add or edit entries, please contact your branch administrator to upgrade your access level.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}