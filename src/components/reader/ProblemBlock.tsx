'use client';

import { useEffect, useRef } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);

  /* Auto-mark as 'attempted' when the problem scrolls into view */
  useEffect(() => {
    if (status !== 'unseen') return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProblemStatus(problem.id, 'attempted');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [status, problem.id, setProblemStatus]);

  return (
    <div
      ref={ref}
      id={problem.id}
      className={`reading-card border rounded-lg overflow-hidden scroll-mt-16 transition-colors
        ${status === 'solved' ? 'border-[#a8d5b5]' : ''}`}
    >
      {/* Problem header */}
      <div className={`reading-card-header px-5 pt-4 pb-3 border-b ${status === 'solved' ? 'border-[#a8d5b5] !bg-[#f6fef9]' : ''}`}>
        <div className="flex items-start gap-3">
          {/* Number */}
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5
              ${status === 'solved'
                ? 'bg-[#1fab54] text-white'
                : 'bg-[#f0f1f3] text-[#9299a5] border border-[#e4e6ea]'
              }`}
          >
            {index}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-[#9299a5] uppercase tracking-wider">§{problem.section}</span>
              <DifficultyBadge difficulty={problem.difficulty} />
              {status === 'solved' && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e6f4ea] text-[#1fab54] border border-[#a8d5b5]">
                  ✓ Solved
                </span>
              )}
              {status === 'attempted' && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef9e7] text-[#f5a623] border border-[#fdd8a0]">
                  In progress
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-[#21242c]">{problem.title}</h3>
            {problem.keyTechnique && (
              <p className="text-xs text-[#9299a5] mt-0.5">
                <span className="font-semibold text-[#626975]">Technique:</span> {problem.keyTechnique}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Problem setup */}
      <div className="px-5 py-4">
        <div className="prose-reading text-[#21242c]">
          <MarkdownRenderer content={problem.setup} />
        </div>
      </div>

      {/* Solution */}
      <div className="px-5 pb-5">
        <SolutionReveal
          solution={problem.solution}
          finalAnswer={problem.finalAnswer}
          hints={problem.hints}
          currentStatus={status}
          onSolved={() => setProblemStatus(problem.id, 'solved')}
          onAttempted={() => { if (status === 'unseen') setProblemStatus(problem.id, 'attempted'); }}
          onUndoSolved={() => setProblemStatus(problem.id, 'attempted')}
          onReset={() => setProblemStatus(problem.id, 'unseen')}
        />
      </div>
    </div>
  );
}
