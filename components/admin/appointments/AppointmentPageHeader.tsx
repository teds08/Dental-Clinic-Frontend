"use client";

import { RefreshCw } from "lucide-react";

interface AppointmentPageHeaderProps {
  total: number;
  isLoading: boolean;
  onRefresh: () => void;
}

export function AppointmentPageHeader({
  total,
  isLoading,
  onRefresh,
}: AppointmentPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Appointments
            </h1>

            {!isLoading && (
              <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700">
                {total}
              </span>
            )}
          </div>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          Manage and review patient appointments.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={isLoading}
        className="cursor-pointer flex h-10 w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RefreshCw
          size={15}
          strokeWidth={1.8}
          className={isLoading ? "animate-spin" : ""}
        />
        Refresh
      </button>
    </div>
  );
}
