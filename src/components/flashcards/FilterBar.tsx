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
      {/* Type tabs */}
      <div className="flex gap-0.5 bg-[#f0f1f3] rounded-lg p-1">
        {TYPES.map((t) => {
          const active = filter.type === t.value || (!filter.type && t.value === 'all');
          return (
            <button
              key={t.value}
              onClick={() => onChange({ ...filter, type: t.value })}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-100
                ${active
                  ? 'bg-white text-[#21242c] shadow-sm border border-[#e4e6ea]'
                  : 'text-[#626975] hover:text-[#21242c]'
                }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Due toggle */}
      <button
        onClick={() => onChange({ ...filter, dueOnly: !filter.dueOnly })}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all
          ${filter.dueOnly
            ? 'bg-[var(--ka-blue-light)] border-[#a8c4f8] text-[var(--ka-blue)]'
            : 'bg-white border-[#c8ccd4] text-[#626975] hover:border-[var(--ka-blue)] hover:text-[var(--ka-blue)]'
          }`}
      >
        <span className={`w-2 h-2 rounded-full ${dueCount > 0 ? 'bg-[var(--ka-blue)]' : 'bg-[#9299a5]'}`} />
        Due ({dueCount})
      </button>

      {/* Difficulty */}
      <select
        value={filter.difficulty ?? 'all'}
        onChange={(e) => onChange({ ...filter, difficulty: e.target.value as any })}
        className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#c8ccd4] bg-white text-[#626975] focus:outline-none focus:border-[var(--ka-blue)] cursor-pointer"
      >
        {DIFFICULTIES.map((d) => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>
    </div>
  );
}
