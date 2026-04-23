import React, { useState, useEffect } from "react";
import { X, Save, Calendar as CalendarIcon, FileText, Activity, TrendingUp, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (record: any) => void;
  scopeType: "Scope 1" | "Scope 2" | "Scope 3";
  themeColor?: string;
  editRecord?: any;
  currentBranchName?: string;
}

export function AddRecordModal({ isOpen, onClose, onSubmit, scopeType, themeColor = "emerald", editRecord, currentBranchName }: AddRecordModalProps) {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    year: currentYear,
    month: "",
    category: "",
    inputDate: "",
    invoice: "",
    activityData: "",
    emissionFactor: "",
    emissions: "",
    branch: currentBranchName || ""
  });

  // Available branches for selection
  const branches = [
    "Mumbai Headquarters",
    "Delhi Regional Office",
    "Bangalore Tech Center",
    "Chennai Factory",
    "Pune Warehouse",
    "Kolkata Service Center"
  ];

  // Populate form when editing
  useEffect(() => {
    if (editRecord) {
      setFormData({
        year: editRecord.year || currentYear,
        month: editRecord.month || "",
        category: editRecord.category || "",
        inputDate: editRecord.inputDate || "",
        invoice: editRecord.invoiceBill || "",
        activityData: editRecord.activity ? `${editRecord.quantity} ${editRecord.unit}` : "",
        emissionFactor: editRecord.emissionFactor?.toString() || "",
        emissions: editRecord.emissions?.toString() || "",
        branch: editRecord.branch || currentBranchName || ""
      });
    } else {
      // Reset to defaults when not editing
      setFormData({
        year: currentYear,
        month: "",
        category: "",
        inputDate: "",
        invoice: "",
        activityData: "",
        emissionFactor: "",
        emissions: "",
        branch: currentBranchName || ""
      });
    }
  }, [editRecord, currentBranchName, isOpen]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const categories = {
    "Scope 1": [
      "Fossil Fuel",
      "Fugitives",
      "Process Emission"
    ],
    "Scope 2": [
      "Electricity",
      "Steam",
      "Heating & Cooling"
    ],
    "Scope 3": [
      "Goods & Services",
      "Transportation & Distribution",
      "Waste",
      "Business Travel",
      "Employee Commuting",
      "Sold Products",
      "Other Assets"
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format input date for display (convert from YYYY-MM-DD to readable format)
    const formattedInputDate = formData.inputDate
      ? new Date(formData.inputDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      : formData.inputDate;

    // Parse activity data to extract quantity and unit
    const activityMatch = formData.activityData.match(/^([\d,\.]+)\s*(.+)$/);
    const quantity = activityMatch ? parseFloat(activityMatch[1].replace(/,/g, '')) : 0;
    const unit = activityMatch ? activityMatch[2].trim() : '';

    // Auto-calculate emissions if activity data and emission factor are provided
    const factorValue = parseFloat(formData.emissionFactor.replace(/[^0-9.]/g, ''));

    let calculatedEmissions = formData.emissions;
    if (quantity && factorValue && !formData.emissions) {
      calculatedEmissions = (quantity * factorValue).toFixed(2);
    } else if (formData.emissions) {
      // Extract numeric value from emissions if it includes unit
      calculatedEmissions = parseFloat(formData.emissions.replace(/[^0-9.]/g, '')).toString();
    }

    const newRecord = {
      id: editRecord?.id || Date.now(),
      year: formData.year.toString(),
      month: formData.month,
      category: formData.category,
      inputDate: formattedInputDate,
      invoiceBill: formData.invoice,
      activity: activityMatch ? activityMatch[2].trim() : formData.activityData,
      quantity: quantity,
      unit: unit,
      emissionFactor: parseFloat(formData.emissionFactor),
      emissions: parseFloat(calculatedEmissions),
      branch: formData.branch,
      source: formData.category // Add source field for compatibility
    };

    onSubmit(newRecord);

    // Reset form
    setFormData({
      year: currentYear,
      month: "",
      category: "",
      inputDate: "",
      invoice: "",
      activityData: "",
      emissionFactor: "",
      emissions: "",
      branch: currentBranchName || ""
    });

    onClose();
  };

  const getThemeClasses = () => {
    switch(themeColor) {
      case "emerald": return { 
        bg: "bg-[#2c7873]", 
        hover: "hover:bg-[#004445]", 
        border: "border-[#2c7873]",
        text: "text-[#2c7873]",
        light: "bg-[#d8f3f3]"
      };
      case "blue": return { 
        bg: "bg-blue-600", 
        hover: "hover:bg-blue-700", 
        border: "border-blue-600",
        text: "text-blue-600",
        light: "bg-blue-50"
      };
      case "indigo": return { 
        bg: "bg-indigo-600", 
        hover: "hover:bg-indigo-700", 
        border: "border-indigo-600",
        text: "text-indigo-600",
        light: "bg-indigo-50"
      };
      default: return { 
        bg: "bg-neutral-600", 
        hover: "hover:bg-neutral-700", 
        border: "border-neutral-600",
        text: "text-neutral-600",
        light: "bg-neutral-50"
      };
    }
  };

  const theme = getThemeClasses();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`${theme.bg} text-white px-8 py-6 rounded-t-3xl flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">{editRecord ? 'Edit Record' : 'Add New Record'}</h2>
                    <p className="text-white/70 text-sm font-medium mt-0.5">{scopeType} Emissions Data Entry</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Branch Selection */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-wide">
                      <Building2 className="w-4 h-4 inline mr-2" />
                      Branch
                    </label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-neutral-900 font-bold focus:outline-none focus:${theme.border} focus:bg-white transition-all`}
                    >
                      <option value="">Select Branch</option>
                      {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-wide">
                      <CalendarIcon className="w-4 h-4 inline mr-2" />
                      Year
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-neutral-900 font-bold focus:outline-none focus:${theme.border} focus:bg-white transition-all`}
                    >
                      {[currentYear, currentYear - 1, currentYear - 2].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  {/* Month */}
                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-wide">
                      <CalendarIcon className="w-4 h-4 inline mr-2" />
                      Month
                    </label>
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-neutral-900 font-bold focus:outline-none focus:${theme.border} focus:bg-white transition-all`}
                    >
                      <option value="">Select Month</option>
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-wide">
                      <Activity className="w-4 h-4 inline mr-2" />
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-neutral-900 font-bold focus:outline-none focus:${theme.border} focus:bg-white transition-all`}
                    >
                      <option value="">Select Category</option>
                      {categories[scopeType].map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Input Date */}
                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-wide">
                      Input Date
                    </label>
                    <input
                      type="date"
                      name="inputDate"
                      value={formData.inputDate}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-neutral-900 font-bold focus:outline-none focus:${theme.border} focus:bg-white transition-all`}
                    />
                  </div>

                  {/* Invoice/Bill ID */}
                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-wide">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Invoice/Bill ID
                    </label>
                    <input
                      type="text"
                      name="invoice"
                      value={formData.invoice}
                      onChange={handleInputChange}
                      placeholder="e.g., GAS-2024-101"
                      required
                      className={`w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-neutral-900 font-bold placeholder-neutral-400 focus:outline-none focus:${theme.border} focus:bg-white transition-all`}
                    />
                  </div>

                  {/* Activity Data */}
                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-wide">
                      <TrendingUp className="w-4 h-4 inline mr-2" />
                      Activity Data
                    </label>
                    <input
                      type="text"
                      name="activityData"
                      value={formData.activityData}
                      onChange={handleInputChange}
                      placeholder="e.g., 5,000 m³ or 1,200 kWh"
                      required
                      className={`w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-neutral-900 font-bold placeholder-neutral-400 focus:outline-none focus:${theme.border} focus:bg-white transition-all`}
                    />
                  </div>

                  {/* Emission Factor */}
                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-wide">
                      Emission Factor
                    </label>
                    <input
                      type="text"
                      name="emissionFactor"
                      value={formData.emissionFactor}
                      onChange={handleInputChange}
                      placeholder="e.g., 2.1 kg CO2e/m³"
                      required
                      className={`w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-neutral-900 font-bold placeholder-neutral-400 focus:outline-none focus:${theme.border} focus:bg-white transition-all`}
                    />
                  </div>

                  {/* Emission (TCO2E) - Optional, can be auto-calculated */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-wide">
                      Emission (tCO2e)
                      <span className="text-neutral-400 font-normal text-xs ml-2">(Optional - Auto-calculated)</span>
                    </label>
                    <input
                      type="text"
                      name="emissions"
                      value={formData.emissions}
                      onChange={handleInputChange}
                      placeholder="e.g., 10.500 tCO2e (or leave blank for auto-calculation)"
                      className={`w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-neutral-900 font-bold placeholder-neutral-400 focus:outline-none focus:${theme.border} focus:bg-white transition-all`}
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-3 bg-neutral-100 text-neutral-700 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`flex items-center gap-3 px-8 py-3 ${theme.bg} ${theme.hover} text-white rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-xl transform hover:scale-105 active:scale-95`}
                  >
                    <Save className="w-5 h-5" />
                    {editRecord ? 'Update Record' : 'Save Record'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}