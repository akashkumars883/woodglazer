"use client";

import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CTASection() {
  const pathname = usePathname();
  const isServicesPage = pathname === "/services";

  return (

    <section className="relative overflow-hidden bg-stone-200 py-16 sm:py-16">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6 tracking-tight max-w-3xl leading-[1.1]">
            Ready to <span className="text-primary italic font-serif">Transform</span> Your Interior Woodwork?
          </h2>
          <p className="text-black text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            From luxury polishing to specialized carpentry, we deliver expert finishes 
            that elevate the character and durability of your space.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-secondary group"
            >
              <PhoneCall className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12" />
              Book a Free Consultation
            </Link>
            <Link 
              href={isServicesPage ? "#services" : "/services"} 
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-white/20 px-8 py-4 text-base font-bold text-secondary transition-all duration-300 hover:bg-white/10 hover:border-white"
            >
              {isServicesPage ? "See More Categories" : "Explore Our Services"}
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
