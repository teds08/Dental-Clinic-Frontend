export function AppointmentListSkeleton() {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center gap-4 px-5 py-5 sm:px-6"
        >
          <div className="h-11 w-11 shrink-0 rounded-full bg-gray-100" />

          <div className="min-w-0 flex-1">
            <div className="h-3.5 w-36 rounded bg-gray-100" />

            <div className="mt-2 h-3 w-24 rounded bg-gray-100" />
          </div>

          <div className="hidden w-32 md:block">
            <div className="h-3 w-24 rounded bg-gray-100" />

            <div className="mt-2 h-3 w-16 rounded bg-gray-100" />
          </div>

          <div className="hidden w-28 lg:block">
            <div className="h-3 w-20 rounded bg-gray-100" />

            <div className="mt-2 h-3 w-16 rounded bg-gray-100" />
          </div>

          <div className="h-6 w-20 rounded-full bg-gray-100" />

          <div className="h-8 w-8 rounded-lg bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
