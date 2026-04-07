export const siteConfig = {
  name: "Wood Glazer",
  shortName: "Wood Glazer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.woodglazer.com",
  description:
    "Wood Glazer highlights premium woodwork, glazing, and finish craftsmanship built around detail, durability, and timeless interiors.",
  category: "home improvement",
  locale: "en_US",
  keywords: [
    "Wood Glazer",
    "wood polishing services",
    "carpentry services",
    "custom interiors",
    "wood finishing",
    "interior fit-out",
  ],
  logo: "/brand/wood-glazer-logo.png",
  icon: "/brand/favicon-square.png?v=2",
  icon32: "/brand/favicon-32.png?v=2",
  icon16: "/brand/favicon-16.png?v=2",
  appleIcon: "/brand/apple-icon-square.png?v=2",
  openGraphImage: "/brand/opengraph-image.jpg",
  twitterImage: "/brand/twitter-image.jpg",
  serviceArea: ["Gurgaon", "Delhi", "Noida", "NCR", "Haryana"],
};

export type SiteConfig = typeof siteConfig;


export async function getDynamicSiteConfig() {
  const { supabase } = await import("./supabase");
  const { data } = await supabase.from("site_settings").select("*");
  
  const settingsObj = (data || []).reduce((acc: Record<string, unknown>, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  return {
    ...siteConfig,
    ...settingsObj
  };
}



export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
