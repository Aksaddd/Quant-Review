'use client';

import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle2, Clock3 } from 'lucide-react';
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
        <h2 className="text-lg font-bold text-[#21242c]">Recent Activity</h2>
        <Link href="/read/chapter-2" className="text-sm font-semibold text-[var(--ka-blue)] hover:underline flex items-center gap-1">
          Continue <ArrowRight size={14} />
        </Link>
      </div>

      <div className="bg-white border border-[#e4e6ea] rounded-lg overflow-hidden">
        <ul className="divide-y divide-[#f0f1f3]">
          {items.map(({ problem, status }) => (
            <li key={problem.id}>
              <Link
                href={`/read/chapter-2#${problem.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#f7f8fa] transition-colors"
              >
                {status === 'solved' ? (
                  <CheckCircle2 size={16} className="text-[#1fab54] shrink-0" />
                ) : (
                  <Clock3 size={16} className="text-[#f5a623] shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#21242c] truncate">{problem.title}</p>
                  <p className="text-xs text-[#9299a5]">§{problem.section}</p>
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
