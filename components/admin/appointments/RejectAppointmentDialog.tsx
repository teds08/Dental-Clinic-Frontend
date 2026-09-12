"use client";

import { X } from "lucide-react";

interface RejectAppointmentDialogProps {
  isOpen: boolean;
  patientName: string;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function RejectAppointmentDialog({
  isOpen,
  patientName,
  isLoading,
  onCancel,
  onConfirm,
}: RejectAppointmentDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-appointment-title"
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
      >
        {/* Icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <X size={21} strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3
            id="reject-appointment-title"
            className="text-lg font-bold tracking-tight text-gray-900"
          >
            Reject Appointment?
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Are you sure you want to reject{" "}
            <span className="font-semibold text-gray-700">{patientName}</span>
            &apos;s appointment? This action will change the appointment status
            to rejected.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="h-10 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="h-10 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Rejecting..." : "Reject Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
}
