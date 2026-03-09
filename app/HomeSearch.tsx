'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface Tool {
  href: string;
  icon: string;
  name: string;
  description: string;
  color?: string;
  category?: string;
}

interface HomeSearchProps {
  tools: Tool[];
}

const CATEGORIES = ['All', 'Convert', 'Optimize', 'Extract', 'Generate', 'Export'] as const;
type Category = (typeof CATEGORIES)[number];

function HomeSearchInner({ tools }: HomeSearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL is the source of truth for the search query — enables the SearchAction
  const query = searchParams.get('q') ?? '';
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const isSearching = query.trim().length > 0;

  const filtered = tools.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    return isSearching ? matchesSearch : matchesCategory;
  });

  return (
    <>
      {/* Search bar */}
      <div className="mb-6">
        <label htmlFor="tool-search" className="sr-only">
          Search image tools
        </label>
        <div className="relative max-w-lg mx-auto">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            id="tool-search"
            type="search"
            placeholder="Search tools…"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white shadow-sm placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Category tabs — hidden while searching */}
      {!isSearching && (
        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Filter tools by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary-300 hover:text-primary-700'
              }`}
            >
              {cat}
              {cat === 'All' && (
                <span className={`ml-1.5 text-xs ${activeCategory === cat ? 'text-primary-200' : 'text-neutral-400'}`}>
                  {tools.length}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-neutral-500 font-medium">
            No tools found for &ldquo;{query}&rdquo;
          </p>
          <p className="text-neutral-400 text-sm mt-1">Try a different search term</p>
        </div>
      ) : (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          role="list"
          aria-label="Available image tools"
        >
          {filtered.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="card-hover flex flex-col gap-3 p-5 bg-white rounded-2xl border border-neutral-100 hover:border-primary-200 shadow-sm h-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 group"
              >
                <span
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl text-2xl ${tool.color ?? 'bg-primary-50 text-primary-600'}`}
                  aria-hidden="true"
                >
                  {tool.icon}
                </span>
                <div className="flex-1">
                  <h2 className="font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors text-sm leading-snug">
                    {tool.name}
                  </h2>
                  <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:gap-2 transition-all">
                  Use tool
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function HomeSearch({ tools }: HomeSearchProps) {
  return (
    <Suspense fallback={null}>
      <HomeSearchInner tools={tools} />
    </Suspense>
  );
}
