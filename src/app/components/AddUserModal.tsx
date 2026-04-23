import React, { useState } from "react";
import { X, UserPlus, Mail, Briefcase, Building2, Shield } from "lucide-react";
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

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  branchName: string;
  onAddUser: (user: any) => void;
}

export function AddUserModal({ isOpen, onClose, branchName, onAddUser }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    accessLevel: "viewer",
  });

  const [permissions, setPermissions] = useState({
    scope1: { view: false, edit: false },
    scope2: { view: false, edit: false },
    scope3: { view: false, edit: false },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.role || !formData.department) {
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      ...formData,
      permissions,
      addedDate: new Date().toISOString().split("T")[0],
    };

    onAddUser(newUser);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      accessLevel: "viewer",
    });
    setPermissions({
      scope1: { view: false, edit: false },
      scope2: { view: false, edit: false },
      scope3: { view: false, edit: false },
    });
    onClose();
  };

  const handlePermissionChange = (scope: "scope1" | "scope2" | "scope3", type: "view" | "edit", checked: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      [scope]: {
        ...prev[scope],
        [type]: checked,
        // If edit is checked, view should also be checked
        ...(type === "edit" && checked ? { view: true } : {}),
      },
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-700">
          <div>
            <h2 className="font-black text-2xl text-neutral-900 dark:text-white">Add New User</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Add a team member to <span className="font-bold text-emerald-600">{branchName}</span>
            </p>
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
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-neutral-500" />
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
                    <Mail className="w-4 h-4 text-neutral-500" />
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
                    <Briefcase className="w-4 h-4 text-neutral-500" />
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
                    Department *
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sustainability">Sustainability</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Legal">Legal & Compliance</SelectItem>
                      <SelectItem value="Strategy">Strategy & Planning</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="IT">Information Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessLevel" className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-neutral-500" />
                    Access Level *
                  </Label>
                  <Select
                    value={formData.accessLevel}
                    onValueChange={(value) => setFormData({ ...formData, accessLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin - Full Access</SelectItem>
                      <SelectItem value="editor">Editor - Can Edit Data</SelectItem>
                      <SelectItem value="viewer">Viewer - Read Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Scope Permissions */}
            <div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-4">Emissions Scope Permissions</h3>
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 space-y-4">
                {/* Scope 1 */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-white">Scope 1: Direct Emissions</p>
                    <p className="text-sm text-neutral-500 mt-1">Company vehicles, combustion sources</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope1-view"
                        checked={permissions.scope1.view}
                        onCheckedChange={(checked) => handlePermissionChange("scope1", "view", checked as boolean)}
                      />
                      <Label htmlFor="scope1-view" className="text-sm font-bold cursor-pointer">
                        View
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope1-edit"
                        checked={permissions.scope1.edit}
                        onCheckedChange={(checked) => handlePermissionChange("scope1", "edit", checked as boolean)}
                      />
                      <Label htmlFor="scope1-edit" className="text-sm font-bold cursor-pointer">
                        Edit
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Scope 2 */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-white">Scope 2: Indirect Emissions</p>
                    <p className="text-sm text-neutral-500 mt-1">Purchased electricity, heating, cooling</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope2-view"
                        checked={permissions.scope2.view}
                        onCheckedChange={(checked) => handlePermissionChange("scope2", "view", checked as boolean)}
                      />
                      <Label htmlFor="scope2-view" className="text-sm font-bold cursor-pointer">
                        View
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope2-edit"
                        checked={permissions.scope2.edit}
                        onCheckedChange={(checked) => handlePermissionChange("scope2", "edit", checked as boolean)}
                      />
                      <Label htmlFor="scope2-edit" className="text-sm font-bold cursor-pointer">
                        Edit
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Scope 3 */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-white">Scope 3: Value Chain Emissions</p>
                    <p className="text-sm text-neutral-500 mt-1">Supply chain, business travel, commuting</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope3-view"
                        checked={permissions.scope3.view}
                        onCheckedChange={(checked) => handlePermissionChange("scope3", "view", checked as boolean)}
                      />
                      <Label htmlFor="scope3-view" className="text-sm font-bold cursor-pointer">
                        View
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="scope3-edit"
                        checked={permissions.scope3.edit}
                        onCheckedChange={(checked) => handlePermissionChange("scope3", "edit", checked as boolean)}
                      />
                      <Label htmlFor="scope3-edit" className="text-sm font-bold cursor-pointer">
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
        <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-100 dark:border-neutral-700">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>
    </div>
  );
}