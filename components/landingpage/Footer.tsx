import { Smile } from "lucide-react";
import Link from "next/link";
import { footerDescription, footerLinks } from "@/data/landingpage/footer";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
                <Smile size={22} strokeWidth={1.8} />
              </div>

              <div className="flex flex-col">
                <span className="text-base font-bold leading-tight text-gray-900">
                  Dental Clinic
                </span>

                <span className="mt-0.5 text-[9px] font-medium tracking-wide text-gray-400">
                  Your smile, our care
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
              {footerDescription}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold text-gray-900">Navigation</h3>

            <div className="mt-4 flex flex-col gap-3">
              {footerLinks.navigation.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-gray-500 transition-colors hover:text-teal-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-bold text-gray-900">Account</h3>

            <div className="mt-4 flex flex-col gap-3">
              {footerLinks.account.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-gray-500 transition-colors hover:text-teal-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-gray-100 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Dental Clinic. All rights reserved.
          </p>

          <p>Your smile, our care.</p>
        </div>
      </div>
    </footer>
  );
}
