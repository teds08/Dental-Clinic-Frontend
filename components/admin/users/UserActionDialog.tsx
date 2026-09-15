"use client";

import { AlertTriangle, X } from "lucide-react";

import type { AdminUser } from "@/types/admin/users";

export type UserAction = "archive" | "delete";

interface UserActionDialogProps {
  open: boolean;
  user: AdminUser | null;
  action: UserAction;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export function UserActionDialog({
  open,
  user,
  action,
  loading = false,
  onClose,
  onConfirm,
}: UserActionDialogProps) {
  if (!open || !user) {
    return null;
  }

  const isDelete = action === "delete";

  const fullName = `${user.first_name} ${user.last_name}`;

  const title = isDelete ? "Permanently delete user?" : "Archive user?";

  const description = isDelete
    ? `This will permanently delete ${fullName}'s account and cannot be undone.`
    : `${fullName}'s account will be archived and removed from the active users list. You can restore the account later.`;

  const confirmLabel = isDelete ? "Delete Permanently" : "Archive User";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-action-dialog-title"
        aria-describedby="user-action-dialog-description"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50">
            <AlertTriangle
              size={22}
              strokeWidth={1.9}
              className="text-amber-600"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close dialog"
            className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        <div className="mt-4">
          <h2
            id="user-action-dialog-title"
            className="text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>

          <p
            id="user-action-dialog-description"
            className="mt-2 text-sm leading-6 text-gray-500"
          >
            {description}
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="h-10 cursor-pointer rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={loading}
            className={`h-10 cursor-pointer rounded-xl px-4 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              isDelete
                ? "bg-red-600 hover:bg-red-700"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
