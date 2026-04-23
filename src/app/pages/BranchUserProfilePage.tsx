import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  Shield,
  Calendar,
  MapPin,
  Edit,
  Save,
  X,
  Camera,
  Award,
  Clock,
  CheckCircle,
  TrendingUp,
  FileText,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

export function BranchUserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const branchUserData = JSON.parse(localStorage.getItem("branchUser") || "{}");
  const permissions = branchUserData.permissions || {};

  const [formData, setFormData] = useState({
    name: branchUserData.name || "Branch User",
    email: branchUserData.email || "user@branch.com",
    phone: "+91 98765 43210",
    designation: branchUserData.role || "Branch Manager",
    department: "Operations",
    joiningDate: "2024-01-15",
    location: "Mumbai, Maharashtra"
  });

  const handleSave = () => {
    const updatedData = {
      ...branchUserData,
      name: formData.name,
      email: formData.email
    };
    localStorage.setItem("branchUser", JSON.stringify(updatedData));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
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
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="px-1">
        <h1 className="text-2xl md:text-4xl font-black text-neutral-900 mb-2 md:mb-3">My Profile</h1>
        <p className="text-sm md:text-lg text-neutral-600 font-bold">Manage your personal information and account settings</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl md:rounded-3xl border-2 border-neutral-100 overflow-hidden shadow-lg md:shadow-xl">
        {/* Cover */}
        <div className="h-32 md:h-40 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/10 rounded-full blur-3xl -mr-32 md:-mr-48 -mt-32 md:-mt-48" />
        </div>

        {/* Profile Info */}
        <div className="px-4 md:px-8 pb-6 md:pb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 -mt-16 md:-mt-20 relative z-10">
            {/* Avatar */}
            <div className="relative mx-auto md:mx-0">
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white to-neutral-50 border-4 border-white shadow-2xl overflow-hidden ${!profileImage ? 'flex items-center justify-center' : ''}`}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 md:w-20 md:h-20 text-neutral-300" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerFileInput}
                className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-10 h-10 md:w-12 md:h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center shadow-xl transition-colors"
              >
                <Camera className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.button>
            </div>

            {/* Info & Actions */}
            <div className="flex-1 md:mb-6 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-neutral-900 mb-2 md:mb-3">{formData.name}</h2>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300 font-black px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm">
                      {formData.designation}
                    </Badge>
                    <div className="flex items-center gap-2 text-neutral-600 bg-neutral-50 px-3 md:px-4 py-1 md:py-1.5 rounded-lg">
                      <Building2 className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="font-bold text-xs md:text-sm">{branchUserData.branchName}</span>
                    </div>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  {!isEditing ? (
                    <motion.div
                      key="edit"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="w-full md:w-auto"
                    >
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center justify-center gap-2 px-4 md:px-6 py-4 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 transform"
                      >
                        <Edit className="w-4 h-4 md:w-5 md:h-5" />
                        Edit Profile
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="save"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto"
                    >
                      <Button
                        onClick={handleSave}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center justify-center gap-2 px-4 md:px-6 py-4 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        <Save className="w-4 h-4 md:w-5 md:h-5" />
                        Save Changes
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="font-black flex items-center justify-center gap-2 px-4 md:px-6 py-4 md:py-6 rounded-xl border-2"
                      >
                        <X className="w-4 h-4 md:w-5 md:h-5" />
                        Cancel
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border-2 border-neutral-100 shadow-lg"
          >
            <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-6 md:mb-8">Personal Information</h3>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="text-xs font-black text-neutral-500 uppercase tracking-wider mb-2 md:mb-3 block">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 md:px-5 py-3 md:py-4 bg-neutral-50 border-2 border-neutral-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-sm md:text-base"
                  />
                ) : (
                  <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 shrink-0" />
                    <span className="font-bold text-neutral-900 text-base md:text-lg">{formData.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-black text-neutral-500 uppercase tracking-wider mb-2 md:mb-3 block">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 md:px-5 py-3 md:py-4 bg-neutral-50 border-2 border-neutral-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-sm md:text-base"
                  />
                ) : (
                  <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 shrink-0" />
                    <span className="font-bold text-neutral-900 text-base md:text-lg break-all">{formData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-black text-neutral-500 uppercase tracking-wider mb-2 md:mb-3 block">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 md:px-5 py-3 md:py-4 bg-neutral-50 border-2 border-neutral-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-sm md:text-base"
                  />
                ) : (
                  <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 shrink-0" />
                    <span className="font-bold text-neutral-900 text-base md:text-lg">{formData.phone}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="text-xs font-black text-neutral-500 uppercase tracking-wider mb-2 md:mb-3 block">
                    Department
                  </label>
                  <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <Building2 className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 shrink-0" />
                    <span className="font-bold text-neutral-900 text-base md:text-lg">{formData.department}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-neutral-500 uppercase tracking-wider mb-2 md:mb-3 block">
                    Location
                  </label>
                  <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 shrink-0" />
                    <span className="font-bold text-neutral-900 text-sm md:text-base">{formData.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-neutral-500 uppercase tracking-wider mb-2 md:mb-3 block">
                  Joining Date
                </label>
                <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 shrink-0" />
                  <span className="font-bold text-neutral-900 text-base md:text-lg">{formData.joiningDate}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Branch Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border-2 border-neutral-100 shadow-lg"
          >
            <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-6 md:mb-8">Branch Information</h3>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="text-xs font-black text-neutral-500 uppercase tracking-wider mb-2 md:mb-3 block">
                  Branch Name
                </label>
                <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                  <Building2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 shrink-0" />
                  <span className="font-black text-emerald-900 text-base md:text-lg">{branchUserData.branchName}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-neutral-500 uppercase tracking-wider mb-2 md:mb-3 block">
                  Branch ID
                </label>
                <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="font-mono font-bold text-neutral-700 text-base md:text-lg">BRN-{branchUserData.branchId}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Access Permissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border-2 border-neutral-100 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-emerald-50 rounded-xl">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-neutral-900">Access Permissions</h3>
            </div>
            <div className="space-y-3 md:space-y-4">
              {Object.entries(permissions).map(([scope, perms]: [string, any]) => (
                <motion.div
                  key={scope}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 md:p-5 bg-neutral-50 rounded-xl md:rounded-2xl border border-neutral-100 hover:border-emerald-200 transition-all"
                >
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <p className="font-black text-neutral-900 capitalize text-base md:text-lg">{scope}</p>
                    <Badge variant="outline" className={perms?.edit ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-black text-xs" : "bg-blue-50 text-blue-700 border-blue-300 font-black text-xs"}>
                      {perms?.edit ? "Full Access" : perms?.view ? "View Only" : "None"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {perms?.view && (
                      <span className="px-2 md:px-3 py-1 md:py-1.5 bg-white rounded-lg font-bold text-neutral-600 text-xs md:text-sm border border-neutral-200">
                        View
                      </span>
                    )}
                    {perms?.edit && (
                      <span className="px-2 md:px-3 py-1 md:py-1.5 bg-white rounded-lg font-bold text-neutral-600 text-xs md:text-sm border border-neutral-200">
                        Edit
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Account Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-white/10 rounded-full blur-3xl -mr-16 md:-mr-24 -mt-16 md:-mt-24" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <Activity className="w-5 h-5 md:w-6 md:h-6" />
                <h3 className="font-black text-lg md:text-xl">Account Activity</h3>
              </div>
              <div className="space-y-4 md:space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100 font-bold text-sm md:text-base">Entries Added</span>
                  <span className="text-2xl md:text-3xl font-black">47</span>
                </div>
                <div className="h-px bg-white/20" />
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100 font-bold text-sm md:text-base">Days Active</span>
                  <span className="text-2xl md:text-3xl font-black">145</span>
                </div>
                <div className="h-px bg-white/20" />
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100 font-bold text-sm md:text-base">Last Login</span>
                  <span className="font-black text-base md:text-lg">Today</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 border-2 border-neutral-100 shadow-lg"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-4">
              <div className="p-2 bg-amber-50 rounded-xl">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              </div>
              <h3 className="text-base md:text-lg font-black text-neutral-900">Achievements</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-neutral-900 text-sm">First Entry</p>
                  <p className="text-xs text-neutral-600 font-bold">Completed initial data entry</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <TrendingUp className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-neutral-900 text-sm">Consistent Logger</p>
                  <p className="text-xs text-neutral-600 font-bold">7 days streak</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}