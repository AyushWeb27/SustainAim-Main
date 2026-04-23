import React, { useState } from "react";
import { X } from "lucide-react";
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

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (branch: any) => void;
}

export function AddBranchModal({ isOpen, onClose, onAdd }: AddBranchModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    manager: "",
    phone: "",
    email: "",
    establishedDate: "",
    branchType: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBranch = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: "Active",
      employeeCount: 0,
      scope1Total: 0,
      scope2Total: 0,
      scope3Total: 0,
    };
    onAdd(newBranch);
    setFormData({
      name: "",
      location: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      manager: "",
      phone: "",
      email: "",
      establishedDate: "",
      branchType: "",
      description: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-700">
          <div>
            <h2 className="font-black text-2xl text-neutral-900 dark:text-white">Add New Branch</h2>
            <p className="text-sm text-neutral-500 mt-1">Create a new branch location for your organization</p>
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
            {/* Branch Information */}
            <div>
              <h3 className="font-bold text-sm text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">Branch Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Branch Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Mumbai Headquarters"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="branchType">Branch Type *</Label>
                  <Select
                    value={formData.branchType}
                    onValueChange={(value) => setFormData({ ...formData, branchType: value })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="headquarters">Headquarters</SelectItem>
                      <SelectItem value="regional">Regional Office</SelectItem>
                      <SelectItem value="factory">Manufacturing Plant</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="retail">Retail Store</SelectItem>
                      <SelectItem value="service">Service Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="establishedDate">Established Date</Label>
                  <Input
                    id="establishedDate"
                    type="date"
                    value={formData.establishedDate}
                    onChange={(e) => setFormData({ ...formData, establishedDate: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div>
              <h3 className="font-bold text-sm text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">Location Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="location">Street Address *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., 123 Business Park"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g., Mumbai"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g., Maharashtra"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="e.g., 400001"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="mt-2"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-bold text-sm text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="manager">Branch Manager</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    placeholder="e.g., Rajesh Kumar"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g., +91 98765 43210"
                    className="mt-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g., mumbai@company.com"
                    className="mt-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the branch..."
                    className="mt-2"
                    rows={3}
                  />
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
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Add Branch
          </Button>
        </div>
      </div>
    </div>
  );
}
