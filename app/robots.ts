import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://allimagetools.vercel.app/sitemap.xml',
    host: 'https://allimagetools.vercel.app',
  };
}
