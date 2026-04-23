import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  DollarSign,
  FileText,
  FolderTree,
  HelpCircle,
  Inbox,
  Layers,
  LifeBuoy,
  Lock,
  LogOut,
  Menu,
  Search,
  Settings,
  Shield,
  User,
  UserCircle,
  UserPlus,
  Users,
  X,
  Zap
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";
import { CreateCustomerPage } from "./CreateCustomerPage";
import { NotificationPopup } from "./NotificationPopup";
import { SuperAdminAnalyticsPage } from "./SuperAdminAnalyticsPage";
import { SuperAdminBlogManagementPage } from "./SuperAdminBlogManagementPage";
import { SuperAdminCashTransactionPage } from "./SuperAdminCashTransactionPage";
import { SuperAdminCategoryPage } from "./SuperAdminCategoryPage";
import { SuperAdminCustomersPage } from "./SuperAdminCustomersPage";
import { SuperAdminHelpManagementPage } from "./SuperAdminHelpManagementPage";
import { SuperAdminInquiryPage } from "./SuperAdminInquiryPage";
import { SuperAdminNotificationsPage } from "./SuperAdminNotificationsPage";
import { SuperAdminOverviewPage } from "./SuperAdminOverviewPage";
import { SuperAdminProfilePage } from "./SuperAdminProfilePage";
import { SuperAdminScopesPage } from "./SuperAdminScopesPage";
import { SuperAdminServiceManagementPage } from "./SuperAdminServiceManagementPage";
import { SuperAdminSettingsPage } from "./SuperAdminSettingsPage";
import { SuperAdminUsersPage } from "./SuperAdminUsersPage";

export function SuperAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  // Mock data for customers
  const customers = [
    { id: 1, name: "TechCorp Global", email: "admin@techcorp.com", plan: "Enterprise", users: 450, emissions: "12,450", status: "Active", lastActive: "2 hours ago" },
    { id: 2, name: "GreenManufacturing Inc", email: "contact@greenmfg.com", plan: "Professional", users: 120, emissions: "8,230", status: "Active", lastActive: "1 day ago" },
    { id: 3, name: "EcoRetail Solutions", email: "admin@ecoretail.com", plan: "Professional", users: 85, emissions: "5,670", status: "Active", lastActive: "3 hours ago" },
    { id: 4, name: "Sustainable Logistics", email: "info@suslog.com", plan: "Starter", users: 25, emissions: "3,120", status: "Active", lastActive: "5 hours ago" },
    { id: 5, name: "CleanEnergy Partners", email: "team@cleanenergy.com", plan: "Enterprise", users: 320, emissions: "15,890", status: "Active", lastActive: "30 min ago" },
    { id: 6, name: "Urban Development Co", email: "admin@urbandev.com", plan: "Professional", users: 95, emissions: "6,540", status: "Inactive", lastActive: "2 weeks ago" },
  ];

  const systemMetrics = [
    { label: "Total Customers", value: "2,847", change: "+12.5%", icon: Building2, color: "emerald" },
    { label: "Active Users", value: "18,234", change: "+8.2%", icon: Users, color: "blue" },
    { label: "Total Emissions Tracked", value: "1.2M", change: "+15.3%", icon: Activity, color: "purple" },
    { label: "System Uptime", value: "99.9%", change: "+0.1%", icon: Zap, color: "amber" },
  ];

  const recentActivity = [
    { action: "New customer registered", customer: "FutureTech Industries", time: "5 min ago", type: "success" },
    { action: "Payment received", customer: "TechCorp Global", time: "15 min ago", type: "success" },
    { action: "Support ticket created", customer: "EcoRetail Solutions", time: "1 hour ago", type: "warning" },
    { action: "Subscription upgraded", customer: "CleanEnergy Partners", time: "2 hours ago", type: "success" },
    { action: "Failed payment attempt", customer: "Urban Development Co", time: "3 hours ago", type: "error" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-neutral-900 border-r border-neutral-800 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="font-black text-[19px] text-lg text-white tracking-tighter leading-none">
                  Sustain<span className="text-emerald-400">AIM</span>
                </h1>
                <p className="text-[12px] text-emerald-400 font-black tracking-widest uppercase">
                  Super Admin
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "overview"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("create-customer")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "create-customer"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <UserPlus className="w-5 h-5" />
              Create Customer
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "users"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Users className="w-5 h-5" />
              Users
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "customers"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Building2 className="w-5 h-5" />
              Customers
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "analytics"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Activity className="w-5 h-5" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("scopes")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "scopes"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Layers className="w-5 h-5" />
              Scopes
            </button>
            <button
              onClick={() => setActiveTab("category")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "category"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <FolderTree className="w-5 h-5" />
              Category
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "transactions"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <DollarSign className="w-5 h-5" />
              Cash Transaction
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "notifications"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "profile"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <User className="w-5 h-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "settings"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
            <button
              onClick={() => setActiveTab("help-management")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "help-management"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              Help Management
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "inquiries"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Inbox className="w-5 h-5" />
              Inquiries
            </button>
            <button
              onClick={() => setActiveTab("service-management")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "service-management"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Service Management
            </button>
            <button
              onClick={() => setActiveTab("blog-management")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === "blog-management"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <FileText className="w-5 h-5" />
              Blog Management
            </button>
          </nav>

          {/* Admin Profile */}
          <div className="p-4 border-t border-neutral-800 relative">
            <button
              onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-white">Admin User</p>
                <p className="text-xs text-emerald-400 font-bold">Super Admin</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isAdminMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Admin Dropdown Menu */}
            {isAdminMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-full left-4 right-4 mb-2 bg-neutral-800 rounded-xl border border-neutral-700 shadow-2xl overflow-hidden"
              >
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      setActiveTab("profile");
                      setIsAdminMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-neutral-300 hover:text-white hover:bg-neutral-700 transition-all"
                  >
                    <UserCircle className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setActiveTab("settings");
                      setIsAdminMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-neutral-300 hover:text-white hover:bg-neutral-700 transition-all"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      // Change Password action
                      alert("Change Password functionality");
                      setIsAdminMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-neutral-300 hover:text-white hover:bg-neutral-700 transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Change Password</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("help-management");
                      setIsAdminMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-neutral-300 hover:text-white hover:bg-neutral-700 transition-all"
                  >
                    <LifeBuoy className="w-4 h-4" />
                    <span>Help & Support</span>
                  </button>

                  <div className="h-px bg-neutral-700 my-1" />

                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to logout?")) {
                        window.location.href = "/super-admin/login";
                      }
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-neutral-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
                >
                  <Menu className="w-6 h-6" />
                </button>

                <div className="relative max-w-md w-full hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search customers, users, analytics..."
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all"
                  >
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <NotificationPopup
                    isOpen={isNotificationOpen}
                    onClose={() => setIsNotificationOpen(false)}
                  />
                </div>
                <button
                  onClick={() => setActiveTab("settings")}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all"
                >
                  <Settings className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 lg:p-8 space-y-8">
          {/* Page Title */}
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
              {activeTab === "overview" && "System Overview"}
              {activeTab === "create-customer" && "Create Customer Account"}
              {activeTab === "users" && "Users Management"}
              {activeTab === "customers" && "Customer Management"}
              {activeTab === "analytics" && "System Analytics"}
              {activeTab === "scopes" && "Scopes Management"}
              {activeTab === "category" && "Category Management"}
              {activeTab === "transactions" && "Cash Transactions"}
              {activeTab === "notifications" && "Notifications Management"}
              {activeTab === "profile" && "Profile"}
              {activeTab === "settings" && "System Settings"}
              {activeTab === "help-management" && "Help Management"}
              {activeTab === "inquiries" && "Inquiries"}
              {activeTab === "service-management" && "Service Management"}
              {activeTab === "blog-management" && "Blog Management"}
            </h1>
            <p className="text-neutral-500 font-bold text-sm mt-2">
              {activeTab === "overview" && "Monitor platform performance and key metrics"}
              {activeTab === "create-customer" && "Create new customer accounts directly"}
              {activeTab === "users" && "Manage unpaid users and trial accounts"}
              {activeTab === "customers" && "Manage paid customers and subscriptions"}
              {activeTab === "analytics" && "Deep dive into platform analytics"}
              {activeTab === "scopes" && "Manage emission scopes and classifications"}
              {activeTab === "category" && "Manage categories for each scope"}
              {activeTab === "transactions" && "View and manage all financial transactions"}
              {activeTab === "notifications" && "Create and manage system notifications"}
              {activeTab === "profile" && "Manage your profile settings"}
              {activeTab === "settings" && "Configure system-wide settings"}
              {activeTab === "help-management" && "Manage FAQ content for customer support"}
              {activeTab === "inquiries" && "Manage customer inquiries"}
              {activeTab === "service-management" && "Manage services"}
              {activeTab === "blog-management" && "Manage blog posts"}
            </p>
          </div>

          {/* Render Pages based on active tab */}
          {activeTab === "create-customer" ? (
            <CreateCustomerPage />
          ) : activeTab === "users" ? (
            <SuperAdminUsersPage />
          ) : activeTab === "customers" ? (
            <SuperAdminCustomersPage />
          ) : activeTab === "analytics" ? (
            <SuperAdminAnalyticsPage />
          ) : activeTab === "scopes" ? (
            <SuperAdminScopesPage />
          ) : activeTab === "category" ? (
            <SuperAdminCategoryPage />
          ) : activeTab === "transactions" ? (
            <SuperAdminCashTransactionPage />
          ) : activeTab === "notifications" ? (
            <SuperAdminNotificationsPage />
          ) : activeTab === "profile" ? (
            <SuperAdminProfilePage />
          ) : activeTab === "settings" ? (
            <SuperAdminSettingsPage />
          ) : activeTab === "help-management" ? (
            <SuperAdminHelpManagementPage />
          ) : activeTab === "inquiries" ? (
            <SuperAdminInquiryPage />
          ) : activeTab === "service-management" ? (
            <SuperAdminServiceManagementPage />
          ) : activeTab === "blog-management" ? (
            <SuperAdminBlogManagementPage />
          ) : (
            <SuperAdminOverviewPage />
          )}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}