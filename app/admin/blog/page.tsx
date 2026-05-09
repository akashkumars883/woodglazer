"use client";

import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { deleteBlogPost } from "../actions";
import { supabase } from "@/lib/supabase";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  status: string;
  created_at: string;
  image?: string;
}

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (isMounted) {
        if (data) setBlogs(data as BlogPost[]);
        setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      const result = await deleteBlogPost(id);
      if (result.success) {
        setBlogs(blogs.filter(b => b.id !== id));
      } else {
        alert("Error deleting post: " + result.error);
      }
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-semibold text-secondary">Blog Posts</h1>
           <p className="text-stone-500 font-medium">Manage your articles, guides, and news updates.</p>
        </div>
        <Link 
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform self-start sm:self-center"
        >
           <Plus className="w-5 h-5" />
           Write New Post
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
         <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input 
               type="text" 
               placeholder="Search posts by title or category..." 
               className="w-full bg-stone-50 border border-stone-200 rounded-xl px-12 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold text-stone-600 hover:bg-stone-100 transition-colors w-full md:w-auto justify-center">
               <Filter className="w-4 h-4" />
               Filters
            </button>
            <select className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-semibold text-stone-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-full md:w-auto">
               <option>All Posts</option>
               <option>Published</option>
               <option>Drafts</option>
            </select>
         </div>
      </div>

      {/* Blog Table Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden min-h-[400px]">
         {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-20 gap-4">
               <Loader2 className="w-10 h-10 text-primary animate-spin" />
               <p className="text-stone-400 font-bold tracking-widest uppercase text-xs">Fetching Articles...</p>
            </div>
         ) : (
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-stone-50/50 border-b border-stone-200">
                     <tr>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-400">Post Detail</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-400">Category</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-400">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-400">Date</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-400 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                     {blogs.map((blog, idx) => (
                        <tr key={idx} className="group hover:bg-stone-50/50 transition-colors">
                           <td className="px-6 py-5 min-w-[300px]">
                              <div className="flex items-center gap-4">
                                 <div className="w-16 h-12 rounded-xl bg-stone-100 flex-shrink-0 overflow-hidden border border-stone-200 group-hover:bg-white transition-colors relative">
                                    {blog.image ? (
                                       <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                                    ) : (
                                       <ImageIcon className="w-5 h-5 text-stone-300 absolute inset-0 m-auto" />
                                    )}
                                 </div>
                                 <div>
                                    <p className="font-semibold text-secondary group-hover:text-primary transition-colors cursor-pointer line-clamp-1">{blog.title}</p>
                                    <p className="text-xs text-stone-400 font-medium pt-0.5">By {blog.author}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-5">
                              <span className="text-xs font-semibold text-stone-600 bg-stone-50 border border-stone-100 px-3 py-1 rounded-full whitespace-nowrap">{blog.category}</span>
                           </td>
                           <td className="px-6 py-5">
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                                blog.status === "Published" || !blog.status
                                  ? "bg-green-50 text-green-600 border-green-100" 
                                  : "bg-orange-50 text-orange-600 border-orange-100"
                              }`}>
                                 {blog.status || "Published"}
                              </span>
                           </td>
                           <td className="px-6 py-5 text-xs font-semibold text-stone-500 whitespace-nowrap" suppressHydrationWarning>
                             {new Date(blog.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                           </td>
                           <td className="px-6 py-5">
                              <div className="flex items-center justify-end gap-2">
                                 <Link 
                                   href={`/admin/blog/${blog.slug}/edit`}
                                   className="p-2 bg-stone-50 rounded-xl text-stone-400 hover:text-primary hover:bg-stone-100 border border-transparent hover:border-stone-200 transition-all shadow-sm"
                                 >
                                    <Edit2 className="w-4 h-4" />
                                 </Link>
                                 <button 
                                   className="p-2 bg-stone-50 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all shadow-sm"
                                   onClick={() => handleDelete(blog.id, blog.title)}
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
         {/* Pagination Footer */}
         <div className="bg-stone-50/50 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
            <p className="text-sm text-stone-500 font-medium">Showing <span className="font-semibold text-secondary">{blogs.length}</span> articles recorded</p>
         </div>
      </div>
    </div>
  );
}
