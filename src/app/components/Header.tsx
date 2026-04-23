import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { 
  Search, 
  Bell, 
  Menu, 
  User, 
  ChevronDown, 
  Settings, 
  LogOut, 
  CreditCard, 
  HelpCircle,
  Shield,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      type: "success",
      icon: CheckCircle2,
      title: "Report Generated",
      message: "Your Q1 2026 emissions report is ready",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "info",
      icon: TrendingUp,
      title: "Emissions Trend Update",
      message: "Your Scope 1 emissions decreased by 12%",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "warning",
      icon: AlertCircle,
      title: "Data Entry Required",
      message: "Complete your Scope 2 data for March",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: 4,
      type: "info",
      icon: FileText,
      title: "New Compliance Update",
      message: "EPA guidelines updated for carbon reporting",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 5,
      type: "success",
      icon: Shield,
      title: "Security Update",
      message: "Your account security scan completed successfully",
      time: "2 days ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-emerald-600 bg-emerald-50";
      case "warning":
        return "text-amber-600 bg-amber-50";
      case "info":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-neutral-600 bg-neutral-50";
    }
  };

  return (
    <header className="h-20 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search analytics, reports..." 
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Notifications Dropdown */}
        <div ref={notificationRef} className="relative">
          <button 
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center">
                <span className="text-[10px] font-black text-white">{unreadCount}</span>
              </span>
            )}
          </button>

          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-96 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border-2 border-neutral-100 dark:border-neutral-700 overflow-hidden z-50"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-neutral-900 dark:text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-black">
                        {unreadCount} New
                      </span>
                    )}
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-6 py-4 border-b border-neutral-50 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer ${
                        notification.unread ? "bg-emerald-50/30 dark:bg-emerald-900/10" : ""
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getNotificationColor(notification.type)}`}>
                          <notification.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-black text-sm text-neutral-900 dark:text-white">{notification.title}</h4>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 mt-1"></div>
                            )}
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-300 font-medium mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            <span className="text-xs text-neutral-400 font-bold">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-700">
                  <button 
                    onClick={() => {
                      navigate("/dashboard/notifications");
                      setIsNotificationOpen(false);
                    }}
                    className="w-full py-2 text-emerald-600 dark:text-emerald-400 font-black text-sm hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    View All Notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-[1px] bg-neutral-100 hidden sm:block"></div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-neutral-900 group-hover:text-emerald-600 transition-colors">Alex Rivera</p>
              <p className="text-[11px] font-medium text-neutral-500">Sustainability Lead</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center overflow-hidden border border-neutral-100 ring-2 ring-transparent group-hover:ring-emerald-500/20 transition-all">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className={`w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-all ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border-2 border-neutral-100 overflow-hidden z-50"
              >
                {/* Profile Header */}
                <div className="px-6 py-5 border-b border-neutral-100 bg-gradient-to-br from-emerald-50 to-emerald-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center overflow-hidden shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-neutral-900">Alex Rivera</h3>
                      <p className="text-sm text-neutral-600 font-bold">Sustainability Lead</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="px-2 py-0.5 bg-emerald-600 rounded-md">
                          <span className="text-[10px] font-black text-white uppercase tracking-wider">Pro</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate("/dashboard/profile");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-6 py-3 text-neutral-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all font-bold text-sm"
                  >
                    <User className="w-5 h-5" />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/dashboard/settings");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-6 py-3 text-neutral-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all font-bold text-sm"
                  >
                    <Settings className="w-5 h-5" />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      navigate("/pricing");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-6 py-3 text-neutral-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all font-bold text-sm"
                  >
                    <CreditCard className="w-5 h-5" />
                    Subscription
                  </button>
                  <button
                    onClick={() => {
                      navigate("/dashboard/help-support");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-6 py-3 text-neutral-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all font-bold text-sm"
                  >
                    <HelpCircle className="w-5 h-5" />
                    Help & Support
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-neutral-100 py-2">
                  <button
                    onClick={() => {
                      navigate("/");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 transition-all font-bold text-sm"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}