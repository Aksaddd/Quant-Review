'use client';

import type { Flashcard } from '@/lib/types';
import type { FlashcardFilter } from '@/hooks/useFlashcards';

const TYPES: { value: Flashcard['type'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'problem', label: 'Problems' },
  { value: 'concept', label: 'Concepts' },
  { value: 'formula', label: 'Formulas' },
  { value: 'principle', label: 'Principles' },
];

const DIFFICULTIES: { value: Flashcard['difficulty'] | 'all'; label: string }[] = [
  { value: 'all', label: 'Any difficulty' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

interface FilterBarProps {
  filter: FlashcardFilter;
  onChange: (f: FlashcardFilter) => void;
  dueCount: number;
  totalCount: number;
}

export default function FilterBar({ filter, onChange, dueCount, totalCount }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Type tabs */}
      <div className="flex gap-1 bg-[var(--surface-3)] rounded-xl p-1">
        {TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange({ ...filter, type: t.value })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
              ${filter.type === t.value || (!filter.type && t.value === 'all')
                ? 'bg-[var(--surface-2)] text-[var(--text-primary)] shadow-sm border border-[var(--surface-border)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Due only toggle */}
      <button
        onClick={() => onChange({ ...filter, dueOnly: !filter.dueOnly })}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all
          ${filter.dueOnly
            ? 'bg-brand-500/15 border-brand-500/40 text-brand-300'
            : 'bg-[var(--surface-3)] border-[var(--surface-border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${dueCount > 0 ? 'bg-brand-400' : 'bg-[var(--text-muted)]'}`} />
        Due ({dueCount})
      </button>

      {/* Difficulty filter */}
      <select
        value={filter.difficulty ?? 'all'}
        onChange={(e) => onChange({ ...filter, difficulty: e.target.value as any })}
        className="ml-auto text-xs font-medium px-3 py-1.5 rounded-xl border border-[var(--surface-border)]
          bg-[var(--surface-3)] text-[var(--text-secondary)]
          focus:outline-none focus:border-brand-500/50 cursor-pointer"
      >
        {DIFFICULTIES.map((d) => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>
    </div>
  );
}
