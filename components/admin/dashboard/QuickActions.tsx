import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { adminQuickActions } from "@/data/admin/dashboard/quick-actions";

export function QuickActions() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
        <h2 className="text-sm font-bold text-gray-900">Quick Actions</h2>

        <p className="mt-1 text-xs text-gray-400">
          Frequently used administrative actions
        </p>
      </div>

      {/* Actions */}
      <div className="grid gap-2 p-4">
        {adminQuickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition-transform duration-200 group-hover:scale-105">
                <Icon size={18} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {action.title}
                </p>

                <p className="mt-0.5 truncate text-xs text-gray-400">
                  {action.description}
                </p>
              </div>

              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                className="text-gray-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-600"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
