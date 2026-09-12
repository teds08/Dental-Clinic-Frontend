"use client";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getAdminAppointments,
  getAppointmentById,
} from "@/lib/api/admin/appointments";

import type {
  AdminAppointment,
  AdminAppointmentDetails,
  AdminAppointmentsPagination,
} from "@/types/admin/appointments";

import { AppointmentDetailsDialog } from "./AppointmentDetailsDialog";
import { AppointmentList } from "./AppointmentList";

const appointmentFilters = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Completed", value: "COMPLETED" },
];

const APPOINTMENTS_PER_PAGE = 10;

export function AppointmentsPage() {
  const [selectedFilter, setSelectedFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [refreshKey, setRefreshKey] = useState(0);

  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);

  const [pagination, setPagination] =
    useState<AdminAppointmentsPagination | null>(null);

  const [selectedAppointment, setSelectedAppointment] =
    useState<AdminAppointmentDetails | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const [error, setError] = useState("");

  const [detailsError, setDetailsError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function fetchAppointments() {
      try {
        const response = await getAdminAppointments(
          selectedFilter || undefined,
          currentPage,
          APPOINTMENTS_PER_PAGE,
        );

        if (isCancelled) {
          return;
        }

        setAppointments(response.appointments);
        setPagination(response.pagination);
        setError("");
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setAppointments([]);
        setPagination(null);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load appointments.",
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void fetchAppointments();

    return () => {
      isCancelled = true;
    };
  }, [selectedFilter, currentPage, refreshKey]);

  function handleFilterChange(filter: string) {
    setIsLoading(true);
    setError("");
    setCurrentPage(1);
    setSelectedFilter(filter);
  }

  function handleRefresh() {
    setIsLoading(true);
    setError("");
    setRefreshKey((current) => current + 1);
  }

  async function handleAppointmentClick(appointment: AdminAppointment) {
    try {
      setDetailsError("");
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
  }

  function handleStatusChange() {
    setIsLoading(true);
    setRefreshKey((current) => current + 1);
  }

  const activeFilter = appointmentFilters.find(
    (filter) => filter.value === selectedFilter,
  );

  const hasPagination = pagination !== null && pagination.total_pages > 1;

  const showingFrom =
    pagination && pagination.total > 0
      ? (pagination.page - 1) * pagination.limit + 1
      : 0;

  const showingTo =
    pagination && pagination.total > 0
      ? Math.min(pagination.page * pagination.limit, pagination.total)
      : 0;

  return (
    <>
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <br />
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/dashboard"
                aria-label="Back to dashboard"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-700"
              >
                <ArrowLeft size={17} strokeWidth={1.8} />
              </Link>

              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Appointments
                </h1>

                {!isLoading && !error && pagination && (
                  <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700">
                    {pagination.total}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Manage and review patient appointments.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex h-10 w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              strokeWidth={1.8}
              className={isLoading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
          <div className="flex flex-wrap gap-1">
            {appointmentFilters.map((filter) => {
              const isActive = selectedFilter === filter.value;

              return (
                <button
                  key={filter.value || "all"}
                  type="button"
                  onClick={() => handleFilterChange(filter.value)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-teal-700 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Appointment List Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {!isLoading && !error && appointments.length > 0 && (
            <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    {activeFilter?.label} Appointments
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Showing {showingFrom}–{showingTo} of{" "}
                    {pagination?.total ?? 0} appointments
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex animate-pulse items-center gap-4 px-5 py-5 sm:px-6"
                >
                  <div className="h-11 w-11 shrink-0 rounded-full bg-gray-100" />

                  <div className="min-w-0 flex-1">
                    <div className="h-3.5 w-36 rounded bg-gray-100" />

                    <div className="mt-2 h-3 w-24 rounded bg-gray-100" />
                  </div>

                  <div className="hidden w-32 md:block">
                    <div className="h-3 w-24 rounded bg-gray-100" />

                    <div className="mt-2 h-3 w-16 rounded bg-gray-100" />
                  </div>

                  <div className="hidden w-28 lg:block">
                    <div className="h-3 w-20 rounded bg-gray-100" />

                    <div className="mt-2 h-3 w-16 rounded bg-gray-100" />
                  </div>

                  <div className="h-6 w-20 rounded-full bg-gray-100" />

                  <div className="h-8 w-8 rounded-lg bg-gray-100" />
                </div>
              ))}
            </div>
          )}

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
                onClick={handleRefresh}
                className="mt-5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && appointments.length === 0 && (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                <RefreshCw size={20} strokeWidth={1.6} />
              </div>

              <p className="mt-4 text-sm font-semibold text-gray-800">
                No {activeFilter?.label.toLowerCase()} appointments
              </p>

              <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-gray-500">
                There are currently no appointments under this status.
              </p>
            </div>
          )}

          {/* Appointments */}
          {!isLoading && !error && appointments.length > 0 && (
            <AppointmentList
              appointments={appointments}
              onAppointmentClick={handleAppointmentClick}
              onStatusChange={handleStatusChange}
            />
          )}

          {/* Pagination */}
          {!isLoading && !error && pagination && hasPagination && (
            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {showingFrom}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-700">{showingTo}</span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {pagination.total}
                </span>{" "}
                appointments
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={pagination.page === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="px-2 text-xs font-medium text-gray-500">
                  Page {pagination.page} of {pagination.total_pages}
                </span>

                <button
                  type="button"
                  disabled={pagination.page === pagination.total_pages}
                  onClick={() => setCurrentPage((page) => page + 1)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
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
        error={detailsError}
        onClose={handleCloseDetails}
      />
    </>
  );
}
