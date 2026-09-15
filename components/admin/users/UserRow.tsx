"use client";

import { Eye, Pencil } from "lucide-react";

import type { AdminUser } from "@/types/admin/users";

interface UserRowProps {
  user: AdminUser;
  onViewUser: (user: AdminUser) => void;
  onEditUser: (user: AdminUser) => void;
  onArchiveUser: (user: AdminUser) => void;
}

export function UserRow({
  user,
  onViewUser,
  onEditUser,
  onArchiveUser,
}: UserRowProps) {
  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {user.first_name} {user.last_name}
          </p>

          <p className="mt-0.5 text-xs text-gray-500">{user.email}</p>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">{user.contact_number}</span>
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
            user.role === "admin"
              ? "bg-teal-50 text-teal-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {user.role}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">
          {new Date(user.created_at).toLocaleDateString()}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => onViewUser(user)}
            aria-label={`View ${user.first_name} ${user.last_name}`}
            className="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <Eye size={16} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={() => onEditUser(user)}
            aria-label={`Edit ${user.first_name} ${user.last_name}`}
            className="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <Pencil size={16} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={() => onArchiveUser(user)}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-50"
          >
            Archive
          </button>
        </div>
      </td>
    </tr>
  );
}
