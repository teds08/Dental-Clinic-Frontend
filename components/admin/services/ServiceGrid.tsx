import type { DummyService } from "@/data/admin/services/services";

import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
  services: DummyService[];
  onView: (service: DummyService) => void;
  onEdit: (service: DummyService) => void;
  onArchive: (service: DummyService) => void;
  onRestore: (service: DummyService) => void;
  onDelete: (service: DummyService) => void;
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
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
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
