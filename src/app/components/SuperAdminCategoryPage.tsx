import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Save,
  AlertCircle,
  FolderTree,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
  description: string;
  scopeId: number;
  scopeName: string;
  emissionFactor: string;
  unit: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

interface Scope {
  id: number;
  name: string;
  color: string;
}

export function SuperAdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([
    // Scope 1 Categories
    {
      id: 1,
      name: "Fossil Fuel",
      description: "Direct emissions from fossil fuel combustion in owned or controlled sources",
      scopeId: 1,
      scopeName: "Scope 1",
      emissionFactor: "2.68",
      unit: "kg CO2e/liter",
      status: "Active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Fugitives",
      description: "Fugitive emissions from intentional or unintentional releases",
      scopeId: 1,
      scopeName: "Scope 1",
      emissionFactor: "1.43",
      unit: "kg CO2e/kg",
      status: "Active",
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      name: "Process Emission",
      description: "Emissions from physical or chemical processing",
      scopeId: 1,
      scopeName: "Scope 1",
      emissionFactor: "2.15",
      unit: "kg CO2e/unit",
      status: "Active",
      createdAt: "2024-01-15",
    },
    // Scope 2 Categories
    {
      id: 4,
      name: "Electricity",
      description: "Indirect emissions from purchased electricity consumption",
      scopeId: 2,
      scopeName: "Scope 2",
      emissionFactor: "0.82",
      unit: "kg CO2e/kWh",
      status: "Active",
      createdAt: "2024-01-15",
    },
    {
      id: 5,
      name: "Steam",
      description: "Emissions from purchased steam for industrial processes",
      scopeId: 2,
      scopeName: "Scope 2",
      emissionFactor: "0.65",
      unit: "kg CO2e/MMBtu",
      status: "Active",
      createdAt: "2024-01-15",
    },
    {
      id: 6,
      name: "Heating & Cooling",
      description: "Emissions from purchased heating and cooling energy",
      scopeId: 2,
      scopeName: "Scope 2",
      emissionFactor: "0.58",
      unit: "kg CO2e/MMBtu",
      status: "Active",
      createdAt: "2024-01-15",
    },
    // Scope 3 Categories
    {
      id: 7,
      name: "Goods & Services",
      description: "Emissions from purchased goods and services in the value chain",
      scopeId: 3,
      scopeName: "Scope 3",
      emissionFactor: "1.25",
      unit: "kg CO2e/USD",
      status: "Active",
      createdAt: "2024-01-15",
    },
    {
      id: 8,
      name: "Transportation & Distribution",
      description: "Upstream and downstream transportation and distribution of products",
      scopeId: 3,
      scopeName: "Scope 3",
      emissionFactor: "0.15",
      unit: "kg CO2e/km",
      status: "Active",
      createdAt: "2024-01-15",
    },
    {
      id: 9,
      name: "Waste",
      description: "Emissions from waste generated in operations and end-of-life treatment",
      scopeId: 3,
      scopeName: "Scope 3",
      emissionFactor: "0.45",
      unit: "kg CO2e/kg",
      status: "Active",
      createdAt: "2024-01-15",
    },
    {
      id: 10,
      name: "Business Travel",
      description: "Emissions from employee business travel activities",
      scopeId: 3,
      scopeName: "Scope 3",
      emissionFactor: "0.18",
      unit: "kg CO2e/km",
      status: "Active",
      createdAt: "2024-01-15",
    },
    {
      id: 11,
      name: "Employee Commuting",
      description: "Emissions from daily employee commuting to and from work",
      scopeId: 3,
      scopeName: "Scope 3",
      emissionFactor: "0.12",
      unit: "kg CO2e/km",
      status: "Active",
      createdAt: "2024-01-15",
    },
  ]);

  const scopes: Scope[] = [
    { id: 1, name: "Scope 1", color: "emerald" },
    { id: 2, name: "Scope 2", color: "blue" },
    { id: 3, name: "Scope 3", color: "purple" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScope, setSelectedScope] = useState<number | "all">("all");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    scopeId: 1,
    emissionFactor: "",
    unit: "",
    status: "Active" as "Active" | "Inactive",
  });

  const units = [
    "kg CO2e/liter",
    "kg CO2e/kg",
    "kg CO2e/kWh",
    "kg CO2e/MMBtu",
    "kg CO2e/km",
    "kg CO2e/USD",
    "kg CO2e/unit",
  ];

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        scopeId: category.scopeId,
        emissionFactor: category.emissionFactor,
        unit: category.unit,
        status: category.status,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        description: "",
        scopeId: selectedScope === "all" ? 1 : Number(selectedScope),
        emissionFactor: "",
        unit: units[0],
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      scopeId: 1,
      emissionFactor: "",
      unit: units[0],
      status: "Active",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const scopeName = scopes.find((s) => s.id === formData.scopeId)?.name || "";

    if (editingCategory) {
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                ...formData,
                scopeName,
              }
            : category
        )
      );
      toast.success("Category updated successfully!");
    } else {
      const newCategory: Category = {
        id: Math.max(...categories.map((c) => c.id), 0) + 1,
        ...formData,
        scopeName,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCategories([...categories, newCategory]);
      toast.success("Category created successfully!");
    }

    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
      toast.success("Category deleted successfully!");
    }
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.scopeName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesScope =
      selectedScope === "all" || category.scopeId === selectedScope;

    return matchesSearch && matchesScope;
  });

  const getScopeColor = (scopeName: string) => {
    const scope = scopes.find((s) => s.name === scopeName);
    return scope?.color || "neutral";
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters and Add Button */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 sm:flex-initial w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <select
            value={selectedScope}
            onChange={(e) =>
              setSelectedScope(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
            className="w-full sm:w-auto px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          >
            <option value="all">All Scopes</option>
            {scopes.map((scope) => (
              <option key={scope.id} value={scope.id}>
                {scope.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-200"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Categories by Scope */}
      {scopes
        .filter(
          (scope) =>
            selectedScope === "all" || scope.id === selectedScope
        )
        .map((scope) => {
          const scopeCategories = filteredCategories.filter(
            (cat) => cat.scopeId === scope.id
          );

          if (scopeCategories.length === 0) return null;

          return (
            <div key={scope.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    scope.color === "emerald"
                      ? "bg-emerald-50"
                      : scope.color === "blue"
                      ? "bg-blue-50"
                      : "bg-purple-50"
                  }`}
                >
                  <Layers
                    className={`w-5 h-5 ${
                      scope.color === "emerald"
                        ? "text-emerald-600"
                        : scope.color === "blue"
                        ? "text-blue-600"
                        : "text-purple-600"
                    }`}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-black text-neutral-900">
                    {scope.name}
                  </h2>
                  <p className="text-sm text-neutral-500 font-bold">
                    {scopeCategories.length} categories
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scopeCategories.map((category, idx) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl ${
                          getScopeColor(category.scopeName) === "emerald"
                            ? "bg-emerald-50"
                            : getScopeColor(category.scopeName) === "blue"
                            ? "bg-blue-50"
                            : "bg-purple-50"
                        }`}
                      >
                        <FolderTree
                          className={`w-6 h-6 ${
                            getScopeColor(category.scopeName) === "emerald"
                              ? "text-emerald-600"
                              : getScopeColor(category.scopeName) === "blue"
                              ? "text-blue-600"
                              : "text-purple-600"
                          }`}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(category)}
                          className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-neutral-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    <div className="space-y-3">
                      <div className="bg-neutral-50 p-3 rounded-xl">
                        <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                          Emission Factor
                        </p>
                        <p className="text-lg font-black text-neutral-900">
                          {category.emissionFactor}
                          <span className="text-sm text-neutral-500 ml-1">
                            {category.unit}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">
                          Status
                        </span>
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-black ${
                            category.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {category.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <p className="text-xs text-neutral-400">
                        Created on{" "}
                        {new Date(category.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}

      {filteredCategories.length === 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
          <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-lg font-bold text-neutral-900 mb-2">
            No categories found
          </p>
          <p className="text-sm text-neutral-500">
            Try adjusting your filters or create a new category
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                  <h2 className="text-2xl font-black text-neutral-900">
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-widest">
                      Scope *
                    </label>
                    <select
                      required
                      value={formData.scopeId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          scopeId: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    >
                      {scopes.map((scope) => (
                        <option key={scope.id} value={scope.id}>
                          {scope.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-widest">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Stationary Combustion"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-widest">
                      Description *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe this category..."
                      rows={3}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-widest">
                        Emission Factor *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.emissionFactor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emissionFactor: e.target.value,
                          })
                        }
                        placeholder="e.g., 2.32"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-widest">
                        Unit *
                      </label>
                      <select
                        required
                        value={formData.unit}
                        onChange={(e) =>
                          setFormData({ ...formData, unit: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      >
                        {units.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-widest">
                      Status
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, status: "Active" })
                        }
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.status === "Active"
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-neutral-200 bg-white hover:border-neutral-300"
                        }`}
                      >
                        <p className="text-sm font-bold text-neutral-900 text-center">
                          Active
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, status: "Inactive" })
                        }
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.status === "Inactive"
                            ? "border-red-600 bg-red-50"
                            : "border-neutral-200 bg-white hover:border-neutral-300"
                        }`}
                      >
                        <p className="text-sm font-bold text-neutral-900 text-center">
                          Inactive
                        </p>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-6 py-3 border border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-xl font-bold transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-bold transition-all shadow-lg shadow-emerald-200"
                    >
                      <Save className="w-5 h-5" />
                      {editingCategory ? "Update Category" : "Create Category"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
