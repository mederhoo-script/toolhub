import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://toolhub.vercel.app/sitemap.xml',
    host: 'https://toolhub.vercel.app',
  };
}
