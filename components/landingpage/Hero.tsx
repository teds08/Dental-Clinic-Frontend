import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="relative section-pattern section-pattern-glow"
    >
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        {/* Hero Content */}
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
            <span className="h-2 w-2 rounded-full bg-teal-600" />
            Professional Dental Care
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            A healthier smile starts with{" "}
            <span className="text-teal-700">better care.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
            Quality dental care focused on your comfort, confidence, and
            long-term oral health. We are here to help you achieve a smile you
            can feel proud of.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-md"
            >
              <CalendarDays size={18} strokeWidth={1.8} />
              Book an Appointment
            </Link>

            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
            >
              Explore Services
              <ArrowRight size={18} strokeWidth={1.8} />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 grid grid-cols-1 gap-5 border-t border-gray-100 pt-7 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-bold text-gray-900">10+</p>
              <p className="mt-1 text-xs text-gray-500">Years of experience</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">5,000+</p>
              <p className="mt-1 text-xs text-gray-500">Happy patients</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                <CheckCircle2
                  size={16}
                  className="text-teal-600"
                  strokeWidth={2}
                />
              </div>

              <p className="mt-1 text-xs text-gray-500">Patient rating</p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          {/* Decorative Background */}
          <div className="absolute -right-6 -top-6 h-full w-full rounded-[2rem] bg-teal-50" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gray-100 shadow-xl">
            <Image
              src="/service1.png"
              alt="Professional dental care"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Floating Card */}
          <div className="hero-floating absolute -bottom-5 -left-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-lg sm:-left-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <CheckCircle2 size={22} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900">
                  Your smile matters
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Care you can trust
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
