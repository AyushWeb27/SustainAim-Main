import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Shield,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Users,
  Award,
  CheckCircle2,
  Camera
} from "lucide-react";
import { motion } from "motion/react";

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const logoInputRef = React.useRef<HTMLInputElement>(null);

  // User data state
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Anderson",
    email: "john.anderson@techcorp.com",
    phone: "+91 98765 43210",
    company: "TechCorp Global",
    website: "https://techcorp.com",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    country: "India",
    gstNo: "27AABCT1234A1Z5",
    founderName: "Rajesh Kumar",
    dateOfIncorporation: "2015-06-15",
    industry: "Information Technology",
    dateJoined: "January 15, 2024",
    lastLogin: "March 25, 2026 at 10:32 AM",
    accountType: "Professional",
    subscriptionStatus: "Active",
    billingCycle: "Annual",
    nextBillingDate: "January 15, 2027",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
    console.log("Saving user data:", userData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerLogoInput = () => {
    logoInputRef.current?.click();
  };

  const stats = [
    { label: "Reports Generated", value: "47", icon: Award, color: "emerald" },
    { label: "Total Emissions Tracked", value: "12.4k", icon: Globe, color: "blue" },
    { label: "Team Members", value: "8", icon: Users, color: "purple" },
    { label: "Days Active", value: "435", icon: Calendar, color: "amber" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            Profile Settings
          </h1>
          <p className="text-neutral-500 font-bold mt-2">
            Manage your account information and preferences
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-6 py-3 bg-neutral-200 text-neutral-700 rounded-xl font-black text-sm hover:bg-neutral-300 transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
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

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Picture */}
          <div className="relative">
            <div className={`w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl shadow-2xl shadow-emerald-200 overflow-hidden ${!profileImage ? 'flex items-center justify-center' : ''}`}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-white" />
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
              className="absolute bottom-0 right-0 w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center shadow-lg hover:bg-neutral-800 transition-colors"
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black text-neutral-900">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-neutral-500 font-bold text-lg mt-2">{userData.company}</p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                  {userData.accountType}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-black text-blue-700 uppercase tracking-widest">
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-xl">
                <Calendar className="w-4 h-4 text-neutral-600" />
                <span className="text-xs font-bold text-neutral-700">
                  Joined {userData.dateJoined}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <p className="text-3xl font-black text-neutral-900">{stat.value}</p>
            <p className="text-sm font-bold text-neutral-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-neutral-100 overflow-x-auto">
        {[
          { id: "personal", label: "Personal Information", icon: User },
          { id: "company", label: "Company Details", icon: Building2 },
          { id: "account", label: "Account Details", icon: Shield },
          { id: "subscription", label: "Subscription", icon: CreditCard },
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "security", label: "Security", icon: Lock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-black text-sm whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "text-emerald-600 border-b-4 border-emerald-600"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-xl"
      >
        {activeTab === "personal" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-neutral-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "company" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-neutral-900">Company Details</h3>

            {/* Company Logo Upload */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
              <label className="block text-xs font-black text-emerald-700 uppercase tracking-widest mb-4">
                Company Logo
              </label>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border-2 border-emerald-300">
                    {companyLogo ? (
                      <img src={companyLogo} alt="Company Logo" className="w-full h-full object-contain p-2" />
                    ) : (
                      <Building2 className="w-10 h-10 text-emerald-600" />
                    )}
                  </div>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <button
                    onClick={triggerLogoInput}
                    disabled={!isEditing}
                    className="absolute -bottom-2 -right-2 w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-emerald-900 mb-2">
                    Upload your company logo
                  </p>
                  <p className="text-sm text-emerald-700 font-bold">
                    Recommended: Square image, at least 200x200px. Max size: 5MB
                  </p>
                  <button
                    onClick={triggerLogoInput}
                    disabled={!isEditing}
                    className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed"
                  >
                    Choose File
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Company / Organization
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={userData.company}
                    onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={userData.website}
                    onChange={(e) => setUserData({ ...userData, website: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={userData.city}
                  onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  State / Province
                </label>
                <input
                  type="text"
                  value={userData.state}
                  onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Zip / Postal Code
                </label>
                <input
                  type="text"
                  value={userData.zipCode}
                  onChange={(e) => setUserData({ ...userData, zipCode: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Country
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={userData.country}
                    onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* GST No */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  GST No
                </label>
                <input
                  type="text"
                  value={userData.gstNo}
                  onChange={(e) => setUserData({ ...userData, gstNo: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>

              {/* Founder Name */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Founder Name
                </label>
                <input
                  type="text"
                  value={userData.founderName}
                  onChange={(e) => setUserData({ ...userData, founderName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>

              {/* Date of Incorporation */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Date of Incorporation
                </label>
                <input
                  type="date"
                  value={userData.dateOfIncorporation}
                  onChange={(e) => setUserData({ ...userData, dateOfIncorporation: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-xs font-black text-neutral-700 uppercase tracking-widest mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={userData.industry}
                  onChange={(e) => setUserData({ ...userData, industry: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "account" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-neutral-900">Account Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100">
                <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">Account Type</p>
                <p className="text-2xl font-black text-emerald-600">{userData.accountType}</p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100">
                <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">Status</p>
                <p className="text-2xl font-black text-emerald-600">{userData.subscriptionStatus}</p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100">
                <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">Date Joined</p>
                <p className="text-lg font-black text-neutral-900">{userData.dateJoined}</p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100">
                <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">Last Login</p>
                <p className="text-lg font-black text-neutral-900">{userData.lastLogin}</p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-blue-900 mb-2">Account Security</h4>
                  <p className="text-sm text-blue-800 font-bold">
                    Your account is protected with industry-standard encryption and multi-factor authentication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "subscription" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-neutral-900">Subscription Details</h3>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border-2 border-emerald-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-3xl font-black text-emerald-900">{userData.accountType} Plan</h4>
                  <p className="text-emerald-700 font-bold mt-1">{userData.billingCycle} Billing</p>
                </div>
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">Next Billing Date</p>
                  <p className="text-xl font-black text-emerald-900">{userData.nextBillingDate}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-xl font-black text-emerald-900">{userData.subscriptionStatus}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                Upgrade Plan
              </button>
              <button className="flex-1 py-4 bg-neutral-200 text-neutral-700 rounded-xl font-black text-sm hover:bg-neutral-300 transition-all">
                Manage Billing
              </button>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-neutral-900">Notification Preferences</h3>
            
            <div className="space-y-4">
              {[
                { label: "Email Notifications", description: "Receive updates via email" },
                { label: "SMS Alerts", description: "Get text messages for critical updates" },
                { label: "Push Notifications", description: "Browser and mobile notifications" },
                { label: "Weekly Reports", description: "Receive weekly sustainability reports" },
                { label: "Monthly Summaries", description: "Get monthly emission summaries" },
                { label: "Team Activity", description: "Notifications about team member actions" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100">
                  <div>
                    <p className="font-black text-neutral-900">{item.label}</p>
                    <p className="text-sm text-neutral-500 font-bold mt-1">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-14 h-7 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-neutral-900">Security Settings</h3>
            
            <div className="space-y-4">
              <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-black text-neutral-900">Password</p>
                    <p className="text-sm text-neutral-500 font-bold mt-1">Last changed 45 days ago</p>
                  </div>
                  <button className="px-6 py-2 bg-neutral-200 text-neutral-700 rounded-xl font-black text-sm hover:bg-neutral-300 transition-all">
                    Change
                  </button>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-black text-neutral-900">Two-Factor Authentication</p>
                    <p className="text-sm text-emerald-600 font-bold mt-1">Enabled</p>
                  </div>
                  <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all">
                    Manage
                  </button>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-black text-neutral-900">Active Sessions</p>
                    <p className="text-sm text-neutral-500 font-bold mt-1">3 active sessions</p>
                  </div>
                  <button className="px-6 py-2 bg-neutral-200 text-neutral-700 rounded-xl font-black text-sm hover:bg-neutral-300 transition-all">
                    View All
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
                <h4 className="font-black text-amber-900 mb-2">Delete Account</h4>
                <p className="text-sm text-amber-800 font-bold mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="px-6 py-2 bg-red-600 text-white rounded-xl font-black text-sm hover:bg-red-700 transition-all">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}