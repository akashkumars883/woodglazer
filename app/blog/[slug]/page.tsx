import { buildMetadata, createBlogNode, createBreadcrumbNode } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogSidebar from "@/components/BlogSidebar";
import CTASection from "@/components/CTASection";
import { supabase } from "@/lib/supabase";
import { getDynamicSiteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const { data: blogs } = await supabase
    .from("blog_posts")
    .select("slug");
  
  return (blogs || []).map((blog: { slug: string }) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = await getDynamicSiteConfig();
  
  const { data: blog } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) return {};

  return buildMetadata({
    title: `${blog.title} | ${config.name} Blog`,
    description: blog.description,
    path: `/blog/${blog.slug}`,
    image: blog.image,
    keywords: [blog.category, "wood finishing", "interior design"],
  }, config);
}


export default async function BlogDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const { data: blog } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) notFound();

  return (
    <>
      <article className="min-h-screen pt-12 pb-16">
        <StructuredData
          id="blog-post-data"
          data={[
            createBlogNode({
              ...blog,
              date: blog.created_at,
              readTime: blog.read_time
            }),
            createBreadcrumbNode([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: blog.title, path: `/blog/${blog.slug}` },
            ]),
          ]}
        />


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {/* Post Header */}
              <header className="mb-12">
                <div className="flex items-center gap-3 text-xs text-primary mb-6 font-bold uppercase tracking-[0.2em]">
                  <span>{blog.category}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-500">{blog.read_time}</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-8 leading-[1.1] tracking-tight">
                  {blog.title}
                </h1>
                
                <div className="flex items-center gap-4 border-y border-stone-100 py-6">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-stone-900 font-bold">{blog.author}</p>
                    <p className="text-stone-500 text-sm">Published on {new Date(blog.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl mb-12">
                <Image
                  alt={blog.title}
                  src={blog.image}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>

              {/* Blog Content */}
              <div 
                className="prose prose-stone prose-lg max-w-none prose-headings:text-secondary prose-headings:font-black prose-p:text-stone-600 prose-p:leading-relaxed prose-li:text-stone-600 prose-strong:text-secondary prose-img:rounded-3xl"
                dangerouslySetInnerHTML={{ __html: blog.content }} 
              />
              
              {/* Share section */}
              <div className="mt-16 pt-8 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-stone-500 font-medium">Share this article:</span>
                  <div className="flex gap-3">
                    {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
                      <button key={platform} className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-primary hover:text-primary transition-all">
                        <span className="sr-only">{platform}</span>
                        <div className="w-5 h-5 rounded-sm bg-current opacity-20" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4">
              <BlogSidebar currentPost={blog} />
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section at bottom */}
      <CTASection />
    </>
  );
}
