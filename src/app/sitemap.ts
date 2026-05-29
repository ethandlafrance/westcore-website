import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://westcoretrainingcentre.com";
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/book-free-session`, lastModified: now, priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, priority: 0.7 },
  ];
  const locationRoutes: MetadataRoute.Sitemap = LOCATIONS.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    lastModified: now,
    priority: 0.8,
  }));
  return [...staticRoutes, ...locationRoutes];
}
