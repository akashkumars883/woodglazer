import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export default async function LatestBlog() {
  const { data: blogList } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  const latestBlogs = blogList || [];

  if (latestBlogs.length === 0) {
     return null; // Hide section if no blogs exist
  }


  return (
    <section id="blog" className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
            Latest Insights
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <h2 className="service-outline-title text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl uppercase">
            Our Blog
          </h2>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-secondary px-5 py-2.5 text-sm font-semibold text-secondary transition-colors duration-200 hover:bg-secondary hover:text-secondary-foreground sm:shrink-0"
          >
            Read All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogs.map((blog) => (
            <Link 
              key={blog.slug} 
              href={`/blog/${blog.slug}`}
              className="group flex flex-col h-full bg-white rounded-lg overflow-hidden border border-stone-100 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  alt={blog.title}
                  src={blog.image}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs text-muted mb-2 font-medium uppercase tracking-wider" suppressHydrationWarning>
                  {new Date(blog.created_at).toLocaleDateString()} • {blog.read_time}
                </span>

                <h3 className="text-xl font-semibold text-secondary mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-stone-600 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                  {blog.description}
                </p>
                <span className="text-primary text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-wider">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
