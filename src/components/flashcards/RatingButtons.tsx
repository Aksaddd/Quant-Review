'use client';

import type { ReviewGrade } from '@/lib/types';

/**
 * iOS-hue rating palette. Tint backgrounds (12–14%) with desaturated
 * foregrounds. "Good" uses the user's accent.
 */
const RATINGS: {
  grade: ReviewGrade;
  label: string;
  color: string;
  bg: string;
  dot: string;
}[] = [
  { grade: 'blackout', label: 'Blackout', color: '#ff453a',            bg: 'rgba(255,69,58,0.12)',   dot: '#ff453a' },
  { grade: 'again',    label: 'Wrong',    color: '#ff6a37',            bg: 'rgba(255,106,55,0.12)',  dot: '#ff6a37' },
  { grade: 'hard',     label: 'Hard',     color: '#b76d07',            bg: 'rgba(255,159,10,0.14)',  dot: '#ff9f0a' },
  { grade: 'good',     label: 'Good',     color: 'var(--eureka-accent)', bg: 'var(--eureka-accent-tint)', dot: 'var(--eureka-accent)' },
  { grade: 'easy',     label: 'Easy',     color: '#1f9b46',            bg: 'rgba(48,209,88,0.14)',   dot: '#30d158' },
];

interface RatingButtonsProps {
  onRate: (grade: ReviewGrade) => void;
  disabled?: boolean;
}

export default function RatingButtons({ onRate, disabled }: RatingButtonsProps) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-[#86868b] text-center uppercase tracking-[0.06em] mb-3">
        How well did you know this?
      </p>
      <div className="grid grid-cols-5 gap-2">
        {RATINGS.map(({ grade, label, color, bg, dot }) => (
          <button
            key={grade}
            disabled={disabled}
            onClick={() => onRate(grade)}
            className="flex flex-col items-center gap-1.5 py-3 px-1 font-semibold transition-all duration-200 active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
            style={{
              color,
              background: 'transparent',
              border: '0.5px solid rgba(0,0,0,0.06)',
              borderRadius: 12,
              transitionTimingFunction: 'var(--ease-standard)',
            }}
            onMouseEnter={(e) => {
              if (disabled) return;
              e.currentTarget.style.background = bg;
            }}
            onMouseLeave={(e) => {
              if (disabled) return;
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span className="w-[10px] h-[10px] rounded-full" style={{ background: dot }} />
            <span className="text-[11px] font-semibold tracking-tight">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
