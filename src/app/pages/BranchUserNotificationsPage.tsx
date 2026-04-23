import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Zap,
  TrendingUp,
  Target,
  FileText,
  Users,
  Settings,
  Trash2,
  Filter,
  Search,
  Clock,
  X,
  Eye,
  EyeOff,
  Building2,
  Shield,
  AlertCircle,
  Download,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "alert";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: "emissions" | "system" | "reports" | "branch" | "compliance" | "admin";
  priority?: "high" | "medium" | "low";
}

export function BranchUserNotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Scope 1 Data Submitted",
      message: "Your Scope 1 emissions data for March 2026 has been successfully submitted and is pending admin review.",
      timestamp: "2 hours ago",
      read: false,
      category: "emissions",
      priority: "medium"
    },
    {
      id: "2",
      type: "alert",
      title: "Data Submission Deadline Approaching",
      message: "Scope 2 energy consumption data for Q1 2026 must be submitted by April 10, 2026. Only 3 days remaining.",
      timestamp: "5 hours ago",
      read: false,
      category: "emissions",
      priority: "high"
    },
    {
      id: "3",
      type: "warning",
      title: "Incomplete Data Entry",
      message: "Scope 3 transportation data for Week 13 is incomplete. Please complete the entry to ensure accurate reporting.",
      timestamp: "1 day ago",
      read: false,
      category: "emissions",
      priority: "medium"
    },
    {
      id: "4",
      type: "info",
      title: "Branch Monthly Report Available",
      message: "Your branch sustainability report for February 2026 has been generated and is ready for download.",
      timestamp: "2 days ago",
      read: true,
      category: "reports",
      priority: "low"
    },
    {
      id: "5",
      type: "success",
      title: "Permission Update",
      message: "You have been granted Scope 3 view access by the branch administrator.",
      timestamp: "3 days ago",
      read: true,
      category: "admin",
      priority: "medium"
    },
    {
      id: "6",
      type: "info",
      title: "System Maintenance Notice",
      message: "Scheduled maintenance will occur on April 12, 2026 from 2:00 AM - 4:00 AM IST. The system will be unavailable during this time.",
      timestamp: "4 days ago",
      read: true,
      category: "system",
      priority: "medium"
    },
    {
      id: "7",
      type: "success",
      title: "Data Validation Passed",
      message: "Your submitted emissions data for February 2026 has been validated and approved by the administrator.",
      timestamp: "5 days ago",
      read: true,
      category: "compliance",
      priority: "low"
    },
    {
      id: "8",
      type: "warning",
      title: "Data Quality Alert",
      message: "Anomalies detected in your Scope 1 fuel consumption data. Please review the entries for Week 11 and verify accuracy.",
      timestamp: "1 week ago",
      read: true,
      category: "emissions",
      priority: "high"
    },
    {
      id: "9",
      type: "info",
      title: "Branch Target Updated",
      message: "Your branch emission reduction target has been updated to 20% for 2026. View updated goals in your dashboard.",
      timestamp: "1 week ago",
      read: true,
      category: "branch",
      priority: "medium"
    },
    {
      id: "10",
      type: "alert",
      title: "Access Revoked",
      message: "Your Scope 2 edit permission has been revoked. Contact your branch administrator for more information.",
      timestamp: "2 weeks ago",
      read: true,
      category: "admin",
      priority: "high"
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success": return CheckCircle2;
      case "warning": return AlertTriangle;
      case "alert": return Zap;
      case "info": return Info;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success": return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "warning": return "bg-amber-50 border-amber-200 text-amber-700";
      case "alert": return "bg-red-50 border-red-200 text-red-700";
      case "info": return "bg-blue-50 border-blue-200 text-blue-700";
      default: return "bg-neutral-50 border-neutral-200 text-neutral-700";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "emissions": return TrendingUp;
      case "system": return Settings;
      case "reports": return FileText;
      case "branch": return Building2;
      case "compliance": return Target;
      case "admin": return Shield;
      default: return Bell;
    }
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case "high":
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider rounded-full">High</span>;
      case "medium":
        return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider rounded-full">Medium</span>;
      case "low":
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-wider rounded-full">Low</span>;
      default:
        return null;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(notif => !notif.read));
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filter === "all" || 
      (filter === "read" && notif.read) || 
      (filter === "unread" && !notif.read);
    
    const matchesCategory = categoryFilter === "all" || notif.category === categoryFilter;
    
    const matchesSearch = searchQuery === "" || 
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesCategory && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  // Get branch user data
  const branchUserData = JSON.parse(localStorage.getItem("branchUser") || "{}");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-emerald-100 rounded-xl">
              <Bell className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
              Notifications
            </h1>
          </div>
          <p className="text-neutral-500 font-bold">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''} for {branchUserData.branchName || "your branch"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm hover:bg-emerald-100 transition-all border-2 border-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark All Read
          </button>
          <button
            onClick={deleteAllRead}
            disabled={notifications.filter(n => n.read).length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-neutral-50 text-neutral-700 rounded-xl font-bold text-sm hover:bg-neutral-100 transition-all border-2 border-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            Clear Read
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "unread" | "read")}
            className="px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
          >
            <option value="all">All Categories</option>
            <option value="emissions">Emissions</option>
            <option value="compliance">Compliance</option>
            <option value="reports">Reports</option>
            <option value="branch">Branch</option>
            <option value="admin">Admin</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>

      {/* Notifications Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Notifications List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-black text-neutral-900">
              {filteredNotifications.length} Notification{filteredNotifications.length !== 1 ? 's' : ''}
            </h2>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-bold text-neutral-500">
                {filter === "all" ? "All" : filter === "unread" ? "Unread" : "Read"}
              </span>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl border-2 border-neutral-100 p-12 text-center shadow-lg"
              >
                <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="font-black text-neutral-900 mb-2">No notifications found</h3>
                <p className="text-neutral-500 font-medium">
                  Try adjusting your filters or search query
                </p>
              </motion.div>
            ) : (
              filteredNotifications.map((notif, index) => {
                const TypeIcon = getTypeIcon(notif.type);
                const CategoryIcon = getCategoryIcon(notif.category);

                return (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedNotification(notif);
                      markAsRead(notif.id);
                    }}
                    className={`bg-white rounded-2xl border-2 p-5 shadow-lg cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] ${
                      !notif.read ? "border-emerald-200 bg-emerald-50/30" : "border-neutral-100"
                    } ${selectedNotification?.id === notif.id ? "ring-2 ring-emerald-500" : ""}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getTypeColor(notif.type)}`}>
                        <TypeIcon className="w-6 h-6" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-black text-neutral-900">{notif.title}</h3>
                            {!notif.read && (
                              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notif.id);
                            }}
                            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <p className="text-sm text-neutral-600 font-medium mb-3 line-clamp-2">
                          {notif.message}
                        </p>

                        <div className="flex items-center gap-3 flex-wrap text-xs">
                          <div className="flex items-center gap-1.5 text-neutral-400 font-bold">
                            <Clock className="w-3.5 h-3.5" />
                            {notif.timestamp}
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-400 font-bold capitalize">
                            <CategoryIcon className="w-3.5 h-3.5" />
                            {notif.category}
                          </div>
                          {notif.priority && getPriorityBadge(notif.priority)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Notification Detail Panel */}
        <div className="lg:sticky lg:top-8 h-fit">
          <AnimatePresence mode="wait">
            {selectedNotification ? (
              <motion.div
                key={selectedNotification.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-xl"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getTypeColor(selectedNotification.type)}`}>
                    {React.createElement(getTypeIcon(selectedNotification.type), { className: "w-7 h-7" })}
                  </div>
                  <button
                    onClick={() => setSelectedNotification(null)}
                    className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h2 className="text-2xl font-black text-neutral-900 flex-1">
                        {selectedNotification.title}
                      </h2>
                      {selectedNotification.priority && getPriorityBadge(selectedNotification.priority)}
                    </div>
                    <div className="flex items-center gap-4 text-sm flex-wrap">
                      <div className="flex items-center gap-1.5 text-neutral-500 font-bold">
                        <Clock className="w-4 h-4" />
                        {selectedNotification.timestamp}
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-500 font-bold capitalize">
                        {React.createElement(getCategoryIcon(selectedNotification.category), { className: "w-4 h-4" })}
                        {selectedNotification.category}
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-neutral-100" />

                  <div>
                    <h3 className="font-black text-neutral-900 mb-3">Details</h3>
                    <p className="text-neutral-600 font-medium leading-relaxed">
                      {selectedNotification.message}
                    </p>
                  </div>

                  {/* Contextual Information based on category */}
                  {selectedNotification.category === "emissions" && (
                    <div className="bg-emerald-50 rounded-2xl p-5 border-2 border-emerald-200">
                      <h3 className="font-black text-emerald-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Emissions Data Context
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-emerald-700 font-bold">Branch:</span>
                          <span className="text-emerald-900 font-black">{branchUserData.branchName || "Mumbai Branch"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-emerald-700 font-bold">Location:</span>
                          <span className="text-emerald-900 font-black">{branchUserData.location || "Mumbai, India"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Suggested Actions */}
                  {selectedNotification.type === "alert" && (
                    <div className="bg-red-50 rounded-2xl p-5 border-2 border-red-200">
                      <h3 className="font-black text-red-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Immediate Actions Required
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-red-800 font-medium">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0" />
                          Review and complete missing data entries
                        </li>
                        <li className="flex items-start gap-2 text-sm text-red-800 font-medium">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0" />
                          Contact branch administrator if needed
                        </li>
                        <li className="flex items-start gap-2 text-sm text-red-800 font-medium">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0" />
                          Submit data before deadline to avoid compliance issues
                        </li>
                      </ul>
                    </div>
                  )}

                  {selectedNotification.type === "warning" && (
                    <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200">
                      <h3 className="font-black text-amber-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Next Steps
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-amber-800 font-medium">
                          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                          Review the flagged data entries
                        </li>
                        <li className="flex items-start gap-2 text-sm text-amber-800 font-medium">
                          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                          Verify accuracy and make necessary corrections
                        </li>
                        <li className="flex items-start gap-2 text-sm text-amber-800 font-medium">
                          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                          Resubmit for validation
                        </li>
                      </ul>
                    </div>
                  )}

                  {selectedNotification.category === "reports" && (
                    <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-200">
                      <h3 className="font-black text-blue-900 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Report Actions
                      </h3>
                      <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
                          <Download className="w-4 h-4" />
                          Download Report
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-blue-700 border-2 border-blue-200 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all">
                          <Eye className="w-4 h-4" />
                          View Report
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedNotification.category === "admin" && (
                    <div className="bg-purple-50 rounded-2xl p-5 border-2 border-purple-200">
                      <h3 className="font-black text-purple-900 mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Admin Information
                      </h3>
                      <p className="text-sm text-purple-800 font-medium mb-3">
                        This notification is related to permissions or administrative changes.
                      </p>
                      <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 transition-all">
                        <MessageSquare className="w-4 h-4" />
                        Contact Administrator
                      </button>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                      View Related Data
                    </button>
                    <button
                      onClick={() => deleteNotification(selectedNotification.id)}
                      className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-xl font-black text-sm hover:bg-neutral-200 transition-all"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl border-2 border-neutral-100 p-12 text-center shadow-xl"
              >
                <div className="w-20 h-20 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Bell className="w-10 h-10 text-neutral-400" />
                </div>
                <h3 className="font-black text-neutral-900 text-xl mb-2">
                  Select a notification
                </h3>
                <p className="text-neutral-500 font-medium">
                  Click on any notification to view details and take action
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: "Total", 
            value: notifications.length, 
            color: "bg-blue-50 border-blue-200 text-blue-700", 
            icon: Bell,
            description: "All notifications"
          },
          { 
            label: "Unread", 
            value: unreadCount, 
            color: "bg-emerald-50 border-emerald-200 text-emerald-700", 
            icon: Eye,
            description: "Needs attention"
          },
          { 
            label: "Read", 
            value: notifications.length - unreadCount, 
            color: "bg-neutral-50 border-neutral-200 text-neutral-700", 
            icon: EyeOff,
            description: "Already viewed"
          },
          { 
            label: "Critical", 
            value: notifications.filter(n => n.type === "alert").length, 
            color: "bg-red-50 border-red-200 text-red-700", 
            icon: AlertTriangle,
            description: "High priority"
          },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-2xl border-2 p-6 ${stat.color} hover:shadow-lg transition-all`}>
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8" />
              <p className="text-3xl font-black">{stat.value}</p>
            </div>
            <p className="font-black uppercase text-xs tracking-wider opacity-80 mb-1">{stat.label}</p>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-wide">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Filters */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg">
        <h3 className="font-black text-neutral-900 mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5 text-emerald-600" />
          Quick Filters
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "All", value: "all", color: "bg-neutral-100 text-neutral-700 hover:bg-neutral-200" },
            { label: "Emissions", value: "emissions", color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" },
            { label: "Compliance", value: "compliance", color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
            { label: "Reports", value: "reports", color: "bg-purple-100 text-purple-700 hover:bg-purple-200" },
            { label: "Branch", value: "branch", color: "bg-orange-100 text-orange-700 hover:bg-orange-200" },
            { label: "Admin", value: "admin", color: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200" },
            { label: "System", value: "system", color: "bg-gray-100 text-gray-700 hover:bg-gray-200" }
          ].map((filterOption) => (
            <button
              key={filterOption.value}
              onClick={() => setCategoryFilter(filterOption.value)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${filterOption.color} ${
                categoryFilter === filterOption.value ? "ring-2 ring-offset-2 ring-emerald-500" : ""
              }`}
            >
              {filterOption.label}
              {filterOption.value !== "all" && (
                <span className="ml-2 text-xs opacity-70">
                  ({notifications.filter(n => n.category === filterOption.value).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
