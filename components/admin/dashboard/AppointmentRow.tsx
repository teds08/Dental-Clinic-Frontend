"use client";

import { useState } from "react";
import { CalendarDays, Check, Clock3, X } from "lucide-react";

import {
  approveAppointment,
  rejectAppointment,
} from "@/lib/api/admin/appointments";

import type { AdminDashboardAppointment } from "@/types/admin/dashboard";

import {
  formatAppointmentDate,
  formatStatus,
  getInitials,
  getStatusClasses,
} from "@/utils/appointments";

import { RejectAppointmentDialog } from "./RejectAppointmentDialog";

interface AppointmentRowProps {
  appointment: AdminDashboardAppointment;
  onStatusChange?: (appointmentId: number, status: string) => void;
}

export function AppointmentRow({
  appointment,
  onStatusChange,
}: AppointmentRowProps) {
  const [status, setStatus] = useState(appointment.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const patientName = `${appointment.first_name} ${appointment.last_name}`;

  async function updateAppointmentStatus(action: "approve" | "reject") {
    try {
      setIsUpdating(true);
      setError("");

      const response =
        action === "approve"
          ? await approveAppointment(appointment.id)
          : await rejectAppointment(appointment.id);

      setStatus(response.data.status);

      onStatusChange?.(appointment.id, response.data.status);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : `Unable to ${action} appointment.`,
      );
    } finally {
      setIsUpdating(false);
    }
  }

  function handleApprove() {
    return updateAppointmentStatus("approve");
  }

  function handleReject() {
    return updateAppointmentStatus("reject");
  }

  return (
    <>
      <div className="border-t border-gray-100 px-5 py-4 transition-colors duration-200 hover:bg-gray-50 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Patient */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-700">
              {getInitials(appointment.first_name, appointment.last_name)}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {patientName}
              </p>

              <p className="truncate text-xs text-gray-400">
                {appointment.service_name}
              </p>
            </div>
          </div>

          {/* Date / Time */}
          <div className="hidden shrink-0 md:block md:w-44">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CalendarDays
                size={14}
                strokeWidth={1.8}
                className="text-gray-400"
              />

              <span>{formatAppointmentDate(appointment.appointment_date)}</span>
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
              <Clock3 size={14} strokeWidth={1.8} className="text-gray-300" />

              <span>{appointment.appointment_time}</span>
            </div>
          </div>

          {/* Status / Actions */}
          <div className="flex shrink-0 items-center gap-2">
            {status === "PENDING" ? (
              <>
                {/* Approve */}
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={isUpdating}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-teal-600 px-3 text-[11px] font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Check size={14} strokeWidth={2.2} />

                  {isUpdating ? "Updating..." : "Approve"}
                </button>

                {/* Reject */}
                <button
                  type="button"
                  onClick={() => setIsRejectDialogOpen(true)}
                  disabled={isUpdating}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 text-[11px] font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={14} strokeWidth={2.2} />
                  Reject
                </button>
              </>
            ) : (
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                  status,
                )}`}
              >
                {formatStatus(status)}
              </span>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-2 text-right text-xs font-medium text-red-500">
            {error}
          </p>
        )}
      </div>

      {/* Reject Confirmation Dialog */}
      <RejectAppointmentDialog
        isOpen={isRejectDialogOpen}
        patientName={patientName}
        isLoading={isUpdating}
        onCancel={() => setIsRejectDialogOpen(false)}
        onConfirm={async () => {
          setIsRejectDialogOpen(false);
          await handleReject();
        }}
      />
    </>
  );
}
