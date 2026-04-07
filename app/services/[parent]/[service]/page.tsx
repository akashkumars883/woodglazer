import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import ImageSlider from "@/components/ImageSlider";

import { StructuredData } from "@/components/StructuredData";
import {
  buildMetadata,
  createBreadcrumbNode,
  createSubServiceNode,
  getServiceSeoImage,
} from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { getDynamicSiteConfig } from "@/lib/site";
import type { Metadata } from "next";

type NestedServicePageProps = {
  params: Promise<{ parent: string; service: string }>;
};

export async function generateStaticParams() {
  const { data: subServices } = await supabase
    .from("sub_services")
    .select("slug, service_categories(slug)");
  
  return (subServices || []).map((sub: { slug: string; service_categories: { slug: string } | { slug: string }[] | null }) => {
    const categories = sub.service_categories;
    const parentSlug = Array.isArray(categories) 
      ? categories[0]?.slug 
      : categories?.slug;
    
    return {
      parent: parentSlug || "general",
      service: sub.slug,
    };
  });
}

export async function generateMetadata({
  params,
}: NestedServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  
  const { data: subService } = await supabase
    .from("sub_services")
    .select("*, service_categories(title, slug)")
    .eq("slug", serviceSlug)
    .single();

  if (!subService) {
    return {};
  }

  const config = await getDynamicSiteConfig();

  // Prioritize sub-service specific SEO fields
  const seoTitle = subService.seo_title || `${subService.title} | ${subService.service_categories.title}`;
  const seoDescription = subService.seo_description || subService.description;
  const seoKeywords = subService.seo_keywords && subService.seo_keywords.length > 0
    ? subService.seo_keywords
    : [subService.title, subService.service_categories.title, "Wood Glazer"];

  return buildMetadata({
    title: seoTitle,
    description: seoDescription,
    path: `/services/${subService.service_categories.slug}/${subService.slug}`,
    image: getServiceSeoImage(subService.service_categories.slug),
    keywords: seoKeywords,
  }, config);
}


export default async function NestedServicePage({
  params,
}: NestedServicePageProps) {
  const { service: serviceSlug } = await params;
  
  const { data: subService } = await supabase
    .from("sub_services")
    .select("*, service_categories(*, sub_services(*))")
    .eq("slug", serviceSlug)
    .single();

  if (!subService) {
    notFound();
  }

  const config = await getDynamicSiteConfig();
  const parentService = subService.service_categories;


  return (
    <main className="min-h-screen">
      <StructuredData
        id={`${parentService.slug}-${subService.slug}-structured-data`}
        data={[
          createBreadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            {
              name: parentService.title,
              path: `/services/${parentService.slug}`,
            },
            {
              name: subService.title,
              path: `/services/${parentService.slug}/${subService.slug}`,
            },
          ]),
          createSubServiceNode(parentService, subService, config),
        ]}
      />

      {/* Hero Header */}
      <header className="relative h-[60vh] sm:h-[70vh] min-h-[400px] flex items-center justify-center text-white overflow-hidden bg-stone-900 px-4">
        <div className="absolute inset-0 z-0">
          {subService.gallery && subService.gallery.length > 0 ? (
            <div className="absolute inset-0 z-0">
              {/* If gallery exists, we use a blurred background image and then the slider below */}
              <Image
                src={subService.image}
                alt={subService.title}
                fill
                className="object-cover opacity-20 blur-xl scale-110"
                unoptimized
              />
            </div>
          ) : (
            <>
              <Image
                src={subService.image}
                alt={subService.title}
                fill
                className="object-cover opacity-50 scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
            </>
          )}
        </div>

        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none mb-8 drop-shadow-2xl">
            {(subService.title || "").toUpperCase()}
          </h1>
          
          {subService.gallery && subService.gallery.length > 0 ? (
             <div className="w-full max-w-4xl mt-4 animate-in slide-in-from-bottom-8 duration-1000">
                <ImageSlider images={[subService.image, ...subService.gallery]} />
             </div>
          ) : (
            <p className="max-w-3xl mx-auto text-lg text-stone-300 font-medium leading-relaxed sm:text-lg drop-shadow-md">
               Professional {subService.title} provided as part of our {parentService.title} expertise.
            </p>
          )}
        </div>
      </header>


      {/* Detail Content */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Content Section */}
            <div className="space-y-10 text-center">
               <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6 leading-tight">
                    Premium <span className="text-primary italic font-serif">Solutions</span> for Your Wood
                  </h2>
                  <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-medium">
                    {subService.description}
                  </p>
               </div>

               <div className="space-y-8 max-w-3xl mx-auto">
                  <h3 className="text-xl font-bold text-secondary flex items-center justify-center gap-4 italic uppercase tracking-wider">
                    <span className="h-px w-8 sm:w-12 bg-primary" />
                    Core Benefits
                    <span className="h-px w-8 sm:w-12 bg-primary" />
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    {(subService.features || [
                      "Expert Application",
                      "Durable Protection",
                      "Refined Aesthetic",
                      "Long-Lasting Shine"
                    ]).map((benefit: string) => (
                      <li key={benefit} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <span className="text-stone-700 font-bold text-sm sm:text-base tracking-wide">{benefit}</span>
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="pt-12">
                  <Link 
                    href="/contact" 
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-primary px-12 py-6 text-lg font-bold text-white shadow-2xl shadow-primary/30 transition-all duration-300 hover:bg-secondary hover:shadow-secondary/30 hover:-translate-y-1"
                  >
                    Get a Quote for this Service
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Services */}
      <section className="py-20 sm:py-32 border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
             <h2 className="text-2xl font-bold text-secondary mb-2 italic">Similar Services</h2>
             <p className="text-stone-500 font-medium tracking-wide">Explore more specialties within {parentService.title}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(parentService.sub_services || [])
              .filter((item: { slug: string; title: string; image: string }) => item.slug !== subService.slug)
              .slice(0, 4)
              .map((item: { slug: string; title: string; image: string }) => (
                <Link
                   key={item.slug}
                   href={`/services/${parentService.slug}/${item.slug}`}
                   className="rounded-lg bg-white border border-stone-100 p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary group"
                >
                  <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-bold text-secondary group-hover:text-primary transition-colors mb-2">{item.title}</h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed italic">Expert finishing for your {item.title.toLowerCase()} needs.</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
