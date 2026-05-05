import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/Motion";
import PageHero from "@/components/PageHero";

export const metadata = buildMetadata({
  title: "Privacy Policy | Wood Glazer",
  description: "Learn how Wood Glazer collects, uses, and protects your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicy() {
  return (
    <main className="bg-white">
      <PageHero
        title="Privacy Policy"
        backgroundImage="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80"
      />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-secondary mb-12">Privacy Policy</h1>
          
          <div className="prose prose-stone max-w-none space-y-8 text-stone-600 font-medium leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">Introduction</h2>
              <p>
                At Wood Glazer, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">The Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> Includes first name, last name.</li>
                <li><strong>Contact Data:</strong> Includes email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide quotes and consultation for our wood polishing and carpentry services.</li>
                <li>To contact you regarding your inquiries.</li>
                <li>To improve our website performance and user experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at: <strong>woodglazer@gmail.com</strong>
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
      </div>
    </main>
  );
}
