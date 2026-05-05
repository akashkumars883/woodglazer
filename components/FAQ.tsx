"use client";

const faqs = [
  {
    question: "What services does Wood Glazer provide?",
    answer:
      "We provide wood polishing, custom carpentry, and complete interior wood finishing solutions for residential and commercial projects.",
  },
  {
    question: "Do you handle both new and renovation projects?",
    answer:
      "Yes, we work on both new projects and renovation requirements, including restoring and refinishing existing wood surfaces.",
  },
  {
    question: "How soon can you start after inquiry?",
    answer:
      "After understanding your requirement, our team shares a plan and expected timeline, and we schedule the work at the earliest feasible slot.",
  },
  {
    question: "Do you offer site visits and consultation?",
    answer:
      "Yes, we offer site visits and practical consultation to suggest the right finish, scope, and execution approach for your space.",
  },
] as const;

import { FadeIn, FadeInStagger } from "./Motion";

export default function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-3">
            Common Inquiries
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-secondary">
            Questions & Answers
          </h2>
        </FadeIn>

        <FadeInStagger className="space-y-4">
          {faqs.map((faq) => (
            <FadeIn key={faq.question}>
              <details
                className="group rounded-2xl border border-stone-200 bg-stone-50/50 p-6 transition-all duration-300 open:bg-white open:shadow-xl open:border-primary/20"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-secondary">
                  <span className="pr-6 font-display">{faq.question}</span>
                  <span className="shrink-0 transition-transform duration-300 group-open:rotate-180">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-stone-100">
                  <p className="text-base leading-relaxed text-stone-600">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
