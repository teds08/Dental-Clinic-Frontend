"use client";

import { useEffect, useState } from "react";

import { getAdminDashboard } from "@/lib/api/admin/dashboard";
import type { AdminDashboardAppointmentStatus } from "@/types/admin/dashboard";

export function AppointmentStatusOverview() {
  const [statusData, setStatusData] = useState<
    AdminDashboardAppointmentStatus[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAppointmentStatus() {
      try {
        setError("");

        const response = await getAdminDashboard();

        setStatusData(response.data.appointment_status);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load appointment status.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadAppointmentStatus();
  }, []);

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="animate-pulse">
          <div className="h-4 w-36 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-48 rounded bg-gray-100" />

          <div className="mt-7 h-9 w-16 rounded bg-gray-100" />

          <div className="mt-6 h-3 rounded-full bg-gray-100" />

          <div className="mt-6 grid grid-cols-2 gap-5">
            <div className="h-12 rounded bg-gray-100" />
            <div className="h-12 rounded bg-gray-100" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-medium text-red-600">
          Unable to load appointment status.
        </p>

        <p className="mt-1 text-xs text-gray-400">{error}</p>
      </section>
    );
  }

  const totalAppointments = statusData.reduce(
    (total, item) => total + item.count,
    0,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-teal-600";

      case "PENDING":
        return "bg-amber-400";

      case "COMPLETED":
        return "bg-blue-500";

      case "CANCELLED":
        return "bg-red-400";

      default:
        return "bg-gray-400";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6">
      {/* Header */}
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          Appointment Status
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Current appointment breakdown
        </p>
      </div>

      {/* Total */}
      <div className="mt-6">
        <p className="text-3xl font-bold tracking-tight text-gray-900">
          {totalAppointments.toLocaleString()}
        </p>

        <p className="mt-1 text-xs text-gray-400">Total appointments</p>
      </div>

      {statusData.length === 0 ? (
        <div className="mt-6 rounded-xl bg-gray-50 px-4 py-8 text-center">
          <p className="text-sm font-medium text-gray-500">
            No appointment data available.
          </p>
        </div>
      ) : (
        <>
          {/* Status Bar */}
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-100">
            <div className="flex h-full">
              {statusData.map((item) => {
                const percentage =
                  totalAppointments > 0
                    ? (item.count / totalAppointments) * 100
                    : 0;

                return (
                  <div
                    key={item.status}
                    className={`${getStatusColor(
                      item.status,
                    )} transition-all duration-500`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Status Details */}
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
            {statusData.map((item) => {
              const percentage =
                totalAppointments > 0
                  ? (item.count / totalAppointments) * 100
                  : 0;

              return (
                <div key={item.status} className="flex items-start gap-3">
                  <span
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${getStatusColor(
                      item.status,
                    )}`}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-medium text-gray-500">
                        {formatStatus(item.status)}
                      </p>

                      <span className="text-[11px] font-medium text-gray-400">
                        {Math.round(percentage)}%
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {item.count.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
