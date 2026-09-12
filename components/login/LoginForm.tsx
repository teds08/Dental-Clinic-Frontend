"use client";

import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginUser, setAuthToken } from "@/lib/api/auth";
import { decodeJwt } from "@/lib/jwt";
import type { LoginFormData, LoginFormErrors } from "@/types/auth/login";
import { loginSchema } from "@/validators/auth/login";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: LoginFormErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormData;

        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const data = await loginUser(formData);

      const payload = decodeJwt(data.token);

      if (!payload) {
        setErrors({
          email: "Unable to process your login session.",
        });

        return;
      }

      setAuthToken(data.token);

      setFormData({
        email: "",
        password: "",
      });

      if (payload.role_id === 1) {
        router.push("/admin/dashboard");
        return;
      }

      if (payload.role_id === 2) {
        router.push("/dashboard");
        return;
      }

      setErrors({
        email: "Your account has an invalid role.",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to log in. Please try again.";

      setErrors({
        email: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Email address
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
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            disabled={isSubmitting}
            className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 disabled:cursor-not-allowed disabled:bg-gray-50"
          />
        </div>

        {errors.email && (
          <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-teal-700 transition-colors hover:text-teal-800"
          >
            Forgot password?
          </Link>
        </div>

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
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={isSubmitting}
            className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-11 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 disabled:cursor-not-allowed disabled:bg-gray-50"
          />
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
          )}
          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? "Hide password" : "Show password"}
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

      {/* Login Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-11 w-full items-center justify-center rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
