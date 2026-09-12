import Image from "next/image";
import Link from "next/link";
import { FaceGrinning } from "lucide-react";
import { signupBenefits, signupVisualContent } from "@/data/auth/signup";

export function SignupVisual() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden bg-teal-950 lg:block">
      {/* Background Image */}
      <Image
        src="/service1.png"
        alt="Professional dental care"
        fill
        priority
        sizes="50vw"
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-teal-950/75" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col p-10 xl:p-14">
        {/* Logo */}
        <Link href="/" className="flex w-fit items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
            <FaceGrinning size={24} strokeWidth={1.8} />
          </div>

          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight">
              RAFE Dental Clinic
            </span>

            <span className="mt-0.5 text-[9px] font-medium tracking-wide text-teal-100/70">
              Your smile, our care
            </span>
          </div>
        </Link>

        {/* Main Content */}
        <div className="my-auto max-w-lg">
          <span className="text-sm font-semibold text-teal-200">
            {signupVisualContent.eyebrow}
          </span>

          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            {signupVisualContent.title}
          </h1>

          <p className="mt-5 max-w-md text-base leading-7 text-teal-50/80">
            {signupVisualContent.description}
          </p>

          {/* Benefits */}
          <div className="mt-10 space-y-5">
            {signupBenefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-teal-100 backdrop-blur-sm">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      {benefit.title}
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-teal-50/70">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-xs text-teal-100/50">
          Professional dental care for a healthier, more confident smile.
        </p>
      </div>
    </section>
  );
}
