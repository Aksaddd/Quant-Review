'use client';

import { useTextSettings } from '@/hooks/useTextSettings';
import { useProgress } from '@/hooks/useProgress';
import { chapter2Problems, SECTIONS } from '@/data/problems';
import ProblemBlock from '@/components/reader/ProblemBlock';
import TableOfContents from '@/components/reader/TableOfContents';
import TextControls from '@/components/reader/TextControls';
import { ProgressBar } from '@/components/ui/Progress';

export default function Chapter2Page() {
  const { cssVars } = useTextSettings();
  const { totalSolved, totalProblems } = useProgress();
  const pct = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  // Group problems by section
  const grouped = SECTIONS.map((sec) => ({
    ...sec,
    problems: chapter2Problems.filter((p) => p.section === sec.id),
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 mb-4
        bg-[var(--surface-0)]/90 backdrop-blur-sm border-b border-[var(--surface-border)]
        flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
            Chapter 2 — Brain Teasers · {totalSolved}/{totalProblems} solved
          </p>
          <ProgressBar value={pct} size="sm" />
        </div>
        <TextControls />
      </div>

      {/* Chapter header */}
      <div className="mb-8">
        <p className="text-xs font-medium text-brand-400 uppercase tracking-widest mb-1">
          A Practical Guide to Quantitative Finance Interviews
        </p>
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">
          Chapter 2: Brain Teasers
        </h1>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-2xl">
          Brain teasers are a staple of quant interviews. This chapter covers nine categories of
          techniques — from problem simplification to proof by contradiction — each illustrated
          with problems sourced from real finance interviews.
        </p>
      </div>

      {/* Table of contents */}
      <div className="mb-8">
        <TableOfContents problems={chapter2Problems} />
      </div>

      {/* Reading content — apply text CSS vars here */}
      <div className="reading-content space-y-16" style={cssVars}>
        {grouped.map((sec) => (
          <section
            key={sec.id}
            id={`section-${sec.id}`}
            className="scroll-mt-20"
          >
            {/* Section header */}
            <div className="mb-6 pb-4 border-b border-[var(--surface-border)]">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
                  §{sec.id}
                </span>
                <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
                  {sec.title}
                </h2>
              </div>
            </div>

            {/* Problems */}
            <div className="space-y-6">
              {sec.problems.map((problem, i) => {
                const globalIndex = chapter2Problems.indexOf(problem) + 1;
                return (
                  <ProblemBlock
                    key={problem.id}
                    problem={problem}
                    index={globalIndex}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* End of chapter */}
      <div className="mt-16 py-10 text-center border-t border-[var(--surface-border)]">
        <p className="text-2xl mb-2">🎉</p>
        <p className="text-sm font-semibold text-[var(--text-primary)]">End of Chapter 2</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          {totalSolved === totalProblems
            ? `All ${totalProblems} problems solved. Excellent work!`
            : `${totalProblems - totalSolved} problems remaining. Keep going!`}
        </p>
      </div>
    </div>
  );
}
