import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f3eb",
    theme_color: "#c58524",
    icons: [
      {
        src: siteConfig.icon,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: siteConfig.appleIcon,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    id: siteConfig.url,
  };
}
