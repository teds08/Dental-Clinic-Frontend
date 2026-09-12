import { CalendarDays, Clock3 } from "lucide-react";

interface AppointmentRowProps {
  patientName: string;
  service: string;
  date: string;
  time: string;
  status: string;
}

export function AppointmentRow({
  patientName,
  service,
  date,
  time,
  status,
}: AppointmentRowProps) {
  const initials = patientName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2);

  const isPending = status === "Pending";

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4 last:border-b-0">
      {/* Avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-700">
        {initials}
      </div>

      {/* Patient */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900">
          {patientName}
        </p>

        <p className="mt-0.5 truncate text-xs text-gray-500">{service}</p>
      </div>

      {/* Date & Time */}
      <div className="hidden items-center gap-5 sm:flex">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays size={14} strokeWidth={1.8} className="text-gray-400" />
          {date}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock3 size={14} strokeWidth={1.8} className="text-gray-400" />
          {time}
        </div>
      </div>

      {/* Status */}
      <span
        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
          isPending
            ? "bg-amber-50 text-amber-600"
            : "bg-emerald-50 text-emerald-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
