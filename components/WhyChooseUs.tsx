"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { FadeIn, FadeInStagger } from "./Motion";

export default function WhyChooseUs() {
  const pillars = [
    {
      title: "15+ Years of Proven Experience",
      desc: "With over a decade and a half in the industry and 500+ completed projects, our team has the expertise to handle everything from a single wardrobe restoration to a full commercial interior fit-out.",
    },
    {
      title: "Expert Team of 25+ Craftsmen",
      desc: "Our skilled professionals are trained in both traditional and modern finishing techniques, ensuring every surface receives careful, detail-oriented workmanship.",
    },
    {
      title: "Premium Materials Only",
      desc: "We use high-grade PU, melamine, Duco, and polyester finishes sourced from globally trusted brands. Every product we apply is chosen for its durability, appearance, and protective properties.",
    },
    {
      title: "On-Time Delivery",
      desc: "We follow a structured project workflow with clear timelines communicated upfront, so you always know where your project stands.",
    },
    {
      title: "Eco-Conscious Finishes",
      desc: "We prioritize eco-friendly coatings that are safe for your family, your space, and the environment.",
    },
  ];

  return (
    <section id="whychooseus" className="py-24 sm:py-32 bg-stone-100 border-y border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <FadeIn direction="left" className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">
                Why Choose Us
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-medium text-secondary leading-tight">
                Why Thousands of Homeowners & Designers Trust Wood Glazer
              </h2>
            </div>
            
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-medium">
              Wood Glazer is not just a polishing and carpentry company — we are craftsmen who care about every grain, every corner, and every finish. Here is what sets us apart from ordinary wood finishing services in Delhi NCR.
            </p>

            <div className="relative h-[300px] sm:h-[380px] overflow-hidden rounded-[2rem] shadow-xl">
              <Image
                src="/images/hero-image2.png"
                alt="Wood Glazer team performing precision carpentry and finishing work"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent" />
            </div>
          </FadeIn>

          <FadeInStagger className="space-y-6">
            {pillars.map((pillar, idx) => (
              <FadeIn key={idx} className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-stone-950 font-display">{pillar.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed font-medium">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>

        </div>
      </div>
    </section>
  );
}
