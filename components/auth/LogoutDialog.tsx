"use client";

import { LogOut, X } from "lucide-react";

interface LogoutDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function LogoutDialog({
  isOpen,
  isLoading,
  onCancel,
  onConfirm,
}: LogoutDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-dialog-title"
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
      >
        {/* Icon */}
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <LogOut size={21} strokeWidth={1.8} />
        </div>

        {/* Content */}
        <div className="mt-4">
          <h2
            id="logout-dialog-title"
            className="text-center text-lg font-bold tracking-tight text-gray-900"
          >
            Log out?
          </h2>

          <p className="mt-2 text-sm text-justify leading-6 text-gray-500">
            Are you sure you want to log out of the RAFE Dental admin panel?
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="cursor-pointer flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={15} strokeWidth={1.8} />
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="cursor-pointer flex h-10 items-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={15} strokeWidth={1.8} />
            {isLoading ? "Logging out..." : "Log out"}
          </button>
        </div>
      </div>
    </div>
  );
}
