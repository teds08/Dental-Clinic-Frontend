import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { aboutFeatures } from "@/data/landingpage/about";

export function About() {
  return (
    <section id="about" className="px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <div className="relative mx-auto w-full max-w-lg lg:mx-0">
          <div className="absolute -bottom-5 -left-5 h-full w-full rounded-[2rem] bg-teal-50" />

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gray-100 shadow-lg">
            <div className="relative h-full min-h-[400px] overflow-hidden rounded-3xl">
              <Image
                src="/service6.png"
                alt="Dental clinic professional care"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Experience Card */}
          <div className="absolute -bottom-6 right-5 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-lg sm:right-8">
            <p className="text-2xl font-bold text-teal-700">10+</p>
            <p className="mt-0.5 text-xs font-medium text-gray-500">
              Years of experience
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="text-sm font-semibold text-teal-700">
            About Our Clinic
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Caring for your smile with confidence
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-500">
            We believe that dental care should be comfortable, accessible, and
            centered around each patient. Our goal is to provide quality
            treatment while creating a welcoming environment for everyone.
          </p>

          <p className="mt-4 text-base leading-7 text-gray-500">
            From preventive care and routine checkups to specialized treatments,
            our team is dedicated to helping you maintain a healthy and
            confident smile.
          </p>

          {/* Features */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {aboutFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <Link
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-800"
          >
            Learn more about our clinic
            <ArrowRight
              size={17}
              strokeWidth={1.8}
              className="transition-transform hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
