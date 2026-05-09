"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ImageUploader from "@/components/admin/ImageUploader";
import AIAssistButton from "@/components/admin/AIAssistButton";
import { updateService } from "../../../actions";
import { supabase } from "@/lib/supabase";

export default function EditCategoryPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    slug: "",
    description: "",
    image: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: [] as string[],
    gallery: [] as string[]
  });

  const [newKeyword, setNewKeyword] = useState("");
  const [newGalleryImage, setNewGalleryImage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const { data } = await supabase
        .from("service_categories")
        .select("*")
        .eq("slug", slug)
        .single();

      if (isMounted) {
        if (data) {
          setFormData(data);
        } else {
          router.push("/admin/services");
        }
        setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [slug, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const result = await updateService(formData.id, 'category', {
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      image: formData.image,
      seo_title: formData.seo_title,
      seo_description: formData.seo_description,
      seo_keywords: formData.seo_keywords,
      gallery: formData.gallery
    });

    if (result.success) {
      router.push("/admin/services");
      router.refresh();
    } else {
      alert("Error saving category: " + result.error);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-stone-400 font-bold tracking-widest uppercase text-xs">Loading Category...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/services"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-8 sm:p-12 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
           <div>
              <h1 className="text-3xl font-black text-secondary tracking-tight">Edit Category</h1>
              <p className="text-stone-500 font-medium">Update the details for <span className="text-primary italic">&quot;{formData.title}&quot;</span>.</p>
           </div>
           <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden relative w-16 h-16">
              {formData.image ? (
                <Image src={formData.image} alt={formData.title} fill className="object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-primary" />
              )}
           </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Category Title</label>
              <input
                required
                type="text"
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 ml-1">URL Slug</label>
              <input
                required
                type="text"
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-mono text-sm"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <ImageUploader 
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Category Image"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Description</label>
              <textarea
                required
                rows={4}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Gallery Section */}
            <div className="md:col-span-2 pt-8 border-t border-stone-100">
              <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Service Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {formData.gallery?.map((img, idx) => (
                   <div key={idx} className="relative group aspect-video rounded-2xl overflow-hidden border border-stone-200">
                     <Image 
                        src={img} 
                        alt={`Gallery image ${idx + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                     <button 
                       type="button"
                       onClick={() => setFormData({ ...formData, gallery: formData.gallery.filter((_, i) => i !== idx) })}
                       className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                     </button>
                   </div>
                 ))}
                 
                 <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-4 md:col-span-1">
                    <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">Add to Gallery</h4>
                    <ImageUploader 
                      value={newGalleryImage}
                      onChange={setNewGalleryImage}
                      label="New Gallery Photo"
                    />
                    <button 
                      type="button"
                      disabled={!newGalleryImage}
                      onClick={() => {
                        if (newGalleryImage) {
                          setFormData({ ...formData, gallery: [...(formData.gallery || []), newGalleryImage] });
                          setNewGalleryImage("");
                        }
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:scale-105 transition-all shadow-md shadow-primary/10 disabled:opacity-50"
                    >
                      + Confirm Add
                    </button>
                 </div>
              </div>
            </div>

            {/* SEO Section */}
            <div className="md:col-span-2 pt-8 border-t border-stone-100 space-y-8">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Advanced SEO Settings
                </h3>
                {formData.title && (
                  <AIAssistButton 
                     formatAsJson
                     label="AI SEO Auto-Fill"
                     loadingText="Optimizing SEO..."
                     prompt={`Analyze the service category "${formData.title}" with description "${formData.description}". Write highly competitive SEO tags for a premium home interior carpentry and wood polishing business based in India.
                     You must respond with a JSON object containing:
                     {
                       "seo_title": "Highly engaging page title under 60 chars",
                       "seo_description": "Search engine meta description under 155 chars",
                       "seo_keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
                     }`}
                     onSuccess={(jsonText) => {
                        try {
                           const parsed = JSON.parse(jsonText);
                           setFormData({
                              ...formData,
                              seo_title: parsed.seo_title || "",
                              seo_description: parsed.seo_description || "",
                              seo_keywords: Array.isArray(parsed.seo_keywords) ? parsed.seo_keywords : []
                           });
                        } catch (err) {
                           console.error("Could not parse AI response", jsonText, err);
                        }
                     }}
                  />
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 ml-1">SEO Title Override</label>
                  <input
                    type="text"
                    placeholder="Custom Browser Tab Title"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.seo_title || ""}
                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                   <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 ml-1">SEO Keywords</label>
                   <div className="flex flex-wrap gap-2 mb-2">
                      {formData.seo_keywords?.map((tag, idx) => (
                        <span key={idx} className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                          {tag}
                          <button type="button" onClick={() => setFormData({ ...formData, seo_keywords: formData.seo_keywords.filter((_, i) => i !== idx) })} className="text-stone-400 hover:text-red-500">×</button>
                        </span>
                      ))}
                   </div>
                   <div className="flex gap-2">
                     <input
                       type="text"
                       placeholder="Add SEO tag..."
                       className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm outline-none"
                       value={newKeyword}
                       onChange={(e) => setNewKeyword(e.target.value)}
                       onKeyDown={(e) => {
                         if (e.key === 'Enter') {
                           e.preventDefault();
                           if (newKeyword) {
                             setFormData({ ...formData, seo_keywords: [...(formData.seo_keywords || []), newKeyword] });
                             setNewKeyword("");
                           }
                         }
                       }}
                     />
                   </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Meta Description Override</label>
                  <textarea
                    rows={3}
                    placeholder="Custom meta description for Google search results..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    value={formData.seo_description || ""}
                    onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6">
            <button
              disabled={saving}
              type="submit"
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
