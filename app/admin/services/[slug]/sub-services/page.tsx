"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Loader2, 
  Package, 
  ImageIcon,
  CheckCircle2,
  TrendingUp,
  Save,
  Edit2,
  X
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ImageUploader from "@/components/admin/ImageUploader";
import { saveService, deleteService } from "../../../actions";
import { supabase } from "@/lib/supabase";

interface SubService {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  gallery?: string[];
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  created_at?: string;
  parent_id?: string;
  details?: string;
}

interface Category {
  id: string;
  title: string;
  slug: string;
}

export default function SubServicesPage() {
  const router = useRouter();
  const { slug: parentSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [category, setCategory] = useState<Category | null>(null);
  const [subServices, setSubServices] = useState<SubService[]>([]);

  const [newSub, setNewSub] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    features: ["Expert Application", "Durable Protection"],
    seo_title: "",
    seo_description: "",
    seo_keywords: [] as string[],
    gallery: [] as string[],
    details: ""
  });

  const [editingSub, setEditingSub] = useState<SubService | null>(null);

  const fetchData = useCallback(async () => {
    const { data: catData } = await supabase
      .from("service_categories")
      .select("*, sub_services(*)")
      .eq("slug", parentSlug)
      .single();

    if (catData) {
      setCategory(catData);
      setSubServices(catData.sub_services || []);
    } else {
      router.push("/admin/services");
    }
    setLoading(false);
  }, [parentSlug, router]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const { data: catData } = await supabase
        .from("service_categories")
        .select("*, sub_services(*)")
        .eq("slug", parentSlug)
        .single();

      if (isMounted) {
        if (catData) {
          setCategory(catData);
          setSubServices(catData.sub_services || []);
        } else {
          router.push("/admin/services");
        }
        setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [parentSlug, router]);

  const handleAddSub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    setAdding(true);
    
    const result = await saveService('sub', {
      ...newSub,
      parent_id: category.id
    });
    
    if (result.success) {
      setShowAddForm(false);
      setNewSub({ 
        title: "", 
        slug: "", 
        description: "", 
        image: "", 
        features: ["Expert Application", "Durable Protection"],
        seo_title: "",
        seo_description: "",
        seo_keywords: [],
        gallery: [],
        details: ""
      });
      fetchData();
    } else {
      alert("Error adding sub-service: " + result.error);
    }
    setAdding(false);
  };

  const handleUpdateSub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSub) return;
    setAdding(true);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, created_at, parent_id, ...updateData } = editingSub;
    const result = await saveService('sub', {
      id,
      ...updateData
    });
    
    if (result.success) {
      setEditingSub(null);
      fetchData();
    } else {
      alert("Error updating sub-service: " + result.error);
    }
    setAdding(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      const result = await deleteService(id, 'sub');
      if (result.success) {
        setSubServices(subServices.filter(s => s.id !== id));
      } else {
        alert("Error deleting: " + result.error);
      }
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  if (loading || !category) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
           <Loader2 className="w-10 h-10 text-primary animate-spin" />
           <p className="text-stone-400 font-bold tracking-widest uppercase text-xs">Loading Sub-Services...</p>
        </div>
     );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="space-y-6">
        <Link 
          href="/admin/services"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div>
              <h1 className="text-4xl font-black text-secondary tracking-tight">
                 {category.title.toUpperCase()} <span className="text-primary italic font-serif">Specialties</span>
              </h1>
              <p className="text-stone-500 font-medium text-lg mt-1 italic">Manage specific services for this category.</p>
           </div>
           <button 
             onClick={() => setShowAddForm(!showAddForm)}
             className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg ${
               showAddForm ? 'bg-stone-100 text-stone-500 hover:bg-stone-200' : 'bg-primary text-white hover:scale-105 shadow-primary/20'
             }`}
           >
              {showAddForm ? 'Cancel' : <><Plus className="w-5 h-5" /> Add Specialty</>}
           </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-[2.5rem] border-2 border-primary/10 shadow-2xl shadow-primary/5 p-8 sm:p-12 overflow-hidden animate-in slide-in-from-top-4 duration-500">
           <div className="mb-10 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                 <Plus className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-secondary">New Specialty Details</h2>
           </div>
           <form onSubmit={handleAddSub} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-xs font-black uppercase tracking-widest text-stone-400">Title</label>
                 <input
                    required
                    type="text"
                    placeholder="e.g., Melamine Gloss Finish"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                    value={newSub.title}
                    onChange={(e) => {
                       const title = e.target.value;
                       setNewSub({ ...newSub, title, slug: generateSlug(title) });
                    }}
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-xs font-black uppercase tracking-widest text-stone-400">Slug</label>
                 <input
                    required
                    type="text"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm"
                    value={newSub.slug}
                    onChange={(e) => setNewSub({ ...newSub, slug: e.target.value })}
                 />
              </div>
              <div className="md:col-span-2">
                 <ImageUploader 
                    value={newSub.image}
                    onChange={(url) => setNewSub({ ...newSub, image: url })}
                    label="Specialty Image"
                 />
              </div>
              <div className="md:col-span-2 space-y-3">
                 <label className="text-xs font-black uppercase tracking-widest text-stone-400">Description</label>
                 <textarea
                    required
                    rows={3}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    value={newSub.description}
                    onChange={(e) => setNewSub({ ...newSub, description: e.target.value })}
                 />
              </div>
              <div className="md:col-span-2 space-y-3">
                 <label className="text-xs font-black uppercase tracking-widest text-stone-400">Detailed Content (Long Description)</label>
                 <textarea
                    placeholder="Describe the service details, application process, etc. HTML tags or plain text are supported."
                    rows={5}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    value={newSub.details || ""}
                    onChange={(e) => setNewSub({ ...newSub, details: e.target.value })}
                 />
              </div>
              <div className="md:col-span-2 pt-4">
                 <button 
                   disabled={adding}
                   type="submit"
                   className="w-full bg-secondary text-white py-5 rounded-2xl font-bold shadow-lg shadow-secondary/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                 >
                    {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                    Save Specialty
                 </button>
              </div>
           </form>
        </div>
      )}

      {/* Editing Form Overlay */}
      {editingSub && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 sm:p-12 space-y-8 animate-in zoom-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <Edit2 className="w-6 h-6 text-primary" />
                   <h2 className="text-2xl font-bold text-secondary">Edit Specialty</h2>
                </div>
                <button onClick={() => setEditingSub(null)} className="p-3 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleUpdateSub} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Title</label>
                    <input 
                       className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none font-bold text-secondary"
                       value={editingSub.title}
                       onChange={(e) => setEditingSub({ ...editingSub, title: e.target.value })}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Slug</label>
                    <input 
                       className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none font-mono text-xs"
                       value={editingSub.slug}
                       onChange={(e) => setEditingSub({ ...editingSub, slug: e.target.value })}
                    />
                 </div>
                 <div className="md:col-span-2">
                    <ImageUploader 
                       value={editingSub.image}
                       onChange={(url) => setEditingSub({ ...editingSub, image: url })}
                       label="Specialty Image"
                    />
                 </div>
                  <div className="md:col-span-2 space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Description</label>
                     <textarea 
                        rows={3}
                        className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none resize-none"
                        value={editingSub.description}
                        onChange={(e) => setEditingSub({ ...editingSub, description: e.target.value })}
                     />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Detailed Content (Long Description)</label>
                     <textarea 
                        rows={6}
                        placeholder="Describe the service details, application process, etc. HTML tags or plain text are supported."
                        className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none resize-none"
                        value={editingSub.details || ""}
                        onChange={(e) => setEditingSub({ ...editingSub, details: e.target.value })}
                     />
                  </div>

                  <div className="md:col-span-2 space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Key Advantages (Features)</label>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(editingSub.features || []).map((feature, idx) => (
                           <div key={idx} className="flex gap-2 items-center">
                              <input 
                                 className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none font-bold text-stone-700"
                                 value={feature}
                                 onChange={(e) => {
                                    const updatedFeatures = [...(editingSub.features || [])];
                                    updatedFeatures[idx] = e.target.value;
                                    setEditingSub({ ...editingSub, features: updatedFeatures });
                                 }}
                              />
                              <button 
                                 type="button"
                                 onClick={() => setEditingSub({ ...editingSub, features: (editingSub.features || []).filter((_, i) => i !== idx) })}
                                 className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                              >
                                 <X className="w-4 h-4" />
                              </button>
                           </div>
                        ))}
                        <button 
                           type="button"
                           onClick={() => setEditingSub({ ...editingSub, features: [...(editingSub.features || []), "New Advantage"] })}
                           className="border border-dashed border-primary/20 hover:border-primary text-primary font-bold text-sm rounded-xl py-3 transition-colors"
                        >
                           + Add Advantage
                        </button>
                     </div>
                  </div>

                 <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-stone-100 pt-8">
                    <div className="space-y-6">
                       <h3 className="font-bold text-secondary flex items-center gap-2"><ImageIcon className="w-4 h-4 text-primary" /> Gallery Images</h3>
                       <div className="grid grid-cols-2 gap-4">
                          {editingSub.gallery?.map((img: string, i: number) => (
                             <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-stone-200 group/img">
                                <Image 
                                  src={img} 
                                  alt={`Gallery image ${i + 1}`}
                                  fill
                                  className="object-cover" 
                                />
                                <button 
                                  type="button"
                                onClick={() => setEditingSub({ ...editingSub, gallery: (editingSub.gallery || []).filter((_: string, idx: number) => idx !== i) })}
                                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity"
                                >
                                   <X className="w-3 h-3" />
                                </button>
                             </div>
                          ))}
                          
                          <div className="border border-dashed border-stone-200 rounded-xl p-3 space-y-2">
                             <p className="text-[10px] font-black uppercase text-stone-400">Upload Image</p>
                             <ImageUploader 
                                value=""
                                onChange={(url) => {
                                   if (url) {
                                      setEditingSub({ ...editingSub, gallery: [...(editingSub.gallery || []), url] });
                                   }
                                }}
                                label="Add Photo"
                             />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="font-bold text-secondary flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> SEO Overrides</h3>
                       <input 
                          placeholder="Custom SEO Title"
                          className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm"
                          value={editingSub.seo_title || ""}
                          onChange={(e) => setEditingSub({ ...editingSub, seo_title: e.target.value })}
                       />
                       <textarea 
                          placeholder="Custom Meta Description"
                          rows={3}
                          className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm resize-none"
                          value={editingSub.seo_description || ""}
                          onChange={(e) => setEditingSub({ ...editingSub, seo_description: e.target.value })}
                       />
                    </div>
                 </div>

                 <div className="md:col-span-2 pt-4">
                    <button 
                      disabled={adding}
                      type="submit"
                      className="w-full bg-primary text-white py-5 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                       {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                       Update Specialty
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {subServices.length === 0 ? (
            <div className="md:col-span-2 py-20 text-center bg-stone-50 rounded-[3rem] border-2 border-dashed border-stone-200">
               <Package className="w-16 h-16 text-stone-200 mx-auto mb-4" />
               <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">No specialties found for this category.</p>
            </div>
         ) : (
            subServices.map((sub, idx) => (
               <div key={idx} className="bg-white rounded-[2rem] border border-stone-100 p-6 flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-all duration-500 group">
                  <div className="relative w-full sm:w-40 aspect-square rounded-2xl overflow-hidden shrink-0 shadow-inner bg-stone-50">
                     {sub.image ? (
                        <Image 
                          src={sub.image} 
                          alt={sub.title} 
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center"><Package className="w-8 h-8 text-stone-200" /></div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                     <div>
                        <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{sub.title}</h3>
                        <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed italic">{sub.description}</p>
                     </div>
                     <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-50">
                        <div className="flex gap-2">
                           <button 
                              onClick={() => setEditingSub(sub)}
                              className="p-2.5 bg-stone-50 text-stone-400 hover:text-primary hover:bg-white rounded-xl transition-all border border-stone-50 hover:border-primary/20"
                           >
                              <Edit2 className="w-4 h-4" />
                           </button>
                           <button 
                              onClick={() => handleDelete(sub.id, sub.title)}
                              className="p-2.5 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all border border-red-50 hover:border-red-200"
                           >
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">ID: {sub.slug}</span>
                     </div>
                  </div>
               </div>
            ))
         )}
      </div>
    </div>
  );
}
