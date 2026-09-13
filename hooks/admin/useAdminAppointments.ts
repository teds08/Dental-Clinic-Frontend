"use client";

import { useEffect, useState } from "react";

import { APPOINTMENTS_PER_PAGE } from "@/data/admin/dashboard/appointments";
import { getAdminAppointments } from "@/lib/api/admin/appointments";

import type {
  AdminAppointment,
  AdminAppointmentsPagination,
} from "@/types/admin/appointments";

export function useAdminAppointments() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);

  const [pagination, setPagination] =
    useState<AdminAppointmentsPagination | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * Debounce search input.
   *
   * The API request will only happen 400ms
   * after the user stops typing.
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim());
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  /*
   * Fetch appointments from the backend.
   */
  useEffect(() => {
    let isCancelled = false;

    async function fetchAppointments() {
      try {
        const response = await getAdminAppointments(
          debouncedSearchQuery || undefined,
          selectedFilter || undefined,
          currentPage,
          APPOINTMENTS_PER_PAGE,
        );

        if (isCancelled) {
          return;
        }

        setAppointments(response.appointments);
        setPagination(response.pagination);
        setError("");
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setAppointments([]);
        setPagination(null);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load appointments.",
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void fetchAppointments();

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearchQuery, selectedFilter, currentPage, refreshKey]);

  /*
   * Change appointment status filter.
   * Always return to page 1.
   */
  function setFilter(filter: string) {
    setIsLoading(true);
    setError("");
    setCurrentPage(1);
    setSelectedFilter(filter);
  }

  /*
   * Change search query.
   * The actual API request is delayed by the debounce above.
   */
  function setSearch(query: string) {
    setSearchQuery(query);
    setIsLoading(true);
    setError("");
    setCurrentPage(1);
  }

  /*
   * Change appointment page.
   */
  function setPage(page: number) {
    if (page < 1 || (pagination && page > pagination.total_pages)) {
      return;
    }

    setIsLoading(true);
    setError("");
    setCurrentPage(page);
  }

  /*
   * Refresh the current appointment list.
   */
  function refresh() {
    setIsLoading(true);
    setError("");
    setRefreshKey((current) => current + 1);
  }

  /*
   * Refresh after approving or rejecting
   * an appointment.
   */
  function handleStatusChange() {
    setIsLoading(true);
    setRefreshKey((current) => current + 1);
  }

  return {
    appointments,
    pagination,
    selectedFilter,
    searchQuery,
    currentPage,
    isLoading,
    error,
    setFilter,
    setSearch,
    setPage,
    refresh,
    handleStatusChange,
  };
}
