"use client";

import { X } from "lucide-react";

import type { AdminUser } from "@/types/admin/users";

interface UserDetailsDialogProps {
  open: boolean;
  user: AdminUser | null;
  onClose: () => void;
}

function formatDate(date: string) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatGender(gender: string) {
  if (!gender) return "—";

  return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
}

export function UserDetailsDialog({
  open,
  user,
  onClose,
}: UserDetailsDialogProps) {
  if (!open || !user) {
    return null;
  }

  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-details-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2
              id="user-details-title"
              className="text-lg font-semibold text-gray-900"
            >
              User Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View account and personal information for {fullName}.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          {/* Personal Information */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900">
              Personal Information
            </h3>

            <div className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {/* First Name */}
              <div>
                <p className="text-xs font-medium text-gray-500">First Name</p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {user.first_name || "—"}
                </p>
              </div>

              {/* Last Name */}
              <div>
                <p className="text-xs font-medium text-gray-500">Last Name</p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {user.last_name || "—"}
                </p>
              </div>

              {/* Date of Birth */}
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Date of Birth
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {formatDate(user.date_of_birth)}
                </p>
              </div>

              {/* Gender */}
              <div>
                <p className="text-xs font-medium text-gray-500">Gender</p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {formatGender(user.gender)}
                </p>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <p className="text-xs font-medium text-gray-500">Address</p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {user.address || "—"}
                </p>
              </div>
            </div>
          </section>

          {/* Account Information */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900">
              Account Information
            </h3>

            <div className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {/* Email */}
              <div>
                <p className="text-xs font-medium text-gray-500">Email</p>

                <p className="mt-1 break-all text-sm font-medium text-gray-900">
                  {user.email || "—"}
                </p>
              </div>

              {/* Role */}
              <div>
                <p className="text-xs font-medium text-gray-500">Role</p>

                <span
                  className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                    user.role === "admin"
                      ? "bg-teal-50 text-teal-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {user.role}
                </span>
              </div>

              {/* Contact Number */}
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Contact Number
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {user.contact_number || "—"}
                </p>
              </div>

              {/* Password */}
              <div>
                <p className="text-xs font-medium text-gray-500">Password</p>

                <p className="mt-1 text-sm font-medium text-gray-500">
                  Hidden for security
                </p>
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900">
              Emergency Contact
            </h3>

            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Contact Name */}
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Contact Name
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {user.emergency_contact || "—"}
                  </p>
                </div>

                {/* Contact Number */}
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Contact Number
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {user.emergency_contact_number || "—"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Account Dates */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900">
              Account Activity
            </h3>

            <div className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {/* Registered */}
              <div>
                <p className="text-xs font-medium text-gray-500">Registered</p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {formatDate(user.created_at)}
                </p>
              </div>

              {/* Last Updated */}
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Last Updated
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {formatDate(user.updated_at)}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 cursor-pointer rounded-xl border border-gray-200 px-5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
