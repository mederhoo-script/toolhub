const BASE_URL = 'https://allimagetools.vercel.app';

/**
 * Generates a per-tool OG image URL that includes the tool title.
 * The /og route renders a dynamic Open Graph image using the provided title.
 */
export function toolOgImage(title: string): {
  url: string;
  width: number;
  height: number;
  alt: string;
} {
  const params = new URLSearchParams({ title });
  return {
    url: `${BASE_URL}/og?${params.toString()}`,
    width: 1200,
    height: 630,
    alt: `${title} — Free Image Tool Hub`,
  };
}
