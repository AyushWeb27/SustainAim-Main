import React, { useState, useEffect } from "react";
import {
  Settings,
  Shield,
  Bell,
  Lock,
  Eye,
  Globe,
  Palette,
  Database,
  Smartphone,
  Mail,
  Download,
  Trash2,
  Moon,
  Sun,
  Monitor,
  Languages,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Info,
  Save,
  Clock
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";
import { toast } from "sonner";

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    language: "English",
    timezone: "Pacific Time (PT)",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    weeklyReports: true,
    monthlyReports: true,
    systemUpdates: true,
    marketingEmails: false,
    
    // Privacy Settings
    profileVisibility: "team",
    showEmail: false,
    showPhone: false,
    activityTracking: true,
    dataCollection: true,
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: "30",
    loginAlerts: true,
    deviceManagement: true,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
    setHasChanges(true);
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    setHasChanges(false);
    toast.success("Settings saved successfully!");
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Eye },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "data", label: "Data & Storage", icon: Database },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            Settings
          </h1>
          <p className="text-neutral-500 font-bold mt-2">
            Manage your account preferences and configurations
          </p>
        </div>
        {hasChanges && (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border-2 border-neutral-100 p-3 shadow-lg">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 p-5">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
              <Info className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-black text-blue-900 mb-2">Need Help?</h3>
            <p className="text-sm text-blue-800 font-medium mb-4">
              Visit our help center for detailed guides and support.
            </p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors">
              Get Support
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-xl"
          >
            {/* GENERAL SETTINGS */}
            {activeTab === "general" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 mb-2">General Settings</h2>
                  <p className="text-neutral-500 font-medium">Configure your basic preferences</p>
                </div>

                <div className="space-y-6">
                  {/* Language */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                      <Languages className="w-4 h-4" />
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange("language", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">हिन्दी (Hindi)</option>
                      <option value="Marathi">मराठी (Marathi)</option>
                      <option value="Arabic">العربية (Arabic)</option>
                    </select>
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                      <Globe className="w-4 h-4" />
                      Timezone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange("timezone", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      <option>Pacific Time (PT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Central Time (CT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>UTC</option>
                    </select>
                  </div>

                  {/* Date Format */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                      <Calendar className="w-4 h-4" />
                      Date Format
                    </label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => handleSettingChange("dateFormat", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>

                  {/* Currency */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                      <DollarSign className="w-4 h-4" />
                      Currency
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange("currency", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>JPY - Japanese Yen</option>
                      <option>CAD - Canadian Dollar</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 mb-2">Notification Settings</h2>
                  <p className="text-neutral-500 font-medium">Choose how you want to be notified</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "emailNotifications", icon: Mail, label: "Email Notifications", description: "Receive updates via email" },
                    { key: "pushNotifications", icon: Smartphone, label: "Push Notifications", description: "Get browser and mobile notifications" },
                    { key: "smsAlerts", icon: Smartphone, label: "SMS Alerts", description: "Receive text messages for critical updates" },
                    { key: "weeklyReports", icon: Calendar, label: "Weekly Reports", description: "Get weekly sustainability reports" },
                    { key: "monthlyReports", icon: Calendar, label: "Monthly Reports", description: "Receive monthly emission summaries" },
                    { key: "systemUpdates", icon: Bell, label: "System Updates", description: "Notifications about system changes" },
                    { key: "marketingEmails", icon: Mail, label: "Marketing Emails", description: "Promotional content and offers" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100 hover:border-emerald-200 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-black text-neutral-900">{item.label}</p>
                          <p className="text-sm text-neutral-500 font-medium mt-0.5">{item.description}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings[item.key as keyof typeof settings] as boolean}
                          onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                        />
                        <div className="w-14 h-7 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRIVACY */}
            {activeTab === "privacy" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 mb-2">Privacy Settings</h2>
                  <p className="text-neutral-500 font-medium">Control your privacy and data sharing</p>
                </div>

                <div className="space-y-6">
                  {/* Profile Visibility */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                      <Eye className="w-4 h-4" />
                      Profile Visibility
                    </label>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => handleSettingChange("profileVisibility", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      <option value="public">Public - Everyone can see</option>
                      <option value="team">Team Only - Only team members</option>
                      <option value="private">Private - Only me</option>
                    </select>
                  </div>

                  {/* Privacy Toggles */}
                  <div className="space-y-4">
                    {[
                      { key: "showEmail", label: "Show Email Address", description: "Display your email on your profile" },
                      { key: "showPhone", label: "Show Phone Number", description: "Display your phone on your profile" },
                      { key: "activityTracking", label: "Activity Tracking", description: "Track your activity for analytics" },
                      { key: "dataCollection", label: "Anonymous Data Collection", description: "Help improve our service" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100">
                        <div>
                          <p className="font-black text-neutral-900">{item.label}</p>
                          <p className="text-sm text-neutral-500 font-medium mt-0.5">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                          />
                          <div className="w-14 h-7 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 mb-2">Security Settings</h2>
                  <p className="text-neutral-500 font-medium">Protect your account and data</p>
                </div>

                <div className="space-y-6">
                  {/* Password Section */}
                  <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="w-5 h-5 text-neutral-700" />
                          <h3 className="font-black text-neutral-900">Password</h3>
                        </div>
                        <p className="text-sm text-neutral-500 font-medium">Last changed 45 days ago</p>
                      </div>
                      <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all">
                        Change Password
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-emerald-700" />
                          <h3 className="font-black text-emerald-900">Two-Factor Authentication</h3>
                        </div>
                        <p className="text-sm text-emerald-800 font-medium mb-3">
                          Add an extra layer of security to your account
                        </p>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-bold text-emerald-700">Currently Enabled</span>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all whitespace-nowrap ml-4">
                        Manage 2FA
                      </button>
                    </div>
                  </div>

                  {/* Session Timeout */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                      <Clock className="w-4 h-4" />
                      Session Timeout
                    </label>
                    <select
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="never">Never</option>
                    </select>
                  </div>

                  {/* Security Options */}
                  <div className="space-y-4">
                    {[
                      { key: "loginAlerts", label: "Login Alerts", description: "Get notified of new login attempts" },
                      { key: "deviceManagement", label: "Device Management", description: "Track and manage logged-in devices" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100">
                        <div>
                          <p className="font-black text-neutral-900">{item.label}</p>
                          <p className="text-sm text-neutral-500 font-medium mt-0.5">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                          />
                          <div className="w-14 h-7 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Active Sessions */}
                  <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-black text-neutral-900">Active Sessions</h3>
                        <p className="text-sm text-neutral-500 font-medium mt-1">3 active sessions</p>
                      </div>
                      <button className="px-6 py-2 bg-red-600 text-white rounded-xl font-black text-sm hover:bg-red-700 transition-all">
                        End All Sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* APPEARANCE */}
            {activeTab === "appearance" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 mb-2">Appearance Settings</h2>
                  <p className="text-neutral-500 font-medium">Customize how the dashboard looks</p>
                </div>

                <div className="space-y-6">
                  {/* Theme Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-4">
                      <Palette className="w-4 h-4" />
                      Theme
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { value: "light", label: "Light", icon: Sun, description: "Clean and bright" },
                        { value: "dark", label: "Dark", icon: Moon, description: "Easy on the eyes" },
                        { value: "auto", label: "Auto", icon: Monitor, description: "Match system" },
                      ].map((themeOption) => (
                        <button
                          key={themeOption.value}
                          onClick={() => handleThemeChange(themeOption.value as "light" | "dark" | "auto")}
                          className={`p-6 rounded-2xl border-2 transition-all ${theme === themeOption.value ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"}`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${theme === themeOption.value ? "bg-emerald-600" : "bg-neutral-100 dark:bg-neutral-800"}`}>
                            <themeOption.icon className={`w-6 h-6 ${theme === themeOption.value ? "text-white" : "text-neutral-600 dark:text-neutral-400"}`} />
                          </div>
                          <h3 className="font-black text-neutral-900 dark:text-white mb-1">{themeOption.label}</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">{themeOption.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Preview */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
                    <h3 className="font-black text-emerald-900 mb-4">Current Theme Preview</h3>
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-emerald-600 rounded-xl shadow-lg"></div>
                      <div className="w-16 h-16 bg-neutral-900 rounded-xl shadow-lg"></div>
                      <div className="w-16 h-16 bg-neutral-100 rounded-xl shadow-lg border-2 border-neutral-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DATA & STORAGE */}
            {activeTab === "data" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 mb-2">Data & Storage</h2>
                  <p className="text-neutral-500 font-medium">Manage your data and storage options</p>
                </div>

                <div className="space-y-6">
                  {/* Storage Usage */}
                  <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-black text-neutral-900">Storage Usage</h3>
                        <p className="text-sm text-neutral-500 font-medium mt-1">2.4 GB of 10 GB used</p>
                      </div>
                      <Database className="w-8 h-8 text-neutral-400" />
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-3">
                      <div className="bg-emerald-600 h-3 rounded-full" style={{ width: "24%" }}></div>
                    </div>
                  </div>

                  {/* Data Actions */}
                  <div className="space-y-4">
                    <div className="w-full flex items-center justify-between p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100 hover:border-emerald-200 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Download className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-black text-neutral-900">Export All Data</p>
                          <p className="text-sm text-neutral-500 font-medium mt-0.5">Download a copy of your data</p>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all">
                        Export
                      </button>
                    </div>

                    <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-amber-900 mb-2">Clear Cache</h3>
                          <p className="text-sm text-amber-800 font-medium mb-4">
                            Clear temporary files and cached data to free up space
                          </p>
                          <button className="px-6 py-2 bg-amber-600 text-white rounded-xl font-black text-sm hover:bg-amber-700 transition-all">
                            Clear Cache
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
                          <Trash2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-red-900 mb-2">Delete All Data</h3>
                          <p className="text-sm text-red-800 font-medium mb-4">
                            Permanently delete all your data. This action cannot be undone.
                          </p>
                          <button className="px-6 py-2 bg-red-600 text-white rounded-xl font-black text-sm hover:bg-red-700 transition-all">
                            Delete All Data
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}