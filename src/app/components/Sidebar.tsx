import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  BarChart3,
  Leaf,
  Settings,
  FileText,
  Users,
  HelpCircle,
  LogOut,
  Globe,
  Database,
  ChevronDown,
  ChevronRight,
  LogIn,
  UserPlus,
  ShieldCheck,
  Zap,
  Target,
  Bell,
  User,
  Sparkles,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isInventoryOpen, setIsInventoryOpen] = useState(true);
  const [isAIReportOpen, setIsAIReportOpen] = useState(true);
  const [isBranchOpen, setIsBranchOpen] = useState(true);

  // Determine active tab from location
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "overview";
    if (path === "/dashboard/scope1") return "scope1";
    if (path === "/dashboard/scope2") return "scope2";
    if (path === "/dashboard/scope3") return "scope3";
    if (path === "/dashboard/profile") return "profile";
    if (path === "/dashboard/ai-ghg-report") return "ghg-report";
    if (path === "/dashboard/ai-esg-report") return "esg-report";
    if (path === "/dashboard/esg-performance") return "esg-performance";
    if (path === "/dashboard/audit-reports") return "audit-reports";
    if (path === "/dashboard/branches" || path.startsWith("/dashboard/branches/")) return "branches";
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

  const subMenuButtonClass = (id: string) => `
    w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ml-4
    ${activeTab === id
      ? "bg-emerald-50 text-emerald-700 font-black border border-emerald-100"
      : "text-neutral-400 hover:text-neutral-900 font-bold"
    }
  `;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 w-72 overflow-hidden">
      {/* Brand Section */}
      <div className="p-8 flex items-center gap-4 shrink-0">
        <div className="w-12 h-12 rounded-[1.25rem] flex items-center justify-center shadow-xl shadow-emerald-200 dark:shadow-emerald-900/50 group-hover:rotate-0 transition-transform">
          <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="font-black text-xl text-neutral-900 dark:text-white tracking-tighter leading-none">Sustain<span className="text-emerald-600">AIM</span></h1>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[10px] text-neutral-400 font-black tracking-widest uppercase">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-4 space-y-8 overflow-y-auto no-scrollbar">
        {/* MAIN SECTION */}
        <div className="space-y-2">
          <p className="px-4 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-4">Core Interface</p>
          <button
            onClick={() => { navigate("/dashboard"); onClose?.(); }}
            className={menuButtonClass("overview")}
          >
            <LayoutDashboard className={`w-5 h-5 ${activeTab === "overview" ? "text-white" : "group-hover:text-emerald-600"}`} />
            <span className="font-black text-sm tracking-tight">Dashboard</span>
          </button>
        </div>

        {/* DATA SECTION */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 mb-4">
            <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Carbon Inventory</p>
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
                  { id: "scope1", path: "/dashboard/scope1", label: "Scope 1", color: "text-emerald-500" },
                  { id: "scope2", path: "/dashboard/scope2", label: "Scope 2", color: "text-blue-500" },
                  { id: "scope3", path: "/dashboard/scope3", label: "Scope 3", color: "text-indigo-500" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { navigate(item.path); onClose?.(); }}
                    className={subMenuButtonClass(item.id)}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI REPORTS SECTION */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 mb-4">
            <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">AI Reports</p>
            <button
              onClick={() => setIsAIReportOpen(!isAIReportOpen)}
              className="p-1 hover:bg-neutral-50 rounded-md transition-colors"
            >
              {isAIReportOpen ? <ChevronDown className="w-3 h-3 text-neutral-400" /> : <ChevronRight className="w-3 h-3 text-neutral-400" />}
            </button>
          </div>

          <AnimatePresence>
            {isAIReportOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1 overflow-hidden"
              >
                <button
                  onClick={() => { navigate("/dashboard/ai-ghg-report"); onClose?.(); }}
                  className={subMenuButtonClass("ghg-report")}
                >
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm">GHG Report</span>
                </button>
                <button
                  onClick={() => { navigate("/dashboard/ai-esg-report"); onClose?.(); }}
                  className={subMenuButtonClass("esg-report")}
                >
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">ESG Report</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BRANCH MANAGEMENT SECTION */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 mb-4">
            <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Organization</p>
            <button
              onClick={() => setIsBranchOpen(!isBranchOpen)}
              className="p-1 hover:bg-neutral-50 rounded-md transition-colors"
            >
              {isBranchOpen ? <ChevronDown className="w-3 h-3 text-neutral-400" /> : <ChevronRight className="w-3 h-3 text-neutral-400" />}
            </button>
          </div>

          <AnimatePresence>
            {isBranchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1 overflow-hidden"
              >
                <button
                  onClick={() => { navigate("/dashboard/branches"); onClose?.(); }}
                  className={subMenuButtonClass("branches")}
                >
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Branch Management</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ANALYSIS SECTION */}
        <div className="space-y-2">
          <p className="px-4 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-4">Analytics</p>
          <button onClick={() => { navigate("/dashboard/esg-performance"); onClose?.(); }} className={menuButtonClass("esg-performance")}>
            <BarChart3 className="w-5 h-5" />
            <span className="font-black text-sm tracking-tight">ESG Performance</span>
          </button>
          <button onClick={() => { navigate("/dashboard/audit-reports"); onClose?.(); }} className={menuButtonClass("audit-reports")}>
            <FileText className="w-5 h-5" />
            <span className="font-black text-sm tracking-tight">Audit Reports</span>
          </button>
        </div>

        {/* ACCOUNT SECTION */}
        <div className="space-y-2">
          <p className="px-4 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-4">Identity</p>
          <button onClick={() => { navigate("/dashboard/profile"); onClose?.(); }} className={menuButtonClass("profile")}>
            <User className="w-5 h-5" />
            <span className="font-black text-sm tracking-tight">Profile</span>
          </button>
          <button onClick={() => { navigate("/signin"); onClose?.(); }} className={menuButtonClass("login")}>
            <LogIn className="w-5 h-5" />
            <span className="font-black text-sm tracking-tight">Login</span>
          </button>
        </div>
      </nav>

      {/* Upgrade Banner */}
      <div className="px-6 py-6 border-t border-neutral-50 shrink-0">
        <div className="bg-neutral-900 rounded-3xl p-5 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500 rounded-full blur-2xl opacity-20 group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-emerald-500 rounded-lg">
                <Target className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Enterprise</span>
            </div>
            <p className="text-white text-xs font-bold leading-relaxed mb-3">Optimize your compliance workflow today.</p>
            <button 
              onClick={() => navigate("/pricing")}
              className="w-full py-2 bg-white text-neutral-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between px-2">
          <button 
            onClick={() => { navigate("/dashboard/settings"); onClose?.(); }}
            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={() => { navigate("/dashboard/notifications"); onClose?.(); }}
            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[8px] font-black text-white flex items-center justify-center animate-pulse">
              3
            </span>
          </button>
          <button 
            onClick={() => { navigate("/"); onClose?.(); }}
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