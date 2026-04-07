"use client";

import { useState } from "react";
import { Database, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { seedDatabase } from "../../actions";

export default function SeedingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSeed = async () => {
    if (!window.confirm("This will populate your database with initial service data. Continue?")) return;

    setStatus("loading");
    try {
      const result = await seedDatabase();
      if (result.success) {
        setStatus("success");
        setMessage("Database seeded successfully! Your services are now live.");
      } else {
        setStatus("error");
        setMessage(result.error || "An unexpected error occurred.");
      }
      } catch (err: unknown) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Failed to connect to the server.");
      }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-10">
      <div className="space-y-4">
         <Link 
           href="/admin/services"
           className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
         >
           <ArrowLeft className="w-4 h-4" />
           Back to Services
         </Link>
         <h1 className="text-4xl font-black text-secondary tracking-tight">Database Seeder</h1>
         <p className="text-stone-500 font-medium text-lg leading-relaxed">
           Use this utility to populate your Supabase database with the initial categories and 
           sub-services from your local configuration.
         </p>
      </div>

      <div className="bg-white rounded-[2rem] border border-stone-200 p-10 shadow-sm space-y-8">
        <div className="flex items-center justify-center p-12 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
           {status === "idle" && <Database className="w-20 h-20 text-stone-300" />}
           {status === "loading" && <Loader2 className="w-20 h-20 text-primary animate-spin" />}
           {status === "success" && <CheckCircle2 className="w-20 h-20 text-green-500" />}
           {status === "error" && <AlertCircle className="w-20 h-20 text-red-500" />}
        </div>

        <div className="space-y-6 text-center">
          {status === "idle" && (
            <>
              <p className="text-stone-600 font-medium">
                Ready to sync your <span className="text-primary font-bold">lib/servicesData.ts</span> file 
                to your production database?
              </p>
              <button
                onClick={handleSeed}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
              >
                Start Seeding Now
              </button>
            </>
          )}

          {status === "loading" && (
            <p className="text-primary font-bold animate-pulse">Syncing services to Supabase...</p>
          )}

          {status === "success" && (
            <div className="space-y-6">
              <p className="text-green-600 font-bold text-lg">{message}</p>
              <Link
                href="/admin/services"
                className="inline-block bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
              >
                Go to Service Management
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-6">
              <p className="text-red-500 font-bold">{message}</p>
              <button
                onClick={() => setStatus("idle")}
                className="text-stone-500 font-bold hover:underline"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl">
         <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-orange-500 shrink-0" />
            <div>
               <p className="text-orange-900 font-bold text-sm mb-1 uppercase tracking-wider">Before you proceed</p>
                <p className="text-orange-700 text-sm leading-relaxed">
                   This tool will check for existing categories by slug to avoid duplicates. 
                   However, it&apos;s recommended to run this on a clean database for the best results.
                </p>
            </div>
         </div>
      </div>
    </div>
  );
}
