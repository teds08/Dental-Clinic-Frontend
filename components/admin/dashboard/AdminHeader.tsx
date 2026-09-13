"use client";

import { ChevronDown } from "lucide-react";

import { AdminNotificationDropdown } from "./AdminNotificationDropdown";

import type { AdminNotification } from "@/types/admin/notifications";

interface AdminHeaderProps {
  pageTitle?: string;
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

export function AdminHeader({
  pageTitle = "Dashboard",
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
}: AdminHeaderProps) {
  return (
    <header className="hidden h-20 items-center justify-between border-b border-gray-200 bg-white px-8 lg:flex">
      {/* Page Title */}
      <div>
        <p className="text-xs font-medium text-gray-400">Admin Portal</p>

        <h1 className="mt-1 text-xl font-bold tracking-tight text-gray-900">
          {pageTitle}
        </h1>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-5">
        <AdminNotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          isOpen={isOpen}
          isLoading={isLoading}
          isActionLoading={isActionLoading}
          error={error}
          onToggle={onToggle}
          onClose={onClose}
          onMarkAsRead={onMarkAsRead}
          onMarkAllAsRead={onMarkAllAsRead}
          onDelete={onDelete}
        />

        <div className="h-8 w-px bg-gray-200" />

        {/* Admin Profile */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
            AD
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">Admin</p>

            <p className="text-xs text-gray-400">Administrator</p>
          </div>

          <ChevronDown
            size={16}
            strokeWidth={1.8}
            className="ml-1 text-gray-400"
          />
        </button>
      </div>
    </header>
  );
}
