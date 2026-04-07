import GetInTouch from "@/components/GetInTouch";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us | Wood Glazer Professional Wood Finishing",
  description:
    "Get in touch with Wood Glazer for premium wood polishing, carpentry, and interior finishing services in Delhi NCR. Request a quote or site visit today.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-32 sm:pb-24 overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <p className="text-primary font-bold uppercase tracking-[0.4em] text-xs sm:text-sm mb-4">
            Connect With Us
          </p>
          <h1 className="service-outline-title text-5xl font-bold sm:text-7xl md:text-8xl lg:text-9xl leading-none">
            CONTACT US
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-stone-400 font-medium leading-relaxed sm:text-xl">
            Have a project in mind? We&apos;re ready to bring your wood surfaces to life with expert craftsmanship and premium finishes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-8">
               <div className="mb-12">
                  <h2 className="text-3xl font-bold text-secondary mb-4 italic">Get In Touch</h2>
                  <p className="text-stone-500 font-medium max-w-md">Reach out to us via any of these channels. Our team typically responds within 24 business hours.</p>
               </div>

               <div className="grid gap-6">
                  {[
                    { icon: Phone, title: "Call Us", details: ["+91-9717256514"], color: "bg-orange-50 text-orange-600" },
                    { icon: Mail, title: "Email Us", details: ["woodglazer@gmail.com"], color: "bg-blue-50 text-blue-600" },
                    { icon: MapPin, title: "Visit Us", details: ["B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010"], color: "bg-green-50 text-green-600" },
                    { icon: Clock, title: "Business Hours", details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: By Appointment"], color: "bg-purple-50 text-purple-600" }
                  ].map((item) => (
                    <div key={item.title} className="flex gap-6 p-8 bg-white rounded-lg border border-stone-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 group">
                       <div className={`w-14 h-14 rounded-lg flex items-center justify-center shrink-0 ${item.color} transition-transform group-hover:scale-110`}>
                          <item.icon className="w-6 h-6" />
                       </div>
                       <div>
                          <h3 className="text-lg font-bold text-secondary mb-2 uppercase tracking-wider">{item.title}</h3>
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-stone-600 font-medium">{detail}</p>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7">
               <div className="bg-white rounded-lg border border-stone-200 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 rounded-bl-[5rem] -mr-16 -mt-16 z-0" />
                  
                  <div className="relative z-10 mb-10">
                     <span className="text-primary font-bold uppercase tracking-widest text-xs">Direct Inquiry</span>
                     <h3 className="text-3xl font-bold text-secondary mt-2">Send a Message</h3>
                  </div>
                  
                  <div className="relative z-10">
                    <GetInTouch isFullWidth={true} noHeader={true} />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-lg shadow-2xl relative group">
          <div className="absolute inset-0 bg-secondary/10 group-hover:bg-secondary/5 transition-colors duration-500 z-10 pointer-events-none" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112334.2353118231!2d77.16641887349184!3d28.375620948956968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdc15f5a14643%3A0xc331713437f191b6!2sFaridabad%2C%20Haryana!5e0!3m2!1sen!2sin!4v1712130000000!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-700 contrast-125"
          ></iframe>
          
          <div className="absolute bottom-8 left-8 right-8 z-20 md:w-fit">
             <div className="bg-stone-900/90 backdrop-blur-md p-6 rounded-2xl text-white shadow-xl border border-white/10">
                <h4 className="font-bold text-lg mb-1">Our Service Hub</h4>
                <p className="text-stone-300 text-sm">Serving Faridabad, Delhi, Noida, Gurgaon, and beyond.</p>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
