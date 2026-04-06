'use client';

import { useProgress } from '@/hooks/useProgress';
import { DifficultyBadge } from '@/components/ui/Badge';
import MarkdownRenderer from './MarkdownRenderer';
import SolutionReveal from './SolutionReveal';
import type { Problem } from '@/lib/types';

interface ProblemBlockProps {
  problem: Problem;
  index: number;
}

export default function ProblemBlock({ problem, index }: ProblemBlockProps) {
  const { getProblemStatus, setProblemStatus } = useProgress();
  const status = getProblemStatus(problem.id);

  return (
    <div
      id={problem.id}
      className={`rounded-2xl border transition-colors duration-300 overflow-hidden
        ${status === 'solved'
          ? 'border-[var(--success)]/30 bg-[var(--surface-2)]'
          : 'border-[var(--surface-border)] bg-[var(--surface-2)]'
        }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 px-5 pt-5 pb-3">
        {/* Number badge */}
        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5
          ${status === 'solved'
            ? 'bg-[var(--success)]/15 text-[var(--success)] border border-[var(--success)]/25'
            : 'bg-[var(--surface-3)] text-[var(--text-muted)] border border-[var(--surface-border)]'
          }`}>
          {index}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-medium text-[var(--text-muted)]">§{problem.section}</span>
            <DifficultyBadge difficulty={problem.difficulty} />
            {status === 'solved' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--success)]/15 text-[var(--success)] border border-[var(--success)]/25">
                Solved
              </span>
            )}
            {status === 'attempted' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--warning-bg)] text-[var(--warning)] border border-[var(--warning)]/25">
                Attempted
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">{problem.title}</h3>
          {problem.keyTechnique && (
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              <span className="font-medium text-[var(--text-secondary)]">Key technique:</span> {problem.keyTechnique}
            </p>
          )}
        </div>
      </div>

      {/* Problem setup */}
      <div className="px-5 pb-2">
        <div className="reading-content">
          <MarkdownRenderer content={problem.setup} />
        </div>
      </div>

      {/* Solution reveal */}
      <div className="px-5 pb-5">
        <SolutionReveal
          solution={problem.solution}
          finalAnswer={problem.finalAnswer}
          hints={problem.hints}
          currentStatus={status}
          onSolved={() => setProblemStatus(problem.id, 'solved')}
          onAttempted={() => {
            if (status === 'unseen') setProblemStatus(problem.id, 'attempted');
          }}
        />
      </div>
    </div>
  );
}
