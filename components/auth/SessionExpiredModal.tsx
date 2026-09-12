"use client";

import { LogIn, ShieldAlert } from "lucide-react";

interface SessionExpiredModalProps {
  isOpen: boolean;
  onLogin: () => void;
}

export function SessionExpiredModal({
  isOpen,
  onLogin,
}: SessionExpiredModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="session-expired-title"
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-7"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <ShieldAlert size={24} strokeWidth={1.8} />
        </div>

        <div className="mt-5">
          <h2
            id="session-expired-title"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Session Expired
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Your login session has expired. Please log in again to continue
            using your account.
          </p>
        </div>

        <button
          type="button"
          onClick={onLogin}
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
        >
          <LogIn size={17} strokeWidth={2} />
          Log in again
        </button>
      </div>
    </div>
  );
}
