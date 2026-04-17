'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { effectiveCppChapters, effectiveCppItems } from '@/data/effective-cpp';

const DIFFICULTY_STYLES: Record<string, { bg: string; fg: string; label: string }> = {
  beginner:     { bg: 'bg-[#e6f4ea]', fg: 'text-[#1e6b34]', label: 'Beginner' },
  intermediate: { bg: 'bg-[#fff4de]', fg: 'text-[#8a5a00]', label: 'Intermediate' },
  advanced:     { bg: 'bg-[#fde8e6]', fg: 'text-[#a21f1f]', label: 'Advanced' },
};

export default function EffectiveCppIndexPage() {
  const total = effectiveCppItems.length;
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#626975] mb-3">
          <BookOpen size={13} />
          <span>Scott Meyers · 3rd Edition</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-3">
          Effective C++
        </h1>
        <p className="text-[15px] text-[#626975] leading-relaxed max-w-2xl">
          55 specific ways to improve your C++ programs and designs, organized across nine
          chapters. Each item includes prose, code examples, and a rules-of-thumb checklist
          to remember.
        </p>
        <div className="mt-5 flex gap-2 text-[12px] text-[#626975]">
          <span className="px-2.5 py-1 rounded-full bg-[#f0f1f3]">{total} items</span>
          <span className="px-2.5 py-1 rounded-full bg-[#f0f1f3]">
            {effectiveCppChapters.length} chapters
          </span>
        </div>
      </header>

      <div className="space-y-10">
        {effectiveCppChapters.map((chap) => (
          <section key={chap.number}>
            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-[#e4e6ea]">
              <span className="text-[11px] font-bold text-[#9299a5] tabular-nums">
                CHAPTER {chap.number}
              </span>
              <h2 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
                {chap.title}
              </h2>
              <span className="ml-auto text-[11px] text-[#9299a5] tabular-nums">
                {chap.items.length} items
              </span>
            </div>
            <ul className="space-y-1">
              {chap.items.map((it) => {
                const d = DIFFICULTY_STYLES[it.difficulty] ?? DIFFICULTY_STYLES.intermediate;
                return (
                  <li key={it.item}>
                    <Link
                      href={`/read/effective-cpp/${it.item}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f0f1f3] transition-colors group"
                    >
                      <span className="w-8 text-[11px] font-bold text-[#9299a5] tabular-nums shrink-0">
                        #{it.item}
                      </span>
                      <span className="flex-1 text-[14px] text-[#21242c] group-hover:text-black leading-snug">
                        {it.title.replace(/\.$/, '')}
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
                      {it.has_missing_figure && (
                        <span
                          title="Original printed figure is missing"
                          className="text-[10px] text-[#9299a5] shrink-0"
                        >
                          <Sparkles size={11} />
                        </span>
                      )}
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
