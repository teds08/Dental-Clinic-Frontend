export function UserListSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {["User", "Contact", "Role", "Registered", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: 6 }).map((_, index) => (
              <tr key={index}>
                <td className="px-5 py-5">
                  <div className="space-y-2">
                    <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-48 animate-pulse rounded bg-gray-100" />
                  </div>
                </td>

                <td className="px-5 py-5">
                  <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-5 py-5">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
                </td>

                <td className="px-5 py-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-5 py-5">
                  <div className="ml-auto h-8 w-32 animate-pulse rounded-lg bg-gray-100" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
