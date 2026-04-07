"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { saveService } from "../../actions";

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await saveService('category', formData);
    
    if (result.success) {
      router.push("/admin/services");
      router.refresh();
    } else {
      alert("Error saving category: " + result.error);
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

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
              <h1 className="text-3xl font-black text-secondary tracking-tight">Add New Category</h1>
              <p className="text-stone-500 font-medium">Create a top-level service category for your website.</p>
           </div>
           <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
              <ImageIcon className="w-8 h-8 text-primary" />
           </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Category Title</label>
              <input
                required
                type="text"
                placeholder="e.g., Luxury Wood Polishing"
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData({ 
                    ...formData, 
                    title, 
                    slug: generateSlug(title) 
                  });
                }}
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 ml-1">URL Slug</label>
              <input
                required
                type="text"
                placeholder="luxury-wood-polishing"
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-mono text-sm"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Image URL</label>
              <input
                required
                type="text"
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest ml-1">Tip: Use a high-quality 16:9 ratio image.</p>
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Description</label>
              <textarea
                required
                rows={4}
                placeholder="Describe this service category..."
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Category...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Create Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
