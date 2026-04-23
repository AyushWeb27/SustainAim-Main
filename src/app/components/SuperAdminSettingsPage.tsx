import React, { useState } from "react";
import {
  Settings,
  Shield,
  Bell,
  Lock,
  Eye,
  Globe,
  Palette,
  Database,
  Mail,
  Server,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Users,
  DollarSign,
  Key,
  Link,
  Code,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function SuperAdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);

  const [settings, setSettings] = useState({
    // General Settings
    platformName: "SustainAIM",
    platformUrl: "https://sustainaim.com",
    supportEmail: "support@sustainaim.com",
    maintenanceMode: false,
    registrationOpen: true,
    
    // Email Settings
    emailProvider: "SendGrid",
    emailApiKey: "SG.xxxxxxxxxxxxx",
    fromEmail: "noreply@sustainaim.com",
    fromName: "SustainAIM Platform",
    
    // Security Settings
    sessionTimeout: "30",
    passwordMinLength: "8",
    requireTwoFactor: false,
    allowApiAccess: true,
    
    // Billing Settings
    currency: "USD",
    taxRate: "10",
    invoicePrefix: "INV-",
    paymentGateway: "Stripe",
    
    // System Settings
    maxUploadSize: "50",
    dataRetention: "365",
    backupFrequency: "daily",
    timezone: "UTC",
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    setHasChanges(false);
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      toast.success("Settings reset to default values");
      setHasChanges(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "email", label: "Email", icon: Mail },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: DollarSign },
    { id: "integrations", label: "Integrations", icon: Link },
    { id: "system", label: "System", icon: Server },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            System Settings
          </h1>
          <p className="text-neutral-500 font-bold mt-2">
            Configure platform-wide settings and preferences
          </p>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 border-2 border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-xl font-black text-sm transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
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

          {/* System Status Card */}
          <div className="mt-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border-2 border-emerald-200 p-5">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-black text-emerald-900 mb-2">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-emerald-800 font-medium">Uptime:</span>
                <span className="text-sm font-black text-emerald-900">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-emerald-800 font-medium">Storage:</span>
                <span className="text-sm font-black text-emerald-900">45 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-emerald-800 font-medium">Active Users:</span>
                <span className="text-sm font-black text-emerald-900">18,234</span>
              </div>
            </div>
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
                  <p className="text-neutral-500 font-medium">Configure basic platform settings</p>
                </div>

                <div className="space-y-6">
                  {/* Platform Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                      <Settings className="w-4 h-4" />
                      Platform Name
                    </label>
                    <input
                      type="text"
                      value={settings.platformName}
                      onChange={(e) => handleSettingChange("platformName", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Platform URL */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                      <Globe className="w-4 h-4" />
                      Platform URL
                    </label>
                    <input
                      type="url"
                      value={settings.platformUrl}
                      onChange={(e) => handleSettingChange("platformUrl", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Support Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                      <Mail className="w-4 h-4" />
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Toggle Settings */}
                  <div className="space-y-4">
                    {[
                      { key: "maintenanceMode", label: "Maintenance Mode", description: "Temporarily disable platform access" },
                      { key: "registrationOpen", label: "Open Registration", description: "Allow new users to register" },
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

            {/* EMAIL SETTINGS */}
            {activeTab === "email" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 mb-2">Email Configuration</h2>
                  <p className="text-neutral-500 font-medium">Configure email delivery settings</p>
                </div>

                <div className="space-y-6">
                  {/* Email Provider */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                      <Mail className="w-4 h-4" />
                      Email Provider
                    </label>
                    <select
                      value={settings.emailProvider}
                      onChange={(e) => handleSettingChange("emailProvider", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      <option>SendGrid</option>
                      <option>Mailgun</option>
                      <option>AWS SES</option>
                      <option>Postmark</option>
                    </select>
                  </div>

                  {/* API Key */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                      <Key className="w-4 h-4" />
                      API Key
                    </label>
                    <input
                      type="password"
                      value={settings.emailApiKey}
                      onChange={(e) => handleSettingChange("emailApiKey", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* From Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                        <Mail className="w-4 h-4" />
                        From Email
                      </label>
                      <input
                        type="email"
                        value={settings.fromEmail}
                        onChange={(e) => handleSettingChange("fromEmail", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>

                    {/* From Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                        <Users className="w-4 h-4" />
                        From Name
                      </label>
                      <input
                        type="text"
                        value={settings.fromName}
                        onChange={(e) => handleSettingChange("fromName", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Test Email */}
                  <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-black text-blue-900 mb-2">Test Email Configuration</h4>
                        <p className="text-sm text-blue-800 font-medium">
                          Send a test email to verify your settings
                        </p>
                      </div>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all whitespace-nowrap ml-4">
                        Send Test
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY SETTINGS */}
            {activeTab === "security" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 mb-2">Security Settings</h2>
                  <p className="text-neutral-500 font-medium">Configure security and authentication</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Session Timeout */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                        <Lock className="w-4 h-4" />
                        Session Timeout (minutes)
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
                      </select>
                    </div>

                    {/* Password Min Length */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                        <Key className="w-4 h-4" />
                        Minimum Password Length
                      </label>
                      <input
                        type="number"
                        value={settings.passwordMinLength}
                        onChange={(e) => handleSettingChange("passwordMinLength", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Security Options */}
                  <div className="space-y-4">
                    {[
                      { key: "requireTwoFactor", label: "Require Two-Factor Authentication", description: "Enforce 2FA for all users" },
                      { key: "allowApiAccess", label: "Allow API Access", description: "Enable API access for integrations" },
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

                  {/* Security Alert */}
                  <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                      <div>
                        <h4 className="font-black text-amber-900 mb-2">Security Recommendations</h4>
                        <ul className="space-y-1 text-sm text-amber-800 font-medium">
                          <li>• Enable two-factor authentication for all admin accounts</li>
                          <li>• Regularly review and update security settings</li>
                          <li>• Monitor login attempts and suspicious activity</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BILLING SETTINGS */}
            {activeTab === "billing" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 mb-2">Billing Settings</h2>
                  <p className="text-neutral-500 font-medium">Configure payment and billing options</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      </select>
                    </div>

                    {/* Tax Rate */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                        <DollarSign className="w-4 h-4" />
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        value={settings.taxRate}
                        onChange={(e) => handleSettingChange("taxRate", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Invoice Prefix */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                        <Code className="w-4 h-4" />
                        Invoice Prefix
                      </label>
                      <input
                        type="text"
                        value={settings.invoicePrefix}
                        onChange={(e) => handleSettingChange("invoicePrefix", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Payment Gateway */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                        <DollarSign className="w-4 h-4" />
                        Payment Gateway
                      </label>
                      <select
                        value={settings.paymentGateway}
                        onChange={(e) => handleSettingChange("paymentGateway", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                      >
                        <option>Stripe</option>
                        <option>PayPal</option>
                        <option>Square</option>
                        <option>Braintree</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INTEGRATIONS */}
            {activeTab === "integrations" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 mb-2">Integrations</h2>
                  <p className="text-neutral-500 font-medium">Connect third-party services</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: "Slack", description: "Team communication", icon: Smartphone, connected: true },
                    { name: "Google Analytics", description: "Web analytics", icon: Globe, connected: true },
                    { name: "Zapier", description: "Workflow automation", icon: Zap, connected: false },
                    { name: "Salesforce", description: "CRM integration", icon: Users, connected: false },
                  ].map((integration, idx) => {
                    const Icon = integration.icon;
                    return (
                      <div
                        key={idx}
                        className="p-6 bg-white rounded-2xl border-2 border-neutral-100 hover:border-emerald-200 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-neutral-100">
                              <Icon className="w-6 h-6 text-neutral-600" />
                            </div>
                            <div>
                              <h4 className="font-black text-neutral-900">{integration.name}</h4>
                              <p className="text-sm text-neutral-500 font-medium">{integration.description}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          className={`w-full py-3 rounded-xl font-black text-sm transition-all ${
                            integration.connected
                              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-2 border-emerald-200"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-2 border-neutral-200"
                          }`}
                        >
                          {integration.connected ? "Connected" : "Connect"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SYSTEM SETTINGS */}
            {activeTab === "system" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 mb-2">System Settings</h2>
                  <p className="text-neutral-500 font-medium">Advanced system configuration</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Max Upload Size */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                        <Upload className="w-4 h-4" />
                        Max Upload Size (MB)
                      </label>
                      <input
                        type="number"
                        value={settings.maxUploadSize}
                        onChange={(e) => handleSettingChange("maxUploadSize", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Data Retention */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                        <Database className="w-4 h-4" />
                        Data Retention (days)
                      </label>
                      <input
                        type="number"
                        value={settings.dataRetention}
                        onChange={(e) => handleSettingChange("dataRetention", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Backup Frequency */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                        <RefreshCw className="w-4 h-4" />
                        Backup Frequency
                      </label>
                      <select
                        value={settings.backupFrequency}
                        onChange={(e) => handleSettingChange("backupFrequency", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-3">
                        <Globe className="w-4 h-4" />
                        Server Timezone
                      </label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange("timezone", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                      >
                        <option>UTC</option>
                        <option>America/New_York</option>
                        <option>America/Los_Angeles</option>
                        <option>Europe/London</option>
                      </select>
                    </div>
                  </div>

                  {/* System Actions */}
                  <div className="space-y-4">
                    <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-black text-emerald-900 mb-2">Database Backup</h4>
                          <p className="text-sm text-emerald-800 font-medium">
                            Last backup: 2 hours ago
                          </p>
                        </div>
                        <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all whitespace-nowrap ml-4">
                          Backup Now
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-black text-blue-900 mb-2">Clear Cache</h4>
                          <p className="text-sm text-blue-800 font-medium">
                            Clear system cache to free up space
                          </p>
                        </div>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all whitespace-nowrap ml-4">
                          Clear Cache
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-red-50 rounded-2xl border-2 border-red-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-black text-red-900 mb-2">Reset System</h4>
                          <p className="text-sm text-red-800 font-medium">
                            Reset all settings to factory defaults
                          </p>
                        </div>
                        <button className="px-6 py-2 bg-red-600 text-white rounded-xl font-black text-sm hover:bg-red-700 transition-all whitespace-nowrap ml-4">
                          Reset
                        </button>
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
