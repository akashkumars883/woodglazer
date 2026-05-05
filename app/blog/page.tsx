import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata, createBlogIndexNode, createBreadcrumbNode } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";
import { getDynamicSiteConfig } from "@/lib/site";
import PageHero from "@/components/PageHero";

export async function generateMetadata() {
  const config = await getDynamicSiteConfig();
  
  return buildMetadata({
    title: "Blog - Insights on Wood Polishing & Interior Finishing | " + config.name,
    description: "Stay updated with the latest trends, tips, and guides on wood polishing, custom carpentry, and premium interior fit-out services.",
    path: "/blog",
  }, config);
}

export default async function BlogPage() {
  const { data: blogList } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  const blogPosts = blogList || [];
  const featuredBlog = blogPosts.find((b) => b.featured) || blogPosts[0];
  const otherBlogs = blogPosts.filter((b: { slug: string }) => b.slug !== featuredBlog?.slug);

  return (
    <main className="min-h-screen pb-16 bg-white">
      <StructuredData
        id="blog-listing-data"
        data={[
          createBlogIndexNode((blogPosts || []).map((b: any) => ({
            ...b,
            date: b.created_at,
            readTime: b.read_time,
            content: b.content || ""
          }))),
          createBreadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <PageHero
        title="Insights & Updates"
        backgroundImage="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Featured Post */}
        {featuredBlog && (
          <section className="mb-16 ">
            <Link href={`/blog/${featuredBlog.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm transition-all hover:shadow-xl hover:border-primary/20">
                <div className="relative aspect-[16/9] lg:aspect-square overflow-hidden">
                  <Image
                    alt={featuredBlog.title}
                    src={featuredBlog.image}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    unoptimized
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 text-sm text-stone-500 mb-4 font-medium uppercase tracking-wider">
                    <span>{featuredBlog.category}</span>
                    <span>•</span>
                    <span>{featuredBlog.read_time}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-stone-600 text-lg mb-6 line-clamp-3 leading-relaxed">
                    {featuredBlog.description}
                  </p>
                  <span className="text-primary font-semibold inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    Read Article
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Other Posts Grid */}
        <section>
          <div className="flex items-center justify-between mb-8 mt-10">
            <h2 className="text-2xl font-bold text-stone-900">Latest Articles</h2>
            <div className="h-px flex-1 bg-stone-200 ml-6 hidden sm:block"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherBlogs.map((blog: { slug: string; title: string; image: string; category: string; created_at: string; read_time: string; description: string }) => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group flex flex-col h-full bg-white rounded-lg overflow-hidden border border-stone-100 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    alt={blog.title}
                    src={blog.image}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-stone-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs text-stone-500 mb-2 font-medium uppercase tracking-wider">
                    {new Date(blog.created_at).toLocaleDateString()} • {blog.read_time}
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-stone-600 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                    {blog.description}
                  </p>
                  <span className="text-primary text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
