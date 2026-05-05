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
import { FadeIn, FadeInStagger } from "@/components/Motion";
import PageHero from "@/components/PageHero";

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
    <main className="bg-white min-h-screen">
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

      <PageHero
        title="Our Mastery"
        subtitle="Professional Expertise"
        description="Explore our premium finishing and carpentry services, dedicated to elevating timber with artisanal care and professional durability."
        backgroundImage="https://images.unsplash.com/photo-1622737133809-d9566300263f?auto=format&fit=crop&q=80"
      />

      {/* Services Grid */}
      <section className="py-24 sm:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32">
            {services.map((service: any, index: number) => (
              <FadeIn key={service.slug} direction={index % 2 === 0 ? "left" : "right"}>
                <article className="group relative">
                  <div className="flex flex-col space-y-10">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-2xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute bottom-10 left-10">
                         <p className="text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-3 italic">Category 0{index + 1}</p>
                         <h2 className="text-white text-4xl font-display font-medium">
                           {service.title}
                         </h2>
                      </div>
                    </div>
                    
                    <div className="px-4 space-y-8">
                      <p className="text-lg leading-relaxed text-stone-600 font-medium">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Link 
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center justify-center rounded-2xl bg-secondary px-10 py-5 text-sm font-bold text-white transition-all duration-300 hover:bg-primary shadow-xl hover:-translate-y-1"
                        >
                          View Specialties
                        </Link>
                        <span className="text-stone-300 font-black uppercase text-[10px] tracking-[0.3em]">
                          {service.sub_services?.[0]?.count || 0} Expertise Areas
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
