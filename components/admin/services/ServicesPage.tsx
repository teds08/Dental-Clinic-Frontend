"use client";

import { useMemo, useState } from "react";

import { dummyServices } from "@/data/admin/services/services";
import type { AdminService } from "@/types/admin/services";

import type { ServiceFormData } from "./ServiceFormDialog";
import { ServiceFilters } from "./ServiceFilters";
import { ServiceGrid } from "./ServiceGrid";
import { ServicesPageHeader } from "./ServicesPageHeader";
import { ServiceFormDialog } from "./ServiceFormDialog";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { ServiceActionDialog } from "./ServiceActionDialog";

export function ServicesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  const [selectedService, setSelectedService] = useState<AdminService | null>(
    null,
  );

  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);

  const [editingService, setEditingService] = useState<AdminService | null>(
    null,
  );

  const [actionService, setActionService] = useState<AdminService | null>(null);

  const [action, setAction] = useState<"archive" | "restore" | "delete" | null>(
    null,
  );

  const filteredServices = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = dummyServices.filter((service) => {
      const matchesSearch =
        normalizedSearch === "" ||
        service.title.toLowerCase().includes(normalizedSearch) ||
        service.description.toLowerCase().includes(normalizedSearch);

      const matchesStatus = status === "all" || service.status === status;

      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );

        case "name-asc":
          return a.title.localeCompare(b.title);

        case "name-desc":
          return b.title.localeCompare(a.title);

        case "price-asc":
          return Number(a.price) - Number(b.price);

        case "price-desc":
          return Number(b.price) - Number(a.price);

        case "newest":
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });
  }, [search, status, sort]);

  function handleView(service: AdminService) {
    setSelectedService(service);
  }

  function handleEdit(service: AdminService) {
    setSelectedService(null);
    setEditingService(service);
    setIsServiceFormOpen(true);
  }

  function handleArchive(service: AdminService) {
    setActionService(service);
    setAction("archive");
  }

  function handleRestore(service: AdminService) {
    setActionService(service);
    setAction("restore");
  }

  function handleDelete(service: AdminService) {
    setActionService(service);
    setAction("delete");
  }

  function handleCloseAction() {
    setActionService(null);
    setAction(null);
  }

  function handleConfirmAction() {
    if (!actionService || !action) {
      return;
    }

    console.log(`${action} service:`, actionService);

    handleCloseAction();
  }

  function handleServiceSubmit(formData: ServiceFormData) {
    console.log("Service form submitted:", formData);

    /*
     * Add Service API will be connected
     * in the next feature.
     *
     * For now, we only receive and inspect
     * the form data.
     */
  }

  return (
    <section>
      <ServicesPageHeader
        onAddService={() => {
          setEditingService(null);
          setIsServiceFormOpen(true);
        }}
      />

      <ServiceFilters
        search={search}
        status={status}
        sort={sort}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onSortChange={setSort}
      />

      {/* Results Count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {filteredServices.length}
          </span>{" "}
          {filteredServices.length === 1 ? "service" : "services"}
        </p>
      </div>

      {/* Service Grid */}
      {filteredServices.length > 0 ? (
        <ServiceGrid
          services={filteredServices}
          onView={handleView}
          onEdit={handleEdit}
          onArchive={handleArchive}
          onRestore={handleRestore}
          onDelete={handleDelete}
        />
      ) : (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white px-5 py-14 text-center shadow-sm">
          <p className="text-sm font-semibold text-gray-700">
            No services found
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* Service Action Dialog */}
      <ServiceActionDialog
        service={actionService}
        action={action}
        isOpen={actionService !== null && action !== null}
        onClose={handleCloseAction}
        onConfirm={handleConfirmAction}
      />

      {/* Service Details Dialog */}
      <ServiceDetailsDialog
        service={selectedService}
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        onEdit={handleEdit}
      />

      {/* Add / Edit Service Dialog */}
      <ServiceFormDialog
        key={editingService?.id ?? "new"}
        isOpen={isServiceFormOpen}
        service={editingService}
        onClose={() => {
          setIsServiceFormOpen(false);
          setEditingService(null);
        }}
        onSubmit={handleServiceSubmit}
      />
    </section>
  );
}
