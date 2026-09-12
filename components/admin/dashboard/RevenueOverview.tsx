"use client";

import { useEffect, useState } from "react";
import { CircleDollarSign, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getAdminDashboard } from "@/lib/api/admin/dashboard";
import type { AdminDashboardRevenueHistory } from "@/types/admin/dashboard";

export function RevenueOverview() {
  const [revenueHistory, setRevenueHistory] = useState<
    AdminDashboardRevenueHistory[]
  >([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRevenue() {
      try {
        setError("");

        const response = await getAdminDashboard();

        setRevenueHistory(response.data.revenue_history);
        setMonthlyRevenue(response.data.monthly_revenue);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load revenue data.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadRevenue();
  }, []);

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="animate-pulse">
          <div className="h-4 w-36 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-56 rounded bg-gray-100" />
          <div className="mt-6 h-16 w-32 rounded bg-gray-100" />
          <div className="mt-6 h-56 rounded-xl bg-gray-100" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-medium text-red-600">
          Unable to load revenue data.
        </p>

        <p className="mt-1 text-xs text-gray-400">{error}</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <CircleDollarSign size={18} strokeWidth={1.8} />
            </div>

            <h3 className="text-base font-semibold text-gray-900">
              Revenue Overview
            </h3>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Monthly revenue from completed appointments
          </p>
        </div>

        <TrendingUp size={20} strokeWidth={1.8} className="text-teal-600" />
      </div>

      {/* Last Month Revenue */}
      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Last Month&apos;s Revenue
        </p>

        <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
          ₱{monthlyRevenue.toLocaleString()}
        </p>
      </div>

      {/* Chart */}
      <div className="mt-7 h-64 w-full">
        {revenueHistory.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-400">
              No revenue history available.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueHistory}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "#9ca3af",
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                width={55}
                tick={{
                  fontSize: 11,
                  fill: "#9ca3af",
                }}
                tickFormatter={(value) => `₱${Number(value).toLocaleString()}`}
              />

              <Tooltip
                formatter={(value) => [
                  `₱${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
                labelStyle={{
                  color: "#374151",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0f766e"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#0f766e",
                  strokeWidth: 2,
                  stroke: "#ffffff",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
        <TrendingUp size={14} strokeWidth={2} className="text-teal-600" />

        <p className="text-xs text-gray-500">
          Revenue history is based on completed appointments.
        </p>
      </div>
    </section>
  );
}
