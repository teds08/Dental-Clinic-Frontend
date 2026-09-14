"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  archiveService,
  deleteService,
  getArchivedServices,
  getServices,
  restoreService,
} from "@/lib/api/admin/services";

import type { AdminService } from "@/types/admin/services";

import type { ServiceFormData } from "./ServiceFormDialog";
import { ServiceFilters } from "./ServiceFilters";
import { ServiceGrid } from "./ServiceGrid";
import { ServicesPageHeader } from "./ServicesPageHeader";
import { ServiceFormDialog } from "./ServiceFormDialog";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { ServiceActionDialog } from "./ServiceActionDialog";

export function ServicesPage() {
  const [activeServices, setActiveServices] = useState<AdminService[]>([]);

  const [archivedServices, setArchivedServices] = useState<AdminService[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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

  const loadServices = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const [activeData, archivedData] = await Promise.all([
        getServices(),
        getArchivedServices(),
      ]);

      setActiveServices(
        activeData.map((service) => ({
          ...service,
          status: "active",
        })),
      );

      setArchivedServices(
        archivedData.map((service) => ({
          ...service,
          status: "archived",
        })),
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to load services.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchServices() {
      try {
        const [activeData, archivedData] = await Promise.all([
          getServices(),
          getArchivedServices(),
        ]);

        if (cancelled) {
          return;
        }
        setActiveServices(
          activeData.map((service) => ({
            ...service,
            status: "active" as const,
          })),
        );

        setArchivedServices(
          archivedData.map((service) => ({
            ...service,
            status: "archived" as const,
          })),
        );
        setErrorMessage("");
      } catch (error) {
        if (cancelled) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load services.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchServices();

    return () => {
      cancelled = true;
    };
  }, []);

  const allServices = useMemo(() => {
    return [...activeServices, ...archivedServices];
  }, [activeServices, archivedServices]);

  const filteredServices = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    let servicesToFilter: AdminService[];

    if (status === "active") {
      servicesToFilter = activeServices;
    } else if (status === "archived") {
      servicesToFilter = archivedServices;
    } else {
      servicesToFilter = allServices;
    }

    const result = servicesToFilter.filter((service) => {
      const matchesSearch =
        normalizedSearch === "" ||
        service.title.toLowerCase().includes(normalizedSearch) ||
        service.description.toLowerCase().includes(normalizedSearch);

      return matchesSearch;
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
  }, [activeServices, archivedServices, allServices, search, status, sort]);

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

  async function handleConfirmAction() {
    if (!actionService || !action) {
      return;
    }

    try {
      if (action === "archive") {
        await archiveService(actionService.id);
      }

      if (action === "restore") {
        await restoreService(actionService.id);
      }

      if (action === "delete") {
        await deleteService(actionService.id);
      }

      handleCloseAction();

      await loadServices();
    } catch (error) {
      console.error("Service action failed:", error);

      setErrorMessage(
        error instanceof Error ? error.message : "Service action failed.",
      );
    }
  }

  async function handleServiceSubmit(formData: ServiceFormData) {
    console.log("Service submitted:", formData);

    await loadServices();
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

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {filteredServices.length}
          </span>{" "}
          {filteredServices.length === 1 ? "service" : "services"}
        </p>
      </div>

      {isLoading ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-2xl border border-gray-200 bg-white shadow-sm"
            />
          ))}
        </div>
      ) : errorMessage ? (
        <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-10 text-center">
          <p className="text-sm font-semibold text-red-700">
            Failed to load services
          </p>

          <p className="mt-1 text-xs text-red-500">{errorMessage}</p>

          <button
            type="button"
            onClick={loadServices}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : filteredServices.length > 0 ? (
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

      <ServiceActionDialog
        service={actionService}
        action={action}
        isOpen={actionService !== null && action !== null}
        onClose={handleCloseAction}
        onConfirm={handleConfirmAction}
      />

      <ServiceDetailsDialog
        service={selectedService}
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        onEdit={handleEdit}
      />

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
