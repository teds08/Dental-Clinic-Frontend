import { apiFetch } from "@/lib/api";

interface AppointmentActionResponse {
  message: string;
  data: {
    id: number;
    status: string;
  };
}

export async function approveAppointment(
  appointmentId: number,
): Promise<AppointmentActionResponse> {
  const response = await apiFetch(`/api/approve/appointment/${appointmentId}`, {
    method: "PATCH",
  });

  const data: AppointmentActionResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to approve appointment.");
  }

  return data;
}

export async function rejectAppointment(
  appointmentId: number,
): Promise<AppointmentActionResponse> {
  const response = await apiFetch(`/api/reject/appointment/${appointmentId}`, {
    method: "PATCH",
  });

  const data: AppointmentActionResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to reject appointment.");
  }

  return data;
}
