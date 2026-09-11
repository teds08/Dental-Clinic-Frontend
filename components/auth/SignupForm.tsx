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
  VenusAndMars,
} from "lucide-react";
import { useState } from "react";
import { genderOptions } from "@/data/auth/signup";
import { createUser } from "@/lib/api/auth";
import type { SignupFormData, SignupFormErrors } from "@/types/auth";
import { signupSchema } from "@/validators/auth/signup";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<SignupFormErrors>({});

  const [formData, setFormData] = useState<SignupFormData>({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    address: "",
    date_of_birth: "",
    gender: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const result = signupSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: SignupFormErrors = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (
        typeof field === "string" &&
        !fieldErrors[field as keyof SignupFormData]
      ) {
        fieldErrors[field as keyof SignupFormData] = issue.message;
      }
    });

    setErrors(fieldErrors);

    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await createUser(formData);

      console.log("Signup successful:", data);
    } catch (error) {
      if (error instanceof Error) {
        setErrors({
          email: error.message,
        });
      } else {
        setErrors({
          email: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      {/* First Name + Last Name */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* First Name */}
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
              value={formData.first_name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Last Name */}
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
              value={formData.last_name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
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
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
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
            value={formData.contact_number}
            onChange={handleChange}
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
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
            value={formData.address}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
          />
        </div>
      </div>

      {/* Date of Birth + Gender */}
      <div className="grid gap-5 sm:grid-cols-2">
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
              value={formData.date_of_birth}
              onChange={handleChange}
              disabled={isSubmitting}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Gender
          </label>

          <div className="relative">
            <VenusAndMars
              size={18}
              strokeWidth={1.8}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={isSubmitting}
              className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-11 pr-10 text-sm text-gray-900 outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <option value="" disabled>
                Select gender
              </option>

              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
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
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-11 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
          />

          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((previous) => !previous)}
            disabled={isSubmitting}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed"
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
            value={formData.confirm_password}
            onChange={handleChange}
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-11 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
          />

          <button
            type="button"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
            onClick={() => setShowConfirmPassword((previous) => !previous)}
            disabled={isSubmitting}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed"
          >
            {showConfirmPassword ? (
              <EyeOff size={18} strokeWidth={1.8} />
            ) : (
              <Eye size={18} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {errors.first_name && (
        <p className="mt-1.5 text-xs text-red-500">{errors.first_name}</p>
      )}
      {errors.last_name && (
        <p className="mt-1.5 text-xs text-red-500">{errors.last_name}</p>
      )}
      {errors.email && (
        <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
      )}
      {errors.contact_number && (
        <p className="mt-1.5 text-xs text-red-500">{errors.contact_number}</p>
      )}
      {errors.address && (
        <p className="mt-1.5 text-xs text-red-500">{errors.address}</p>
      )}
      {errors.date_of_birth && (
        <p className="mt-1.5 text-xs text-red-500">{errors.date_of_birth}</p>
      )}
      {errors.gender && (
        <p className="mt-1.5 text-xs text-red-500">{errors.gender}</p>
      )}
      {errors.password && (
        <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
      )}
      {errors.confirm_password && (
        <p className="mt-1.5 text-xs text-red-500">{errors.confirm_password}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl bg-teal-700 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
