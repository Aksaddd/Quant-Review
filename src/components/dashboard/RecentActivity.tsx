'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3 } from 'lucide-react';
import { DifficultyBadge } from '@/components/ui/Badge';
import type { Problem } from '@/lib/types';

interface ActivityItem {
  problem: Problem;
  status: 'solved' | 'attempted';
}

interface RecentActivityProps {
  items: ActivityItem[];
}

export default function RecentActivity({ items }: RecentActivityProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">Recent Activity</h2>
        <Link
          href="/read/chapter-2"
          className="text-[13px] font-semibold hover:underline flex items-center gap-1"
          style={{ color: 'var(--eureka-accent)' }}
        >
          Continue <ArrowRight size={14} />
        </Link>
      </div>

      <div
        className="overflow-hidden"
        style={{
          background: '#ffffff',
          border: '0.5px solid rgba(0,0,0,0.06)',
          borderRadius: 14,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}
      >
        <ul className="m-0 p-0 list-none">
          {items.map(({ problem, status }, i) => (
            <li
              key={problem.id}
              style={i > 0 ? { borderTop: '0.5px solid rgba(0,0,0,0.05)' } : undefined}
            >
              <Link
                href={`/read/chapter-2#${problem.id}`}
                className="flex items-center gap-3 px-4 py-3 transition-colors duration-200"
                style={{ transitionTimingFunction: 'var(--ease-standard)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {status === 'solved' ? (
                  <CheckCircle2 size={16} style={{ color: '#30d158' }} className="shrink-0" />
                ) : (
                  <Clock3 size={16} style={{ color: '#ff9f0a' }} className="shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold tracking-tight text-[#1d1d1f] truncate">{problem.title}</p>
                  <p className="text-[11px] text-[#86868b] tabular-nums">{problem.section}</p>
                </div>
                <DifficultyBadge difficulty={problem.difficulty} size="sm" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
