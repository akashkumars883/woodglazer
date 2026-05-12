"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  startTransition,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { FadeIn, FadeInStagger } from "./Motion";

const heroSlides = [
  {
    image: "/images/hero-image1.png",
    alt: "Wood Glazer premium wood polishing and finishing craftsmanship",
    eyebrow: "Wood Polishing & Carpentry Mastery",
    title: "Bring Depth, Shine, and Character Back to Every Surface",
    description:
      "Your wooden interiors deserve more than just maintenance — they deserve mastery. At Wood Glazer, we deliver premium wood polishing, custom carpentry, and interior finishing solutions that breathe new life into every surface.",
    buttonLabel: "Book Free Consultation",
    buttonHref: "/#request-quote",
    accent: "from-[#4c120f]/92 via-[#4c120f]/68 to-[#190807]/22",
  },
  {
    image: "/images/hero-image2.png",
    alt: "Wood Glazer custom carpentry and interior joinery solutions",
    eyebrow: "Bespoke Wood Finishing",
    title: "Craftsmanship That Endures",
    description:
      "Whether you are a homeowner looking to restore the warmth of aged wood, or an interior designer seeking a skilled execution partner, we provide craftsmanship that endures, backed by over 15 years of hands-on experience.",
    buttonLabel: "Explore Our Services",
    buttonHref: "/services",
    accent: "from-[#6a2b0f]/90 via-[#8f5316]/64 to-[#231105]/20",
  },
  {
    image: "/images/hero-image3.png",
    alt: "Wood Glazer interior finishing and bespoke wood detailing",
    eyebrow: "Premium Interior Panels & Wallpaper",
    title: "Sleek Aesthetics, Precision Execution Across Delhi NCR",
    description:
      "Based in Faridabad and serving clients across Delhi, Gurugram, Noida, and the wider NCR region, Wood Glazer has built an enviable reputation for precision, premium finishes, and on-time delivery.",
    buttonLabel: "Get In Touch",
    buttonHref: "/contact",
    accent: "from-[#2d100d]/90 via-[#5a120f]/66 to-[#0f0605]/18",
  },
] as const;

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const showSlide = (index: number) => {
    startTransition(() => {
      setActiveSlide(index);
    });
  };

  const showNextSlide = useEffectEvent(() => {
    showSlide((activeSlide + 1) % heroSlides.length);
  });

  const showPreviousSlide = () => {
    showSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return;
    }

    const interval = window.setInterval(() => {
      showNextSlide();
    }, 6000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative isolate w-full overflow-hidden bg-stone-950">
      <div className="relative min-h-[500px] h-[65vh] sm:h-[70vh] w-full">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(-${activeSlide * 100}%, 0, 0)` }}
        >
          {heroSlides.map((slide, index) => (
            <article
              key={slide.eyebrow}
              className="relative min-w-full h-full"
              aria-hidden={index !== activeSlide}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.3)_30%,rgba(0,0,0,0.75)_100%)]" />
            </article>
          ))}
        </div>

        <div className="absolute inset-0 z-10 flex items-center py-20">
          <div className="mx-auto flex w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeInStagger className="max-w-4xl text-white">
              <div className="mt-6">
                <FadeIn>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">
                    {heroSlides[activeSlide].eyebrow}
                  </p>
                  <h1 className="mt-2 max-w-3xl text-3xl font-display font-medium leading-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
                    {heroSlides[activeSlide].title}
                  </h1>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg font-medium drop-shadow-sm">
                    {heroSlides[activeSlide].description}
                  </p>
                </FadeIn>
              </div>

              <FadeIn delay={0.4} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  href={heroSlides[activeSlide].buttonHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-[0_20px_50px_-12px_rgba(197,133,36,0.6)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-secondary"
                >
                  {heroSlides[activeSlide].buttonLabel}
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <div className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 sm:px-5 sm:py-3 text-sm text-white/90 shadow-sm backdrop-blur-md">
                  <span className="font-semibold text-white text-base sm:text-lg">
                    0{activeSlide + 1}
                  </span>
                  <span className="h-px w-8 sm:w-10 bg-white/30" />
                  <span className="font-medium">0{heroSlides.length}</span>
                </div>
              </FadeIn>
            </FadeInStagger>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-4 sm:p-5 lg:p-6">
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/28 bg-black/16 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/28"
              onClick={showPreviousSlide}
              aria-label="Show previous hero slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/28 bg-black/16 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/28"
              onClick={() => showSlide((activeSlide + 1) % heroSlides.length)}
              aria-label="Show next hero slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.eyebrow}
                type="button"
                onClick={() => showSlide(index)}
                aria-label={`Show ${slide.eyebrow} slide`}
                aria-pressed={index === activeSlide}
                className={[
                  "h-2.5 rounded-full transition-all duration-300",
                  index === activeSlide
                    ? "w-10 bg-white"
                    : "w-2.5 bg-white/45 hover:bg-white/72",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
