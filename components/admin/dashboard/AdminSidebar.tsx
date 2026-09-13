"use client";

import Link from "next/link";
import { LogOut, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { LogoutDialog } from "@/components/auth/LogoutDialog";
import { removeAuthToken } from "@/lib/api/auth";
import { adminNavigation } from "@/data/admin/dashboard/navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  function handleLogout() {
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
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-100 px-5">
          <Link
            href="/admin/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-sm font-bold text-white">
              R
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-gray-900">
                RAFE Dental
              </p>

              <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Admin Panel
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
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
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
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.8} />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="shrink-0 border-t border-gray-100 p-4">
          {/* Clinic Information */}
          <div className="rounded-xl bg-gray-50 px-3 py-3">
            <p className="text-xs font-semibold text-gray-700">
              RAFE Dental Clinic
            </p>

            <p className="mt-0.5 text-[10px] text-gray-400">
              Administration Portal
            </p>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={() => setIsLogoutDialogOpen(true)}
            className="cursor-pointer mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} strokeWidth={1.8} />

            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation */}
      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        isLoading={isLoggingOut}
        onCancel={() => {
          if (!isLoggingOut) {
            setIsLogoutDialogOpen(false);
          }
        }}
        onConfirm={handleLogout}
      />
    </>
  );
}
