import GetInTouch from "@/components/GetInTouch";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { FadeIn, FadeInStagger } from "@/components/Motion";
import PageHero from "@/components/PageHero";

export const metadata = buildMetadata({
  title: "Contact Us | Wood Glazer Professional Wood Finishing",
  description:
    "Get in touch with Wood Glazer for premium wood polishing, carpentry, and interior finishing services in Delhi NCR. Request a quote or site visit today.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title="Let's Start a Masterpiece"
        backgroundImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80"
      />

      {/* Main Content */}
      <section className="py-24 sm:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5">
               <FadeInStagger className="space-y-12">
                  <FadeIn>
                    <h2 className="text-4xl font-display font-medium text-secondary mb-6">Get In Touch</h2>
                    <p className="text-stone-500 font-medium max-w-md leading-relaxed text-lg">Reach out to us via any of these channels. Our team typically responds within 24 business hours.</p>
                  </FadeIn>

                  <div className="grid gap-6">
                    {[
                      { icon: Phone, title: "Call Us", details: ["+91 9717048359"], color: "bg-primary/5 text-primary" },
                      { icon: Mail, title: "Email Us", details: ["woodglazer@gmail.com"], color: "bg-primary/5 text-primary" },
                      { icon: MapPin, title: "Visit Us", details: ["B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010"], color: "bg-primary/5 text-primary" },
                      { icon: Clock, title: "Business Hours", details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: By Appointment"], color: "bg-primary/5 text-primary" }
                    ].map((item) => (
                      <FadeIn key={item.title}>
                        <div className="flex gap-8 p-8 bg-stone-50 rounded-3xl border border-stone-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:border-primary/20 group">
                           <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${item.color} transition-transform group-hover:scale-110`}>
                              <item.icon className="w-7 h-7" />
                           </div>
                           <div>
                              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-3">{item.title}</h3>
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
                       <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Direct Inquiry</span>
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

      {/* Map Section */}
      <section className="pb-24 sm:pb-40 px-4 sm:px-6 lg:px-8">
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
                  <p className="text-stone-300 font-medium">Serving Faridabad, Delhi, Noida, Gurgaon, and beyond.</p>
               </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
