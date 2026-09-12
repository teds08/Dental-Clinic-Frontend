"use client";

import {
  CalendarCheck,
  CalendarClock,
  CircleDollarSign,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";
import { getAdminDashboard } from "@/lib/api/admin/dashboard";
import { AdminStatCard } from "./AdminStatCard";

interface DashboardMetrics {
  totalPatients: number;
  appointmentsLastMonth: number;
  upcomingAppointments: number;
  monthlyRevenue: number;
}

export function AdminOverview() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setError("");

        const response = await getAdminDashboard();

        setMetrics({
          totalPatients: response.data.total_patients,
          appointmentsLastMonth: response.data.appointments_last_month,
          upcomingAppointments: response.data.upcoming_appointments.length,
          monthlyRevenue: response.data.monthly_revenue,
        });
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load dashboard metrics.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <section>
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Overview
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Good morning, Admin
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Here&apos;s what&apos;s happening with RAFE Dental Clinic today.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="h-11 w-11 rounded-xl bg-gray-100" />

              <div className="mt-5 h-4 w-28 rounded bg-gray-100" />

              <div className="mt-2 h-7 w-20 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Overview
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Good morning, Admin
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Here&apos;s what&apos;s happening with RAFE Dental Clinic today.
          </p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-700">
            Unable to load dashboard metrics.
          </p>

          <p className="mt-1 text-xs text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (!metrics) {
    return null;
  }

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          Overview
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Good morning, Admin
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Here&apos;s what&apos;s happening with RAFE Dental Clinic today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Total Patients"
          value={metrics.totalPatients.toLocaleString()}
          description="Registered patients"
          icon={Users}
        />

        <AdminStatCard
          title="Appointments Last Month"
          value={metrics.appointmentsLastMonth.toLocaleString()}
          description="Appointments from last month"
          icon={CalendarCheck}
        />

        <AdminStatCard
          title="Upcoming Appointments"
          value={metrics.upcomingAppointments.toLocaleString()}
          description="Currently scheduled"
          icon={CalendarClock}
        />

        <AdminStatCard
          title="Last Month's Revenue"
          value={`₱${metrics.monthlyRevenue.toLocaleString()}`}
          description="From completed appointments"
          icon={CircleDollarSign}
        />
      </div>
    </section>
  );
}
