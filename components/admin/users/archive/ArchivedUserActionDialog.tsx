"use client";

import { RotateCcw, Trash2, X } from "lucide-react";

import type { ArchivedUser } from "@/types/admin/users";

export type ArchivedUserAction = "restore" | "delete";

interface ArchivedUserActionDialogProps {
  open: boolean;
  user: ArchivedUser | null;
  action: ArchivedUserAction;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export function ArchivedUserActionDialog({
  open,
  user,
  action,
  loading = false,
  onClose,
  onConfirm,
}: ArchivedUserActionDialogProps) {
  if (!open || !user) {
    return null;
  }

  const isDelete = action === "delete";
  const fullName = `${user.first_name} ${user.last_name}`;

  const title = isDelete ? "Permanently delete user?" : "Restore user?";

  const description = isDelete
    ? `This will permanently delete ${fullName}'s account and all associated data. This action cannot be undone.`
    : `${fullName}'s account will be restored and returned to the active users list.`;

  const confirmLabel = isDelete ? "Delete Permanently" : "Restore User";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
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
        aria-labelledby="archived-user-action-title"
        aria-describedby="archived-user-action-description"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
              isDelete ? "bg-red-50" : "bg-teal-50"
            }`}
          >
            {isDelete ? (
              <Trash2 size={21} strokeWidth={1.9} className="text-red-600" />
            ) : (
              <RotateCcw
                size={21}
                strokeWidth={1.9}
                className="text-teal-700"
              />
            )}
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

        {/* Content */}
        <div className="mt-4">
          <h2
            id="archived-user-action-title"
            className="text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>

          <p
            id="archived-user-action-description"
            className="mt-2 text-sm leading-6 text-gray-500"
          >
            {description}
          </p>
        </div>

        {/* Actions */}
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
                : "bg-teal-700 hover:bg-teal-800"
            }`}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
