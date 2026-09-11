import { Star } from "lucide-react";
import { testimonials } from "@/data/landingpage/testimonials";

export function Testimonials() {
  return (
    <section className="bg-white px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-teal-700">
            Patient Experiences
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What our patients say
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-500">
            We value every patient and every experience. Here are some thoughts
            from people who have visited our clinic.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    fill="currentColor"
                    className="text-teal-600"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="mt-5 text-sm leading-6 text-gray-600">
                &quot;{testimonial.comment}&quot;
              </p>

              {/* Patient */}
              <div className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {testimonial.name}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
