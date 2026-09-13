"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { LogoutDialog } from "@/components/auth/LogoutDialog";
import { removeAuthToken } from "@/lib/api/auth";

import { AdminNotificationDropdown } from "./AdminNotificationDropdown";

import type { AdminNotification } from "@/types/admin/notifications";
import type { AdminProfile } from "@/types/admin/profile";

interface AdminHeaderProps {
  pageTitle?: string;

  profile: AdminProfile | null;
  isProfileLoading: boolean;

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

function getInitials(firstName: string, lastName: string) {
  const firstInitial = firstName.trim().charAt(0);
  const lastInitial = lastName.trim().charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

function formatRole(role: string) {
  if (!role) {
    return "Administrator";
  }

  return role.charAt(0).toUpperCase() + role.slice(1);
}

export function AdminHeader({
  pageTitle = "Dashboard",
  profile,
  isProfileLoading,
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
  const router = useRouter();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const firstName = profile?.first_name ?? "";
  const lastName = profile?.last_name ?? "";

  const fullName =
    firstName || lastName ? `${firstName} ${lastName}`.trim() : "Admin";

  const initials =
    firstName || lastName ? getInitials(firstName, lastName) : "AD";

  const role = profile?.role ? formatRole(profile.role) : "Administrator";

  function handleOpenLogout() {
    setIsProfileMenuOpen(false);
    setIsLogoutDialogOpen(true);
  }

  function handleCancelLogout() {
    if (isLoggingOut) return;

    setIsLogoutDialogOpen(false);
  }

  function handleConfirmLogout() {
    setIsLoggingOut(true);

    removeAuthToken();

    router.replace("/login");
  }

  return (
    <>
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
          {/* Notifications */}
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
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen((current) => !current)}
              aria-label="Open admin profile menu"
              aria-expanded={isProfileMenuOpen}
              className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50"
            >
              {/* Initials */}
              <div className="cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold uppercase text-teal-700">
                {isProfileLoading ? "..." : initials}
              </div>

              {/* Name + Role */}
              <div className="cursor-pointer min-w-0 text-left">
                <p className="max-w-40 truncate text-sm font-semibold text-gray-900">
                  {isProfileLoading ? "Loading..." : fullName}
                </p>

                <p className="text-xs text-gray-400">
                  {isProfileLoading ? "Loading..." : role}
                </p>
              </div>

              <ChevronDown
                size={16}
                strokeWidth={1.8}
                className={`ml-1 shrink-0 text-gray-400 transition-transform ${
                  isProfileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close profile menu"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="fixed inset-0 z-40 cursor-default"
                />

                <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                  {/* Profile Summary */}
                  <div className="border-b border-gray-100 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold uppercase text-teal-700">
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {fullName}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-gray-400">
                          {profile?.email ?? ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      <User size={17} strokeWidth={1.8} />
                      Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      <Settings size={17} strokeWidth={1.8} />
                      Settings
                    </button>

                    <div className="my-1 border-t border-gray-100" />

                    <button
                      type="button"
                      onClick={handleOpenLogout}
                      className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <LogOut size={17} strokeWidth={1.8} />
                      Log out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation */}
      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        isLoading={isLoggingOut}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
