import React, { useState } from "react";
import { Plus, Activity, Search, Filter, X, Calendar, ChevronDown, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EmissionTable, EmissionRecord } from "./EmissionTable";
import { AddRecordModal } from "./AddRecordModal";
import { EditRecordModal } from "./EditRecordModal";

interface ScopeLayoutProps {
  title: string;
  subtitle: string;
  scopeId: string; // "S1", "S2", "S3"
  scopeType: "Scope 1" | "Scope 2" | "Scope 3";
  records: EmissionRecord[];
  tabs: { name: string; icon: React.ElementType }[];
  themeColor: string; // e.g., "emerald", "blue", "indigo"
  headerBg: string; // e.g., "bg-[#2d6a4f]"
  accentText: string; // e.g., "text-emerald-600"
  totalEmissions: string;
  totalRecords: number;
  onAddRecord?: (record: EmissionRecord) => void;
  onEditRecord?: (record: EmissionRecord) => void;
  onDeleteRecord?: (id: number) => void;
}

export function ScopeLayout({
  title,
  subtitle,
  scopeId,
  scopeType,
  records,
  tabs,
  themeColor,
  headerBg,
  accentText,
  totalEmissions,
  totalRecords,
  onAddRecord,
  onEditRecord,
  onDeleteRecord
}: ScopeLayoutProps) {
  const [activeTab, setActiveTab] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EmissionRecord | null>(null);
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Get unique values for filters
  const uniqueYears = Array.from(new Set(records.map(r => r.year))).sort((a, b) => b - a);
  const uniqueMonths = Array.from(new Set(records.map(r => r.month)));
  const uniqueCategories = Array.from(new Set(records.map(r => r.category)));
  const uniqueBranches = Array.from(new Set(records.map(r => r.branch).filter(Boolean))).sort();

  // Filter and sort records
  const filteredRecords = records.filter(record => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        record.category.toLowerCase().includes(query) ||
        record.invoice.toLowerCase().includes(query) ||
        record.emissions.toLowerCase().includes(query) ||
        record.activityData.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Year filter
    if (selectedYear !== "all" && record.year.toString() !== selectedYear) {
      return false;
    }

    // Month filter
    if (selectedMonth !== "all" && record.month !== selectedMonth) {
      return false;
    }

    // Category filter
    if (selectedCategory !== "all" && record.category !== selectedCategory) {
      return false;
    }

    // Branch filter
    if (selectedBranch !== "all" && record.branch !== selectedBranch) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch(sortBy) {
      case "date-desc":
        return new Date(b.inputDate).getTime() - new Date(a.inputDate).getTime();
      case "date-asc":
        return new Date(a.inputDate).getTime() - new Date(b.inputDate).getTime();
      case "emissions-desc":
        return parseFloat(b.emissions) - parseFloat(a.emissions);
      case "emissions-asc":
        return parseFloat(a.emissions) - parseFloat(b.emissions);
      case "category-asc":
        return a.category.localeCompare(b.category);
      case "category-desc":
        return b.category.localeCompare(a.category);
      default:
        return 0;
    }
  });

  const activeFilterCount = [
    searchQuery,
    selectedYear !== "all",
    selectedMonth !== "all",
    selectedCategory !== "all",
    selectedBranch !== "all",
    dateFrom,
    dateTo
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedYear("all");
    setSelectedMonth("all");
    setSelectedCategory("all");
    setSelectedBranch("all");
    setSortBy("date-desc");
    setDateFrom("");
    setDateTo("");
  };

  const handleAddRecord = (newRecord: EmissionRecord) => {
    if (onAddRecord) {
      onAddRecord(newRecord);
    }
    console.log("New record added:", newRecord);
  };

  const handleEditRecord = (record: EmissionRecord) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleUpdateRecord = (updatedRecord: EmissionRecord) => {
    if (onEditRecord) {
      onEditRecord(updatedRecord);
    }
    console.log("Record updated:", updatedRecord);
  };

  const handleDeleteRecord = (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      if (onDeleteRecord) {
        onDeleteRecord(id);
      }
      console.log("Record deleted:", id);
    }
  };

  const getThemeClasses = () => {
    switch(themeColor) {
      case "emerald": return { text: "text-emerald-700", activeText: "text-emerald-700", iconActive: "text-emerald-600", underline: "bg-emerald-600", border: "border-emerald-600", bg: "bg-emerald-500", header: "bg-emerald-900", lightBg: "hover:bg-emerald-50", btn: "bg-emerald-600 hover:bg-emerald-700", badge: "bg-emerald-50" };
      case "blue": return { text: "text-blue-700", activeText: "text-blue-700", iconActive: "text-blue-600", underline: "bg-blue-600", border: "border-blue-600", bg: "bg-blue-500", header: "bg-blue-900", lightBg: "hover:bg-blue-50", btn: "bg-blue-600 hover:bg-blue-700", badge: "bg-blue-50" };
      case "indigo": return { text: "text-indigo-700", activeText: "text-indigo-700", iconActive: "text-indigo-600", underline: "bg-indigo-600", border: "border-indigo-600", bg: "bg-indigo-500", header: "bg-indigo-900", lightBg: "hover:bg-indigo-50", btn: "bg-indigo-600 hover:bg-indigo-700", badge: "bg-indigo-50" };
      default: return { text: "text-neutral-700", activeText: "text-neutral-700", iconActive: "text-neutral-600", underline: "bg-neutral-600", border: "border-neutral-600", bg: "bg-neutral-500", header: "bg-neutral-900", lightBg: "hover:bg-neutral-50", btn: "bg-neutral-600 hover:bg-neutral-700", badge: "bg-neutral-50" };
    }
  };

  const theme = getThemeClasses();

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 md:p-5 border border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm gap-4"
      >
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className={`w-10 h-10 md:w-12 md:h-12 ${theme.bg} rounded-xl flex items-center justify-center shadow-lg shadow-${themeColor}-200/50 shrink-0`}>
            <span className="text-xs md:text-sm text-white font-bold">{scopeId}</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-lg md:text-xl font-extrabold text-[#1e293b] truncate">{title}</h2>
            <p className="text-neutral-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">Inventory Tracking System</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-50">
          <div className="flex flex-col items-start sm:items-end">
            <p className="text-[9px] md:text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Customer Portal</p>
            <p className="text-xs font-bold text-neutral-900">Active Session</p>
          </div>
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-neutral-100 flex items-center justify-center bg-neutral-50 cursor-pointer hover:border-emerald-200 transition-colors">
            <span className="text-neutral-400 text-xs font-bold">👤</span>
          </div>
        </div>
      </motion.div>

      {/* Tabs Section */}
      <div className="flex items-center gap-8 border-b border-neutral-100 pb-0.5 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 pb-3 px-1 transition-all relative font-bold text-sm whitespace-nowrap ${
              activeTab === tab.name 
                ? theme.activeText 
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.name ? theme.iconActive : "text-neutral-300"}`} />
            {tab.name}
            {activeTab === tab.name && (
              <motion.div 
                layoutId={`activeTabUnderline${scopeId}`}
                className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-full ${theme.underline}`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Filter Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        {/* Filter Header */}
        <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100">
          <div className="flex items-center gap-3 flex-1 w-full">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by category, invoice, emissions..."
                className="w-full pl-10 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl text-sm font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all border-2 ${
                showFilters || activeFilterCount > 0
                  ? `${theme.btn} text-white border-transparent shadow-lg`
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-emerald-300"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-white text-emerald-600 rounded-full text-xs font-black flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 border-2 border-neutral-200 rounded-xl text-sm font-bold bg-white hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="emissions-desc">Highest Emissions</option>
                <option value="emissions-asc">Lowest Emissions</option>
                <option value="category-asc">Category A-Z</option>
                <option value="category-desc">Category Z-A</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl text-sm font-black uppercase tracking-widest transition-all border-2 border-transparent hover:border-red-200"
              >
                <X className="w-4 h-4" />
                <span className="hidden lg:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Expanded Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-neutral-50/50 border-t border-neutral-100">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {/* Year Filter */}
                  <div className="w-full">
                    <label className="block text-xs font-black text-neutral-600 uppercase tracking-widest mb-2">
                      Year
                    </label>
                    <div className="relative">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 border-2 border-neutral-200 rounded-xl text-sm font-bold bg-white hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
                      >
                        <option value="all">All Years</option>
                        {uniqueYears.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Month Filter */}
                  <div className="w-full">
                    <label className="block text-xs font-black text-neutral-600 uppercase tracking-widest mb-2">
                      Month
                    </label>
                    <div className="relative">
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 border-2 border-neutral-200 rounded-xl text-sm font-bold bg-white hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
                      >
                        <option value="all">All Months</option>
                        {uniqueMonths.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="w-full">
                    <label className="block text-xs font-black text-neutral-600 uppercase tracking-widest mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 border-2 border-neutral-200 rounded-xl text-sm font-bold bg-white hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
                      >
                        <option value="all">All Categories</option>
                        {uniqueCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Branch Filter */}
                  <div className="w-full">
                    <label className="block text-xs font-black text-neutral-600 uppercase tracking-widest mb-2">
                      Branch
                    </label>
                    <div className="relative">
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 border-2 border-neutral-200 rounded-xl text-sm font-bold bg-white hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
                      >
                        <option value="all">All Branches</option>
                        {uniqueBranches.map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="w-full">
                    <label className="block text-xs font-black text-neutral-600 uppercase tracking-widest mb-2">
                      Date Range
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        placeholder="From"
                        className="flex-1 px-4 py-2.5 border-2 border-neutral-200 rounded-xl text-xs font-bold bg-white hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all min-w-0"
                      />
                      <span className="text-neutral-400 font-bold text-xs text-center sm:text-left">to</span>
                      <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        placeholder="To"
                        className="flex-1 px-4 py-2.5 border-2 border-neutral-200 rounded-xl text-xs font-bold bg-white hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all min-w-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Filter Summary */}
                {activeFilterCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-4 border-t border-neutral-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-neutral-600 uppercase tracking-widest">
                          Active Filters:
                        </span>
                        {searchQuery && (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-black border border-emerald-200">
                            Search: "{searchQuery}"
                          </span>
                        )}
                        {selectedYear !== "all" && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-black border border-blue-200">
                            Year: {selectedYear}
                          </span>
                        )}
                        {selectedMonth !== "all" && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-black border border-purple-200">
                            Month: {selectedMonth}
                          </span>
                        )}
                        {selectedCategory !== "all" && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-black border border-orange-200">
                            Category: {selectedCategory}
                          </span>
                        )}
                        {selectedBranch !== "all" && (
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-black border border-indigo-200">
                            Branch: {selectedBranch}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-black text-neutral-500">
                        {filteredRecords.length} of {records.length} records
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Content Card */}
      <div className="bg-white rounded-[2rem] md:rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-100/50 overflow-hidden">
        {/* Card Header - Dark themed as per SustainAIM */}
        <div className={`p-6 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8 border-b border-neutral-100 ${theme.header} text-white`}>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl shrink-0">
              <Activity className="text-white w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
              <h3 className="text-xl md:text-3xl font-black">{subtitle}</h3>
              <p className="text-white/60 text-[10px] md:text-sm font-medium leading-tight">Environmental impact monitoring & data management</p>
            </div>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-12 w-full lg:w-auto">
            <div className="text-left sm:text-right flex-1 sm:flex-none">
              <p className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Total Impact</p>
              <div className="flex items-baseline gap-1 justify-start sm:justify-end">
                <span className="text-2xl md:text-4xl font-black text-rose-400">{totalEmissions}</span>
                <span className="text-[10px] md:text-xs font-bold text-rose-300">tCO2e</span>
              </div>
            </div>
            <div className="text-left sm:text-right flex-1 sm:flex-none">
              <p className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Total Records</p>
              <p className="text-2xl md:text-4xl font-black text-white">{totalRecords}</p>
            </div>
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-neutral-900 rounded-xl md:rounded-2xl text-xs md:text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-2xl" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              Add Record
            </button>
          </div>
        </div>

        {/* Reusable Table */}
        <EmissionTable 
          records={filteredRecords} 
          headerColor={headerBg} 
          accentColor={accentText} 
          badgeBg={theme.badge}
          onEdit={handleEditRecord}
          onDelete={handleDeleteRecord}
        />

        {/* Pagination/Footer */}
        <div className="px-6 md:px-8 py-5 bg-neutral-50/80 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] md:text-xs text-neutral-400 font-bold uppercase tracking-wider text-center sm:text-left">
            Showing <span className="text-neutral-900">{records.length}</span> of <span className="text-neutral-900">{totalRecords}</span> entries
          </p>
          <div className="flex gap-2">
            <button className="px-3 md:px-4 py-2 border-2 border-neutral-200 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black text-neutral-400 bg-white disabled:opacity-50" disabled>PREV</button>
            <button className={`px-3 md:px-4 py-2 border-2 ${theme.border} rounded-lg md:rounded-xl text-[10px] md:text-xs font-black text-white ${theme.btn}`}>1</button>
            <button className="px-3 md:px-4 py-2 border-2 border-neutral-200 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black text-neutral-600 bg-white hover:bg-neutral-50">2</button>
            <button className="px-3 md:px-4 py-2 border-2 border-neutral-200 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black text-neutral-600 bg-white hover:bg-neutral-50">NEXT</button>
          </div>
        </div>
      </div>

      {/* Add Record Modal */}
      <AddRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddRecord}
        scopeType={scopeType}
        themeColor={themeColor}
      />

      {/* Edit Record Modal */}
      <EditRecordModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateRecord}
        record={selectedRecord}
        scopeType={scopeType}
        themeColor={themeColor}
      />
    </div>
  );
}