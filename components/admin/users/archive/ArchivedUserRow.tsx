"use client";

import { RotateCcw, Trash2 } from "lucide-react";

import type { ArchivedUser } from "@/types/admin/users";

interface ArchivedUserRowProps {
  user: ArchivedUser;
  onRestore: (user: ArchivedUser) => void;
  onDelete: (user: ArchivedUser) => void;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ArchivedUserRow({
  user,
  onRestore,
  onDelete,
}: ArchivedUserRowProps) {
  return (
    <tr className="transition-colors hover:bg-gray-50">
      {/* User */}
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {user.first_name} {user.last_name}
          </p>

          <p className="mt-0.5 text-xs text-gray-500">{user.email}</p>
        </div>
      </td>

      {/* Contact */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">{user.contact_number}</span>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
            user.role_name === "admin"
              ? "bg-teal-50 text-teal-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {user.role_name}
        </span>
      </td>

      {/* Archived */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">
          {formatDate(user.deleted_at)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => onRestore(user)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-teal-700 transition-colors hover:bg-teal-50"
          >
            <RotateCcw size={14} strokeWidth={1.8} />
            Restore
          </button>

          <button
            type="button"
            onClick={() => onDelete(user)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 size={14} strokeWidth={1.8} />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
