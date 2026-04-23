import React, { useState } from "react";
import { X, UserPlus, Search, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

interface UserAllotmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  branchName: string;
  onAssign: (users: any[]) => void;
}

// Mock users data
const MOCK_USERS = [
  { id: "1", name: "Amit Sharma", email: "amit.sharma@company.com", role: "Environmental Manager", department: "Sustainability", avatar: "AS" },
  { id: "2", name: "Priya Patel", email: "priya.patel@company.com", role: "Data Analyst", department: "Operations", avatar: "PP" },
  { id: "3", name: "Rajesh Kumar", email: "rajesh.kumar@company.com", role: "Compliance Officer", department: "Legal", avatar: "RK" },
  { id: "4", name: "Sneha Reddy", email: "sneha.reddy@company.com", role: "Energy Auditor", department: "Engineering", avatar: "SR" },
  { id: "5", name: "Vikram Singh", email: "vikram.singh@company.com", role: "Sustainability Coordinator", department: "Operations", avatar: "VS" },
  { id: "6", name: "Ananya Iyer", email: "ananya.iyer@company.com", role: "Carbon Accountant", department: "Finance", avatar: "AI" },
  { id: "7", name: "Karan Mehta", email: "karan.mehta@company.com", role: "Environmental Specialist", department: "Sustainability", avatar: "KM" },
  { id: "8", name: "Neha Gupta", email: "neha.gupta@company.com", role: "ESG Analyst", department: "Strategy", avatar: "NG" },
];

export function UserAllotmentModal({ isOpen, onClose, branchName, onAssign }: UserAllotmentModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleAssign = () => {
    const usersToAssign = MOCK_USERS.filter((user) => selectedUsers.includes(user.id));
    onAssign(usersToAssign);
    setSelectedUsers([]);
    setSearchQuery("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-700">
          <div>
            <h2 className="font-black text-2xl text-neutral-900 dark:text-white">Assign Users</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Assign team members to <span className="font-bold text-emerald-600">{branchName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or role..."
              className="pl-10"
            />
          </div>

          {selectedUsers.length > 0 && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Selected ({selectedUsers.length}):
              </span>
              {selectedUsers.map((userId) => {
                const user = MOCK_USERS.find((u) => u.id === userId);
                return (
                  <Badge key={userId} variant="secondary" className="gap-1">
                    {user?.name}
                    <button
                      onClick={() => toggleUser(userId)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {filteredUsers.map((user) => {
              const isSelected = selectedUsers.includes(user.id);
              return (
                <button
                  key={user.id}
                  onClick={() => toggleUser(user.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-emerald-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                    }`}
                  >
                    {user.avatar}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-neutral-900 dark:text-white">{user.name}</p>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-neutral-500">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {user.department}
                      </Badge>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <UserPlus className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 font-bold">No users found</p>
              <p className="text-sm text-neutral-400 mt-1">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-100 dark:border-neutral-700">
          <p className="text-sm text-neutral-500">
            {selectedUsers.length} user(s) selected
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              disabled={selectedUsers.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Assign Users ({selectedUsers.length})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
