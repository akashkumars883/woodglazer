"use client";

import { 
  Plus, 
  Edit2, 
  Trash2,
  Package,
  Loader2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { deleteService } from "../actions";
import { supabase } from "@/lib/supabase";

interface Category {
  id: string;
  slug: string;
  title: string;
  image: string;
  status: string;
  sub_services: { count: number }[];
}

export default function ServicesAdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const { data } = await supabase
          .from("service_categories")
          .select("*, sub_services(count)")
          .order("created_at", { ascending: true });
        
        if (isMounted) {
          if (data) setCategories(data as Category[]);
          setLoading(false);
        }
      } catch (err: unknown) {
        console.error("Error loading categories:", err);
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the "${title}" category? All sub-services will also be removed.`)) {
      const result = await deleteService(id, 'category');
      if (result.success) {
        setCategories(categories.filter(c => c.id !== id));
      } else {
        alert("Error deleting category: " + result.error);
      }
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-semibold text-secondary">Service Categories</h1>
           <p className="text-stone-500 font-medium">Manage the core services displayed on your website.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform self-start sm:self-center">
           <Plus className="w-5 h-5" />
           Add Category
        </button>
      </div>

      {/* Grid of Service Categories */}
      {loading ? (
         <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-stone-400 font-bold tracking-widest uppercase text-xs">Loading Categories...</p>
         </div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
               <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:border-stone-300 transition-all duration-300 group">
                  <div className="aspect-video w-full bg-stone-100 flex items-center justify-center border-b border-stone-200 relative overflow-hidden">
                     {cat.image ? (
                        <Image 
                           src={cat.image} 
                           alt={cat.title} 
                           fill 
                           className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                     ) : (
                        <Package className="w-12 h-12 text-stone-200" />
                     )}
                     <div className="absolute top-4 right-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border ${
                        cat.status === "Active" || !cat.status ? "bg-green-50 text-green-600 border-green-100" : "bg-orange-50 text-orange-600 border-orange-100"
                        }`}>
                           {cat.status || "Active"}
                        </span>
                     </div>
                  </div>
                  <div className="p-6">
                     <h3 className="text-lg font-semibold text-secondary mb-1 group-hover:text-primary transition-colors line-clamp-1">{cat.title}</h3>
                     <p className="text-xs text-stone-400 font-semibold mb-6">{cat.sub_services?.[0]?.count || 0} Specialties attached</p>
                     
                     <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                        <div className="flex items-center gap-2">
                           <Link 
                             href={`/admin/services/${cat.slug}/edit`}
                             className="p-2 bg-stone-50 rounded-xl text-stone-400 hover:text-primary hover:bg-stone-100 transition-all border border-transparent hover:border-stone-200"
                           >
                              <Edit2 className="w-4 h-4" />
                           </Link>
                           <button 
                             className="p-2 bg-stone-50 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                             onClick={() => handleDelete(cat.id, cat.title)}
                           >
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                        <Link 
                           href={`/admin/services/${cat.slug}/sub-services`}
                           className="flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-primary transition-colors group/link"
                        >
                           Manage
                           <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      )}
    </div>
  );
}
