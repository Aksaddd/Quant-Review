'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import {
  cpHandbookChapters,
  cpHandbookParts,
} from '@/data/competitive-programmers-handbook';

const DIFFICULTY_STYLES: Record<string, { bg: string; fg: string; label: string }> = {
  beginner:     { bg: 'bg-[#e6f4ea]', fg: 'text-[#1e6b34]', label: 'Beginner' },
  intermediate: { bg: 'bg-[#fff4de]', fg: 'text-[#8a5a00]', label: 'Intermediate' },
  advanced:     { bg: 'bg-[#fde8e6]', fg: 'text-[#a21f1f]', label: 'Advanced' },
};

export default function CpHandbookIndexPage() {
  const total = cpHandbookChapters.length;
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#626975] mb-3">
          <BookOpen size={13} />
          <span>Antti Laaksonen · Draft July 3, 2018</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-3">
          Competitive Programmer&apos;s Handbook
        </h1>
        <p className="text-[15px] text-[#626975] leading-relaxed max-w-2xl">
          A thorough introduction to competitive programming across 30 chapters,
          grouped into three parts: basic techniques, graph algorithms, and
          advanced topics. Each chapter weaves together prose, C++ code, and
          worked examples.
        </p>
        <div className="mt-5 flex gap-2 text-[12px] text-[#626975]">
          <span className="px-2.5 py-1 rounded-full bg-[#f0f1f3]">{total} chapters</span>
          <span className="px-2.5 py-1 rounded-full bg-[#f0f1f3]">
            {cpHandbookParts.length} parts
          </span>
        </div>
      </header>

      <div className="space-y-12">
        {cpHandbookParts.map((part) => (
          <section key={part.number}>
            <div className="flex items-baseline gap-3 mb-5 pb-2 border-b-2 border-[#1d1d1f]">
              <span className="text-[11px] font-bold text-[#1865f2] tabular-nums">
                PART {part.roman}
              </span>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] tracking-tight">
                {part.title}
              </h2>
              <span className="ml-auto text-[11px] text-[#9299a5] tabular-nums">
                {part.chapters.length} chapters
              </span>
            </div>
            <ul className="space-y-1">
              {part.chapters.map((ch) => {
                const d = DIFFICULTY_STYLES[ch.difficulty] ?? DIFFICULTY_STYLES.intermediate;
                return (
                  <li key={ch.chapter}>
                    <Link
                      href={`/read/competitive-programmers-handbook/${ch.chapter}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f0f1f3] transition-colors group"
                    >
                      <span className="w-10 text-[11px] font-bold text-[#9299a5] tabular-nums shrink-0">
                        Ch {ch.chapter}
                      </span>
                      <span className="flex-1 text-[14px] text-[#21242c] group-hover:text-black leading-snug">
                        {ch.title}
                      </span>
                      <span
                        className={clsx(
                          'text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0',
                          d.bg,
                          d.fg,
                        )}
                      >
                        {d.label}
                      </span>
                      <ChevronRight
                        size={14}
                        className="text-[#9299a5] group-hover:text-[#626975] shrink-0"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
