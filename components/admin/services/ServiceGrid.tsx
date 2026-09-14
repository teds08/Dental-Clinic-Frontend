import type { AdminService } from "@/types/admin/services";

import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
  services: AdminService[];
  onView: (service: AdminService) => void;
  onEdit: (service: AdminService) => void;
  onArchive: (service: AdminService) => void;
  onRestore: (service: AdminService) => void;
  onDelete: (service: AdminService) => void;
}

export function ServiceGrid({
  services,
  onView,
  onEdit,
  onArchive,
  onRestore,
  onDelete,
}: ServiceGridProps) {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          priority={index === 0}
          onView={onView}
          onEdit={onEdit}
          onArchive={onArchive}
          onRestore={onRestore}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
