"use client";

import {
  CalendarDays,
  Eye,
  EyeOff,
  Home,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="mt-8 space-y-5">
      {/* First Name + Last Name */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="first_name"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            First Name
          </label>

          <div className="relative">
            <User
              size={18}
              strokeWidth={1.8}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Last Name
          </label>

          <div className="relative">
            <User
              size={18}
              strokeWidth={1.8}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={18}
            strokeWidth={1.8}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
          />
        </div>
      </div>

      {/* Contact Number */}
      <div>
        <label
          htmlFor="contact_number"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Contact Number
        </label>

        <div className="relative">
          <Phone
            size={18}
            strokeWidth={1.8}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="contact_number"
            name="contact_number"
            type="tel"
            placeholder="Enter your contact number"
            autoComplete="tel"
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label
          htmlFor="address"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Address
        </label>

        <div className="relative">
          <Home
            size={18}
            strokeWidth={1.8}
            className="absolute left-3.5 top-3.5 text-gray-400"
          />

          <textarea
            id="address"
            name="address"
            placeholder="Enter your complete address"
            autoComplete="street-address"
            rows={2}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <label
          htmlFor="date_of_birth"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Date of Birth
        </label>

        <div className="relative">
          <CalendarDays
            size={18}
            strokeWidth={1.8}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={18}
            strokeWidth={1.8}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            autoComplete="new-password"
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-11 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
          />

          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((previous) => !previous)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={1.8} />
            ) : (
              <Eye size={18} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirm_password"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Confirm Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={18}
            strokeWidth={1.8}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="confirm_password"
            name="confirm_password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            autoComplete="new-password"
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-11 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
          />

          <button
            type="button"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
            onClick={() => setShowConfirmPassword((previous) => !previous)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeOff size={18} strokeWidth={1.8} />
            ) : (
              <Eye size={18} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="h-11 w-full rounded-xl bg-teal-700 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-800 hover:shadow-md"
      >
        Create Account
      </button>
    </form>
  );
}
