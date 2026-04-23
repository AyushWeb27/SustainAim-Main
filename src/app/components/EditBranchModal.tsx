import React, { useState } from "react";
import { X, Building2, MapPin, Phone, Mail, User, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface EditBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  branch: any;
  onSave: (updatedBranch: any) => void;
}

export function EditBranchModal({ isOpen, onClose, branch, onSave }: EditBranchModalProps) {
  const [formData, setFormData] = useState({
    name: branch?.name || "",
    location: branch?.location || "",
    city: branch?.city || "",
    state: branch?.state || "",
    pincode: branch?.pincode || "",
    country: branch?.country || "India",
    manager: branch?.manager || "",
    phone: branch?.phone || "",
    email: branch?.email || "",
    branchType: branch?.branchType || "regional",
    description: branch?.description || "",
    status: branch?.status || "Active",
    employeeCount: branch?.employeeCount || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.location || !formData.city) {
      return;
    }

    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-black text-2xl text-neutral-900 dark:text-white">Edit Branch</h2>
              <p className="text-sm text-neutral-500 mt-1">Update branch information and details</p>
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
                    <Building2 className="w-4 h-4 text-neutral-500" />
                    Branch Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter branch name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branchType" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-neutral-500" />
                    Branch Type *
                  </Label>
                  <Select
                    value={formData.branchType}
                    onValueChange={(value) => setFormData({ ...formData, branchType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="headquarters">Headquarters</SelectItem>
                      <SelectItem value="regional">Regional Office</SelectItem>
                      <SelectItem value="factory">Factory</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="retail">Retail Store</SelectItem>
                      <SelectItem value="service">Service Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-neutral-500" />
                    Status *
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Under Construction">Under Construction</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter branch description"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-4">Location Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-500" />
                    Street Address *
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter street address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">
                    City *
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Enter city"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">
                    State *
                  </Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Enter state"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">
                    Pincode
                  </Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="Enter pincode"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">
                    Country *
                  </Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Enter country"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact & Management */}
            <div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-4">Contact & Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manager" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-neutral-500" />
                    Branch Manager *
                  </Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    placeholder="Enter manager name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-neutral-500" />
                    Employee Count
                  </Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({ ...formData, employeeCount: parseInt(e.target.value) || 0 })}
                    placeholder="Enter employee count"
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
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-neutral-500" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="branch@company.com"
                  />
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
              <Building2 className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
