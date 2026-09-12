import Link from "next/link";
import { FaceGrinning } from "lucide-react";
import { LoginForm } from "./LoginForm";

export function LoginContainer() {
  return (
    <section className="section-pattern section-pattern-glow flex min-h-screen items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
              <FaceGrinning size={24} strokeWidth={1.8} />
            </div>

            <div className="flex flex-col">
              <span className="text-base font-bold leading-tight text-gray-900">
                RAFE Dental Clinic
              </span>

              <span className="mt-0.5 text-[9px] font-medium tracking-wide text-gray-400">
                Your smile, our care
              </span>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Log in to manage your dental appointments and account.
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-teal-700 transition-colors hover:text-teal-800"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-700"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
