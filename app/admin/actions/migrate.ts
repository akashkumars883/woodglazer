"use server";

import { supabase } from "@/lib/supabase";
import { servicesData } from "@/lib/servicesData";
import { blogs } from "@/lib/blogData";

export async function migrateDataToSupabase() {
  try {
    console.log("Starting migration...");

    // 1. Migrate Service Categories & Sub-Services
    for (const cat of servicesData) {
      // Insert category
      const { data: categoryData, error: catError } = await supabase
        .from("service_categories")
        .upsert({
          slug: cat.slug,
          title: cat.title,
          description: cat.description,
          image: cat.image
        }, { onConflict: 'slug' })
        .select()
        .single();

      if (catError) {
        console.error(`Error inserting category ${cat.title}:`, catError);
        continue;
      }

      if (categoryData) {
        // Insert sub-services
        for (const sub of cat.subServices) {
          const { error: subError } = await supabase
            .from("sub_services")
            .upsert({
              parent_id: categoryData.id,
              slug: sub.slug,
              title: sub.title,
              description: sub.description,
              image: sub.image,
              features: ["Premium Finish", "Durable Coating", "Expert Application"] // Default features
            }, { onConflict: 'slug' });

          if (subError) {
            console.error(`Error inserting sub-service ${sub.title}:`, subError);
          }
        }
      }
    }

    // 2. Migrate Blog Posts
    for (const post of blogs) {
      const { error: blogError } = await supabase
        .from("blog_posts")
        .upsert({
          slug: post.slug,
          title: post.title,
          description: post.description,
          content: post.content,
          image: post.image,
          author: post.author,
          category: post.category,
          read_time: post.readTime,
          featured: post.featured || false
        }, { onConflict: 'slug' });

      if (blogError) {
        console.error(`Error inserting blog post ${post.title}:`, blogError);
      }
    }

    // 3. Migrate Site Settings (Initial)
    const initialSettings = [
      { key: "site_name", value: { text: "Wood Glazer" } },
      { key: "contact_email", value: { text: "info@woodglazer.com" } },
      { key: "seo_keywords", value: ["wood polishing", "carpentry", "interior design", "Delhi NCR"] }
    ];

    for (const setting of initialSettings) {
      await supabase
        .from("site_settings")
        .upsert(setting, { onConflict: 'key' });
    }

    return { success: true, message: "Migration completed successfully!" };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("Migration failed:", error);
    return { success: false, error: error.message };
  }
}
