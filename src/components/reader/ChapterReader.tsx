'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { List, ChevronDown, ChevronRight, BookOpen, ArrowRight } from 'lucide-react';
import { useTextSettings } from '@/hooks/useTextSettings';
import TextControls from './TextControls';
import MarkdownRenderer from './MarkdownRenderer';
import type { Chapter } from '@/lib/types';

interface ChapterReaderProps {
  chapter: Chapter;
  /** Optional link to the next chapter (shown in CTA at bottom). */
  nextChapter?: { number: number; title: string; href: string };
}

/**
 * Reader for textbook-style chapters (3–7).
 *
 * These chapters blend expository prose with embedded problems, so we render
 * the full markdown per section and provide a sticky section nav + TOC — the
 * same infrastructure as the chapter-2 reader, adapted for prose content.
 */
export default function ChapterReader({ chapter, nextChapter }: ChapterReaderProps) {
  const { cssVars } = useTextSettings();
  const [tocOpen, setTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(chapter.sections[0]?.id ?? null);

  // Scroll-spy: highlight the section currently in view
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

  const totalProblems = chapter.sections.reduce((a, s) => a + s.problemCount, 0);

  return (
    <div className="reading-page min-h-screen">
      {/* Sticky breadcrumb header */}
      <div
        className="sticky top-0 z-30 reading-card border-b"
        style={{ borderColor: 'var(--rt-card-border)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-1.5 text-xs font-medium min-w-0"
            style={{ color: 'var(--rt-text-muted)' }}
          >
            <span className="font-semibold truncate" style={{ color: 'var(--rt-text-secondary)' }}>
              Quant Finance Interview Prep
            </span>
            <span>/</span>
            <span className="font-semibold truncate" style={{ color: 'var(--rt-text)' }}>
              Chapter {chapter.number}: {chapter.title}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <TextControls />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Chapter title */}
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

          {/* Tag chips */}
          {chapter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {chapter.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-white border border-[#e4e6ea] text-[10px] text-[#626975] font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-4 text-xs text-[#626975]">
            <span>
              <strong className="text-[#21242c]">{chapter.sections.length}</strong> sections
            </span>
            <span>•</span>
            <span>
              <strong className="text-[#21242c]">{totalProblems}</strong> embedded problems
            </span>
          </div>
        </div>

        {/* Table of contents */}
        <div className="bg-white border border-[#e4e6ea] rounded-lg overflow-hidden mb-6">
          <button
            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#21242c] hover:bg-[#f7f8fa] transition-colors"
            onClick={() => setTocOpen(!tocOpen)}
          >
            <List size={15} className="text-[#626975]" />
            <span className="flex-1 text-left">Table of Contents</span>
            <span className="text-xs text-[#9299a5] font-normal">
              {chapter.sections.length} sections
            </span>
            {tocOpen ? (
              <ChevronDown size={14} className="text-[#9299a5]" />
            ) : (
              <ChevronRight size={14} className="text-[#9299a5]" />
            )}
          </button>

          {tocOpen && (
            <ul className="border-t border-[#e4e6ea] max-h-[60vh] overflow-y-auto">
              {chapter.sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <li key={sec.id}>
                    <a
                      href={`#section-${sec.id}`}
                      onClick={() => setTocOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors border-b border-[#f0f1f3] last:border-0
                        ${
                          isActive
                            ? 'bg-[var(--ka-blue-light)] text-[var(--ka-blue)] font-semibold'
                            : 'text-[#626975] hover:bg-[#f7f8fa] hover:text-[#21242c]'
                        }`}
                    >
                      <span className="text-[10px] font-bold tracking-wider text-[#9299a5] shrink-0 w-10">
                        §{sec.id}
                      </span>
                      <span className="flex-1 truncate">{sec.title}</span>
                      {sec.problemCount > 0 && (
                        <span className="text-[10px] font-semibold text-[#9299a5] px-1.5 py-0.5 rounded bg-[#f0f1f3]">
                          {sec.problemCount} {sec.problemCount === 1 ? 'problem' : 'problems'}
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Reading content */}
        <div className="reading-content space-y-10" style={cssVars}>
          {chapter.sections.map((sec) => (
            <section
              key={sec.id}
              id={`section-${sec.id}`}
              className="scroll-mt-16 reading-card border rounded-lg overflow-hidden"
            >
              {/* Section header */}
              <div className="px-6 pt-5 pb-4 border-b-2 border-[var(--ka-blue)] flex items-start gap-3">
                <BookOpen
                  size={18}
                  className="text-[var(--ka-blue)] shrink-0 mt-1"
                />
                <div>
                  <p className="text-[10px] font-bold text-[var(--ka-blue)] uppercase tracking-widest mb-0.5">
                    §{sec.id}
                  </p>
                  <h2 className="text-xl font-extrabold" style={{ color: 'var(--rt-text)' }}>
                    {sec.title}
                  </h2>
                  {sec.problemCount > 0 && (
                    <p className="text-[11px] text-[#9299a5] mt-0.5">
                      {sec.problemCount} worked {sec.problemCount === 1 ? 'problem' : 'problems'}
                    </p>
                  )}
                </div>
              </div>

              {/* Prose content */}
              <div className="px-6 py-5">
                <div className="prose-reading text-[#21242c]">
                  <MarkdownRenderer content={sec.content} />
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Next chapter CTA */}
        {nextChapter && (
          <div className="mt-8 bg-white border border-[#e4e6ea] rounded-lg p-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#9299a5] uppercase tracking-wider mb-1">Up next</p>
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
        )}

        {/* End of chapter */}
        {!nextChapter && (
          <div className="mt-12 py-8 text-center bg-white border border-[#e4e6ea] rounded-lg">
            <p className="text-3xl mb-2">🎓</p>
            <p className="text-lg font-bold text-[#21242c]">End of Chapter {chapter.number}</p>
            <p className="text-sm text-[#626975] mt-1">
              You&apos;ve reached the end of the book. Keep reviewing with flashcards to lock it in.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
