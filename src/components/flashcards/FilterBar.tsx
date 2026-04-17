'use client';

import type { Flashcard } from '@/lib/types';
import type { FlashcardFilter } from '@/hooks/useFlashcards';

const TYPES: { value: Flashcard['type'] | 'all'; label: string }[] = [
  { value: 'all',       label: 'All'        },
  { value: 'problem',   label: 'Problems'   },
  { value: 'concept',   label: 'Concepts'   },
  { value: 'formula',   label: 'Formulas'   },
  { value: 'principle', label: 'Principles' },
];

const DIFFICULTIES: { value: Flashcard['difficulty'] | 'all'; label: string }[] = [
  { value: 'all',    label: 'Any difficulty' },
  { value: 'easy',   label: 'Easy'           },
  { value: 'medium', label: 'Medium'         },
  { value: 'hard',   label: 'Hard'           },
];

interface FilterBarProps {
  filter: FlashcardFilter;
  onChange: (f: FlashcardFilter) => void;
  dueCount: number;
  totalCount: number;
}

export default function FilterBar({ filter, onChange, dueCount }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Type segmented control */}
      <div
        className="flex gap-[2px] p-[2px]"
        style={{ background: 'rgba(0,0,0,0.06)', borderRadius: 10 }}
      >
        {TYPES.map((t) => {
          const active = filter.type === t.value || (!filter.type && t.value === 'all');
          return (
            <button
              key={t.value}
              onClick={() => onChange({ ...filter, type: t.value })}
              className="px-3 py-1.5 text-[12px] font-medium tracking-tight transition-colors duration-200"
              style={{
                borderRadius: 8,
                background: active ? 'var(--eureka-accent)' : 'transparent',
                color: active ? '#ffffff' : '#424245',
                fontWeight: active ? 600 : 500,
                transitionTimingFunction: 'var(--ease-standard)',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Due toggle */}
      <button
        onClick={() => onChange({ ...filter, dueOnly: !filter.dueOnly })}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold tracking-tight transition-all duration-200"
        style={
          filter.dueOnly
            ? {
                borderRadius: 10,
                background: 'var(--eureka-accent-tint)',
                color: 'var(--eureka-accent)',
                border: '0.5px solid var(--eureka-accent-tint-strong)',
                transitionTimingFunction: 'var(--ease-standard)',
              }
            : {
                borderRadius: 10,
                background: '#ffffff',
                color: '#424245',
                border: '0.5px solid rgba(0,0,0,0.08)',
                transitionTimingFunction: 'var(--ease-standard)',
              }
        }
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: dueCount > 0 ? 'var(--eureka-accent)' : '#86868b' }}
        />
        Due ({dueCount})
      </button>

      {/* Difficulty */}
      <select
        value={filter.difficulty ?? 'all'}
        onChange={(e) => onChange({ ...filter, difficulty: e.target.value as any })}
        className="ml-auto text-[12px] font-semibold tracking-tight px-3 py-1.5 cursor-pointer focus:outline-none"
        style={{
          borderRadius: 10,
          background: '#ffffff',
          color: '#424245',
          border: '0.5px solid rgba(0,0,0,0.08)',
        }}
      >
        {DIFFICULTIES.map((d) => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>
    </div>
  );
}
