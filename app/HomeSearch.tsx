'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Tool {
  href: string;
  icon: string;
  name: string;
  description: string;
}

interface HomeSearchProps {
  tools: Tool[];
}

export default function HomeSearch({ tools }: HomeSearchProps) {
  const [query, setQuery] = useState('');

  const filtered = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="mb-8">
        <label htmlFor="tool-search" className="sr-only">
          Search image tools
        </label>
        <div className="relative max-w-md mx-auto">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
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
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-neutral-500 py-8">
          No tools found for &ldquo;{query}&rdquo;
        </p>
      ) : (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
          aria-label="Available image tools"
        >
          {filtered.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="flex flex-col gap-3 p-5 bg-white rounded-2xl border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 h-full"
              >
                <span className="text-3xl" aria-hidden="true">
                  {tool.icon}
                </span>
                <div>
                  <h2 className="font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {tool.name}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <span className="mt-auto text-xs font-medium text-primary-600 group-hover:underline">
                  Use tool →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
