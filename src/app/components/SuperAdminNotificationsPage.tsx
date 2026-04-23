import React, { useState } from "react";
import {
  Bell,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Send,
  Users,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  Eye,
  Clock,
  Target,
  MessageSquare,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "success" | "warning" | "error" | "info";
  target: "all" | "customers" | "users" | "specific";
  status: "draft" | "scheduled" | "sent";
  recipients: number;
  sentDate?: string;
  scheduledDate?: string;
  createdBy: string;
  createdAt: string;
}

export function SuperAdminNotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "System Maintenance Scheduled",
      message: "We will be performing scheduled maintenance on April 5th from 2:00 AM to 4:00 AM UTC. During this time, the platform will be temporarily unavailable.",
      type: "warning",
      target: "all",
      status: "sent",
      recipients: 2847,
      sentDate: "2026-04-01 10:30 AM",
      createdBy: "Admin User",
      createdAt: "2026-04-01",
    },
    {
      id: 2,
      title: "New Feature: Advanced Analytics Dashboard",
      message: "We're excited to announce the launch of our new Advanced Analytics Dashboard with real-time insights and custom reporting capabilities.",
      type: "success",
      target: "customers",
      status: "sent",
      recipients: 1523,
      sentDate: "2026-03-28 09:00 AM",
      createdBy: "Admin User",
      createdAt: "2026-03-27",
    },
    {
      id: 3,
      title: "Payment Method Update Required",
      message: "Your payment method is about to expire. Please update your billing information to avoid service interruption.",
      type: "error",
      target: "specific",
      status: "sent",
      recipients: 45,
      sentDate: "2026-03-25 03:00 PM",
      createdBy: "System",
      createdAt: "2026-03-25",
    },
    {
      id: 4,
      title: "Upcoming Webinar: Carbon Reduction Strategies",
      message: "Join us for an exclusive webinar on April 15th where we'll discuss effective carbon reduction strategies and best practices.",
      type: "info",
      target: "all",
      status: "scheduled",
      recipients: 2847,
      scheduledDate: "2026-04-10 10:00 AM",
      createdBy: "Admin User",
      createdAt: "2026-04-02",
    },
    {
      id: 5,
      title: "Trial Period Ending Soon",
      message: "Your trial period will end in 3 days. Upgrade to a paid plan to continue accessing premium features.",
      type: "warning",
      target: "users",
      status: "scheduled",
      recipients: 324,
      scheduledDate: "2026-04-05 09:00 AM",
      createdBy: "System",
      createdAt: "2026-04-02",
    },
    {
      id: 6,
      title: "Security Update Notice",
      message: "Important security updates have been applied to enhance platform security. No action required from your end.",
      type: "success",
      target: "all",
      status: "draft",
      recipients: 0,
      createdBy: "Admin User",
      createdAt: "2026-04-03",
    },
  ]);

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info" as "success" | "warning" | "error" | "info",
    target: "all" as "all" | "customers" | "users" | "specific",
    scheduledDate: "",
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5" />;
      case "error":
        return <XCircle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "warning":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "error":
        return "bg-red-50 text-red-600 border-red-200";
      case "info":
        return "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return "bg-neutral-50 text-neutral-600 border-neutral-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "scheduled":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "draft":
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

  const getTargetLabel = (target: string) => {
    switch (target) {
      case "all":
        return "All Users";
      case "customers":
        return "Paid Customers";
      case "users":
        return "Trial Users";
      case "specific":
        return "Specific Users";
      default:
        return target;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || notification.type === filterType;
    const matchesStatus = filterStatus === "all" || notification.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    const notification: Notification = {
      id: notifications.length + 1,
      title: newNotification.title,
      message: newNotification.message,
      type: newNotification.type,
      target: newNotification.target,
      status: newNotification.scheduledDate ? "scheduled" : "draft",
      recipients: newNotification.target === "all" ? 2847 : newNotification.target === "customers" ? 1523 : 324,
      scheduledDate: newNotification.scheduledDate || undefined,
      createdBy: "Admin User",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setNotifications([notification, ...notifications]);
    setIsCreateModalOpen(false);
    setNewNotification({
      title: "",
      message: "",
      type: "info",
      target: "all",
      scheduledDate: "",
    });
    toast.success("Notification created successfully!");
  };

  const handleSendNow = (id: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id
          ? {
              ...n,
              status: "sent",
              sentDate: new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : n
      )
    );
    toast.success("Notification sent successfully!");
  };

  const handleDeleteNotification = (id: number) => {
    if (confirm("Are you sure you want to delete this notification?")) {
      setNotifications(notifications.filter((n) => n.id !== id));
      toast.success("Notification deleted successfully!");
    }
  };

  const stats = [
    {
      label: "Total Sent",
      value: notifications.filter((n) => n.status === "sent").length.toString(),
      icon: Send,
      color: "emerald",
    },
    {
      label: "Scheduled",
      value: notifications.filter((n) => n.status === "scheduled").length.toString(),
      icon: Clock,
      color: "blue",
    },
    {
      label: "Drafts",
      value: notifications.filter((n) => n.status === "draft").length.toString(),
      icon: Edit,
      color: "amber",
    },
    {
      label: "Total Recipients",
      value: notifications
        .filter((n) => n.status === "sent")
        .reduce((sum, n) => sum + n.recipients, 0)
        .toLocaleString(),
      icon: Users,
      color: "purple",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}
                >
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
              <p className="text-neutral-500 font-bold text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-neutral-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl font-bold text-sm focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 border-2 border-neutral-200 rounded-xl font-bold text-sm focus:border-emerald-500 focus:outline-none transition-all bg-white"
            >
              <option value="all">All Types</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="info">Info</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border-2 border-neutral-200 rounded-xl font-bold text-sm focus:border-emerald-500 focus:outline-none transition-all bg-white"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Create Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Create Notification
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-neutral-100 p-12 text-center shadow-lg">
            <div className="w-20 h-20 bg-neutral-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-black text-neutral-900 mb-2">No notifications found</h3>
            <p className="text-neutral-500 font-medium mb-6">
              {searchQuery || filterType !== "all" || filterStatus !== "all"
                ? "Try adjusting your filters"
                : "Create your first notification to get started"}
            </p>
            {!searchQuery && filterType === "all" && filterStatus === "all" && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Notification
              </button>
            )}
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-start">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 shrink-0 ${getTypeColor(notification.type)}`}>
                  {getTypeIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-neutral-900 mb-2">
                        {notification.title}
                      </h3>
                      <p className="text-neutral-600 font-medium text-sm mb-3 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-lg text-xs font-black border-2 capitalize ${getStatusBadge(notification.status)}`}>
                        {notification.status}
                      </span>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 font-medium mb-4">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      {getTargetLabel(notification.target)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {notification.recipients.toLocaleString()} recipients
                    </div>
                    {notification.sentDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Sent: {notification.sentDate}
                      </div>
                    )}
                    {notification.scheduledDate && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Scheduled: {notification.scheduledDate}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedNotification(notification);
                        setIsViewModalOpen(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg font-bold text-sm transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    {notification.status !== "sent" && (
                      <>
                        <button
                          onClick={() => handleSendNow(notification.id)}
                          className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg font-bold text-sm transition-all"
                        >
                          <Send className="w-4 h-4" />
                          Send Now
                        </button>
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-bold text-sm transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Create Notification Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsCreateModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-neutral-900">Create Notification</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-black text-neutral-700 mb-2">
                    Notification Title *
                  </label>
                  <input
                    type="text"
                    value={newNotification.title}
                    onChange={(e) =>
                      setNewNotification({ ...newNotification, title: e.target.value })
                    }
                    placeholder="Enter notification title..."
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-black text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={newNotification.message}
                    onChange={(e) =>
                      setNewNotification({ ...newNotification, message: e.target.value })
                    }
                    placeholder="Enter notification message..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold focus:border-emerald-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Type and Target */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2">Type</label>
                    <select
                      value={newNotification.type}
                      onChange={(e) =>
                        setNewNotification({
                          ...newNotification,
                          type: e.target.value as any,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      <option value="info">Info</option>
                      <option value="success">Success</option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2">Target</label>
                    <select
                      value={newNotification.target}
                      onChange={(e) =>
                        setNewNotification({
                          ...newNotification,
                          target: e.target.value as any,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      <option value="all">All Users</option>
                      <option value="customers">Paid Customers</option>
                      <option value="users">Trial Users</option>
                      <option value="specific">Specific Users</option>
                    </select>
                  </div>
                </div>

                {/* Scheduled Date */}
                <div>
                  <label className="block text-sm font-black text-neutral-700 mb-2">
                    Schedule Date (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={newNotification.scheduledDate}
                    onChange={(e) =>
                      setNewNotification({ ...newNotification, scheduledDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold focus:border-emerald-500 focus:outline-none transition-all"
                  />
                  <p className="text-xs text-neutral-500 font-medium mt-2">
                    Leave empty to save as draft
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-6 py-3 border-2 border-neutral-200 text-neutral-700 rounded-xl font-black text-sm hover:bg-neutral-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateNotification}
                    className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                  >
                    Create Notification
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Notification Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedNotification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsViewModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-neutral-900">Notification Details</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 shrink-0 ${getTypeColor(selectedNotification.type)}`}>
                    {getTypeIcon(selectedNotification.type)}
                  </div>
                  <div className="flex-1">
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black border-2 capitalize mb-3 ${getStatusBadge(selectedNotification.status)}`}>
                      {selectedNotification.status}
                    </span>
                    <h3 className="text-xl font-black text-neutral-900 mb-2">
                      {selectedNotification.title}
                    </h3>
                    <p className="text-neutral-600 font-medium">
                      {selectedNotification.message}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-2xl border-2 border-neutral-100">
                  <div>
                    <p className="text-xs font-black text-neutral-500 mb-1">Target Audience</p>
                    <p className="text-sm font-black text-neutral-900">
                      {getTargetLabel(selectedNotification.target)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-neutral-500 mb-1">Recipients</p>
                    <p className="text-sm font-black text-neutral-900">
                      {selectedNotification.recipients.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-neutral-500 mb-1">Created By</p>
                    <p className="text-sm font-black text-neutral-900">
                      {selectedNotification.createdBy}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-neutral-500 mb-1">Created On</p>
                    <p className="text-sm font-black text-neutral-900">
                      {selectedNotification.createdAt}
                    </p>
                  </div>
                  {selectedNotification.sentDate && (
                    <div>
                      <p className="text-xs font-black text-neutral-500 mb-1">Sent Date</p>
                      <p className="text-sm font-black text-neutral-900">
                        {selectedNotification.sentDate}
                      </p>
                    </div>
                  )}
                  {selectedNotification.scheduledDate && (
                    <div>
                      <p className="text-xs font-black text-neutral-500 mb-1">Scheduled For</p>
                      <p className="text-sm font-black text-neutral-900">
                        {selectedNotification.scheduledDate}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="w-full px-6 py-3 bg-neutral-100 text-neutral-700 rounded-xl font-black text-sm hover:bg-neutral-200 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
