import Link from "next/link";
import { ArrowLeft, Hammer } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-stone-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Dynamic ambient light leaks in the background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative max-w-xl w-full text-center px-6 py-16 sm:px-12 sm:py-20 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
        {/* Border glow shine */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Brand visual icon */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary border border-primary/20 mb-10 shadow-lg shadow-primary/10 animate-bounce">
          <Hammer className="w-10 h-10" />
        </div>

        {/* Error code */}
        <p className="text-sm font-black tracking-[0.25em] text-primary uppercase mb-3">
          Error 404
        </p>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight font-display tracking-tight">
          This Surface is Still Raw & Unfinished
        </h1>

        {/* Message description */}
        <p className="text-stone-400 text-base sm:text-lg mb-10 leading-relaxed font-medium">
          The page you are looking for has been polished away, renamed, or is currently undergoing carpentry work.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:bg-primary-dark hover:scale-[1.03] active:scale-95 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Safety
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 text-stone-300 font-bold text-sm hover:bg-white/10 hover:text-white hover:scale-[1.03] active:scale-95 transition-all duration-300"
          >
            Report an Issue
          </Link>
        </div>
      </div>
    </main>
  );
}
