'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { List, ChevronDown, ChevronRight, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { useTextSettings } from '@/hooks/useTextSettings';
import { useProgress } from '@/hooks/useProgress';
import TextControls from './TextControls';
import MarkdownRenderer from './MarkdownRenderer';
import ProblemBlock from './ProblemBlock';
import type { Chapter, Problem } from '@/lib/types';

interface ChapterReaderProps {
  chapter: Chapter;
  nextChapter?: { number: number; title: string; href: string };
}

/**
 * Reader for textbook-style chapters (3–7).
 *
 * Mirrors the chapter-2 experience exactly — numbered problem cards with
 * progressive hint reveal + solution gate via <ProblemBlock/> + <SolutionReveal/>
 * — while preserving the textbook prose that introduces each technique. Each
 * section is rendered as an ordered list of content blocks (prose or problem).
 */
export default function ChapterReader({ chapter, nextChapter }: ChapterReaderProps) {
  const { cssVars } = useTextSettings();
  const { getProblemStatus } = useProgress();
  const [tocOpen, setTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(
    chapter.sections[0]?.id ?? null
  );

  /* Flatten all problems + assign sequential indexes within the chapter */
  const { allProblems, indexById } = useMemo(() => {
    const problems: Problem[] = [];
    const idx: Record<string, number> = {};
    chapter.sections.forEach((sec) => {
      sec.blocks.forEach((b) => {
        if (b.kind === 'problem') {
          problems.push(b.problem);
          idx[b.problem.id] = problems.length; // 1-indexed
        }
      });
    });
    return { allProblems: problems, indexById: idx };
  }, [chapter]);

  const totalProblems = allProblems.length;
  const solvedCount = allProblems.filter((p) => getProblemStatus(p.id) === 'solved').length;
  const pct = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  /* Scroll-spy: highlight the section currently in view */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    chapter.sections.forEach((sec) => {
      const el = document.getElementById(`section-${sec.id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sec.id);
        },
        { threshold: 0.1, rootMargin: '-80px 0px -70% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [chapter.sections]);

  return (
    <div className="reading-page min-h-screen">
      {/* Sticky header — breadcrumb + progress + text controls */}
      <div
        className="sticky top-0 z-30"
        style={{
          background: 'var(--material-thin-light)',
          backdropFilter: 'var(--material-blur)',
          WebkitBackdropFilter: 'var(--material-blur)',
          borderBottom: '0.5px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-4xl mx-auto px-3 sm:px-6 h-12 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-tight min-w-0 text-[#86868b] flex-1">
            {/* Mobile: just the chapter — desktop: full breadcrumb */}
            <span className="hidden sm:inline font-semibold truncate text-[#6e6e73]">
              Quant Finance Interview Prep
            </span>
            <span className="hidden sm:inline">/</span>
            <span className="font-semibold truncate text-[#1d1d1f]">
              Ch {chapter.number}
              <span className="hidden sm:inline">: {chapter.title}</span>
              <span className="sm:hidden"> · {chapter.title}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {totalProblems > 0 && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-16 sm:w-28 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: 'var(--eureka-accent)',
                      transition: 'width 500ms var(--ease-standard)',
                    }}
                  />
                </div>
                <span className="text-[11px] font-semibold whitespace-nowrap tabular-nums tracking-tight" style={{ color: 'var(--eureka-accent)' }}>
                  {solvedCount}/{totalProblems}
                </span>
              </div>
            )}
            <TextControls />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Chapter title card */}
        <div
          className="reading-card p-4 sm:p-6 mb-5 sm:mb-6"
          style={{ borderRadius: 20, border: '0.5px solid rgba(0,0,0,0.06)' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] mb-2" style={{ color: 'var(--eureka-accent)' }}>
            Chapter {chapter.number} · Pages {chapter.pageRange}
          </p>
          <h1
            className="font-semibold tracking-[-0.02em] leading-[1.1] text-[#1d1d1f] mb-3"
            style={{ fontSize: 'clamp(22px, 5vw, 32px)' }}
          >
            {chapter.title}
          </h1>
          <p className="text-[14px] text-[#6e6e73] leading-relaxed max-w-2xl">{chapter.overview}</p>

          {/* Section pills */}
          <div className="flex flex-wrap gap-2 mt-5 pt-5" style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
            {chapter.sections.map((sec) => (
              <a
                key={sec.id}
                href={`#section-${sec.id}`}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium tracking-tight transition-colors duration-200"
                style={{
                  background: 'rgba(0,0,0,0.04)',
                  color: '#424245',
                  transitionTimingFunction: 'var(--ease-standard)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--eureka-accent-tint)';
                  e.currentTarget.style.color = 'var(--eureka-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                  e.currentTarget.style.color = '#424245';
                }}
              >
                {sec.id} {sec.title}
              </a>
            ))}
          </div>
        </div>

        {/* Table of contents — mirrors ch 2 TableOfContents */}
        <div className="bg-white border border-[#e4e6ea] rounded-lg overflow-hidden mb-6">
          <button
            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#21242c] hover:bg-[#f7f8fa] transition-colors"
            onClick={() => setTocOpen(!tocOpen)}
          >
            <List size={15} className="text-[#626975]" />
            <span className="flex-1 text-left">Table of Contents</span>
            <span className="text-xs text-[#9299a5] font-normal">
              {solvedCount}/{totalProblems} solved
            </span>
            {tocOpen ? (
              <ChevronDown size={14} className="text-[#9299a5]" />
            ) : (
              <ChevronRight size={14} className="text-[#9299a5]" />
            )}
          </button>

          {tocOpen && (
            <div className="border-t border-[#e4e6ea] max-h-[60vh] overflow-y-auto">
              {chapter.sections.map((sec) => {
                const sectionProblems = sec.blocks
                  .filter((b) => b.kind === 'problem')
                  .map((b: any) => b.problem as Problem);
                return (
                  <div key={sec.id}>
                    <div className="px-4 py-2 bg-[#f7f8fa] sticky top-0 z-10 border-b border-[#e4e6ea]">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#9299a5]">
                        {sec.id} · {sec.title}
                      </p>
                    </div>
                    {sectionProblems.length === 0 ? (
                      <a
                        href={`#section-${sec.id}`}
                        onClick={() => setTocOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[#626975] hover:bg-[#f7f8fa] hover:text-[#21242c] transition-colors"
                      >
                        <Circle size={13} className="text-[#c8ccd4] shrink-0" />
                        <span className="italic">Reference section — no worked problems</span>
                      </a>
                    ) : (
                      <ul>
                        {sectionProblems.map((p) => {
                          const status = getProblemStatus(p.id);
                          const isActive = activeSection === sec.id;
                          return (
                            <li key={p.id}>
                              <a
                                href={`#${p.id}`}
                                onClick={() => setTocOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                                  ${
                                    isActive
                                      ? 'bg-[var(--ka-blue-light)] text-[var(--ka-blue)] font-semibold'
                                      : 'text-[#626975] hover:bg-[#f7f8fa] hover:text-[#21242c]'
                                  }`}
                              >
                                {status === 'solved' ? (
                                  <CheckCircle2 size={13} className="text-[#1fab54] shrink-0" />
                                ) : (
                                  <Circle size={13} className="text-[#c8ccd4] shrink-0" />
                                )}
                                <span className="truncate">{p.title}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Reading content */}
        <div className="reading-content space-y-12" style={cssVars}>
          {chapter.sections.map((sec) => (
            <section key={sec.id} id={`section-${sec.id}`} className="scroll-mt-16">
              {/* Section header */}
              <div
                className="flex items-center gap-3 mb-5 pb-3"
                style={{ borderBottom: `1px solid var(--eureka-accent-tint-strong)` }}
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--eureka-accent)' }}>
                    {sec.id}
                  </span>
                  <h2
                    className="font-semibold tracking-[-0.015em] leading-tight break-words"
                    style={{ color: 'var(--rt-text)', fontSize: 'clamp(18px, 4.5vw, 22px)' }}
                  >
                    {sec.title}
                  </h2>
                  {sec.problemCount > 0 && (
                    <p className="text-[11px] text-[#86868b] mt-0.5">
                      {sec.problemCount} worked{' '}
                      {sec.problemCount === 1 ? 'problem' : 'problems'}
                    </p>
                  )}
                </div>
              </div>

              {/* Interleaved prose + problem blocks */}
              <div className="space-y-4">
                {sec.blocks.map((block, i) => {
                  if (block.kind === 'prose') {
                    return (
                      <div
                        key={`${sec.id}-prose-${i}`}
                        className="reading-card px-4 sm:px-6 py-5"
                        style={{ borderRadius: 16, border: '0.5px solid rgba(0,0,0,0.06)' }}
                      >
                        <div className="prose-reading text-[#1d1d1f]">
                          <MarkdownRenderer content={block.markdown} />
                        </div>
                      </div>
                    );
                  }
                  const problem = block.problem;
                  return (
                    <ProblemBlock
                      key={problem.id}
                      problem={problem}
                      index={indexById[problem.id] ?? 0}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Next chapter CTA */}
        {nextChapter ? (
          <div
            className="mt-8 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{
              borderRadius: 20,
              background: '#ffffff',
              border: '0.5px solid rgba(0,0,0,0.06)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
          >
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#86868b] mb-1">
                Up next
              </p>
              <p className="text-[15px] sm:text-[16px] font-semibold tracking-tight text-[#1d1d1f]">
                Chapter {nextChapter.number}: {nextChapter.title}
              </p>
            </div>
            <Link
              href={nextChapter.href}
              className="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-[13px] font-semibold tracking-tight transition-all duration-200 active:scale-[0.97] shrink-0 w-full sm:w-auto"
              style={{
                borderRadius: 12,
                background: 'var(--eureka-accent)',
                color: '#ffffff',
                transitionTimingFunction: 'var(--ease-standard)',
              }}
            >
              <span className="sm:hidden">Start Ch {nextChapter.number}</span>
              <span className="hidden sm:inline">Start Chapter {nextChapter.number}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div
            className="mt-12 py-8 text-center"
            style={{
              borderRadius: 20,
              background: '#ffffff',
              border: '0.5px solid rgba(0,0,0,0.06)',
            }}
          >
            <p className="text-3xl mb-2">🎓</p>
            <p className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">End of Chapter {chapter.number}</p>
            <p className="text-[13px] text-[#6e6e73] mt-1 max-w-md mx-auto">
              {totalProblems > 0 && solvedCount === totalProblems
                ? `All ${totalProblems} problems solved. Outstanding.`
                : `You've reached the end of the book. Keep reviewing with flashcards to lock it in.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
