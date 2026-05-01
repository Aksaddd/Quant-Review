'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Circle } from 'lucide-react';
import { clsx } from 'clsx';

import type { LadderStepStage as LadderStepStageType, StageAnswer, Option } from '@/types/interactive';
import StageShell from '../shared/StageShell';
import ExplanationReveal from '../shared/ExplanationReveal';

interface Props {
  stage: LadderStepStageType;
  index: number;
  total: number;
  initial?: Extract<StageAnswer, { kind: 'ladder-step' }>;
  onAnswer: (answer: Extract<StageAnswer, { kind: 'ladder-step' }>) => void;
  onAdvance: () => void;
  isLast: boolean;
}

export default function LadderStepStage({
  stage, index, total, initial, onAnswer, onAdvance, isLast,
}: Props) {
  // Primary answer state
  const [numeric, setNumeric] = useState<string>(
    initial?.numeric != null ? String(initial.numeric) : ''
  );
  const [primaryId, setPrimaryId] = useState<string | null>(initial?.selectedId ?? null);
  const [primarySubmitted, setPrimarySubmitted] = useState(initial != null);

  // Follow-up state
  const [followUpIds, setFollowUpIds] = useState<string[]>(initial?.followUpIds ?? []);
  const [followUpSubmitted, setFollowUpSubmitted] = useState(
    !!initial?.followUpIds && initial.followUpIds.length > 0
  );

  function gradePrimary(): { correct: boolean; selectedOpt?: Option } {
    if (stage.answerType === 'numeric') {
      const n = Number(numeric);
      return { correct: !Number.isNaN(n) && n === stage.answer };
    }
    const opt = (stage.options ?? []).find((o) => o.id === primaryId);
    return { correct: !!opt?.correct, selectedOpt: opt };
  }

  function gradeFollowUp(): boolean {
    if (!stage.followUp) return true;
    const correctIds = stage.followUp.options.filter((o) => o.correct).map((o) => o.id);
    if (stage.followUp.type === 'mc-single') {
      return followUpIds.length === 1 && correctIds.includes(followUpIds[0]);
    }
    const required = stage.followUp.exactCount ?? correctIds.length;
    if (followUpIds.length !== required) return false;
    return followUpIds.every((id) => correctIds.includes(id))
        && correctIds.every((id) => followUpIds.includes(id));
  }

  function handleSubmitPrimary() {
    const { correct } = gradePrimary();
    setPrimarySubmitted(true);
    if (!stage.followUp) {
      onAnswer({
        kind: 'ladder-step',
        numeric: stage.answerType === 'numeric' ? Number(numeric) : undefined,
        selectedId: stage.answerType === 'mc-single' ? primaryId ?? undefined : undefined,
        correct,
      });
    }
  }

  function handleSubmitFollowUp() {
    setFollowUpSubmitted(true);
    const primary = gradePrimary();
    const fu = gradeFollowUp();
    onAnswer({
      kind: 'ladder-step',
      numeric: stage.answerType === 'numeric' ? Number(numeric) : undefined,
      selectedId: stage.answerType === 'mc-single' ? primaryId ?? undefined : undefined,
      followUpIds,
      correct: primary.correct && fu,
    });
  }

  function toggleFollowUp(id: string) {
    if (followUpSubmitted) return;
    if (!stage.followUp) return;
    if (stage.followUp.type === 'mc-single') {
      setFollowUpIds([id]);
      return;
    }
    setFollowUpIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const primaryGrade = primarySubmitted ? gradePrimary() : null;
  const fullyAnswered = primarySubmitted && (!stage.followUp || followUpSubmitted);
  const isCorrect = !fullyAnswered ? null
    : primaryGrade!.correct && (stage.followUp ? gradeFollowUp() : true);

  return (
    <StageShell
      index={index} total={total} label={stage.label} prompt={stage.prompt}
      isCorrect={isCorrect}
      footer={fullyAnswered && (
        <div className="space-y-3">
          {stage.explanation && <ExplanationReveal text={stage.explanation} />}
          <div className="flex justify-end">
            <button
              type="button" onClick={onAdvance}
              className="rounded-md bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              {isLast ? 'Finish' : 'Next stage →'}
            </button>
          </div>
        </div>
      )}
    >
      {/* Primary answer */}
      {stage.answerType === 'numeric' ? (
        <div className="flex items-center gap-3">
          <input
            type="number" inputMode="numeric" value={numeric}
            onChange={(e) => setNumeric(e.target.value)} disabled={primarySubmitted}
            className={clsx(
              'w-32 rounded-md border px-3 py-2 text-sm text-right tabular-nums',
              'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900',
              'focus:outline-none focus:ring-2 focus:ring-blue-400',
              primarySubmitted && primaryGrade?.correct && 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
              primarySubmitted && primaryGrade && !primaryGrade.correct && 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
            )}
            placeholder="answer"
          />
          {!primarySubmitted ? (
            <button
              type="button" onClick={handleSubmitPrimary} disabled={numeric === ''}
              className="rounded-md bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-40"
            >
              Submit
            </button>
          ) : (
            <span className="text-sm text-zinc-500">
              {primaryGrade?.correct ? 'Correct.' : `Correct answer: ${stage.answer}`}
            </span>
          )}
        </div>
      ) : (
        <ul className="space-y-2">
          {(stage.options ?? []).map((opt) => {
            const picked = primaryId === opt.id;
            const showCorrect = primarySubmitted && opt.correct;
            const showWrong   = primarySubmitted && picked && !opt.correct;
            return (
              <li key={opt.id}>
                <button
                  type="button" onClick={() => !primarySubmitted && setPrimaryId(opt.id)}
                  disabled={primarySubmitted}
                  className={clsx(
                    'w-full text-left rounded-lg border px-4 py-3 flex items-start gap-3',
                    'border-zinc-200 dark:border-zinc-800',
                    !primarySubmitted && 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer',
                    picked && !primarySubmitted && 'ring-2 ring-blue-400',
                    showCorrect && 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
                    showWrong   && 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
                  )}
                >
                  <span className="mt-0.5 shrink-0">
                    {showCorrect ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> :
                     showWrong   ? <XCircle      className="h-5 w-5 text-rose-600" /> :
                                    <Circle      className="h-5 w-5 text-zinc-400" />}
                  </span>
                  <span className="text-sm leading-relaxed">{opt.text}</span>
                </button>
              </li>
            );
          })}
          {!primarySubmitted && (
            <button
              type="button" onClick={handleSubmitPrimary} disabled={!primaryId}
              className="rounded-md bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-40"
            >
              Submit
            </button>
          )}
        </ul>
      )}

      {/* Follow-up question (revealed after primary submitted) */}
      {primarySubmitted && stage.followUp && (
        <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm font-medium mb-3 text-zinc-900 dark:text-zinc-100">
            {stage.followUp.prompt}
          </p>
          <ul className="space-y-2">
            {stage.followUp.options.map((opt) => {
              const picked = followUpIds.includes(opt.id);
              const showCorrect = followUpSubmitted && opt.correct;
              const showWrong   = followUpSubmitted && picked && !opt.correct;
              return (
                <li key={opt.id}>
                  <button
                    type="button" onClick={() => toggleFollowUp(opt.id)}
                    disabled={followUpSubmitted}
                    className={clsx(
                      'w-full text-left rounded-lg border px-4 py-3 flex items-start gap-3',
                      'border-zinc-200 dark:border-zinc-800',
                      !followUpSubmitted && 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer',
                      picked && !followUpSubmitted && 'ring-2 ring-blue-400',
                      showCorrect && 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
                      showWrong   && 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
                    )}
                  >
                    <span className="mt-0.5 shrink-0">
                      {showCorrect ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> :
                       showWrong   ? <XCircle      className="h-5 w-5 text-rose-600" /> :
                                      <Circle      className="h-5 w-5 text-zinc-400" />}
                    </span>
                    <span className="text-sm leading-relaxed">{opt.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {!followUpSubmitted && (
            <button
              type="button" onClick={handleSubmitFollowUp} disabled={followUpIds.length === 0}
              className="mt-3 rounded-md bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-40"
            >
              Submit
            </button>
          )}
        </div>
      )}
    </StageShell>
  );
}
