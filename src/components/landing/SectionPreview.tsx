'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SECTIONS } from '@/data/problems';
import { Badge } from '@/components/ui/Badge';

const SECTION_EMOJI: Record<string, string> = {
  '2.1': '🎯',
  '2.2': '🧠',
  '2.3': '💡',
  '2.4': '⚖️',
  '2.5': '∑',
  '2.6': '🕊️',
  '2.7': '🔢',
  '2.8': '📐',
  '2.9': '⚡',
};

export default function SectionPreview() {
  return (
    <section
      className="py-20 px-4 sm:px-6"
      style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-2"
              style={{ color: 'var(--eureka-accent)' }}
            >
              Chapter 2 — Brain Teasers
            </p>
            <h2
              className="font-semibold tracking-[-0.02em] text-[#1d1d1f]"
              style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', lineHeight: 1.1 }}
            >
              9 sections · 37 problems
            </h2>
          </div>
          <Link
            href="/read/chapter-2"
            className="flex items-center gap-1.5 text-[13px] font-semibold tracking-tight hover:gap-2.5 transition-all duration-200"
            style={{ color: 'var(--eureka-accent)', transitionTimingFunction: 'var(--ease-standard)' }}
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SECTIONS.map(({ id, title }) => (
            <Link
              key={id}
              href={`/read/chapter-2#section-${id.replace('.', '-')}`}
              className="flex items-center gap-3 p-4 group transition-all duration-200"
              style={{
                background: '#ffffff',
                border: '0.5px solid rgba(0,0,0,0.06)',
                borderRadius: 14,
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                transitionTimingFunction: 'var(--ease-standard)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <span className="text-xl w-8 text-center shrink-0">
                {SECTION_EMOJI[id] ?? '📖'}
              </span>
              <div className="min-w-0">
                <Badge variant="muted" size="sm">{id}</Badge>
                <p className="text-[13px] font-semibold tracking-tight text-[#1d1d1f] mt-1 truncate">
                  {title}
                </p>
              </div>
              <ArrowRight
                size={14}
                className="ml-auto text-[#86868b] shrink-0 transition-colors duration-200 group-hover:text-[color:var(--eureka-accent)]"
                style={{ transitionTimingFunction: 'var(--ease-standard)' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
