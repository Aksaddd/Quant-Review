'use client';

import { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, Circle, CheckSquare, Square } from 'lucide-react';
import { clsx } from 'clsx';

import type { MCMultiStage as MCMultiStageType, StageAnswer } from '@/types/interactive';
import StageShell from '../shared/StageShell';
import ExplanationReveal from '../shared/ExplanationReveal';

interface Props {
  stage: MCMultiStageType;
  index: number;
  total: number;
  initial?: Extract<StageAnswer, { kind: 'mc-multi' }>;
  onAnswer: (answer: Extract<StageAnswer, { kind: 'mc-multi' }>) => void;
  onAdvance: () => void;
  isLast: boolean;
}

function seededShuffle<T>(arr: T[], seed: string): T[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return arr.map((item, i) => ({ item, k: Math.sin(hash + i * 997) }))
    .sort((a, b) => a.k - b.k).map((x) => x.item);
}

export default function MCMultiStage({
  stage, index, total, initial, onAnswer, onAdvance, isLast,
}: Props) {
  const shuffled = useMemo(() => seededShuffle(stage.options, stage.id), [stage.options, stage.id]);
  const [selected, setSelected] = useState<string[]>(initial?.selectedIds ?? []);
  const [submitted, setSubmitted] = useState(initial != null);

  const correctIds = stage.options.filter((o) => o.correct).map((o) => o.id);
  const requiredCount = stage.exactCount ?? correctIds.length;

  const isCorrect =
    selected.length === requiredCount
    && selected.every((id) => correctIds.includes(id))
    && correctIds.every((id) => selected.includes(id));

  function toggle(id: string) {
    if (submitted) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleSubmit() {
    setSubmitted(true);
    onAnswer({ kind: 'mc-multi', selectedIds: selected, correct: isCorrect });
  }

  return (
    <StageShell
      index={index} total={total} label={stage.label} prompt={stage.prompt}
      isCorrect={submitted ? isCorrect : null}
      footer={submitted && (
        <div className="space-y-3">
          {stage.explanation && (
            <ExplanationReveal text={stage.explanation} learnMoreTechnique={stage.learnMoreTechnique} />
          )}
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
      <p className="text-xs text-zinc-500 mb-2">
        Select {requiredCount === correctIds.length ? `all that apply` : `exactly ${requiredCount}`}
        . You've picked {selected.length}.
      </p>
      <ul className="space-y-2">
        {shuffled.map((opt) => {
          const picked = selected.includes(opt.id);
          const showCorrectMissed = submitted && opt.correct && !picked;
          const showCorrect = submitted && opt.correct && picked;
          const showWrong   = submitted && picked && !opt.correct;
          return (
            <li key={opt.id}>
              <button
                type="button" onClick={() => toggle(opt.id)} disabled={submitted}
                className={clsx(
                  'w-full text-left rounded-lg border px-4 py-3 flex items-start gap-3 transition',
                  'border-zinc-200 dark:border-zinc-800',
                  !submitted && 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer',
                  picked && !submitted && 'ring-2 ring-blue-400',
                  showCorrect       && 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
                  showWrong         && 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
                  showCorrectMissed && 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
                )}
              >
                <span className="mt-0.5 shrink-0">
                  {showCorrect       ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> :
                   showWrong         ? <XCircle      className="h-5 w-5 text-rose-600" /> :
                   showCorrectMissed ? <CheckCircle2 className="h-5 w-5 text-amber-600" /> :
                   picked            ? <CheckSquare  className="h-5 w-5 text-blue-500" /> :
                                        <Square      className="h-5 w-5 text-zinc-400" />}
                </span>
                <span className="text-sm leading-relaxed">{opt.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {!submitted && (
        <div className="flex justify-end pt-2">
          <button
            type="button" onClick={handleSubmit}
            disabled={selected.length === 0}
            className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-40"
          >
            Submit ({selected.length} selected)
          </button>
        </div>
      )}
    </StageShell>
  );
}
