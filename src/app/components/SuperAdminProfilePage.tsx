import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Shield,
  Edit,
  Save,
  Camera,
  Lock,
  Key,
  Clock,
  Activity,
  Award,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Briefcase,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function SuperAdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: "Admin",
    lastName: "User",
    email: "admin@sustainaim.com",
    phone: "+1 (555) 123-4567",
    role: "Super Administrator",
    department: "Platform Operations",
    location: "San Francisco, CA",
    timezone: "Pacific Time (PT)",
    language: "English",
    
    // Professional Information
    employeeId: "SA-001",
    joinDate: "Jan 15, 2024",
    lastLogin: "2 hours ago",
    accessLevel: "Level 5 - Full Access",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    loginAlerts: true,
    sessionTimeout: "30",
  });

  const activityLog = [
    { action: "Logged in to Super Admin Dashboard", timestamp: "2 hours ago", type: "login" },
    { action: "Updated customer: TechCorp Global", timestamp: "3 hours ago", type: "edit" },
    { action: "Exported analytics report", timestamp: "5 hours ago", type: "export" },
    { action: "Added new customer: Digital Solutions AG", timestamp: "1 day ago", type: "create" },
    { action: "Changed system settings", timestamp: "1 day ago", type: "settings" },
    { action: "Logged in to Super Admin Dashboard", timestamp: "2 days ago", type: "login" },
  ];

  const achievements = [
    { title: "Platform Launch", description: "Successfully launched platform", date: "Jan 2024", icon: Award },
    { title: "1000 Customers", description: "Reached 1000 customer milestone", date: "Feb 2024", icon: CheckCircle2 },
    { title: "99.9% Uptime", description: "Maintained 99.9% uptime for Q1", date: "Mar 2024", icon: Activity },
  ];

  const stats = [
    { label: "Total Actions", value: "1,247", icon: Activity },
    { label: "Customers Managed", value: "2,847", icon: Building2 },
    { label: "Days Active", value: "71", icon: Calendar },
    { label: "Response Time", value: "2.4h", icon: Clock },
  ];

  const handleSave = () => {
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Changes discarded");
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success("Profile image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className={`w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm border-4 border-white/30 overflow-hidden ${!profileImage ? 'flex items-center justify-center' : ''}`}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 p-2 bg-white rounded-xl shadow-lg hover:bg-emerald-50 transition-all"
              >
                <Camera className="w-4 h-4 text-emerald-600" />
              </button>
            </div>

            {/* Profile Info */}
            <div>
              <h2 className="text-3xl font-black text-white mb-2">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-black border border-white/30">
                  <Shield className="w-4 h-4 inline mr-2" />
                  {profileData.role}
                </span>
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-black border border-white/30">
                  <CheckCircle2 className="w-4 h-4 inline mr-2" />
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl font-black text-sm transition-all shadow-lg"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-xl font-black text-sm transition-all border border-white/30"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl font-black text-sm transition-all shadow-lg"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border-2 border-neutral-100 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-emerald-50">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-black text-neutral-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-lg overflow-hidden">
        <div className="border-b-2 border-neutral-100">
          <div className="flex overflow-x-auto">
            {[
              { id: "personal", label: "Personal Info" },
              { id: "professional", label: "Professional" },
              { id: "security", label: "Security" },
              { id: "activity", label: "Activity Log" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-black text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-emerald-600 border-b-4 border-emerald-600 bg-emerald-50"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-neutral-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-2">
                      <User className="w-4 h-4" />
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all disabled:bg-neutral-50 disabled:text-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-2">
                      <User className="w-4 h-4" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all disabled:bg-neutral-50 disabled:text-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all disabled:bg-neutral-50 disabled:text-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all disabled:bg-neutral-50 disabled:text-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all disabled:bg-neutral-50 disabled:text-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-neutral-700 mb-2">
                      <Globe className="w-4 h-4" />
                      Timezone
                    </label>
                    <select
                      value={profileData.timezone}
                      onChange={(e) => handleInputChange("timezone", e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all disabled:bg-neutral-50 disabled:text-neutral-600"
                    >
                      <option>Pacific Time (PT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Central Time (CT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>UTC</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Professional Information Tab */}
          {activeTab === "professional" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-neutral-900 mb-4">Professional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-black text-emerald-900 uppercase tracking-widest">
                        Role
                      </span>
                    </div>
                    <p className="text-2xl font-black text-emerald-900">{profileData.role}</p>
                  </div>

                  <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-black text-blue-900 uppercase tracking-widest">
                        Department
                      </span>
                    </div>
                    <p className="text-2xl font-black text-blue-900">{profileData.department}</p>
                  </div>

                  <div className="p-6 bg-purple-50 rounded-2xl border-2 border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Key className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-black text-purple-900 uppercase tracking-widest">
                        Employee ID
                      </span>
                    </div>
                    <p className="text-2xl font-black text-purple-900">{profileData.employeeId}</p>
                  </div>

                  <div className="p-6 bg-amber-50 rounded-2xl border-2 border-amber-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-black text-amber-900 uppercase tracking-widest">
                        Join Date
                      </span>
                    </div>
                    <p className="text-2xl font-black text-amber-900">{profileData.joinDate}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-600 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-emerald-900 mb-2">Access Level</h4>
                    <p className="text-sm text-emerald-800 font-bold mb-2">
                      {profileData.accessLevel}
                    </p>
                    <p className="text-sm text-emerald-700 font-medium">
                      You have unrestricted access to all platform features, customer data, and system settings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-black text-neutral-900 mb-4">Achievements</h3>
                <div className="grid grid-cols-1 gap-4">
                  {achievements.map((achievement, idx) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-6 bg-white rounded-2xl border-2 border-neutral-100 hover:border-emerald-200 transition-all"
                      >
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-neutral-900">{achievement.title}</h4>
                          <p className="text-sm text-neutral-600 font-medium mt-1">
                            {achievement.description}
                          </p>
                        </div>
                        <span className="text-sm text-neutral-500 font-bold">{achievement.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-neutral-900 mb-4">Security Settings</h3>
                
                {/* Password Section */}
                <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-5 h-5 text-neutral-700" />
                        <h4 className="font-black text-neutral-900">Password</h4>
                      </div>
                      <p className="text-sm text-neutral-500 font-medium">Last changed 45 days ago</p>
                    </div>
                    <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                      Change Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 mb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-emerald-700" />
                        <h4 className="font-black text-emerald-900">Two-Factor Authentication</h4>
                      </div>
                      <p className="text-sm text-emerald-800 font-medium mb-3">
                        Add an extra layer of security to your account
                      </p>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-bold text-emerald-700">Currently Enabled</span>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all whitespace-nowrap ml-4">
                      Manage 2FA
                    </button>
                  </div>
                </div>

                {/* Security Options */}
                <div className="space-y-4">
                  {[
                    { key: "emailNotifications", label: "Email Notifications", description: "Receive security alerts via email" },
                    { key: "loginAlerts", label: "Login Alerts", description: "Get notified of new login attempts" },
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
                          checked={securitySettings[item.key as keyof typeof securitySettings] as boolean}
                          onChange={(e) =>
                            setSecuritySettings({ ...securitySettings, [item.key]: e.target.checked })
                          }
                        />
                        <div className="w-14 h-7 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                {/* Session Info */}
                <div className="mt-6 bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100">
                  <h4 className="font-black text-neutral-900 mb-4">Session Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 font-bold">Last Login:</span>
                      <span className="text-sm font-black text-neutral-900">{profileData.lastLogin}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 font-bold">Active Sessions:</span>
                      <span className="text-sm font-black text-neutral-900">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 font-bold">Session Timeout:</span>
                      <span className="text-sm font-black text-neutral-900">30 minutes</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-3 bg-red-600 text-white rounded-xl font-black text-sm hover:bg-red-700 transition-all">
                    End All Sessions
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === "activity" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-neutral-900">Activity Log</h3>
                  <p className="text-sm text-neutral-500 font-bold mt-1">Your recent actions and events</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-3 border-2 border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-xl text-sm font-black transition-all">
                  <Calendar className="w-4 h-4" />
                  Filter by Date
                </button>
              </div>

              <div className="space-y-3">
                {activityLog.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-neutral-100 hover:border-emerald-200 transition-all"
                  >
                    <div className={`p-2 rounded-lg ${
                      log.type === "login" ? "bg-blue-50" :
                      log.type === "edit" ? "bg-purple-50" :
                      log.type === "export" ? "bg-emerald-50" :
                      log.type === "create" ? "bg-green-50" :
                      "bg-amber-50"
                    }`}>
                      {log.type === "login" && <User className="w-5 h-5 text-blue-600" />}
                      {log.type === "edit" && <Edit className="w-5 h-5 text-purple-600" />}
                      {log.type === "export" && <Activity className="w-5 h-5 text-emerald-600" />}
                      {log.type === "create" && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      {log.type === "settings" && <Shield className="w-5 h-5 text-amber-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-neutral-900">{log.action}</p>
                      <p className="text-sm text-neutral-500 font-medium mt-1">{log.timestamp}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full py-4 text-emerald-600 hover:bg-emerald-50 rounded-xl font-black text-sm uppercase tracking-widest transition-all border-2 border-emerald-200">
                Load More Activity
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
