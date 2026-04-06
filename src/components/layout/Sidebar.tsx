'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, Layers, Settings, ChevronDown, ChevronRight, CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useProgress } from '@/components/providers/ProgressProvider';
import { SECTIONS } from '@/data/problems';

const TOP_NAV = [
  { href: '/dashboard',      label: 'Dashboard', icon: LayoutDashboard },
  { href: '/flashcards',     label: 'Practice',  icon: Layers },
];

function masteryLevel(pct: number): 0 | 1 | 2 | 3 {
  if (pct === 0)   return 0;
  if (pct < 50)    return 1;
  if (pct < 100)   return 2;
  return 3;
}

const MASTERY_LABELS = ['Not started', 'Familiar', 'Proficient', 'Mastered'];
const MASTERY_COLORS = [
  'bg-[#e4e6ea]',
  'bg-[#a3c4f3]',
  'bg-[#1865f2]',
  'bg-[#1fab54]',
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sectionStats, totalSolved, totalProblems, dueCards } = useProgress();
  const [chapOpen, setChapOpen] = useState(true);

  const pct = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;
  const isReading = pathname.startsWith('/read');

  return (
    <aside className="
      hidden lg:flex flex-col
      w-64 shrink-0 min-h-screen
      bg-white border-r border-[#e4e6ea]
    ">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[#e4e6ea]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--ka-blue)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <div>
            <p className="font-bold text-[13px] text-[#21242c] leading-tight">Quant Review</p>
            <p className="text-[10px] text-[#9299a5]">Zhou's Guide</p>
          </div>
        </Link>
      </div>

      {/* Top nav items */}
      <nav className="px-3 pt-3 pb-1 space-y-0.5">
        {TOP_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx('sidebar-link group', active && 'active')}
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {label === 'Practice' && dueCards.length > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--ka-blue)] text-white">
                  {dueCards.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 my-2 border-t border-[#e4e6ea]" />

      {/* Course section — accordion */}
      <div className="flex-1 overflow-y-auto px-3">
        <button
          onClick={() => setChapOpen(!chapOpen)}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#626975] uppercase tracking-wider hover:text-[#21242c] transition-colors"
        >
          <BookOpen size={13} />
          <span className="flex-1 text-left">Chapter 2 · Brain Teasers</span>
          {chapOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </button>

        {chapOpen && (
          <div className="mb-3 space-y-0.5">
            {/* Overall progress */}
            <div className="mx-1 mb-3 p-3 rounded-lg bg-[#f7f8fa] border border-[#e4e6ea]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-[#626975]">Overall Progress</span>
                <span className="text-[11px] font-bold text-[var(--ka-blue)]">{pct}%</span>
              </div>
              {/* Progress bar */}
              <div className="h-2 bg-[#e4e6ea] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--ka-blue)] rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-[10px] text-[#9299a5] mt-1.5">{totalSolved}/{totalProblems} problems</p>
            </div>

            {/* Section list */}
            {SECTIONS.map((sec) => {
              const stats = sectionStats.find((s) => s.section === sec.id);
              const secPct = stats && stats.total > 0
                ? Math.round((stats.solved / stats.total) * 100)
                : 0;
              const level = masteryLevel(secPct);
              const active = isReading && pathname.includes('chapter-2');

              return (
                <Link
                  key={sec.id}
                  href={`/read/chapter-2#section-${sec.id}`}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f0f1f3] transition-colors group"
                >
                  {/* Mastery dot */}
                  <span className={clsx('w-2.5 h-2.5 rounded-full shrink-0 transition-colors', MASTERY_COLORS[level])} />
                  <span className="flex-1 text-[13px] text-[#626975] group-hover:text-[#21242c] leading-snug transition-colors">
                    {sec.title}
                  </span>
                  {level === 3 && (
                    <CheckCircle2 size={13} className="text-[#1fab54] shrink-0" />
                  )}
                </Link>
              );
            })}

            {/* Mastery legend */}
            <div className="mt-3 mx-1 p-3 rounded-lg bg-[#f7f8fa] border border-[#e4e6ea]">
              <p className="text-[10px] font-bold text-[#9299a5] uppercase tracking-wider mb-2">Mastery</p>
              <div className="space-y-1.5">
                {MASTERY_LABELS.map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className={clsx('w-2 h-2 rounded-full shrink-0', MASTERY_COLORS[i])} />
                    <span className="text-[11px] text-[#9299a5]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="px-3 pb-4 pt-2 border-t border-[#e4e6ea] space-y-0.5">
        <Link href="/settings" className="sidebar-link">
          <Settings size={15} className="shrink-0" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
