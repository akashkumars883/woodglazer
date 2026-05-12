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
            features: sub.features || [
              "Expert Application",
              "Durable Protection",
              "Refined Aesthetic",
              "Long-Lasting Shine"
            ],
            details: sub.details || null
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

export async function incrementVisitorCount() {
  try {
    const { data: existing } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "total_visits")
      .single();

    let currentCount = 0; // Starting base from 0
    if (existing && existing.value) {
      const val = existing.value as { count?: number } | number;
      if (typeof val === "number") {
        currentCount = val;
      } else if (val && typeof (val as any).count === "number") {
        currentCount = (val as any).count;
      }
    }

    const nextCount = currentCount + 1;

    await supabase
      .from("site_settings")
      .upsert({ key: "total_visits", value: { count: nextCount } }, { onConflict: "key" });

    return { success: true, count: nextCount };
  } catch (err: unknown) {
    console.error("Error incrementing visitor count:", err);
    return { success: false };
  }
}

// --- Universal AI Actions (Groq, OpenAI, DeepSeek, etc.) ---

export async function getAIConfig() {
  const defaultKey = process.env.GROQ_API_KEY || "";
  const envKey = process.env.UNIVERSAL_AI_KEY || process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY;
  const envEndpoint = process.env.UNIVERSAL_AI_ENDPOINT || "https://api.groq.com/openai/v1";
  const envModel = process.env.UNIVERSAL_AI_MODEL || "llama-3.3-70b-versatile";

  if (envKey) {
    return { 
      success: true, 
      key: envKey, 
      endpoint: envEndpoint, 
      model: envModel, 
      source: "env" 
    };
  }

  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "universal_ai_config")
    .single();

  if (error || !data) {
    return { 
      success: true, 
      key: defaultKey, 
      endpoint: "https://api.groq.com/openai/v1", 
      model: "llama-3.3-70b-versatile",
      source: "hardcoded"
    };
  }
  
  const val = data.value as { key?: string; endpoint?: string; model?: string } | null;
  return { 
    success: true, 
    key: val?.key || defaultKey, 
    endpoint: val?.endpoint || "https://api.groq.com/openai/v1", 
    model: val?.model || "llama-3.3-70b-versatile",
    source: val?.key ? "db" : "hardcoded" 
  };
}

// Backwards compatibility aliases for existing imports
export async function getGeminiApiKey() {
  const config = await getAIConfig();
  return { success: config.success, key: config.key, source: config.source };
}

export async function saveAIConfig(key: string, endpoint: string, model: string) {
  const { data: existing } = await supabase
    .from("site_settings")
    .select("id")
    .eq("key", "universal_ai_config")
    .single();

  const payload = { key, endpoint: endpoint || "https://api.groq.com/openai/v1", model: model || "llama-3.3-70b-versatile" };
  let error;
  
  if (existing) {
    const res = await supabase
      .from("site_settings")
      .update({ value: payload })
      .eq("key", "universal_ai_config");
    error = res.error;
  } else {
    const res = await supabase
      .from("site_settings")
      .insert([{ key: "universal_ai_config", value: payload }]);
    error = res.error;
  }

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function saveGeminiApiKey(key: string) {
  const current = await getAIConfig();
  return saveAIConfig(key, current.endpoint, current.model);
}

export async function generateAIContent(
  prompt: string, 
  formatAsJson: boolean = false,
  customConfig?: { key: string; endpoint: string; model: string }
) {
  try {
    const config = customConfig || await getAIConfig();
    const apiKey = config.key?.trim();

    if (!apiKey) {
      return { success: false, error: "API_KEY_MISSING" };
    }

    // Clean up endpoint trailing slash
    let endpoint = config.endpoint.trim();
    if (endpoint.endsWith("/")) {
      endpoint = endpoint.slice(0, -1);
    }

    // Standard OpenAI compatible Chat completions URL
    const url = `${endpoint}/chat/completions`;

    const systemInstruction = formatAsJson 
      ? "You are a professional SEO expert and web developer. Return ONLY a valid, single JSON object. Do NOT wrap the JSON inside markdown code blocks like ```json ... ```. Your output must start with { and end with } so it is directly parseable."
      : `You are an elite, professional SEO content writer and premium wood polishing & carpentry expert. 
Your goal is to write a deeply comprehensive, high-value, and search-optimized article that ranks #1 on Google.

CRITICAL SEO & GOOGLE HELPFUL CONTENT GUIDELINES:
1. Google E-E-A-T: Show rich, real-world industry expertise in luxury wood polishing (PU polish, Melamine, Deco paint, Lamination) and carpentry. Speak with the authority of a 15+ years experienced artisan.
2. Word Count: Write a long-form article of exactly 1000 to 1200 words. Make it detailed, fully explaining each sub-topic with actionable advice.
3. Formatting: Write in raw HTML format using clean tags (<h2>, <h3>, <p>, <ul>, <li>, <strong>). Do NOT wrap your output in markdown code blocks (such as \`\`\`html or \`\`\`). Return ONLY the pure, directly renderable HTML starting with your first heading.
4. Human Tone: Use a natural, conversational, yet authoritative human voice. Avoid robotic/AI filler phrases, buzzwords, and repetitive transitions (e.g., avoid "delve", "testament", "nestled", "in today's digital age", "moreover", "furthermore", "ultimately", "in conclusion").
5. Keyword Optimization: Naturally integrate the main keywords from the prompt in headings and first/last paragraphs. Do not keyword stuff; maintain high readability.
6. Value & Engagement: Include step-by-step guides, maintenance tips, wood types comparison, or expert secrets that provide genuine, unique value to homeowners.`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: formatAsJson ? 1000 : 2500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API Error details:", errorText);
      return { success: false, error: `API returned status ${response.status}: ${errorText.substring(0, 100)}` };
    }

    const resData = await response.json();
    const generatedText = resData.choices?.[0]?.message?.content || "";

    if (!generatedText) {
      return { success: false, error: "Empty response from AI API" };
    }

    return { success: true, text: generatedText.trim() };
  } catch (err: unknown) {
    console.error("generateAIContent error:", err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function suggestNewBlogTopics(existingTitles: string[]) {
  const titlesList = existingTitles.length > 0 
    ? existingTitles.map(t => `- "${t}"`).join("\n")
    : "(No existing blogs yet)";

  const prompt = `You are a premium SEO marketer for Wood Glazer (woodglazer.com), the leading brand in luxury wood polishing (PU polish, Melamine, Deco paint, Lamination) and high-end carpentry in Delhi NCR.

These are our already published blog articles:
${titlesList}

Generate exactly 2 fresh, unique, and highly searched blog article topics. 
They must NOT overlap or be similar to the existing titles listed above.
They must target homeowners in Delhi, Noida, Gurgaon, and Faridabad looking for home interior polish and carpentry.

Return ONLY a valid JSON array of exactly 2 objects. Do NOT use markdown code block formatting (like \`\`\`json). The response must be directly parseable JSON.

These are golden examples of perfect lengths to follow:
Example 1:
- "title": "Best PU Polish for Wooden Doors in Delhi NCR" (44 characters - Perfect!)
- "description": "Looking for the best PU polish for your wooden doors? Discover the ultimate guide to luxury wood polishing services in Delhi NCR by Wood Glazer." (147 characters - Perfect!)

Example 2:
- "title": "10 Essential Tips to Clean Melamine Coated Wood" (47 characters - Perfect!)
- "description": "Keep your melamine wood looking brand new with our 10 essential cleaning tips. Protect your luxury furniture with professional advice from Wood Glazer." (152 characters - Perfect!)

Each object must have exactly these keys:
- "title": A catchy, highly clickable, SEO-friendly headline. It MUST be strictly between 40 and 60 characters in length (including spaces). Do NOT make it shorter than 40 or longer than 60 characters.
- "category": Choose from "Wood Polishing", "Carpentry", "Interior Design", "Lifestyle".
- "reason": A short 1-sentence explanation of why this topic is highly searched and valuable.
- "seoScore": A score string like "High (9.5/10)" or "Very High (9.8/10)".
- "description": A highly compelling, SEO-rich Meta Description. It MUST be strictly between 120 and 160 characters in length (including spaces). Do NOT make it shorter than 120 or longer than 160 characters.`;

  const result = await generateAIContent(prompt, true);
  if (!result.success || !result.text) {
    return { success: false, error: result.error || "No response from AI" };
  }

  try {
    const rawText = result.text.trim();
    // Safely parse JSON even if LLM wraps it in backticks
    const cleanJson = rawText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    const suggestions = JSON.parse(cleanJson);
    return { success: true, suggestions };
  } catch (err: unknown) {
    console.error("JSON Parsing Error of suggestions:", result.text, err);
    return { success: false, error: "Failed to parse AI output. Please try again." };
  }
}


