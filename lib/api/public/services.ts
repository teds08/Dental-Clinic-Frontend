import { apiFetch } from "@/lib/api";
import type { PublicService } from "@/types/public/services";

export async function getActiveServices(): Promise<PublicService[]> {
  const response = await apiFetch("/api/active/services");

  const data = (await response.json()) as PublicService[];

  if (!response.ok) {
    throw new Error("Failed to load dental services.");
  }

  return data;
}
