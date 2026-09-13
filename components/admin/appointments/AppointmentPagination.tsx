"use client";

import type { AdminAppointmentsPagination } from "@/types/admin/appointments";

interface AppointmentPaginationProps {
  pagination: AdminAppointmentsPagination;
  onPageChange: (page: number) => void;
}

export function AppointmentPagination({
  pagination,
  onPageChange,
}: AppointmentPaginationProps) {
  const showingFrom =
    pagination.total > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0;

  const showingTo =
    pagination.total > 0
      ? Math.min(pagination.page * pagination.limit, pagination.total)
      : 0;

  return (
    <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-xs text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-700">{showingFrom}</span> to{" "}
        <span className="font-semibold text-gray-700">{showingTo}</span> of{" "}
        <span className="font-semibold text-gray-700">{pagination.total}</span>{" "}
        appointments
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={pagination.page === 1}
          onClick={() => onPageChange(pagination.page - 1)}
          className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="px-2 text-xs font-medium text-gray-500">
          Page {pagination.page} of {pagination.total_pages}
        </span>

        <button
          type="button"
          disabled={pagination.page === pagination.total_pages}
          onClick={() => onPageChange(pagination.page + 1)}
          className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
