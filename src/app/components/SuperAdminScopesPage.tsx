import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Save,
  AlertCircle,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface Scope {
  id: number;
  name: string;
  description: string;
  emissionType: string;
  color: string;
  status: "Active" | "Inactive";
  categoriesCount: number;
  createdAt: string;
}

export function SuperAdminScopesPage() {
  const [scopes, setScopes] = useState<Scope[]>([
    {
      id: 1,
      name: "Scope 1",
      description: "Direct GHG emissions from owned or controlled sources",
      emissionType: "Direct Emissions",
      color: "emerald",
      status: "Active",
      categoriesCount: 3,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Scope 2",
      description: "Indirect GHG emissions from purchased electricity, steam, heating & cooling",
      emissionType: "Energy Indirect",
      color: "blue",
      status: "Active",
      categoriesCount: 3,
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      name: "Scope 3",
      description: "All other indirect emissions in the value chain",
      emissionType: "Other Indirect",
      color: "purple",
      status: "Active",
      categoriesCount: 5,
      createdAt: "2024-01-15",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScope, setEditingScope] = useState<Scope | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    emissionType: "",
    color: "emerald",
    status: "Active" as "Active" | "Inactive",
  });

  const colors = [
    { name: "Emerald", value: "emerald" },
    { name: "Blue", value: "blue" },
    { name: "Purple", value: "purple" },
    { name: "Amber", value: "amber" },
    { name: "Rose", value: "rose" },
    { name: "Cyan", value: "cyan" },
  ];

  const handleOpenModal = (scope?: Scope) => {
    if (scope) {
      setEditingScope(scope);
      setFormData({
        name: scope.name,
        description: scope.description,
        emissionType: scope.emissionType,
        color: scope.color,
        status: scope.status,
      });
    } else {
      setEditingScope(null);
      setFormData({
        name: "",
        description: "",
        emissionType: "",
        color: "emerald",
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingScope(null);
    setFormData({
      name: "",
      description: "",
      emissionType: "",
      color: "emerald",
      status: "Active",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingScope) {
      setScopes(
        scopes.map((scope) =>
          scope.id === editingScope.id
            ? {
                ...scope,
                ...formData,
              }
            : scope
        )
      );
      toast.success("Scope updated successfully!");
    } else {
      const newScope: Scope = {
        id: Math.max(...scopes.map((s) => s.id), 0) + 1,
        ...formData,
        categoriesCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setScopes([...scopes, newScope]);
      toast.success("Scope created successfully!");
    }

    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this scope?")) {
      setScopes(scopes.filter((scope) => scope.id !== id));
      toast.success("Scope deleted successfully!");
    }
  };

  const filteredScopes = scopes.filter(
    (scope) =>
      scope.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scope.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scope.emissionType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search scopes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-200"
        >
          <Plus className="w-5 h-5" />
          Add Scope
        </button>
      </div>

      {/* Scopes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScopes.map((scope, idx) => (
          <motion.div
            key={scope.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-xl ${
                  scope.color === "emerald"
                    ? "bg-emerald-50"
                    : scope.color === "blue"
                    ? "bg-blue-50"
                    : scope.color === "purple"
                    ? "bg-purple-50"
                    : scope.color === "amber"
                    ? "bg-amber-50"
                    : scope.color === "rose"
                    ? "bg-rose-50"
                    : "bg-cyan-50"
                }`}
              >
                <Layers
                  className={`w-6 h-6 ${
                    scope.color === "emerald"
                      ? "text-emerald-600"
                      : scope.color === "blue"
                      ? "text-blue-600"
                      : scope.color === "purple"
                      ? "text-purple-600"
                      : scope.color === "amber"
                      ? "text-amber-600"
                      : scope.color === "rose"
                      ? "text-rose-600"
                      : "text-cyan-600"
                  }`}
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(scope)}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(scope.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-black text-neutral-900 mb-2">
              {scope.name}
            </h3>
            <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
              {scope.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">
                  Type
                </span>
                <span className="text-sm font-bold text-neutral-900">
                  {scope.emissionType}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">
                  Categories
                </span>
                <span className="text-sm font-bold text-neutral-900">
                  {scope.categoriesCount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">
                  Status
                </span>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-black ${
                    scope.status === "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {scope.status}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-200">
              <p className="text-xs text-neutral-400">
                Created on {new Date(scope.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredScopes.length === 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
          <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-lg font-bold text-neutral-900 mb-2">
            No scopes found
          </p>
          <p className="text-sm text-neutral-500">
            Try adjusting your search or create a new scope
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
                    {editingScope ? "Edit Scope" : "Add New Scope"}
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
                      Scope Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Scope 1, Scope 2"
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
                      placeholder="Describe this scope..."
                      rows={3}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-widest">
                      Emission Type *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.emissionType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emissionType: e.target.value,
                        })
                      }
                      placeholder="e.g., Direct Emissions, Energy Indirect"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2 uppercase tracking-widest">
                      Color Theme
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, color: color.value })
                          }
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.color === color.value
                              ? color.value === "emerald"
                                ? "border-emerald-600 bg-emerald-50"
                                : color.value === "blue"
                                ? "border-blue-600 bg-blue-50"
                                : color.value === "purple"
                                ? "border-purple-600 bg-purple-50"
                                : color.value === "amber"
                                ? "border-amber-600 bg-amber-50"
                                : color.value === "rose"
                                ? "border-rose-600 bg-rose-50"
                                : "border-cyan-600 bg-cyan-50"
                              : "border-neutral-200 bg-white hover:border-neutral-300"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg mx-auto mb-2 ${
                              color.value === "emerald"
                                ? "bg-emerald-600"
                                : color.value === "blue"
                                ? "bg-blue-600"
                                : color.value === "purple"
                                ? "bg-purple-600"
                                : color.value === "amber"
                                ? "bg-amber-600"
                                : color.value === "rose"
                                ? "bg-rose-600"
                                : "bg-cyan-600"
                            }`}
                          ></div>
                          <p className="text-xs font-bold text-neutral-900 text-center">
                            {color.name}
                          </p>
                        </button>
                      ))}
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
                      {editingScope ? "Update Scope" : "Create Scope"}
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
