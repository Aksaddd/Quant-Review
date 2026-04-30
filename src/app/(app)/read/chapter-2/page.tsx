'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useTextSettings } from '@/hooks/useTextSettings';
import { useProgress } from '@/hooks/useProgress';
import { chapter2Problems, SECTIONS } from '@/data/problems';
import ProblemBlock from '@/components/reader/ProblemBlock';
import TableOfContents from '@/components/reader/TableOfContents';
import TextControls from '@/components/reader/TextControls';
import ReaderProgressPanel from '@/components/reader/ReaderProgressPanel';
import ChapterPager from '@/components/reader/ChapterPager';

export default function Chapter2Page() {
  const { cssVars } = useTextSettings();
  const { totalSolved, totalProblems } = useProgress();
  const pct = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  const grouped = SECTIONS.map((sec) => ({
    ...sec,
    problems: chapter2Problems.filter((p) => p.section === sec.id),
  }));

  return (
    <div className="reading-page min-h-screen">
      {/* Sticky header — KA breadcrumb style */}
      <div className="sticky top-0 z-30 reading-card border-b" style={{ borderColor: 'var(--rt-card-border)' }}>
        <div className="max-w-4xl mx-auto px-3 sm:px-6 h-12 flex items-center justify-between gap-2 sm:gap-4">
          {/* Breadcrumb + mobile back button */}
          <div className="flex items-center gap-1.5 text-xs font-medium min-w-0 flex-1" style={{ color: 'var(--rt-text-muted)' }}>
            <Link
              href="/dashboard"
              aria-label="Back to dashboard"
              className="lg:hidden w-9 h-9 -ml-1.5 flex items-center justify-center rounded-full text-[#626975] hover:text-[#21242c] hover:bg-[#f0f1f3] transition-colors shrink-0"
            >
              <ChevronLeft size={18} />
            </Link>
            <span className="hidden sm:inline font-semibold truncate" style={{ color: 'var(--rt-text-secondary)' }}>Quant Finance Interview Prep</span>
            <span className="hidden sm:inline">/</span>
            <span className="font-semibold truncate" style={{ color: 'var(--rt-text)' }}>Chapter 2<span className="hidden sm:inline">: Brain Teasers</span></span>
          </div>

          {/* Progress + settings */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-16 sm:w-28 h-1.5 bg-[#e4e6ea] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--ka-blue)] rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-[var(--ka-blue)] whitespace-nowrap tabular-nums">
                {totalSolved}/{totalProblems}
              </span>
            </div>
            <TextControls />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Chapter title */}
        <div className="reading-card border rounded-lg p-6 mb-6">
          <p className="text-xs font-bold text-[var(--ka-blue)] uppercase tracking-widest mb-1">
            Chapter 2
          </p>
          <h1 className="text-2xl font-extrabold text-[#21242c] mb-2">Brain Teasers</h1>
          <p className="text-sm text-[#626975] leading-relaxed max-w-2xl">
            Brain teasers are a staple of quantitative finance interviews. This chapter covers nine
            categories of problem-solving techniques — from simplification and logic reasoning to
            modular arithmetic and proof by contradiction — each illustrated with problems from
            real finance interviews.
          </p>

          {/* Section pills */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#e4e6ea]">
            {SECTIONS.map((sec) => (
              <a
                key={sec.id}
                href={`#section-${sec.id}`}
                className="px-2.5 py-1 rounded-full bg-[#f0f1f3] text-[#626975] text-xs font-medium
                  hover:bg-[var(--ka-blue-light)] hover:text-[var(--ka-blue)] transition-colors"
              >
                {sec.id} {sec.title}
              </a>
            ))}
          </div>
        </div>

        {/* Table of contents */}
        <div className="mb-6">
          <TableOfContents problems={chapter2Problems} />
        </div>

        {/* Reading content */}
        <div className="reading-content space-y-12" style={cssVars}>
          {grouped.map((sec) => (
            <section key={sec.id} id={`section-${sec.id}`} className="scroll-mt-16">
              {/* Section header — KA unit header style */}
              <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-[var(--ka-blue)]">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[var(--ka-blue)] uppercase tracking-widest">
                    {sec.id}
                  </span>
                  <h2 className="text-xl font-extrabold" style={{ color: 'var(--rt-text)' }}>{sec.title}</h2>
                </div>
              </div>

              {/* Problems */}
              <div className="space-y-4">
                {sec.problems.map((problem) => {
                  const globalIndex = chapter2Problems.indexOf(problem) + 1;
                  return (
                    <ProblemBlock key={problem.id} problem={problem} index={globalIndex} />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Floating progress panel */}
        <ReaderProgressPanel />

        {/* Chapter footer navigation */}
        <ChapterPager
          prev={{ number: 1, title: 'General Principles', href: '/read/chapter-1' }}
          next={{ number: 3, title: 'Calculus and Linear Algebra', href: '/read/chapter-3' }}
        />
      </div>
    </div>
  );
}
