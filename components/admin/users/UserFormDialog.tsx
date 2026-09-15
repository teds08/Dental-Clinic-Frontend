"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

import { adminCreateUserValidator } from "@/validators/admin/users";
import { adminUpdateUserValidator } from "@/validators/admin/update-user";

import type { AdminUser, UserFormData } from "@/types/admin/users";

interface UserFormDialogProps {
  open: boolean;
  user: AdminUser | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void | Promise<void>;
}
const emptyForm: UserFormData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  contact_number: "",
  role_id: 2,
  date_of_birth: "",
  address: "",
  gender: "",
  emergency_contact: "",
  emergency_contact_number: "",
};

function getDateInputValue(date: string) {
  if (!date) return "";

  return date.split("T")[0];
}

function getFormFromUser(user: AdminUser): UserFormData {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: "",
    contact_number: user.contact_number,
    role_id: user.role === "admin" ? 1 : 2,
    date_of_birth: getDateInputValue(user.date_of_birth),
    address: user.address,
    gender:
      user.gender.length > 0
        ? user.gender.charAt(0).toUpperCase() +
          user.gender.slice(1).toLowerCase()
        : "",
    emergency_contact: user.emergency_contact ?? "",
    emergency_contact_number: user.emergency_contact_number ?? "",
  };
}

export function UserFormDialog({
  open,
  user,
  loading = false,
  onClose,
  onSubmit,
}: UserFormDialogProps) {
  const [form, setForm] = useState<UserFormData>(() =>
    user ? getFormFromUser(user) : emptyForm,
  );

  if (!open) {
    return null;
  }

  const isEditing = Boolean(user);

  function handleChange(field: keyof UserFormData, value: string | number) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    const formattedDate = form.date_of_birth.replace(/-/g, "/");

    const validationData = {
      ...form,
      date_of_birth: formattedDate,
      emergency_contact: form.emergency_contact || undefined,
      emergency_contact_number: form.emergency_contact_number || undefined,
    };

    const result = isEditing
      ? adminUpdateUserValidator.safeParse(validationData)
      : adminCreateUserValidator.safeParse(validationData);

    if (!result.success) {
      const firstError = result.error.issues[0];

      toast.error(firstError.message);

      return;
    }

    const submittedData: UserFormData = {
      ...form,
      date_of_birth: formattedDate,
      emergency_contact: form.emergency_contact,
      emergency_contact_number: form.emergency_contact_number,
    };

    onSubmit(submittedData);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-form-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2
              id="user-form-title"
              className="text-lg font-semibold text-gray-900"
            >
              {isEditing ? "Edit User" : "Add User"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {isEditing
                ? "Update the user's account information."
                : "Create a new user account."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close dialog"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 px-6 py-6">
            {/* Personal Information */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900">
                Personal Information
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="first_name"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    id="first_name"
                    type="text"
                    value={form.first_name}
                    onChange={(event) =>
                      handleChange("first_name", event.target.value)
                    }
                    placeholder="Enter first name"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="last_name"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    id="last_name"
                    type="text"
                    value={form.last_name}
                    onChange={(event) =>
                      handleChange("last_name", event.target.value)
                    }
                    placeholder="Enter last name"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label
                    htmlFor="date_of_birth"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>

                  <input
                    id="date_of_birth"
                    type="date"
                    value={form.date_of_birth}
                    onChange={(event) =>
                      handleChange("date_of_birth", event.target.value)
                    }
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>

                  <select
                    id="gender"
                    value={form.gender}
                    onChange={(event) =>
                      handleChange("gender", event.target.value)
                    }
                    className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="">Select gender</option>

                    <option value="Male">Male</option>

                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>

                  <textarea
                    id="address"
                    value={form.address}
                    onChange={(event) =>
                      handleChange("address", event.target.value)
                    }
                    placeholder="Enter address"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>
            </section>

            {/* Account Information */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900">
                Account Information
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                    placeholder="Enter email address"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                    placeholder={
                      isEditing
                        ? "Leave blank to keep current password"
                        : "Enter password"
                    }
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />

                  {isEditing && (
                    <p className="mt-1.5 text-xs text-gray-400">
                      Leave blank if you do not want to change the password.
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    htmlFor="contact_number"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Contact Number
                  </label>

                  <input
                    id="contact_number"
                    type="tel"
                    value={form.contact_number}
                    onChange={(event) =>
                      handleChange("contact_number", event.target.value)
                    }
                    placeholder="09XXXXXXXXX"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    htmlFor="role_id"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>

                  <select
                    id="role_id"
                    value={form.role_id}
                    onChange={(event) =>
                      handleChange("role_id", Number(event.target.value))
                    }
                    className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  >
                    <option value={2}>User</option>

                    <option value={1}>Admin</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Emergency Contact */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900">
                Emergency Contact
              </h3>

              <div className="mt-4 space-y-4">
                {/* Contact Name */}
                <div>
                  <label
                    htmlFor="emergency_contact"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Contact Name
                  </label>

                  <input
                    id="emergency_contact"
                    type="text"
                    value={form.emergency_contact}
                    onChange={(event) =>
                      handleChange("emergency_contact", event.target.value)
                    }
                    placeholder="Enter emergency contact name"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    htmlFor="emergency_contact_number"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Contact Number
                  </label>

                  <input
                    id="emergency_contact_number"
                    type="tel"
                    value={form.emergency_contact_number}
                    onChange={(event) =>
                      handleChange(
                        "emergency_contact_number",
                        event.target.value,
                      )
                    }
                    placeholder="09XXXXXXXXX"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-2 border-t border-gray-200 px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-10 cursor-pointer rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="h-10 min-w-[120px] cursor-pointer rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
