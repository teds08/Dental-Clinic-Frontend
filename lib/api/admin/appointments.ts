import { apiFetch } from "@/lib/api";

import type {
  AdminAppointmentActionResponse,
  AdminAppointmentDetailsResponse,
  AdminAppointmentsResponse,
} from "@/types/admin/appointments";

export async function getAdminAppointments(
  search?: string,
  status?: string,
  page = 1,
  limit = 10,
): Promise<AdminAppointmentsResponse> {
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  if (status) {
    params.set("status", status);
  }
  params.set("page", String(page));
  params.set("limit", String(limit));

  const response = await apiFetch(
    `/api/getall/appointment?${params.toString()}`,
    {
      method: "GET",
    },
  );

  const data: AdminAppointmentsResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load appointments.");
  }

  return data;
}

export async function approveAppointment(
  appointmentId: number,
): Promise<AdminAppointmentActionResponse> {
  const response = await apiFetch(`/api/approve/appointment/${appointmentId}`, {
    method: "PATCH",
  });

  const data: AdminAppointmentActionResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to approve appointment.");
  }

  return data;
}

export async function rejectAppointment(
  appointmentId: number,
): Promise<AdminAppointmentActionResponse> {
  const response = await apiFetch(`/api/reject/appointment/${appointmentId}`, {
    method: "PATCH",
  });

  const data: AdminAppointmentActionResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to reject appointment.");
  }

  return data;
}

export async function getAppointmentById(
  appointmentId: number,
): Promise<AdminAppointmentDetailsResponse> {
  const response = await apiFetch(`/api/appointment/${appointmentId}`, {
    method: "GET",
  });

  const data: AdminAppointmentDetailsResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load appointment details.");
  }

  return data;
}
