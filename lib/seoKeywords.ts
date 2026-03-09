/**
 * SEO keyword landing pages.
 *
 * Each entry maps a unique URL slug to a specific tool with its own
 * title, description, keywords and intro text so search engines see
 * distinct, keyword-targeted content for every route.
 */

const BASE_URL = 'https://allimagetools.vercel.app';

export type ToolKey =
  | 'compress-image'
  | 'resize-image'
  | 'image-to-jpg'
  | 'image-to-png'
  | 'image-to-webp'
  | 'image-to-pdf'
  | 'image-to-grayscale'
  | 'image-to-base64'
  | 'image-to-text'
  | 'image-to-favicon'
  | 'image-to-svg'
  | 'image-to-qr'
  | 'image-to-color-palette'
  | 'image-to-ascii'
  | 'image-to-pixel-art'
  | 'image-to-icon'
  | 'image-to-bmp'
  | 'image-to-gif'
  | 'image-to-zip'
  | 'image-to-html';

export interface SeoPage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  tool: ToolKey;
  intro: string;
  canonical: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makePage(
  slug: string,
  title: string,
  h1: string,
  description: string,
  keywords: string[],
  tool: ToolKey,
  intro: string,
): SeoPage {
  return { slug, title, h1, description, keywords, tool, intro, canonical: `${BASE_URL}/${slug}` };
}

// ---------------------------------------------------------------------------
// Compress Image — size-targeted pages
// ---------------------------------------------------------------------------

const KB_SIZES = [
  // Sub-20 KB — passport photos, icons, tiny web images
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  // 20–100 KB — email attachments, form uploads, thumbnails
  20, 22, 24, 25, 26, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50,
  55, 60, 64, 65, 70, 75, 80, 85, 90, 95, 100,
  // 100–300 KB — general web images, social posts
  105, 110, 115, 120, 125, 128, 130, 140, 145, 150,
  155, 160, 165, 170, 175, 180, 190, 200, 210, 220, 230, 240, 250, 256, 260, 270, 280, 290, 300,
  // 300 KB–1 MB — high-quality web & product images
  320, 330, 340, 350, 360, 380, 400, 420, 430, 450, 480,
  500, 512, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
];
const MB_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50];
const COMPRESS_FORMATS = [
  'image', 'jpg', 'jpeg', 'png', 'photo', 'webp',
  'gif', 'bmp', 'tiff', 'heic', 'picture', 'screenshot', 'file',
] as const;

/** Human-readable label for each format used in titles and descriptions. */
function fmtLabel(fmt: string): string {
  const ACRONYMS: Record<string, string> = {
    jpg: 'JPG', jpeg: 'JPEG', png: 'PNG', webp: 'WebP',
    gif: 'GIF', bmp: 'BMP', tiff: 'TIFF', heic: 'HEIC',
  };
  if (fmt in ACRONYMS) return ACRONYMS[fmt];
  // Title-case everything else: image → Image, photo → Photo, etc.
  return fmt.charAt(0).toUpperCase() + fmt.slice(1);
}

function compressKBPages(): SeoPage[] {
  const pages: SeoPage[] = [];
  for (const fmt of COMPRESS_FORMATS) {
    for (const kb of KB_SIZES) {
      const label = fmtLabel(fmt);
      const slug = `compress-${fmt}-to-${kb}kb`;
      pages.push(
        makePage(
          slug,
          `Compress ${label} to ${kb}KB Online Free`,
          `Compress ${label} to ${kb}KB`,
          `Reduce your ${label} file size to ${kb}KB instantly in your browser. Free, no upload needed, no account required. Works with JPG, PNG, WebP and more.`,
          [
            `compress ${fmt} to ${kb}kb`,
            `reduce ${fmt} size to ${kb}kb`,
            `compress image to ${kb}kb online`,
            `compress image to ${kb}kb free`,
            `${fmt} compressor ${kb}kb`,
            `shrink ${fmt} to ${kb}kb`,
            `resize ${fmt} file to ${kb}kb`,
          ],
          'compress-image',
          `Need to get a ${label} file down to exactly ${kb}KB? Drop your file into the tool above — it compresses in your browser in seconds with no quality compromise beyond what the target requires.`,
        ),
      );
    }
    for (const mb of MB_SIZES) {
      const label = fmtLabel(fmt);
      const slug = `compress-${fmt}-to-${mb}mb`;
      pages.push(
        makePage(
          slug,
          `Compress ${label} to ${mb}MB Online Free`,
          `Compress ${label} to ${mb}MB`,
          `Reduce your ${label} file size to ${mb}MB instantly in your browser. Free, no account required.`,
          [
            `compress ${fmt} to ${mb}mb`,
            `reduce ${fmt} size to ${mb}mb`,
            `compress image to ${mb}mb online`,
            `compress image to ${mb}mb free`,
            `shrink ${fmt} to ${mb}mb`,
          ],
          'compress-image',
          `Need a ${label} under ${mb}MB? Drop it into the compressor above — it handles the math automatically so your file meets the ${mb}MB limit.`,
        ),
      );
    }
  }
  return pages;
}

// ---------------------------------------------------------------------------
// Compress Image — general / use-case keyword variants
// ---------------------------------------------------------------------------

const COMPRESS_GENERAL: SeoPage[] = [
  makePage(
    'compress-image-online-free',
    'Compress Image Online Free — No Upload',
    'Compress Image Online Free',
    'Free image compression tool that runs entirely in your browser. No file uploads, no account, no limits.',
    ['compress image online free', 'free image compressor', 'image compression online', 'compress photo online free', 'compress picture online'],
    'compress-image',
    'Compress any image for free directly in your browser. Upload your file, choose a target size, and download the result — all without sending a single byte to a server.',
  ),
  makePage(
    'image-compressor-online',
    'Image Compressor Online — Free & Instant',
    'Image Compressor Online',
    'Compress images instantly in your browser. Set a target KB or MB and download a smaller file in seconds.',
    ['image compressor online', 'online image compressor', 'image compression tool', 'photo compressor online', 'compress pictures online'],
    'compress-image',
    'Our online image compressor lets you set an exact file-size target. The tool iterates automatically until your image meets that limit — no manual trial and error.',
  ),
  makePage(
    'reduce-image-size-online',
    'Reduce Image Size Online — Free Tool',
    'Reduce Image Size Online',
    'Reduce the file size of any image online for free. Works with JPG, PNG, WebP and more, right in your browser.',
    ['reduce image size online', 'reduce image file size', 'shrink image size online', 'make image smaller online', 'reduce photo size online free'],
    'compress-image',
    'Reducing image size is essential for faster websites, smaller email attachments, and meeting upload limits. Select your image and a target size and the tool does the rest.',
  ),
  makePage(
    'reduce-photo-size-online-free',
    'Reduce Photo Size Online Free — Fast & Easy',
    'Reduce Photo Size Online Free',
    'Reduce the file size of any photo online for free. No installation, no registration — just upload and download.',
    ['reduce photo size online free', 'reduce photo file size', 'shrink photo size', 'compress photo size online', 'photo size reducer'],
    'compress-image',
    'Large photo files slow down everything — from social-media uploads to email sends. Use this free tool to cut photo file sizes down to your required limit in one click.',
  ),
  makePage(
    'compress-image-for-web',
    'Compress Image for Web — Optimise for Faster Loading',
    'Compress Image for Web',
    'Optimise images for faster web page loading. Compress to 50–200 KB in your browser for free.',
    ['compress image for web', 'image optimisation for web', 'compress image for website', 'web image compressor', 'optimise image size for website'],
    'compress-image',
    'Web pages with oversized images load slowly and rank lower in search results. Compress your images to a web-friendly 50–200 KB target to improve Core Web Vitals and user experience.',
  ),
  makePage(
    'compress-image-for-email',
    'Compress Image for Email — Reduce Attachment Size Free',
    'Compress Image for Email',
    'Reduce image file size for email attachments. Get under the common 1–5 MB email limit in seconds.',
    ['compress image for email', 'reduce image size for email', 'compress photo for email', 'email image compressor', 'shrink image for email attachment'],
    'compress-image',
    'Email providers cap attachment sizes at 5–25 MB. Compress images for email to a safe 200–500 KB so your photos always get delivered without bouncing.',
  ),
  makePage(
    'compress-image-for-instagram',
    'Compress Image for Instagram — Optimise Size & Quality',
    'Compress Image for Instagram',
    'Compress images to meet Instagram\'s recommended file size. Keep quality high while reducing file size.',
    ['compress image for instagram', 'instagram image compressor', 'reduce image size for instagram', 'instagram photo compressor', 'compress photo for instagram'],
    'compress-image',
    'Instagram recommends keeping images under 8 MB and ideally below 1 MB for fast uploads. Use this tool to compress your photos to the ideal Instagram size without visible quality loss.',
  ),
  makePage(
    'compress-image-for-whatsapp',
    'Compress Image for WhatsApp — Fast & Free',
    'Compress Image for WhatsApp',
    'Compress images to send on WhatsApp without quality loss. Reduce file size for faster sharing.',
    ['compress image for whatsapp', 'compress photo for whatsapp', 'reduce image size for whatsapp', 'whatsapp image compressor', 'smaller image for whatsapp'],
    'compress-image',
    'WhatsApp compresses images automatically, often reducing quality. By pre-compressing to ~100–200 KB yourself, you maintain more control over the final look when shared.',
  ),
  makePage(
    'compress-jpeg-online',
    'Compress JPEG Online — Free JPEG Compressor',
    'Compress JPEG Online',
    'Compress JPEG images online for free. Reduce JPEG file size while keeping image quality high.',
    ['compress jpeg online', 'jpeg compressor online', 'compress jpeg free', 'reduce jpeg file size', 'jpeg image compressor', 'compress jpg jpeg online free'],
    'compress-image',
    'JPEG is the most common photo format on the web. Use this free JPEG compressor to reduce file size to your exact target — 50 KB, 100 KB, 200 KB, or any custom value.',
  ),
  makePage(
    'compress-png-online',
    'Compress PNG Online — Free PNG Compressor',
    'Compress PNG Online',
    'Compress PNG images online for free. Reduce PNG file size without losing important detail.',
    ['compress png online', 'png compressor online', 'compress png free', 'reduce png file size', 'png image compressor', 'png size reducer online'],
    'compress-image',
    'PNG files can be large, especially for screenshots and graphics. This free online PNG compressor reduces file size by converting to an optimised format while targeting your exact KB or MB limit.',
  ),
  makePage(
    'compress-png-without-losing-quality',
    'Compress PNG Without Losing Quality — Free Tool',
    'Compress PNG Without Losing Quality',
    'Compress PNG images while preserving maximum quality. Free browser-based PNG compressor.',
    ['compress png without losing quality', 'lossless png compressor', 'compress png keep quality', 'png compressor no quality loss', 'reduce png size without quality loss'],
    'compress-image',
    'Compressing PNG without losing quality is possible when the target size isn\'t too aggressive. Our tool starts with the highest possible quality and only reduces it as much as needed to hit your target.',
  ),
  makePage(
    'compress-jpeg-online-without-losing-quality',
    'Compress JPEG Without Losing Quality — Free Online',
    'Compress JPEG Without Losing Quality',
    'Compress JPEG images while maintaining visual quality. Free browser-based tool, no upload required.',
    ['compress jpeg without losing quality', 'compress jpg without quality loss', 'lossless jpeg compressor', 'jpeg compression no quality loss', 'compress jpeg keep quality'],
    'compress-image',
    'Our compressor starts at the highest quality setting and only reduces it as far as needed to hit your size target. For generous targets like 200–500 KB, most images show no visible quality change at all.',
  ),
  makePage(
    'image-size-reducer-online',
    'Image Size Reducer Online — Free & Fast',
    'Image Size Reducer Online',
    'Reduce image size online for free. Set a target KB or MB and download a smaller image instantly.',
    ['image size reducer online', 'image size reducer free', 'reduce image size tool', 'online image size reducer', 'photo size reducer online'],
    'compress-image',
    'Whether you\'re reducing image size for a website, email, or storage, this free browser-based tool makes it simple — set the target size and click Compress.',
  ),
  makePage(
    'how-to-compress-image-online',
    'How to Compress Image Online — Step-by-Step Guide',
    'How to Compress an Image Online',
    'Learn how to compress images online for free. Step-by-step guide with a built-in free compression tool.',
    ['how to compress image online', 'how to compress a photo online', 'how to reduce image size online', 'how to compress image free', 'online image compression guide'],
    'compress-image',
    'Compressing an image online is easy: 1) Upload your file, 2) Set a target size (e.g. 100 KB), 3) Click Compress, 4) Download the result. The tool handles everything automatically.',
  ),
  makePage(
    'best-image-compressor-online',
    'Best Image Compressor Online — Free, No Watermark',
    'Best Image Compressor Online',
    'The best free online image compressor. No watermarks, no sign-up, runs 100% in your browser.',
    ['best image compressor online', 'best free image compressor', 'top image compressor online', 'best online photo compressor', 'image compressor no watermark'],
    'compress-image',
    'No watermarks. No account. No file size limits on the server side. Everything runs locally in your browser for maximum privacy and speed.',
  ),
  makePage(
    'bulk-image-compressor-online',
    'Bulk Image Compressor Online — Compress Multiple Images Free',
    'Bulk Image Compressor Online',
    'Compress multiple images online for free. Process images one by one with no server limits.',
    ['bulk image compressor online', 'compress multiple images online', 'batch image compressor', 'compress multiple photos online free', 'bulk photo compressor'],
    'compress-image',
    'There\'s no server-side limit because everything runs in your browser. Process as many images as you need, one at a time, without any waiting or queuing.',
  ),
];

// ---------------------------------------------------------------------------
// Resize Image — dimension-targeted pages
// ---------------------------------------------------------------------------

const RESIZE_DIMENSIONS = [
  // Square sizes — icons, avatars, thumbnails
  { w: 16,   h: 16   }, { w: 32,   h: 32   }, { w: 48,   h: 48   }, { w: 64,   h: 64   },
  { w: 96,   h: 96   }, { w: 100,  h: 100  }, { w: 128,  h: 128  }, { w: 150,  h: 150  },
  { w: 200,  h: 200  }, { w: 256,  h: 256  }, { w: 250,  h: 250  }, { w: 300,  h: 300  },
  { w: 400,  h: 400  }, { w: 500,  h: 500  }, { w: 512,  h: 512  }, { w: 600,  h: 600  },
  { w: 800,  h: 800  }, { w: 1000, h: 1000 }, { w: 1024, h: 1024 }, { w: 1200, h: 1200 },
  { w: 2000, h: 2000 }, { w: 2048, h: 2048 }, { w: 3000, h: 3000 }, { w: 4096, h: 4096 },
  // Standard landscape — screens, presentations
  { w: 320,  h: 240  }, { w: 480,  h: 320  }, { w: 640,  h: 480  }, { w: 800,  h: 600  },
  { w: 1024, h: 768  }, { w: 1280, h: 720  }, { w: 1280, h: 800  }, { w: 1280, h: 960  },
  { w: 1366, h: 768  }, { w: 1440, h: 900  }, { w: 1600, h: 900  }, { w: 1680, h: 1050 },
  { w: 1920, h: 1080 }, { w: 1920, h: 1440 }, { w: 2560, h: 1440 }, { w: 2560, h: 1600 },
  { w: 3840, h: 2160 }, { w: 400,  h: 300  }, { w: 600,  h: 400  }, { w: 3000, h: 2000 },
  { w: 1280, h: 1024 }, { w: 1920, h: 1200 }, { w: 854,  h: 480  }, { w: 640,  h: 360  },
  // Social media landscape
  { w: 1200, h: 628  }, { w: 1200, h: 630  }, { w: 1500, h: 500  }, { w: 1200, h: 675  },
  { w: 820,  h: 312  }, { w: 1584, h: 396  }, { w: 960,  h: 540  },
  { w: 1080, h: 608  }, { w: 600,  h: 315  }, { w: 800,  h: 418  }, { w: 1080, h: 1080 },
  // Social media portrait / stories
  { w: 1080, h: 1920 }, { w: 720,  h: 1280 }, { w: 1000, h: 1500 }, { w: 1080, h: 1350 },
  { w: 400,  h: 500  },
  // Profile photos / avatars
  { w: 170,  h: 170  }, { w: 180,  h: 180  },
  // Print sizes (300 DPI)
  { w: 2480, h: 3508 }, { w: 3508, h: 2480 }, { w: 1748, h: 2480 }, { w: 1240, h: 1754 },
  { w: 1800, h: 1200 }, { w: 2100, h: 1500 }, { w: 2400, h: 3000 }, { w: 413,  h: 531  },
  { w: 595,  h: 842  }, { w: 794,  h: 1123 }, { w: 3307, h: 4677 },
  // Ad banner sizes
  { w: 300,  h: 250  }, { w: 728,  h: 90   }, { w: 160,  h: 600  },
  { w: 300,  h: 600  }, { w: 320,  h: 50   }, { w: 970,  h: 250  },
  { w: 468,  h: 60   }, { w: 336,  h: 280  }, { w: 320,  h: 480  },
];
const RESIZE_FORMATS = ['image', 'jpg', 'jpeg', 'png', 'photo', 'webp', 'gif', 'bmp'] as const;

function resizeDimensionPages(): SeoPage[] {
  const pages: SeoPage[] = [];
  for (const fmt of RESIZE_FORMATS) {
    for (const { w, h } of RESIZE_DIMENSIONS) {
      const label = fmtLabel(fmt);
      const slug = `resize-${fmt}-to-${w}x${h}`;
      pages.push(
        makePage(
          slug,
          `Resize ${label} to ${w}×${h} Online Free`,
          `Resize ${label} to ${w}×${h} Pixels`,
          `Resize your ${label} to exactly ${w}×${h} pixels online for free. Browser-based, no upload, instant results.`,
          [
            `resize ${fmt} to ${w}x${h}`,
            `resize image to ${w}x${h}`,
            `${w}x${h} image resizer`,
            `change image size to ${w}x${h}`,
            `scale ${fmt} to ${w}x${h} pixels`,
            `resize photo to ${w}x${h}`,
          ],
          'resize-image',
          `Need your ${label} at exactly ${w}×${h} pixels? Upload it above, enter ${w} and ${h} as the target dimensions, and download the resized file instantly.`,
        ),
      );
    }
  }
  return pages;
}

// ---------------------------------------------------------------------------
// Resize Image — percentage-based pages
// ---------------------------------------------------------------------------

const RESIZE_PERCENTAGES = [10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90] as const;

function resizePercentagePages(): SeoPage[] {
  const pages: SeoPage[] = [];
  for (const fmt of RESIZE_FORMATS) {
    for (const pct of RESIZE_PERCENTAGES) {
      const label = fmtLabel(fmt);
      const slug = `resize-${fmt}-by-${pct}-percent`;
      const factor = pct === 50 ? 'half' : pct === 25 ? 'quarter' : pct === 75 ? 'three-quarters' : `${pct}%`;
      pages.push(
        makePage(
          slug,
          `Resize ${label} to ${pct}% — Scale Image by ${pct} Percent Free`,
          `Resize ${label} to ${pct}%`,
          `Scale your ${label} to ${pct}% of its original size online for free. Browser-based, no upload required.`,
          [
            `resize ${fmt} to ${pct} percent`,
            `scale image to ${pct}%`,
            `resize image by ${pct} percent`,
            `reduce image to ${factor}`,
            `${pct}% image resizer`,
            `shrink ${fmt} to ${pct} percent`,
          ],
          'resize-image',
          `Enter your image, set the scale to ${pct}%, and the tool automatically calculates the new dimensions. A ${pct}% resize maintains the original aspect ratio perfectly.`,
        ),
      );
    }
  }
  return pages;
}

// ---------------------------------------------------------------------------
// Resize Image — general / platform keyword variants
// ---------------------------------------------------------------------------

const RESIZE_GENERAL: SeoPage[] = [
  makePage(
    'resize-image-online-free',
    'Resize Image Online Free — No Upload Required',
    'Resize Image Online Free',
    'Resize any image to exact pixel dimensions online for free. Browser-based, works with JPG, PNG, WebP and more.',
    ['resize image online free', 'free image resizer online', 'resize photo online free', 'change image size online free', 'resize picture online free'],
    'resize-image',
    'Upload your image, enter target width and height, and download the resized result — all in your browser without sending a file to any server.',
  ),
  makePage(
    'resize-jpg-online-free',
    'Resize JPG Online Free — Fast JPEG Resizer',
    'Resize JPG Online Free',
    'Resize JPG/JPEG images online for free. Set exact pixel dimensions and download the resized JPEG instantly.',
    ['resize jpg online free', 'resize jpeg online', 'jpg resizer online', 'resize jpg image free', 'resize jpeg free online'],
    'resize-image',
    'Drop your JPG file in, set the target width and height, and download a resized JPEG in seconds — no upload, no watermark, completely free.',
  ),
  makePage(
    'resize-png-online-free',
    'Resize PNG Online Free — Fast PNG Resizer',
    'Resize PNG Online Free',
    'Resize PNG images online for free. Keep transparency, set exact dimensions and download the result.',
    ['resize png online free', 'png resizer online', 'resize png image free', 'resize transparent png online', 'change png image dimensions'],
    'resize-image',
    'PNG files support transparency. Our resizer preserves transparent areas when you scale a PNG to your target dimensions.',
  ),
  makePage(
    'resize-image-for-instagram',
    'Resize Image for Instagram — Free Online Resizer',
    'Resize Image for Instagram',
    'Resize images to perfect Instagram dimensions: 1080×1080 square, 1080×1350 portrait, or 1080×608 landscape.',
    ['resize image for instagram', 'instagram image resize', 'instagram photo size resizer', 'resize photo for instagram post', 'crop image for instagram'],
    'resize-image',
    'Instagram displays images at 1080×1080 (square post), 1080×1350 (portrait), or 1080×608 (landscape). Resize your image to one of these dimensions to avoid cropping by the app.',
  ),
  makePage(
    'resize-image-for-facebook',
    'Resize Image for Facebook — Free Online Tool',
    'Resize Image for Facebook',
    'Resize images to Facebook-recommended sizes. Cover photo, profile picture, post image and more.',
    ['resize image for facebook', 'facebook image resizer', 'resize photo for facebook', 'facebook cover photo size', 'facebook post image resize'],
    'resize-image',
    'Facebook recommends 851×315 for cover photos, 170×170 for profile pictures, and 1200×630 for link post images. Use the resizer above to hit these targets precisely.',
  ),
  makePage(
    'resize-image-for-twitter',
    'Resize Image for Twitter / X — Free Online Tool',
    'Resize Image for Twitter / X',
    'Resize images to Twitter and X recommended sizes. Profile photo, header and tweet images.',
    ['resize image for twitter', 'twitter image resizer', 'resize photo for twitter', 'twitter header image size', 'x image size resizer'],
    'resize-image',
    'Twitter / X recommends 400×400 for profile photos, 1500×500 for header images, and 1200×675 for in-tweet images. Resize your photos to these exact dimensions here.',
  ),
  makePage(
    'resize-image-for-youtube',
    'Resize Image for YouTube — Thumbnails & Channel Art',
    'Resize Image for YouTube',
    'Resize images to YouTube-recommended sizes: 1280×720 thumbnails and 2560×1440 channel art.',
    ['resize image for youtube', 'youtube thumbnail size resizer', 'resize photo for youtube', 'youtube channel art size', 'youtube thumbnail resize'],
    'resize-image',
    'YouTube recommends 1280×720 for video thumbnails and 2560×1440 for channel art banners. Get your images to those exact dimensions with this free browser-based resizer.',
  ),
  makePage(
    'resize-image-for-linkedin',
    'Resize Image for LinkedIn — Free Online Tool',
    'Resize Image for LinkedIn',
    'Resize images to LinkedIn-recommended sizes. Profile photo, banner and post images.',
    ['resize image for linkedin', 'linkedin image resizer', 'resize photo for linkedin', 'linkedin profile picture size', 'linkedin banner image resize'],
    'resize-image',
    'LinkedIn recommends 400×400 for profile photos, 1584×396 for banners, and 1200×627 for post images. Resize yours to perfect LinkedIn dimensions in one click.',
  ),
  makePage(
    'resize-image-for-whatsapp',
    'Resize Image for WhatsApp — DP & Status Size',
    'Resize Image for WhatsApp',
    'Resize images to fit WhatsApp display pictures and status. Recommended size: 192×192.',
    ['resize image for whatsapp', 'whatsapp dp size resizer', 'resize photo for whatsapp', 'whatsapp profile picture size', 'whatsapp status image size'],
    'resize-image',
    'WhatsApp profile pictures are displayed at 192×192 pixels. Resize your photo to this or any custom dimension with the free tool above.',
  ),
  makePage(
    'resize-image-without-losing-quality',
    'Resize Image Without Losing Quality — Free Tool',
    'Resize Image Without Losing Quality',
    'Resize images while maintaining the best possible quality. Free, browser-based tool.',
    ['resize image without losing quality', 'resize image without quality loss', 'high quality image resizer', 'resize photo without losing quality', 'scale image no quality loss'],
    'resize-image',
    'Our resizer uses the browser\'s Canvas API with bilinear interpolation to preserve as much detail as possible. Downscaling always produces sharp results; upscaling is done carefully to minimise blur.',
  ),
  makePage(
    'change-image-size-online',
    'Change Image Size Online — Free Pixel Resizer',
    'Change Image Size Online',
    'Change image dimensions online for free. Enter target width and height in pixels and download.',
    ['change image size online', 'change image dimensions online', 'change image resolution online', 'change picture size online free', 'image pixel size changer'],
    'resize-image',
    'Need a different pixel size? Enter your target width and height above. Aspect ratio lock prevents distortion when you change only one dimension.',
  ),
  makePage(
    'scale-image-online-free',
    'Scale Image Online Free — Upscale & Downscale',
    'Scale Image Online Free',
    'Scale any image up or down to new dimensions online for free. No upload, instant in-browser scaling.',
    ['scale image online free', 'scale photo online', 'upscale image online free', 'downscale image online', 'image scaling tool online'],
    'resize-image',
    'Scale an image to any dimensions — larger or smaller. The Canvas API handles both downscaling and upscaling within your browser, so no file ever leaves your device.',
  ),
  makePage(
    'make-image-smaller-online',
    'Make Image Smaller Online — Free Dimension Reducer',
    'Make Image Smaller Online',
    'Make any image smaller in pixels and file size online for free.',
    ['make image smaller online', 'make picture smaller online free', 'reduce image dimensions online', 'shrink image pixels online', 'make photo smaller online free'],
    'resize-image',
    'Making an image smaller reduces its pixel dimensions and usually its file size too. Enter the smaller target dimensions, download, and you\'re done.',
  ),
  makePage(
    'crop-and-resize-image-online',
    'Crop and Resize Image Online — Free Tool',
    'Crop and Resize Image Online',
    'Resize images to precise pixel dimensions online for free. Great for cropping by changing dimensions.',
    ['crop and resize image online', 'crop resize image free', 'crop image online free', 'crop photo and resize', 'resize and crop image tool'],
    'resize-image',
    'Resize to exact pixel dimensions — if your target has a different aspect ratio, the image will be stretched or you can first crop manually before resizing here.',
  ),
  makePage(
    'resize-image-kb',
    'Resize Image to Smaller KB — Reduce Dimensions & File Size',
    'Resize Image to Reduce File Size',
    'Reduce image file size by resizing to smaller pixel dimensions. Works instantly in your browser.',
    ['resize image kb', 'resize image reduce file size', 'resize image smaller file size', 'reduce image size by resizing', 'resize image to reduce kb'],
    'resize-image',
    'Reducing pixel dimensions is one of the most effective ways to shrink file size. Use our resizer to scale down dimensions; for file-size targeting, try our Compress Image tool.',
  ),
];

// ---------------------------------------------------------------------------
// Image to JPG variants
// ---------------------------------------------------------------------------

const JPG_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-jpg-online-free',
    'Convert Image to JPG Online Free — Fast Converter',
    'Convert Image to JPG Online Free',
    'Convert PNG, WebP, GIF, BMP and other images to JPG online for free. No upload, instant browser conversion.',
    ['convert image to jpg online free', 'image to jpg free', 'convert photo to jpg free', 'image to jpeg online free', 'free image to jpg converter'],
    'image-to-jpg',
    'Upload any image and download a JPG version instantly. Adjust quality with the slider for the best balance of file size and visual fidelity.',
  ),
  makePage(
    'convert-png-to-jpg-online',
    'Convert PNG to JPG Online — Free PNG to JPEG Converter',
    'Convert PNG to JPG Online',
    'Convert PNG images to JPG/JPEG format online for free. Fast, browser-based, no upload required.',
    ['convert png to jpg online', 'png to jpg converter', 'png to jpeg online free', 'change png to jpg free', 'png to jpg no upload'],
    'image-to-jpg',
    'PNG files are larger than JPG for photographs. Convert PNG to JPG to reduce file size while keeping the image looking great.',
  ),
  makePage(
    'convert-webp-to-jpg-online',
    'Convert WebP to JPG Online — Free Converter',
    'Convert WebP to JPG Online',
    'Convert WebP images to JPG format online for free. Instantly convert in your browser.',
    ['convert webp to jpg online', 'webp to jpg converter', 'webp to jpeg online free', 'change webp to jpg', 'webp to jpg no upload'],
    'image-to-jpg',
    'WebP files are not universally supported. Convert WebP to JPG for broad compatibility with all apps, email clients and printing services.',
  ),
  makePage(
    'convert-gif-to-jpg-online',
    'Convert GIF to JPG Online — Free Tool',
    'Convert GIF to JPG Online',
    'Convert GIF images to JPG format online for free. Extract the first frame as a high-quality JPEG.',
    ['convert gif to jpg online', 'gif to jpg converter', 'gif to jpeg online free', 'change gif to jpg', 'gif first frame to jpg'],
    'image-to-jpg',
    'Converting a GIF to JPG extracts the first frame as a static image. Use this when you need a JPEG thumbnail or preview from an animated GIF.',
  ),
  makePage(
    'convert-bmp-to-jpg-online',
    'Convert BMP to JPG Online — Free BMP to JPEG Converter',
    'Convert BMP to JPG Online',
    'Convert BMP images to JPG format online for free. BMP files are large — JPG is much smaller.',
    ['convert bmp to jpg online', 'bmp to jpg converter', 'bmp to jpeg online free', 'change bmp to jpg', 'bmp to jpg free'],
    'image-to-jpg',
    'BMP files are uncompressed and very large. Converting to JPG can reduce file size by 80–90% for typical photos.',
  ),
  makePage(
    'convert-heic-to-jpg-online',
    'Convert HEIC to JPG Online — Free Tool',
    'Convert HEIC to JPG Online',
    'Convert HEIC / HEIF images to JPG online for free. Works in your browser without plugins.',
    ['convert heic to jpg online', 'heic to jpg converter', 'heic to jpeg online free', 'change heic to jpg', 'iphone heic to jpg'],
    'image-to-jpg',
    'iPhone photos are often saved as HEIC. Upload your HEIC file here to get a universally compatible JPG.',
  ),
  makePage(
    'png-to-jpeg-converter-online',
    'PNG to JPEG Converter Online — Free & Fast',
    'PNG to JPEG Converter Online',
    'Convert PNG images to JPEG with one click. Adjust quality and download instantly.',
    ['png to jpeg converter online', 'png to jpeg converter free', 'convert png to jpeg', 'png to jpg quality converter', 'png jpeg converter'],
    'image-to-jpg',
    'Select a quality level between 1 and 100 before converting. Higher quality means larger files; lower quality means smaller files with more compression artifacts.',
  ),
  makePage(
    'image-to-jpeg-converter',
    'Image to JPEG Converter — Online & Free',
    'Image to JPEG Converter Online',
    'Convert any image to JPEG format online. Set quality, convert and download for free.',
    ['image to jpeg converter', 'image to jpeg online', 'convert image to jpeg free', 'photo to jpeg converter', 'image jpeg converter online'],
    'image-to-jpg',
    'JPEG is the standard format for photographs on the web. Convert any image format to JPEG here for maximum compatibility and smaller file sizes.',
  ),
  makePage(
    'reduce-jpg-file-size-online',
    'Reduce JPG File Size Online — Free JPEG Reducer',
    'Reduce JPG File Size Online',
    'Reduce JPG file size by adjusting quality. Convert and compress JPEG images online for free.',
    ['reduce jpg file size online', 'reduce jpeg file size', 'compress jpg online', 'jpg file size reducer', 'make jpg smaller online'],
    'image-to-jpg',
    'Use the quality slider to reduce JPG file size. A quality of 80 typically cuts file size in half while maintaining excellent visual quality.',
  ),
  makePage(
    'convert-image-to-jpg-without-losing-quality',
    'Convert Image to JPG Without Losing Quality — Free',
    'Convert Image to JPG Without Losing Quality',
    'Convert images to JPG at maximum quality settings. Free browser-based converter.',
    ['convert image to jpg without losing quality', 'high quality jpg converter', 'jpg conversion no quality loss', 'convert png to jpg keep quality', 'lossless jpg conversion'],
    'image-to-jpg',
    'Set the quality slider to 95–100 for near-lossless conversion. The resulting JPEG will be visually identical to the original while remaining universally compatible.',
  ),
];

// ---------------------------------------------------------------------------
// Image to PNG variants
// ---------------------------------------------------------------------------

const PNG_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-png-online-free',
    'Convert Image to PNG Online Free — Transparent Support',
    'Convert Image to PNG Online Free',
    'Convert JPG, WebP, GIF, BMP and other images to PNG online for free. Keeps transparency where supported.',
    ['convert image to png online free', 'image to png free', 'convert photo to png free', 'jpg to png online free', 'free image to png converter'],
    'image-to-png',
    'Upload any image and download a PNG version. PNG supports transparency so transparent areas in your original are preserved.',
  ),
  makePage(
    'convert-jpg-to-png-online',
    'Convert JPG to PNG Online — Free JPEG to PNG Converter',
    'Convert JPG to PNG Online',
    'Convert JPEG images to PNG format online for free. Get a transparent-capable PNG from any JPEG.',
    ['convert jpg to png online', 'jpg to png converter', 'jpeg to png online free', 'change jpg to png free', 'jpg to png no upload'],
    'image-to-png',
    'Converting JPG to PNG gives you a lossless format that doesn\'t degrade on repeated saves. Essential for graphics, logos, and any image that needs transparency.',
  ),
  makePage(
    'convert-webp-to-png-online',
    'Convert WebP to PNG Online — Free Converter',
    'Convert WebP to PNG Online',
    'Convert WebP images to PNG format online for free. Preserves transparency from WebP files.',
    ['convert webp to png online', 'webp to png converter', 'webp to png online free', 'change webp to png', 'webp png converter'],
    'image-to-png',
    'WebP supports transparency. Converting WebP to PNG preserves the transparent areas so you can use the image in any design tool.',
  ),
  makePage(
    'convert-gif-to-png-online',
    'Convert GIF to PNG Online — Free Tool',
    'Convert GIF to PNG Online',
    'Convert GIF images to PNG format online for free. Gets the first frame as a PNG.',
    ['convert gif to png online', 'gif to png converter', 'gif to png online free', 'change gif to png', 'gif frame to png'],
    'image-to-png',
    'Extract the first frame of a GIF as a high-quality PNG. Perfect for getting a static thumbnail from an animated GIF.',
  ),
  makePage(
    'convert-bmp-to-png-online',
    'Convert BMP to PNG Online — Free Converter',
    'Convert BMP to PNG Online',
    'Convert BMP files to PNG online for free. PNG is smaller and more compatible than BMP.',
    ['convert bmp to png online', 'bmp to png converter', 'bmp to png online free', 'change bmp to png', 'bmp png converter free'],
    'image-to-png',
    'BMP is an old, uncompressed format. PNG achieves similar lossless quality with far smaller file sizes.',
  ),
  makePage(
    'jpg-to-png-transparent-background',
    'JPG to PNG Transparent Background — Free Online',
    'JPG to PNG With Transparent Background',
    'Convert JPG to PNG online for free. PNG supports transparent backgrounds unlike JPG.',
    ['jpg to png transparent background', 'convert jpg to png transparency', 'jpg to transparent png', 'jpg to png with alpha', 'add transparency to jpg'],
    'image-to-png',
    'JPG doesn\'t support transparency. Converting to PNG gives you an alpha channel so you can remove backgrounds or overlay the image on other designs.',
  ),
  makePage(
    'convert-image-to-png-lossless',
    'Convert Image to PNG Lossless — Free Online Tool',
    'Convert Image to PNG Lossless',
    'Convert any image to lossless PNG format online for free. No compression artifacts.',
    ['convert image to png lossless', 'lossless png conversion', 'image to lossless png free', 'png lossless converter', 'convert to png no quality loss'],
    'image-to-png',
    'PNG uses lossless compression — every pixel is stored exactly, with no compression artifacts. Ideal for screenshots, icons, and graphics that need pixel-perfect accuracy.',
  ),
  makePage(
    'png-converter-online-free',
    'PNG Converter Online Free — Convert Any Image to PNG',
    'PNG Converter Online Free',
    'Free online PNG converter. Convert any image format to PNG in your browser.',
    ['png converter online free', 'online png converter', 'free png converter', 'image to png converter online', 'convert to png free'],
    'image-to-png',
    'Supports JPG, WebP, GIF, BMP, and other browser-readable formats. Upload your file and download a PNG in one click.',
  ),
];

// ---------------------------------------------------------------------------
// Image to WebP variants
// ---------------------------------------------------------------------------

const WEBP_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-webp-online-free',
    'Convert Image to WebP Online Free — Fast & Easy',
    'Convert Image to WebP Online Free',
    'Convert JPG, PNG, GIF and other images to WebP format online for free. WebP is smaller and faster.',
    ['convert image to webp online free', 'image to webp free', 'jpg to webp online free', 'png to webp free', 'free webp converter'],
    'image-to-webp',
    'WebP images are 25–35% smaller than JPG at the same quality. Convert your images to WebP for faster websites and lower bandwidth costs.',
  ),
  makePage(
    'convert-jpg-to-webp-online',
    'Convert JPG to WebP Online — Free JPEG to WebP Converter',
    'Convert JPG to WebP Online',
    'Convert JPEG images to WebP format online for free. Smaller file, same visual quality.',
    ['convert jpg to webp online', 'jpg to webp converter', 'jpeg to webp online free', 'change jpg to webp', 'jpg to webp no upload'],
    'image-to-webp',
    'WebP is Google\'s modern image format. Converting JPG to WebP can reduce file size by 25–40% with no visible quality loss at equivalent settings.',
  ),
  makePage(
    'convert-png-to-webp-online',
    'Convert PNG to WebP Online — Free PNG to WebP Converter',
    'Convert PNG to WebP Online',
    'Convert PNG images to WebP online for free. WebP supports transparency and lossless compression.',
    ['convert png to webp online', 'png to webp converter', 'png to webp online free', 'change png to webp', 'png webp converter'],
    'image-to-webp',
    'WebP supports both lossless and transparent (alpha) images, making it a great alternative to PNG for web graphics.',
  ),
  makePage(
    'convert-gif-to-webp-online',
    'Convert GIF to WebP Online — Free Tool',
    'Convert GIF to WebP Online',
    'Convert GIF to static WebP online for free. Smaller and faster to load than GIF.',
    ['convert gif to webp online', 'gif to webp converter', 'gif to webp online free', 'animated gif to webp', 'gif webp free converter'],
    'image-to-webp',
    'Convert GIF frames to WebP to get a lightweight, high-quality static image suitable for web use.',
  ),
  makePage(
    'jpg-to-webp-converter-online',
    'JPG to WebP Converter Online — Compress to WebP Free',
    'JPG to WebP Converter Online',
    'Convert JPG to WebP online. Smaller file sizes for faster page loading.',
    ['jpg to webp converter online', 'jpeg webp converter', 'jpg to webp free tool', 'convert jpeg to webp online', 'jpg webp online converter'],
    'image-to-webp',
    'Switching from JPG to WebP is one of the easiest ways to speed up your website. Smaller WebP files load faster, improving Core Web Vitals and SEO scores.',
  ),
  makePage(
    'webp-converter-online-free',
    'WebP Converter Online Free — Convert Any Image to WebP',
    'WebP Converter Online Free',
    'Free online WebP converter. Convert any image to WebP format in your browser.',
    ['webp converter online free', 'online webp converter', 'free webp image converter', 'convert to webp online', 'image webp converter'],
    'image-to-webp',
    'WebP is supported by all modern browsers. Use this free converter to produce WebP files from any image format.',
  ),
  makePage(
    'convert-image-to-webp-for-website',
    'Convert Image to WebP for Website — Faster Page Speed',
    'Convert Image to WebP for Your Website',
    'Convert images to WebP to speed up your website. WebP is the fastest image format for the web.',
    ['convert image to webp for website', 'webp images for website', 'optimise images for website webp', 'webp for web performance', 'convert jpg png to webp for web'],
    'image-to-webp',
    'Google PageSpeed Insights often flags "Serve images in next-gen formats". Converting your images to WebP directly addresses this recommendation.',
  ),
  makePage(
    'reduce-image-size-webp',
    'Reduce Image Size with WebP — Free Online Converter',
    'Reduce Image Size by Converting to WebP',
    'Convert images to WebP to significantly reduce file size. Free, browser-based converter.',
    ['reduce image size webp', 'smaller image webp', 'webp reduce file size', 'compress image by converting to webp', 'webp image size reduction'],
    'image-to-webp',
    'WebP achieves 25–35% smaller files than JPEG at equivalent quality. Converting to WebP is one of the most impactful changes you can make for web performance.',
  ),
];

// ---------------------------------------------------------------------------
// Image to PDF variants
// ---------------------------------------------------------------------------

const PDF_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-pdf-online-free',
    'Convert Image to PDF Online Free — JPG, PNG, WebP to PDF',
    'Convert Image to PDF Online Free',
    'Convert JPG, PNG, WebP and other images to PDF online for free. No upload, instant in your browser.',
    ['convert image to pdf online free', 'image to pdf free', 'jpg to pdf online free', 'png to pdf free', 'photo to pdf online free'],
    'image-to-pdf',
    'Upload any image and download a PDF in seconds. Perfect for sharing photos as documents or creating single-page PDF files from images.',
  ),
  makePage(
    'convert-jpg-to-pdf-online',
    'Convert JPG to PDF Online — Free JPEG to PDF Converter',
    'Convert JPG to PDF Online',
    'Convert JPEG images to PDF documents online for free. Browser-based, no upload required.',
    ['convert jpg to pdf online', 'jpg to pdf converter', 'jpeg to pdf online free', 'change jpg to pdf', 'jpg pdf converter free'],
    'image-to-pdf',
    'Convert any JPG photo to a PDF document instantly. Ideal for sending photos as printable documents, creating portfolios, or meeting PDF upload requirements.',
  ),
  makePage(
    'convert-png-to-pdf-online',
    'Convert PNG to PDF Online — Free PNG to PDF Tool',
    'Convert PNG to PDF Online',
    'Convert PNG images to PDF documents online for free. Preserves full image quality.',
    ['convert png to pdf online', 'png to pdf converter', 'png to pdf online free', 'change png to pdf', 'png pdf free converter'],
    'image-to-pdf',
    'Convert PNG screenshots, graphics or photos to PDF for sharing, printing, or archiving. The PDF preserves the full resolution of the original PNG.',
  ),
  makePage(
    'photo-to-pdf-converter-online',
    'Photo to PDF Converter Online — Free & Fast',
    'Photo to PDF Converter Online',
    'Convert any photo to a PDF document online for free. Fast, browser-based, no plugins needed.',
    ['photo to pdf converter online', 'convert photo to pdf free', 'picture to pdf online', 'photo pdf converter', 'image to pdf document free'],
    'image-to-pdf',
    'Turn any photo into a printable PDF document. Great for medical forms, travel documents, or any service that requires a PDF instead of an image file.',
  ),
  makePage(
    'jpg-to-pdf-no-upload',
    'JPG to PDF — No Upload Required, 100% Browser-Based',
    'JPG to PDF Online Without Upload',
    'Convert JPG to PDF without uploading to a server. 100% private, browser-based conversion.',
    ['jpg to pdf no upload', 'convert jpg to pdf without upload', 'jpg to pdf private', 'jpg to pdf local browser', 'offline jpg to pdf converter'],
    'image-to-pdf',
    'Your image never leaves your device. The PDF is generated entirely in your browser using jsPDF, so conversion is instant and completely private.',
  ),
  makePage(
    'convert-screenshot-to-pdf',
    'Convert Screenshot to PDF Online Free',
    'Convert Screenshot to PDF Online',
    'Convert screenshots (PNG, JPG) to PDF online for free. Perfect for saving web pages and documents.',
    ['convert screenshot to pdf', 'screenshot to pdf online free', 'png screenshot to pdf', 'save screenshot as pdf', 'screenshot pdf converter'],
    'image-to-pdf',
    'Save screenshots as PDF files for easy sharing and archiving. Upload your screenshot PNG or JPG and download a properly formatted PDF.',
  ),
  makePage(
    'multiple-images-to-pdf-online',
    'Multiple Images to PDF Online — Combine Images Into PDF',
    'Convert Multiple Images to PDF Online',
    'Combine multiple images into a single PDF document online for free.',
    ['multiple images to pdf online', 'combine images into pdf', 'merge images to pdf', 'batch image to pdf', 'convert images to single pdf'],
    'image-to-pdf',
    'Process images one at a time — each produces a single-page PDF. For multi-page documents, convert each image and merge the resulting PDFs using a PDF merge tool.',
  ),
];

// ---------------------------------------------------------------------------
// Image to Grayscale variants
// ---------------------------------------------------------------------------

const GRAYSCALE_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-grayscale-online',
    'Convert Image to Grayscale Online — Free B&W Tool',
    'Convert Image to Grayscale Online',
    'Convert colour images to black and white (grayscale) online for free. Fast, browser-based conversion.',
    ['convert image to grayscale online', 'image to grayscale free', 'photo to black and white online', 'grayscale converter online', 'black and white image converter'],
    'image-to-grayscale',
    'Turn any colour photo into a grayscale image with one click. Perfect for artistic effects, accessibility testing, or preparing images for monochrome printing.',
  ),
  makePage(
    'convert-photo-to-black-and-white-online',
    'Convert Photo to Black and White Online — Free Tool',
    'Convert Photo to Black and White Online',
    'Convert colour photos to black and white online for free. Instant browser-based conversion.',
    ['convert photo to black and white online', 'photo black and white converter', 'black white photo converter free', 'turn photo black and white online', 'bw photo converter online'],
    'image-to-grayscale',
    'Classic black-and-white photography has timeless appeal. Convert your colour photos to B&W instantly with no account or software installation.',
  ),
  makePage(
    'jpg-to-grayscale-online',
    'JPG to Grayscale Online — Convert JPEG to Black & White',
    'JPG to Grayscale Online',
    'Convert JPEG images to grayscale (black and white) online for free.',
    ['jpg to grayscale online', 'jpeg to grayscale converter', 'convert jpg to black and white', 'jpg black white online', 'jpeg grayscale converter free'],
    'image-to-grayscale',
    'Upload a JPEG and download a grayscale version. The luminance-weighted conversion formula ensures natural-looking B&W results.',
  ),
  makePage(
    'png-to-grayscale-online',
    'PNG to Grayscale Online — Convert PNG to Black & White',
    'PNG to Grayscale Online',
    'Convert PNG images to grayscale online for free. Keeps transparency from the original PNG.',
    ['png to grayscale online', 'png to black and white converter', 'convert png grayscale', 'png grayscale free', 'transparent png to grayscale'],
    'image-to-grayscale',
    'Convert PNG graphics to grayscale while preserving any transparent areas — ideal for icon sets that need a greyed-out disabled state.',
  ),
  makePage(
    'remove-color-from-image-online',
    'Remove Colour from Image Online — Free Desaturate Tool',
    'Remove Colour from Image Online',
    'Remove all colour from an image online for free, converting it to grayscale instantly.',
    ['remove color from image online', 'desaturate image online', 'remove colour from photo online', 'desaturate photo free', 'image desaturator online'],
    'image-to-grayscale',
    'Removing colour (desaturating) an image converts it to shades of grey. Use this tool for artistic effects or to prepare images for grayscale printing.',
  ),
  makePage(
    'grayscale-image-converter-free',
    'Grayscale Image Converter Free — Online Black & White Filter',
    'Grayscale Image Converter Free',
    'Free online grayscale image converter. Turn any colour image into black and white.',
    ['grayscale image converter free', 'free grayscale converter', 'online grayscale image tool', 'colour to grayscale image converter', 'b&w image converter online'],
    'image-to-grayscale',
    'Instantly apply a grayscale filter to any image online. No software needed — the conversion runs locally in your browser.',
  ),
];

// ---------------------------------------------------------------------------
// Image to Base64 variants
// ---------------------------------------------------------------------------

const BASE64_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-base64-online',
    'Convert Image to Base64 Online — Free Encoder',
    'Convert Image to Base64 Online',
    'Encode any image as a Base64 string online for free. Copy the data URI for use in HTML, CSS, or JavaScript.',
    ['convert image to base64 online', 'image to base64 encoder', 'base64 image converter', 'jpg to base64 online', 'png to base64 online free'],
    'image-to-base64',
    'Base64-encoded images can be embedded directly in HTML, CSS, or JavaScript — no separate image file needed. Upload your image and copy the data URI string.',
  ),
  makePage(
    'image-to-data-uri-online',
    'Image to Data URI Online — Free Base64 Converter',
    'Image to Data URI Online',
    'Convert images to data URI (Base64) format online for free. Use directly in HTML or CSS.',
    ['image to data uri online', 'image data uri converter', 'data uri generator online', 'base64 data uri image', 'inline image base64 converter'],
    'image-to-base64',
    'Data URIs let you embed images inline in HTML or CSS without additional HTTP requests. Convert your image to a data URI here and paste it directly into your code.',
  ),
  makePage(
    'jpg-to-base64-online',
    'JPG to Base64 Online — Free JPEG Base64 Encoder',
    'JPG to Base64 Online',
    'Convert JPEG images to Base64 strings online for free. Get a ready-to-use data URI.',
    ['jpg to base64 online', 'jpeg to base64 converter', 'encode jpg base64 free', 'base64 jpeg encoder', 'jpg base64 string online'],
    'image-to-base64',
    'Encode a JPEG image as a Base64 string for use in web projects, emails, or API responses that require inline images.',
  ),
  makePage(
    'png-to-base64-online',
    'PNG to Base64 Online — Free PNG Base64 Encoder',
    'PNG to Base64 Online',
    'Convert PNG images to Base64 strings online for free. Includes transparent PNGs.',
    ['png to base64 online', 'png base64 converter', 'encode png base64 free', 'base64 png encoder', 'png to base64 data uri'],
    'image-to-base64',
    'Encode PNG images — including those with transparent backgrounds — as Base64 strings for embedding in web pages without additional HTTP requests.',
  ),
  makePage(
    'base64-image-encoder-online',
    'Base64 Image Encoder Online — Free Tool',
    'Base64 Image Encoder Online',
    'Free online tool to encode images as Base64. Supports JPG, PNG, WebP, GIF and more.',
    ['base64 image encoder online', 'online base64 encoder image', 'image base64 encode tool', 'encode image as base64', 'base64 encode photo online'],
    'image-to-base64',
    'Upload any browser-supported image format and get a Base64-encoded string ready to paste into your project. Great for embedding logos, icons, and small graphics.',
  ),
];

// ---------------------------------------------------------------------------
// Image to Text (OCR) variants
// ---------------------------------------------------------------------------

const TEXT_PAGES: SeoPage[] = [
  makePage(
    'extract-text-from-image-online',
    'Extract Text from Image Online — Free OCR Tool',
    'Extract Text from Image Online',
    'Extract text from any image online for free using OCR. Supports JPG, PNG, WebP and scanned photos.',
    ['extract text from image online', 'ocr online free', 'image to text converter online', 'extract text from photo', 'ocr image to text free'],
    'image-to-text',
    'Upload a photo, screenshot, or scanned document and the OCR engine extracts all visible text. Copy the result and use it anywhere.',
  ),
  makePage(
    'ocr-online-free',
    'OCR Online Free — Image to Text Converter',
    'OCR Online Free',
    'Free online OCR (Optical Character Recognition). Convert scanned images and photos to editable text.',
    ['ocr online free', 'free ocr tool online', 'ocr text recognition online', 'online optical character recognition', 'free image ocr'],
    'image-to-text',
    'Powered by Tesseract.js — an industry-standard OCR engine — this tool recognises text in photos and scanned documents with high accuracy.',
  ),
  makePage(
    'convert-image-to-text-online',
    'Convert Image to Text Online — Free OCR Converter',
    'Convert Image to Text Online',
    'Convert images to editable text online for free with OCR. Supports English and many other languages.',
    ['convert image to text online', 'image to text free', 'photo to text online', 'convert photo to text', 'picture to text converter online'],
    'image-to-text',
    'Turn a photo of a document, receipt, sign, or whiteboard into editable, copyable text in seconds.',
  ),
  makePage(
    'scan-image-to-text-online',
    'Scan Image to Text Online — Free OCR Scanner',
    'Scan Image to Text Online',
    'Scan any image and extract text online for free. No scanner hardware needed — works with photos.',
    ['scan image to text online', 'scan image extract text', 'online image scanner text', 'scan photo text free', 'ocr scan image online'],
    'image-to-text',
    'No flatbed scanner needed. Photograph a document with your phone and upload it here to extract the text instantly.',
  ),
  makePage(
    'jpg-to-text-online-free',
    'JPG to Text Online Free — JPEG OCR Tool',
    'JPG to Text Online Free',
    'Convert JPEG images to text using OCR online for free. Fast, browser-based extraction.',
    ['jpg to text online free', 'jpeg to text converter', 'ocr jpg online free', 'extract text jpg', 'convert jpg image to text'],
    'image-to-text',
    'Upload a JPG photo of printed or handwritten text and the OCR engine will extract it into editable form.',
  ),
  makePage(
    'png-to-text-online-free',
    'PNG to Text Online Free — PNG OCR Tool',
    'PNG to Text Online Free',
    'Convert PNG screenshots and images to text using OCR online for free.',
    ['png to text online free', 'png to text converter', 'ocr png online free', 'extract text png', 'convert png image to text'],
    'image-to-text',
    'Perfect for extracting text from screenshots, infographics, or PNG-format documents. Upload and copy the recognised text.',
  ),
];

// ---------------------------------------------------------------------------
// Image to Favicon variants
// ---------------------------------------------------------------------------

const FAVICON_PAGES: SeoPage[] = [
  makePage(
    'create-favicon-from-image-online',
    'Create Favicon from Image Online — Free ICO Generator',
    'Create Favicon from Image Online',
    'Create a favicon (.ico) from any image online for free. Generates multiple sizes for all browsers.',
    ['create favicon from image online', 'favicon generator from image', 'image to favicon ico online', 'favicon creator online free', 'generate favicon from png'],
    'image-to-favicon',
    'Turn any image into a website favicon. The tool generates a multi-resolution .ico file containing 16×16, 32×32, and 48×48 variants — everything modern browsers need.',
  ),
  makePage(
    'png-to-favicon-online',
    'PNG to Favicon Online — Free ICO Converter',
    'PNG to Favicon Online',
    'Convert PNG images to favicon (.ico) format online for free. Multiple sizes included.',
    ['png to favicon online', 'png to ico converter', 'convert png to favicon free', 'png ico generator', 'favicon from png free'],
    'image-to-favicon',
    'Upload a PNG logo or icon and download a .ico favicon with all common sizes bundled in one file.',
  ),
  makePage(
    'favicon-generator-online-free',
    'Favicon Generator Online Free — Create ICO File',
    'Favicon Generator Online Free',
    'Free online favicon generator. Upload any image and create a professional .ico favicon in seconds.',
    ['favicon generator online free', 'online favicon generator', 'free favicon maker', 'favicon creator from image', 'make favicon online'],
    'image-to-favicon',
    'A favicon helps users recognise your site in browser tabs and bookmarks. Create yours in seconds by uploading a PNG, JPG, or any other image format.',
  ),
  makePage(
    'jpg-to-favicon-online',
    'JPG to Favicon Online — JPEG to ICO Converter',
    'JPG to Favicon Online',
    'Convert JPEG images to a favicon .ico file online for free.',
    ['jpg to favicon online', 'jpeg to ico converter', 'convert jpg to favicon', 'jpg ico generator online', 'jpeg favicon maker free'],
    'image-to-favicon',
    'Upload any JPEG and generate a favicon that works in all modern browsers and devices.',
  ),
  makePage(
    'image-to-ico-converter-online',
    'Image to ICO Converter Online — Free Favicon Tool',
    'Image to ICO Converter Online',
    'Convert images to ICO format online for free. Creates favicon-ready ICO files with multiple resolutions.',
    ['image to ico converter online', 'image to ico free', 'convert image to ico', 'ico converter online', 'make ico from image'],
    'image-to-favicon',
    'ICO files can contain multiple icon sizes in a single file. Upload your image and get a favicon-ready ICO with 16px, 32px, and 48px variants included.',
  ),
];

// ---------------------------------------------------------------------------
// Image to SVG variants
// ---------------------------------------------------------------------------

const SVG_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-svg-online',
    'Convert Image to SVG Online — Free Vectorizer',
    'Convert Image to SVG Online',
    'Convert raster images (JPG, PNG) to SVG vector format online for free.',
    ['convert image to svg online', 'image to svg converter free', 'jpg to svg online', 'png to svg free', 'raster to vector online free'],
    'image-to-svg',
    'Convert bitmap images to scalable SVG format. SVG images look sharp at any size — perfect for logos and icons.',
  ),
  makePage(
    'png-to-svg-online-free',
    'PNG to SVG Online Free — Convert PNG to Vector',
    'PNG to SVG Online Free',
    'Convert PNG images to SVG vector format online for free. Scale to any size without quality loss.',
    ['png to svg online free', 'png to svg converter', 'convert png to svg', 'png vectorizer online', 'png to svg free tool'],
    'image-to-svg',
    'SVG files scale infinitely without pixelation. Convert your PNG logo or graphic to SVG so it looks sharp on any screen resolution.',
  ),
  makePage(
    'jpg-to-svg-online-free',
    'JPG to SVG Online Free — JPEG to Vector Converter',
    'JPG to SVG Online Free',
    'Convert JPEG images to SVG vector format online for free.',
    ['jpg to svg online free', 'jpeg to svg converter', 'convert jpg to svg', 'jpg vectorizer online', 'jpg to svg free tool'],
    'image-to-svg',
    'Turn a JPEG image into an SVG vector graphic. Best suited for images with limited colours like logos and icons rather than photographs.',
  ),
  makePage(
    'image-vectorizer-online-free',
    'Image Vectorizer Online Free — Convert Raster to Vector',
    'Image Vectorizer Online Free',
    'Free online image vectorizer. Convert raster images (PNG, JPG) to scalable SVG vectors.',
    ['image vectorizer online free', 'free online vectorizer', 'raster to vector converter online', 'vectorize image free', 'online image to vector tool'],
    'image-to-svg',
    'Vectorization converts a pixel-based raster image into mathematical paths. The result is an SVG file that can be scaled to any size without losing clarity.',
  ),
  makePage(
    'logo-to-svg-online',
    'Logo to SVG Online — Convert Logo Image to Vector Free',
    'Logo to SVG Online',
    'Convert logo images to SVG vector format online for free. Perfect for responsive logos.',
    ['logo to svg online', 'convert logo to svg', 'logo vectorizer online free', 'logo svg converter', 'make logo svg online'],
    'image-to-svg',
    'Logos must look sharp at every size from a 16px favicon to a large retina display. Converting to SVG achieves this with a single file.',
  ),
];

// ---------------------------------------------------------------------------
// Image to QR Code variants
// ---------------------------------------------------------------------------

const QR_PAGES: SeoPage[] = [
  makePage(
    'image-to-qr-code-online',
    'Image to QR Code Online — Free QR Generator',
    'Image to QR Code Online',
    'Generate a QR code from a URL or text online for free. Download as PNG or SVG.',
    ['image to qr code online', 'qr code generator online', 'free qr code generator', 'create qr code online free', 'qr code maker online'],
    'image-to-qr',
    'Generate a scannable QR code that links to any URL or contains any text. Download it as a high-resolution PNG and use it on print or digital media.',
  ),
  makePage(
    'qr-code-generator-free',
    'QR Code Generator Free — Create QR Codes Online',
    'QR Code Generator Free',
    'Free QR code generator. Create QR codes for URLs, text, Wi-Fi and more. Download as PNG.',
    ['qr code generator free', 'free qr code maker', 'qr generator online', 'generate qr code free', 'qr code creator free'],
    'image-to-qr',
    'Enter any URL or text and instantly generate a high-quality QR code. No registration required — just create and download.',
  ),
  makePage(
    'create-qr-code-from-url',
    'Create QR Code from URL — Free Online QR Generator',
    'Create QR Code from URL',
    'Create a scannable QR code from any URL online for free. Ideal for print, business cards, and signage.',
    ['create qr code from url', 'url to qr code', 'qr code from link free', 'website qr code generator', 'link to qr code online'],
    'image-to-qr',
    'Paste your URL and generate a QR code for it. Perfect for business cards, flyers, posters, or any printed material where you want to link to a website.',
  ),
  makePage(
    'qr-code-generator-for-business',
    'QR Code Generator for Business — Free Online Tool',
    'QR Code Generator for Business',
    'Create professional QR codes for business use. Free, high-resolution, downloadable as PNG.',
    ['qr code generator for business', 'business qr code maker', 'professional qr code generator', 'free qr code for business', 'commercial qr code generator'],
    'image-to-qr',
    'Use QR codes on business cards, menus, product labels, store windows, and promotional materials. Generate a high-resolution code and download it instantly.',
  ),
];

// ---------------------------------------------------------------------------
// Image to Color Palette variants
// ---------------------------------------------------------------------------

const COLOR_PALETTE_PAGES: SeoPage[] = [
  makePage(
    'extract-colors-from-image-online',
    'Extract Colors from Image Online — Free Color Palette Tool',
    'Extract Colors from Image Online',
    'Extract dominant colors from any image online for free. Get a hex color palette instantly.',
    ['extract colors from image online', 'image color extractor', 'color palette from image free', 'dominant color extractor online', 'hex colors from image'],
    'image-to-color-palette',
    'Upload any image and get the dominant hex colour values in seconds. Useful for matching brand colours, creating themes, or analysing photo colour schemes.',
  ),
  makePage(
    'color-palette-generator-from-image',
    'Color Palette Generator from Image — Free Online Tool',
    'Color Palette Generator from Image',
    'Generate a color palette from any image online for free. Get hex codes for the dominant colours.',
    ['color palette generator from image', 'image palette generator', 'generate color palette from image', 'colour palette from image free', 'photo color palette generator'],
    'image-to-color-palette',
    'Get a beautiful colour palette from any photo. Perfect for designers matching a brand to photography or finding complementary colour combinations.',
  ),
  makePage(
    'image-color-picker-online',
    'Image Color Picker Online — Extract Hex Codes Free',
    'Image Color Picker Online',
    'Pick and extract colors from images online for free. Get hex, RGB color codes instantly.',
    ['image color picker online', 'color picker from image', 'eyedropper tool online', 'pick color from image free', 'image hex color picker'],
    'image-to-color-palette',
    'Upload an image and extract hex and RGB values for its dominant colours. Essential for web designers and digital artists.',
  ),
  makePage(
    'dominant-color-finder-online',
    'Dominant Color Finder Online — Free Image Color Analyser',
    'Dominant Color Finder Online',
    'Find the dominant colours in any image online for free. Get hex codes for the top colours.',
    ['dominant color finder online', 'find dominant color in image', 'image dominant color extractor', 'main color image tool', 'colour analysis image online'],
    'image-to-color-palette',
    'The tool analyses your image and identifies the most prominent colours using k-means clustering, returning them as hex codes you can copy and use immediately.',
  ),
];

// ---------------------------------------------------------------------------
// Image to ASCII variants
// ---------------------------------------------------------------------------

const ASCII_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-ascii-art-online',
    'Convert Image to ASCII Art Online — Free Tool',
    'Convert Image to ASCII Art Online',
    'Convert any image to ASCII art online for free. Download as text or image.',
    ['convert image to ascii art online', 'image to ascii converter', 'ascii art generator from image', 'photo to ascii art free', 'ascii art maker online'],
    'image-to-ascii',
    'Turn any photo into ASCII art — a mosaic of text characters that recreates the image. Download the result as text or a PNG image.',
  ),
  makePage(
    'photo-to-ascii-art-free',
    'Photo to ASCII Art Free — Online ASCII Generator',
    'Photo to ASCII Art Free',
    'Convert photos to ASCII art for free online. Adjustable resolution and character sets.',
    ['photo to ascii art free', 'photo ascii art generator', 'turn photo into ascii art', 'free ascii art from photo', 'image to text art online'],
    'image-to-ascii',
    'Choose the density of characters to control the detail level. Higher density produces sharper ASCII art; lower density creates a more abstract effect.',
  ),
  makePage(
    'ascii-art-generator-online-free',
    'ASCII Art Generator Online Free — Image to Text Art',
    'ASCII Art Generator Online Free',
    'Generate ASCII art from any image online for free. Classic text art in your browser.',
    ['ascii art generator online free', 'free ascii art generator', 'ascii image generator online', 'text art generator from image', 'online ascii art maker'],
    'image-to-ascii',
    'Classic ASCII art converts images into grids of printable characters. Use this free generator to create ASCII art for code comments, README files, or just for fun.',
  ),
];

// ---------------------------------------------------------------------------
// Image to Pixel Art variants
// ---------------------------------------------------------------------------

const PIXEL_ART_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-pixel-art-online',
    'Convert Image to Pixel Art Online — Free Pixelator',
    'Convert Image to Pixel Art Online',
    'Convert any image to pixel art online for free. Choose pixel block size and download.',
    ['convert image to pixel art online', 'image to pixel art converter', 'pixelate image online free', 'pixel art generator from image', 'photo to pixel art free'],
    'image-to-pixel-art',
    'Turn any photo into retro pixel art by choosing a pixel block size. Larger blocks create a more pixelated look; smaller blocks keep more detail.',
  ),
  makePage(
    'pixelate-image-online-free',
    'Pixelate Image Online Free — Free Pixelation Tool',
    'Pixelate Image Online Free',
    'Pixelate any image online for free. Control pixel size for the perfect retro look.',
    ['pixelate image online free', 'image pixelator online', 'pixel filter image online', 'blur image pixels online', 'pixelation effect online'],
    'image-to-pixel-art',
    'Pixelating an image creates a mosaic effect where individual pixels are enlarged. Use this for artistic effects, privacy masking, or retro game aesthetics.',
  ),
  makePage(
    'photo-to-pixel-art-generator',
    'Photo to Pixel Art Generator — Free Online Tool',
    'Photo to Pixel Art Generator',
    'Generate pixel art from photos online for free. Retro game style pixel images.',
    ['photo to pixel art generator', 'pixel art from photo free', 'turn photo into pixel art', 'pixelate photo online', '8bit image generator'],
    'image-to-pixel-art',
    'Create a retro 8-bit or 16-bit style pixel art version of any photograph. Great for game assets, avatars, and digital art projects.',
  ),
];

// ---------------------------------------------------------------------------
// Image to Icon Set variants
// ---------------------------------------------------------------------------

const ICON_PAGES: SeoPage[] = [
  makePage(
    'create-icon-set-from-image-online',
    'Create Icon Set from Image Online — Free ICO & PNG Icons',
    'Create Icon Set from Image Online',
    'Create a complete icon set (multiple sizes) from any image online for free. Download PNG and ICO.',
    ['create icon set from image online', 'icon generator from image', 'image to icon converter online', 'app icon generator free', 'icon set maker online'],
    'image-to-icon',
    'Generate all standard icon sizes from a single source image. Download a ZIP containing PNGs at 16, 32, 48, 64, 96, 128, and 256 pixels.',
  ),
  makePage(
    'app-icon-generator-online-free',
    'App Icon Generator Online Free — All Sizes from One Image',
    'App Icon Generator Online Free',
    'Generate app icons at all required sizes from one image online for free.',
    ['app icon generator online free', 'app icon maker online', 'mobile app icon generator', 'ios android icon generator', 'icon set generator free'],
    'image-to-icon',
    'App stores require icons at dozens of sizes. Generate all standard sizes from a single high-resolution image and download them in a ZIP file.',
  ),
  makePage(
    'png-to-icon-set-online',
    'PNG to Icon Set Online — Free Multi-Size Icon Generator',
    'PNG to Icon Set Online',
    'Convert PNG images to complete icon sets online for free. Multiple sizes for web and apps.',
    ['png to icon set online', 'png multi size icon generator', 'convert png to icon', 'png icon sizes generator', 'png to icon pack free'],
    'image-to-icon',
    'Start from a high-resolution PNG and get all common icon sizes: 16×16, 32×32, 48×48, 64×64, 128×128, and 256×256.',
  ),
  makePage(
    'image-to-png-icon-online',
    'Image to PNG Icon Online — Free Icon Creator',
    'Image to PNG Icon Online',
    'Create PNG icons in multiple sizes from any image online for free.',
    ['image to png icon online', 'png icon creator', 'convert image to png icon', 'png icon generator free', 'image to icon png free'],
    'image-to-icon',
    'Upload any image and download icon-sized PNGs for use in web apps, Chrome extensions, desktop applications, and more.',
  ),
];

// ---------------------------------------------------------------------------
// Image to BMP variants
// ---------------------------------------------------------------------------

const BMP_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-bmp-online',
    'Convert Image to BMP Online — Free Converter',
    'Convert Image to BMP Online',
    'Convert JPG, PNG, WebP and other images to BMP format online for free.',
    ['convert image to bmp online', 'image to bmp converter free', 'jpg to bmp online', 'png to bmp free', 'bmp converter online'],
    'image-to-bmp',
    'BMP is an uncompressed image format used by some Windows applications and older software. Convert any image to BMP here.',
  ),
  makePage(
    'jpg-to-bmp-online-free',
    'JPG to BMP Online Free — JPEG to BMP Converter',
    'JPG to BMP Online Free',
    'Convert JPEG images to BMP format online for free. Uncompressed BMP output.',
    ['jpg to bmp online free', 'jpeg to bmp converter', 'convert jpg to bmp', 'jpg bmp free converter', 'jpeg bmp online'],
    'image-to-bmp',
    'Some legacy applications and systems require BMP files. Convert any JPEG to BMP here in seconds.',
  ),
  makePage(
    'png-to-bmp-online-free',
    'PNG to BMP Online Free — PNG to BMP Converter',
    'PNG to BMP Online Free',
    'Convert PNG images to BMP format online for free.',
    ['png to bmp online free', 'png to bmp converter', 'convert png to bmp', 'png bmp free converter', 'png to bitmap online'],
    'image-to-bmp',
    'Convert PNG files to the BMP bitmap format. Note: BMP does not support transparency, so transparent pixels will be filled with white.',
  ),
  makePage(
    'bmp-converter-online-free',
    'BMP Converter Online Free — Convert Any Image to BMP',
    'BMP Converter Online Free',
    'Free online BMP converter. Convert any image to BMP bitmap format in your browser.',
    ['bmp converter online free', 'online bmp converter', 'convert to bmp free', 'image to bitmap converter', 'bmp file converter online'],
    'image-to-bmp',
    'Upload any browser-supported image and download a BMP file. The BMP format stores pixel data without lossy compression.',
  ),
];

// ---------------------------------------------------------------------------
// Image to GIF variants
// ---------------------------------------------------------------------------

const GIF_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-gif-online',
    'Convert Image to GIF Online — Free Converter',
    'Convert Image to GIF Online',
    'Convert JPG, PNG, WebP and other images to GIF format online for free.',
    ['convert image to gif online', 'image to gif converter free', 'jpg to gif online', 'png to gif free', 'gif converter online'],
    'image-to-gif',
    'Convert any static image to a GIF. GIF supports animation but this tool converts a single image — use a dedicated GIF animator to add frames.',
  ),
  makePage(
    'jpg-to-gif-online-free',
    'JPG to GIF Online Free — JPEG to GIF Converter',
    'JPG to GIF Online Free',
    'Convert JPEG images to GIF format online for free.',
    ['jpg to gif online free', 'jpeg to gif converter', 'convert jpg to gif', 'jpg gif free converter', 'jpeg gif online'],
    'image-to-gif',
    'Convert any JPEG image to GIF format. GIF supports a maximum of 256 colours, so best results come from simple, flat-colour images.',
  ),
  makePage(
    'png-to-gif-online-free',
    'PNG to GIF Online Free — PNG to GIF Converter',
    'PNG to GIF Online Free',
    'Convert PNG images to GIF format online for free.',
    ['png to gif online free', 'png to gif converter', 'convert png to gif', 'png gif free converter', 'png to animated gif'],
    'image-to-gif',
    'Convert static PNG files to GIF format. Remember that GIF reduces to 256 colours, which may affect images with gradients.',
  ),
  makePage(
    'gif-maker-online-free',
    'GIF Maker Online Free — Create GIF from Image',
    'GIF Maker Online Free',
    'Create GIF images from photos online for free. Simple one-click conversion.',
    ['gif maker online free', 'create gif online free', 'make gif from photo', 'gif creator online', 'free gif maker'],
    'image-to-gif',
    'Create a GIF from any image file. For animated GIFs made from multiple images or video frames, you\'ll need a dedicated animation tool.',
  ),
];

// ---------------------------------------------------------------------------
// Images to ZIP variants
// ---------------------------------------------------------------------------

const ZIP_PAGES: SeoPage[] = [
  makePage(
    'compress-images-to-zip-online',
    'Compress Images to ZIP Online — Free Bulk Downloader',
    'Compress Images to ZIP Online',
    'Bundle and download multiple images as a ZIP file online for free.',
    ['compress images to zip online', 'images to zip online', 'bulk image download zip', 'create zip from images online', 'images zip file online free'],
    'image-to-zip',
    'Upload multiple images and package them into a single ZIP archive for easy sharing and downloading.',
  ),
  makePage(
    'download-images-as-zip-online',
    'Download Images as ZIP Online — Free Batch Tool',
    'Download Images as ZIP Online',
    'Download multiple images as a single ZIP archive online for free.',
    ['download images as zip online', 'save images as zip', 'batch image download zip', 'multiple images zip free', 'images to zip pack online'],
    'image-to-zip',
    'Select multiple images and download them all in one ZIP file. Perfect for sharing photo collections without sending files individually.',
  ),
  makePage(
    'bulk-image-download-zip',
    'Bulk Image Download as ZIP — Free Online Tool',
    'Bulk Image Download as ZIP',
    'Package and download multiple images in one ZIP file for free. Browser-based, no upload.',
    ['bulk image download zip', 'bulk download images zip', 'batch image zip download', 'multiple images one zip', 'image batch zip free'],
    'image-to-zip',
    'Process multiple images at once and wrap them in a ZIP archive for convenient sharing with clients, teammates, or for personal backup.',
  ),
];

// ---------------------------------------------------------------------------
// Image to HTML variants
// ---------------------------------------------------------------------------

const HTML_PAGES: SeoPage[] = [
  makePage(
    'convert-image-to-html-online',
    'Convert Image to HTML Online — Free Image HTML Generator',
    'Convert Image to HTML Online',
    'Convert images to HTML with inline Base64 encoding or img tags online for free.',
    ['convert image to html online', 'image to html converter free', 'embed image in html', 'image to html code free', 'inline image html generator'],
    'image-to-html',
    'Generate HTML code to embed your image in a web page. Choose between a standard img tag or an inline Base64 data URI for self-contained HTML.',
  ),
  makePage(
    'image-to-html-code-generator',
    'Image to HTML Code Generator — Free Online Tool',
    'Image to HTML Code Generator',
    'Generate HTML img tag code for any image online for free. Copy and paste into your web page.',
    ['image to html code generator', 'html img tag generator', 'generate img tag from image', 'image html embed code', 'html image code generator free'],
    'image-to-html',
    'Upload an image and get the ready-to-paste HTML code. Includes width, height, alt text, and optional Base64 inline embedding.',
  ),
  makePage(
    'embed-image-in-html-online',
    'Embed Image in HTML Online — Free Inline Image Tool',
    'Embed Image in HTML Online',
    'Generate inline HTML with embedded images (Base64 data URI) for self-contained web pages.',
    ['embed image in html online', 'inline image html free', 'html embed image base64', 'base64 image html embed', 'self contained html image'],
    'image-to-html',
    'Embedding images as Base64 data URIs lets you create self-contained HTML files with no external dependencies. Useful for email templates and single-file web apps.',
  ),
];

// ---------------------------------------------------------------------------
// Extra pages — additional platform, device, and use-case variants
// ---------------------------------------------------------------------------

const EXTRA_COMPRESS_PAGES: SeoPage[] = [
  makePage('compress-image-for-twitter', 'Compress Image for Twitter — Optimise for Twitter/X', 'Compress Image for Twitter', 'Compress images to Twitter\'s recommended size. Keep quality while reducing file size for faster tweets.', ['compress image for twitter', 'twitter image compressor', 'reduce image size for twitter', 'compress photo for twitter', 'twitter image size optimizer'], 'compress-image', 'Twitter recommends images under 5 MB. Compress your images to 500 KB–1 MB to ensure they upload and display quickly without recompression artifacts.'),
  makePage('compress-image-for-facebook', 'Compress Image for Facebook — Optimise Photo Quality', 'Compress Image for Facebook', 'Compress images for Facebook to keep quality while meeting size limits. Free browser-based tool.', ['compress image for facebook', 'facebook image compressor', 'reduce image size for facebook', 'facebook photo compressor', 'optimise image for facebook'], 'compress-image', 'Facebook applies its own compression to every uploaded photo. Pre-compressing to ~500 KB lets you control the quality before Facebook re-encodes.'),
  makePage('compress-image-for-linkedin', 'Compress Image for LinkedIn — Profile & Post Images', 'Compress Image for LinkedIn', 'Compress images for LinkedIn posts and profile photos. Free online tool, no upload required.', ['compress image for linkedin', 'linkedin image compressor', 'reduce image size for linkedin', 'compress photo for linkedin', 'linkedin image optimizer'], 'compress-image', 'LinkedIn recommends images under 8 MB for posts. Compress to ~500 KB for fast uploads and optimal display on the feed.'),
  makePage('compress-image-for-tiktok', 'Compress Image for TikTok — Optimise Cover & Profile', 'Compress Image for TikTok', 'Compress images to meet TikTok\'s size requirements. Free browser-based compressor.', ['compress image for tiktok', 'tiktok image compressor', 'reduce image size for tiktok', 'compress photo for tiktok', 'tiktok profile picture compressor'], 'compress-image', 'TikTok profile pictures and cover images work best under 2 MB. Compress your images to ensure fast rendering across all devices.'),
  makePage('compress-image-for-shopify', 'Compress Image for Shopify — Speed Up Your Store', 'Compress Image for Shopify', 'Compress product images for Shopify to improve page speed and Core Web Vitals. Free online tool.', ['compress image for shopify', 'shopify image compressor', 'shopify product image size', 'optimize image for shopify', 'shopify image optimization'], 'compress-image', 'Large product images slow down your Shopify store. Compress to under 200 KB each to hit Page Speed scores above 90 and improve conversion rates.'),
  makePage('compress-image-for-wordpress', 'Compress Image for WordPress — Optimise Media Library', 'Compress Image for WordPress', 'Compress images before uploading to WordPress. Reduce file size for faster load times.', ['compress image for wordpress', 'wordpress image compressor', 'optimize image for wordpress', 'reduce image size wordpress', 'wordpress image optimization free'], 'compress-image', 'WordPress serves images as uploaded. Compressing before upload keeps your media library lean and ensures fast page loads without plugins.'),
  makePage('compress-image-for-pinterest', 'Compress Image for Pinterest — Optimise Pin Images', 'Compress Image for Pinterest', 'Compress images for Pinterest pins. Optimise for fast loading while keeping visual quality.', ['compress image for pinterest', 'pinterest image compressor', 'reduce image size for pinterest', 'compress pin image', 'pinterest photo optimizer'], 'compress-image', 'Pinterest recommends images under 10 MB and under 10,000 pixels tall. Compress to 500 KB–1 MB for fast loading on the Pinterest feed.'),
  makePage('bulk-compress-images-online', 'Bulk Compress Images Online — Free Batch Compressor', 'Bulk Compress Images Online', 'Compress multiple images at once online for free. Batch image compression in your browser.', ['bulk compress images online', 'batch image compressor', 'compress multiple images at once', 'batch compress photos free', 'compress images in bulk'], 'compress-image', 'Upload multiple files and compress them all to your target size in one go. No waiting for server uploads — everything runs locally in your browser.'),
  makePage('compress-image-without-losing-quality', 'Compress Image Without Losing Quality — Free Tool', 'Compress Image Without Losing Quality', 'Compress images while preserving maximum visual quality. Smart compression keeps your images looking sharp.', ['compress image without losing quality', 'compress image no quality loss', 'lossless image compressor', 'high quality image compression', 'compress picture without reducing quality'], 'compress-image', 'Our compressor finds the highest quality setting that still meets your file-size target, minimising visible quality loss.'),
  makePage('compress-image-to-passport-size', 'Compress Image to Passport Size — Free Online', 'Compress Image to Passport Size', 'Compress and resize photos to passport size (35×45 mm / 413×531 px). Free browser-based tool.', ['compress image to passport size', 'passport photo size reducer', 'resize photo to passport size', 'passport size photo compressor', 'compress passport photo online free'], 'compress-image', 'Many official portals require passport-size photos under 50–200 KB. This tool compresses and resizes your photo to the standard passport dimensions.'),
];

const EXTRA_RESIZE_PAGES: SeoPage[] = [
  makePage('resize-image-for-twitter', 'Resize Image for Twitter — Correct Dimensions', 'Resize Image for Twitter', 'Resize images to Twitter\'s recommended dimensions. Free online resizer for Twitter posts and profiles.', ['resize image for twitter', 'twitter image dimensions', 'twitter photo resizer', 'resize photo for twitter', 'twitter image size'], 'resize-image', 'Twitter recommends 1200×675 px for shared images and 400×400 px for profile photos. Resize your images to these dimensions in one click.'),
  makePage('resize-image-for-facebook', 'Resize Image for Facebook — Profile, Cover & Posts', 'Resize Image for Facebook', 'Resize images to Facebook\'s recommended sizes for profiles, covers, and posts. Free online tool.', ['resize image for facebook', 'facebook image dimensions', 'facebook photo resizer', 'resize photo for facebook', 'facebook cover photo size'], 'resize-image', 'Facebook profile photos are 170×170 px and cover photos 820×312 px. Use this tool to resize any image to these or other Facebook sizes instantly.'),
  makePage('resize-image-for-instagram', 'Resize Image for Instagram — Square, Portrait & Stories', 'Resize Image for Instagram', 'Resize photos to Instagram\'s recommended sizes: 1080×1080, 1080×1350, or 1080×1920.', ['resize image for instagram', 'instagram image dimensions', 'resize photo for instagram', 'instagram image resizer', 'resize picture for instagram'], 'resize-image', 'Instagram crops images that don\'t match its supported aspect ratios. Resize your photo to 1080×1080 (square), 1080×1350 (portrait), or 1080×1920 (story) before uploading.'),
  makePage('resize-image-for-linkedin', 'Resize Image for LinkedIn — Profile & Banner Sizes', 'Resize Image for LinkedIn', 'Resize images to LinkedIn\'s recommended profile and banner sizes. Free browser-based resizer.', ['resize image for linkedin', 'linkedin image dimensions', 'resize photo for linkedin', 'linkedin profile photo size', 'linkedin banner size'], 'resize-image', 'LinkedIn profile photos display at 400×400 px minimum and banners at 1584×396 px. Resize your images to these dimensions to look professional.'),
  makePage('resize-image-for-youtube', 'Resize Image for YouTube — Thumbnails & Channel Art', 'Resize Image for YouTube', 'Resize images to YouTube thumbnail (1280×720) and channel art (2560×1440) sizes. Free online tool.', ['resize image for youtube', 'youtube thumbnail size', 'youtube channel art size', 'resize photo for youtube', 'youtube image resizer'], 'resize-image', 'YouTube thumbnails display best at 1280×720 px and channel art at 2560×1440 px. Resize your images to these exact dimensions for a professional look.'),
  makePage('resize-image-for-tiktok', 'Resize Image for TikTok — Profile & Cover Sizes', 'Resize Image for TikTok', 'Resize images to TikTok\'s profile photo and cover sizes. Free browser-based image resizer.', ['resize image for tiktok', 'tiktok image dimensions', 'resize photo for tiktok', 'tiktok profile picture size', 'tiktok cover photo size'], 'resize-image', 'TikTok profile photos display at 200×200 px. Cover images for videos display at 1080×1920 px. Resize yours instantly.'),
  makePage('resize-image-for-shopify', 'Resize Image for Shopify — Product & Banner Images', 'Resize Image for Shopify', 'Resize product images for Shopify stores. Optimise dimensions for faster page loads and better display.', ['resize image for shopify', 'shopify image size', 'resize product image shopify', 'shopify image dimensions', 'shopify product photo size'], 'resize-image', 'Shopify recommends 2048×2048 px product images for zoom functionality. Resize your images to consistent dimensions for a professional store appearance.'),
  makePage('resize-image-for-wordpress', 'Resize Image for WordPress — Featured & Gallery', 'Resize Image for WordPress', 'Resize images before uploading to WordPress. Match your theme\'s recommended dimensions.', ['resize image for wordpress', 'wordpress image dimensions', 'resize photo for wordpress', 'wordpress featured image size', 'wordpress image resizer'], 'resize-image', 'WordPress themes have specific recommended image sizes for featured images, gallery thumbnails, and banners. Resize before upload to avoid automatic cropping.'),
  makePage('resize-image-for-email', 'Resize Image for Email — Optimise for Newsletters', 'Resize Image for Email', 'Resize images for email newsletters. Keep images under 600 px wide for maximum email client compatibility.', ['resize image for email', 'email image dimensions', 'resize photo for email', 'email newsletter image size', 'resize image for gmail'], 'resize-image', 'Most email clients render best with images 600 px wide or less. Resize your images to fit email layouts and reduce attachment size simultaneously.'),
  makePage('resize-image-for-print', 'Resize Image for Print — A4, Letter & Custom Sizes', 'Resize Image for Print', 'Resize images to print-ready dimensions at 300 DPI. Free online tool for A4, Letter and custom sizes.', ['resize image for print', 'print ready image resizer', 'resize photo for printing', 'resize image to 300 dpi', 'resize image for a4 print'], 'resize-image', 'Print-ready images at 300 DPI require specific pixel dimensions. An A4 page at 300 DPI is 2480×3508 px. Resize your image to match before sending to a printer.'),
  makePage('resize-image-in-kb', 'Resize Image in KB — Reduce File Size to Target KB', 'Resize Image in KB', 'Resize images to reduce file size to a specific KB target. Free browser-based tool.', ['resize image in kb', 'resize image to kb', 'reduce image to kb', 'resize photo to specific size kb', 'resize image file size'], 'resize-image', 'Use the compress tool to hit an exact KB target, or use the resize tool to reduce pixel dimensions which indirectly reduces file size.'),
  makePage('resize-image-proportionally', 'Resize Image Proportionally — Keep Aspect Ratio', 'Resize Image Proportionally', 'Resize images while maintaining the original aspect ratio. No stretching or distortion.', ['resize image proportionally', 'resize image keep aspect ratio', 'resize image without distortion', 'proportional image resizer', 'resize image maintain ratio'], 'resize-image', 'Enter just the width or just the height and the tool automatically calculates the other dimension to preserve your image\'s original proportions.'),
];

// ---------------------------------------------------------------------------
// Extra JPG variants
// ---------------------------------------------------------------------------

const EXTRA_JPG_PAGES: SeoPage[] = [
  makePage('convert-png-to-jpg-online-free', 'Convert PNG to JPG Online Free — Fast PNG to JPEG', 'Convert PNG to JPG Online Free', 'Convert PNG images to JPG/JPEG format online for free. Reduces file size significantly.', ['convert png to jpg online free', 'png to jpg converter free', 'png to jpeg online', 'change png to jpg free', 'png to jpg no upload'], 'image-to-jpg', 'PNG is lossless but large. Converting to JPG can reduce file size by 70–90% with minimal visible quality loss, ideal for photos and web images.'),
  makePage('convert-webp-to-jpg-online', 'Convert WebP to JPG Online — Free WebP to JPEG', 'Convert WebP to JPG Online', 'Convert WebP images to JPG/JPEG format online for free. Download a universally compatible JPEG.', ['convert webp to jpg online', 'webp to jpg converter', 'webp to jpeg online free', 'change webp to jpg', 'webp jpg converter free'], 'image-to-jpg', 'WebP isn\'t supported everywhere. Converting to JPG gives you a universally compatible image you can open, edit, and share anywhere.'),
  makePage('convert-heic-to-jpg-online', 'Convert HEIC to JPG Online — Free iPhone Photo Converter', 'Convert HEIC to JPG Online', 'Convert HEIC photos from iPhone to JPG format online for free. Works instantly in your browser.', ['convert heic to jpg online', 'heic to jpg converter', 'heic to jpeg online free', 'iphone photo to jpg', 'heic jpg converter free'], 'image-to-jpg', 'iPhone photos in HEIC format aren\'t supported on most Windows PCs and web services. Convert to JPG for universal compatibility.'),
  makePage('convert-gif-to-jpg-online', 'Convert GIF to JPG Online — Free GIF to JPEG Converter', 'Convert GIF to JPG Online', 'Convert GIF images to JPG format online for free. Extracts the first frame as a JPEG.', ['convert gif to jpg online', 'gif to jpg converter', 'gif to jpeg online free', 'change gif to jpg', 'gif frame to jpg'], 'image-to-jpg', 'Need a static JPEG from an animated GIF? This tool extracts the first frame and saves it as a high-quality JPEG.'),
  makePage('convert-bmp-to-jpg-online', 'Convert BMP to JPG Online — Free BMP to JPEG Converter', 'Convert BMP to JPG Online', 'Convert BMP files to JPG format online for free. JPG is far smaller than BMP.', ['convert bmp to jpg online', 'bmp to jpg converter', 'bmp to jpeg online free', 'change bmp to jpg', 'bmp jpg converter free'], 'image-to-jpg', 'BMP is uncompressed and creates huge file sizes. Converting to JPG typically reduces file size by 90% with minimal visible quality loss.'),
  makePage('convert-tiff-to-jpg-online', 'Convert TIFF to JPG Online — Free TIFF to JPEG', 'Convert TIFF to JPG Online', 'Convert TIFF images to JPG format online for free. TIFF to JPEG conversion in your browser.', ['convert tiff to jpg online', 'tiff to jpg converter', 'tiff to jpeg online free', 'change tiff to jpg', 'tiff jpg converter free'], 'image-to-jpg', 'TIFF files are very large and not widely supported online. Converting to JPG gives you a web-ready, universally compatible image.'),
  makePage('jpg-converter-online', 'JPG Converter Online — Convert Any Image to JPG Free', 'JPG Converter Online', 'Free online JPG converter. Convert any image format to JPG/JPEG in your browser.', ['jpg converter online', 'online jpg converter', 'free jpg converter', 'convert image to jpg online', 'jpg conversion tool free'], 'image-to-jpg', 'Supports PNG, WebP, GIF, BMP, TIFF and other browser-readable formats. Upload your file and download a JPEG in one click.'),
  makePage('reduce-jpg-file-size-online', 'Reduce JPG File Size Online — Free JPEG Size Reducer', 'Reduce JPG File Size Online', 'Reduce JPG file size online for free. Compress JPEG images to a specific KB or MB target.', ['reduce jpg file size online', 'reduce jpeg file size online free', 'shrink jpg file size', 'decrease jpg size online', 'make jpg smaller online'], 'image-to-jpg', 'Use the quality slider or set a specific file-size target. The tool automatically finds the best quality setting that keeps your JPG under the limit.'),
];

// ---------------------------------------------------------------------------
// Extra PNG variants
// ---------------------------------------------------------------------------

const EXTRA_PNG_PAGES: SeoPage[] = [
  makePage('convert-heic-to-png-online', 'Convert HEIC to PNG Online — Free iPhone Photo to PNG', 'Convert HEIC to PNG Online', 'Convert HEIC photos from iPhone to PNG format online for free. Supports transparency.', ['convert heic to png online', 'heic to png converter', 'heic to png online free', 'iphone photo to png', 'heic png converter'], 'image-to-png', 'iPhone HEIC photos can be converted to PNG with transparency support. PNG is lossless and widely supported across all platforms.'),
  makePage('convert-svg-to-png-online', 'Convert SVG to PNG Online — Free Vector to Raster', 'Convert SVG to PNG Online', 'Convert SVG vector images to PNG raster format online for free. Set custom output dimensions.', ['convert svg to png online', 'svg to png converter', 'svg to png online free', 'vector to png converter', 'svg png converter free'], 'image-to-png', 'SVG is vector-based and scales to any size. Converting to PNG creates a fixed-pixel raster image suitable for all image editors and sharing platforms.'),
  makePage('convert-tiff-to-png-online', 'Convert TIFF to PNG Online — Free TIFF to PNG Converter', 'Convert TIFF to PNG Online', 'Convert TIFF images to PNG format online for free. Lossless conversion in your browser.', ['convert tiff to png online', 'tiff to png converter', 'tiff to png online free', 'change tiff to png', 'tiff png converter'], 'image-to-png', 'TIFF and PNG are both lossless formats. Converting TIFF to PNG produces a more web-compatible file while preserving every pixel.'),
  makePage('reduce-png-file-size-online', 'Reduce PNG File Size Online — Free PNG Compressor', 'Reduce PNG File Size Online', 'Reduce PNG file size online for free without losing quality. Browser-based PNG optimizer.', ['reduce png file size online', 'reduce png size online free', 'shrink png file size', 'decrease png size online', 'make png smaller online'], 'image-to-png', 'PNG files can be reduced in size by converting to a more compressed format or optimising the colour palette. This tool handles it automatically.'),
  makePage('png-to-jpg-online-free-no-watermark', 'PNG to JPG Online Free — No Watermark, No Sign-up', 'PNG to JPG Free No Watermark', 'Convert PNG to JPG online for free with no watermarks and no account required. Instant download.', ['png to jpg online free no watermark', 'convert png to jpg free no sign up', 'png jpg converter no watermark', 'free png to jpg no registration', 'png to jpg instant no limit'], 'image-to-png', 'No watermarks, no sign-up, no limits. Convert PNG to JPG directly in your browser and download the result immediately.'),
];

// ---------------------------------------------------------------------------
// Extra WebP variants
// ---------------------------------------------------------------------------

const EXTRA_WEBP_PAGES: SeoPage[] = [
  makePage('convert-heic-to-webp-online', 'Convert HEIC to WebP Online — Free iPhone to WebP', 'Convert HEIC to WebP Online', 'Convert HEIC photos from iPhone to WebP format online for free. Smaller than JPG with better quality.', ['convert heic to webp online', 'heic to webp converter', 'heic to webp online free', 'iphone photo to webp', 'heic webp converter'], 'image-to-webp', 'HEIC is Apple\'s format; WebP is Google\'s. Converting to WebP gives you the best web compression while maintaining excellent visual quality.'),
  makePage('convert-gif-to-webp-online', 'Convert GIF to WebP Online — Animated WebP Converter', 'Convert GIF to WebP Online', 'Convert GIF images to WebP format online for free. WebP is smaller and better quality.', ['convert gif to webp online', 'gif to webp converter', 'gif to webp online free', 'animated gif to webp', 'gif webp converter'], 'image-to-webp', 'WebP supports animation, just like GIF, but with far better compression. Converting GIF to animated WebP can reduce file size by up to 64%.'),
  makePage('convert-bmp-to-webp-online', 'Convert BMP to WebP Online — Free Converter', 'Convert BMP to WebP Online', 'Convert BMP images to WebP format online for free. Achieve massive file size savings.', ['convert bmp to webp online', 'bmp to webp converter', 'bmp to webp online free', 'bmp webp converter free'], 'image-to-webp', 'BMP is uncompressed and can be hundreds of MBs. Converting to WebP can reduce file size by 95% or more while keeping excellent image quality.'),
  makePage('webp-converter-online-free', 'WebP Converter Online Free — Convert Any Image to WebP', 'WebP Converter Online Free', 'Free online WebP converter. Convert JPG, PNG, GIF, BMP and more to WebP in your browser.', ['webp converter online free', 'online webp converter', 'free webp converter', 'convert image to webp online', 'image to webp tool'], 'image-to-webp', 'WebP is supported by all modern browsers and delivers 25–35% smaller files than JPG at the same quality. Convert any image to WebP for faster websites.'),
  makePage('reduce-webp-file-size-online', 'Reduce WebP File Size Online — Free WebP Compressor', 'Reduce WebP File Size Online', 'Reduce WebP file size online for free. Compress WebP images to a specific KB or MB target.', ['reduce webp file size online', 'compress webp online free', 'shrink webp file size', 'decrease webp size online', 'webp compressor online'], 'image-to-webp', 'Even WebP files can be too large. This tool compresses WebP images to your exact file-size target while preserving as much quality as possible.'),
];

// ---------------------------------------------------------------------------
// Extra PDF variants
// ---------------------------------------------------------------------------

const EXTRA_PDF_PAGES: SeoPage[] = [
  makePage('convert-multiple-images-to-pdf', 'Convert Multiple Images to PDF — Free Online Tool', 'Convert Multiple Images to PDF', 'Combine multiple images into a single PDF document online for free. Supports JPG, PNG, WebP and more.', ['convert multiple images to pdf', 'combine images to pdf free', 'merge images into pdf online', 'multiple photos to pdf free', 'images to pdf converter online'], 'image-to-pdf', 'Upload multiple images and they are combined into a single, multi-page PDF document — perfect for sharing photo collections, scanned documents, or portfolios.'),
  makePage('convert-png-to-pdf-online', 'Convert PNG to PDF Online — Free PNG to PDF Converter', 'Convert PNG to PDF Online', 'Convert PNG images to PDF format online for free. Maintains quality and transparency.', ['convert png to pdf online', 'png to pdf converter', 'png to pdf online free', 'change png to pdf free', 'png pdf converter'], 'image-to-pdf', 'Converting a PNG to PDF creates a portable, universally viewable document. Ideal for submitting images as PDFs to forms, applications, and email attachments.'),
  makePage('convert-webp-to-pdf-online', 'Convert WebP to PDF Online — Free Converter', 'Convert WebP to PDF Online', 'Convert WebP images to PDF format online for free. Browser-based, no upload required.', ['convert webp to pdf online', 'webp to pdf converter', 'webp to pdf online free', 'webp pdf converter free'], 'image-to-pdf', 'WebP images can be converted to PDF instantly in your browser. The resulting PDF preserves image dimensions and quality for professional sharing.'),
  makePage('image-to-pdf-a4', 'Image to PDF A4 — Fit Image to A4 Page Online Free', 'Image to PDF A4 Online', 'Convert images to A4-sized PDF pages online for free. Automatically fits the image to A4 dimensions.', ['image to pdf a4', 'convert image to a4 pdf', 'image to pdf a4 size free', 'a4 pdf from image online', 'fit image to a4 pdf'], 'image-to-pdf', 'This tool converts your image to a PDF and fits it onto a standard A4 page (210×297 mm). Ideal for printing or submitting as a document.'),
  makePage('jpg-to-pdf-online-free', 'JPG to PDF Online Free — Fast JPEG to PDF Converter', 'JPG to PDF Online Free', 'Convert JPG images to PDF format online for free. Merge multiple JPGs into one PDF or one per page.', ['jpg to pdf online free', 'jpeg to pdf online', 'convert jpg to pdf free', 'jpg pdf converter online', 'jpeg to pdf converter free'], 'image-to-pdf', 'Upload one or more JPGs and download a PDF in seconds. Each JPG becomes a page in the PDF, in the order you uploaded them.'),
];

// ---------------------------------------------------------------------------
// Extra Grayscale variants
// ---------------------------------------------------------------------------

const EXTRA_GRAYSCALE_PAGES: SeoPage[] = [
  makePage('convert-png-to-grayscale-online', 'Convert PNG to Grayscale Online — Free Black & White', 'Convert PNG to Grayscale Online', 'Convert PNG images to grayscale (black & white) online for free. Preserves transparency.', ['convert png to grayscale online', 'png to grayscale free', 'png black and white converter', 'grayscale png online', 'png to bw online'], 'image-to-grayscale', 'Convert your PNG to a black-and-white grayscale image while keeping any transparent areas intact. Ideal for creating monochrome logos and icons.'),
  makePage('convert-jpg-to-grayscale-online', 'Convert JPG to Grayscale Online — Free B&W Converter', 'Convert JPG to Grayscale Online', 'Convert JPEG images to grayscale online for free. One-click black-and-white conversion.', ['convert jpg to grayscale online', 'jpg to grayscale free', 'jpeg black and white converter', 'grayscale jpg online', 'jpg to bw converter'], 'image-to-grayscale', 'Remove all colour from your JPG image in one click. Grayscale photos have a timeless, professional look perfect for portraits and editorial photography.'),
  makePage('make-image-black-and-white-online', 'Make Image Black and White Online — Free Tool', 'Make Image Black and White Online', 'Make any image black and white online for free. Works with JPG, PNG, WebP and more.', ['make image black and white online', 'image to black and white free', 'convert photo to black and white online', 'bw photo converter online', 'desaturate image online free'], 'image-to-grayscale', 'Upload any colour image and convert it to a beautiful black-and-white photo instantly. No design software needed.'),
  makePage('desaturate-image-online-free', 'Desaturate Image Online Free — Remove Color', 'Desaturate Image Online Free', 'Remove all colour from an image online for free. Desaturate to grayscale instantly in your browser.', ['desaturate image online free', 'remove color from image online', 'desaturate photo online', 'image desaturator online', 'strip color from image online'], 'image-to-grayscale', 'Desaturating an image removes all colour information, leaving a pure grayscale result. Use it for artistic effects, printing, or accessibility testing.'),
];

// ---------------------------------------------------------------------------
// Extra Base64 variants
// ---------------------------------------------------------------------------

const EXTRA_BASE64_PAGES: SeoPage[] = [
  makePage('convert-jpg-to-base64-online', 'Convert JPG to Base64 Online — Free JPEG Encoder', 'Convert JPG to Base64 Online', 'Convert JPG/JPEG images to Base64 encoded strings online for free.', ['convert jpg to base64 online', 'jpg to base64 encoder', 'jpeg to base64 online free', 'base64 encode jpg free', 'jpg base64 string online'], 'image-to-base64', 'Convert your JPEG to a Base64 string for use in CSS backgrounds, HTML img tags, or JSON payloads — all without needing a server to host the image.'),
  makePage('convert-png-to-base64-online', 'Convert PNG to Base64 Online — Free PNG Encoder', 'Convert PNG to Base64 Online', 'Convert PNG images to Base64 encoded strings online for free. Copy the data URI instantly.', ['convert png to base64 online', 'png to base64 encoder', 'png to base64 online free', 'base64 encode png free', 'png base64 data uri'], 'image-to-base64', 'PNG with transparency can be embedded as a Base64 data URI in HTML or CSS. The transparent areas are preserved perfectly in the encoded output.'),
  makePage('image-to-base64-data-uri', 'Image to Base64 Data URI — Free Online Converter', 'Image to Base64 Data URI', 'Convert any image to a Base64 data URI for embedding in HTML and CSS. Free browser-based tool.', ['image to base64 data uri', 'base64 data uri generator', 'image data uri encoder', 'base64 embed image css', 'base64 image embed html'], 'image-to-base64', 'Data URIs embed the image directly in your HTML or CSS, eliminating an HTTP request. Perfect for small icons, logos, and inline images in email templates.'),
  makePage('base64-to-image-online', 'Base64 to Image Online — Decode Base64 to Image Free', 'Base64 to Image Online', 'Decode Base64 strings back to image files online for free. Paste your Base64 and download the image.', ['base64 to image online', 'decode base64 to image', 'base64 image decoder online', 'base64 to png online', 'base64 to jpg online'], 'image-to-base64', 'Paste a Base64 encoded image string and convert it back to a downloadable image file. Supports JPG, PNG, WebP and other encoded formats.'),
];

// ---------------------------------------------------------------------------
// Extra Text (OCR) variants
// ---------------------------------------------------------------------------

const EXTRA_TEXT_PAGES: SeoPage[] = [
  makePage('extract-text-from-image-online', 'Extract Text from Image Online — Free OCR Tool', 'Extract Text from Image Online', 'Extract text from images online for free using OCR. Copy or download the recognised text.', ['extract text from image online', 'image text extractor online', 'ocr image to text free', 'extract words from image', 'read text from image online'], 'image-to-text', 'Upload any image containing text and the OCR engine will recognise and extract it into copyable, searchable text. Supports printed text in multiple languages.'),
  makePage('convert-jpg-to-text-online', 'Convert JPG to Text Online — Free JPEG OCR', 'Convert JPG to Text Online', 'Convert JPG images to text online for free using OCR. Extract all text from JPEG photos.', ['convert jpg to text online', 'jpg to text converter', 'jpeg ocr online free', 'extract text from jpg', 'jpg text reader online'], 'image-to-text', 'Upload a JPG photo of a document, sign, or any printed text and download the recognised content as plain text.'),
  makePage('convert-screenshot-to-text-online', 'Convert Screenshot to Text Online — Free OCR', 'Convert Screenshot to Text Online', 'Convert screenshots to editable text online for free. Copy text from any screenshot instantly.', ['convert screenshot to text online', 'screenshot to text free', 'screenshot ocr online', 'copy text from screenshot', 'extract text from screenshot online'], 'image-to-text', 'Take a screenshot of any text and convert it to editable, copyable content in seconds. Perfect for copying text from locked PDFs, images, or videos.'),
  makePage('scan-document-to-text-online', 'Scan Document to Text Online — Free Document OCR', 'Scan Document to Text Online', 'Convert scanned document images to editable text online for free. Fast browser-based OCR.', ['scan document to text online', 'scanned document to text free', 'document ocr online', 'convert scan to text free', 'document to text converter online'], 'image-to-text', 'Digitise scanned documents by extracting all text content with OCR. The output can be copied, edited, and stored digitally — no manual re-typing needed.'),
  makePage('ocr-online-free-no-limit', 'OCR Online Free No Limit — Unlimited Image to Text', 'OCR Online Free No Limit', 'Free unlimited online OCR. Convert images to text with no page limits, no sign-up, no watermarks.', ['ocr online free no limit', 'unlimited ocr free online', 'free ocr no registration', 'ocr tool no limit', 'free ocr software online'], 'image-to-text', 'No limits on the number of images you can process. Run OCR on as many images as you need, directly in your browser, with no account required.'),
];

// ---------------------------------------------------------------------------
// Extra Favicon variants
// ---------------------------------------------------------------------------

const EXTRA_FAVICON_PAGES: SeoPage[] = [
  makePage('create-favicon-from-logo-online', 'Create Favicon from Logo Online — Free Tool', 'Create Favicon from Logo Online', 'Create a favicon from your logo online for free. Generate .ico and PNG favicons in all sizes.', ['create favicon from logo online', 'logo to favicon converter', 'favicon from logo free', 'generate favicon from image', 'make favicon from logo online'], 'image-to-favicon', 'Upload your logo and generate a favicon in all required sizes: 16×16, 32×32, 48×48, and 192×192 pixels. Download a complete favicon package for your website.'),
  makePage('png-to-ico-converter-online-free', 'PNG to ICO Converter Online Free — Create .ico Files', 'PNG to ICO Converter Online Free', 'Convert PNG images to ICO format online for free. Create browser-compatible .ico favicon files.', ['png to ico converter online free', 'png to ico online', 'convert png to ico free', 'image to ico file online', 'make ico file from png'], 'image-to-favicon', 'ICO files can contain multiple image sizes in one file. Convert your PNG to ICO with all the standard favicon sizes included for maximum browser compatibility.'),
  makePage('generate-apple-touch-icon-online', 'Generate Apple Touch Icon Online — Free iOS Icon Creator', 'Generate Apple Touch Icon Online', 'Generate Apple Touch Icon images for iOS and iPadOS. Create 180×180 px Apple touch icons from any image.', ['generate apple touch icon online', 'apple touch icon creator', 'ios icon generator online free', 'create apple touch icon', 'ios home screen icon maker'], 'image-to-favicon', 'Apple Touch Icons appear on iOS home screens and bookmarks. Generate a 180×180 px PNG from your logo or any image for perfect display on iPhones and iPads.'),
  makePage('resize-image-to-16x16-favicon', 'Resize Image to 16×16 Favicon — Free Online Tool', 'Resize Image to 16×16 for Favicon', 'Resize any image to 16×16 pixels for a browser tab favicon. Free online favicon resizer.', ['resize image to 16x16 favicon', 'create 16x16 favicon online', 'image to 16x16 pixels free', 'favicon 16x16 generator', 'resize logo to favicon size'], 'image-to-favicon', 'The classic browser tab favicon is 16×16 pixels. Resize any image to this tiny size to create a recognisable favicon that displays in browser tabs and bookmarks.'),
];

// ---------------------------------------------------------------------------
// Extra SVG variants
// ---------------------------------------------------------------------------

const EXTRA_SVG_PAGES: SeoPage[] = [
  makePage('convert-jpg-to-svg-online', 'Convert JPG to SVG Online — Free JPEG to Vector', 'Convert JPG to SVG Online', 'Convert JPG images to SVG vector format online for free. Create scalable graphics from photos.', ['convert jpg to svg online', 'jpg to svg converter', 'jpeg to svg online free', 'jpg to vector free online', 'image to svg converter free'], 'image-to-svg', 'Converting a JPG to SVG creates a scalable vector version that looks sharp at any size — ideal for logos, icons, and graphics that need to scale up without pixellation.'),
  makePage('convert-png-to-svg-online', 'Convert PNG to SVG Online — Free PNG to Vector', 'Convert PNG to SVG Online', 'Convert PNG images to SVG vector format online for free. Perfect for logos and icons.', ['convert png to svg online', 'png to svg converter', 'png to svg online free', 'png to vector free online', 'convert png to svg free'], 'image-to-svg', 'PNG icons and logos can be converted to scalable SVG vectors. The resulting SVG scales to any size without pixellation, perfect for responsive web design.'),
  makePage('trace-image-to-svg-online', 'Trace Image to SVG Online — Free Vector Tracing Tool', 'Trace Image to SVG Online', 'Trace bitmap images to SVG vector format online for free. Convert raster art to clean vectors.', ['trace image to svg online', 'bitmap to vector converter online free', 'image tracing online free', 'raster to vector converter free', 'auto trace image to svg'], 'image-to-svg', 'Image tracing converts pixel-based artwork into mathematically defined vector paths. The result is an SVG that scales perfectly to any size with no quality loss.'),
  makePage('svg-converter-online-free', 'SVG Converter Online Free — Convert Image to SVG', 'SVG Converter Online Free', 'Free online SVG converter. Convert any image to SVG vector format in your browser.', ['svg converter online free', 'online svg converter', 'free svg converter', 'image to svg online', 'convert to svg free'], 'image-to-svg', 'Supports JPG, PNG, WebP, GIF, BMP and other browser-readable formats. Upload your image and download an SVG in one click.'),
];

// ---------------------------------------------------------------------------
// Extra QR Code variants
// ---------------------------------------------------------------------------

const EXTRA_QR_PAGES: SeoPage[] = [
  makePage('generate-qr-code-for-url', 'Generate QR Code for URL — Free Link QR Generator', 'Generate QR Code for URL', 'Generate a QR code for any URL or website link online for free. Download as PNG or SVG.', ['generate qr code for url', 'qr code generator for link', 'url to qr code free', 'create qr code for website', 'qr code from url online'], 'image-to-qr', 'Create a scannable QR code that links to any URL. Anyone who scans it is taken directly to your website, product page, or landing page.'),
  makePage('qr-code-generator-for-wifi', 'QR Code Generator for WiFi — Share WiFi Password', 'QR Code Generator for WiFi', 'Generate a QR code for your WiFi network online for free. Guests scan to connect instantly.', ['qr code generator for wifi', 'wifi qr code generator free', 'create wifi qr code online', 'share wifi via qr code', 'wifi password qr code generator'], 'image-to-qr', 'Create a WiFi QR code that lets guests connect to your network by simply scanning — no need to type a long password.'),
  makePage('qr-code-generator-for-whatsapp', 'QR Code Generator for WhatsApp — Free Link QR', 'QR Code Generator for WhatsApp', 'Generate a WhatsApp QR code for your phone number online for free. Link directly to a WhatsApp chat.', ['qr code generator for whatsapp', 'whatsapp qr code generator', 'create whatsapp qr code online', 'whatsapp link qr code free', 'qr code for whatsapp number'], 'image-to-qr', 'Share your WhatsApp contact as a QR code. Anyone who scans it opens a chat with you directly, without needing to save your number first.'),
  makePage('qr-code-generator-for-vcard', 'QR Code Generator for vCard — Digital Business Card', 'QR Code Generator for vCard', 'Generate a vCard QR code with your contact information online for free. Create a digital business card.', ['qr code generator for vcard', 'vcard qr code generator', 'contact qr code generator free', 'digital business card qr code', 'qr code with contact info'], 'image-to-qr', 'Create a QR code that, when scanned, instantly adds your contact details to the scanner\'s address book. Perfect for business cards and networking events.'),
  makePage('qr-code-generator-for-instagram', 'QR Code for Instagram — Generate Instagram Profile QR', 'QR Code Generator for Instagram', 'Generate a QR code for your Instagram profile online for free. Print or share to gain followers.', ['qr code for instagram', 'instagram qr code generator', 'create instagram qr code free', 'instagram profile qr', 'instagram link qr code generator'], 'image-to-qr', 'Create a QR code that links directly to your Instagram profile. Print it on flyers, business cards, or packaging to drive followers from the physical world.'),
  makePage('qr-code-with-logo-online-free', 'QR Code with Logo Online Free — Custom Branded QR', 'QR Code with Logo Online Free', 'Generate a QR code with your logo in the centre online for free. Create branded QR codes.', ['qr code with logo online free', 'custom qr code with logo', 'branded qr code generator free', 'qr code logo embed online', 'create qr code with image in center'], 'image-to-qr', 'Add your brand logo to the centre of a QR code for a professional, recognisable result. QR codes can accommodate a 30% logo overlay without losing scannability.'),
];

// ---------------------------------------------------------------------------
// Extra Color Palette variants
// ---------------------------------------------------------------------------

const EXTRA_COLOR_PALETTE_PAGES: SeoPage[] = [
  makePage('extract-colors-from-image-online', 'Extract Colors from Image Online — Free Color Picker', 'Extract Colors from Image Online', 'Extract the dominant colours from any image online for free. Get hex, RGB, and HSL values.', ['extract colors from image online', 'color extractor from image', 'image color picker online', 'get colors from photo online', 'dominant color extractor online'], 'image-to-color-palette', 'Upload any image and instantly see its dominant colours with exact hex, RGB, and HSL values. Perfect for brand colour matching and design inspiration.'),
  makePage('image-color-palette-generator', 'Image Color Palette Generator — Free Online Tool', 'Image Color Palette Generator', 'Generate a complete colour palette from any image. Extract up to 10 dominant colours with hex codes.', ['image color palette generator', 'color palette from image free', 'generate color palette from photo', 'image palette extractor', 'photo color palette tool online'], 'image-to-color-palette', 'Upload a photo or artwork and automatically generate a harmonious colour palette. Use the hex codes in your design tools, CSS, or brand guidelines.'),
  makePage('get-hex-color-from-image-online', 'Get Hex Color from Image Online — Free Color Finder', 'Get Hex Color from Image Online', 'Click anywhere on an image to get the exact hex colour code. Free online colour picker.', ['get hex color from image online', 'hex color picker from image', 'image to hex code online', 'pick color from image online free', 'find hex code from photo'], 'image-to-color-palette', 'Upload your image and extract exact hex colour codes from any part of it. Perfect for matching brand colours, recreating palettes, and CSS styling.'),
];

// ---------------------------------------------------------------------------
// Extra ASCII Art variants
// ---------------------------------------------------------------------------

const EXTRA_ASCII_PAGES: SeoPage[] = [
  makePage('convert-photo-to-ascii-art-online', 'Convert Photo to ASCII Art Online — Free Generator', 'Convert Photo to ASCII Art Online', 'Convert any photo to ASCII art online for free. Download as text, HTML or PNG.', ['convert photo to ascii art online', 'photo to ascii generator', 'image ascii art online free', 'picture to ascii art', 'photo ascii converter'], 'image-to-ascii', 'Upload any photo and turn it into ASCII art made entirely of text characters. Share it on social media or use it as a unique header in your text files.'),
  makePage('text-art-generator-from-image', 'Text Art Generator from Image — Free Online Tool', 'Text Art Generator from Image', 'Generate text art from any image online for free. Convert pictures to character art.', ['text art generator from image', 'image to text art generator', 'picture to text art online', 'ascii text art generator from photo', 'convert image to text symbols'], 'image-to-ascii', 'Turn your favourite photos into impressive text art. The generator maps pixel brightness to ASCII characters to recreate the image using only keyboard symbols.'),
  makePage('ascii-art-maker-online-free', 'ASCII Art Maker Online Free — Image to ASCII', 'ASCII Art Maker Online Free', 'Make ASCII art from images online for free. Adjustable width and character set.', ['ascii art maker online free', 'online ascii art maker', 'free ascii art generator', 'make ascii art from photo free', 'ascii generator online'], 'image-to-ascii', 'Customise the output width and character set to get the perfect ASCII art from your image. The larger the character width, the more detailed the result.'),
];

// ---------------------------------------------------------------------------
// Extra Pixel Art variants
// ---------------------------------------------------------------------------

const EXTRA_PIXEL_ART_PAGES: SeoPage[] = [
  makePage('convert-image-to-pixel-art-online', 'Convert Image to Pixel Art Online — Free Pixelator', 'Convert Image to Pixel Art Online', 'Convert any image to pixel art online for free. Choose pixel grid size for 8-bit or 16-bit style.', ['convert image to pixel art online', 'image to pixel art converter', 'pixelate image online free', 'make pixel art from photo', 'photo to pixel art online'], 'image-to-pixel-art', 'Upload any image and apply a pixel art effect. Choose your grid size — smaller grids create fine pixel art; larger grids produce chunky 8-bit style sprites.'),
  makePage('pixelate-image-online-free', 'Pixelate Image Online Free — Create Pixel Effect', 'Pixelate Image Online Free', 'Add a pixelation effect to any image online for free. Create a mosaic or pixel blur effect.', ['pixelate image online free', 'pixel effect image online', 'add pixelation to image free', 'mosaic image effect online', 'blur image with pixels'], 'image-to-pixel-art', 'Apply a pixelation filter to any image to create a stylised 8-bit look or censor sensitive details by blurring them with large pixels.'),
  makePage('8-bit-image-converter-online', '8-Bit Image Converter Online — Free Retro Pixel Art', '8-Bit Image Converter Online', 'Convert any image to 8-bit retro pixel art style online for free. Classic video game aesthetic.', ['8 bit image converter online', '8bit image converter', 'retro pixel art converter', 'convert photo to 8 bit style', '8 bit photo effect online free'], 'image-to-pixel-art', 'Give any photo an authentic 8-bit retro look. The converter reduces the image to a low-resolution pixel grid with a limited colour palette reminiscent of classic video games.'),
];

// ---------------------------------------------------------------------------
// Extra Icon variants
// ---------------------------------------------------------------------------

const EXTRA_ICON_PAGES: SeoPage[] = [
  makePage('create-app-icon-online-free', 'Create App Icon Online Free — iOS & Android', 'Create App Icon Online Free', 'Create app icons for iOS and Android online for free. Generate all required icon sizes from one image.', ['create app icon online free', 'app icon generator online', 'ios app icon creator', 'android app icon generator', 'app icon maker free'], 'image-to-icon', 'Upload your design and generate all required app icon sizes for iOS (1024×1024 down to 20×20) and Android (512×512 down to 36×36) in one go.'),
  makePage('resize-image-to-icon-size-online', 'Resize Image to Icon Size Online — Free Icon Resizer', 'Resize Image to Icon Size Online', 'Resize any image to standard icon sizes (16, 32, 48, 64, 128, 256 px) online for free.', ['resize image to icon size online', 'icon size resizer online', 'image to icon size free', 'resize to 512x512 online', 'icon image resizer'], 'image-to-icon', 'Generate icons in every standard size from a single source image. Download individual sizes or a complete icon set ready for use in apps, websites, and operating systems.'),
  makePage('convert-image-to-ico-file-online', 'Convert Image to ICO File Online — Free .ico Creator', 'Convert Image to ICO File Online', 'Convert any image to a Windows .ico file online for free. Multi-size ICO files for desktop apps.', ['convert image to ico file online', 'image to ico converter free', 'create ico file online', 'make ico file from image', 'icon ico generator online'], 'image-to-icon', 'ICO files are used for Windows application icons. Create a multi-resolution ICO file containing 16×16, 32×32, 48×48, and 256×256 pixel icons from any source image.'),
];

// ---------------------------------------------------------------------------
// Extra BMP variants
// ---------------------------------------------------------------------------

const EXTRA_BMP_PAGES: SeoPage[] = [
  makePage('convert-jpg-to-bmp-online', 'Convert JPG to BMP Online — Free JPEG to BMP', 'Convert JPG to BMP Online', 'Convert JPEG images to BMP format online for free. Lossless BMP from any JPG.', ['convert jpg to bmp online', 'jpg to bmp converter', 'jpeg to bmp online free', 'change jpg to bmp', 'jpg bmp converter free'], 'image-to-bmp', 'BMP is an uncompressed lossless format widely supported on Windows. Convert your JPG to BMP when you need a pixel-perfect, uncompressed copy of your image.'),
  makePage('convert-png-to-bmp-online', 'Convert PNG to BMP Online — Free PNG to BMP Converter', 'Convert PNG to BMP Online', 'Convert PNG images to BMP format online for free. Browser-based, no installation needed.', ['convert png to bmp online', 'png to bmp converter', 'png to bmp online free', 'change png to bmp', 'png bmp converter free'], 'image-to-bmp', 'Convert your PNG to BMP for use in applications that require the BMP format. The conversion is lossless, preserving all image data.'),
  makePage('bmp-converter-online-free', 'BMP Converter Online Free — Convert Any Image to BMP', 'BMP Converter Online Free', 'Free online BMP converter. Convert any image format to BMP in your browser.', ['bmp converter online free', 'online bmp converter', 'free bmp converter', 'image to bmp online', 'convert to bmp free'], 'image-to-bmp', 'Supports JPG, PNG, WebP, GIF, and other browser-readable formats. Upload your file and download a BMP in one click — no installation required.'),
];

// ---------------------------------------------------------------------------
// Extra GIF variants
// ---------------------------------------------------------------------------

const EXTRA_GIF_PAGES: SeoPage[] = [
  makePage('convert-jpg-to-gif-online', 'Convert JPG to GIF Online — Free JPEG to GIF', 'Convert JPG to GIF Online', 'Convert JPEG images to GIF format online for free. Create static GIFs from JPEG photos.', ['convert jpg to gif online', 'jpg to gif converter', 'jpeg to gif online free', 'change jpg to gif', 'jpg gif converter free'], 'image-to-gif', 'Converting a JPG to GIF creates a static GIF image. Note that GIF uses a 256-colour palette, so photos may show banding — it works best for simple graphics.'),
  makePage('convert-png-to-gif-online', 'Convert PNG to GIF Online — Free PNG to GIF Converter', 'Convert PNG to GIF Online', 'Convert PNG images to GIF format online for free. Browser-based conversion in one click.', ['convert png to gif online', 'png to gif converter', 'png to gif online free', 'change png to gif', 'png gif converter free'], 'image-to-gif', 'Convert any PNG to GIF format instantly. GIF supports basic transparency (no alpha channel) and is widely supported for simple animations and web graphics.'),
  makePage('create-gif-from-images-online', 'Create GIF from Images Online — Free Animated GIF Maker', 'Create GIF from Images Online Free', 'Create an animated GIF from multiple images online for free. Upload frames and set the speed.', ['create gif from images online', 'make animated gif from images free', 'image to gif animation online', 'gif maker from photos online', 'animated gif creator free'], 'image-to-gif', 'Upload multiple images in sequence, set the frame delay, and download a smooth animated GIF. Perfect for creating quick animations, memes, and demos.'),
  makePage('gif-converter-online-free', 'GIF Converter Online Free — Convert Any Image to GIF', 'GIF Converter Online Free', 'Free online GIF converter. Convert any image format to GIF in your browser.', ['gif converter online free', 'online gif converter', 'free gif converter', 'image to gif online', 'convert to gif free'], 'image-to-gif', 'Supports JPG, PNG, WebP, BMP and other browser-readable formats. Convert to GIF instantly for use on forums, messaging apps, and web pages.'),
];

// ---------------------------------------------------------------------------
// Extra ZIP variants
// ---------------------------------------------------------------------------

const EXTRA_ZIP_PAGES: SeoPage[] = [
  makePage('download-images-as-zip-online', 'Download Images as ZIP — Free Batch Image Downloader', 'Download Images as ZIP Online', 'Package and download multiple images as a ZIP archive online for free. Browser-based batch download.', ['download images as zip online', 'batch image download zip', 'package images as zip free', 'zip image downloader online', 'download multiple images zip'], 'image-to-zip', 'Upload multiple images and download them all as a single ZIP archive. Perfect for sharing image sets, delivering client photos, and backing up image libraries.'),
  makePage('convert-images-to-zip-online', 'Convert Images to ZIP Online — Free Image Zipper', 'Convert Images to ZIP Online', 'Convert and compress multiple images into a ZIP archive online for free.', ['convert images to zip online', 'images to zip converter', 'zip images online free', 'compress images to zip', 'image zip creator online'], 'image-to-zip', 'Select any number of images and package them into a ZIP archive for easy sharing. The images are bundled as-is without additional compression.'),
  makePage('batch-convert-images-and-download-zip', 'Batch Convert Images & Download ZIP — Free Online', 'Batch Convert Images & Download ZIP', 'Convert multiple images to a target format and download all results as a ZIP archive. Free online tool.', ['batch convert images download zip', 'batch image converter zip download', 'convert multiple images zip', 'bulk image converter free zip', 'batch image processing zip'], 'image-to-zip', 'Upload multiple images, convert them all at once, and download the converted files as a ZIP archive — saving time compared to converting one image at a time.'),
];

// ---------------------------------------------------------------------------
// Extra HTML variants
// ---------------------------------------------------------------------------

const EXTRA_HTML_PAGES: SeoPage[] = [
  makePage('convert-image-to-html-email', 'Convert Image to HTML Email — Inline Base64 Images', 'Convert Image to HTML Email', 'Convert images to inline Base64 HTML for email templates. No external hosting needed.', ['convert image to html email', 'inline image html email', 'base64 image html email', 'embed image in html email', 'image to inline html email free'], 'image-to-html', 'Inline images in HTML emails ensure they display even when remote image loading is blocked by email clients. Convert your images to Base64 data URIs for reliable email display.'),
  makePage('embed-image-in-html-free-online', 'Embed Image in HTML Free Online — Base64 Data URI', 'Embed Image in HTML Online Free', 'Generate the HTML code to embed an image inline using Base64. No external server needed.', ['embed image in html free online', 'html image embed code generator', 'base64 image html code', 'inline image html generator free', 'image to html img tag online'], 'image-to-html', 'Get the complete <img> tag with Base64 data URI ready to paste into your HTML. The image loads without any external HTTP requests.'),
  makePage('image-to-css-background-online', 'Image to CSS Background — Base64 Background Generator', 'Image to CSS Background Online', 'Convert an image to a CSS background-image property with Base64 data URI. Free online tool.', ['image to css background online', 'base64 css background generator', 'css background image base64', 'convert image to css code', 'image to background css free'], 'image-to-html', 'Generate the CSS background-image declaration with your image embedded as a Base64 data URI. Copy and paste directly into your stylesheet.'),
];

// ---------------------------------------------------------------------------
// Format-conversion matrix
// Programmatically generates "convert {src} to {target}" pages for every
// source-format × conversion-tool combination that isn't already covered.
// ---------------------------------------------------------------------------

type ConversionTool = {
  key: ToolKey;
  targetSlug: string;   // e.g. "jpg"
  targetLabel: string;  // e.g. "JPG"
};

const CONVERSION_TOOLS: ConversionTool[] = [
  { key: 'image-to-jpg',         targetSlug: 'jpg',     targetLabel: 'JPG'     },
  { key: 'image-to-png',         targetSlug: 'png',     targetLabel: 'PNG'     },
  { key: 'image-to-webp',        targetSlug: 'webp',    targetLabel: 'WebP'    },
  { key: 'image-to-pdf',         targetSlug: 'pdf',     targetLabel: 'PDF'     },
  { key: 'image-to-gif',         targetSlug: 'gif',     targetLabel: 'GIF'     },
  { key: 'image-to-bmp',         targetSlug: 'bmp',     targetLabel: 'BMP'     },
  { key: 'image-to-svg',         targetSlug: 'svg',     targetLabel: 'SVG'     },
  { key: 'image-to-base64',      targetSlug: 'base64',  targetLabel: 'Base64'  },
  { key: 'image-to-grayscale',   targetSlug: 'grayscale', targetLabel: 'Grayscale' },
  { key: 'image-to-favicon',     targetSlug: 'ico',     targetLabel: 'ICO'     },
  { key: 'image-to-ascii',       targetSlug: 'ascii',   targetLabel: 'ASCII'   },
  { key: 'image-to-icon',        targetSlug: 'icon',    targetLabel: 'Icon'    },
  { key: 'image-to-html',        targetSlug: 'html',    targetLabel: 'HTML'    },
];

const CONVERSION_SOURCES = [
  { slug: 'jpg',        label: 'JPG'        },
  { slug: 'jpeg',       label: 'JPEG'       },
  { slug: 'png',        label: 'PNG'        },
  { slug: 'webp',       label: 'WebP'       },
  { slug: 'gif',        label: 'GIF'        },
  { slug: 'bmp',        label: 'BMP'        },
  { slug: 'tiff',       label: 'TIFF'       },
  { slug: 'heic',       label: 'HEIC'       },
  { slug: 'avif',       label: 'AVIF'       },
  { slug: 'svg',        label: 'SVG'        },
  { slug: 'pdf',        label: 'PDF'        },
  { slug: 'raw',        label: 'RAW'        },
];

/** Slugs already covered by manual EXTRA_* arrays — skip these to avoid duplicates. */
const CONVERSION_SKIP = new Set([
  'convert-png-to-jpg-online', 'convert-webp-to-jpg-online', 'convert-heic-to-jpg-online',
  'convert-gif-to-jpg-online', 'convert-bmp-to-jpg-online', 'convert-tiff-to-jpg-online',
  'convert-heic-to-png-online', 'convert-svg-to-png-online', 'convert-tiff-to-png-online',
  'convert-heic-to-webp-online', 'convert-gif-to-webp-online', 'convert-bmp-to-webp-online',
  'convert-png-to-pdf-online', 'convert-webp-to-pdf-online',
  'convert-jpg-to-svg-online', 'convert-png-to-svg-online',
  'convert-jpg-to-bmp-online', 'convert-png-to-bmp-online',
  'convert-jpg-to-gif-online', 'convert-png-to-gif-online',
  'convert-jpg-to-base64-online', 'convert-png-to-base64-online',
  'convert-jpg-to-grayscale-online', 'convert-png-to-grayscale-online',
]);

function conversionMatrixPages(): SeoPage[] {
  const pages: SeoPage[] = [];
  for (const tool of CONVERSION_TOOLS) {
    for (const src of CONVERSION_SOURCES) {
      // Skip converting a format to itself
      if (src.slug === tool.targetSlug) continue;
      // Skip where target and source are near-identical (jpg ↔ jpeg)
      if ((src.slug === 'jpg' && tool.targetSlug === 'jpeg') ||
          (src.slug === 'jpeg' && tool.targetSlug === 'jpg')) continue;

      const slug = `convert-${src.slug}-to-${tool.targetSlug}-online`;
      if (CONVERSION_SKIP.has(slug)) continue;

      pages.push(
        makePage(
          slug,
          `Convert ${src.label} to ${tool.targetLabel} Online Free`,
          `Convert ${src.label} to ${tool.targetLabel} Online`,
          `Convert ${src.label} images to ${tool.targetLabel} format online for free. Fast, browser-based, no upload required.`,
          [
            `convert ${src.slug} to ${tool.targetSlug} online`,
            `${src.slug} to ${tool.targetSlug} converter`,
            `${src.slug} to ${tool.targetSlug} online free`,
            `change ${src.slug} to ${tool.targetSlug}`,
            `${src.slug} ${tool.targetSlug} converter free`,
            `free ${src.slug} to ${tool.targetSlug} converter`,
          ],
          tool.key,
          `Upload your ${src.label} file and convert it to ${tool.targetLabel} instantly in your browser. No account required, no server upload — your file stays on your device.`,
        ),
      );
    }
  }
  return pages;
}

// ---------------------------------------------------------------------------
// Assemble all pages
// ---------------------------------------------------------------------------

const SEO_PAGES: SeoPage[] = [
  ...compressKBPages(),
  ...COMPRESS_GENERAL,
  ...resizeDimensionPages(),
  ...resizePercentagePages(),
  ...RESIZE_GENERAL,
  ...JPG_PAGES,
  ...PNG_PAGES,
  ...WEBP_PAGES,
  ...PDF_PAGES,
  ...GRAYSCALE_PAGES,
  ...BASE64_PAGES,
  ...TEXT_PAGES,
  ...FAVICON_PAGES,
  ...SVG_PAGES,
  ...QR_PAGES,
  ...COLOR_PALETTE_PAGES,
  ...ASCII_PAGES,
  ...PIXEL_ART_PAGES,
  ...ICON_PAGES,
  ...BMP_PAGES,
  ...GIF_PAGES,
  ...ZIP_PAGES,
  ...HTML_PAGES,
  ...EXTRA_COMPRESS_PAGES,
  ...EXTRA_RESIZE_PAGES,
  ...EXTRA_JPG_PAGES,
  ...EXTRA_PNG_PAGES,
  ...EXTRA_WEBP_PAGES,
  ...EXTRA_PDF_PAGES,
  ...EXTRA_GRAYSCALE_PAGES,
  ...EXTRA_BASE64_PAGES,
  ...EXTRA_TEXT_PAGES,
  ...EXTRA_FAVICON_PAGES,
  ...EXTRA_SVG_PAGES,
  ...EXTRA_QR_PAGES,
  ...EXTRA_COLOR_PALETTE_PAGES,
  ...EXTRA_ASCII_PAGES,
  ...EXTRA_PIXEL_ART_PAGES,
  ...EXTRA_ICON_PAGES,
  ...EXTRA_BMP_PAGES,
  ...EXTRA_GIF_PAGES,
  ...EXTRA_ZIP_PAGES,
  ...EXTRA_HTML_PAGES,
  ...conversionMatrixPages(),
];

/** Map from slug → SeoPage for O(1) lookup */
export const SEO_PAGE_MAP: ReadonlyMap<string, SeoPage> = new Map(
  SEO_PAGES.map((p) => [p.slug, p]),
);

/** Ordered list of all generated SEO pages */
export { SEO_PAGES };
