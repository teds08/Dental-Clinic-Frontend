"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { serviceIcons } from "@/data/admin/services/services";
import type { AdminService } from "@/types/admin/services";

interface ServiceCardProps {
  service: AdminService;
  priority?: boolean;
  onView: (service: AdminService) => void;
  onEdit: (service: AdminService) => void;
  onArchive: (service: AdminService) => void;
  onRestore: (service: AdminService) => void;
  onDelete: (service: AdminService) => void;
}

export function ServiceCard({
  service,
  priority = false,
  onView,
  onEdit,
  onArchive,
  onRestore,
  onDelete,
}: ServiceCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isArchived = service.status === "archived";

  const fallbackIcon =
    serviceIcons.find((icon) => icon.value === service.icon)?.src ??
    "/icons/services/dental-care.png";

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <Image
              src={fallbackIcon}
              alt=""
              width={96}
              height={96}
              priority={priority}
              className="h-20 w-20 object-contain"
            />
          </div>
        ) : (
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}

        {/* Status */}
        <div className="absolute left-3 top-3">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              isArchived
                ? "bg-gray-800/90 text-white"
                : "bg-teal-700/90 text-white"
            }`}
          >
            {isArchived ? "Archived" : "Active"}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute right-3 top-3">
          <button
            type="button"
            aria-label="Service actions"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white/95 text-gray-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-900"
          >
            <MoreHorizontal size={18} strokeWidth={2} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-10 z-30 w-40 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onView(service);
                }}
                className="flex w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                View Details
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onEdit(service);
                }}
                className="flex w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                Edit Service
              </button>

              {isArchived ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onRestore(service);
                    }}
                    className="flex w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-xs font-medium text-teal-700 transition-colors hover:bg-teal-50"
                  >
                    Restore
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onDelete(service);
                    }}
                    className="flex w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Delete Permanently
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onArchive(service);
                  }}
                  className="flex w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-xs font-medium text-amber-600 transition-colors hover:bg-amber-50"
                >
                  Archive
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="min-w-0 truncate text-sm font-semibold text-gray-900">
            {service.title}
          </h3>

          <p className="shrink-0 text-sm font-bold text-teal-700">
            ₱{Number(service.price).toLocaleString()}
          </p>
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
          {service.description}
        </p>

        <button
          type="button"
          onClick={() => onView(service)}
          className="mt-5 text-xs font-semibold text-teal-700 transition-colors hover:text-teal-800"
        >
          View service
        </button>
      </div>
    </article>
  );
}
