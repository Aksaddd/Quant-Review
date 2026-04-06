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
      <div className="h-2 bg-[#e4e6ea] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--ka-blue)] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-[#9299a5]">{reviewed} reviewed</span>
        <span className="text-[10px] font-semibold text-[var(--ka-blue)]">{pct}%</span>
      </div>
    </div>
  );
}
