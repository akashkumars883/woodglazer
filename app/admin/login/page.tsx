"use client";

import { useState } from "react";
import { loginAdmin } from "../actions";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, Loader2, Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await loginAdmin(password);
      if (result.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err: unknown) {
      console.error("Login fatal error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-2xl shadow-stone-200/50 overflow-hidden transform transition-all duration-500 hover:scale-[1.01]">
          {/* Top Branding Section */}
          <div className="pt-12 pb-8 px-10 text-center space-y-4">
             <div className="w-20 h-20 bg-stone-900 rounded-[2rem] mx-auto flex items-center justify-center text-white shadow-xl rotate-3 transform hover:rotate-0 transition-transform duration-500 shadow-stone-900/20">
                <Lock className="w-10 h-10" />
             </div>
             <div>
                <h1 className="text-3xl font-black text-secondary tracking-tight">Admin <span className="text-primary italic font-serif">Gate</span></h1>
                <p className="text-stone-400 font-medium tracking-tight text-sm uppercase mt-2">Wood Glazer Official Portal</p>
             </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleLogin} className="px-10 pb-12 space-y-8">
            <div className="space-y-3 relative">
               <div className="flex items-center justify-between ml-1 text-xs font-black uppercase tracking-widest text-stone-400">
                  <label className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Security Key
                  </label>
               </div>
               <input 
                 required
                 type="password" 
                 placeholder="Enter admin password..."
                 className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-5 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium placeholder:text-stone-300"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 autoFocus
               />
               {error && (
                 <p className="absolute -bottom-6 left-1 text-[10px] font-bold text-red-500 uppercase tracking-widest animate-in slide-in-from-top-1">
                   Error: {error}
                 </p>
               )}
            </div>

            <div className="pt-2">
               <button 
                 disabled={loading}
                 type="submit"
                 className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 group"
               >
                 {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                 ) : (
                    <>
                      Verify and Enter
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                 )}
               </button>
            </div>
          </form>

          {/* Footer Card Section */}
          <div className="bg-stone-50 border-t border-stone-100 px-10 py-6 flex items-center justify-center gap-2">
             <Sparkles className="w-4 h-4 text-primary" />
             <span className="text-[10px] font-black uppercase text-stone-400 tracking-[0.2em]">Authorized Access Only</span>
          </div>
        </div>

        {/* Outer Shadow/Branding */}
        <p className="text-center mt-12 text-stone-400 text-xs font-bold uppercase tracking-widest leading-loose">
          Secure Infrastructure provided by <br/>
          <span className="text-secondary font-black">Wood Glazer Management</span>
        </p>
      </div>
    </div>
  );
}
