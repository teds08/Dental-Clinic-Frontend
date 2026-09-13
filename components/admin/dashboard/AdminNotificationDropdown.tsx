"use client";

import { Bell, CheckCheck, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

import { NotificationDetailsDialog } from "./NotificationDetailsDialog";

import type { AdminNotification } from "@/types/admin/notifications";

interface AdminNotificationDropdownProps {
  notifications: AdminNotification[];
  unreadCount: number;
  isOpen: boolean;
  isLoading: boolean;
  isActionLoading: boolean;
  error: string;
  onToggle: () => void;
  onClose: () => void;
  onMarkAsRead: (notificationId: number) => void;
  onMarkAllAsRead: () => void;
  onDelete: (notificationId: number) => void;
}

function formatNotificationDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function AdminNotificationDropdown({
  notifications,
  unreadCount,
  isOpen,
  isLoading,
  isActionLoading,
  error,
  onToggle,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
}: AdminNotificationDropdownProps) {
  const [selectedNotification, setSelectedNotification] =
    useState<AdminNotification | null>(null);

  function handleNotificationClick(notification: AdminNotification) {
    setSelectedNotification(notification);
  }

  function handleCloseDetails() {
    setSelectedNotification(null);
  }

  function handleMarkAsRead(notificationId: number) {
    onMarkAsRead(notificationId);

    setSelectedNotification((current) =>
      current?.id === notificationId ? { ...current, is_read: true } : current,
    );
  }

  function handleDelete(notificationId: number) {
    onDelete(notificationId);

    if (selectedNotification?.id === notificationId) {
      setSelectedNotification(null);
    }
  }

  return (
    <>
      <div className="relative">
        {/* Notification Bell */}
        <button
          type="button"
          onClick={onToggle}
          aria-label="Notifications"
          aria-expanded={isOpen}
          className="cursor-pointer relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
        >
          <Bell size={20} strokeWidth={1.8} />

          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex min-w-[17px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-[17px] text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>

        {/* Notification List */}
        {isOpen && (
          <>
            {/* Mobile / outside-click layer */}
            <button
              type="button"
              aria-label="Close notifications"
              onClick={onClose}
              className="fixed inset-0 z-40 cursor-default lg:hidden"
            />

            <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              {/* List Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5">
                <div>
                  <h2 className="text-sm font-bold text-gray-900">
                    Notifications
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    {unreadCount > 0
                      ? `${unreadCount} unread`
                      : "You're all caught up"}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={onMarkAllAsRead}
                    disabled={isActionLoading}
                    className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CheckCheck size={14} strokeWidth={1.8} />
                    Mark all
                  </button>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="border-b border-red-100 bg-red-50 px-4 py-3">
                  <p className="text-xs font-medium text-red-600">{error}</p>
                </div>
              )}

              {/* Loading */}
              {isLoading ? (
                <div className="flex h-32 items-center justify-center">
                  <Loader2 size={20} className="animate-spin text-teal-700" />
                </div>
              ) : notifications.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                    <Bell size={19} strokeWidth={1.7} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-gray-700">
                    No notifications
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    New notifications will appear here.
                  </p>
                </div>
              ) : (
                /* Notification Items */
                <div className="max-h-[360px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`group flex items-center gap-3 border-b border-gray-100 px-4 py-3.5 transition-colors last:border-b-0 ${
                        notification.is_read
                          ? "bg-white hover:bg-gray-50"
                          : "bg-teal-50/40 hover:bg-teal-50"
                      }`}
                    >
                      {/* Notification Button */}
                      <button
                        type="button"
                        onClick={() => handleNotificationClick(notification)}
                        className="flex min-w-0 flex-1 items-center gap-3 text-left"
                      >
                        {/* Unread Indicator */}
                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${
                            notification.is_read
                              ? "bg-transparent"
                              : "bg-teal-600"
                          }`}
                        />

                        {/* Title + Date */}
                        <div className="cursor-pointer min-w-0 flex-1">
                          <p
                            className={`truncate text-sm ${
                              notification.is_read
                                ? "font-medium text-gray-700"
                                : "font-semibold text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </p>

                          <p className="mt-1 truncate text-[11px] text-gray-400">
                            {formatNotificationDate(notification.created_at)}
                          </p>
                        </div>
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(notification.id)}
                        disabled={isActionLoading}
                        aria-label={`Delete ${notification.title}`}
                        className="cursor-pointer flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={15} strokeWidth={1.8} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Notification Details Modal */}
      <NotificationDetailsDialog
        notification={selectedNotification}
        isOpen={selectedNotification !== null}
        isActionLoading={isActionLoading}
        onClose={handleCloseDetails}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
      />
    </>
  );
}
