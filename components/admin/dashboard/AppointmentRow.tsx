import { CalendarDays, Clock3 } from "lucide-react";

import type { AdminDashboardAppointment } from "@/types/admin/dashboard";

interface AppointmentRowProps {
  appointment: AdminDashboardAppointment;
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function formatAppointmentDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function AppointmentRow({ appointment }: AppointmentRowProps) {
  const patientName = `${appointment.first_name} ${appointment.last_name}`;

  return (
    <div className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 transition-colors duration-200 hover:bg-gray-50 sm:px-6">
      {/* Patient */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-700">
          {getInitials(appointment.first_name, appointment.last_name)}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">
            {patientName}
          </p>

          <p className="truncate text-xs text-gray-400">
            {appointment.service_name}
          </p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="hidden shrink-0 md:block md:w-44">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays size={14} strokeWidth={1.8} className="text-gray-400" />

          <span>{formatAppointmentDate(appointment.appointment_date)}</span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
          <Clock3 size={14} strokeWidth={1.8} className="text-gray-300" />

          <span>{appointment.appointment_time}</span>
        </div>
      </div>

      {/* Status */}
      <div className="shrink-0">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            appointment.status === "APPROVED"
              ? "bg-emerald-50 text-emerald-600"
              : appointment.status === "PENDING"
                ? "bg-amber-50 text-amber-600"
                : appointment.status === "COMPLETED"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-gray-100 text-gray-500"
          }`}
        >
          {formatStatus(appointment.status)}
        </span>
      </div>
    </div>
  );
}
