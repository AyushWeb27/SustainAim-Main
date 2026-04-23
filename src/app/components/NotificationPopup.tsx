import React from "react";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Settings as SettingsIcon,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Notification {
  id: number;
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPopup({ isOpen, onClose }: NotificationPopupProps) {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      type: "success",
      title: "New Customer Registration",
      message: "FutureTech Industries has registered successfully",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      type: "success",
      title: "Payment Received",
      message: "TechCorp Global paid $4,999 for Enterprise plan",
      time: "15 min ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Support Ticket Created",
      message: "EcoRetail Solutions needs help with emissions tracking",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 4,
      type: "info",
      title: "System Update Available",
      message: "Version 2.5.0 is now available for installation",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "error",
      title: "Failed Payment Attempt",
      message: "Urban Development Co payment method declined",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getColorClasses = (type: string) => {
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

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-[420px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border-2 border-neutral-100 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b-2 border-neutral-100 bg-neutral-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-neutral-700" />
                  <h3 className="font-black text-neutral-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-black">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-black text-emerald-600 hover:text-emerald-700 transition-all"
                  >
                    Mark all as read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs font-black text-red-600 hover:text-red-700 transition-all"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[500px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-neutral-400" />
                  </div>
                  <p className="font-black text-neutral-900 mb-1">
                    No notifications
                  </p>
                  <p className="text-sm text-neutral-500 font-medium">
                    You're all caught up!
                  </p>
                </div>
              ) : (
                <div className="divide-y-2 divide-neutral-100">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 hover:bg-neutral-50 transition-all group ${
                        !notification.read ? "bg-blue-50/30" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 ${getColorClasses(
                            notification.type
                          )}`}
                        >
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-black text-neutral-900 text-sm">
                              {notification.title}
                            </h4>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-sm text-neutral-600 font-medium mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500 font-medium">
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs font-black text-emerald-600 hover:text-emerald-700 transition-all"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t-2 border-neutral-100 bg-neutral-50">
                <button className="w-full py-2.5 text-center text-sm font-black text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all">
                  View All Notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
