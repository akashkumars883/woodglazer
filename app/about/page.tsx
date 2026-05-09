import Image from "next/image";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { buildMetadata } from "@/lib/seo";
import { FadeIn, FadeInStagger } from "@/components/Motion";
import PageHero from "@/components/PageHero";

export const metadata = buildMetadata({
  title: "About Wood Glazer - Excellence in Wood Craftsmanship",
  description: "Learn about Wood Glazer's heritage, commitment to quality, and expert wood finishing and carpentry services in Delhi NCR.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="bg-white">
      <PageHero
        title="Crafting Timeless Heritage"
        backgroundImage="https://images.unsplash.com/photo-1520032484190-e5ef81d87978?auto=format&fit=crop&q=80"
      />

      {/* Heritage & Innovation */}
      <section className="py-24 sm:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <FadeIn direction="left" className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
              <Image
                src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80"
                alt="Wood Glazer Craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-5xl font-display">Mastering the Grain</p>
              </div>
            </FadeIn>
            
            <FadeInStagger className="space-y-10">
              <FadeIn>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">
                  Our Philosophy
                </p>
                <h2 className="text-4xl sm:text-5xl font-display font-medium text-secondary leading-tight">
                  Where Nature Meets <br /> <span className="text-primary">Artistic Precision</span>
                </h2>
              </FadeIn>
              
              <FadeIn>
                <p className="text-lg text-stone-600 leading-relaxed font-medium">
                  At Wood Glazer, we don&apos;t just &quot;polish&quot; wood; we restore its soul. Every knot, grain, and texture tells a story, and our mission is to bring that story to life with unmatched brilliance. <br /> Wherther it&apos;s a centuries-old heirloom passed down through generations or a modern architectural masterpice, our team of master craftmen treats every surface with the reverence it deserves. We bridge the gap between raw natural beauty and refined luxury.&apos;<br />
                </p>
              </FadeIn>

              <FadeIn className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                <div className="space-y-4">
                  <div className="w-12 h-px bg-primary" />
                  <h3 className="text-xl font-display font-bold text-secondary">Premium Sourcing</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">We utilize exclusively high-grade PU, Melamine, and Duco finishes from globally renowned brands.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-px bg-primary" />
                  <h3 className="text-xl font-display font-bold text-secondary">Sustainable Ethics</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">Our processes prioritize eco-friendly coatings that protect both your home and the environment.</p>
                </div>
              </FadeIn>
            </FadeInStagger>
          </div>
        </div>
      </section>

      {/* Stats/Metrics */}
      <section className=" py-24 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Projects Completed", value: "500+" },
              { label: "Expert Craftsmen", value: "25+" },
              { label: "Years Experience", value: "15+" },
              { label: "Happy Clients", value: "100%" },
            ].map((stat) => (
              <FadeIn key={stat.label} className="space-y-2">
                <p className="text-4xl sm:text-5xl font-display text-primary">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">{stat.label}</p>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <WhyChooseUs />

      {/* Why We Are Different */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-medium text-secondary mb-6">
              Why We Are <span className="text-primary italic">Different</span>
            </h2>
            <p className="text-lg text-stone-600 font-medium">
              We go beyond standard painting and polishing. Our approach combines traditional artisanal methods with modern technology to deliver a finish that is truly unmatched.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Artisanal Craftsmanship",
                desc: "Every project is handled by master artisans who understand the unique character of different wood species, ensuring the natural grain is enhanced, not hidden.",
              },
              {
                title: "Advanced Technology",
                desc: "We use dust-free sanding machines, premium European spray guns, and climate-controlled curing processes to achieve a flawless, glass-like finish.",
              },
              {
                title: "Tailored Solutions",
                desc: "No two pieces of wood are the same. We customize our polishing compounds, stains, and application techniques specifically for each project's requirements.",
              }
            ].map((feature, i) => (
              <FadeIn key={i} className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mb-6 text-primary font-display text-xl font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-display font-bold text-secondary mb-4">{feature.title}</h3>
                <p className="text-stone-500 leading-relaxed text-sm">{feature.desc}</p>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Vision & Mission - Reimagined */}
      <section className="py-24 sm:py-40 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            <FadeIn className="space-y-8">
              <h3 className="text-3xl font-display font-medium text-secondary flex items-center gap-4">
                <span className="text-primary italic">01.</span> Our Vision
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed font-medium border-l-2 border-primary/20 pl-8">
                To redefine the standards of luxury interior finishing in India, becoming the most trusted name for discerning clients who value perfection in every grain.
              </p>
            </FadeIn>
            <FadeIn className="space-y-8">
              <h3 className="text-3xl font-display font-medium text-secondary flex items-center gap-4">
                <span className="text-primary italic">02.</span> Our Mission
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed font-medium border-l-2 border-primary/20 pl-8">
                To blend heritage craftsmanship with modern technological advancements, delivering wooden surfaces that are not just beautiful, but built to last for generations.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <Testimonials />

      <CTASection />
    </main>
  );
}
