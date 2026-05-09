import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import ImageSlider from "@/components/ImageSlider";

import { StructuredData } from "@/components/StructuredData";
import {
  buildMetadata,
  createBreadcrumbNode,
  createServiceCategoryNode,
  getServiceSeoImage,
} from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { getDynamicSiteConfig } from "@/lib/site";
import type { Metadata } from "next";


type ServicesParentPageProps = {
  params: Promise<{ parent: string }>;
};

export async function generateStaticParams() {
  const { data: services } = await supabase
    .from("service_categories")
    .select("slug");
  
  return (services || []).map((service) => ({
    parent: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicesParentPageProps): Promise<Metadata> {
  const { parent } = await params;
  
  const { data: service } = await supabase
    .from("service_categories")
    .select("*, sub_services(title)")
    .eq("slug", parent)
    .single();

  if (!service) {
    return {};
  }

  const config = await getDynamicSiteConfig();

  // Prioritize category specific SEO fields
  const seoTitle = service.seo_title || service.title;
  const seoDescription = service.seo_description || service.description;
  const seoKeywords = service.seo_keywords && service.seo_keywords.length > 0
    ? service.seo_keywords
    : [service.title, ...(service.sub_services || []).map((sub: { title: string }) => sub.title)];

  return buildMetadata({
    title: seoTitle,
    description: seoDescription,
    path: `/services/${service.slug}`,
    image: getServiceSeoImage(service.slug),
    keywords: seoKeywords,
  }, config);
}


export default async function ServicesParent({
  params,
}: ServicesParentPageProps) {
  const { parent } = await params;
  
  const { data: service } = await supabase
    .from("service_categories")
    .select("*, sub_services(*)")
    .eq("slug", parent)
    .single();

  const config = await getDynamicSiteConfig();

  if (!service) {
    notFound();
  }

  return (
    <main className=" min-h-screen">
      <StructuredData
        id={`${service.slug}-structured-data`}
        data={[
          createBreadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          createServiceCategoryNode(service, config),
        ]}
      />

      {/* Hero Header */}
      <header className="relative h-[60vh] sm:h-[70vh] min-h-[400px] flex items-center justify-center text-white overflow-hidden bg-stone-900 px-4">
        <div className="absolute inset-0 z-0">
          {service.gallery && service.gallery.length > 0 ? (
            <div className="absolute inset-0 z-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover opacity-20 blur-xl scale-110"
              />
            </div>
          ) : (
            <>
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover opacity-50 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
            </>
          )}
        </div>
        
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none mb-8 drop-shadow-2xl">
            {service.title.toUpperCase()}
          </h1>

          {service.gallery && service.gallery.length > 0 ? (
             <div className="w-full max-w-4xl mt-4 animate-in slide-in-from-bottom-8 duration-1000">
                <ImageSlider images={[service.image, ...service.gallery]} />
             </div>
          ) : (
            <p className="max-w-3xl mx-auto text-lg text-stone-300 font-medium leading-relaxed sm:text-lg drop-shadow-md">
              {service.description}
            </p>
          )}
        </div>
      </header>


      {/* Sub-Services Listing */}
      <section className="py-6 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary flex items-center gap-4">
              Our <span>Specialties</span>
              <span className="h-px flex-1 bg-stone-200 hidden sm:block" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(service.sub_services || []).map((subService : { slug: string; image: string; title: string; description: string }) => (
              <article
                key={subService.slug}
                className="group bg-white rounded-lg border border-stone-100 p-4 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-video mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={subService.image}
                    alt={subService.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                    {subService.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">
                    {subService.description}
                  </p>
                  <Link 
                    href={`/services/${service.slug}/${subService.slug}`}
                    className="inline-flex items-center text-sm font-bold text-secondary hover:text-primary transition-colors uppercase tracking-widest gap-2"
                  >
                    View Details
                    <span className="w-6 h-px bg-current group-hover:w-10 transition-all" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
