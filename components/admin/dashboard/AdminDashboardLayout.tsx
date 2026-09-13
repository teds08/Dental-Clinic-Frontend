"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SessionExpiredHandler } from "@/components/auth/SessionExpiredHandler";
import { useAdminNotifications } from "@/hooks/admin/useAdminNotifications";
import { useAdminProfile } from "@/hooks/admin/useAdminProfile";

import { AdminHeader } from "./AdminHeader";
import { AdminNotificationDropdown } from "./AdminNotificationDropdown";
import { AdminSidebar } from "./AdminSidebar";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/admin/appointments")) {
    return "Appointments";
  }

  if (pathname.startsWith("/admin/users")) {
    return "Users";
  }

  if (pathname.startsWith("/admin/services")) {
    return "Services";
  }

  if (pathname.startsWith("/admin/coupons")) {
    return "Coupons";
  }

  if (pathname.startsWith("/admin/points")) {
    return "Points";
  }

  if (pathname.startsWith("/admin/settings")) {
    return "Settings";
  }

  return "Dashboard";
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    isOpen,
    isLoading,
    isActionLoading,
    error,
    toggleNotifications,
    closeNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useAdminNotifications();

  const { profile, isLoading: isProfileLoading } = useAdminProfile();

  const notificationProps = {
    notifications,
    unreadCount,
    isOpen,
    isLoading,
    isActionLoading,
    error,
    onToggle: toggleNotifications,
    onClose: closeNotifications,
    onMarkAsRead: markAsRead,
    onMarkAllAsRead: markAllAsRead,
    onDelete: removeNotification,
  };

  return (
    <div className="min-h-screen bg-gray-50 section-pattern section-pattern-glow">
      <SessionExpiredHandler />

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        profile={profile}
        isProfileLoading={isProfileLoading}
      />

      <div className="min-h-screen lg:pl-64">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-5 lg:hidden">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100"
            >
              <Menu size={21} strokeWidth={1.8} />
            </button>

            <div className="ml-3">
              <p className="text-[10px] font-medium text-gray-400">
                Admin Portal
              </p>

              <p className="text-sm font-semibold text-gray-900">{pageTitle}</p>
            </div>
          </div>

          {/* Mobile Notifications */}
          <AdminNotificationDropdown {...notificationProps} />
        </header>

        {/* Desktop Header */}
        <AdminHeader
          pageTitle={pageTitle}
          profile={profile}
          isProfileLoading={isProfileLoading}
          notifications={notifications}
          unreadCount={unreadCount}
          isOpen={isOpen}
          isLoading={isLoading}
          isActionLoading={isActionLoading}
          error={error}
          onToggle={toggleNotifications}
          onClose={closeNotifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onDelete={removeNotification}
        />

        <main className="p-5 sm:p-7 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
