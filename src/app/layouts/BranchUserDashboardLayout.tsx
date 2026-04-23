import React, { useState } from "react";
import { Outlet, Link } from "react-router";
import { BranchUserSidebar } from "../components/BranchUserSidebar";
import { BranchUserHeader } from "../components/BranchUserHeader";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";

export function BranchUserDashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50/30 dark:bg-neutral-900 flex selection:bg-emerald-100 selection:text-emerald-900 font-sans text-neutral-900 dark:text-neutral-100">
      {/* Sidebar */}
      <BranchUserSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 md:ml-72 flex flex-col min-h-screen relative overflow-hidden">
        <BranchUserHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-12 flex-1 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto space-y-8 md:space-y-12">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <footer className="p-12 border-t border-neutral-100 dark:border-neutral-800 mt-auto bg-white dark:bg-neutral-900">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
              </div>
              <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest">
                © 2026 SustainAIM Branch Portal • v1.0.0
              </p>
            </div>
            <div className="flex items-center gap-10">
              <Link to="/branch-user/help" className="text-[10px] font-black text-neutral-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">
                Help
              </Link>
              <Link to="/branch-user/documentation" className="text-[10px] font-black text-neutral-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">
                Documentation
              </Link>
              <Link to="/branch-user/contact-admin" className="text-[10px] font-black text-neutral-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">
                Contact Admin
              </Link>
              <Link to="/branch-user/privacy" className="text-[10px] font-black text-neutral-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
