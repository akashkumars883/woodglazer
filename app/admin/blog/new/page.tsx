"use client";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import Link from "next/link";
import TipTapEditor from "@/components/admin/TipTapEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import AIAssistButton from "@/components/admin/AIAssistButton";
import { saveBlogPost } from "@/app/admin/actions";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Interior Design");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("<p>Start writing your masterpiece...</p>");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("Wood Glazer Admin");
  const [readTime, setReadTime] = useState("5 min read");

  const calculateSeoScore = () => {
    let score = 30;
    if (title.length >= 40 && title.length <= 60) score += 20;
    else if (title.length > 0) score += 10;

    if (description.length >= 120 && description.length <= 160) score += 20;
    else if (description.length > 0) score += 10;

    if (slug && !/\s/.test(slug)) score += 15;
    if (imageUrl) score += 15;
    
    // Simple content word count check
    const wordCount = content.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean).length;
    if (wordCount >= 1000) score += 15;
    else if (wordCount > 100) score += 5;

    return score;
  };
  
  const seoScore = calculateSeoScore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const suggestedTitle = params.get("suggestedTitle");
      const suggestedCategory = params.get("suggestedCategory");
      const suggestedDescription = params.get("suggestedDescription");
      
      if (suggestedTitle) {
        setTitle(suggestedTitle);
        setSlug(suggestedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
      }
      if (suggestedCategory) {
        setCategory(suggestedCategory);
      }
      if (suggestedDescription) {
        setDescription(suggestedDescription);
      }
    }
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    // Simple auto-slug
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      slug,
      category,
      description,
      content,
      image: imageUrl || "https://images.unsplash.com/photo-1538688549894-f44af883acbb?q=80&w=2000",
      author,
      read_time: readTime,
      featured: false,
    };

    try {
      const result = await saveBlogPost(payload);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/blog"), 1500);
      } else {
        setError(result.error || "Failed to save post");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fallbackImage = "https://images.unsplash.com/photo-1538688549894-f44af883acbb?q=80&w=2000";

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
            <p className="font-bold text-sm tracking-wide">Post created successfully! Redirecting...</p>
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
                <h1 className="text-3xl font-bold text-secondary">New Blog Post</h1>
                <p className="text-stone-500 font-medium">Create a new article for your audience.</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button 
               type="button"
               onClick={() => setShowPreview(true)}
               className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-xl font-bold text-stone-600 hover:bg-stone-50 transition-colors"
             >
                <Eye className="w-5 h-5 text-primary" />
                Live Preview
             </button>
             <button 
               type="submit"
               disabled={loading}
               className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
             >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {loading ? "Saving..." : "Save Post"}
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
                      onChange={(e) => handleTitleChange(e.target.value)}
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
                        prompt={`Write a compelling, professional, and SEO-optimized search meta description based on the title: "${title}". It MUST be strictly between 120 and 160 characters in length (including spaces). This is a rigid limit. Do NOT make it shorter than 120 or longer than 160 characters. Do not wrap the response in quotation marks.`}
                        onSuccess={(seoDesc) => {
                           let desc = seoDesc.trim();
                           if (desc.startsWith('"') && desc.endsWith('"')) {
                              desc = desc.substring(1, desc.length - 1);
                           }
                           if (desc.length > 160) {
                              desc = desc.substring(0, 157);
                              const lastSpace = desc.lastIndexOf(" ");
                              if (lastSpace > 110) desc = desc.substring(0, lastSpace) + "...";
                              else desc = desc.substring(0, 157) + "...";
                           } else if (desc.length < 120) {
                              const suffix = " Wood Glazer provides Delhi NCR with premium wood polishing, melamine coating & customized carpentry designs.";
                              if (desc.length + suffix.length <= 160) {
                                 desc += suffix;
                              } else {
                                 desc = "Get premium PU polish, Melamine, Deco paint and high-end luxury carpentry services in Delhi NCR. Transform your home interior with Wood Glazer today.";
                              }
                           }
                           setDescription(desc);
                        }}
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
                          prompt={`Write a masterfully crafted, 1000-1200 words long, deeply detailed and search-optimized article in natural, conversational, professional human English for a blog post titled "${title}". 

Follow these professional guidelines:
1. SEO Optimization: Ensure keywords related to the title are integrated naturally throughout. Include rich subheadings (H2, H3), lists, and step-by-step guides.
2. Google Helpful Content: Align with E-E-A-T guidelines. Share real industry expertise on luxury wood finishes, polishing (PU, Melamine, Deco paint), carpentry, and wood care.
3. Word Count: Must be a long-form article of 1000 to 1200 words. Do NOT summarize or shorten.
4. Human Language: Avoid robotic or cliché AI transitions and buzzwords (e.g. no "delve", "testament", "revolutionary", "moreover", "in conclusion"). 
5. Formatting: Return ONLY pure, clean raw HTML elements (<h2>, <h3>, <p>, <ul>, <li>, <strong>).`}
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

               {/* Premium Google Search Snippet Simulator */}
               <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                     <h3 className="font-bold text-secondary flex items-center gap-2 text-sm">
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        Google Snippet & Schema Planner
                     </h3>
                     <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        seoScore >= 80 ? "bg-green-50 text-green-600 border border-green-200" :
                        seoScore >= 50 ? "bg-orange-50 text-orange-600 border border-orange-200" :
                        "bg-red-50 text-red-600 border border-red-200"
                     }`}>
                        SEO Score: {seoScore}/100
                     </span>
                  </div>

                  {/* Google Snippet Live Preview */}
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Google Desktop Search Preview</label>
                     <div className="bg-stone-50 border border-stone-100 p-5 rounded-2xl space-y-1">
                        <div className="text-xs text-stone-400 font-medium line-clamp-1 flex items-center gap-1">
                           <span>woodglazer.com</span>
                           <span>›</span>
                           <span>blog</span>
                           <span>›</span>
                           <span className="text-stone-500 font-bold">{slug || "your-slug"}</span>
                        </div>
                        <h4 className="text-xl font-medium text-blue-800 hover:underline cursor-pointer leading-tight line-clamp-1">
                           {title || "Untitled Blog Post"} | Wood Glazer
                        </h4>
                        <p className="text-xs text-stone-600 leading-normal line-clamp-2">
                           {description || "Please add a description to preview how this page will appear in Google search results."}
                        </p>
                     </div>
                  </div>

                  {/* SEO Health Bars */}
                  <div className="space-y-3 pt-2">
                     <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-stone-500">
                           <span>Title Length ({title.length} chars)</span>
                           <span className={title.length >= 40 && title.length <= 60 ? "text-green-600" : "text-orange-500"}>
                              {title.length >= 40 && title.length <= 60 ? "Perfect" : "Should be 40-60 chars"}
                           </span>
                        </div>
                        <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                           <div className={`h-full transition-all duration-300 ${
                              title.length >= 40 && title.length <= 60 ? "bg-green-500" : "bg-orange-400"
                           }`} style={{ width: `${Math.min(100, (title.length / 60) * 100)}%` }} />
                        </div>
                     </div>

                     <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-stone-500">
                           <span>Meta Description ({description.length} chars)</span>
                           <span className={description.length >= 120 && description.length <= 160 ? "text-green-600" : "text-orange-500"}>
                              {description.length >= 120 && description.length <= 160 ? "Perfect" : "Should be 120-160 chars"}
                           </span>
                        </div>
                        <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                           <div className={`h-full transition-all duration-300 ${
                              description.length >= 120 && description.length <= 160 ? "bg-green-500" : "bg-orange-400"
                           }`} style={{ width: `${Math.min(100, (description.length / 160) * 100)}%` }} />
                        </div>
                     </div>
                  </div>

                  {/* Rich Snippet Schema Visualizer */}
                  <div className="space-y-2 pt-2">
                     <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                           <span>JSON-LD Schema Markup</span>
                           <span className="bg-green-50 text-green-600 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-normal">Auto-Generated</span>
                        </label>
                        <span className="text-[10px] text-stone-400 font-bold">BlogPosting + Breadcrumb</span>
                     </div>
                     <div className="bg-stone-900 text-stone-300 p-4 rounded-xl text-[10px] font-mono overflow-x-auto max-h-[150px] overflow-y-auto border border-stone-800">
                        <pre>{JSON.stringify({
                          "@context": "https://schema.org",
                          "@graph": [
                            {
                              "@type": "BlogPosting",
                              "headline": title || "Untitled Blog",
                              "description": description || "",
                              "image": imageUrl || "https://woodglazer.com/fallback.jpg",
                              "datePublished": new Date().toISOString().split('T')[0],
                              "author": {
                                "@type": "Person",
                                "name": author
                              },
                              "publisher": {
                                "@type": "Organization",
                                "name": "Wood Glazer",
                                "logo": "https://woodglazer.com/logo.png"
                              }
                            },
                            {
                              "@type": "BreadcrumbList",
                              "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://woodglazer.com" },
                                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://woodglazer.com/blog" },
                                { "@type": "ListItem", "position": 3, "name": title || "Blog Post", "item": `https://woodglazer.com/blog/${slug || ""}` }
                              ]
                            }
                          ]
                        }, null, 2)}</pre>
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

            {/* Custom Navbar Mockup to feel extremely premium */}
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
