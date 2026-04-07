import Image from "next/image";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Wood Glazer - Excellence in Wood Craftsmanship",
  description: "Learn about Wood Glazer's heritage, commitment to quality, and expert wood finishing and carpentry services in Delhi NCR.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted mb-4">
              Our Story
            </p>
            <h1 className="service-outline-title text-4xl font-bold sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-8">
              ABOUT <span className="text-secondary opacity-100">WOOD GLAZER</span>
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
              We are dedicated to the art of wood preservation and enhancement. 
              With decades of experience in premium polishing and custom carpentry, 
              we bring timeless quality and modern precision to every project.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-2xl">
              <Image
                src="/images/hero-image1.png"
                alt="Wood Glazer Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="mb-4">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted mb-2">
                  Our Philosophy
                </p>
                <h2 className="text-3xl font-bold text-secondary sm:text-4xl">
                  Crafting <span className="text-primary italic font-serif">Excellence</span> in Every Grain
                </h2>
              </div>
              <p className="text-lg text-foreground/72 leading-relaxed">
                At Wood Glazer, we believe that wood is a living material that reflects the character of a space. 
                Our approach combines traditional hand-polishing techniques with the latest in protective coatings (PU, Duco, Melamine) 
                to ensure durability without compromising the natural beauty.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 transition-hover duration-300 hover:shadow-md">
                   <h3 className="text-primary font-bold text-lg mb-2">Quality First</h3>
                   <p className="text-sm text-stone-500">We source only the finest materials and use industry-leading finishing products.</p>
                </div>
                <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 transition-hover duration-300 hover:shadow-md">
                   <h3 className="text-primary font-bold text-lg mb-2">Precision Care</h3>
                   <p className="text-sm text-stone-500">Every corner and grain is meticulously treated to achieve a flawless finish.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Vision/Mission Section */}
      <section className="py-20 sm:py-32 bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-6">Our Vision</h3>
              <p className="text-lg text-stone-400 leading-relaxed">
                To be the leading name in specialty wood finishing and carpentry in India, 
                set recognized by our commitment to sustainability, innovation, and unparalleled craftsmanship.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-6">Our Mission</h3>
              <p className="text-lg text-stone-400 leading-relaxed">
                To transform ordinary wooden structures into extraordinary pieces of art 
                while providing our clients with durable, aesthetically superior, and value-driven results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
