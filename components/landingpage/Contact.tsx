import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { contactInformation } from "@/data/landingpage/contact";

export function Contact() {
  return (
    <section
      id="contact"
      className="section-pattern section-pattern-glow px-6 py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-teal-700">
            Contact Us
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We&apos;re here to help
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-500">
            Have a question or ready to schedule your next dental visit? Get in
            touch with our clinic today.
          </p>
        </div>

        {/* Contact Content */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-2xl bg-teal-700 p-8 text-white sm:p-10">
            <h3 className="text-2xl font-bold">Get in touch</h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-teal-50">
              Our team is ready to answer your questions and help you find the
              right dental care for your needs.
            </p>

            <div className="mt-8 space-y-6">
              {contactInformation.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon size={19} strokeWidth={1.8} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>

                      <p className="mt-1 text-sm text-teal-50">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Appointment CTA */}
          <div className="flex flex-col justify-center rounded-2xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
            <span className="text-sm font-semibold text-teal-700">
              Ready for your next visit?
            </span>

            <h3 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              Take the first step toward a healthier smile.
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Schedule an appointment with our clinic and let our dental team
              help you maintain a healthy and confident smile.
            </p>

            <Link
              href="/appointments"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-md"
            >
              Book an Appointment
              <ArrowRight size={17} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
