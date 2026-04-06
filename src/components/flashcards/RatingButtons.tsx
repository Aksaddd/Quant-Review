'use client';

import type { ReviewGrade } from '@/lib/types';

const RATINGS: { grade: ReviewGrade; label: string; color: string; dot: string }[] = [
  { grade: 'blackout', label: 'Blackout', color: '#d92916', dot: 'bg-[#d92916]' },
  { grade: 'again',    label: 'Wrong',    color: '#e8591a', dot: 'bg-[#e8591a]' },
  { grade: 'hard',     label: 'Hard',     color: '#f5a623', dot: 'bg-[#f5a623]' },
  { grade: 'good',     label: 'Good',     color: '#1865f2', dot: 'bg-[#1865f2]' },
  { grade: 'easy',     label: 'Easy',     color: '#1fab54', dot: 'bg-[#1fab54]' },
];

interface RatingButtonsProps {
  onRate: (grade: ReviewGrade) => void;
  disabled?: boolean;
}

export default function RatingButtons({ onRate, disabled }: RatingButtonsProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#9299a5] text-center uppercase tracking-wider mb-3">
        How well did you know this?
      </p>
      <div className="grid grid-cols-5 gap-2">
        {RATINGS.map(({ grade, label, color, dot }) => (
          <button
            key={grade}
            disabled={disabled}
            onClick={() => onRate(grade)}
            className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-lg border border-[#e4e6ea] hover:border-current hover:bg-[#f7f8fa] font-semibold transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color } as React.CSSProperties}
          >
            <span className={`w-3 h-3 rounded-full ${dot}`} />
            <span className="text-xs font-bold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
