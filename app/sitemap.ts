import type { MetadataRoute } from "next";
import { getServiceSeoImage } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { absoluteUrl, getDynamicSiteConfig } from "@/lib/site";

const lastModified = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const config = await getDynamicSiteConfig();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/brand/opengraph-image.jpg")],
    },
    {
      url: absoluteUrl("/services"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [absoluteUrl("/images/hero-image3.jpg")],
    },
  ];

  // Fetch real data from Supabase for sitemap
  const { data: services } = await supabase
    .from("service_categories")
    .select("slug, sub_services(slug)")
    .order("created_at", { ascending: true });

  const serviceRoutes: MetadataRoute.Sitemap = (services || []).flatMap((service) => {
    const parentRoute: MetadataRoute.Sitemap[number] = {
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [absoluteUrl(getServiceSeoImage(service.slug))],
    };

    const subServiceRoutes = (service.sub_services || []).map((subService: { slug: string }) => ({
      url: absoluteUrl(`/services/${service.slug}/${subService.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [absoluteUrl(getServiceSeoImage(service.slug))],
    }));

    return [parentRoute, ...subServiceRoutes];
  });

  return [...staticRoutes, ...serviceRoutes];
}
