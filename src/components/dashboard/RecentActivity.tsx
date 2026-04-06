'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { DifficultyBadge } from '@/components/ui/Badge';
import type { Problem } from '@/lib/types';

interface ActivityItem {
  problem: Problem;
  status: 'solved' | 'attempted';
  timestamp?: number;
}

interface RecentActivityProps {
  items: ActivityItem[];
}

export default function RecentActivity({ items }: RecentActivityProps) {
  if (items.length === 0) {
    return (
      <div className="bg-[var(--surface-2)] border border-[var(--surface-border)] rounded-2xl p-6 text-center">
        <Clock size={24} className="text-[var(--text-muted)] mx-auto mb-2" />
        <p className="text-sm font-medium text-[var(--text-secondary)]">No activity yet</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">Start reading Chapter 2 to track your progress.</p>
        <Link
          href="/read/chapter-2"
          className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
        >
          Go to Chapter 2 <ArrowRight size={12} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface-2)] border border-[var(--surface-border)] rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--surface-border)]">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Recent Activity</h3>
      </div>
      <ul className="divide-y divide-[var(--surface-border)]">
        {items.map(({ problem, status }) => (
          <li key={problem.id}>
            <Link
              href={`/read/chapter-2#${problem.id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-3)] transition-colors"
            >
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                status === 'solved' ? 'bg-[var(--success)]' : 'bg-[var(--warning)]'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{problem.title}</p>
                <p className="text-xs text-[var(--text-muted)]">§{problem.section}</p>
              </div>
              <DifficultyBadge difficulty={problem.difficulty} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
