"use client";

import { Plus } from "lucide-react";

interface ServicesPageHeaderProps {
  onAddService: () => void;
}

export function ServicesPageHeader({ onAddService }: ServicesPageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          Clinic Management
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Services
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          Manage the dental services offered by RAFE Dental Clinic.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddService}
        className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800 sm:w-auto"
      >
        <Plus size={17} strokeWidth={2} />
        Add Service
      </button>
    </div>
  );
}
