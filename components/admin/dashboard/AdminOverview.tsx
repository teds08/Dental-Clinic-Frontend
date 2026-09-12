import {
  adminOverviewStats,
  adminWelcomeContent,
} from "@/data/admin/dashboard/overview";

import { AdminStatCard } from "./AdminStatCard";

export function AdminOverview() {
  return (
    <section>
      {/* Welcome */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          {adminWelcomeContent.eyebrow}
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {adminWelcomeContent.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {adminWelcomeContent.description}
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminOverviewStats.map((stat) => (
          <AdminStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeLabel={stat.changeLabel}
            icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
}
