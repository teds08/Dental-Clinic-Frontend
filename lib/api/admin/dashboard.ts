import { API_URL } from "@/lib/api";
import { getAuthToken } from "@/lib/api/auth";
import type { AdminDashboardResponse } from "@/types/admin/dashboard";

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const response = await fetch(`${API_URL}/api/data/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: AdminDashboardResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load the admin dashboard.");
  }

  return data;
}
