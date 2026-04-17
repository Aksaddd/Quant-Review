'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useXPStore, XP_REWARDS } from '@/stores/useXPStore';
import { useCanvasStore } from '@/hooks/useCanvasStore';
import type { CanvasSnapshot } from '@/components/reader/ApproachCanvas';
import { DifficultyBadge } from '@/components/ui/Badge';
import MarkdownRenderer from './MarkdownRenderer';
import SolutionReveal from './SolutionReveal';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import type { Problem } from '@/lib/types';

interface ProblemBlockProps {
  problem: Problem;
  index: number;
}

export default function ProblemBlock({ problem, index }: ProblemBlockProps) {
  const { getProblemStatus, setProblemStatus } = useProgress();
  const awardXP = useXPStore((s) => s.awardXP);
  const triggerFiero = useXPStore((s) => s.triggerFiero);
  const { saveCanvas, loadCanvas } = useCanvasStore();
  const status = getProblemStatus(problem.id);
  const ref = useRef<HTMLDivElement>(null);
  const [savedSnapshot, setSavedSnapshot] = useState<CanvasSnapshot | null>(null);

  // Load any previously saved canvas on mount
  useEffect(() => {
    const snapshot = loadCanvas(problem.id);
    if (snapshot) setSavedSnapshot(snapshot);
  }, [problem.id, loadCanvas]);

  const handleCanvasSubmit = useCallback((snapshot: CanvasSnapshot) => {
    saveCanvas(problem.id, snapshot);
    setSavedSnapshot(snapshot);
  }, [problem.id, saveCanvas]);

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

  const handleSolved = useCallback((hintsUsed: number) => {
    setProblemStatus(problem.id, 'solved');

    // Award XP based on difficulty and hint usage
    const isHard = problem.difficulty === 'hard';
    const noHints = hintsUsed === 0;

    if (isHard && noHints) {
      awardXP('problem_solved', XP_REWARDS.hintFreeHardSolve, `${problem.title} — no hints!`);
      triggerFiero(); // Fiero moment!
    } else if (noHints) {
      awardXP('problem_solved', XP_REWARDS.problemSolvedNoHint, `${problem.title} — no hints`);
    } else if (isHard) {
      awardXP('problem_solved', XP_REWARDS.problemSolvedHard, problem.title);
    } else {
      awardXP('problem_solved', XP_REWARDS.problemSolved, problem.title);
    }
  }, [problem, setProblemStatus, awardXP, triggerFiero]);

  const solved = status === 'solved';
  const attempted = status === 'attempted';

  return (
    <div
      ref={ref}
      id={problem.id}
      className="reading-card overflow-hidden scroll-mt-16 transition-all duration-300"
      style={{
        borderRadius: 20,
        border: solved ? '0.5px solid rgba(48,209,88,0.35)' : '0.5px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        transitionTimingFunction: 'var(--ease-standard)',
      }}
    >
      {/* Problem header */}
      <div
        className="reading-card-header px-5 pt-4 pb-3"
        style={{
          borderBottom: '0.5px solid rgba(0,0,0,0.06)',
          background: solved ? 'rgba(48,209,88,0.04)' : undefined,
        }}
      >
        <div className="flex items-start gap-3">
          {/* Number */}
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 tracking-tight"
            style={
              solved
                ? { background: '#30d158', color: '#ffffff' }
                : { background: 'rgba(0,0,0,0.05)', color: '#86868b', border: '0.5px solid rgba(0,0,0,0.08)' }
            }
          >
            {index}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-[0.06em]">{problem.section}</span>
              <DifficultyBadge difficulty={problem.difficulty} />
              {solved && (
                <span
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-tight"
                  style={{ background: 'rgba(48,209,88,0.14)', color: '#1f9b46' }}
                >
                  ✓ Solved
                </span>
              )}
              {attempted && (
                <span
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-tight"
                  style={{ background: 'rgba(255,159,10,0.14)', color: '#b76d07' }}
                >
                  In progress
                </span>
              )}
            </div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">{problem.title}</h3>
            {problem.keyTechnique && (
              <p className="text-[11px] text-[#86868b] mt-0.5">
                <span className="font-semibold text-[#6e6e73]">Technique:</span> {problem.keyTechnique}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Problem setup */}
      <div className="px-5 py-4">
        <div className="prose-reading text-[#1d1d1f]">
          <MarkdownRenderer content={problem.setup} />
        </div>
      </div>

      {/* Multiple choice */}
      {problem.choices && problem.choices.length > 0 && (
        <div className="px-5">
          <MultipleChoiceQuestion
            problemId={problem.id}
            choices={problem.choices}
          />
        </div>
      )}

      {/* Solution */}
      <div className="px-5 pb-5">
        <SolutionReveal
          solution={problem.solution}
          finalAnswer={problem.finalAnswer}
          hints={problem.hints}
          currentStatus={status}
          problemId={problem.id}
          problemSetup={problem.setup}
          savedCanvasSnapshot={savedSnapshot}
          onCanvasSubmit={handleCanvasSubmit}
          onSolved={handleSolved}
          onAttempted={() => { if (status === 'unseen') setProblemStatus(problem.id, 'attempted'); }}
          onUndoSolved={() => setProblemStatus(problem.id, 'attempted')}
          onReset={() => setProblemStatus(problem.id, 'unseen')}
        />
      </div>
    </div>
  );
}
