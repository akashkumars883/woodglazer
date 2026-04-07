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

export default function FAQ() {
  return (
    <section id="faq" className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="service-outline-title text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl">
            FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-lg border bg-white p-4 sm:p-5"
            >
              <summary className="cursor-pointer list-none pr-6 text-base font-semibold text-secondary marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
