"use client";

import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section id="whychooseus" className="py-10 sm:py-14 bg-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="service-outline-title text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl">
            Why Choose Us
          </h2>
        </div>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
              Trusted Craftsmanship
            </p>
            <h3 className="mt-4 text-2xl font-semibold leading-tight text-foreground sm:text-3xl lg:text-4xl">
              Precision wood finishing and carpentry with lasting quality.
            </h3>
            <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
              We combine skilled workmanship, premium materials, and careful
              detailing to deliver polished, durable, and elegant woodwork for
              residential and commercial interiors.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-stone-100 px-4 py-3">
                <p className="text-sm font-semibold text-secondary">
                  Experienced Team
                </p>
                <p className="mt-1 text-sm text-muted">
                  Skilled professionals focused on neat execution.
                </p>
              </div>
              <div className="rounded-lg bg-stone-100 px-4 py-3">
                <p className="text-sm font-semibold text-secondary">
                  Premium Finishes
                </p>
                <p className="mt-1 text-sm text-muted">
                  High-quality products that keep wood rich and protected.
                </p>
              </div>
              <div className="rounded-lg bg-stone-100 px-4 py-3">
                <p className="text-sm font-semibold text-secondary">
                  On-Time Delivery
                </p>
                <p className="mt-1 text-sm text-muted">
                  Structured workflow with clear project timelines.
                </p>
              </div>
              <div className="rounded-lg bg-stone-100 px-4 py-3">
                <p className="text-sm font-semibold text-secondary">
                  Detail-Oriented Work
                </p>
                <p className="mt-1 text-sm text-muted">
                  Clean finishing and careful touch in every corner.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[320px] overflow-hidden rounded-lg border bg-white shadow-sm sm:h-[400px] lg:h-[460px]">
            <Image
              src="/images/hero-image2.png"
              alt="Wood Glazer team performing precision carpentry and finishing work"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+ZNPQAIXwM4966biwAAAABJRU5ErkJggg=="
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.22)_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
