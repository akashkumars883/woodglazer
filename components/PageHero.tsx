"use client";

import Image from "next/image";
import { FadeIn, FadeInStagger } from "./Motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage: string;
  imageAlt?: string;
}

export default function PageHero({
  title,
  subtitle,
  description,
  backgroundImage,
  imageAlt = "Wood Glazer Hero",
}: PageHeroProps) {
  return (
    <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-stone-900 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          priority
          className="object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-850 via-stone-850/30 to-transparent" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <FadeInStagger>
          {subtitle && (
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary mb-4">
                {subtitle}
              </p>
            </FadeIn>
          )}
          <FadeIn>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium leading-none mb-6">
              {title}
            </h1>
          </FadeIn>
          {description && (
            <FadeIn className="mx-auto max-w-2xl">
              <p className="text-lg text-stone-300 font-medium leading-relaxed">
                {description}
              </p>
            </FadeIn>
          )}
        </FadeInStagger>
      </div>
    </section>
  );
}
