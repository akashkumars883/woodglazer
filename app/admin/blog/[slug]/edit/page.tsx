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
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import TipTapEditor from "@/components/admin/TipTapEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import AIAssistButton from "@/components/admin/AIAssistButton";
import { saveBlogPost } from "@/app/admin/actions";
import { supabase } from "@/lib/supabase";

export default function EditBlogPostPage() {
  const router = useRouter();
  const { slug: currentSlug } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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

  const fallbackImage = "https://images.unsplash.com/photo-1538688549894-f44af883acbb?q=80&w=2000";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-stone-400 font-bold tracking-widest uppercase text-xs">Loading Article Content...</p>
      </div>
    );
  }

  return (
    <div className="relative">
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
          <div className="flex items-center gap-3 flex-wrap">
             <button 
               type="button"
               onClick={() => setShowPreview(true)}
               className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-xl font-bold text-stone-600 hover:bg-stone-50 transition-colors"
             >
                <Eye className="w-5 h-5 text-primary" />
                Live Preview
             </button>
             <Link 
               href={`/blog/${slug}`}
               target="_blank"
               className="inline-flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 rounded-xl font-bold text-stone-700 transition-colors"
             >
                View Live Site
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
                      className="w-full text-2xl font-bold bg-transparent border-none focus:ring-0 placeholder:text-stone-200 p-0 text-secondary outline-none"
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
                      className="bg-transparent border-none focus:ring-0 p-0 text-primary font-bold w-full outline-none"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                 </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                 <div className="flex items-center justify-between flex-wrap gap-2">
                    <label className="text-sm font-bold text-stone-400 uppercase tracking-wider">Short Description</label>
                    <AIAssistButton 
                       label="AI Generate Description"
                       loadingText="Writing meta description..."
                       prompt={`Write a short, professional, and SEO-optimized meta description (under 160 characters) based on the title: "${title}". Make it catchy and engaging for search engines.`}
                       onSuccess={(seoDesc) => setDescription(seoDesc)}
                    />
                 </div>
                 <textarea 
                   placeholder="Briefly describe what this post is about..."
                   className="w-full min-h-[100px] bg-stone-50 border border-stone-100 rounded-xl p-4 text-stone-600 font-medium focus:outline-none focus:border-primary transition-all resize-none"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   required
                 />
              </div>

              <div className="space-y-4">
                 <div className="flex items-center justify-between px-2 flex-wrap gap-2">
                    <h3 className="font-bold text-secondary flex items-center gap-2">
                       <FileEdit className="w-5 h-5 text-primary" />
                       Content Editor
                    </h3>
                    {title && (
                       <AIAssistButton 
                          label="AI Generate Article"
                          loadingText="AI is writing article..."
                          prompt={`Write a highly engaging, professional, and search-optimized article outline and body content in professional English for a blog post titled "${title}". Focus on high-end luxury wood finishes, wood care, carpentry, or home styling. Format it with clean HTML elements like <h2>, <h3>, <p>, and <ul>. Make it around 400-600 words long, highly detailed and ready for publication.`}
                          onSuccess={(generatedHTML) => setContent(generatedHTML)}
                       />
                    )}
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

                    <ImageUploader 
                      value={imageUrl}
                      onChange={setImageUrl}
                      label="Cover Image"
                    />
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

      {/* Live Preview Modal - Styled exactly like the frontend /blog/[slug] layout */}
      {showPreview && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#fffcf7] rounded-3xl border border-stone-200 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button 
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute right-6 top-6 z-10 p-2 rounded-full bg-white/80 border border-stone-200 text-stone-500 hover:text-stone-900 shadow-md hover:scale-105 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Custom Navbar Mockup */}
            <div className="bg-white/80 border-b border-stone-100 px-8 py-4 flex items-center justify-between sticky top-0 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-secondary rounded-full" />
                <span className="text-sm font-black tracking-tight text-secondary uppercase">Wood Glazer Live Preview</span>
              </div>
              <span className="text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">
                Frontend Sandbox Mode
              </span>
            </div>

            <div className="p-8 sm:p-12 space-y-10">
              {/* Post Header */}
              <header className="max-w-3xl">
                <div className="flex items-center gap-3 text-xs text-primary mb-6 font-bold uppercase tracking-[0.2em]">
                  <span>{category || "Interior Design"}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-500">{readTime || "5 min read"}</span>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-extrabold text-secondary leading-[1.1] tracking-tight">
                  {title || "Untitled Blog Post"}
                </h2>
                
                <div className="flex items-center gap-4 border-y border-stone-100 py-6 mt-8">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-stone-900 font-bold">{author || "Team Wood Glazer"}</p>
                    <p className="text-stone-500 text-sm">Published on {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </header>

              {/* Cover Image */}
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                <img 
                  alt={title || "Cover Preview"}
                  src={imageUrl || fallbackImage}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage;
                  }}
                />
              </div>

              {/* Grid of Content & Mock Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Simulated Main Body */}
                <div className="lg:col-span-8">
                  <div 
                    className="prose prose-stone prose-lg max-w-none prose-headings:text-secondary prose-headings:font-black prose-headings:mt-8 prose-headings:mb-3 prose-p:text-stone-600 prose-p:leading-relaxed prose-p:my-3 prose-li:text-stone-600 prose-li:my-1.5 prose-strong:text-secondary prose-img:rounded-3xl"
                    dangerouslySetInnerHTML={{ __html: content }} 
                  />
                </div>

                {/* Simulated Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="font-bold text-secondary text-base">Share this post</h4>
                    <div className="flex gap-2">
                      {["Twitter", "LinkedIn", "Facebook"].map((platform) => (
                        <span key={platform} className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-500">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-stone-950 p-8 rounded-2xl text-white space-y-4">
                     <span className="text-[9px] font-black tracking-widest text-primary uppercase">Special Offer</span>
                     <h4 className="text-lg font-bold">Premium Polishing in Delhi NCR</h4>
                     <p className="text-xs text-stone-400">Upgrade your wooden furniture with high-durability PU Paint & Melamine.</p>
                     <button type="button" className="w-full bg-primary py-2.5 rounded-xl font-bold text-xs text-white hover:bg-primary-hover">Get Free Quote</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
