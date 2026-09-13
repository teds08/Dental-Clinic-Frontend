"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";

import { useAdminAppointments } from "@/hooks/admin/useAdminAppointments";
import {
  approveAppointment,
  getAppointmentById,
  rejectAppointment,
} from "@/lib/api/admin/appointments";

import type { AdminAppointmentDetails } from "@/types/admin/appointments";

import { AppointmentDetailsDialog } from "./AppointmentDetailsDialog";
import { AppointmentFilters } from "./AppointmentFilters";
import { AppointmentList } from "./AppointmentList";
import { AppointmentListSkeleton } from "./AppointmentListSkeleton";
import { AppointmentPageHeader } from "./AppointmentPageHeader";
import { AppointmentPagination } from "./AppointmentPagination";

export function AppointmentsPage() {
  const {
    appointments,
    pagination,
    selectedFilter,
    searchQuery,
    isLoading,
    error,
    setFilter,
    setSearch,
    setPage,
    refresh,
    handleStatusChange,
  } = useAdminAppointments();

  const [selectedAppointment, setSelectedAppointment] =
    useState<AdminAppointmentDetails | null>(null);

  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const [detailsError, setDetailsError] = useState("");

  const [isActionLoading, setIsActionLoading] = useState(false);

  const [actionError, setActionError] = useState("");

  async function handleAppointmentClick(appointmentId: number) {
    try {
      setDetailsError("");
      setActionError("");
      setIsDetailsLoading(true);
      setSelectedAppointment(null);

      const response = await getAppointmentById(appointmentId);

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
    if (isActionLoading) return;

    setSelectedAppointment(null);
    setDetailsError("");
    setActionError("");
  }

  async function handleApprove(appointmentId: number) {
    try {
      setActionError("");
      setIsActionLoading(true);

      await approveAppointment(appointmentId);

      handleStatusChange();

      setSelectedAppointment((current) =>
        current?.id === appointmentId
          ? {
              ...current,
              status: "APPROVED",
            }
          : current,
      );
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

      handleStatusChange();

      setSelectedAppointment((current) =>
        current?.id === appointmentId
          ? {
              ...current,
              status: "REJECTED",
            }
          : current,
      );
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

  return (
    <>
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {/* Page Header */}
        <AppointmentPageHeader
          total={pagination?.total ?? 0}
          isLoading={isLoading}
          onRefresh={refresh}
        />

        {/* Filters + Search */}
        <AppointmentFilters
          selectedFilter={selectedFilter}
          searchQuery={searchQuery}
          onFilterChange={setFilter}
          onSearchChange={setSearch}
        />

        {/* Appointment List */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Loading */}
          {isLoading && <AppointmentListSkeleton />}

          {/* Error */}
          {!isLoading && error && (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <RefreshCw size={19} strokeWidth={1.8} />
              </div>

              <p className="mt-4 text-sm font-semibold text-gray-800">
                Unable to load appointments
              </p>

              <p className="mt-1 text-sm text-gray-500">{error}</p>

              <button
                type="button"
                onClick={refresh}
                className="mt-5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && appointments.length === 0 && (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                <RefreshCw size={20} strokeWidth={1.6} />
              </div>

              <p className="mt-4 text-sm font-semibold text-gray-800">
                {searchQuery
                  ? "No appointments found"
                  : `No ${
                      selectedFilter ? selectedFilter.toLowerCase() : "all"
                    } appointments`}
              </p>

              <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-gray-500">
                {searchQuery
                  ? `No appointments match "${searchQuery}".`
                  : "There are currently no appointments under this status."}
              </p>
            </div>
          )}

          {/* Appointment Results */}
          {!isLoading && !error && appointments.length > 0 && (
            <>
              <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    {selectedFilter
                      ? `${selectedFilter
                          .charAt(0)
                          .toUpperCase()}${selectedFilter
                          .slice(1)
                          .toLowerCase()} Appointments`
                      : "All Appointments"}
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Showing{" "}
                    {pagination
                      ? (pagination.page - 1) * pagination.limit + 1
                      : 0}
                    –
                    {pagination
                      ? Math.min(
                          pagination.page * pagination.limit,
                          pagination.total,
                        )
                      : 0}{" "}
                    of {pagination?.total ?? 0} appointments
                  </p>
                </div>
              </div>

              <AppointmentList
                appointments={appointments}
                onAppointmentClick={(appointment) =>
                  handleAppointmentClick(appointment.id)
                }
                onStatusChange={handleStatusChange}
              />
            </>
          )}

          {/* Pagination */}
          {!isLoading && !error && pagination && pagination.total_pages > 1 && (
            <AppointmentPagination
              pagination={pagination}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>

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
