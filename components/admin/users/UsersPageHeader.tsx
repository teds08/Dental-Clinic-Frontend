"use client";

import { UserPlus } from "lucide-react";

interface UsersPageHeaderProps {
  onAddUser: () => void;
}

export function UsersPageHeader({ onAddUser }: UsersPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          User Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage patient and administrator accounts, roles, and access.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddUser}
        className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800 sm:w-auto"
      >
        <UserPlus size={16} strokeWidth={1.9} />
        Add User
      </button>
    </div>
  );
}
