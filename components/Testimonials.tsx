"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "Rohit Mehra",
    role: "Home Owner",
    quote:
      "Excellent finishing quality and very professional team. The polish work completely changed the look of our interiors.",
  },
  {
    name: "Neha Arora",
    role: "Interior Designer",
    quote:
      "They understood our design intent perfectly and delivered clean carpentry work with great attention to detail.",
  },
  {
    name: "Amit Khanna",
    role: "Office Client",
    quote:
      "On-time delivery, smooth coordination, and premium finish. Highly recommended for commercial interior woodwork.",
  },
  {
    name: "Simran Kaur",
    role: "Residential Client",
    quote:
      "The team was responsive and transparent throughout. Final output was exactly what we expected.",
  },
] as const;

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-10 sm:py-14 bg-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="service-outline-title text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl">
            Testimonials
          </h2>

          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-white sm:h-24 sm:w-24">
            <Image
              src="/images/Google-Review-QR.jpeg"
              alt="Google review QR code"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>

        <div
          className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Client testimonials"
        >
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="min-w-[280px] max-w-[280px] rounded-lg border bg-stone-100 p-5 shadow-sm sm:min-w-[320px] sm:max-w-[320px]"
            >
              <p className="text-sm leading-7 text-muted">“{item.quote}”</p>
              <div className="mt-5 border-t pt-3">
                <p className="text-sm font-semibold text-secondary">
                  {item.name}
                </p>
                <p className="text-xs uppercase tracking-[0.16em] text-muted">
                  {item.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
