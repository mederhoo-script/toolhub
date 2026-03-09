'use client';

import { useState } from 'react';
import { FAQ } from '@/types';

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <h2
        id="faq-heading"
        className="text-2xl font-bold text-neutral-900 mb-6"
      >
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-xl overflow-hidden transition-colors ${
              openIndex === index
                ? 'bg-primary-50 border-primary-200'
                : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <button
              type="button"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-neutral-800 hover:bg-black/[0.02] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
            >
              <span className="pr-4">{faq.question}</span>
              <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-primary-600 text-white rotate-180' : 'bg-neutral-100 text-neutral-500'}`}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>

            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              hidden={openIndex !== index}
              className="px-5 pb-5 text-neutral-600 leading-relaxed text-sm"
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
