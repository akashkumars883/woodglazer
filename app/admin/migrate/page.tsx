"use client";

import { useState } from "react";
import { migrateDataToSupabase } from "../actions/migrate";
import { Database, Layout, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function MigrationPage() {
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleMigrate = async () => {
    setStatus("running");
    setMessage("Connecting to Supabase and uploading your content... This may take a moment.");
    
    try {
      const result = await migrateDataToSupabase();
      if (result.success) {
        setStatus("success");
        setMessage("All services and blog posts have been successfully migrated to Supabase!");
      } else {
        setStatus("error");
        setMessage(result.error || "Migration failed unexpectedly.");
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      setStatus("error");
      setMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-2xl p-10 lg:p-16 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative z-10 text-center space-y-8">
           <div className="mx-auto w-24 h-24 bg-stone-100 rounded-3xl flex items-center justify-center border border-stone-200 shadow-inner">
             <Database className="w-12 h-12 text-primary" />
           </div>

           <div className="space-y-4">
             <h1 className="text-4xl lg:text-5xl font-black text-secondary tracking-tight">
               Content <span className="text-primary italic font-serif">Migration</span>
             </h1>
             <p className="text-stone-500 font-medium max-w-xl mx-auto leading-relaxed">
               Welcome to the data synchronization center. Use this tool to move your existing professional services and blog posts from static files into your live Supabase cloud database.
             </p>
           </div>

           <div className="py-8">
             {status === "idle" && (
                <button
                  onClick={handleMigrate}
                  className="group relative inline-flex items-center gap-4 bg-primary text-white px-12 py-6 rounded-full font-bold text-lg shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                   Migrate Data Now
                   <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
             )}

             {status === "running" && (
                <div className="flex flex-col items-center gap-6">
                   <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center border border-stone-100 shadow-sm relative">
                      <Loader2 className="w-10 h-10 text-primary animate-spin" />
                   </div>
                   <p className="text-stone-600 font-bold animate-pulse">{message}</p>
                </div>
             )}

             {status === "success" && (
                <div className="space-y-8">
                   <div className="flex flex-col items-center gap-6">
                      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border border-green-200 shadow-lg shadow-green-100">
                         <CheckCircle2 className="w-12 h-12 text-green-600" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-black text-green-900 leading-none">Database Synced!</p>
                        <p className="text-stone-500 font-medium">{message}</p>
                      </div>
                   </div>
                   <div className="flex items-center justify-center gap-4">
                     <Link
                       href="/admin/services"
                       className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-2xl font-bold hover:-translate-y-1 transition-transform"
                     >
                       <Layout className="w-5 h-5" />
                       View Services
                     </Link>
                     <Link
                       href="/admin/blog"
                       className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-stone-200 text-secondary rounded-2xl font-bold hover:bg-stone-50 transition-colors"
                     >
                       Manage Blog
                     </Link>
                   </div>
                </div>
             )}

             {status === "error" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="flex flex-col items-center gap-6">
                      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center border border-red-200 text-red-600 shadow-lg shadow-red-100">
                         <AlertCircle className="w-12 h-12" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-black text-red-900 leading-none">Something went wrong</p>
                        <p className="text-stone-500 font-medium">{message}</p>
                      </div>
                   </div>
                   <button
                     onClick={handleMigrate}
                     className="px-10 py-5 bg-stone-900 text-white rounded-full font-bold shadow-xl hover:bg-black transition-all"
                   >
                     Try Migration Again
                   </button>
                </div>
             )}
           </div>

           <div className="pt-8 border-t border-stone-100 flex flex-wrap items-center justify-center gap-8 opacity-40">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">Verified API Keys</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">Secure Connection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">No Data Loss</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
