"use client";

import { AlertTriangle, Archive, RotateCcw, Trash2, X } from "lucide-react";
import type { AdminService } from "@/types/admin/services";

type ServiceAction = "archive" | "restore" | "delete";

interface ServiceActionDialogProps {
  service: AdminService | null;
  action: ServiceAction | null;
  isOpen: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const actionConfig = {
  archive: {
    icon: Archive,
    iconClassName: "bg-amber-50 text-amber-600",
    title: "Archive Service",
    description:
      "This service will no longer appear as an active service. You can restore it later from the archived services.",
    button: "Archive Service",
    buttonClassName: "bg-amber-600 text-white hover:bg-amber-700",
  },

  restore: {
    icon: RotateCcw,
    iconClassName: "bg-teal-50 text-teal-700",
    title: "Restore Service",
    description:
      "This service will become active again and will be available as an active clinic service.",
    button: "Restore Service",
    buttonClassName: "bg-teal-700 text-white hover:bg-teal-800",
  },

  delete: {
    icon: Trash2,
    iconClassName: "bg-red-50 text-red-600",
    title: "Delete Service Permanently",
    description:
      "This action cannot be undone. The service will be permanently removed from the system.",
    button: "Delete Permanently",
    buttonClassName: "bg-red-600 text-white hover:bg-red-700",
  },
};

export function ServiceActionDialog({
  service,
  action,
  isOpen,
  isLoading = false,
  errorMessage,
  successMessage,
  onClose,
  onConfirm,
}: ServiceActionDialogProps) {
  if (!isOpen || !service || !action) {
    return null;
  }

  const config = actionConfig[action];
  const Icon = config.icon;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${config.iconClassName}`}
          >
            <Icon size={20} strokeWidth={1.8} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close dialog"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <h2 className="text-base font-semibold text-gray-900">
            {config.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {config.description}
          </p>

          {/* Service */}
          <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs font-semibold text-gray-900">
              {service.title}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              ₱{service.price.toLocaleString()}
            </p>
          </div>

          {/* Warning */}
          {action === "delete" && (
            <div className="mt-4 flex gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
              <AlertTriangle
                size={16}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-red-500"
              />

              <p className="text-xs leading-5 text-red-600">
                Permanent deletion cannot be reversed.
              </p>
            </div>
          )}

          {/* Error */}
          {errorMessage && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
              <p className="text-xs leading-5 text-red-600">{errorMessage}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t border-gray-100 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="h-10 flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {successMessage ? "Close" : "Cancel"}
          </button>

          {!successMessage && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`h-10 flex-1 cursor-pointer rounded-xl px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${config.buttonClassName}`}
            >
              {isLoading ? "Processing..." : config.button}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
