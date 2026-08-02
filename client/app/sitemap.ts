import type { MetadataRoute } from "next";
import { collections } from "@/lib/photos";

const baseUrl = "https://photography.faizm.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/collections", "/about"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...collectionRoutes];
}
