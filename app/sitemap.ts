import type { MetadataRoute } from 'next';

const BASE_URL = 'https://allimagetools.vercel.app';

const tools = [
  '/compress-image',
  '/image-to-pdf',
  '/image-to-jpg',
  '/image-to-png',
  '/image-to-webp',
  '/image-to-base64',
  '/image-to-text',
  '/image-to-grayscale',
  '/resize-image',
  '/image-to-favicon',
  '/image-to-svg',
  '/image-to-qr',
  '/image-to-color-palette',
  '/image-to-ascii',
  '/image-to-pixel-art',
  '/image-to-icon',
  '/image-to-bmp',
  '/image-to-gif',
  '/image-to-zip',
  '/image-to-html',
];

/** Date the site was last meaningfully updated (keep this current when content changes) */
const LAST_UPDATED = new Date('2025-01-01');

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: BASE_URL,
    lastModified: LAST_UPDATED,
    changeFrequency: 'weekly',
    priority: 1,
  };

  const toolRoutes: MetadataRoute.Sitemap = tools.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [home, ...toolRoutes];
}
