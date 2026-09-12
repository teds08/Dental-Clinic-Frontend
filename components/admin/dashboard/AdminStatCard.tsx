import type { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export function AdminStatCard({
  title,
  value,
  description,
  icon: Icon,
}: AdminStatCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-transform duration-300 group-hover:scale-105">
        <Icon size={21} strokeWidth={1.8} />
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
          {value}
        </p>

        <p className="mt-1 text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}
