"use client";

import { Bell, CheckCheck, Trash2, X } from "lucide-react";

import type { AdminNotification } from "@/types/admin/notifications";

interface NotificationDetailsDialogProps {
  notification: AdminNotification | null;
  isOpen: boolean;
  isActionLoading: boolean;
  onClose: () => void;
  onMarkAsRead: (notificationId: number) => void;
  onDelete: (notificationId: number) => void;
}

function formatNotificationDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function NotificationDetailsDialog({
  notification,
  isOpen,
  isActionLoading,
  onClose,
  onMarkAsRead,
  onDelete,
}: NotificationDetailsDialogProps) {
  if (!isOpen || !notification) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5 py-6 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-details-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                notification.is_read
                  ? "bg-gray-50 text-gray-400"
                  : "bg-teal-50 text-teal-700"
              }`}
            >
              <Bell size={19} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  id="notification-details-title"
                  className="text-lg font-bold tracking-tight text-gray-900"
                >
                  {notification.title}
                </h2>

                {!notification.is_read && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-teal-600" />
                )}
              </div>

              <p className="mt-1 text-xs text-gray-400">
                {formatNotificationDate(notification.created_at)}
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification"
            className="cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={19} strokeWidth={1.8} />
          </button>
        </div>

        {/* Notification Content */}
        <div className="px-6 py-6">
          <div className="rounded-xl bg-gray-50 p-5">
            <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
              {notification.message}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => onDelete(notification.id)}
            disabled={isActionLoading}
            className="cursor-pointer flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={15} strokeWidth={1.8} />
            Delete
          </button>

          <div className="flex gap-2">
            {!notification.is_read && (
              <button
                type="button"
                onClick={() => onMarkAsRead(notification.id)}
                disabled={isActionLoading}
                className="cursor-pointer flex h-10 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCheck size={15} strokeWidth={1.8} />
                Mark as read
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              disabled={isActionLoading}
              className="cursor-pointer flex h-10 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
