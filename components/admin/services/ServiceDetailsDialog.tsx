"use client";

import Image from "next/image";
import { Pencil, X } from "lucide-react";

import type { AdminService } from "@/types/admin/services";

interface ServiceDetailsDialogProps {
  service: AdminService | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (service: AdminService) => void;
}

export function ServiceDetailsDialog({
  service,
  isOpen,
  onClose,
  onEdit,
}: ServiceDetailsDialogProps) {
  if (!isOpen || !service) {
    return null;
  }

  const isArchived = service.status === "archived";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
              Service Details
            </p>

            <h2 className="mt-1 text-lg font-semibold text-gray-900">
              {service.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-145px)] overflow-y-auto p-5 sm:p-6">
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
            />
          </div>

          {/* Status */}
          <div className="mt-5 flex items-center justify-between">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                isArchived
                  ? "bg-gray-100 text-gray-600"
                  : "bg-teal-50 text-teal-700"
              }`}
            >
              {isArchived ? "Archived" : "Active"}
            </span>

            <p className="text-lg font-bold text-teal-700">
              ₱{service.price.toLocaleString()}
            </p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              Description
            </p>

            <p className="mt-2 text-sm leading-7 text-gray-600">
              {service.description}
            </p>
          </div>

          {/* Created Date */}
          <div className="mt-6 border-t border-gray-100 pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              Added
            </p>

            <p className="mt-1.5 text-sm text-gray-600">
              {new Date(service.created_at).toLocaleDateString("en-PH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-gray-100 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="h-10 flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => onEdit(service)}
            className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
          >
            <Pencil size={15} strokeWidth={1.9} />
            Edit Service
          </button>
        </div>
      </div>
    </div>
  );
}
