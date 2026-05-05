"use client";

import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { FadeIn, FadeInStagger } from "./Motion";

const fallbackImages = [
  "/images/hero-image1.png",
  "/images/hero-image2.png",
  "/images/hero-image3.png",
] as const;

type ServiceImageProps = {
  src: string;
  alt: string;
  fallbackSrc: string;
  priority?: boolean;
};

function ServiceImage({
  src,
  alt,
  fallbackSrc,
  priority = false,
}: ServiceImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover"
      onError={() => {
        if (imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
        }
      }}
    />
  );
}

interface SubService {
  slug: string;
  title: string;
  image: string;
}

interface Category {
  slug: string;
  title: string;
  sub_services: SubService[];
}

export default function Services() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from("service_categories")
        .select("*, sub_services(*)")
        .order("created_at", { ascending: true });
      
      if (data) {
        setCategories(data);
      }
      setLoading(false);
    }
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Loading Expert Services...</p>
      </div>
    );
  }

  if (categories.length === 0) return null;


  return (
    <section id="services" className="py-24 sm:py-32 bg-stone-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-3">
            Our Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-secondary">
            Crafting Excellence in Wood
          </h2>
        </FadeIn>

        <div className="space-y-24">
          {categories.map((service, serviceIndex) => (
            <FadeIn key={service.slug} delay={serviceIndex * 0.1}>
              <article
                id={service.slug}
                className="group space-y-8"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-stone-200 pb-6">
                  <h2 className="service-outline-title text-3xl font-display font-medium sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl transition-all duration-500 group-hover:tracking-tight">
                    {service.title}
                  </h2>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-center rounded-xl bg-secondary px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-primary hover:shadow-lg hover:-translate-y-1 sm:shrink-0"
                  >
                    Explore Category
                  </Link>
                </div>

                <FadeInStagger
                  className="flex gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-label={`${service.title} sub-services`}
                >
                  {(service.sub_services || []).map((subService: SubService, subServiceIndex: number) => (
                    <FadeIn key={subService.slug} direction="right" delay={subServiceIndex * 0.05}>
                      <Link
                        href={`/services/${service.slug}/${subService.slug}`}
                        className="min-w-[300px] max-w-[300px] group/card overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-2"
                      >
                        <div className="relative h-96 overflow-hidden">
                          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover/card:opacity-80" />
                          <div className="transition-transform duration-700 ease-out group-hover/card:scale-110 h-full">
                            <ServiceImage
                              src={subService.image}
                              alt={subService.title}
                              fallbackSrc={
                                fallbackImages[
                                  (serviceIndex + subServiceIndex) %
                                    fallbackImages.length
                                ]
                              }
                            />
                          </div>
                          <div className="absolute inset-x-0 bottom-0 z-20 p-6 transform transition-transform duration-500">
                            <h3 className="text-xl font-display font-medium leading-tight text-white mb-2">
                              {subService.title}
                            </h3>
                            <div className="h-0.5 w-0 bg-primary transition-all duration-500 group-hover/card:w-12" />
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}
                </FadeInStagger>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

