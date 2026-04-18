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
import { PhoneCall } from "lucide-react";

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
    <main className="min-h-screen bg-white">
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

      {/* Hero Header - Clean & Minimalist with background image */}
      <header className="relative h-[65vh] sm:h-[75vh] min-h-[450px] flex items-center justify-center text-white overflow-hidden bg-stone-950 px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src={subService.image}
            alt={subService.title}
            fill
            className="object-cover opacity-60 scale-105"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent z-20" />
        </div>

        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-30 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
          <h1 className="text-4xl font-extrabold py-8 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none drop-shadow-2xl">
            {subService.title.toUpperCase()}
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-stone-300 font-medium leading-relaxed sm:text-lg drop-shadow-md">
            Crafting perfection in every corner with our professional {subService.title.toLowerCase()} services.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 py-8">
            <Link href={"/contact"} className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-secondary group">
              <PhoneCall className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12" />
              Get Free Quote
            </Link>
          </div>
        </div>
      </header>


      {/* Main Content Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left Column - Description */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary leading-tight">
                  Premium <span className="text-primary italic font-serif">Solutions</span> for Your {parentService.slug === 'wallpaper-and-interior-panels' ? 'Walls' : 'Wood'}
                </h2>
                <div className="w-20 h-1.5 bg-primary rounded-full" />
                <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-medium">
                  {subService.details || subService.description}
                </p>
              </div>

              {/* Core Benefits Grid */}
              <div className="space-y-8">
                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-[0.2em]">Key Advantages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(subService.features || [
                    "Expert Application",
                    "Durable Protection",
                    "Refined Aesthetic",
                    "Long-Lasting Shine"
                  ]).map((benefit: string) => (
                    <div key={benefit} className="flex items-center gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white group">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <svg className="w-5 h-5 text-primary group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-stone-800 font-bold text-base tracking-wide">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Side CTA / Quote Wrapper */}
            <div className="hidden xl:block lg:col-span-5 sticky top-32">
              <div className="p-10 bg-secondary rounded-3xl text-white shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-8">
                  <h3 className="text-3xl font-bold">Ready to <span className="text-primary italic font-serif">Transform</span> Your Space?</h3>
                  <p className="text-stone-300 font-medium">Get expert consultation and a personalized quote for your project today.</p>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-primary py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-secondary hover:shadow-2xl"
                  >
                    Request a Free Quote
                  </Link>
                  <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" /></svg>
                    </div>
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-widest leading-none">Trusted by 500+ Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Gallery Section - Only if images exist */}
      {subService.gallery && subService.gallery.length > 0 && (
        <section className="py-20 sm:py-32 bg-stone-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="space-y-4">
                <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Project Showcase</p>
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight">Our Recent <span className="text-primary italic font-serif">Work</span></h2>
              </div>
              <p className="text-stone-400 max-w-sm text-sm font-medium leading-relaxed">
                Every project is handled with precision and care, ensuring a flawless finish that speaks for itself.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-3xl">
              <ImageSlider images={[subService.image, ...subService.gallery]} />
            </div>
          </div>
        </section>
      )}


      {/* Mobile CTA Button (Visible on mobile instead of the side card) */}
      <div className="xl:hidden px-4 pb-20">
        <Link
          href="/contact"
          className="flex w-full items-center justify-center rounded-2xl bg-primary py-6 text-xl font-bold text-white shadow-2xl transition-all duration-300"
        >
          Get a Quote for this Service
        </Link>
      </div>


      {/* Suggested Services */}
      <section className="py-20 sm:py-32 border-t border-stone-100 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-secondary italic">Similar Services</h2>
              <p className="text-stone-500 font-medium tracking-wide">Explore more specialties within {parentService.title}</p>
            </div>
            <Link href={`/services/${parentService.slug}`} className="text-primary font-bold text-sm uppercase tracking-widest hover:underline hidden sm:block">View All</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(parentService.sub_services || [])
              .filter((item: { slug: string; title: string; image: string }) => item.slug !== subService.slug)
              .slice(0, 4)
              .map((item: { slug: string; title: string; image: string }) => (
                <Link
                  key={item.slug}
                  href={`/services/${parentService.slug}/${item.slug}`}
                  className="rounded-3xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-secondary group-hover:text-primary transition-colors mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed italic mb-4">Expert finishing for your {item.title.toLowerCase()} needs.</p>
                  <div className="mt-auto pt-4 border-t border-stone-50 flex items-center text-primary font-bold text-xs uppercase tracking-widest">
                    Learn More
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
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
