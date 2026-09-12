import { ArrowUpRight } from "lucide-react";

import { revenueData, revenueOverview } from "@/data/admin/dashboard/revenue";

export function RevenueOverview() {
  const maxValue = Math.max(...revenueData.map((item) => item.value));

  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-sm font-bold text-gray-900">
            {revenueOverview.title}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            {revenueOverview.description}
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold tracking-tight text-gray-900">
            {revenueOverview.total}
          </p>

          <div className="mt-1 flex items-center justify-end gap-1 text-[11px] font-semibold text-emerald-600">
            <ArrowUpRight size={12} strokeWidth={2} />
            {revenueOverview.change}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-5 pb-5 pt-6 sm:px-6">
        <div className="flex h-52 items-end gap-3 sm:gap-5">
          {revenueData.map((item) => {
            const height = Math.max((item.value / maxValue) * 100, 8);

            return (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div className="flex h-full w-full items-end">
                  <div
                    className="w-full rounded-t-md bg-teal-100 transition-all duration-500 hover:bg-teal-200"
                    style={{ height: `${height}%` }}
                  />
                </div>

                <span className="text-[10px] font-medium text-gray-400">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-xs text-gray-400">{revenueOverview.period}</p>
      </div>
    </section>
  );
}
