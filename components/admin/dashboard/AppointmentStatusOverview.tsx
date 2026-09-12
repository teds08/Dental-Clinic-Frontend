import {
  appointmentStatusData,
  appointmentStatusOverview,
} from "@/data/admin/dashboard/appointment-status";

export function AppointmentStatusOverview() {
  const totalAppointments = appointmentStatusData.reduce(
    (total, item) => total + item.value,
    0,
  );

  const getStatusColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-teal-600";
      case 1:
        return "bg-amber-400";
      case 2:
        return "bg-blue-500";
      default:
        return "bg-red-400";
    }
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6">
      {/* Header */}
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          {appointmentStatusOverview.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {appointmentStatusOverview.description}
        </p>
      </div>

      {/* Total Appointments */}
      <div className="mt-6">
        <p className="text-3xl font-bold tracking-tight text-gray-900">
          {totalAppointments}
        </p>

        <p className="mt-1 text-xs text-gray-400">Total appointments</p>
      </div>

      {/* Status Distribution */}
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-100">
        <div className="flex h-full">
          {appointmentStatusData.map((item, index) => (
            <div
              key={item.label}
              className={`${getStatusColor(index)} transition-all duration-500`}
              style={{
                width: `${item.percentage}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Status Details */}
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
        {appointmentStatusData.map((item, index) => (
          <div key={item.label} className="flex items-start gap-3">
            {/* Status Indicator */}
            <span
              className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${getStatusColor(index)}`}
            />

            {/* Status Information */}
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs font-medium text-gray-500">
                  {item.label}
                </p>

                <span className="text-[11px] font-medium text-gray-400">
                  {item.percentage}%
                </span>
              </div>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
