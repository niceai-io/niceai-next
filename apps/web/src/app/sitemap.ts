import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export const runtime = "nodejs"; // 'nodejs' (default) | 'edge'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers();
  const domain = headersList.get("host")!;

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
  ];
}
