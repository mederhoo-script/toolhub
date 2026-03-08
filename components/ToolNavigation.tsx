'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tools = [
  { href: '/image-to-pdf', label: 'Image to PDF' },
  { href: '/compress-image', label: 'Compress' },
  { href: '/image-to-jpg', label: 'To JPG' },
  { href: '/image-to-png', label: 'To PNG' },
  { href: '/image-to-webp', label: 'To WebP' },
  { href: '/image-to-base64', label: 'To Base64' },
  { href: '/image-to-text', label: 'OCR / Text' },
  { href: '/image-to-grayscale', label: 'Grayscale' },
  { href: '/resize-image', label: 'Resize' },
  { href: '/image-to-favicon', label: 'To Favicon' },
];

export default function ToolNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Image tools navigation"
      className="w-full overflow-x-auto py-3"
    >
      <ul className="flex gap-2 min-w-max px-1" role="list">
        {tools.map((tool) => {
          const isActive = pathname === tool.href;
          return (
            <li key={tool.href}>
              <Link
                href={tool.href}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700'
                }`}
              >
                {tool.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
