'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Trophy,
  Settings,
  ChevronRight,
  Flame,
  Sparkles,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useProgress } from '@/components/providers/ProgressProvider';
import { ProgressBar } from '@/components/ui/Progress';

const NAV = [
  { href: '/dashboard',      label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/read/chapter-2', label: 'Chapter 2',  icon: BookOpen        },
  { href: '/flashcards',     label: 'Flashcards', icon: Layers          },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { totalSolved, totalProblems, dueCards } = useProgress();
  const pct = Math.round((totalSolved / totalProblems) * 100);

  return (
    <aside className="
      hidden lg:flex flex-col
      w-64 shrink-0 min-h-screen
      bg-[var(--surface-1)]
      border-r border-[var(--surface-border)]
      px-3 py-5
    ">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 px-3 mb-8 group">
        <div className="
          w-8 h-8 rounded-lg flex items-center justify-center
          bg-brand-500/10 border border-brand-500/20
          group-hover:bg-brand-500/20 transition-colors
        ">
          <Sparkles size={16} className="text-brand-400" />
        </div>
        <span className="font-bold text-sm text-[var(--text-primary)] tracking-tight">
          Quant Review
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'sidebar-link group',
                active && 'active'
              )}
            >
              <Icon size={17} className="shrink-0 transition-colors" />
              <span className="flex-1">{label}</span>
              {label === 'Flashcards' && dueCards.length > 0 && (
                <span className="
                  text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  bg-brand-500 text-black
                ">
                  {dueCards.length}
                </span>
              )}
              {active && <ChevronRight size={13} className="text-brand-400 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Chapter progress block */}
      <div className="mx-1 mt-4 mb-2 p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--surface-border)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[var(--text-secondary)]">Chapter 2 Progress</span>
          <span className="text-xs font-bold text-brand-400">{pct}%</span>
        </div>
        <ProgressBar value={pct} size="xs" animated />
        <p className="text-[11px] text-[var(--text-muted)] mt-2">
          {totalSolved} / {totalProblems} solved
        </p>
      </div>

      {/* Streak / Settings */}
      <div className="flex flex-col gap-0.5 mt-2">
        <Link href="/dashboard#streak" className="sidebar-link">
          <Flame size={17} className="text-orange-400 shrink-0" />
          <span>Study Streak</span>
        </Link>
        <Link href="/settings" className="sidebar-link">
          <Settings size={17} className="shrink-0" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
