import { apiFetch } from "@/lib/api";
import type { AdminDashboardResponse } from "@/types/admin/dashboard";

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  const response = await apiFetch("/api/data/dashboard", {
    method: "GET",
  });

  const data: AdminDashboardResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load the admin dashboard.");
  }

  return data;
}
