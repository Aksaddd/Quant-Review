'use client';

import type { ReviewGrade } from '@/lib/types';

interface RatingButtonsProps {
  onRate: (grade: ReviewGrade) => void;
  disabled?: boolean;
}

const RATINGS: { grade: ReviewGrade; label: string; sublabel: string; style: string }[] = [
  {
    grade: 0,
    label: 'Again',
    sublabel: 'Forgot completely',
    style: 'bg-[var(--error-bg)] border-[var(--error)]/30 text-[var(--error)] hover:bg-[var(--error)]/20',
  },
  {
    grade: 2,
    label: 'Hard',
    sublabel: 'Got it, barely',
    style: 'bg-[var(--warning-bg)] border-[var(--warning)]/30 text-[var(--warning)] hover:bg-[var(--warning)]/20',
  },
  {
    grade: 4,
    label: 'Good',
    sublabel: 'Recalled well',
    style: 'bg-brand-500/10 border-brand-500/30 text-brand-400 hover:bg-brand-500/20',
  },
  {
    grade: 5,
    label: 'Easy',
    sublabel: 'Perfect recall',
    style: 'bg-[var(--success-bg)] border-[var(--success)]/30 text-[var(--success)] hover:bg-[var(--success)]/20',
  },
];

export default function RatingButtons({ onRate, disabled }: RatingButtonsProps) {
  return (
    <div>
      <p className="text-xs font-medium text-[var(--text-muted)] text-center mb-3 uppercase tracking-wider">
        How well did you remember?
      </p>
      <div className="grid grid-cols-4 gap-2">
        {RATINGS.map(({ grade, label, sublabel, style }) => (
          <button
            key={grade}
            disabled={disabled}
            onClick={() => onRate(grade as ReviewGrade)}
            className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-center transition-all duration-150
              disabled:opacity-50 disabled:cursor-not-allowed active:scale-95
              ${style}`}
          >
            <span className="text-sm font-bold">{label}</span>
            <span className="text-[10px] mt-0.5 opacity-75">{sublabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
