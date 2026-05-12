"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type CategoryFaqProps = {
  slug: string;
};

const faqsData: Record<string, FAQItem[]> = {
  "wood-polishing-services": [
    {
      question: "Which wood polish is highly durable for main doors and furniture?",
      answer: "Polyester (lamination/piano finish) is the absolute gold standard for durability and scratch-resistance. For high-use internal furniture, PU (Polyurethane) polish offers outstanding UV-stability, water protection, and non-yellowing durability."
    },
    {
      question: "What is the main difference between PU polish and Melamine polish?",
      answer: "PU (Polyurethane) polish is a two-component finish that forms a highly flexible, thick, UV-stable, and chemically resistant layer, making it ideal for outdoor doors and luxury furniture. Melamine is a single-component, budget-friendly spirit polish that forms a thin, beautiful satin sheen but has lower UV and moisture resistance."
    },
    {
      question: "Can old, damaged wooden furniture be completely re-polished?",
      answer: "Absolutely! Our team specializes in furniture restoration. We completely strip off old cracked varnishes, repair wooden dents with special timber epoxy, sand it to a raw layer, apply grain-fillers, and polish it with your choice of Melamine, PU, or Duco to make it look brand new."
    },
    {
      question: "How long does a typical professional wood polishing project take?",
      answer: "A standard polishing project (like a dining table or 3-4 internal doors) typically takes between 5 to 10 days. This duration is crucial because premium finishes (especially PU and Polyester) require precise sanding and adequate curing time between multiple chemical coats to achieve that flawless mirror shine."
    }
  ],
  "carpentry-services": [
    {
      question: "Do you charge any fees for home visits or site measurements in Delhi NCR?",
      answer: "No, we do not charge anything for home visits or site measurements. Our specialists will visit your home, villa, or office in Faridabad, Delhi, Gurugram, or Noida absolutely free of cost to take measurements and discuss your requirements."
    },
    {
      question: "Do you provide custom modular designs for wardrobes and kitchens?",
      answer: "Yes! Everything we build is 100% custom-tailored to your room size, theme, and utility preferences. We design modular wardrobes with soft-close tandem drawers, profile-light slots, trouser racks, and modular kitchens utilizing waterproof commercial plywood."
    },
    {
      question: "What type of wood and materials do you recommend for home furniture?",
      answer: "For premium external doors and frames, we recommend seasoned Teak wood (Sagan). For modular closets and kitchen bodies, we utilize commercial-grade waterproof BWP plywood paired with laminates or HDHMR (High-Density High-Moisture Resistance) boards to prevent dampness."
    },
    {
      question: "How do you calculate your custom carpentry charges?",
      answer: "Our pricing model is highly transparent and calculated either on a square-footage basis (for closets, paneling, and kitchens) or on a lump-sum item basis (for bespoke tables, main doors, and repairs). We provide a detailed itemized estimate beforehand with zero hidden charges."
    }
  ],
  "wallpaper-and-interior-panels": [
    {
      question: "Are PVC panels suitable for damp kitchen or bathroom walls?",
      answer: "Yes, PVC panels are 100% waterproof, termite-proof, and moisture-resistant. They are the ideal, low-cost solution to cover damp wall surfaces where paint peeling is a constant issue, especially in kitchens and bathroom borders."
    },
    {
      question: "Can fluted panels be installed over painted plaster or brick walls?",
      answer: "Yes! Fluted panels can be securely mounted over any flat surface — including painted plaster, drywall, brick walls, and old plywood framing — using industrial-grade silicone adhesives and concealed panel pins for seamless grip."
    },
    {
      question: "How long does a standard wallpaper installation project take?",
      answer: "Our professional wallpaper hanger crew can complete a single standard accent feature wall (approx 10ft x 10ft) in just 3 to 5 hours, including wallpaper adhesive pasting, matching pattern repeats, and clean border cutting."
    },
    {
      question: "What is the general life expectancy of charcoal-composite wall panels?",
      answer: "Premium charcoal-composite panels are highly durable, UV-resistant, and structural. They easily last over 10 to 15 years in dry indoor conditions. They require zero maintenance beyond a simple wipe with a dry microfiber cloth."
    }
  ]
};

export default function CategoryFaq({ slug }: CategoryFaqProps) {
  const faqs = faqsData[slug] || [];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div 
            key={idx}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 font-display font-semibold text-stone-900 hover:text-primary transition-colors focus:outline-none"
            >
              <span className="flex items-center gap-3 text-base sm:text-lg">
                <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                {faq.question}
              </span>
              <ChevronDown className={`h-5 w-5 text-stone-400 shrink-0 mt-1 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[300px] opacity-100 border-t border-stone-100" : "max-h-0 opacity-0 pointer-events-none"
              }`}
            >
              <p className="p-6 text-stone-600 leading-relaxed text-sm sm:text-base font-medium">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
