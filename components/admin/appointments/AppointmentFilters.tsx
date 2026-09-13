"use client";

import { Search } from "lucide-react";

import { appointmentFilters } from "@/data/admin/dashboard/appointments";

interface AppointmentFiltersProps {
  selectedFilter: string;
  searchQuery: string;
  onFilterChange: (filter: string) => void;
  onSearchChange: (query: string) => void;
}

export function AppointmentFilters({
  selectedFilter,
  searchQuery,
  onFilterChange,
  onSearchChange,
}: AppointmentFiltersProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        {/* Appointment Filters */}
        <div className="flex flex-wrap gap-1">
          {appointmentFilters.map((filter) => {
            const isActive = selectedFilter === filter.value;

            return (
              <button
                key={filter.value || "all"}
                type="button"
                onClick={() => onFilterChange(filter.value)}
                className={`rounded-xl px-4 py-2.5 text-sm cursor-pointer font-semibold transition-all ${
                  isActive
                    ? "bg-teal-700 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-64">
          <Search
            size={16}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search patient..."
            aria-label="Search appointments"
            className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
          />
        </div>
      </div>
    </div>
  );
}
