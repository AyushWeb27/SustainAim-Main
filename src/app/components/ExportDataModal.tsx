import React, { useState } from "react";
import { X, Download, FileText, Table, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  branchName: string;
  onExport: (options: any) => void;
}

export function ExportDataModal({ isOpen, onClose, branchName, onExport }: ExportDataModalProps) {
  const [exportFormat, setExportFormat] = useState("csv");
  const [dateRange, setDateRange] = useState("all");
  const [selectedData, setSelectedData] = useState({
    branchInfo: true,
    users: true,
    scope1: true,
    scope2: true,
    scope3: true,
    summary: true,
  });

  const handleDataToggle = (key: string, checked: boolean) => {
    setSelectedData({
      ...selectedData,
      [key]: checked,
    });
  };

  const handleExport = () => {
    const exportOptions = {
      format: exportFormat,
      dateRange,
      data: selectedData,
    };
    onExport(exportOptions);
    onClose();
  };

  const getSelectedCount = () => {
    return Object.values(selectedData).filter(Boolean).length;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
              <Download className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-black text-2xl text-neutral-900 dark:text-white">Export Data</h2>
              <p className="text-sm text-neutral-500 mt-1">
                Export data from <span className="font-bold text-emerald-600">{branchName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Export Format */}
            <div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-4">Export Format</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setExportFormat("csv")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    exportFormat === "csv"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      exportFormat === "csv" ? "bg-emerald-600" : "bg-neutral-200 dark:bg-neutral-700"
                    }`}>
                      <Table className={`w-5 h-5 ${exportFormat === "csv" ? "text-white" : "text-neutral-600 dark:text-neutral-300"}`} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-neutral-900 dark:text-white">CSV File</p>
                      <p className="text-xs text-neutral-500">Spreadsheet format</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setExportFormat("pdf")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    exportFormat === "pdf"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      exportFormat === "pdf" ? "bg-emerald-600" : "bg-neutral-200 dark:bg-neutral-700"
                    }`}>
                      <FileText className={`w-5 h-5 ${exportFormat === "pdf" ? "text-white" : "text-neutral-600 dark:text-neutral-300"}`} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-neutral-900 dark:text-white">PDF Report</p>
                      <p className="text-xs text-neutral-500">Document format</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setExportFormat("excel")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    exportFormat === "excel"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      exportFormat === "excel" ? "bg-emerald-600" : "bg-neutral-200 dark:bg-neutral-700"
                    }`}>
                      <Table className={`w-5 h-5 ${exportFormat === "excel" ? "text-white" : "text-neutral-600 dark:text-neutral-300"}`} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-neutral-900 dark:text-white">Excel File</p>
                      <p className="text-xs text-neutral-500">Multiple sheets</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setExportFormat("json")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    exportFormat === "json"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      exportFormat === "json" ? "bg-emerald-600" : "bg-neutral-200 dark:bg-neutral-700"
                    }`}>
                      <FileText className={`w-5 h-5 ${exportFormat === "json" ? "text-white" : "text-neutral-600 dark:text-neutral-300"}`} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-neutral-900 dark:text-white">JSON Data</p>
                      <p className="text-xs text-neutral-500">Raw data format</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Date Range */}
            <div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-4">Date Range</h3>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="quarter">Last 3 Months</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data Selection */}
            <div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-4">Select Data to Export</h3>
              <div className="space-y-3">
                {/* Branch Information */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="branchInfo"
                      checked={selectedData.branchInfo}
                      onCheckedChange={(checked) => handleDataToggle("branchInfo", checked as boolean)}
                    />
                    <Label htmlFor="branchInfo" className="cursor-pointer">
                      <p className="font-bold text-neutral-900 dark:text-white">Branch Information</p>
                      <p className="text-xs text-neutral-500">Basic details, location, contact info</p>
                    </Label>
                  </div>
                  {selectedData.branchInfo && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </div>

                {/* Users Data */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="users"
                      checked={selectedData.users}
                      onCheckedChange={(checked) => handleDataToggle("users", checked as boolean)}
                    />
                    <Label htmlFor="users" className="cursor-pointer">
                      <p className="font-bold text-neutral-900 dark:text-white">Users & Permissions</p>
                      <p className="text-xs text-neutral-500">Assigned users and their access levels</p>
                    </Label>
                  </div>
                  {selectedData.users && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </div>

                {/* Scope 1 */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="scope1"
                      checked={selectedData.scope1}
                      onCheckedChange={(checked) => handleDataToggle("scope1", checked as boolean)}
                    />
                    <Label htmlFor="scope1" className="cursor-pointer">
                      <p className="font-bold text-neutral-900 dark:text-white">Scope 1 Emissions</p>
                      <p className="text-xs text-neutral-500">Direct emissions data</p>
                    </Label>
                  </div>
                  {selectedData.scope1 && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </div>

                {/* Scope 2 */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="scope2"
                      checked={selectedData.scope2}
                      onCheckedChange={(checked) => handleDataToggle("scope2", checked as boolean)}
                    />
                    <Label htmlFor="scope2" className="cursor-pointer">
                      <p className="font-bold text-neutral-900 dark:text-white">Scope 2 Emissions</p>
                      <p className="text-xs text-neutral-500">Indirect emissions data</p>
                    </Label>
                  </div>
                  {selectedData.scope2 && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </div>

                {/* Scope 3 */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="scope3"
                      checked={selectedData.scope3}
                      onCheckedChange={(checked) => handleDataToggle("scope3", checked as boolean)}
                    />
                    <Label htmlFor="scope3" className="cursor-pointer">
                      <p className="font-bold text-neutral-900 dark:text-white">Scope 3 Emissions</p>
                      <p className="text-xs text-neutral-500">Value chain emissions data</p>
                    </Label>
                  </div>
                  {selectedData.scope3 && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </div>

                {/* Summary */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="summary"
                      checked={selectedData.summary}
                      onCheckedChange={(checked) => handleDataToggle("summary", checked as boolean)}
                    />
                    <Label htmlFor="summary" className="cursor-pointer">
                      <p className="font-bold text-neutral-900 dark:text-white">Summary & Analytics</p>
                      <p className="text-xs text-neutral-500">Total emissions and statistics</p>
                    </Label>
                  </div>
                  {selectedData.summary && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-100 dark:border-neutral-700">
          <div>
            <p className="text-sm font-bold text-neutral-900 dark:text-white">
              {getSelectedCount()} data sections selected
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              Export format: {exportFormat.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={getSelectedCount() === 0}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
