'use client';

import { useState, useMemo } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

import type { NumericGridStage as NumericGridStageType, StageAnswer } from '@/types/interactive';
import StageShell from '../shared/StageShell';
import ExplanationReveal from '../shared/ExplanationReveal';

interface Props {
  stage: NumericGridStageType;
  index: number;
  total: number;
  initial?: Extract<StageAnswer, { kind: 'numeric-grid' }>;
  onAnswer: (answer: Extract<StageAnswer, { kind: 'numeric-grid' }>) => void;
  onAdvance: () => void;
  isLast: boolean;
}

export default function NumericGridStage({
  stage, index, total, initial, onAnswer, onAdvance, isLast,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const seed: Record<string, string> = {};
    for (const r of stage.rows) {
      seed[r.id] = initial?.values?.[r.id] != null ? String(initial.values[r.id]) : '';
    }
    return seed;
  });
  const [submitted, setSubmitted] = useState(initial != null);

  const sum = useMemo(
    () => stage.rows.reduce((acc, r) => acc + (Number(values[r.id]) || 0), 0),
    [values, stage.rows]
  );
  const sumOk = stage.constraint.type === 'sum-equals'
    ? sum === stage.constraint.value
    : true;
  const allFilled = stage.rows.every((r) => values[r.id] !== '');

  function isRowCorrect(rowId: string, expected: number): boolean {
    return Number(values[rowId]) === expected;
  }
  const allRowsCorrect = stage.rows.every((r) => isRowCorrect(r.id, r.answer));
  const overallCorrect = sumOk && allRowsCorrect;

  function handleSubmit() {
    setSubmitted(true);
    const numericValues: Record<string, number> = {};
    for (const r of stage.rows) numericValues[r.id] = Number(values[r.id]) || 0;
    onAnswer({ kind: 'numeric-grid', values: numericValues, correct: overallCorrect });
  }

  return (
    <StageShell
      index={index} total={total} label={stage.label} prompt={stage.prompt}
      isCorrect={submitted ? overallCorrect : null}
      footer={submitted && (
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
      <div className="space-y-2">
        {stage.rows.map((row) => {
          const correct = submitted && isRowCorrect(row.id, row.answer);
          const wrong   = submitted && !correct;
          return (
            <div key={row.id} className="flex items-center justify-between gap-3">
              <label className="text-sm text-zinc-700 dark:text-zinc-300">{row.label}</label>
              <div className="flex items-center gap-2">
                <input
                  type="number" inputMode="numeric"
                  value={values[row.id]} disabled={submitted}
                  onChange={(e) => setValues((v) => ({ ...v, [row.id]: e.target.value }))}
                  className={clsx(
                    'w-24 rounded-md border px-3 py-1.5 text-right text-sm tabular-nums',
                    'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900',
                    'focus:outline-none focus:ring-2 focus:ring-blue-400',
                    correct && 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
                    wrong   && 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
                  )}
                />
                {submitted && (correct ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <span className="text-xs text-rose-600 tabular-nums">→ {row.answer}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {stage.constraint.type === 'sum-equals' && (
        <div className={clsx(
          'mt-3 flex items-center justify-between text-sm border-t pt-2',
          'border-zinc-200 dark:border-zinc-800',
          submitted && (sumOk ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'),
        )}>
          <span className="text-zinc-500">Required total</span>
          <span className="tabular-nums">
            {sum} / {stage.constraint.value}
            {submitted && (sumOk
              ? <CheckCircle2 className="inline h-4 w-4 ml-2 text-emerald-600" />
              : <XCircle      className="inline h-4 w-4 ml-2 text-rose-600" />)}
          </span>
        </div>
      )}

      {!submitted && (
        <div className="flex justify-end pt-2">
          <button
            type="button" onClick={handleSubmit} disabled={!allFilled}
            className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-40"
          >
            Submit final answer
          </button>
        </div>
      )}
    </StageShell>
  );
}
