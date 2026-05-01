'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

import type { ClozeStage as ClozeStageType, StageAnswer } from '@/types/interactive';
import StageShell from '../shared/StageShell';
import ExplanationReveal from '../shared/ExplanationReveal';

interface Props {
  stage: ClozeStageType;
  index: number;
  total: number;
  initial?: Extract<StageAnswer, { kind: 'cloze' }>;
  onAnswer: (answer: Extract<StageAnswer, { kind: 'cloze' }>) => void;
  onAdvance: () => void;
  isLast: boolean;
}

/**
 * Splits a template like "P5 keeps __[d]__ coins" into renderable parts.
 * Each "__[id]__" becomes a slot keyed by id.
 */
function parseTemplate(template: string): Array<{ kind: 'text'; value: string } | { kind: 'blank'; id: string }> {
  const out: Array<{ kind: 'text'; value: string } | { kind: 'blank'; id: string }> = [];
  const re = /__\[([^\]]+)\]__/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(template))) {
    if (m.index > last) out.push({ kind: 'text', value: template.slice(last, m.index) });
    out.push({ kind: 'blank', id: m[1] });
    last = m.index + m[0].length;
  }
  if (last < template.length) out.push({ kind: 'text', value: template.slice(last) });
  return out;
}

function checkBlank(value: string, accepted: string[], caseInsensitive?: boolean): boolean {
  const v = caseInsensitive ? value.trim().toLowerCase() : value.trim();
  return accepted.some((a) => (caseInsensitive ? a.toLowerCase() : a) === v);
}

export default function ClozeStage({
  stage, index, total, initial, onAnswer, onAdvance, isLast,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const seed: Record<string, string> = {};
    for (const b of stage.blanks) seed[b.id] = initial?.values?.[b.id] ?? '';
    return seed;
  });
  const [submitted, setSubmitted] = useState(initial != null);

  const parts = parseTemplate(stage.template);
  const allFilled = stage.blanks.every((b) => values[b.id].trim() !== '');

  function blankCorrect(id: string): boolean {
    const blank = stage.blanks.find((b) => b.id === id);
    if (!blank) return false;
    return checkBlank(values[id], blank.answers, blank.caseInsensitive);
  }
  const overallCorrect = stage.blanks.every((b) => blankCorrect(b.id));

  function handleSubmit() {
    setSubmitted(true);
    onAnswer({ kind: 'cloze', values, correct: overallCorrect });
  }

  return (
    <StageShell
      index={index} total={total} label={stage.label} prompt={stage.prompt}
      isCorrect={submitted ? overallCorrect : null}
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
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-4 leading-loose text-sm">
        {parts.map((p, i) => {
          if (p.kind === 'text') {
            return <span key={i} className="text-zinc-800 dark:text-zinc-200">{p.value}</span>;
          }
          const correct = submitted && blankCorrect(p.id);
          const wrong   = submitted && !correct;
          const accepted = stage.blanks.find((b) => b.id === p.id)?.answers[0] ?? '';
          return (
            <span key={i} className="inline-flex items-center gap-1 mx-1 align-baseline">
              <input
                type="text" value={values[p.id] ?? ''} disabled={submitted}
                onChange={(e) => setValues((v) => ({ ...v, [p.id]: e.target.value }))}
                className={clsx(
                  'inline-block w-24 rounded-md border px-2 py-1 text-center text-sm',
                  'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900',
                  'focus:outline-none focus:ring-2 focus:ring-blue-400',
                  correct && 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
                  wrong   && 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
                )}
                placeholder="..."
              />
              {submitted && (correct ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-rose-600">
                  <XCircle className="h-4 w-4" />
                  → <span className="font-medium">{accepted}</span>
                </span>
              ))}
            </span>
          );
        })}
      </div>

      {!submitted && (
        <div className="flex justify-end pt-2">
          <button
            type="button" onClick={handleSubmit} disabled={!allFilled}
            className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-40"
          >
            Submit
          </button>
        </div>
      )}
    </StageShell>
  );
}
