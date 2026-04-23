import React, { useState } from "react";
import {
  Bell,
  Lock,
  Moon,
  Globe,
  Shield,
  Key,
  Mail,
  Database,
  Download,
  Trash2,
  Save
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router";
import { ChangePasswordModal } from "../components/ChangePasswordModal";
import { TwoFactorAuthModal } from "../components/TwoFactorAuthModal";

export function BranchUserSettingsPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    dataUpdates: true,
    approvals: false
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "Asia/Kolkata"
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  const handleClearCache = () => {
    // Clear localStorage except for important user data
    const branchUser = localStorage.getItem("branchUser");
    const themePreference = localStorage.getItem("theme");
    localStorage.clear();
    if (branchUser) localStorage.setItem("branchUser", branchUser);
    if (themePreference) localStorage.setItem("theme", themePreference);
    toast.success("Cache cleared successfully!");
  };

  const handleExportData = () => {
    toast.info("Data export feature coming soon!");
  };

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? "bg-emerald-600" : "bg-neutral-300"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          enabled ? "translate-x-6" : "translate-x-0.5"
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="px-1">
        <h1 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white mb-2">Settings</h1>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-bold">Manage your account preferences and configurations</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Notifications */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 md:p-6 border-2 border-neutral-100 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Bell className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-neutral-900 dark:text-white">Notifications</h3>
                <p className="text-xs text-neutral-500 font-bold">Manage how you receive updates</p>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between p-3 md:p-4 bg-neutral-50 rounded-xl">
                <div className="flex-1 pr-4">
                  <p className="font-bold text-neutral-900 mb-1 text-sm md:text-base">Email Notifications</p>
                  <p className="text-xs text-neutral-500 font-bold">Receive updates via email</p>
                </div>
                <ToggleSwitch
                  enabled={notifications.email}
                  onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                />
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 bg-neutral-50 rounded-xl">
                <div className="flex-1 pr-4">
                  <p className="font-bold text-neutral-900 mb-1 text-sm md:text-base">Push Notifications</p>
                  <p className="text-xs text-neutral-500 font-bold">Browser notifications</p>
                </div>
                <ToggleSwitch
                  enabled={notifications.push}
                  onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
                />
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 bg-neutral-50 rounded-xl">
                <div className="flex-1 pr-4">
                  <p className="font-bold text-neutral-900 mb-1 text-sm md:text-base">Data Update Alerts</p>
                  <p className="text-xs text-neutral-500 font-bold">Get notified of data changes</p>
                </div>
                <ToggleSwitch
                  enabled={notifications.dataUpdates}
                  onChange={() => setNotifications({ ...notifications, dataUpdates: !notifications.dataUpdates })}
                />
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 bg-neutral-50 rounded-xl">
                <div className="flex-1 pr-4">
                  <p className="font-bold text-neutral-900 mb-1 text-sm md:text-base">Approval Notifications</p>
                  <p className="text-xs text-neutral-500 font-bold">Entry approval status</p>
                </div>
                <ToggleSwitch
                  enabled={notifications.approvals}
                  onChange={() => setNotifications({ ...notifications, approvals: !notifications.approvals })}
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 md:p-6 border-2 border-neutral-100 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-neutral-900 dark:text-white">Preferences</h3>
                <p className="text-xs text-neutral-500 font-bold">Customize your experience</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-neutral-500 uppercase tracking-wide mb-2 block">
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="mr">मराठी (Marathi)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-neutral-500 uppercase tracking-wide mb-2 block">
                  Timezone
                </label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                >
                  <option value="Asia/Kolkata">IST (Asia/Kolkata)</option>
                  <option value="Asia/Dubai">GST (Asia/Dubai)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-3 flex-1 pr-4">
                  <Moon className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 shrink-0" />
                  <div>
                    <p className="font-bold text-neutral-900 mb-1 text-sm md:text-base">Dark Mode</p>
                    <p className="text-xs text-neutral-500 font-bold">Switch to dark theme</p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={theme === "dark"}
                  onChange={handleThemeToggle}
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 md:p-6 border-2 border-neutral-100 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="p-2 bg-red-50 rounded-lg">
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-neutral-900 dark:text-white">Security</h3>
                <p className="text-xs text-neutral-500 font-bold">Manage your account security</p>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setShowChangePasswordModal(true)}
                className="w-full flex items-center justify-between p-3 md:p-4 bg-neutral-50 hover:bg-neutral-100 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <Key className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 shrink-0" />
                  <div>
                    <p className="font-bold text-neutral-900 text-sm md:text-base">Change Password</p>
                    <p className="text-xs text-neutral-500 font-bold">Update your password</p>
                  </div>
                </div>
                <span className="text-neutral-400 group-hover:text-neutral-600 text-lg">→</span>
              </button>

              <button 
                onClick={() => setShowTwoFactorModal(true)}
                className="w-full flex items-center justify-between p-3 md:p-4 bg-neutral-50 hover:bg-neutral-100 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 shrink-0" />
                  <div>
                    <p className="font-bold text-neutral-900 text-sm md:text-base">Two-Factor Authentication</p>
                    <p className="text-xs text-neutral-500 font-bold">Not enabled</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-xs">
                  Enable
                </Badge>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 md:py-6 flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <Save className="w-4 h-4 md:w-5 md:h-5" />
            Save All Settings
          </Button>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Data Management */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 md:p-6 border-2 border-neutral-100 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Database className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              </div>
              <h3 className="text-base md:text-lg font-black text-neutral-900 dark:text-white">Data</h3>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleExportData}
                className="w-full flex items-center gap-3 p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl transition-colors text-left"
              >
                <Download className="w-4 h-4 text-neutral-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-neutral-900 text-sm">Export Data</p>
                  <p className="text-xs text-neutral-500 font-bold">Download your data</p>
                </div>
              </button>

              <button 
                onClick={handleClearCache}
                className="w-full flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-colors text-left"
              >
                <Trash2 className="w-4 h-4 text-red-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-red-900 text-sm">Clear Cache</p>
                  <p className="text-xs text-red-600 font-bold">Reset local data</p>
                </div>
              </button>
            </div>
          </div>

          {/* Help */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 md:p-6 text-white">
            <h3 className="font-black mb-2 text-base md:text-lg">Need Help?</h3>
            <p className="text-xs md:text-sm text-emerald-100 font-bold mb-4">
              Contact your branch administrator for support with settings or permissions.
            </p>
            <button 
              onClick={() => navigate("/branch-user/contact-admin")}
              className="w-full py-2.5 bg-white text-emerald-600 rounded-xl text-sm font-black hover:bg-emerald-50 transition-colors"
            >
              Contact Admin
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
      <TwoFactorAuthModal
        isOpen={showTwoFactorModal}
        onClose={() => setShowTwoFactorModal(false)}
      />
    </div>
  );
}