import { apiFetch } from "@/lib/api";

import type { AdminProfileResponse } from "@/types/admin/profile";

export async function getAdminProfile(): Promise<AdminProfileResponse> {
  const response = await apiFetch("/api/profile", {
    method: "GET",
  });

  const data: AdminProfileResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load admin profile.");
  }

  return data;
}
