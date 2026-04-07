import { blogs, BlogPost } from "@/lib/blogData";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Mail, Phone, Calendar, Clock } from "lucide-react";

type BlogSidebarProps = {
  currentPost: BlogPost;
};

function SidebarContactForm() {
  return (
    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
      <h3 className="text-xl font-bold text-stone-900 mb-2">Need a Expert?</h3>
      <p className="text-stone-500 text-sm mb-6 leading-relaxed">
        Tell us about your project and our specialist will get back to you with a free quote.
      </p>
      
      <form className="space-y-4" aria-label="Sidebar contact form">
        <div>
          <label htmlFor="sb-name" className="sr-only">Full Name</label>
          <input
            id="sb-name"
            placeholder="Your Name"
            type="text"
            className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm focus:border-primary outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="sb-phone" className="sr-only">Phone Number</label>
          <input
            id="sb-phone"
            placeholder="Phone Number"
            type="tel"
            className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm focus:border-primary outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="sb-service" className="sr-only">Service</label>
          <select 
            id="sb-service"
            className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm focus:border-primary outline-none transition-all text-stone-500"
          >
            <option value="">Select Service</option>
            <option value="polishing">Wood Polishing</option>
            <option value="carpentry">Custom Carpentry</option>
            <option value="finishing">Interior Finishing</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-secondary py-3 text-sm font-bold text-white hover:bg-primary transition-all duration-300 shadow-lg shadow-secondary/20"
        >
          Get Free Quote
        </button>
      </form>
      
      <div className="mt-8 pt-8 border-t border-stone-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-primary">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Call Us</p>
            <p className="text-stone-900 font-bold text-sm">+91 97116 71879</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-primary">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Email</p>
            <p className="text-stone-900 font-bold text-sm">info@woodglazer.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogSidebar({ currentPost }: BlogSidebarProps) {
  // Recent posts: latest 3 excluding current
  const recentPosts = blogs
    .filter(p => p.slug !== currentPost.slug)
    .slice(0, 3);

  // Related posts: same category excluding current
  const relatedPosts = blogs
    .filter(p => p.category === currentPost.category && p.slug !== currentPost.slug)
    .slice(0, 3);

  return (
    <aside className="space-y-12">
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            Related Posts
            <span className="h-1 w-8 bg-primary rounded-full" />
          </h3>
          <div className="space-y-6">
            {relatedPosts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-4">
                <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                  <Image fill src={post.image} alt={post.title} className="object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-stone-900 font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-stone-400 text-[10px] mt-1 flex items-center gap-1 font-bold">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
          Recent Posts
          <span className="h-1 w-8 bg-primary rounded-full" />
        </h3>
        <div className="space-y-6">
          {recentPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-4">
              <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                <Image fill src={post.image} alt={post.title} className="object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-stone-900 font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                   <p className="text-stone-400 text-[10px] flex items-center gap-1 font-bold">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section>
        <SidebarContactForm />
      </section>

      {/* Category List */}
      <section className="bg-stone-900 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <h3 className="text-xl font-bold mb-6 relative z-10">Categories</h3>
        <ul className="space-y-3 relative z-10">
          {[...new Set(blogs.map(b => b.category))].map(cat => (
            <li key={cat}>
              <Link href={`/blog?category=${cat.toLowerCase()}`} className="flex items-center justify-between text-stone-400 hover:text-primary transition-colors group py-1">
                <span className="text-sm font-bold uppercase tracking-wider">{cat}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
