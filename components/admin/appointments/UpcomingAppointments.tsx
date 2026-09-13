"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  approveAppointment,
  getAppointmentById,
  rejectAppointment,
} from "@/lib/api/admin/appointments";
import { getAdminDashboard } from "@/lib/api/admin/dashboard";

import type { AdminAppointmentDetails } from "@/types/admin/appointments";
import type { AdminDashboardAppointment } from "@/types/admin/dashboard";

import { AppointmentDetailsDialog } from "./AppointmentDetailsDialog";
import { AppointmentRow } from "./AppointmentRow";

export function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<AdminDashboardAppointment[]>(
    [],
  );

  const [selectedAppointment, setSelectedAppointment] =
    useState<AdminAppointmentDetails | null>(null);

  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isActionLoading, setIsActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  async function refreshAppointments() {
    try {
      const response = await getAdminDashboard();

      setAppointments(response.data.upcoming_appointments);
    } catch (error) {
      console.error("Unable to refresh upcoming appointments:", error);
    }
  }

  useEffect(() => {
    async function loadAppointments() {
      try {
        setError("");

        const response = await getAdminDashboard();

        setAppointments(response.data.upcoming_appointments);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load upcoming appointments.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadAppointments();
  }, []);

  function handleStatusChange(appointmentId: number, status: string) {
    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? {
              ...appointment,
              status,
            }
          : appointment,
      ),
    );

    setSelectedAppointment((currentAppointment) => {
      if (!currentAppointment || currentAppointment.id !== appointmentId) {
        return currentAppointment;
      }

      return {
        ...currentAppointment,
        status,
      };
    });
  }

  async function handleApprove(appointmentId: number) {
    try {
      setActionError("");
      setIsActionLoading(true);

      await approveAppointment(appointmentId);

      // Immediately update the selected appointment.
      handleStatusChange(appointmentId, "APPROVED");

      // Refresh the dashboard list from the backend.
      await refreshAppointments();
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Unable to approve appointment.",
      );
    } finally {
      setIsActionLoading(false);
    }
  }

  async function handleReject(appointmentId: number) {
    try {
      setActionError("");
      setIsActionLoading(true);

      await rejectAppointment(appointmentId);

      // Immediately update the selected appointment.
      handleStatusChange(appointmentId, "REJECTED");

      // Refresh the dashboard list from the backend.
      await refreshAppointments();
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Unable to reject appointment.",
      );
    } finally {
      setIsActionLoading(false);
    }
  }

  async function handleAppointmentClick(
    appointment: AdminDashboardAppointment,
  ) {
    try {
      setDetailsError("");
      setActionError("");
      setIsDetailsLoading(true);
      setSelectedAppointment(null);

      const response = await getAppointmentById(appointment.id);

      setSelectedAppointment(response.data);
    } catch (error) {
      setDetailsError(
        error instanceof Error
          ? error.message
          : "Unable to load appointment details.",
      );
    } finally {
      setIsDetailsLoading(false);
    }
  }

  function handleCloseDetails() {
    setSelectedAppointment(null);
    setDetailsError("");
    setActionError("");
  }

  return (
    <>
      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Upcoming Appointments
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Recently scheduled patient appointments
            </p>
          </div>

          <Link
            href="/admin/appointments"
            className="shrink-0 text-xs font-semibold text-teal-700 transition-colors hover:text-teal-800"
          >
            View all
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 sm:px-6"
              >
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-100" />

                <div className="min-w-0 flex-1">
                  <div className="h-3.5 w-32 animate-pulse rounded bg-gray-100" />

                  <div className="mt-2 h-3 w-24 animate-pulse rounded bg-gray-100" />
                </div>

                <div className="hidden md:block md:w-44">
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />

                  <div className="mt-2 h-3 w-16 animate-pulse rounded bg-gray-100" />
                </div>

                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="border-t border-gray-100 px-5 py-8 text-center sm:px-6">
            <p className="text-sm font-medium text-red-500">{error}</p>

            <p className="mt-1 text-xs text-gray-400">
              Please try refreshing the page.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && appointments.length === 0 && (
          <div className="border-t border-gray-100 px-5 py-10 text-center sm:px-6">
            <p className="text-sm font-medium text-gray-600">
              No upcoming appointments
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Newly scheduled appointments will appear here.
            </p>
          </div>
        )}

        {/* Appointments */}
        {!isLoading && !error && appointments.length > 0 && (
          <div>
            {appointments.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                onStatusChange={handleStatusChange}
                onClick={() => handleAppointmentClick(appointment)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Appointment Details */}
      <AppointmentDetailsDialog
        appointment={selectedAppointment}
        isOpen={
          selectedAppointment !== null ||
          isDetailsLoading ||
          detailsError !== ""
        }
        isLoading={isDetailsLoading}
        error={
          actionError
            ? `${detailsError}${detailsError ? "\n\n" : ""}${actionError}`
            : detailsError
        }
        isActionLoading={isActionLoading}
        onClose={handleCloseDetails}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  );
}
