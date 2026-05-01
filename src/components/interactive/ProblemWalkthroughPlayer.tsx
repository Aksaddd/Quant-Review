'use client';

import { useEffect, useMemo } from 'react';
import { SkipForward, RotateCcw } from 'lucide-react';
import { clsx } from 'clsx';

import type { ProblemWalkthrough, Stage, StageAnswer } from '@/types/interactive';
import { useInteractiveSessionStore } from '@/stores/useInteractiveSessionStore';

import MCSingleStage from './stages/MCSingleStage';
import MCMultiStage from './stages/MCMultiStage';
import LadderStepStage from './stages/LadderStepStage';
import NumericGridStage from './stages/NumericGridStage';
import ClozeStage from './stages/ClozeStage';
import UnsupportedStage from './stages/UnsupportedStage';

interface Props {
  doc: ProblemWalkthrough;
}

export default function ProblemWalkthroughPlayer({ doc }: Props) {
  const ensure = useInteractiveSessionStore((s) => s.ensureSession);
  const session = useInteractiveSessionStore((s) => s.sessions[doc.id]);
  const setCursor = useInteractiveSessionStore((s) => s.setCursor);
  const recordAnswer = useInteractiveSessionStore((s) => s.recordAnswer);
  const markCommittedEarly = useInteractiveSessionStore((s) => s.markCommittedEarly);
  const markCompleted = useInteractiveSessionStore((s) => s.markCompleted);
  const resetDoc = useInteractiveSessionStore((s) => s.resetDoc);

  useEffect(() => { ensure(doc.id); }, [doc.id, ensure]);

  const cursor = session?.cursor ?? 0;
  const total = doc.stages.length;
  const stage = doc.stages[cursor];
  const isLast = cursor === total - 1;
  const skipIndex = useMemo(
    () => doc.stages.findIndex((s) => s.id === doc.skipToCommitStageId),
    [doc.stages, doc.skipToCommitStageId]
  );
  const canSkip = skipIndex > cursor;

  function handleAnswer(stageId: string, answer: StageAnswer) {
    recordAnswer(doc.id, stageId, answer);
  }

  function handleAdvance() {
    if (cursor + 1 >= total) {
      markCompleted(doc.id);
      return;
    }
    setCursor(doc.id, cursor + 1);
  }

  function handleSkipToCommit() {
    if (skipIndex < 0) return;
    markCommittedEarly(doc.id);
    setCursor(doc.id, skipIndex);
  }

  function handleReset() {
    resetDoc(doc.id);
  }

  const completed = (session?.completedAt ?? 0) > 0;
  const correctCount = session
    ? Object.values(session.answers).filter(
        (a) => 'correct' in a && (a as { correct: boolean }).correct
      ).length
    : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <div className="text-xs uppercase tracking-wide text-zinc-500 mb-1">
          Chapter {doc.chapter} · Section {doc.section}
        </div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          {doc.title}
        </h1>
        {doc.difficulty && (
          <span className={clsx(
            'inline-block mt-2 rounded px-2 py-0.5 text-xs font-medium',
            doc.difficulty === 'easy'   && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
            doc.difficulty === 'medium' && 'bg-amber-100   text-amber-800   dark:bg-amber-900/30   dark:text-amber-300',
            doc.difficulty === 'hard'   && 'bg-rose-100    text-rose-800    dark:bg-rose-900/30    dark:text-rose-300',
          )}>{doc.difficulty}</span>
        )}
      </header>

      {/* Setup card */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-5 mb-6">
        <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 mb-3">
          {doc.setup.narrative}
        </p>
        {doc.setup.rules && doc.setup.rules.length > 0 && (
          <ul className="text-sm space-y-1 mb-3 text-zinc-700 dark:text-zinc-300 list-disc pl-5">
            {doc.setup.rules.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        )}
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {doc.setup.question}
        </p>
      </div>

      {/* Progress + skip */}
      <div className="flex items-center justify-between mb-4 text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <span>Stage {Math.min(cursor + 1, total)} of {total}</span>
          <span>·</span>
          <span>{correctCount} correct so far</span>
          {session?.committedEarly && <span className="text-amber-600">· skipped to commit</span>}
        </div>
        <div className="flex items-center gap-2">
          {canSkip && !completed && (
            <button
              type="button" onClick={handleSkipToCommit}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-300 dark:border-zinc-700 px-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <SkipForward className="h-3 w-3" />
              Skip to commit
            </button>
          )}
          <button
            type="button" onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-md border border-zinc-300 dark:border-zinc-700 px-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded bg-zinc-200 dark:bg-zinc-800 mb-6 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${((cursor + (completed ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      {/* Active stage or completion card */}
      {!completed && stage && (
        <StageRenderer
          stage={stage}
          index={cursor + 1}
          total={total}
          initial={session?.answers[stage.id]}
          onAnswer={(a) => handleAnswer(stage.id, a)}
          onAdvance={handleAdvance}
          isLast={isLast}
        />
      )}

      {completed && (
        <div className="rounded-2xl border border-emerald-300 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 p-6 text-center">
          <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
            Walkthrough complete
          </h2>
          <p className="text-sm text-emerald-900/80 dark:text-emerald-200/80 mb-4">
            {correctCount} of {total} stages correct.
          </p>
          <button
            type="button" onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-md bg-emerald-600 text-white px-3 py-2 text-sm font-medium hover:bg-emerald-700"
          >
            <RotateCcw className="h-4 w-4" />
            Restart walkthrough
          </button>
        </div>
      )}
    </div>
  );
}

interface StageRendererProps {
  stage: Stage;
  index: number;
  total: number;
  initial?: StageAnswer;
  onAnswer: (a: StageAnswer) => void;
  onAdvance: () => void;
  isLast: boolean;
}

function StageRenderer({ stage, index, total, initial, onAnswer, onAdvance, isLast }: StageRendererProps) {
  switch (stage.type) {
    case 'mc-single':
      return (
        <MCSingleStage
          stage={stage} index={index} total={total} isLast={isLast}
          initial={initial?.kind === 'mc-single' ? initial : undefined}
          onAnswer={onAnswer} onAdvance={onAdvance}
        />
      );
    case 'mc-multi':
      return (
        <MCMultiStage
          stage={stage} index={index} total={total} isLast={isLast}
          initial={initial?.kind === 'mc-multi' ? initial : undefined}
          onAnswer={onAnswer} onAdvance={onAdvance}
        />
      );
    case 'cloze':
      return (
        <ClozeStage
          stage={stage} index={index} total={total} isLast={isLast}
          initial={initial?.kind === 'cloze' ? initial : undefined}
          onAnswer={onAnswer} onAdvance={onAdvance}
        />
      );
    case 'ladder-step':
      return (
        <LadderStepStage
          stage={stage} index={index} total={total} isLast={isLast}
          initial={initial?.kind === 'ladder-step' ? initial : undefined}
          onAnswer={onAnswer} onAdvance={onAdvance}
        />
      );
    case 'numeric-grid':
      return (
        <NumericGridStage
          stage={stage} index={index} total={total} isLast={isLast}
          initial={initial?.kind === 'numeric-grid' ? initial : undefined}
          onAnswer={onAnswer} onAdvance={onAdvance}
        />
      );
    default:
      return (
        <UnsupportedStage
          index={index} total={total} stageType={stage.type} label={stage.label}
          onAdvance={onAdvance} isLast={isLast}
        />
      );
  }
}
