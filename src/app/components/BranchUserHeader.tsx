import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Building2,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BranchUserHeaderProps {
  onMenuClick?: () => void;
}

export function BranchUserHeader({ onMenuClick }: BranchUserHeaderProps) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Get branch user data from localStorage
  const branchUserData = JSON.parse(localStorage.getItem("branchUser") || "{}");

  const notifications = [
    {
      id: 1,
      title: "Scope 1 Data Updated",
      message: "New emissions data has been added for February 2026",
      time: "10 min ago",
      unread: true
    },
    {
      id: 2,
      title: "Monthly Report Available",
      message: "Your branch monthly sustainability report is ready",
      time: "2 hours ago",
      unread: true
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("branchUser");
    navigate("/branch-user/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-100 dark:border-neutral-800">
      <div className="px-4 md:px-12 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Section - Menu & Search */}
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search emissions data, reports..."
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Right Section - Notifications & Profile */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all"
              >
                <Bell className="w-6 h-6" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setIsNotificationOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-neutral-100 dark:border-neutral-700">
                        <h3 className="font-black text-sm text-neutral-900 dark:text-white">Notifications</h3>
                        <p className="text-xs text-neutral-500 font-bold">You have {notifications.filter(n => n.unread).length} unread messages</p>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors cursor-pointer ${
                              notification.unread ? "bg-emerald-50/30" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {notification.unread && (
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-black text-sm text-neutral-900 dark:text-white mb-1">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-bold mb-2">
                                  {notification.message}
                                </p>
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wide">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-neutral-100 dark:border-neutral-700">
                        <button 
                          onClick={() => {
                            navigate("/branch-user/notifications");
                            setIsNotificationOpen(false);
                          }}
                          className="w-full py-2 text-xs font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-wide transition-colors"
                        >
                          View All Notifications
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all group"
              >
                <div className="hidden md:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-black text-neutral-900 dark:text-white">
                      {branchUserData.name || "Branch User"}
                    </p>
                    <div className="flex items-center gap-1.5 justify-end">
                      <Building2 className="w-3 h-3 text-emerald-500" />
                      <p className="text-xs text-neutral-500 font-bold">
                        {branchUserData.role || "User"}
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-neutral-700 transition-colors" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden z-50"
                    >
                      {/* Profile Info */}
                      <div className="p-4 border-b border-neutral-100 dark:border-neutral-700 bg-emerald-50 dark:bg-emerald-900/20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                            <User className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-sm text-neutral-900 dark:text-white truncate">
                              {branchUserData.name || "Branch User"}
                            </p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-bold truncate">
                              {branchUserData.email || "user@branch.com"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-neutral-800 rounded-lg">
                          <Building2 className="w-4 h-4 text-emerald-600" />
                          <p className="text-xs font-black text-neutral-700 dark:text-neutral-300 truncate">
                            {branchUserData.branchName || "Branch"}
                          </p>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <button
                          onClick={() => {
                            navigate("/branch-user/profile");
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-xl transition-all text-left"
                        >
                          <User className="w-4 h-4 text-neutral-500" />
                          <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">My Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate("/branch-user/settings");
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-xl transition-all text-left"
                        >
                          <Settings className="w-4 h-4 text-neutral-500" />
                          <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Settings</span>
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="p-2 border-t border-neutral-100 dark:border-neutral-700">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all text-left"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}