"use client";

import { useEffect, useState } from "react";
import { Archive } from "lucide-react";
import { toast } from "sonner";

import {
  deleteUser,
  getArchivedUsers,
  restoreUser,
} from "@/lib/api/admin/users";

import type { ArchivedUser } from "@/types/admin/users";

import { ArchivedUserActionDialog } from "@/components/admin/users/archive/ArchivedUserActionDialog";
import { ArchivedUserTable } from "@/components/admin/users/archive/ArchivedUserTable";

export function ArchivedUsers() {
  const [users, setUsers] = useState<ArchivedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedUser, setSelectedUser] = useState<ArchivedUser | null>(null);

  const [action, setAction] = useState<"restore" | "delete">("restore");

  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchArchivedUsers() {
      try {
        const result = await getArchivedUsers();

        if (cancelled) {
          return;
        }

        setUsers(result);
        setError(null);
      } catch (err) {
        if (cancelled) {
          return;
        }

        const message =
          err instanceof Error ? err.message : "Failed to load archived users.";

        setError(message);
        toast.error(message);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchArchivedUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleRestore(user: ArchivedUser) {
    setSelectedUser(user);
    setAction("restore");
  }

  function handleDelete(user: ArchivedUser) {
    setSelectedUser(user);
    setAction("delete");
  }

  function handleCloseAction() {
    if (actionLoading) {
      return;
    }

    setSelectedUser(null);
  }

  async function handleConfirmAction() {
    if (!selectedUser) {
      return;
    }

    try {
      setActionLoading(true);

      if (action === "restore") {
        await restoreUser(selectedUser.id);

        toast.success(
          `${selectedUser.first_name} ${selectedUser.last_name} was restored successfully.`,
        );
      } else {
        await deleteUser(selectedUser.id);

        toast.success(
          `${selectedUser.first_name} ${selectedUser.last_name} was permanently deleted.`,
        );
      }

      setUsers((currentUsers) =>
        currentUsers.filter(
          (currentUser) => currentUser.id !== selectedUser.id,
        ),
      );

      setSelectedUser(null);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : action === "restore"
            ? "Failed to restore user."
            : "Failed to permanently delete user.";

      toast.error(message);
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <p className="text-sm text-gray-500">Loading archived users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">{error}</p>

        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
          className="mt-3 cursor-pointer text-sm font-semibold text-red-700 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Archive size={22} strokeWidth={1.8} className="text-gray-500" />
        </div>

        <h2 className="mt-4 text-base font-semibold text-gray-900">
          No archived users
        </h2>

        <p className="mt-1 max-w-sm text-sm text-gray-500">
          Users that you archive will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <ArchivedUserTable
        users={users}
        onRestore={handleRestore}
        onDelete={handleDelete}
      />

      <ArchivedUserActionDialog
        open={Boolean(selectedUser)}
        user={selectedUser}
        action={action}
        loading={actionLoading}
        onClose={handleCloseAction}
        onConfirm={handleConfirmAction}
      />
    </>
  );
}
