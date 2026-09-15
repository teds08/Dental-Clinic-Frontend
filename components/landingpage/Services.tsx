"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { publicServiceIcons } from "@/data/landingpage/services";
import { getActiveServices } from "@/lib/api/public/services";
import type { PublicService } from "@/types/public/services";

export function Services() {
  const [services, setServices] = useState<PublicService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const activeServices = await getActiveServices();
        setServices(activeServices);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to load dental services.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <section id="services" className="bg-gray-50 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-teal-700">
            Our Services
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.65rem]">
            Complete dental care for every smile
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-500">
            From preventive care to specialized treatments, our clinic provides
            thoughtful dental services designed around your needs.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="aspect-[16/9] animate-pulse bg-gray-200" />

                <div className="animate-pulse p-6">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  <div className="mt-4 h-6 w-3/4 rounded bg-gray-200" />
                  <div className="mt-3 h-4 w-full rounded bg-gray-100" />
                  <div className="mt-2 h-4 w-5/6 rounded bg-gray-100" />

                  <div className="mt-6 flex justify-between">
                    <div className="h-4 w-20 rounded bg-gray-100" />
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && errorMessage && (
          <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-red-100 bg-white px-6 py-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-gray-800">
              We&apos;re unable to load our services right now.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Please try again later or contact RAFE Dental Clinic directly.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !errorMessage && services.length === 0 && (
          <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-gray-100 bg-white px-6 py-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-gray-800">
              Our services are currently being updated.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Please contact the clinic to learn about our available treatments.
            </p>
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && !errorMessage && services.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                priority={index === 0}
              />
            ))}
          </div>
        )}

        {/* Pricing / Inquiry CTA */}
        {!isLoading && !errorMessage && services.length > 0 && (
          <div className="mt-14 overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-9">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <MessageCircle size={19} strokeWidth={1.8} />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
                    Need more information?
                  </p>
                </div>

                <h3 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
                  Have questions about our services?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  Treatment options and pricing can vary depending on your
                  dental needs. Our dentist or clinic secretary can assist you
                  with the information you need.
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/70 px-6 py-6 sm:flex-row lg:border-l lg:border-t-0 lg:flex-col lg:px-8">
                <Link
                  href="#contact"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
                >
                  Contact the Clinic
                  <ArrowRight size={15} strokeWidth={2} />
                </Link>

                <a
                  href="https://www.facebook.com/profile.php?id=61559558511264"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                >
                  <MessageCircle size={15} strokeWidth={1.9} />
                  Message us on Facebook
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: PublicService;
  priority?: boolean;
}

function ServiceCard({ service, priority = false }: ServiceCardProps) {
  const [imageError, setImageError] = useState(false);

  const fallbackIcon =
    publicServiceIcons[service.icon] ?? publicServiceIcons["dental-care"];

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-100 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <Image
              src={fallbackIcon}
              alt=""
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        ) : (
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}

        {/* Category */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-teal-700 shadow-sm backdrop-blur-sm">
            {service.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title + Icon */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 p-1.5">
            <Image
              src={fallbackIcon}
              alt=""
              width={28}
              height={28}
              className="object-contain"
            />
          </div>

          <h3 className="pt-1 text-lg font-bold leading-6 text-gray-900">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
          {service.description}
        </p>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
            <Clock3 size={14} strokeWidth={1.8} />
            {service.duration_minutes} minutes
          </div>

          <Link
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-800"
          >
            Learn more
            <ArrowRight
              size={15}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
