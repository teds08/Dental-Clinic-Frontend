"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface UserFiltersProps {
  search: string;
  role: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}

export function UserFilters({
  search,
  role,
  onSearchChange,
  onRoleChange,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={18}
          strokeWidth={1.8}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search users..."
          className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
        />
      </div>

      {/* Role filter */}
      <div className="relative">
        <SlidersHorizontal
          size={16}
          strokeWidth={1.8}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <select
          value={role}
          onChange={(event) => onRoleChange(event.target.value)}
          className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100 sm:w-36"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
    </div>
  );
}
