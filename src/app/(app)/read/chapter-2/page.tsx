'use client';

import { useTextSettings } from '@/hooks/useTextSettings';
import { useProgress } from '@/hooks/useProgress';
import { chapter2Problems, SECTIONS } from '@/data/problems';
import ProblemBlock from '@/components/reader/ProblemBlock';
import TableOfContents from '@/components/reader/TableOfContents';
import TextControls from '@/components/reader/TextControls';
import ReaderProgressPanel from '@/components/reader/ReaderProgressPanel';

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs font-medium min-w-0" style={{ color: 'var(--rt-text-muted)' }}>
            <span className="font-semibold truncate" style={{ color: 'var(--rt-text-secondary)' }}>Quant Finance Interview Prep</span>
            <span>/</span>
            <span className="font-semibold truncate" style={{ color: 'var(--rt-text)' }}>Chapter 2: Brain Teasers</span>
          </div>

          {/* Progress + settings */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-28 h-1.5 bg-[#e4e6ea] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--ka-blue)] rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-[var(--ka-blue)] whitespace-nowrap">
                {totalSolved}/{totalProblems}
              </span>
            </div>
            <TextControls />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
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

        {/* End of chapter */}
        <div className="mt-12 py-8 text-center bg-white border border-[#e4e6ea] rounded-lg">
          <p className="text-3xl mb-2">🎓</p>
          <p className="text-lg font-bold text-[#21242c]">End of Chapter 2</p>
          <p className="text-sm text-[#626975] mt-1">
            {totalSolved === totalProblems
              ? `All ${totalProblems} problems solved. Outstanding!`
              : `${totalProblems - totalSolved} problems remaining. Keep going!`}
          </p>
        </div>
      </div>
    </div>
  );
}
