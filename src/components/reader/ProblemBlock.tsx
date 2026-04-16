'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useXPStore, XP_REWARDS } from '@/stores/useXPStore';
import { useCanvasStore } from '@/hooks/useCanvasStore';
import type { CanvasSnapshot } from '@/components/reader/ApproachCanvas';
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
              <span className="text-[10px] font-bold text-[#9299a5] uppercase tracking-wider">{problem.section}</span>
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
          problemId={problem.id}
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
