"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Image as ImageIcon, 
  Tag, 
  User, 
  Calendar,
  Sparkles,
  FileEdit, 
  Loader2,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import TipTapEditor from "@/components/admin/TipTapEditor";
import { saveBlogPost } from "@/app/admin/actions";
import { supabase } from "@/lib/supabase";

export default function EditBlogPostPage() {
  const router = useRouter();
  const { slug: currentSlug } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Interior Design");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("Wood Glazer Admin");
  const [readTime, setReadTime] = useState("5 min read");

  const fetchPost = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", currentSlug)
      .single();

    if (error) {
      setError("Could not find the requested blog post.");
    } else if (data) {
      setId(data.id);
      setTitle(data.title);
      setSlug(data.slug);
      setCategory(data.category);
      setDescription(data.description);
      setContent(data.content);
      setImageUrl(data.image);
      setAuthor(data.author);
      setReadTime(data.read_time);
    }
    setLoading(false);
  }, [currentSlug]);

  useEffect(() => {
    if (currentSlug) {
      fetchPost();
    }
  }, [currentSlug, fetchPost]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      id,
      title,
      slug,
      category,
      description,
      content,
      image: imageUrl,
      author,
      read_time: readTime,
    };

    try {
      const result = await saveBlogPost(payload);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/blog"), 1500);
      } else {
        setError(result.error || "Failed to update post");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-stone-400 font-bold tracking-widest uppercase text-xs">Loading Article Content...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Notifications */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="w-5 h-5" />
          <p className="font-bold text-sm tracking-wide">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex items-center gap-3 text-green-600 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-bold text-sm tracking-wide">Post updated successfully! Redirecting...</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <Link 
             href="/admin/blog"
             className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
           >
              <ArrowLeft className="w-5 h-5 text-stone-600" />
           </Link>
           <div>
              <h1 className="text-3xl font-bold text-secondary">Edit Post</h1>
              <p className="text-stone-500 font-medium">Updating: <span className="text-primary italic">&quot;{title}&quot;</span></p>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <Link 
             href={`/blog/${slug}`}
             target="_blank"
             className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-xl font-bold text-stone-600 hover:bg-stone-50 transition-colors"
           >
              <Eye className="w-5 h-5" />
              View Live
           </Link>
           <button 
             type="submit"
             disabled={saving}
             className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
           >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? "Updating..." : "Update Post"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Main Editor Column */}
         <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
               <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-400 uppercase tracking-wider">Post Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 10 Reasons Why Wood Polishing is Essential"
                    className="w-full text-2xl font-bold bg-transparent border-none focus:ring-0 placeholder:text-stone-200 p-0"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
               </div>
               
               <div className="flex items-center gap-2 text-stone-400 font-medium text-sm border-t border-stone-100 pt-4">
                  <span className="bg-stone-100 px-2 py-0.5 rounded text-xs font-bold uppercase">URL</span>
                  <span>woodglazer.com/blog/</span>
                  <input 
                    type="text" 
                    placeholder="post-slug-here"
                    className="bg-transparent border-none focus:ring-0 p-0 text-primary font-bold w-full"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  />
               </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
               <label className="text-sm font-bold text-stone-400 uppercase tracking-wider">Short Description</label>
               <textarea 
                 placeholder="Briefly describe what this post is about..."
                 className="w-full min-h-[100px] bg-stone-50 border border-stone-100 rounded-xl p-4 text-stone-600 font-medium focus:outline-none focus:border-primary transition-all resize-none"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 required
               />
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between px-2">
                  <h3 className="font-bold text-secondary flex items-center gap-2">
                     <FileEdit className="w-5 h-5 text-primary" />
                     Content Editor
                  </h3>
               </div>
               <TipTapEditor content={content} onChange={setContent} />
            </div>
         </div>

         {/* Settings Sidebar */}
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
               <h3 className="font-bold text-secondary text-lg border-b border-stone-100 pb-4">Settings</h3>
               
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                        <Tag className="w-3 h-3" />
                        Category
                     </label>
                     <select 
                       className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-bold text-stone-600 focus:outline-none focus:border-primary transition-all cursor-pointer"
                       value={category}
                       onChange={(e) => setCategory(e.target.value)}
                     >
                        <option>Interior Design</option>
                        <option>Wood Polishing</option>
                        <option>Carpentry</option>
                        <option>Lifestyle</option>
                     </select>
                  </div>

                  <div className="space-y-2 text-stone-400">
                     <label className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                        <User className="w-3 h-3" />
                        Author Name
                     </label>
                     <input 
                       type="text"
                       className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-bold text-stone-600 focus:outline-none"
                       value={author}
                       onChange={(e) => setAuthor(e.target.value)}
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        Read Time
                     </label>
                     <input 
                       type="text"
                       placeholder="e.g. 5 min read"
                       className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-bold text-stone-600 focus:outline-none"
                       value={readTime}
                       onChange={(e) => setReadTime(e.target.value)}
                     />
                  </div>

                  <div className="space-y-2 pt-4">
                     <label className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                        <ImageIcon className="w-3 h-3" />
                        Cover Image URL
                     </label>
                     <input 
                       type="url"
                       placeholder="https://images.unsplash.com/..."
                       className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-bold text-stone-600 focus:outline-none"
                       value={imageUrl}
                       onChange={(e) => setImageUrl(e.target.value)}
                     />
                     {imageUrl && (
                       <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-stone-50">
                        <Image 
                          src={imageUrl} 
                          alt="Cover preview" 
                          fill 
                          className="object-cover"
                          unoptimized 
                        />
                      </div>
                     )}
                  </div>
               </div>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
               <div className="flex items-center gap-3 text-primary">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-bold text-sm">SEO Audit</h3>
               </div>
               <div className="space-y-2">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-stone-400 uppercase">Slug Health</span>
                     <span className="text-[10px] font-bold text-green-500 uppercase">Synced</span>
                  </div>
                  <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                     <div className="bg-green-500 h-full w-full" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </form>
  );
}
