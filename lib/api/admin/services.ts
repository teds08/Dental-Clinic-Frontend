import { apiFetch } from "@/lib/api";

import type {
  AdminService,
  CreateServiceResponse,
} from "@/types/admin/services";

export async function createService(
  formData: FormData,
): Promise<CreateServiceResponse> {
  const response = await apiFetch("/api/create/service", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to create service.");
  }

  return data;
}

export async function getServices(): Promise<AdminService[]> {
  const response = await apiFetch("/api/active/services");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to fetch services.");
  }

  return data;
}

export async function updateService(
  id: number,
  formData: FormData,
): Promise<CreateServiceResponse> {
  const response = await apiFetch(`/api/update/service/${id}`, {
    method: "PATCH",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to update service.");
  }

  return data;
}

export async function archiveService(
  id: number,
): Promise<{ message: string; result: AdminService }> {
  const response = await apiFetch(`/api/archive/services/${id}`, {
    method: "PATCH",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to archive service.");
  }

  return data;
}

export async function restoreService(
  id: number,
): Promise<{ message: string; result: AdminService }> {
  const response = await apiFetch(`/api/restore/services/${id}`, {
    method: "PATCH",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to restore service.");
  }

  return data;
}

export async function getArchivedServices(): Promise<AdminService[]> {
  const response = await apiFetch("/api/services/archive");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to fetch archived services.");
  }

  return data;
}

export async function deleteService(
  id: number,
): Promise<{ message: string; service: AdminService }> {
  const response = await apiFetch(`/api/delete/service/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to permanently delete service.");
  }

  return data;
}
