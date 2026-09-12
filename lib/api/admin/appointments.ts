import { apiFetch } from "@/lib/api";

import type {
  AdminAppointmentActionResponse,
  AdminAppointmentDetailsResponse,
} from "@/types/admin/appointments";

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
