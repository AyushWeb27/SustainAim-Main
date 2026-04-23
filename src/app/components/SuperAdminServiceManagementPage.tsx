import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, FileText, Eye, Save, X } from "lucide-react";
import { motion } from "motion/react";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
  color: string;
  status: "Active" | "Draft" | "Archived";
  createdDate: string;
  updatedDate: string;
}

export function SuperAdminServiceManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Draft" | "Archived">("All");

  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: "Climate Change",
      description: "Leading the charge in climate action, we pioneer innovative solutions that merge advanced technology with environmental stewardship.",
      image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6",
      icon: "Leaf",
      color: "emerald",
      status: "Active",
      createdDate: "2024-01-15",
      updatedDate: "2024-03-10"
    },
    {
      id: 2,
      title: "Energy Efficiency",
      description: "We revolutionize energy efficiency with advanced technologies and AI-driven solutions, optimizing energy use and reducing waste.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
      icon: "Zap",
      color: "blue",
      status: "Active",
      createdDate: "2024-01-20",
      updatedDate: "2024-03-12"
    },
    {
      id: 3,
      title: "Carbon Markets",
      description: "Our carbon market services facilitate seamless participation in global carbon trading, helping clients meet sustainability goals.",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce",
      icon: "TrendingDown",
      color: "purple",
      status: "Active",
      createdDate: "2024-02-01",
      updatedDate: "2024-03-15"
    },
    {
      id: 4,
      title: "Circular Economy",
      description: "Our services help businesses adopt circular practices that maximize efficiency, minimize environmental impact, and create long-term value.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
      icon: "Recycle",
      color: "green",
      status: "Active",
      createdDate: "2024-02-10",
      updatedDate: "2024-03-18"
    },
    {
      id: 5,
      title: "Waste Management",
      description: "Our services help businesses and communities minimize environmental impact, streamline operations, and promote a sustainable approach.",
      image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f",
      icon: "Trash2",
      color: "amber",
      status: "Active",
      createdDate: "2024-02-15",
      updatedDate: "2024-03-20"
    },
    {
      id: 6,
      title: "Sustainability",
      description: "Our services focus on optimizing resource use, reducing waste, and driving long-term sustainability.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9",
      icon: "Target",
      color: "teal",
      status: "Active",
      createdDate: "2024-02-20",
      updatedDate: "2024-03-22"
    },
    {
      id: 7,
      title: "Environmental Social & Governance",
      description: "Our services help businesses enhance sustainability, promote social responsibility, and ensure transparent governance.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      icon: "Shield",
      color: "indigo",
      status: "Active",
      createdDate: "2024-03-01",
      updatedDate: "2024-03-25"
    },
    {
      id: 8,
      title: "Environmental Health & Safety",
      description: "Our services help businesses minimize risks, comply with regulations, and enhance workplace safety.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
      icon: "AlertTriangle",
      color: "red",
      status: "Active",
      createdDate: "2024-03-05",
      updatedDate: "2024-03-28"
    },
    {
      id: 9,
      title: "Hydrogen Economy",
      description: "Our services support businesses in transitioning to hydrogen-based systems, driving sustainability and reducing emissions.",
      image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d",
      icon: "Droplet",
      color: "cyan",
      status: "Active",
      createdDate: "2024-03-10",
      updatedDate: "2024-03-30"
    },
    {
      id: 10,
      title: "Training and Internship",
      description: "We offer cutting-edge training and support services to equip businesses with the knowledge and tools needed.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
      icon: "BookOpen",
      color: "orange",
      status: "Active",
      createdDate: "2024-03-15",
      updatedDate: "2024-04-01"
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    icon: "Leaf",
    color: "emerald",
    status: "Active" as "Active" | "Draft" | "Archived"
  });

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddService = () => {
    const newService: Service = {
      id: services.length + 1,
      ...formData,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };
    setServices([...services, newService]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditService = () => {
    if (selectedService) {
      setServices(services.map(service => 
        service.id === selectedService.id 
          ? { ...service, ...formData, updatedDate: new Date().toISOString().split('T')[0] }
          : service
      ));
      setIsEditModalOpen(false);
      setSelectedService(null);
      resetForm();
    }
  };

  const handleDeleteService = (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const openEditModal = (service: Service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image,
      icon: service.icon,
      color: service.color,
      status: service.status
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      icon: "Leaf",
      color: "emerald",
      status: "Active"
    });
  };

  const iconOptions = [
    "Leaf", "Zap", "TrendingDown", "Recycle", "Trash2", 
    "Target", "Shield", "AlertTriangle", "Droplet", "BookOpen"
  ];

  const colorOptions = [
    "emerald", "blue", "purple", "green", "amber", 
    "teal", "indigo", "red", "cyan", "orange"
  ];

  const stats = [
    { label: "Total Services", value: services.length, color: "emerald" },
    { label: "Active", value: services.filter(s => s.status === "Active").length, color: "blue" },
    { label: "Draft", value: services.filter(s => s.status === "Draft").length, color: "amber" },
    { label: "Archived", value: services.filter(s => s.status === "Archived").length, color: "neutral" }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm`}
          >
            <p className="text-neutral-500 font-bold text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-black text-${stat.color}-600`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20"
            >
              <Plus className="w-5 h-5" />
              Add Service
            </button>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Icon/Color
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-4 text-right text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-bold text-neutral-900">{service.title}</p>
                        <p className="text-xs text-neutral-500">ID: {service.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-600 line-clamp-2 max-w-md">
                      {service.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 bg-${service.color}-100 text-${service.color}-700 rounded text-xs font-bold`}>
                        {service.icon}
                      </span>
                      <span className={`w-4 h-4 rounded-full bg-${service.color}-500`}></span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        service.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : service.status === "Draft"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600 font-medium">
                    {service.updatedDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(service)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 font-bold">No services found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-neutral-900">
                  {isAddModalOpen ? "Add New Service" : "Edit Service"}
                </h2>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    resetForm();
                  }}
                  className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="Enter service title"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                  placeholder="Enter service description"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    Color
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  >
                    {colorOptions.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  resetForm();
                }}
                className="px-6 py-2.5 border border-neutral-200 text-neutral-700 rounded-xl font-bold text-sm hover:bg-neutral-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={isAddModalOpen ? handleAddService : handleEditService}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20"
              >
                <Save className="w-4 h-4" />
                {isAddModalOpen ? "Add Service" : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
