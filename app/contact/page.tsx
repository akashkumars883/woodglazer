import GetInTouch from "@/components/GetInTouch";
import { Mail, MapPin, Phone, Clock, FileText, Map, Hammer, CheckCircle } from "lucide-react";
import FAQ from "@/components/FAQ";
import { buildMetadata } from "@/lib/seo";
import { FadeIn, FadeInStagger } from "@/components/Motion";
import PageHero from "@/components/PageHero";

export const metadata = buildMetadata({
  title: "Contact Wood Glazer | Free Consultation for Wood Polishing & Carpentry in Delhi NCR",
  description: "Get in touch with Wood Glazer for a free consultation on wood polishing, carpentry, and interior panel services in Delhi, Faridabad, Gurugram & Noida. Call +91 9717048359 today.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title="Contact Wood Glazer"
        subtitle="Let's Build Better Interiors Together"
        description="Ready to transform your wooden surfaces and interiors? We would love to hear about your project. Whether you have a clear brief or just an idea, our team is here to listen, advise, and propose the most practical and beautiful solution for your space."
        backgroundImage="/images/contact-hero.png"
      />

      {/* Main Content */}
      <section className="py-24 sm:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5">
               <FadeInStagger className="space-y-12">
                  <FadeIn>
                    <h2 className="text-4xl sm:text-5xl font-display font-medium text-secondary mb-6">Get In Touch</h2>
                    <p className="text-stone-500 font-medium max-w-md leading-relaxed text-lg">
                      Getting in touch with Wood Glazer is simple. We respond promptly to every inquiry and make the entire process — from first contact to project completion — as smooth and transparent as possible.
                    </p>
                  </FadeIn>

                  <div className="grid gap-6">
                    {[
                      { icon: Phone, title: "Phone & WhatsApp", details: ["+91 9717048359"], color: "bg-primary/5 text-primary" },
                      { icon: Mail, title: "Email Address", details: ["woodglazer@gmail.com"], color: "bg-primary/5 text-primary" },
                      { icon: MapPin, title: "Office Address", details: ["B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010"], color: "bg-primary/5 text-primary" },
                      { icon: Clock, title: "Business Hours", details: ["Monday to Saturday", "9:00 AM to 7:00 PM"], color: "bg-primary/5 text-primary" }
                    ].map((item) => (
                      <FadeIn key={item.title}>
                        <div className="flex gap-8 p-8 bg-stone-50 rounded-3xl border border-stone-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:border-primary/20 group">
                           <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${item.color} transition-transform group-hover:scale-110`}>
                              <item.icon className="w-7 h-7" />
                           </div>
                           <div>
                              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">{item.title}</h3>
                              {item.details.map((detail, idx) => (
                                <p key={idx} className="text-xl font-display text-secondary font-medium">{detail}</p>
                              ))}
                           </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
               </FadeInStagger>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7">
               <FadeIn direction="right">
                  <div className="bg-white rounded-[2.5rem] border border-stone-200 p-10 sm:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-stone-50 rounded-bl-[8rem] -mr-24 -mt-24 z-0" />
                    
                    <div className="relative z-10 mb-12 text-center sm:text-left">
                       <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Direct Inquiry</span>
                       <h3 className="text-4xl font-display font-medium text-secondary mt-4">Send a Message</h3>
                    </div>
                    
                    <div className="relative z-10">
                      <GetInTouch isFullWidth={true} noHeader={true} />
                    </div>
                  </div>
               </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect When You Reach Out */}
      <section className="py-24 sm:py-32 bg-stone-100 border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3 block">Process Workflow</span>
            <h2 className="text-4xl sm:text-5xl font-display font-medium text-secondary">What to Expect When You Reach Out</h2>
            <p className="text-stone-500 mt-6 font-medium max-w-2xl mx-auto text-lg">We follow a structured 7-step process to ensure clear, honest, and smooth communication from inquiry to project handover.</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "Step 1", title: "Submit Inquiry", desc: "Submit your inquiry via phone, WhatsApp, or the contact form on our website." },
              { step: "Step 2", title: "Prompt Response", desc: "One of our team members will contact you promptly — typically within a few hours on working days." },
              { step: "Step 3", title: "Discussion", desc: "We discuss your requirements, timeline, and space in detail." },
              { step: "Step 4", title: "Site Assessment", desc: "If required, we arrange a site visit to assess the space, take measurements, and provide a precise quotation." },
              { step: "Step 5", title: "Transparent Quote", desc: "We share a clear, itemised quotation with no hidden charges." },
              { step: "Step 6", title: "Work Scheduling", desc: "Upon approval, we schedule the work and assign your dedicated project team." },
              { step: "Step 7", title: "Perfect Handover", desc: "We execute the project, keep you updated throughout, and hand over a quality-checked finished space." }
            ].map((item, i) => (
              <FadeIn key={item.step} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all relative group flex flex-col justify-between">
                 <div>
                   <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">{item.step}</span>
                   <h3 className="text-xl font-display font-semibold text-secondary mb-3">{item.title}</h3>
                   <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                 </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Serving Clients Across Delhi NCR */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3 block">Service Locations</span>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-secondary mb-6">Serving Clients Across Delhi NCR</h2>
            <p className="text-lg text-stone-600 leading-relaxed font-medium max-w-2xl mx-auto mb-8">
              Our team is based in Faridabad and regularly works across the entire Delhi NCR region — including South Delhi, West Delhi, East Delhi, North Delhi, Gurugram, DLF areas, Noida, Greater Noida, Ghaziabad, Indirapuram, and surrounding localities. Contact us to confirm service availability for your specific location.
            </p>
          </FadeIn>
        </div>
      </section>

      <FAQ />

      {/* Map Section */}
      <section className="py-24 sm:py-40 px-4 sm:px-6 lg:px-8 bg-stone-50 border-t border-stone-200">
        <FadeIn>
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] shadow-2xl relative group h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112334.2353118231!2d77.16641887349184!3d28.375620948956968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdc15f5a14643%3A0xc331713437f191b6!2sFaridabad%2C%20Haryana!5e0!3m2!1sen!2sin!4v1712130000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-1000 contrast-125 scale-110 group-hover:scale-100"
            ></iframe>
            
            <div className="absolute bottom-12 left-12 right-12 z-20 md:w-fit">
               <div className="bg-stone-900/90 backdrop-blur-2xl p-8 rounded-3xl text-white shadow-2xl border border-white/10">
                  <h4 className="font-display text-2xl mb-2">Our Service Hub</h4>
                  <p className="text-stone-300 font-medium">B-474, Basement, Greenfield Colony, Faridabad, Haryana</p>
               </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
