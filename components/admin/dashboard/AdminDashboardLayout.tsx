"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { SessionExpiredHandler } from "@/components/auth/SessionExpiredHandler";

import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 section-pattern section-pattern-glow">
      <SessionExpiredHandler />

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="min-h-screen lg:pl-64">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-gray-200 bg-white px-5 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100"
          >
            <Menu size={21} />
          </button>

          <span className="ml-3 text-sm font-semibold text-gray-900">
            Admin Dashboard
          </span>
        </header>

        <AdminHeader />

        {/* Page Content */}
        <main className="p-5 sm:p-7 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
