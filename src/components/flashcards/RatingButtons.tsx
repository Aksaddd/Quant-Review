'use client';

import type { ReviewGrade } from '@/lib/types';

interface RatingOption {
  grade: ReviewGrade;
  label: string;
  description: string;
  detail: string;
  color: string;
  bg: string;
  border: string;
  hoverBg: string;
  dot: string;
}

const RATINGS: RatingOption[] = [
  {
    grade:       'blackout',
    label:       'Blackout',
    description: 'No memory at all',
    detail:      'Complete blank — I need to re-study this from scratch',
    color:       '#d92916',
    bg:          '#fce8e6',
    border:      '#f5c6c0',
    hoverBg:     '#d92916',
    dot:         'bg-[#d92916]',
  },
  {
    grade:       'again',
    label:       'Wrong',
    description: 'I got it wrong',
    detail:      'Incorrect answer — but I recognise the solution now I see it',
    color:       '#e8591a',
    bg:          '#fef0e7',
    border:      '#fbc8a0',
    hoverBg:     '#e8591a',
    dot:         'bg-[#e8591a]',
  },
  {
    grade:       'hard',
    label:       'Hard',
    description: 'Major difficulty',
    detail:      'Got it, but only with significant struggle or hints',
    color:       '#f5a623',
    bg:          '#fef9e7',
    border:      '#fdd8a0',
    hoverBg:     '#f5a623',
    dot:         'bg-[#f5a623]',
  },
  {
    grade:       'good',
    label:       'Good',
    description: 'Got it with effort',
    detail:      'Correct after some thought — wouldn\'t say it was easy',
    color:       '#1865f2',
    bg:          '#e8f0fe',
    border:      '#a8c4f8',
    hoverBg:     '#1865f2',
    dot:         'bg-[#1865f2]',
  },
  {
    grade:       'easy',
    label:       'Easy',
    description: 'Instant recall',
    detail:      'Solved it quickly and confidently — solid mastery',
    color:       '#1fab54',
    bg:          '#e6f4ea',
    border:      '#a8d5b5',
    hoverBg:     '#1fab54',
    dot:         'bg-[#1fab54]',
  },
];

interface RatingButtonsProps {
  onRate: (grade: ReviewGrade) => void;
  disabled?: boolean;
}

export default function RatingButtons({ onRate, disabled }: RatingButtonsProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#21242c] text-center mb-1">
        How well did you know this?
      </p>
      <p className="text-xs text-[#9299a5] text-center mb-4">
        Be honest — accurate ratings improve your review schedule
      </p>

      {/* 5-button grid */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {RATINGS.map(({ grade, label, color, bg, border, hoverBg, dot }) => (
          <button
            key={grade}
            disabled={disabled}
            onClick={() => onRate(grade)}
            style={{ '--hover-bg': hoverBg } as React.CSSProperties}
            className={`
              group flex flex-col items-center gap-1.5 py-3 px-1 rounded-lg border-2
              font-semibold transition-all duration-150 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            title={label}
            aria-label={label}
          >
            {/* Colored dot */}
            <span className={`w-3 h-3 rounded-full ${dot}`} />
            <span className="text-xs font-bold" style={{ color }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Detail descriptions */}
      <div className="space-y-1.5">
        {RATINGS.map(({ grade, label, description, detail, color, bg, border }) => (
          <div
            key={grade}
            className="flex items-start gap-3 p-3 rounded-lg border"
            style={{ backgroundColor: bg, borderColor: border }}
          >
            <div className="flex items-center gap-2 w-20 shrink-0">
              <span className="text-xs font-bold" style={{ color }}>{label}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#21242c]">{description}</p>
              <p className="text-[11px] text-[#626975] mt-0.5">{detail}</p>
            </div>
            <button
              disabled={disabled}
              onClick={() => onRate(grade)}
              className="shrink-0 px-3 py-1 rounded-md text-xs font-bold text-white transition-all active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: color }}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
