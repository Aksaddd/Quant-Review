'use client';

interface DeckProgressProps {
  current: number;
  total: number;
  reviewed: number;
}

export default function DeckProgress({ current, total, reviewed }: DeckProgressProps) {
  const pct = total > 0 ? Math.round((reviewed / total) * 100) : 0;

  return (
    <div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: 'var(--eureka-accent)',
            transition: 'width 500ms var(--ease-standard)',
          }}
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-[#86868b] tabular-nums">{reviewed} reviewed</span>
        <span className="text-[10px] font-semibold tabular-nums tracking-tight" style={{ color: 'var(--eureka-accent)' }}>{pct}%</span>
      </div>
    </div>
  );
}
