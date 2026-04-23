import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  BarChart3,
  Building2,
  Settings,
  FileText,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  User,
  Sparkles,
  Bell,
  Shield,
  Leaf
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";

interface BranchUserSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function BranchUserSidebar({ isOpen, onClose }: BranchUserSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isInventoryOpen, setIsInventoryOpen] = useState(true);

  // Get branch user data from localStorage
  const branchUserData = JSON.parse(localStorage.getItem("branchUser") || "{}");
  const permissions = branchUserData.permissions || {};

  // Determine active tab from location
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/branch-user/dashboard") return "overview";
    if (path === "/branch-user/scope1") return "scope1";
    if (path === "/branch-user/scope2") return "scope2";
    if (path === "/branch-user/scope3") return "scope3";
    if (path === "/branch-user/profile") return "profile";
    if (path === "/branch-user/reports") return "reports";
    if (path === "/branch-user/settings") return "settings";
    if (path === "/branch-user/help") return "help";
    return "";
  };

  const activeTab = getActiveTab();

  const menuButtonClass = (id: string) => `
    w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group
    ${activeTab === id
      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
      : "text-neutral-500 hover:bg-emerald-50 hover:text-emerald-700"
    }
  `;

  const subMenuButtonClass = (id: string, disabled: boolean = false) => `
    w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ml-4
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${activeTab === id
      ? "bg-emerald-50 text-emerald-700 font-black border border-emerald-100"
      : "text-neutral-400 hover:text-neutral-900 font-bold"
    }
  `;

  const handleNavigation = (path: string, hasPermission: boolean) => {
    if (hasPermission) {
      navigate(path);
      onClose?.();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 w-72 overflow-hidden">
      {/* Brand Section */}
      <div className="p-8 flex items-center gap-4 shrink-0">
        <div className="w-12 h-12 rounded-[1.25rem] flex items-center justify-center shadow-xl shadow-emerald-200 dark:shadow-emerald-900/50">
          <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="font-black text-xl text-neutral-900 dark:text-white tracking-tighter leading-none">
            Sustain<span className="text-emerald-600">AIM</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
            <Building2 className="w-3 h-3 text-emerald-500" />
            <p className="text-[10px] text-neutral-400 font-black tracking-widest uppercase">Branch Portal</p>
          </div>
        </div>
      </div>

      {/* Branch Info Banner */}
      <div className="mx-6 mb-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-emerald-900 uppercase tracking-wide truncate">
              {branchUserData.branchName || "Branch Name"}
            </p>
            <p className="text-[10px] text-emerald-600 font-bold">
              {branchUserData.role || "Branch User"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-4 space-y-8 overflow-y-auto no-scrollbar">
        {/* MAIN SECTION */}
        <div className="space-y-2">
          <p className="px-4 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-4">Core Interface</p>
          <button
            onClick={() => { navigate("/branch-user/dashboard"); onClose?.(); }}
            className={menuButtonClass("overview")}
          >
            <LayoutDashboard className={`w-5 h-5 ${activeTab === "overview" ? "text-white" : "group-hover:text-emerald-600"}`} />
            <span className="font-black text-sm tracking-tight">Dashboard</span>
          </button>
        </div>

        {/* EMISSIONS DATA SECTION */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 mb-4">
            <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Emissions Data</p>
            <button
              onClick={() => setIsInventoryOpen(!isInventoryOpen)}
              className="p-1 hover:bg-neutral-50 rounded-md transition-colors"
            >
              {isInventoryOpen ? <ChevronDown className="w-3 h-3 text-neutral-400" /> : <ChevronRight className="w-3 h-3 text-neutral-400" />}
            </button>
          </div>

          <AnimatePresence>
            {isInventoryOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1 overflow-hidden"
              >
                {[
                  {
                    id: "scope1",
                    path: "/branch-user/scope1",
                    label: "Scope 1",
                    color: "text-emerald-500",
                    hasPermission: permissions.scope1?.view
                  },
                  {
                    id: "scope2",
                    path: "/branch-user/scope2",
                    label: "Scope 2",
                    color: "text-blue-500",
                    hasPermission: permissions.scope2?.view
                  },
                  {
                    id: "scope3",
                    path: "/branch-user/scope3",
                    label: "Scope 3",
                    color: "text-indigo-500",
                    hasPermission: permissions.scope3?.view
                  }
                ].map((item) => (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => handleNavigation(item.path, item.hasPermission)}
                      className={subMenuButtonClass(item.id, !item.hasPermission)}
                      disabled={!item.hasPermission}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                      <span className="text-sm flex-1 text-left">{item.label}</span>
                      {!item.hasPermission && (
                        <Shield className="w-3 h-3 text-neutral-400" />
                      )}
                    </button>
                    {!item.hasPermission && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-neutral-900 text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        No access permission
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* REPORTS SECTION */}
        <div className="space-y-2">
          <p className="px-4 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-4">Analytics</p>
          <button
            onClick={() => { navigate("/branch-user/reports"); onClose?.(); }}
            className={menuButtonClass("reports")}
          >
            <FileText className="w-5 h-5" />
            <span className="font-black text-sm tracking-tight">Branch Reports</span>
          </button>
        </div>

        {/* ACCOUNT SECTION */}
        <div className="space-y-2">
          <p className="px-4 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-4">Account</p>
          <button
            onClick={() => { navigate("/branch-user/profile"); onClose?.(); }}
            className={menuButtonClass("profile")}
          >
            <User className="w-5 h-5" />
            <span className="font-black text-sm tracking-tight">Profile</span>
          </button>
          <button
            onClick={() => { navigate("/branch-user/settings"); onClose?.(); }}
            className={menuButtonClass("settings")}
          >
            <Settings className="w-5 h-5" />
            <span className="font-black text-sm tracking-tight">Settings</span>
          </button>
        </div>
      </nav>

      {/* Help & Support */}
      <div className="px-6 py-6 border-t border-neutral-50 shrink-0">
        <button
          onClick={() => { navigate("/branch-user/help"); onClose?.(); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
            activeTab === "help"
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
              : "bg-neutral-50 hover:bg-emerald-50 text-neutral-600 hover:text-emerald-700"
          }`}
        >
          <HelpCircle className={`w-5 h-5 ${activeTab === "help" ? "text-white" : "text-neutral-500 group-hover:text-emerald-600"} transition-colors`} />
          <span className={`font-black text-sm ${activeTab === "help" ? "text-white" : "text-neutral-600 group-hover:text-emerald-700"} transition-colors`}>Help & Support</span>
        </button>

        <div className="mt-4 flex items-center justify-between px-2">
          <button
            onClick={() => { navigate("/branch-user/notifications"); onClose?.(); }}
            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[8px] font-black text-white flex items-center justify-center animate-pulse">
              2
            </span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("branchUser");
              navigate("/branch-user/login");
              onClose?.();
            }}
            className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen bg-white border-r border-neutral-100 w-72 fixed left-0 top-0 overflow-hidden z-50">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[60] md:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}