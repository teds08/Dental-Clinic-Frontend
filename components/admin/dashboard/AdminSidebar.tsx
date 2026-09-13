"use client";

import { LogOut, Stethoscope, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { LogoutDialog } from "@/components/auth/LogoutDialog";
import { removeAuthToken } from "@/lib/api/auth";
import { adminNavigation } from "@/data/admin/dashboard/navigation";

import type { AdminProfile } from "@/types/admin/profile";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AdminProfile | null;
  isProfileLoading: boolean;
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

export function AdminSidebar({
  isOpen,
  onClose,
  profile,
  isProfileLoading,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const firstName = profile?.first_name ?? "";
  const lastName = profile?.last_name ?? "";

  const fullName =
    firstName || lastName ? `${firstName} ${lastName}`.trim() : "Admin";

  const initials =
    firstName || lastName ? getInitials(firstName, lastName) : "AD";

  const role = profile?.role ? formatRole(profile.role) : "Administrator";

  function handleNavigation() {
    onClose();
  }

  function handleOpenLogout() {
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
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-100 px-6">
          <Link
            href="/admin/dashboard"
            onClick={handleNavigation}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white">
              <Stethoscope size={19} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-gray-900">
                RAFE Dental
              </p>

              <p className="text-[10px] font-medium text-gray-400">
                Admin Portal
              </p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 lg:hidden"
          >
            <X size={19} strokeWidth={1.8} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Management
          </p>

          <div className="space-y-1">
            {adminNavigation.map((item) => {
              const Icon = item.icon;

              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigation}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="shrink-0 border-t border-gray-100 p-4">
          {/* Admin Profile */}
          <div className="mb-2 rounded-xl bg-gray-50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold uppercase text-teal-700">
                {isProfileLoading ? "..." : initials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {isProfileLoading ? "Loading..." : fullName}
                </p>

                <p className="mt-0.5 truncate text-xs text-gray-400">
                  {isProfileLoading ? "Loading..." : role}
                </p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleOpenLogout}
            className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Log out
          </button>
        </div>
      </aside>

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
