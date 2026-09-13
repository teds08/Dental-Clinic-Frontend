"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import {
  serviceSortOptions,
  serviceStatusFilters,
} from "@/data/admin/services/services";

interface ServiceFiltersProps {
  search: string;
  status: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export function ServiceFilters({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: ServiceFiltersProps) {
  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={17}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search services..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-50"
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={16}
            strokeWidth={1.8}
            className="hidden text-gray-400 sm:block"
          />

          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-600 outline-none transition-colors focus:border-teal-300 focus:ring-2 focus:ring-teal-50 sm:w-36"
          >
            {serviceStatusFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-600 outline-none transition-colors focus:border-teal-300 focus:ring-2 focus:ring-teal-50 sm:w-48"
        >
          {serviceSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              Sort: {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
