'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, Library } from 'lucide-react';
import { SECTIONS } from '@/data/problems';
import { Badge } from '@/components/ui/Badge';

const MORE_BOOKS = [
  { href: '/read/chapter-1', label: 'Chapter 1 — General Principles', desc: '5 interview principles' },
  { href: '/read/chapter-3', label: 'Chapters 3–7 — Quant textbook',  desc: 'Calculus → Algorithms' },
  { href: '/read/effective-cpp', label: 'Effective C++ · Meyers',      desc: '55 items' },
  { href: '/read/competitive-programmers-handbook', label: "CP Handbook · Laaksonen", desc: '30 chapters' },
  { href: '/read/aops-vol1', label: 'AoPS Vol. 1 · Lehoczky & Rusczyk', desc: 'Olympiad-style maths' },
];

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
      id="library"
      className="py-14 sm:py-20 px-4 sm:px-6 scroll-mt-16"
      style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

        {/* More books in the library — surfaces every reading destination
            users couldn't otherwise discover from the landing page */}
        <div className="mt-10 sm:mt-14">
          <div className="flex items-center gap-2 mb-4">
            <Library size={15} style={{ color: 'var(--eureka-accent)' }} />
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: 'var(--eureka-accent)' }}
            >
              More in the library
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MORE_BOOKS.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="group flex items-start gap-3 p-4 transition-all duration-200"
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
                <BookOpen size={16} className="text-[#86868b] mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold tracking-tight text-[#1d1d1f] truncate">
                    {b.label}
                  </p>
                  <p className="text-[11px] text-[#86868b] mt-0.5">{b.desc}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-[#86868b] shrink-0 transition-colors duration-200 group-hover:text-[color:var(--eureka-accent)] mt-0.5"
                />
              </Link>
            ))}
          </div>

          {/* Single deep link into the dashboard, where the full course tree lives */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-[13px] font-semibold tracking-tight transition-all duration-200 active:scale-[0.97] w-full sm:w-auto"
              style={{
                borderRadius: 12,
                background: 'var(--eureka-accent)',
                color: '#ffffff',
                transitionTimingFunction: 'var(--ease-standard)',
              }}
            >
              Open the full dashboard <ArrowRight size={15} />
            </Link>
            <Link
              href="/flashcards"
              className="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-[13px] font-semibold tracking-tight border transition-all duration-200 active:scale-[0.97] w-full sm:w-auto"
              style={{
                borderRadius: 12,
                borderColor: 'rgba(0,0,0,0.1)',
                background: '#ffffff',
                color: '#424245',
                transitionTimingFunction: 'var(--ease-standard)',
              }}
            >
              <Layers size={15} /> Practice flashcards
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
