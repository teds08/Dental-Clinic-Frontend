"use client";

import { useState } from "react";
import { CalendarDays, Check, Clock3, MoreHorizontal, X } from "lucide-react";

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
  onClick?: () => void;
}

export function AppointmentRow({
  appointment,
  onStatusChange,
  onClick,
}: AppointmentRowProps) {
  const [status, setStatus] = useState(appointment.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const patientName = `${appointment.first_name} ${appointment.last_name}`;

  async function updateAppointmentStatus(action: "approve" | "reject") {
    try {
      setIsUpdating(true);
      setError("");
      setIsMenuOpen(false);

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

  function handleMenuToggle(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsMenuOpen((current) => !current);
  }

  function handleViewDetails() {
    setIsMenuOpen(false);
    onClick?.();
  }

  function handleOpenReject() {
    setIsMenuOpen(false);
    setIsRejectDialogOpen(true);
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick?.();
          }
        }}
        className="cursor-pointer border-t border-gray-100 px-5 py-4 transition-colors duration-200 hover:bg-gray-50 sm:px-6"
      >
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
          <div
            className="relative flex shrink-0 items-center gap-2"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            {/* Status */}
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                status,
              )}`}
            >
              {formatStatus(status)}
            </span>

            {/* Ellipsis */}
            <div className="relative">
              <button
                type="button"
                aria-label="Appointment actions"
                aria-expanded={isMenuOpen}
                onClick={handleMenuToggle}
                disabled={isUpdating}
                className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MoreHorizontal size={18} strokeWidth={2} />
              </button>

              {isMenuOpen && (
                <div
                  className="absolute right-0 top-10 z-30 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg"
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                >
                  {/* View Details */}
                  <button
                    type="button"
                    onClick={handleViewDetails}
                    className="cursor-pointer flex w-full items-center rounded-lg px-3 py-2.5 text-left text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                  >
                    View Details
                  </button>

                  {/* Pending Actions */}
                  {status === "PENDING" && (
                    <>
                      <button
                        type="button"
                        onClick={handleApprove}
                        disabled={isUpdating}
                        className="cursor-pointer flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-teal-700 transition-colors hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Check size={15} strokeWidth={2} />

                        {isUpdating ? "Approving..." : "Approve"}
                      </button>

                      <button
                        type="button"
                        onClick={handleOpenReject}
                        disabled={isUpdating}
                        className="cursor-pointer flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <X size={15} strokeWidth={2} />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
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
        onCancel={() => {
          if (!isUpdating) {
            setIsRejectDialogOpen(false);
          }
        }}
        onConfirm={async () => {
          setIsRejectDialogOpen(false);
          await handleReject();
        }}
      />
    </>
  );
}
