import React, { useState } from "react";
import {
  Search,
  Filter,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  X,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  Users,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  MoreVertical,
  MapPin,
  Globe,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: "Starter" | "Professional" | "Enterprise";
  status: "Active" | "Inactive" | "Suspended";
  users: number;
  emissionsTracked: string;
  lastActive: string;
  joinedDate: string;
  address: string;
  country: string;
  revenue: string;
  nextBilling: string;
}

export function SuperAdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("view");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Mock customer data
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "TechCorp Global",
      email: "admin@techcorp.com",
      phone: "+91 98765 43210",
      plan: "Enterprise",
      status: "Active",
      users: 450,
      emissionsTracked: "12,450 tCO2e",
      lastActive: "2 hours ago",
      joinedDate: "Jan 15, 2024",
      address: "123 Tech Street, Mumbai",
      country: "India",
      revenue: "₹20,00,000/yr",
      nextBilling: "Apr 15, 2026",
    },
    {
      id: 2,
      name: "GreenManufacturing Inc",
      email: "contact@greenmfg.com",
      phone: "+91 98765 43211",
      plan: "Professional",
      status: "Active",
      users: 120,
      emissionsTracked: "8,230 tCO2e",
      lastActive: "1 day ago",
      joinedDate: "Feb 20, 2024",
      address: "456 Factory Ave, Pune",
      country: "India",
      revenue: "₹5,00,000/yr",
      nextBilling: "May 20, 2026",
    },
    {
      id: 3,
      name: "EcoRetail Solutions",
      email: "admin@ecoretail.com",
      phone: "+91 98765 43212",
      plan: "Professional",
      status: "Active",
      users: 85,
      emissionsTracked: "5,670 tCO2e",
      lastActive: "3 hours ago",
      joinedDate: "Mar 10, 2024",
      address: "789 Retail Blvd, Bangalore",
      country: "India",
      revenue: "₹5,00,000/yr",
      nextBilling: "Jun 10, 2026",
    },
    {
      id: 4,
      name: "Sustainable Logistics",
      email: "info@suslog.com",
      phone: "+91 98765 43213",
      plan: "Starter",
      status: "Active",
      users: 25,
      emissionsTracked: "3,120 tCO2e",
      lastActive: "5 hours ago",
      joinedDate: "Apr 5, 2024",
      address: "321 Logistics Way, Delhi",
      country: "India",
      revenue: "₹1,00,000/yr",
      nextBilling: "Jul 5, 2026",
    },
    {
      id: 5,
      name: "CleanEnergy Partners",
      email: "team@cleanenergy.com",
      phone: "+91 98765 43214",
      plan: "Enterprise",
      status: "Active",
      users: 320,
      emissionsTracked: "15,890 tCO2e",
      lastActive: "30 min ago",
      joinedDate: "Jan 8, 2024",
      address: "555 Energy Plaza, Hyderabad",
      country: "India",
      revenue: "₹20,00,000/yr",
      nextBilling: "Apr 8, 2026",
    },
    {
      id: 6,
      name: "Urban Development Co",
      email: "admin@urbandev.com",
      phone: "+91 98765 43215",
      plan: "Professional",
      status: "Inactive",
      users: 95,
      emissionsTracked: "6,540 tCO2e",
      lastActive: "2 weeks ago",
      joinedDate: "Dec 1, 2023",
      address: "888 Development St, Chennai",
      country: "India",
      revenue: "₹5,00,000/yr",
      nextBilling: "May 1, 2026",
    },
    {
      id: 7,
      name: "Global Shipping Ltd",
      email: "info@globalship.com",
      phone: "+91 98765 43216",
      plan: "Enterprise",
      status: "Active",
      users: 280,
      emissionsTracked: "22,340 tCO2e",
      lastActive: "1 hour ago",
      joinedDate: "Feb 14, 2024",
      address: "12 Harbour View, Gurgaon",
      country: "India",
      revenue: "₹20,00,000/yr",
      nextBilling: "May 14, 2026",
    },
    {
      id: 8,
      name: "FoodService Group",
      email: "contact@foodservice.com",
      phone: "+91 98765 43217",
      plan: "Professional",
      status: "Active",
      users: 140,
      emissionsTracked: "7,890 tCO2e",
      lastActive: "4 hours ago",
      joinedDate: "Mar 22, 2024",
      address: "34 Rue de Commerce, Kolkata",
      country: "India",
      revenue: "₹5,00,000/yr",
      nextBilling: "Jun 22, 2026",
    },
    {
      id: 9,
      name: "Construction Dynamics",
      email: "admin@constructdyn.com",
      phone: "+91 98765 43218",
      plan: "Starter",
      status: "Suspended",
      users: 35,
      emissionsTracked: "4,230 tCO2e",
      lastActive: "1 week ago",
      joinedDate: "Nov 18, 2023",
      address: "999 Build Road, Ahmedabad",
      country: "India",
      revenue: "₹1,00,000/yr",
      nextBilling: "Apr 18, 2026",
    },
    {
      id: 10,
      name: "Digital Solutions AG",
      email: "info@digitalsol.de",
      phone: "+91 98765 43219",
      plan: "Professional",
      status: "Active",
      users: 110,
      emissionsTracked: "4,560 tCO2e",
      lastActive: "6 hours ago",
      joinedDate: "Jan 30, 2024",
      address: "42 Tech Strasse, Jaipur",
      country: "India",
      revenue: "₹5,00,000/yr",
      nextBilling: "Apr 30, 2026",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "Starter",
    status: "Active",
    address: "",
    country: "",
  });

  // Filter customers based on search and filters
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === "all" || customer.plan === filterPlan;
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  // Statistics
  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "Active").length,
    inactive: customers.filter((c) => c.status === "Inactive").length,
    suspended: customers.filter((c) => c.status === "Suspended").length,
    totalRevenue: customers.reduce((acc, c) => acc + parseInt(c.revenue.replace(/[^0-9]/g, "")), 0),
    totalUsers: customers.reduce((acc, c) => acc + c.users, 0),
  };

  const handleOpenModal = (mode: "add" | "edit" | "view", customer?: Customer) => {
    setModalMode(mode);
    if (customer) {
      setSelectedCustomer(customer);
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        plan: customer.plan,
        status: customer.status,
        address: customer.address,
        country: customer.country,
      });
    } else {
      setSelectedCustomer(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        plan: "Starter",
        status: "Active",
        address: "",
        country: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === "add") {
      const newCustomer: Customer = {
        id: customers.length + 1,
        ...formData,
        plan: formData.plan as "Starter" | "Professional" | "Enterprise",
        status: formData.status as "Active" | "Inactive" | "Suspended",
        users: 0,
        emissionsTracked: "0 tCO2e",
        lastActive: "Just now",
        joinedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        revenue: formData.plan === "Enterprise" ? "₹20,00,000/yr" : formData.plan === "Professional" ? "₹5,00,000/yr" : "₹1,00,000/yr",
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };
      setCustomers([...customers, newCustomer]);
      toast.success("Customer added successfully!");
    } else if (modalMode === "edit" && selectedCustomer) {
      setCustomers(
        customers.map((c) =>
          c.id === selectedCustomer.id
            ? {
                ...c,
                ...formData,
                plan: formData.plan as "Starter" | "Professional" | "Enterprise",
                status: formData.status as "Active" | "Inactive" | "Suspended",
                revenue: formData.plan === "Enterprise" ? "₹20,00,000/yr" : formData.plan === "Professional" ? "₹5,00,000/yr" : "₹1,00,000/yr",
              }
            : c
        )
      );
      toast.success("Customer updated successfully!");
    }
    handleCloseModal();
  };

  const handleDelete = (customerId: number) => {
    if (confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
      setCustomers(customers.filter((c) => c.id !== customerId));
      toast.success("Customer deleted successfully!");
      handleCloseModal();
    }
  };

  const handleExport = () => {
    toast.success("Customer data exported successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl border-2 border-neutral-100 shadow-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-emerald-50">
              <Building2 className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
              +12.5%
            </span>
          </div>
          <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
            Total Customers
          </p>
          <p className="text-3xl font-black text-neutral-900">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border-2 border-neutral-100 shadow-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-50">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">
              {((stats.active / stats.total) * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
            Active Customers
          </p>
          <p className="text-3xl font-black text-neutral-900">{stats.active}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border-2 border-neutral-100 shadow-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
              +8.3%
            </span>
          </div>
          <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
            Total Users
          </p>
          <p className="text-3xl font-black text-neutral-900">{stats.totalUsers.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl border-2 border-neutral-100 shadow-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-50">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-black text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
              +18.7%
            </span>
          </div>
          <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
            Annual Revenue
          </p>
          <p className="text-3xl font-black text-neutral-900">${(stats.totalRevenue / 1000).toFixed(0)}K</p>
        </motion.div>
      </div>

      {/* Filters and Actions Bar */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-sm font-bold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Filter by Plan */}
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-sm font-bold text-neutral-900 focus:outline-none focus:border-emerald-500 transition-all"
            >
              <option value="all">All Plans</option>
              <option value="Starter">Starter</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>

            {/* Filter by Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-sm font-bold text-neutral-900 focus:outline-none focus:border-emerald-500 transition-all"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-3 border-2 border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-xl text-sm font-black transition-all"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => handleOpenModal("add")}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-black transition-all shadow-lg shadow-emerald-200"
            >
              <UserPlus className="w-4 h-4" />
              Add Customer
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(filterPlan !== "all" || filterStatus !== "all" || searchQuery) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t-2 border-neutral-100">
            <span className="text-sm font-black text-neutral-600">Active Filters:</span>
            {searchQuery && (
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-black">
                Search: "{searchQuery}"
              </span>
            )}
            {filterPlan !== "all" && (
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-black">
                Plan: {filterPlan}
              </span>
            )}
            {filterStatus !== "all" && (
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-black">
                Status: {filterStatus}
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterPlan("all");
                setFilterStatus("all");
              }}
              className="ml-2 text-xs font-black text-neutral-500 hover:text-neutral-700 underline"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-lg overflow-hidden">
        <div className="p-6 border-b-2 border-neutral-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-neutral-900">Customer Directory</h2>
              <p className="text-sm text-neutral-500 font-bold mt-1">
                Showing {filteredCustomers.length} of {customers.length} customers
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b-2 border-neutral-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Organization
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Users
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Revenue
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-neutral-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-black text-sm text-neutral-900">{customer.name}</p>
                          <p className="text-xs text-neutral-500 font-medium">{customer.country}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-neutral-400" />
                          {customer.email}
                        </p>
                        <p className="text-xs text-neutral-500 font-medium flex items-center gap-2 mt-1">
                          <Phone className="w-3.5 h-3.5 text-neutral-400" />
                          {customer.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-xl text-xs font-black ${
                          customer.plan === "Enterprise"
                            ? "bg-purple-50 text-purple-700 border-2 border-purple-200"
                            : customer.plan === "Professional"
                            ? "bg-blue-50 text-blue-700 border-2 border-blue-200"
                            : "bg-neutral-100 text-neutral-700 border-2 border-neutral-200"
                        }`}
                      >
                        {customer.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-neutral-400" />
                        <p className="text-sm font-black text-neutral-900">{customer.users}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-neutral-900">{customer.revenue}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black ${
                          customer.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border-2 border-emerald-200"
                            : customer.status === "Inactive"
                            ? "bg-neutral-100 text-neutral-700 border-2 border-neutral-200"
                            : "bg-red-50 text-red-700 border-2 border-red-200"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            customer.status === "Active"
                              ? "bg-emerald-500"
                              : customer.status === "Inactive"
                              ? "bg-neutral-500"
                              : "bg-red-500"
                          }`}
                        />
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal("view", customer)}
                          className="p-2 text-neutral-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal("edit", customer)}
                          className="p-2 text-neutral-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                          title="Edit Customer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Customer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center">
                        <Search className="w-8 h-8 text-neutral-400" />
                      </div>
                      <p className="font-black text-neutral-900">No customers found</p>
                      <p className="text-sm text-neutral-500 font-medium">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length > 0 && (
          <div className="p-6 border-t-2 border-neutral-100 flex items-center justify-between">
            <p className="text-sm text-neutral-500 font-bold">
              Showing {filteredCustomers.length} of {customers.length} customers
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border-2 border-neutral-200 rounded-xl text-sm font-black text-neutral-600 hover:bg-neutral-50 transition-all">
                Previous
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl border-2 border-neutral-200 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b-2 border-neutral-100 p-6 flex items-center justify-between z-10">
                  <div>
                    <h2 className="text-2xl font-black text-neutral-900">
                      {modalMode === "add" && "Add New Customer"}
                      {modalMode === "edit" && "Edit Customer"}
                      {modalMode === "view" && "Customer Details"}
                    </h2>
                    <p className="text-sm text-neutral-500 font-bold mt-1">
                      {modalMode === "add" && "Create a new customer account"}
                      {modalMode === "edit" && "Update customer information"}
                      {modalMode === "view" && "View complete customer profile"}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {modalMode === "view" && selectedCustomer ? (
                    <div className="space-y-6">
                      {/* Customer Header */}
                      <div className="flex items-start justify-between p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border-2 border-emerald-200">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-emerald-900">{selectedCustomer.name}</h3>
                            <p className="text-sm text-emerald-700 font-bold mt-1">{selectedCustomer.email}</p>
                          </div>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-xl text-xs font-black ${
                            selectedCustomer.status === "Active"
                              ? "bg-emerald-600 text-white"
                              : selectedCustomer.status === "Inactive"
                              ? "bg-neutral-400 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {selectedCustomer.status}
                        </span>
                      </div>

                      {/* Two Column Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Information */}
                        <div className="space-y-4">
                          <h4 className="font-black text-neutral-900 text-sm uppercase tracking-widest">
                            Contact Information
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100">
                              <Mail className="w-5 h-5 text-neutral-400" />
                              <div>
                                <p className="text-xs text-neutral-500 font-bold">Email</p>
                                <p className="text-sm font-black text-neutral-900">{selectedCustomer.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100">
                              <Phone className="w-5 h-5 text-neutral-400" />
                              <div>
                                <p className="text-xs text-neutral-500 font-bold">Phone</p>
                                <p className="text-sm font-black text-neutral-900">{selectedCustomer.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100">
                              <MapPin className="w-5 h-5 text-neutral-400" />
                              <div>
                                <p className="text-xs text-neutral-500 font-bold">Address</p>
                                <p className="text-sm font-black text-neutral-900">{selectedCustomer.address}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100">
                              <Globe className="w-5 h-5 text-neutral-400" />
                              <div>
                                <p className="text-xs text-neutral-500 font-bold">Country</p>
                                <p className="text-sm font-black text-neutral-900">{selectedCustomer.country}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Subscription Information */}
                        <div className="space-y-4">
                          <h4 className="font-black text-neutral-900 text-sm uppercase tracking-widest">
                            Subscription Details
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                              <CreditCard className="w-5 h-5 text-purple-600" />
                              <div>
                                <p className="text-xs text-purple-700 font-bold">Plan</p>
                                <p className="text-sm font-black text-purple-900">{selectedCustomer.plan}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                              <DollarSign className="w-5 h-5 text-emerald-600" />
                              <div>
                                <p className="text-xs text-emerald-700 font-bold">Revenue</p>
                                <p className="text-sm font-black text-emerald-900">{selectedCustomer.revenue}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                              <Calendar className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="text-xs text-blue-700 font-bold">Next Billing</p>
                                <p className="text-sm font-black text-blue-900">{selectedCustomer.nextBilling}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100">
                              <Calendar className="w-5 h-5 text-neutral-400" />
                              <div>
                                <p className="text-xs text-neutral-500 font-bold">Joined Date</p>
                                <p className="text-sm font-black text-neutral-900">{selectedCustomer.joinedDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Activity & Usage */}
                      <div className="space-y-4">
                        <h4 className="font-black text-neutral-900 text-sm uppercase tracking-widest">
                          Activity & Usage
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Activity className="w-4 h-4 text-emerald-600" />
                              <p className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                                Emissions
                              </p>
                            </div>
                            <p className="text-xl font-black text-emerald-900">{selectedCustomer.emissionsTracked}</p>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="w-4 h-4 text-blue-600" />
                              <p className="text-xs font-black text-blue-700 uppercase tracking-widest">
                                Active Users
                              </p>
                            </div>
                            <p className="text-xl font-black text-blue-900">{selectedCustomer.users}</p>
                          </div>
                          <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-amber-600" />
                              <p className="text-xs font-black text-amber-700 uppercase tracking-widest">
                                Last Active
                              </p>
                            </div>
                            <p className="text-xl font-black text-amber-900">{selectedCustomer.lastActive}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 pt-4 border-t-2 border-neutral-100">
                        <button
                          onClick={() => setModalMode("edit")}
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-black text-sm transition-all shadow-lg shadow-emerald-200"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Customer
                        </button>
                        <button
                          onClick={() => handleDelete(selectedCustomer.id)}
                          className="px-6 py-3 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-black text-sm transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Organization Details */}
                      <div className="space-y-4">
                        <h4 className="font-black text-neutral-900 text-sm uppercase tracking-widest">
                          Organization Details
                        </h4>
                        
                        <div>
                          <label className="block text-sm font-black text-neutral-700 mb-2">
                            Organization Name *
                          </label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Enter organization name"
                              className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-black text-neutral-700 mb-2">
                              Email Address *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="email@company.com"
                                className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-black text-neutral-700 mb-2">
                              Phone Number *
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+1 (555) 123-4567"
                                className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-black text-neutral-700 mb-2">
                            Address
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-neutral-400 w-5 h-5" />
                            <input
                              type="text"
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              placeholder="Street address"
                              className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-black text-neutral-700 mb-2">
                            Country
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                            <input
                              type="text"
                              value={formData.country}
                              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                              placeholder="Country name"
                              className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Subscription Settings */}
                      <div className="space-y-4">
                        <h4 className="font-black text-neutral-900 text-sm uppercase tracking-widest">
                          Subscription Settings
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-black text-neutral-700 mb-2">
                              Subscription Plan *
                            </label>
                            <select
                              value={formData.plan}
                              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:outline-none focus:border-emerald-500 transition-all"
                            >
                              <option value="Starter">Starter - ₹1,00,000/yr</option>
                              <option value="Professional">Professional - ₹5,00,000/yr</option>
                              <option value="Enterprise">Enterprise - ₹20,00,000/yr</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-black text-neutral-700 mb-2">
                              Account Status *
                            </label>
                            <select
                              value={formData.status}
                              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:outline-none focus:border-emerald-500 transition-all"
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Suspended">Suspended</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 pt-4 border-t-2 border-neutral-100">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="flex-1 px-6 py-3 border-2 border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-xl font-black text-sm transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-black text-sm transition-all shadow-lg shadow-emerald-200"
                        >
                          {modalMode === "add" ? "Add Customer" : "Save Changes"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
