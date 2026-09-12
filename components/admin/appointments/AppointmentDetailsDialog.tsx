"use client";

import {
  CalendarDays,
  Clock3,
  Coins,
  Phone,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";

import type { AdminAppointmentDetails } from "@/types/admin/appointments";

import {
  formatAppointmentDate,
  formatStatus,
  getStatusClasses,
} from "@/utils/appointments";

interface AppointmentDetailsDialogProps {
  appointment: AdminAppointmentDetails | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string;
  onClose: () => void;
}

export function AppointmentDetailsDialog({
  appointment,
  isOpen,
  isLoading,
  error,
  onClose,
}: AppointmentDetailsDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 py-6 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-details-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
              Appointment Details
            </p>

            <h2
              id="appointment-details-title"
              className="mt-1 text-xl font-bold tracking-tight text-gray-900"
            >
              {appointment
                ? `${appointment.first_name} ${appointment.last_name}`
                : "Appointment Details"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close appointment details"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={19} strokeWidth={1.8} />
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-5 p-6">
            <div className="animate-pulse">
              <div className="h-16 rounded-xl bg-gray-100" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-xl bg-gray-100"
                />
              ))}
            </div>

            <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <X size={22} strokeWidth={1.8} />
            </div>

            <p className="mt-4 text-sm font-semibold text-gray-800">
              Unable to load appointment
            </p>

            <p className="mt-1 text-sm text-gray-500">{error}</p>
          </div>
        )}

        {/* Appointment Details */}
        {!isLoading && !error && appointment && (
          <div className="space-y-6 p-6">
            {/* Patient */}
            <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                {appointment.first_name.charAt(0)}
                {appointment.last_name.charAt(0)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {appointment.first_name} {appointment.last_name}
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <UserRound size={13} strokeWidth={1.8} />
                    Age {appointment.age}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Phone size={13} strokeWidth={1.8} />

                    {appointment.contact_number}
                  </span>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                  appointment.status,
                )}`}
              >
                {formatStatus(appointment.status)}
              </span>
            </div>

            {/* Appointment Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Appointment Information
              </h3>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {/* Service */}
                <div className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Stethoscope size={16} strokeWidth={1.8} />

                    <span className="text-xs">Service</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {appointment.service}
                  </p>
                </div>

                {/* Date */}
                <div className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <CalendarDays size={16} strokeWidth={1.8} />

                    <span className="text-xs">Date</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {formatAppointmentDate(appointment.appointment_date)}
                  </p>
                </div>

                {/* Time */}
                <div className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock3 size={16} strokeWidth={1.8} />

                    <span className="text-xs">Time</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {appointment.appointment_time}
                  </p>
                </div>

                {/* Duration */}
                <div className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock3 size={16} strokeWidth={1.8} />

                    <span className="text-xs">Duration</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {appointment.duration_minutes} minutes
                  </p>
                </div>

                {/* Price */}
                <div className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Coins size={16} strokeWidth={1.8} />

                    <span className="text-xs">Service Price</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    ₱{appointment.price}
                  </p>
                </div>

                {/* Points */}
                <div className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Coins size={16} strokeWidth={1.8} />

                    <span className="text-xs">Points</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {appointment.points} points
                  </p>
                </div>
              </div>
            </div>

            {/* Service Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Service Description
              </h3>

              <div className="mt-3 rounded-xl bg-gray-50 p-4">
                <p className="text-sm leading-6 text-gray-600">
                  {appointment.description}
                </p>
              </div>
            </div>

            {/* Doctor Notes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Doctor Notes
              </h3>

              <div className="mt-3 rounded-xl border border-gray-100 p-4">
                <p className="text-sm leading-6 text-gray-600">
                  {appointment.doctor_notes || "No doctor notes provided."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer h-10 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
