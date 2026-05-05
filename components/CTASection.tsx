"use client";

import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CTASection() {
  const pathname = usePathname();
  const isServicesPage = pathname === "/services";

  return (
    <section className="relative overflow-hidden py-16 sm:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-secondary mb-6 tracking-tight max-w-3xl leading-[1.1]">
            Ready to{" "}
            <span className="text-secondary">Transform</span>{" "}
            Your Interior Woodwork?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            From luxury polishing to specialized carpentry, we deliver expert
            finishes that elevate the character and durability of your space.
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
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-white/20 px-8 py-4 text-base font-bold text-secondary transition-all duration-300 bg-white hover:bg-white/80 hover:border-white"
            >
              {isServicesPage ? "See More Categories" : "Explore Our Services"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

