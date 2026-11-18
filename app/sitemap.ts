import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { seriesPath } from '@/data/series';
import { publishedParts } from '@/lib/series';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  return [
    { url: siteConfig.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/cv/`, changeFrequency: 'monthly', priority: 0.6 },
    ...publishedParts().map((p) => ({
      url: `${base}${seriesPath(p.number)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
