"use client";

import { useState } from "react";
import { saveInquiry } from "@/app/admin/actions";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type GetInTouchProps = {
  isFullWidth?: boolean;
  noHeader?: boolean;
};

export default function GetInTouch({
  isFullWidth = false,
  noHeader = false,
}: GetInTouchProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    const result = await saveInquiry(data);
    if (result.success) {
      toast.success("Message sent successfully! We will contact you soon.")
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error("Failed to send inquiry. Please try again.");
      setError(result.error || "Failed to send inquiry. Please try again.");
    }
    setLoading(false);
  };
  const content = (
    <div className={`grid ${isFullWidth ? "grid-cols-1" : "md:grid-cols-2"}`}>
      <div className="bg-stone-200 rounded-lg p-5 shadow-sm sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Get in touch form">

              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-secondary"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-md border bg-stone-100 px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition-shadow focus:border-secondary focus:shadow-[0_0_0_3px_var(--ring)]"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium text-secondary"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  className="w-full rounded-md border bg-stone-100 px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition-shadow focus:border-secondary focus:shadow-[0_0_0_3px_var(--ring)]"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="mb-1.5 block text-sm font-medium text-secondary"
                >
                  Service Needed
                </label>
                <input
                  id="service"
                  name="service"
                  type="text"
                  placeholder="e.g. Wood polishing, Carpentry"
                  className="w-full rounded-md border bg-stone-100 px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition-shadow focus:border-secondary focus:shadow-[0_0_0_3px_var(--ring)]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-secondary"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your requirement"
                  className="w-full rounded-md border bg-stone-100 px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition-shadow focus:border-secondary focus:shadow-[0_0_0_3px_var(--ring)]"
                />
              </div>

              {error && (
                <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                  {error}
                </p>
              )}

              {success ? (
                <div className="flex flex-col items-center justify-center p-6 bg-green-50 border border-green-100 rounded-xl gap-3 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                  <p className="text-sm font-bold text-green-800 text-center">
                    Inquiry sent successfully!<br/>We will contact you soon.
                  </p>
                  <button 
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="text-xs font-bold text-green-600 underline hover:no-underline mt-2"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-secondary disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Inquiry"
                  )}
                </button>
              )}
            </form>

          </div>

      {!isFullWidth && (
        <div className="p-5 sm:p-6 lg:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
            Let’s Build Better Interiors
          </p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight text-foreground sm:text-3xl lg:text-4xl">
            Tell us your requirement and our team will connect quickly.
          </h3>
          <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
            From detailed wood polishing to custom carpentry and complete
            interior finishing, we provide practical solutions built around
            your space, timeline, and budget.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-lg bg-stone-100 px-4 py-3">
              <p className="text-sm font-semibold text-secondary">
                Fast Response
              </p>
              <p className="mt-1 text-sm text-muted">
                We review every inquiry and reach out with the next steps.
              </p>
            </div>
            <div className="rounded-lg bg-stone-100 px-4 py-3">
              <p className="text-sm font-semibold text-secondary">
                Site-Friendly Planning
              </p>
              <p className="mt-1 text-sm text-muted">
                Solutions tailored to your location and project needs.
              </p>
            </div>
            <div className="rounded-lg bg-stone-100 px-4 py-3">
              <p className="text-sm font-semibold text-secondary">
                Quality Commitment
              </p>
              <p className="mt-1 text-sm text-muted">
                Durable finishes and clean detailing from start to handover.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (noHeader) {
    return content;
  }

  return (
    <section id="getintouch" className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="service-outline-title text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl">
            Get In Touch
          </h2>
        </div>
        {content}
      </div>
    </section>
  );
}
