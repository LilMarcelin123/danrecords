import type { MetadataRoute } from "next";
import { artists } from "@/lib/artists";

const BASE = "https://danrecords.com"; // TODO: dominio final

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/history`, priority: 0.7 },
    { url: `${BASE}/platform`, priority: 0.7 },
    ...artists.map((a) => ({ url: `${BASE}/artists/${a.slug}`, priority: 0.8 })),
  ];
}
