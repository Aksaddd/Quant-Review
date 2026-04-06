'use client';

import Link from 'next/link';
import { BookOpen, Brain, BarChart2, ArrowRight } from 'lucide-react';

const ACTIONS = [
  {
    icon: BookOpen,
    label: 'Continue Reading',
    description: 'Pick up where you left off',
    href: '/read/chapter-2',
    color: 'text-brand-400',
    bg: 'bg-brand-500/10 border-brand-500/20',
  },
  {
    icon: Brain,
    label: 'Review Flashcards',
    description: 'Spaced repetition session',
    href: '/flashcards',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {ACTIONS.map(({ icon: Icon, label, description, href, color, bg }) => (
        <Link
          key={href}
          href={href}
          className="group flex items-center gap-4 bg-[var(--surface-2)] hover:bg-[var(--surface-3)] border border-[var(--surface-border)] hover:border-[var(--surface-border-strong)] rounded-2xl p-4 transition-all duration-200 hover:shadow-[var(--shadow-md)]"
        >
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${bg}`}>
            <Icon size={18} className={color} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
            <p className="text-xs text-[var(--text-muted)]">{description}</p>
          </div>
          <ArrowRight size={15} className="text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] group-hover:translate-x-0.5 transition-all shrink-0" />
        </Link>
      ))}
    </div>
  );
}
