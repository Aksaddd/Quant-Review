'use client';

import { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, Circle } from 'lucide-react';
import { clsx } from 'clsx';

import type { MCSingleStage as MCSingleStageType, StageAnswer } from '@/types/interactive';
import StageShell from '../shared/StageShell';
import ExplanationReveal from '../shared/ExplanationReveal';

interface Props {
  stage: MCSingleStageType;
  index: number;
  total: number;
  initial?: Extract<StageAnswer, { kind: 'mc-single' }>;
  onAnswer: (answer: Extract<StageAnswer, { kind: 'mc-single' }>) => void;
  onAdvance: () => void;
  isLast: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

function seededShuffle<T>(arr: T[], seed: string): T[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return arr.map((item, i) => ({ item, k: Math.sin(hash + i * 997) }))
    .sort((a, b) => a.k - b.k).map((x) => x.item);
}

export default function MCSingleStage({
  stage, index, total, initial, onAnswer, onAdvance, isLast,
}: Props) {
  const shuffled = useMemo(() => seededShuffle(stage.options, stage.id), [stage.options, stage.id]);
  const [selectedId, setSelectedId] = useState<string | null>(initial?.selectedId ?? null);
  const revealed = selectedId !== null;
  const selected = shuffled.find((o) => o.id === selectedId) ?? null;
  const isCorrect = selected?.correct ?? null;

  function handlePick(id: string) {
    if (revealed) return;
    const opt = shuffled.find((o) => o.id === id);
    if (!opt) return;
    setSelectedId(id);
    onAnswer({ kind: 'mc-single', selectedId: id, correct: opt.correct });
  }

  return (
    <StageShell
      index={index} total={total} label={stage.label} prompt={stage.prompt}
      isCorrect={isCorrect}
      footer={revealed && (
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
      <ul className="space-y-2">
        {shuffled.map((opt, i) => {
          const picked = selectedId === opt.id;
          const showCorrect = revealed && opt.correct;
          const showWrong   = revealed && picked && !opt.correct;
          return (
            <li key={opt.id}>
              <button
                type="button" onClick={() => handlePick(opt.id)} disabled={revealed}
                className={clsx(
                  'w-full text-left rounded-lg border px-4 py-3 flex items-start gap-3 transition',
                  'border-zinc-200 dark:border-zinc-800',
                  !revealed && 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer',
                  showCorrect && 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
                  showWrong   && 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
                  revealed && !showCorrect && !showWrong && 'opacity-60',
                )}
              >
                <span className="mt-0.5 shrink-0">
                  {showCorrect ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> :
                   showWrong   ? <XCircle      className="h-5 w-5 text-rose-600" /> :
                                  <Circle      className="h-5 w-5 text-zinc-400" />}
                </span>
                <span className="text-sm leading-relaxed">
                  <span className="font-mono text-xs text-zinc-500 mr-2">{LETTERS[i]}.</span>
                  {opt.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </StageShell>
  );
}
