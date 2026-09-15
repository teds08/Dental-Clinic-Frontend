"use client";

import type { AdminUser } from "@/types/admin/users";

import { UserRow } from "@/components/admin/users/UserRow";

interface UserTableProps {
  users: AdminUser[];
  onViewUser: (user: AdminUser) => void;
  onEditUser: (user: AdminUser) => void;
  onArchiveUser: (user: AdminUser) => void;
}

export function UserTable({
  users,
  onViewUser,
  onEditUser,
  onArchiveUser,
}: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                User
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Contact
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Role
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Registered
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.length > 0 ? (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onViewUser={onViewUser}
                  onEditUser={onEditUser}
                  onArchiveUser={onArchiveUser}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
