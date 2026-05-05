import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/Motion";
import PageHero from "@/components/PageHero";

export const metadata = buildMetadata({
  title: "Terms of Service | Wood Glazer",
  description: "Read the terms and conditions for using Wood Glazer services.",
  path: "/terms-of-service",
});

export default function TermsOfService() {
  return (
    <main className="bg-white">
      <PageHero
        title="Terms of Service"
        backgroundImage="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80"
      />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-secondary mb-12">Terms of Service</h1>
          
          <div className="prose prose-stone max-w-none space-y-8 text-stone-600 font-medium leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">2. Services Provided</h2>
              <p>
                Wood Glazer provides professional wood polishing, PU coating, Duco finishing, and custom carpentry services. All services are subject to a formal agreement and site inspection.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">3. Quoting and Estimates</h2>
              <p>
                All quotes provided via the website or phone are preliminary estimates. Final pricing is determined only after a physical site visit and detailed assessment of the wood condition and requirement scope.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">4. Intellectual Property</h2>
              <p>
                All content on this website, including images of our work, logos, and text, is the property of Wood Glazer and may not be used without prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">5. Limitation of Liability</h2>
              <p>
                Wood Glazer shall not be held liable for any indirect, incidental, or consequential damages arising out of the use of our services or the information on this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">6. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Faridabad/Delhi.
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
      </div>
    </main>
  );
}
