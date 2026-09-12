import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { upcomingAppointments } from "@/data/admin/dashboard/appointments";

import { AppointmentRow } from "./AppointmentRow";

export function UpcomingAppointments() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-sm font-bold text-gray-900">
            Upcoming Appointments
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Recently scheduled patient appointments
          </p>
        </div>

        <Link
          href="/admin/appointments"
          className="group flex items-center gap-1.5 text-xs font-semibold text-teal-700 transition-colors hover:text-teal-800"
        >
          View all
          <ArrowRight
            size={14}
            strokeWidth={1.8}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Appointment List */}
      <div className="px-5 sm:px-6">
        {upcomingAppointments.map((appointment) => (
          <AppointmentRow
            key={appointment.id}
            patientName={appointment.patientName}
            service={appointment.service}
            date={appointment.date}
            time={appointment.time}
            status={appointment.status}
          />
        ))}
      </div>
    </section>
  );
}
