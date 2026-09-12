import { Bell, ChevronDown, Search } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="hidden h-20 items-center justify-between border-b border-gray-200 bg-white px-8 lg:flex">
      {/* Left */}
      <div>
        <p className="text-xs font-medium text-gray-400">Admin Portal</p>

        <h1 className="mt-1 text-xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <Search size={19} strokeWidth={1.8} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <Bell size={19} strokeWidth={1.8} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-teal-600" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200" />

        {/* Admin Profile */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
            AD
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">Admin</p>

            <p className="text-xs text-gray-400">Administrator</p>
          </div>

          <ChevronDown
            size={16}
            strokeWidth={1.8}
            className="ml-1 text-gray-400"
          />
        </button>
      </div>
    </header>
  );
}
