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
import { useState, useEffect, useCallback } from "react";
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-secondary">Blog Posts</h1>
           <p className="text-stone-500 font-medium tracking-tight">Manage your articles, guides, and news updates.</p>
        </div>
        <Link 
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20"
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
               className="w-full bg-stone-50 border border-stone-200 rounded-xl px-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-600 hover:bg-stone-100 transition-colors w-full md:w-auto justify-center">
               <Filter className="w-4 h-4" />
               Filters
            </button>
            <select className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-bold text-stone-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-full md:w-auto">
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
                  <thead className="bg-stone-50 border-b border-stone-200">
                     <tr>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Post Detail</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Category</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Status</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Date</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                     {blogs.map((blog, idx) => (
                        <tr key={idx} className="group hover:bg-stone-50 transition-colors">
                           <td className="px-6 py-6 min-w-[300px]">
                              <div className="flex items-center gap-4">
                                 <div className="w-16 h-12 rounded-lg bg-stone-100 flex-shrink-0 overflow-hidden border border-stone-200 group-hover:bg-white transition-colors relative">
                                    {blog.image ? (
                                       <Image src={blog.image} alt={blog.title} fill className="object-cover" unoptimized />
                                    ) : (
                                       <ImageIcon className="w-6 h-6 text-stone-300 absolute inset-0 m-auto" />
                                    )}
                                 </div>
                                 <div>
                                    <p className="font-bold text-secondary group-hover:text-primary transition-colors cursor-pointer line-clamp-1">{blog.title}</p>
                                    <p className="text-xs text-stone-400 font-medium tracking-tight">By {blog.author}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <span className="text-sm font-bold text-stone-600 bg-stone-50 border border-stone-100 px-3 py-1 rounded-full whitespace-nowrap">{blog.category}</span>
                           </td>
                           <td className="px-6 py-6">
                              <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full ${
                                blog.status === "Published" || !blog.status
                                  ? "bg-green-50 text-green-600 border border-green-100" 
                                  : "bg-orange-50 text-orange-600 border border-orange-100"
                              }`}>
                                 {blog.status || "Published"}
                              </span>
                           </td>
                           <td className="px-6 py-6 text-[13px] font-bold text-stone-500 whitespace-nowrap">
                             {new Date(blog.created_at).toLocaleDateString()}
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Link 
                                   href={`/admin/blog/${blog.slug}/edit`}
                                   className="p-2.5 hover:bg-white rounded-xl border border-transparent hover:border-stone-200 transition-all text-stone-400 hover:text-primary shadow-sm"
                                 >
                                    <Edit2 className="w-4 h-4" />
                                 </Link>
                                 <button 
                                   className="p-2.5 hover:bg-white rounded-xl border border-transparent hover:border-stone-200 transition-all text-stone-400 hover:text-red-500 shadow-sm"
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
         <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
            <p className="text-sm text-stone-500 font-medium">Showing <span className="font-bold text-secondary">{blogs.length}</span> articles recorded</p>
         </div>
      </div>
    </div>
  );
}
