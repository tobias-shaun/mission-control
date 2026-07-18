import type { MetadataRoute } from "next";

const BASE = "https://mission-control-snowy-beta.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    ...["hatched", "job-command-center", "life-hub", "property-platform"].map(
      (slug) => ({ url: `${BASE}/reports/${slug}`, priority: 0.6 })
    ),
  ];
}
