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

import { FadeIn, FadeInStagger } from "./Motion";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-secondary leading-tight">
              Trusted by Homeowners & Designers
            </h2>
          </div>

          <div className="group relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl transition-transform hover:scale-105 sm:h-32 sm:w-32">
            <Image
              src="/images/Google-Review-QR.jpeg"
              alt="Google review QR code"
              fill
              unoptimized
              sizes="128px"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          </div>
        </FadeIn>

        <FadeInStagger
          className="flex gap-8 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Client testimonials"
        >
          {testimonials.map((item, index) => (
            <FadeIn key={item.name} direction="right" delay={index * 0.1} className="min-w-[320px] max-w-[320px] sm:min-w-[400px] sm:max-w-[400px]">
              <article
                className="h-full rounded-3xl bg-white p-8 sm:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-stone-100 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-2"
              >
                <div>
                  <div className="flex gap-1 mb-6 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg sm:text-xl leading-relaxed text-stone-600 font-medium italic font-display">
                    “{item.quote}”
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-secondary font-bold text-lg">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-base font-bold text-secondary">
                      {item.name}
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-bold">
                      {item.role}
                    </p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
