import React, { useState } from "react";
import { X, User, Mail, Phone, Building2, Shield, Eye, Edit3 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  branchName: string;
  onEditUser: (updatedUser: any) => void;
}

export function EditUserModal({ isOpen, onClose, user, branchName, onEditUser }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    department: user?.department || "",
    accessLevel: user?.accessLevel || "viewer",
    permissions: user?.permissions || {
      scope1: { view: true, edit: false },
      scope2: { view: true, edit: false },
      scope3: { view: true, edit: false },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.role) {
      return;
    }

    onEditUser({
      ...user,
      ...formData,
    });
    onClose();
  };

  const handlePermissionChange = (scope: "scope1" | "scope2" | "scope3", type: "view" | "edit", value: boolean) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [scope]: {
          ...formData.permissions[scope],
          [type]: value,
        },
      },
    });
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
              <Edit3 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-black text-2xl text-neutral-900 dark:text-white">Edit User</h2>
              <p className="text-sm text-neutral-500 mt-1">
                Update user details for <span className="font-bold text-emerald-600">{branchName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-neutral-500" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-neutral-500" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@company.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-neutral-500" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-neutral-500" />
                    Job Role *
                  </Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Environmental Manager"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-neutral-500" />
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g., Sustainability"
                  />
                </div>
              </div>
            </div>

            {/* Access Level */}
            <div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-4">Access Level</h3>
              <div className="space-y-2">
                <Label htmlFor="accessLevel" className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-neutral-500" />
                  User Access Level *
                </Label>
                <Select
                  value={formData.accessLevel}
                  onValueChange={(value) => setFormData({ ...formData, accessLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin - Full access to all scopes</SelectItem>
                    <SelectItem value="editor">Editor - Can view and edit assigned scopes</SelectItem>
                    <SelectItem value="viewer">Viewer - Can only view data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Scope Permissions */}
            <div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-4">Scope Permissions</h3>
              <div className="space-y-4">
                {/* Scope 1 */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-200 dark:border-emerald-700">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-neutral-900 dark:text-white">Scope 1 - Direct Emissions</h4>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope1-view"
                        checked={formData.permissions.scope1.view}
                        onCheckedChange={(checked) => handlePermissionChange("scope1", "view", checked as boolean)}
                      />
                      <Label htmlFor="scope1-view" className="cursor-pointer flex items-center gap-1">
                        <Eye className="w-4 h-4 text-emerald-600" />
                        View
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope1-edit"
                        checked={formData.permissions.scope1.edit}
                        onCheckedChange={(checked) => handlePermissionChange("scope1", "edit", checked as boolean)}
                      />
                      <Label htmlFor="scope1-edit" className="cursor-pointer flex items-center gap-1">
                        <Edit3 className="w-4 h-4 text-emerald-600" />
                        Edit
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Scope 2 */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-neutral-900 dark:text-white">Scope 2 - Indirect Emissions</h4>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope2-view"
                        checked={formData.permissions.scope2.view}
                        onCheckedChange={(checked) => handlePermissionChange("scope2", "view", checked as boolean)}
                      />
                      <Label htmlFor="scope2-view" className="cursor-pointer flex items-center gap-1">
                        <Eye className="w-4 h-4 text-blue-600" />
                        View
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope2-edit"
                        checked={formData.permissions.scope2.edit}
                        onCheckedChange={(checked) => handlePermissionChange("scope2", "edit", checked as boolean)}
                      />
                      <Label htmlFor="scope2-edit" className="cursor-pointer flex items-center gap-1">
                        <Edit3 className="w-4 h-4 text-blue-600" />
                        Edit
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Scope 3 */}
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-200 dark:border-indigo-700">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-neutral-900 dark:text-white">Scope 3 - Value Chain Emissions</h4>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope3-view"
                        checked={formData.permissions.scope3.view}
                        onCheckedChange={(checked) => handlePermissionChange("scope3", "view", checked as boolean)}
                      />
                      <Label htmlFor="scope3-view" className="cursor-pointer flex items-center gap-1">
                        <Eye className="w-4 h-4 text-indigo-600" />
                        View
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope3-edit"
                        checked={formData.permissions.scope3.edit}
                        onCheckedChange={(checked) => handlePermissionChange("scope3", "edit", checked as boolean)}
                      />
                      <Label htmlFor="scope3-edit" className="cursor-pointer flex items-center gap-1">
                        <Edit3 className="w-4 h-4 text-indigo-600" />
                        Edit
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-100 dark:border-neutral-700">
          <p className="text-sm text-neutral-500">
            * Required fields
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
