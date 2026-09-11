"use client";

import { Menu, FaceGrinning, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navigationItems } from "@/data/landingpage/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.sectionId))
      .filter((section): section is HTMLElement => section !== null);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      let currentSection = "home";

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
            <FaceGrinning size={23} strokeWidth={1.8} />
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

        {/* Desktop Navigation */}
        <div className="mx-auto hidden items-center gap-8 md:flex">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.sectionId;

            return (
              <Link
                key={item.sectionId}
                href={item.href}
                className={`relative py-2 text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-teal-700"
                    : "font-medium text-gray-500 hover:text-teal-700"
                }`}
              >
                {item.label}

                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-teal-700" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-teal-50 hover:text-teal-700"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-md"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 md:hidden"
        >
          {isMenuOpen ? (
            <X size={22} strokeWidth={1.8} />
          ) : (
            <Menu size={22} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-5">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.sectionId;

              return (
                <Link
                  key={item.sectionId}
                  href={item.href}
                  onClick={handleNavigation}
                  className={`rounded-lg px-4 py-3 text-sm ${
                    isActive
                      ? "bg-teal-50 font-semibold text-teal-700"
                      : "font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-teal-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-3 border-t border-gray-100 pt-4">
              <Link
                href="/login"
                onClick={handleNavigation}
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Log in
              </Link>

              <Link
                href="/signup"
                onClick={handleNavigation}
                className="mt-2 block rounded-lg bg-teal-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-teal-800"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
