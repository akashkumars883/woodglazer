"use client";

import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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
    <section id="services" className="py-8 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
            Our Services
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((service, serviceIndex) => (
            <article
              key={service.slug}
              id={service.slug}
              className="group space-y-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="service-outline-title text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl">
                  {service.title}
                </h2>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-secondary px-5 py-2.5 text-sm font-semibold text-secondary transition-colors duration-200 hover:bg-secondary hover:text-secondary-foreground sm:shrink-0"
                >
                  View All Service
                </Link>
              </div>

              <div
                className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label={`${service.title} sub-services`}
              >
                {(service.sub_services || []).map((subService: SubService, subServiceIndex: number) => (
                  <Link
                    key={subService.slug}
                    href={`/services/${service.slug}/${subService.slug}`}
                    className="min-w-[270px] max-w-[270px] overflow-hidden rounded-lg border bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-84">
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
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.18)_52%,rgba(0,0,0,0.7)_100%)]" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h3 className="text-lg font-semibold leading-snug text-white">
                          {subService.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

