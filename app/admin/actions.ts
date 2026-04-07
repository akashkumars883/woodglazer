"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { servicesData } from "@/lib/servicesData";
import { siteConfig } from "@/lib/site";

interface ActionResponse {
  success: boolean;
  error?: string;
}

// --- Auth Actions ---

export async function loginAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  
  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    return { success: true };
  }
  
  return { success: false, error: "Incorrect password" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  revalidatePath("/admin");
  return { success: true };
}

// --- Seeding Actions ---


export async function seedDatabase() {
  try {
    for (const category of servicesData) {
      // 1. Insert/Update category
      const { data: catResult, error: catError } = await supabase
        .from("service_categories")
        .upsert({
          slug: category.slug,
          title: category.title,
          description: category.description,
          image: category.image
        }, { onConflict: 'slug' })
        .select()
        .single();

      if (catError) throw new Error(`Category error: ${catError.message}`);

      // 2. Insert sub-services
      for (const sub of category.subServices) {
        const { error: subError } = await supabase
          .from("sub_services")
          .upsert({
            parent_id: catResult.id,
            slug: sub.slug,
            title: sub.title,
            description: sub.description,
            image: sub.image,
            features: [
              "Expert Application",
              "Durable Protection",
              "Refined Aesthetic",
              "Long-Lasting Shine"
            ]
          }, { onConflict: 'slug' });

        if (subError) throw new Error(`Sub-service error: ${subError.message}`);
      }
    }

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");
    
    // Also seed site settings
    await initializeSiteSettings();
    
    return { success: true };
  } catch (error: unknown) {
    console.error("Seeding failed:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

// --- Blog Actions ---

export async function deleteBlogPost(id: string) {
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function saveBlogPost(data: {
  id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  image: string;
  author: string;
  read_time: string;
  featured?: boolean;
}): Promise<ActionResponse> {
  const { id, ...saveData } = data;
  
  let result;
  if (id) {
    result = await supabase
      .from("blog_posts")
      .update(saveData)
      .eq("id", id);
  } else {
    result = await supabase
      .from("blog_posts")
      .insert([saveData]);
  }

  if (result.error) {
    console.error("Error saving blog post:", result.error);
    return { success: false, error: result.error.message };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (data.slug) {
    revalidatePath(`/blog/${data.slug}`);
  }
  
  return { success: true };
}

export async function updateBlogPost(id: string, data: Record<string, unknown>): Promise<ActionResponse> {
  const { error } = await supabase
    .from("blog_posts")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error("Error updating blog post:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (data.slug) {
    revalidatePath(`/blog/${data.slug as string}`);
  }
  return { success: true };
}

// --- Service Actions ---

export async function deleteService(id: string, type: 'category' | 'sub') {
  const table = type === 'category' ? 'service_categories' : 'sub_services';
  
  const { error } = await supabase
    .from(table)
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting ${type}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  return { success: true };
}

export async function saveService(type: 'category' | 'sub', data: Record<string, unknown>): Promise<ActionResponse> {
  const table = type === 'category' ? 'service_categories' : 'sub_services';
  const { id, ...saveData } = data;

  let result;
  if (id) {
    result = await supabase
      .from(table)
      .update(saveData)
      .eq("id", id);
  } else {
    result = await supabase
      .from(table)
      .insert([saveData]);
  }

  if (result.error) {
    console.error(`Error saving ${type}:`, result.error);
    return { success: false, error: result.error.message };
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  if (data.slug) {
    revalidatePath(`/services/${data.slug}`);
  }
  return { success: true };
}

export async function updateService(id: string, type: 'category' | 'sub', data: Record<string, unknown>): Promise<ActionResponse> {
  const table = type === 'category' ? 'service_categories' : 'sub_services';

  const { error } = await supabase
    .from(table)
    .update(data)
    .eq("id", id);

  if (error) {
    console.error(`Error updating ${type}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  return { success: true };
}

// --- Site Settings Actions ---

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*");
  
  if (error) {
    console.error("Error fetching site settings:", error);
    return { success: false, error: error.message };
  }

  const settingsObj = (data || []).reduce((acc: Record<string, unknown>, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  return { success: true, settings: settingsObj };
}

export async function updateSiteSetting(key: string, value: unknown): Promise<ActionResponse> {
  try {
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", key)
      .single();

    let result;
    if (existing) {
      result = await supabase
        .from("site_settings")
        .update({ value })
        .eq("key", key);
    } else {
      result = await supabase
        .from("site_settings")
        .insert([{ key, value }]);
    }

    if (result.error) {
      console.error(`Error saving site setting ${key}:`, result.error);
      return { success: false, error: result.error.message };
    }

    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function initializeSiteSettings() {
  const { data: existingSettings } = await supabase
    .from("site_settings")
    .select("key");
  
  const existingKeys = (existingSettings || []).map(s => s.key);

  const defaultSettings = [
    { key: "name", value: siteConfig.name },
    { key: "description", value: siteConfig.description },
    { key: "keywords", value: siteConfig.keywords },
    { key: "serviceArea", value: siteConfig.serviceArea },
    { key: "phone", value: "+91 9999999999" },
    { key: "whatsapp", value: "+91 9999999999" }
  ];

  const toInsert = defaultSettings.filter(s => !existingKeys.includes(s.key));

  if (toInsert.length > 0) {
    const { error } = await supabase
      .from("site_settings")
      .insert(toInsert);
    
    if (error) console.error(`Error initializing settings:`, error);
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}

// --- Inquiry / Lead Actions ---

export async function saveInquiry(data: { name: string, phone: string, service?: string, message?: string }) {
  try {
    const { error } = await supabase
      .from("inquiries")
      .insert([data]);

    if (error) throw error;
    return { success: true };
  } catch (error: unknown) {
    console.error("Error saving inquiry:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function getInquiries() {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries:", error);
    return { success: false, error: error.message };
  }

  return { success: true, inquiries: data };
}

export async function markInquiryAsViewed(id: string) {
  const { error } = await supabase
    .from("inquiries")
    .update({ viewed: true })
    .eq("id", id);

  if (error) {
    console.error("Error marking inquiry as viewed:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { success: true };
}
