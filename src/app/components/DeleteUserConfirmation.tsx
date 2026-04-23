import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "./ui/button";

interface DeleteUserConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export function DeleteUserConfirmation({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: DeleteUserConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="font-black text-xl text-neutral-900 dark:text-white">Delete User</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-neutral-600 dark:text-neutral-300">
            Are you sure you want to remove{" "}
            <span className="font-bold text-neutral-900 dark:text-white">{userName}</span> from this
            branch? This action cannot be undone.
          </p>
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl">
            <p className="text-sm text-red-700 dark:text-red-400">
              ⚠️ The user will lose access to all emissions data and reports for this branch.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-100 dark:border-neutral-700">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete User
          </Button>
        </div>
      </div>
    </div>
  );
}
