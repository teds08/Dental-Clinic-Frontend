"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { ArchivedUsers } from "@/components/admin/users/archive/ArchivedUsers";
import { UserActionDialog } from "@/components/admin/users/UserActionDialog";
import { UserDetailsDialog } from "@/components/admin/users/UserDetailsDialog";
import { UserFilters } from "@/components/admin/users/UserFilters";
import { UserFormDialog } from "@/components/admin/users/UserFormDialog";
import { UserListSkeleton } from "@/components/admin/users/UserListSkeleton";
import { UserPagination } from "@/components/admin/users/UserPagination";
import { UsersPageHeader } from "@/components/admin/users/UsersPageHeader";
import { UserTable } from "@/components/admin/users/UserTable";

import {
  archiveUser,
  createAdminUser,
  getAllActiveUsers,
  updateAdminUser,
} from "@/lib/api/admin/users";

import { USERS_PER_PAGE } from "@/data/admin/users/users";

import type { AdminUser, UserFormData } from "@/types/admin/users";

type UserView = "active" | "archived";

export function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userView, setUserView] = useState<UserView>("active");

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [isActionOpen, setIsActionOpen] = useState(false);
  const [actionUser, setActionUser] = useState<AdminUser | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  async function loadUsers() {
    try {
      setLoading(true);
      setError(null);

      const result = await getAllActiveUsers();

      setUsers(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load users.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        const result = await getAllActiveUsers();

        if (cancelled) return;

        setUsers(result);
        setError(null);
      } catch (err) {
        if (cancelled) return;

        const message =
          err instanceof Error ? err.message : "Failed to load users.";

        setError(message);
        toast.error(message);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();

      const matchesSearch =
        normalizedSearch === "" ||
        fullName.includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch) ||
        user.contact_number.includes(normalizedSearch);

      const matchesRole = role === "all" || user.role === role;

      return matchesSearch && matchesRole;
    });
  }, [users, search, role]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE),
  );

  const activePage = Math.min(currentPage, totalPages);

  const paginatedUsers = useMemo(() => {
    const startIndex = (activePage - 1) * USERS_PER_PAGE;

    return filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);
  }, [filteredUsers, activePage]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleRoleChange(value: string) {
    setRole(value);
    setCurrentPage(1);
  }

  function handleAddUser() {
    setSelectedUser(null);
    setIsFormOpen(true);
  }

  function handleViewUser(user: AdminUser) {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  }

  function handleEditUser(user: AdminUser) {
    setSelectedUser(user);
    setIsFormOpen(true);
  }

  function handleArchiveUser(user: AdminUser) {
    setActionUser(user);
    setIsActionOpen(true);
  }

  async function handleFormSubmit(data: UserFormData) {
    try {
      setIsSubmitting(true);

      if (selectedUser) {
        const updatePayload = {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          contact_number: data.contact_number,
          role_id: data.role_id,
          date_of_birth: data.date_of_birth,
          address: data.address,
          gender: data.gender,
          emergency_contact: data.emergency_contact || undefined,
          emergency_contact_number: data.emergency_contact_number || undefined,
          ...(data.password ? { password: data.password } : {}),
        };

        await updateAdminUser(selectedUser.id, updatePayload);

        toast.success(
          `${data.first_name} ${data.last_name} was updated successfully.`,
        );
      } else {
        await createAdminUser({
          ...data,
          emergency_contact: data.emergency_contact || undefined,
          emergency_contact_number: data.emergency_contact_number || undefined,
        });

        toast.success(
          `${data.first_name} ${data.last_name} was created successfully.`,
        );
      }

      setIsFormOpen(false);
      setSelectedUser(null);

      await loadUsers();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : selectedUser
            ? "Failed to update user."
            : "Failed to create user.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmArchive() {
    if (!actionUser) return;

    try {
      setIsActionLoading(true);

      await archiveUser(actionUser.id);

      toast.success(
        `${actionUser.first_name} ${actionUser.last_name} was archived successfully.`,
      );

      setIsActionOpen(false);
      setActionUser(null);

      await loadUsers();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to archive user.";

      toast.error(message);
    } finally {
      setIsActionLoading(false);
    }
  }

  function handleCloseForm() {
    if (isSubmitting) return;

    setIsFormOpen(false);
    setSelectedUser(null);
  }

  function handleCloseDetails() {
    setIsDetailsOpen(false);
    setSelectedUser(null);
  }

  function handleCloseAction() {
    if (isActionLoading) return;

    setIsActionOpen(false);
    setActionUser(null);
  }

  return (
    <div className="space-y-6">
      <UsersPageHeader onAddUser={handleAddUser} />

      <div className="flex w-fit items-center gap-1 rounded-xl border border-gray-200 bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => {
            setUserView("active");
            setCurrentPage(1);
          }}
          className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            userView === "active"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Active Users
        </button>

        <button
          type="button"
          onClick={() => {
            setUserView("archived");
            setCurrentPage(1);
          }}
          className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            userView === "archived"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Archived Users
        </button>
      </div>

      {userView === "active" ? (
        <>
          <UserFilters
            search={search}
            role={role}
            onSearchChange={handleSearchChange}
            onRoleChange={handleRoleChange}
          />

          {loading ? (
            <UserListSkeleton />
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <p className="text-sm font-medium text-red-700">{error}</p>

              <button
                type="button"
                onClick={() => void loadUsers()}
                className="mt-3 cursor-pointer text-sm font-semibold text-red-700 underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <UserTable
                users={paginatedUsers}
                onViewUser={handleViewUser}
                onEditUser={handleEditUser}
                onArchiveUser={handleArchiveUser}
              />

              <UserPagination
                currentPage={activePage}
                totalPages={totalPages}
                totalUsers={filteredUsers.length}
                itemsPerPage={USERS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </>
      ) : (
        <ArchivedUsers />
      )}

      <UserFormDialog
        key={selectedUser?.id ?? "new"}
        open={isFormOpen}
        user={selectedUser}
        loading={isSubmitting}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />

      <UserDetailsDialog
        open={isDetailsOpen}
        user={selectedUser}
        onClose={handleCloseDetails}
      />

      <UserActionDialog
        open={isActionOpen}
        user={actionUser}
        action="archive"
        loading={isActionLoading}
        onClose={handleCloseAction}
        onConfirm={handleConfirmArchive}
      />
    </div>
  );
}
