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
      {/* Sticky header — breadcrumb + progress + text controls (matches ch 2) */}
      <div
        className="sticky top-0 z-30 reading-card border-b"
        style={{ borderColor: 'var(--rt-card-border)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-1.5 text-xs font-medium min-w-0"
            style={{ color: 'var(--rt-text-muted)' }}
          >
            <span
              className="font-semibold truncate"
              style={{ color: 'var(--rt-text-secondary)' }}
            >
              Quant Finance Interview Prep
            </span>
            <span>/</span>
            <span className="font-semibold truncate" style={{ color: 'var(--rt-text)' }}>
              Chapter {chapter.number}: {chapter.title}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {totalProblems > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-28 h-1.5 bg-[#e4e6ea] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--ka-blue)] rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-[var(--ka-blue)] whitespace-nowrap">
                  {solvedCount}/{totalProblems}
                </span>
              </div>
            )}
            <TextControls />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Chapter title card (matches ch 2) */}
        <div className="reading-card border rounded-lg p-6 mb-6">
          <p className="text-xs font-bold text-[var(--ka-blue)] uppercase tracking-widest mb-1">
            Chapter {chapter.number} · Pages {chapter.pageRange}
          </p>
          <h1 className="text-2xl font-extrabold text-[#21242c] mb-2">{chapter.title}</h1>
          <p className="text-sm text-[#626975] leading-relaxed max-w-2xl">{chapter.overview}</p>

          {/* Section pills */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#e4e6ea]">
            {chapter.sections.map((sec) => (
              <a
                key={sec.id}
                href={`#section-${sec.id}`}
                className="px-2.5 py-1 rounded-full bg-[#f0f1f3] text-[#626975] text-xs font-medium
                  hover:bg-[var(--ka-blue-light)] hover:text-[var(--ka-blue)] transition-colors"
              >
                §{sec.id} {sec.title}
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
                        §{sec.id} · {sec.title}
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
              {/* Section header — matches ch 2 unit header */}
              <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-[var(--ka-blue)]">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[var(--ka-blue)] uppercase tracking-widest">
                    §{sec.id}
                  </span>
                  <h2 className="text-xl font-extrabold" style={{ color: 'var(--rt-text)' }}>
                    {sec.title}
                  </h2>
                  {sec.problemCount > 0 && (
                    <p className="text-[11px] text-[#9299a5] mt-0.5">
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
                        className="reading-card border rounded-lg px-6 py-5"
                      >
                        <div className="prose-reading text-[#21242c]">
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
          <div className="mt-8 bg-white border border-[#e4e6ea] rounded-lg p-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#9299a5] uppercase tracking-wider mb-1">
                Up next
              </p>
              <p className="text-base font-extrabold text-[#21242c]">
                Chapter {nextChapter.number}: {nextChapter.title}
              </p>
            </div>
            <Link
              href={nextChapter.href}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--ka-blue)] text-white text-sm font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors shrink-0"
            >
              Start Chapter {nextChapter.number} <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="mt-12 py-8 text-center bg-white border border-[#e4e6ea] rounded-lg">
            <p className="text-3xl mb-2">🎓</p>
            <p className="text-lg font-bold text-[#21242c]">End of Chapter {chapter.number}</p>
            <p className="text-sm text-[#626975] mt-1">
              {totalProblems > 0 && solvedCount === totalProblems
                ? `All ${totalProblems} problems solved. Outstanding!`
                : `You've reached the end of the book. Keep reviewing with flashcards to lock it in.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
