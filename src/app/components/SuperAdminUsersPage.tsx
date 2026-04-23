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
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  MoreVertical,
  MapPin,
  AlertTriangle,
  Ban,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface UnpaidUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Pending" | "Trial" | "Expired";
  registeredDate: string;
  lastActive: string;
  trialEndsOn?: string;
  address: string;
  country: string;
}

export function SuperAdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("view");
  const [selectedUser, setSelectedUser] = useState<UnpaidUser | null>(null);

  // Mock unpaid users data
  const [users, setUsers] = useState<UnpaidUser[]>([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 12345",
      status: "Trial",
      registeredDate: "2026-03-20",
      lastActive: "2 hours ago",
      trialEndsOn: "2026-03-27",
      address: "Mumbai, Maharashtra",
      country: "India",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 67890",
      status: "Pending",
      registeredDate: "2026-03-25",
      lastActive: "1 day ago",
      address: "Delhi, NCR",
      country: "India",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@example.com",
      phone: "+91 98765 11223",
      status: "Expired",
      registeredDate: "2026-03-10",
      lastActive: "5 days ago",
      trialEndsOn: "2026-03-24",
      address: "Bangalore, Karnataka",
      country: "India",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      phone: "+91 98765 44556",
      status: "Trial",
      registeredDate: "2026-03-22",
      lastActive: "3 hours ago",
      trialEndsOn: "2026-03-29",
      address: "Hyderabad, Telangana",
      country: "India",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      phone: "+91 98765 77889",
      status: "Pending",
      registeredDate: "2026-03-26",
      lastActive: "30 min ago",
      address: "Pune, Maharashtra",
      country: "India",
    },
    {
      id: 6,
      name: "Ananya Iyer",
      email: "ananya.iyer@example.com",
      phone: "+91 98765 99001",
      status: "Expired",
      registeredDate: "2026-03-05",
      lastActive: "1 week ago",
      trialEndsOn: "2026-03-19",
      address: "Chennai, Tamil Nadu",
      country: "India",
    },
  ]);

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    const matchesStatus = filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Trial":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Expired":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Trial":
        return <Clock className="w-3.5 h-3.5" />;
      case "Pending":
        return <AlertTriangle className="w-3.5 h-3.5" />;
      case "Expired":
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const handleViewUser = (user: UnpaidUser) => {
    setSelectedUser(user);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEditUser = (user: UnpaidUser) => {
    setSelectedUser(user);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
      toast.success("User deleted successfully");
    }
  };

  const handleApproveUser = (userId: number) => {
    toast.success("User approved and redirected to subscription page");
  };

  const handleRejectUser = (userId: number) => {
    if (confirm("Are you sure you want to reject this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
      toast.success("User rejected");
    }
  };

  const stats = [
    {
      label: "Total Unpaid Users",
      value: users.length,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Trial Users",
      value: users.filter((u) => u.status === "Trial").length,
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      label: "Pending Users",
      value: users.filter((u) => u.status === "Pending").length,
      icon: AlertTriangle,
      color: "bg-orange-500",
    },
    {
      label: "Expired Users",
      value: users.filter((u) => u.status === "Expired").length,
      icon: XCircle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-neutral-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl font-black text-neutral-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-neutral-200 shadow-sm"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-neutral-900">Unpaid Users</h2>
              <p className="text-sm text-neutral-500 font-bold mt-1">
                Manage users who haven't subscribed yet
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setModalMode("add");
                  setSelectedUser(null);
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/30"
              >
                <UserPlus className="w-4 h-4" />
                Add User
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-neutral-200 text-neutral-700 rounded-xl font-black text-sm hover:border-emerald-300 transition-all">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-neutral-200 bg-neutral-50/50">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone..."
                className="w-full pl-10 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl text-sm font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border-2 border-neutral-200 rounded-xl text-sm font-bold bg-white hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Trial">Trial</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left p-4 text-xs font-black text-neutral-600 uppercase tracking-widest">
                  User
                </th>
                <th className="text-left p-4 text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Contact
                </th>
                <th className="text-left p-4 text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Status
                </th>
                <th className="text-left p-4 text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Registered
                </th>
                <th className="text-left p-4 text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Last Active
                </th>
                <th className="text-left p-4 text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Location
                </th>
                <th className="text-right p-4 text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-black text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900 text-sm">{user.name}</p>
                        <p className="text-xs text-neutral-500 font-medium">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-neutral-700 font-medium">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-neutral-700 font-medium">{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black border ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {getStatusIcon(user.status)}
                        {user.status}
                      </span>
                      {user.trialEndsOn && user.status === "Trial" && (
                        <p className="text-xs text-neutral-500 font-bold">
                          Ends: {user.trialEndsOn}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-neutral-700 font-medium">{user.registeredDate}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-neutral-700 font-medium">{user.lastActive}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-neutral-700 font-medium">{user.address}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {user.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApproveUser(user.id)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            title="Approve User"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRejectUser(user.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Reject User"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500 font-bold">No users found</p>
              <p className="text-neutral-400 text-sm mt-1">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <p className="text-sm text-neutral-600 font-bold">
            Showing <span className="text-neutral-900 font-black">{filteredUsers.length}</span> of{" "}
            <span className="text-neutral-900 font-black">{users.length}</span> users
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border-2 border-neutral-200 rounded-lg text-xs font-black text-neutral-400 bg-white hover:border-emerald-300 disabled:opacity-50 transition-all">
              Previous
            </button>
            <button className="px-4 py-2 bg-emerald-600 border-2 border-emerald-600 rounded-lg text-xs font-black text-white hover:bg-emerald-700 transition-all">
              1
            </button>
            <button className="px-4 py-2 border-2 border-neutral-200 rounded-lg text-xs font-black text-neutral-600 bg-white hover:border-emerald-300 transition-all">
              2
            </button>
            <button className="px-4 py-2 border-2 border-neutral-200 rounded-lg text-xs font-black text-neutral-600 bg-white hover:border-emerald-300 transition-all">
              Next
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal for View/Edit/Add */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <h3 className="text-xl font-black text-neutral-900">
                  {modalMode === "add" && "Add New User"}
                  {modalMode === "edit" && "Edit User"}
                  {modalMode === "view" && "User Details"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {selectedUser && modalMode === "view" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-black text-2xl">
                        {selectedUser.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-neutral-900">{selectedUser.name}</h4>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black border mt-1 ${getStatusColor(
                            selectedUser.status
                          )}`}
                        >
                          {getStatusIcon(selectedUser.status)}
                          {selectedUser.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                          Email
                        </p>
                        <p className="text-sm font-bold text-neutral-900">{selectedUser.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                          Phone
                        </p>
                        <p className="text-sm font-bold text-neutral-900">{selectedUser.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                          Registered Date
                        </p>
                        <p className="text-sm font-bold text-neutral-900">
                          {selectedUser.registeredDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                          Last Active
                        </p>
                        <p className="text-sm font-bold text-neutral-900">
                          {selectedUser.lastActive}
                        </p>
                      </div>
                      {selectedUser.trialEndsOn && (
                        <div>
                          <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                            Trial Ends On
                          </p>
                          <p className="text-sm font-bold text-neutral-900">
                            {selectedUser.trialEndsOn}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                          Location
                        </p>
                        <p className="text-sm font-bold text-neutral-900">{selectedUser.address}</p>
                      </div>
                    </div>
                  </div>
                )}

                {(modalMode === "add" || modalMode === "edit") && (
                  <form className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-neutral-600 uppercase tracking-widest mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedUser?.name}
                        className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-xl font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-neutral-600 uppercase tracking-widest mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={selectedUser?.email}
                        className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-xl font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-neutral-600 uppercase tracking-widest mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue={selectedUser?.phone}
                        className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-xl font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-neutral-600 uppercase tracking-widest mb-2">
                        Status
                      </label>
                      <select
                        defaultValue={selectedUser?.status}
                        className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-xl font-bold bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer"
                      >
                        <option value="Trial">Trial</option>
                        <option value="Pending">Pending</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-neutral-600 uppercase tracking-widest mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedUser?.address}
                        className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-xl font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 border-2 border-neutral-200 text-neutral-700 rounded-xl font-black text-sm hover:border-neutral-300 transition-all"
                >
                  {modalMode === "view" ? "Close" : "Cancel"}
                </button>
                {(modalMode === "add" || modalMode === "edit") && (
                  <button
                    onClick={() => {
                      toast.success(
                        modalMode === "add" ? "User added successfully" : "User updated successfully"
                      );
                      setShowModal(false);
                    }}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all"
                  >
                    {modalMode === "add" ? "Add User" : "Save Changes"}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
