import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import { StructuredData } from "@/components/StructuredData";
import {
  buildMetadata,
  createBreadcrumbNode,
  createServicesIndexNode,
  servicesIndexDescription,
} from "@/lib/seo";
import { supabase } from "@/lib/supabase";

import { getDynamicSiteConfig } from "@/lib/site";

export async function generateMetadata() {
  const config = await getDynamicSiteConfig();
  
  return buildMetadata({
    title: "Our Wood Finishing & Carpentry Services",
    description: servicesIndexDescription,
    path: "/services",
  }, config);
}


export default async function Services() {
  const { data: categories } = await supabase
    .from("service_categories")
    .select("*, sub_services(count)")
    .order("created_at", { ascending: true });

  const services = categories || [];


  return (
    <main className="bg-stone-50 min-h-screen">
      <StructuredData
        id="services-structured-data"
        data={[
          createBreadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          createServicesIndexNode(),
        ]}
      />

      {/* Hero Header */}
      <header className="relative overflow-hidden bg-stone-900 pt-16 pb-20 sm:pt-24 sm:pb-32 text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
           <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
            Expert Craftsmanship
          </p>
          <h1 className="service-outline-title text-4xl font-bold sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-none mb-4">
             PROJECT <span className="text-primary italic opacity-100">SERVICES</span>
          </h1>
          <p className="max-w-2xl text-lg text-stone-400 font-medium leading-relaxed sm:text-xl">
             Explore our premium finishing and carpentry services, 
             dedicated to elevating timber with artisanal care and professional durability.
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20">
            {services.map((service: { title: string; slug: string; description: string; image: string; sub_services: { count: number }[] }, index: number) => (
              <article
                key={service.slug}
                className="group relative"
              >
                <div className="flex flex-col space-y-8">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl transition-all duration-500 group-hover:shadow-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/10 to-transparent" />
                    <div className="absolute bottom-6 left-8">
                       <p className="text-primary font-bold uppercase text-xs tracking-widest mb-1 italic">Category 0{index + 1}</p>
                       <h2 className="text-white text-3xl font-bold">
                         {service.title}
                       </h2>
                    </div>
                  </div>
                  
                  <div className="px-2 space-y-6">
                    <p className="text-lg leading-relaxed text-stone-600 font-medium">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <Link 
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-primary shadow-lg hover:-translate-y-0.5"
                      >
                        Explore Sub-Services
                      </Link>
                      <span className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                        {service.sub_services?.[0]?.count || 0} Specialties
                      </span>
                    </div>
                  </div>
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
