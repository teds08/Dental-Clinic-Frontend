"use client";

import { ArrowRight, Award, GraduationCap, Stethoscope } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { dentistProfile } from "@/data/landingpage/dentist";

const milestones = [
  {
    year: dentistProfile.education.year,
    title: dentistProfile.education.title,
    description: dentistProfile.education.description,
    icon: GraduationCap,
  },
  {
    year: dentistProfile.license.year,
    title: dentistProfile.license.title,
    description: "Professional dental license",
    icon: Award,
  },
  {
    year: dentistProfile.orthodontics.year,
    title: dentistProfile.orthodontics.title,
    description: dentistProfile.orthodontics.description,
    icon: Stethoscope,
  },
  {
    year: dentistProfile.implants.year,
    title: dentistProfile.implants.title,
    description: dentistProfile.implants.description,
    icon: Stethoscope,
  },
];

export function MeetOurDentist() {
  return (
    <section className="section-pattern section-pattern-glow relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            About RAFE Dental Clinic
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Meet Your Dentist
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            Experienced care, personalized attention, and a commitment to
            helping every patient achieve a healthier smile.
          </p>
        </div>

        {/* Dentist Introduction */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Dentist Photo */}
          {/* Dentist Photo */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="absolute -inset-4 rounded-[2rem] bg-teal-50/70" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-gray-200 bg-gray-50">
              <Image
                src="/doc.jpg"
                alt="Dental clinic professional care"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />

              {/* Name overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 pt-16">
                <p className="text-sm font-semibold text-white">
                  Dr. Rose Anne Fernandez Espra
                </p>
                <p className="mt-1 text-xs text-white/80">
                  Dentist & Clinic Owner
                </p>
              </div>
            </div>

            {/* Clinic Badge */}
            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-lg sm:-right-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                RAFE Dental Clinic
              </p>
              <p className="mt-1 text-sm font-bold text-gray-900">
                Caring for every smile
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
              Your Smile, Our Care
            </p>

            <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {dentistProfile.name}
            </h3>

            <p className="mt-2 text-sm font-medium text-gray-500">
              {dentistProfile.title}
            </p>

            <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">
              {dentistProfile.introduction}
            </p>

            {/* Expertise */}
            <div className="mt-7">
              <p className="text-sm font-semibold text-gray-900">
                Areas of Expertise
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {dentistProfile.expertise.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-teal-100 bg-teal-50 px-3.5 py-1.5 text-xs font-medium text-teal-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/booking"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
            >
              Book an Appointment
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        {/* Professional Milestones */}
        <div className="mt-20 border-t border-gray-100 pt-14 sm:mt-24">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
              Professional Journey
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
              Experience & Milestones
            </h3>
          </div>

          {/* Milestone Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone) => {
              const Icon = milestone.icon;

              return (
                <div
                  key={`${milestone.year}-${milestone.title}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-teal-700 transition-colors duration-300 group-hover:text-teal-800">
                      {milestone.year}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition-all duration-300 group-hover:bg-teal-50 group-hover:text-teal-700">
                      <Icon
                        size={17}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <h4 className="mt-5 text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-teal-700">
                    {milestone.title}
                  </h4>

                  <p className="mt-1.5 text-xs leading-5 text-gray-500">
                    {milestone.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Professional Experience */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {/* Associate Dentist */}
            <div className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 transition-colors duration-300 group-hover:text-teal-800">
                2016–2024
              </p>

              <h4 className="mt-2 text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-teal-700">
                Associate Dentist
              </h4>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Empuerto Dental Clinic
              </p>
            </div>

            {/* School Dentist */}
            <div className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 transition-colors duration-300 group-hover:text-teal-800">
                2017–2024
              </p>

              <h4 className="mt-2 text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-teal-700">
                School Dentist
              </h4>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Cordova Catholic Cooperative School (CCCS) & San Roque College
                de Cebu – Cordova
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
