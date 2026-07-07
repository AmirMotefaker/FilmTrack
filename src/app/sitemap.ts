import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://cine-fan-ashy.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://cine-fan-ashy.vercel.app/movies', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://cine-fan-ashy.vercel.app/shows', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://cine-fan-ashy.vercel.app/genres', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://cine-fan-ashy.vercel.app/auth', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
  ]
}