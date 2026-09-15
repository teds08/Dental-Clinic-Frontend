"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function UserPagination({
  currentPage,
  totalPages,
  totalUsers,
  itemsPerPage,
  onPageChange,
}: UserPaginationProps) {
  if (totalUsers === 0) {
    return null;
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalUsers);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium text-gray-700">{startItem}</span>{" "}
        to <span className="font-medium text-gray-700">{endItem}</span> of{" "}
        <span className="font-medium text-gray-700">{totalUsers}</span> users
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={17} />
        </button>

        <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-teal-700 px-3 text-sm font-semibold text-white">
          {currentPage}
        </div>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}
