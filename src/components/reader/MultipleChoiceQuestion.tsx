'use client';

import { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, Circle } from 'lucide-react';
import { clsx } from 'clsx';
import type { Choice } from '@/lib/types';
import MarkdownRenderer from './MarkdownRenderer';

interface MultipleChoiceQuestionProps {
  problemId: string;
  choices: Choice[];
  onCorrect?: () => void;
  onIncorrect?: () => void;
}

/**
 * Stable deterministic shuffle keyed by problemId — choices render in the
 * same random-looking order every time for the same problem, but the correct
 * answer isn't always first.
 */
function seededShuffle<T>(arr: T[], seed: string): T[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const indexed = arr.map((item, i) => ({ item, key: Math.sin(hash + i * 997) }));
  indexed.sort((a, b) => a.key - b.key);
  return indexed.map((x) => x.item);
}

const LETTER = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function MultipleChoiceQuestion({
  problemId,
  choices,
  onCorrect,
  onIncorrect,
}: MultipleChoiceQuestionProps) {
  const shuffled = useMemo(() => seededShuffle(choices, problemId), [choices, problemId]);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const selectedChoice = shuffled.find((c) => c.id === selected) ?? null;

  function handlePick(choice: Choice) {
    if (revealed) return;
    setSelected(choice.id);
    setRevealed(true);
    if (choice.correct) onCorrect?.();
    else onIncorrect?.();
  }

  function handleReset() {
    setSelected(null);
    setRevealed(false);
  }

  return (
    <div
      className="mb-3 p-4"
      style={{
        borderRadius: 16,
        background: 'rgba(10,132,255,0.04)',
        border: '0.5px solid rgba(10,132,255,0.18)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#0a84ff]">
          Multiple Choice
        </p>
        {revealed && (
          <button
            onClick={handleReset}
            className="text-[11px] font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors"
          >
            Try again
          </button>
        )}
      </div>

      <div className="space-y-2">
        {shuffled.map((choice, idx) => {
          const isSelected = selected === choice.id;
          const showAsCorrect = revealed && choice.correct;
          const showAsWrong = revealed && isSelected && !choice.correct;

          return (
            <button
              key={choice.id}
              onClick={() => handlePick(choice)}
              disabled={revealed}
              className={clsx(
                'w-full text-left px-3 py-2.5 rounded-xl transition-all flex gap-3 items-start',
                !revealed && 'hover:bg-[rgba(10,132,255,0.06)] cursor-pointer',
                revealed && 'cursor-default'
              )}
              style={{
                background: showAsCorrect
                  ? 'rgba(48,209,88,0.10)'
                  : showAsWrong
                    ? 'rgba(255,59,48,0.08)'
                    : isSelected
                      ? 'rgba(10,132,255,0.10)'
                      : 'rgba(255,255,255,0.6)',
                border: showAsCorrect
                  ? '0.5px solid rgba(48,209,88,0.5)'
                  : showAsWrong
                    ? '0.5px solid rgba(255,59,48,0.45)'
                    : '0.5px solid rgba(0,0,0,0.08)',
              }}
            >
              <span
                className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full text-[11px] font-bold mt-0.5"
                style={{
                  background: showAsCorrect
                    ? '#30d158'
                    : showAsWrong
                      ? '#ff3b30'
                      : 'rgba(0,0,0,0.05)',
                  color: showAsCorrect || showAsWrong ? '#ffffff' : '#6e6e73',
                }}
              >
                {showAsCorrect ? (
                  <CheckCircle2 size={14} />
                ) : showAsWrong ? (
                  <XCircle size={14} />
                ) : (
                  LETTER[idx] ?? '?'
                )}
              </span>

              <div className="flex-1 min-w-0">
                <div className="prose-reading text-[13.5px] text-[#1d1d1f] leading-snug">
                  <MarkdownRenderer content={choice.text} />
                </div>
                {revealed && choice.rationale && (isSelected || choice.correct) && (
                  <div
                    className="mt-2 text-[12.5px] leading-relaxed"
                    style={{ color: choice.correct ? '#1f7a3f' : '#9a4034' }}
                  >
                    <MarkdownRenderer content={choice.rationale} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {revealed && selectedChoice && (
        <div
          className="mt-3 px-3 py-2 rounded-lg text-[12.5px] font-medium flex items-center gap-2"
          style={
            selectedChoice.correct
              ? { background: 'rgba(48,209,88,0.12)', color: '#1f7a3f' }
              : { background: 'rgba(255,59,48,0.10)', color: '#9a4034' }
          }
        >
          {selectedChoice.correct ? (
            <>
              <CheckCircle2 size={14} />
              Correct — see the full solution below.
            </>
          ) : (
            <>
              <Circle size={14} />
              Not quite. Review the correct answer above, then read the solution.
            </>
          )}
        </div>
      )}
    </div>
  );
}
