"use client";

import { CalendarDays, Check, Clock3, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";

import {
  approveAppointment,
  rejectAppointment,
} from "@/lib/api/admin/appointments";

import type { AdminAppointment } from "@/types/admin/appointments";

import {
  formatAppointmentDate,
  formatAppointmentTime,
  formatStatus,
  getInitials,
  getStatusClasses,
} from "@/utils/appointments";

import { RejectAppointmentDialog } from "./RejectAppointmentDialog";

interface AppointmentListProps {
  appointments: AdminAppointment[];
  onAppointmentClick?: (appointment: AdminAppointment) => void;
  onStatusChange?: () => void;
}
export function AppointmentList({
  appointments,
  onAppointmentClick,
  onStatusChange,
}: AppointmentListProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [isApproving, setIsApproving] = useState<number | null>(null);

  const [isRejecting, setIsRejecting] = useState<number | null>(null);

  const [rejectAppointmentId, setRejectAppointmentId] = useState<number | null>(
    null,
  );

  const [error, setError] = useState("");

  async function handleApprove(appointmentId: number) {
    try {
      setError("");
      setOpenMenuId(null);
      setIsApproving(appointmentId);

      await approveAppointment(appointmentId);

      onStatusChange?.();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to approve appointment.",
      );
    } finally {
      setIsApproving(null);
    }
  }

  function handleOpenReject(appointmentId: number) {
    setOpenMenuId(null);
    setRejectAppointmentId(appointmentId);
  }

  async function handleReject() {
    if (rejectAppointmentId === null) {
      return;
    }

    try {
      setError("");
      setIsRejecting(rejectAppointmentId);

      await rejectAppointment(rejectAppointmentId);

      setRejectAppointmentId(null);

      onStatusChange?.();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to reject appointment.",
      );
    } finally {
      setIsRejecting(null);
    }
  }

  function handleMenuToggle(event: React.MouseEvent, appointmentId: number) {
    event.stopPropagation();

    setOpenMenuId((currentId) =>
      currentId === appointmentId ? null : appointmentId,
    );
  }

  const selectedRejectAppointment = appointments.find(
    (appointment) => appointment.id === rejectAppointmentId,
  );

  return (
    <>
      <div>
        {/* Desktop Header */}
        <div className="hidden border-b border-gray-100 bg-gray-50 px-6 py-3 md:grid md:grid-cols-[1.35fr_1.15fr_1fr_0.9fr_0.8fr_0.5fr] md:items-center md:gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Patient
          </p>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Service
          </p>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Date
          </p>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Time
          </p>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Status
          </p>

          <p className="text-right text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Actions
          </p>
        </div>

        {appointments.map((appointment) => {
          const isPending = appointment.status === "PENDING";

          const isThisAppointmentApproving = isApproving === appointment.id;

          const isThisAppointmentRejecting = isRejecting === appointment.id;

          const isMenuOpen = openMenuId === appointment.id;

          return (
            <div
              key={appointment.id}
              role="button"
              tabIndex={0}
              onClick={() => onAppointmentClick?.(appointment)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onAppointmentClick?.(appointment);
                }
              }}
              className="cursor-pointer border-b border-gray-100 px-5 py-4 transition-colors duration-200 last:border-b-0 hover:bg-gray-50 sm:px-6"
            >
              {/* Desktop */}
              <div className="hidden md:grid md:grid-cols-[1.35fr_1.15fr_1fr_0.9fr_0.8fr_0.5fr] md:items-center md:gap-4">
                {/* Patient */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                    {getInitials(appointment.first_name, appointment.last_name)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {appointment.first_name} {appointment.last_name}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      Age {appointment.age}
                    </p>
                  </div>
                </div>

                {/* Service */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-700">
                    {appointment.service_name}
                  </p>

                  <div className="mt-0.5 flex items-center gap-2">
                    {appointment.discount_amount !== "0.00" && (
                      <span className="text-xs text-gray-400 line-through">
                        ₱{appointment.original_amount}
                      </span>
                    )}

                    <span className="text-xs font-medium text-gray-500">
                      ₱{appointment.final_amount}
                    </span>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarDays
                    size={15}
                    strokeWidth={1.8}
                    className="shrink-0 text-gray-400"
                  />

                  <span>
                    {formatAppointmentDate(appointment.appointment_date)}
                  </span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock3
                    size={15}
                    strokeWidth={1.8}
                    className="shrink-0 text-gray-400"
                  />

                  <span>
                    {formatAppointmentTime(appointment.appointment_time)}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                      appointment.status,
                    )}`}
                  >
                    {formatStatus(appointment.status)}
                  </span>
                </div>

                {/* Actions */}
                <div
                  className="relative flex justify-end"
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-label="Appointment actions"
                    aria-expanded={isMenuOpen}
                    onClick={(event) => handleMenuToggle(event, appointment.id)}
                    className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  >
                    <MoreHorizontal size={19} strokeWidth={2} />
                  </button>

                  {isMenuOpen && (
                    <div
                      className="absolute right-0 top-10 z-20 w-44 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenuId(null);
                          onAppointmentClick?.(appointment);
                        }}
                        className="cursor-pointer flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                      >
                        View Details
                      </button>

                      {isPending && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApprove(appointment.id)}
                            disabled={
                              isThisAppointmentApproving ||
                              isThisAppointmentRejecting
                            }
                            className="cursor-pointer flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-teal-700 transition-colors hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Check size={15} strokeWidth={2} />

                            {isThisAppointmentApproving
                              ? "Approving..."
                              : "Approve"}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenReject(appointment.id)}
                            disabled={
                              isThisAppointmentApproving ||
                              isThisAppointmentRejecting
                            }
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

              {/* Mobile */}
              <div className="md:hidden">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                    {getInitials(appointment.first_name, appointment.last_name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {appointment.first_name} {appointment.last_name}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-400">
                          {appointment.service_name}
                        </p>
                      </div>

                      <div
                        className="relative shrink-0"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          aria-label="Appointment actions"
                          aria-expanded={isMenuOpen}
                          onClick={(event) =>
                            handleMenuToggle(event, appointment.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        >
                          <MoreHorizontal size={18} strokeWidth={2} />
                        </button>

                        {isMenuOpen && (
                          <div
                            className="absolute right-0 top-9 z-20 w-44 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg"
                            onClick={(event) => event.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                onAppointmentClick?.(appointment);
                              }}
                              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                            >
                              View Details
                            </button>

                            {isPending && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleApprove(appointment.id)}
                                  disabled={
                                    isThisAppointmentApproving ||
                                    isThisAppointmentRejecting
                                  }
                                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-teal-700 transition-colors hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Check size={15} strokeWidth={2} />

                                  {isThisAppointmentApproving
                                    ? "Approving..."
                                    : "Approve"}
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenReject(appointment.id)
                                  }
                                  disabled={
                                    isThisAppointmentApproving ||
                                    isThisAppointmentRejecting
                                  }
                                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
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

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays
                          size={13}
                          strokeWidth={1.8}
                          className="text-gray-400"
                        />

                        {formatAppointmentDate(appointment.appointment_date)}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock3
                          size={13}
                          strokeWidth={1.8}
                          className="text-gray-400"
                        />

                        {formatAppointmentTime(appointment.appointment_time)}
                      </span>

                      <span className="font-medium text-gray-600">
                        ₱{appointment.final_amount}
                      </span>
                    </div>

                    <div className="mt-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                          appointment.status,
                        )}`}
                      >
                        {formatStatus(appointment.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {error && (
          <div className="border-t border-red-100 bg-red-50 px-5 py-3 sm:px-6">
            <p className="text-xs font-medium text-red-600">{error}</p>
          </div>
        )}
      </div>

      <RejectAppointmentDialog
        isOpen={rejectAppointmentId !== null}
        patientName={
          selectedRejectAppointment
            ? `${selectedRejectAppointment.first_name} ${selectedRejectAppointment.last_name}`
            : ""
        }
        isLoading={isRejecting !== null}
        onCancel={() => {
          if (isRejecting === null) {
            setRejectAppointmentId(null);
          }
        }}
        onConfirm={handleReject}
      />
    </>
  );
}
