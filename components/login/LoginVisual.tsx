import Image from "next/image";
import { FaceGrinning } from "lucide-react";
import { loginBenefits, loginVisualContent } from "@/data/auth/login";

export function LoginVisual() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden lg:block">
      <Image
        src="/service1.png"
        alt="Professional dental care"
        fill
        priority
        sizes="50vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-teal-950/80" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-14">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex text-white h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
            <FaceGrinning size={24} strokeWidth={1.8} />
          </div>

          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight text-white">
              RAFE Dental Clinic
            </span>

            <span className="mt-0.5 text-[9px] font-medium tracking-wide text-white/60">
              Your smile, our care
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-lg">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
            {loginVisualContent.eyebrow}
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            {loginVisualContent.title}
          </h1>

          <p className="mt-5 max-w-md text-base leading-7 text-white/75">
            {loginVisualContent.description}
          </p>

          {/* Benefits */}
          <div className="mt-10 space-y-5">
            {loginBenefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-teal-200">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      {benefit.title}
                    </h2>

                    <p className="mt-1 max-w-md text-sm leading-6 text-white/60">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-xs text-white/50">
          Professional dental care designed around you.
        </p>
      </div>
    </section>
  );
}
