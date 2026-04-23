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
  Archive,
  MoreVertical,
  Filter,
  Search,
  Clock,
  X,
  Eye,
  EyeOff,
  Volume2,
  VolumeX
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "alert";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: "emissions" | "system" | "reports" | "team" | "compliance";
}

export function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Emissions Data Synced",
      message: "Your Scope 1 emissions data for March 2026 has been successfully uploaded and verified.",
      timestamp: "2 hours ago",
      read: false,
      category: "emissions"
    },
    {
      id: "2",
      type: "alert",
      title: "Target Threshold Exceeded",
      message: "Your CO2 emissions for this quarter have exceeded the target by 15%. Immediate action recommended.",
      timestamp: "5 hours ago",
      read: false,
      category: "compliance"
    },
    {
      id: "3",
      type: "warning",
      title: "Incomplete Data Entry",
      message: "Scope 2 energy consumption data for Week 12 is incomplete. Please complete before end of day.",
      timestamp: "1 day ago",
      read: false,
      category: "emissions"
    },
    {
      id: "4",
      type: "info",
      title: "Monthly Report Available",
      message: "Your sustainability report for February 2026 is now ready for download.",
      timestamp: "2 days ago",
      read: true,
      category: "reports"
    },
    {
      id: "5",
      type: "success",
      title: "Team Member Added",
      message: "Sarah Johnson has been successfully added to your sustainability team.",
      timestamp: "3 days ago",
      read: true,
      category: "team"
    },
    {
      id: "6",
      type: "info",
      title: "System Maintenance Scheduled",
      message: "Platform maintenance scheduled for March 30, 2026 from 2:00 AM - 4:00 AM PST.",
      timestamp: "4 days ago",
      read: true,
      category: "system"
    },
    {
      id: "7",
      type: "success",
      title: "Compliance Check Passed",
      message: "Your organization has successfully passed the Q1 2026 compliance verification.",
      timestamp: "5 days ago",
      read: true,
      category: "compliance"
    },
    {
      id: "8",
      type: "warning",
      title: "Data Quality Alert",
      message: "Anomalies detected in Scope 3 transportation data. Please review and validate.",
      timestamp: "1 week ago",
      read: true,
      category: "emissions"
    },
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
      case "team": return Users;
      case "compliance": return Target;
      default: return Bell;
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-neutral-500 font-bold mt-2">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm hover:bg-emerald-100 transition-all border-2 border-emerald-200"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark All Read
          </button>
          <button
            onClick={deleteAllRead}
            className="flex items-center gap-2 px-4 py-2.5 bg-neutral-50 text-neutral-700 rounded-xl font-bold text-sm hover:bg-neutral-100 transition-all border-2 border-neutral-200"
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
            <option value="team">Team</option>
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

                        <div className="flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1.5 text-neutral-400 font-bold">
                            <Clock className="w-3.5 h-3.5" />
                            {notif.timestamp}
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-400 font-bold">
                            <CategoryIcon className="w-3.5 h-3.5" />
                            {notif.category}
                          </div>
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
                    <h2 className="text-2xl font-black text-neutral-900 mb-2">
                      {selectedNotification.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm">
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

                  {/* Suggested Actions */}
                  {selectedNotification.type === "alert" && (
                    <div className="bg-red-50 rounded-2xl p-5 border-2 border-red-200">
                      <h3 className="font-black text-red-900 mb-3">Suggested Actions</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-red-800 font-medium">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0" />
                          Review emission sources and identify high contributors
                        </li>
                        <li className="flex items-start gap-2 text-sm text-red-800 font-medium">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0" />
                          Implement reduction strategies immediately
                        </li>
                        <li className="flex items-start gap-2 text-sm text-red-800 font-medium">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0" />
                          Schedule team meeting to discuss mitigation plan
                        </li>
                      </ul>
                    </div>
                  )}

                  {selectedNotification.type === "warning" && (
                    <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200">
                      <h3 className="font-black text-amber-900 mb-3">Next Steps</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-amber-800 font-medium">
                          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                          Complete missing data entries
                        </li>
                        <li className="flex items-start gap-2 text-sm text-amber-800 font-medium">
                          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                          Verify data accuracy
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                      Take Action
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
          { label: "Total", value: notifications.length, color: "bg-blue-50 border-blue-200 text-blue-700", icon: Bell },
          { label: "Unread", value: unreadCount, color: "bg-emerald-50 border-emerald-200 text-emerald-700", icon: Eye },
          { label: "Read", value: notifications.length - unreadCount, color: "bg-neutral-50 border-neutral-200 text-neutral-700", icon: EyeOff },
          { label: "Critical", value: notifications.filter(n => n.type === "alert").length, color: "bg-red-50 border-red-200 text-red-700", icon: AlertTriangle },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-2xl border-2 p-6 ${stat.color}`}>
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8" />
              <p className="text-3xl font-black">{stat.value}</p>
            </div>
            <p className="font-black uppercase text-xs tracking-wider opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
