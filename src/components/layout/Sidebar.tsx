'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, Layers, Settings,
  ChevronDown, ChevronRight, CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useProgress } from '@/components/providers/ProgressProvider';
import { SECTIONS, problemsBySection } from '@/data/problems';
import { textbookChapters } from '@/data/chapters';

const TOP_NAV = [
  { href: '/dashboard',  label: 'Dashboard', icon: LayoutDashboard },
  { href: '/flashcards', label: 'Flashcards', icon: Layers },
];

function masteryLevel(pct: number): 0 | 1 | 2 | 3 {
  if (pct === 0)  return 0;
  if (pct < 50)   return 1;
  if (pct < 100)  return 2;
  return 3;
}

const MASTERY_LABELS = ['Not started', 'Familiar', 'Proficient', 'Mastered'];
const MASTERY_COLORS = ['bg-[#e4e6ea]', 'bg-[#a3c4f3]', 'bg-[#1865f2]', 'bg-[#1fab54]'];

export default function Sidebar() {
  const pathname = usePathname();
  const { sectionStats, totalSolved, totalProblems, reviewDue, newCardsQueue, getProblemStatus } = useProgress();
  const [chapOpen, setChapOpen] = useState(true);
  const [ch1Open, setCh1Open] = useState(false);
  // Track which textbook chapter accordions (3–7) are expanded
  const [openChapters, setOpenChapters] = useState<Record<number, boolean>>({});
  // Track which sections are expanded to show individual problems
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const pct = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  function toggleSection(id: string) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleChapter(num: number) {
    setOpenChapters((prev) => ({ ...prev, [num]: !prev[num] }));
  }

  return (
    <aside
      className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0"
      style={{
        background: 'var(--material-thin-light)',
        backdropFilter: 'var(--material-blur)',
        WebkitBackdropFilter: 'var(--material-blur)',
        borderRight: '0.5px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Logo */}
      <div className="px-5 py-4 shrink-0" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 flex items-center justify-center transition-transform duration-200 ease-standard group-hover:scale-[1.04]"
            style={{
              borderRadius: 10,
              background: 'var(--eureka-accent)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            }}
          >
            <span className="text-white font-semibold text-sm tracking-tight">Q</span>
          </div>
          <div>
            <p className="font-semibold text-[13px] text-[#1d1d1f] leading-tight tracking-tight">Quant Review</p>
            <p className="text-[10px] text-[#86868b]">Zhou's Guide</p>
          </div>
        </Link>
      </div>

      {/* Top nav */}
      <nav className="px-3 pt-3 pb-1 space-y-0.5 shrink-0">
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
              {label === 'Flashcards' && (reviewDue.length + newCardsQueue.length) > 0 && (
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full text-white"
                  style={{ background: 'var(--eureka-accent)' }}
                >
                  {reviewDue.length + newCardsQueue.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mx-4 my-2 border-t border-[#e4e6ea] shrink-0" />

      {/* Scrollable course nav */}
      <div className="flex-1 overflow-y-auto px-3 pb-2">

        {/* Chapter 1 */}
        <button
          onClick={() => setCh1Open(!ch1Open)}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#626975] uppercase tracking-wider hover:text-[#21242c] transition-colors"
        >
          <BookOpen size={13} />
          <span className="flex-1 text-left">Chapter 1 · Principles</span>
          {ch1Open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </button>

        {ch1Open && (
          <div className="mb-2 space-y-0.5">
            {['Broad Knowledge Base', 'Practice Skills', 'Listen Carefully', 'Speak Your Mind', 'Reasonable Assumptions'].map((title, i) => (
              <Link
                key={i}
                href={`/read/chapter-1#ch1-0${i + 1}-${['broad-knowledge','practice-skills','listen-carefully','speak-your-mind','reasonable-assumptions'][i]}`}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f0f1f3] transition-colors group"
              >
                <span className="w-4 h-4 rounded-full text-white flex items-center justify-center text-[9px] font-semibold shrink-0" style={{ background: 'var(--eureka-accent)' }}>
                  {i + 1}
                </span>
                <span className="flex-1 text-[13px] text-[#626975] group-hover:text-[#21242c] leading-snug transition-colors truncate">
                  {title}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Chapter 2 */}
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
            <div
              className="mx-1 mb-3 p-3"
              style={{
                borderRadius: 12,
                background: 'rgba(0,0,0,0.025)',
                border: '0.5px solid rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-medium text-[#6e6e73] tracking-tight">Overall Progress</span>
                <span className="text-[11px] font-semibold tabular-nums" style={{ color: 'var(--eureka-accent)' }}>{pct}%</span>
              </div>
              <div className="h-[3px] bg-[rgba(0,0,0,0.06)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: 'var(--eureka-accent)',
                    transition: 'width 500ms var(--ease-standard)',
                  }}
                />
              </div>
              <p className="text-[10px] text-[#86868b] mt-1.5 tabular-nums">{totalSolved} / {totalProblems} problems</p>
            </div>

            {/* Section list with expandable problems */}
            {SECTIONS.map((sec) => {
              const stats = sectionStats.find((s) => s.section === sec.id);
              const secPct = stats && stats.total > 0
                ? Math.round((stats.solved / stats.total) * 100)
                : 0;
              const level = masteryLevel(secPct);
              const isOpen = !!openSections[sec.id];
              const problems = problemsBySection[sec.id] ?? [];

              return (
                <div key={sec.id}>
                  {/* Section row — clicking anywhere expands problems */}
                  <Link
                    href={`/read/chapter-2#section-${sec.id}`}
                    onClick={() => toggleSection(sec.id)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f0f1f3] transition-colors group"
                  >
                    <span className={clsx('w-2.5 h-2.5 rounded-full shrink-0 transition-colors', MASTERY_COLORS[level])} />
                    <span className="flex-1 text-[13px] text-[#626975] group-hover:text-[#21242c] leading-snug transition-colors">
                      {sec.title}
                    </span>
                    {level === 3
                      ? <CheckCircle2 size={13} className="text-[#1fab54] shrink-0" />
                      : isOpen
                        ? <ChevronDown size={12} className="text-[#9299a5] shrink-0" />
                        : <ChevronRight size={12} className="text-[#9299a5] shrink-0" />
                    }
                  </Link>

                  {/* Problem links */}
                  {isOpen && (
                    <div className="ml-5 mb-1 border-l border-[#e4e6ea] space-y-0.5">
                      {problems.map((p) => {
                        const status = getProblemStatus(p.id);
                        return (
                          <Link
                            key={p.id}
                            href={`/read/chapter-2#${p.id}`}
                            className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-r-lg hover:bg-[#f0f1f3] transition-colors group"
                          >
                            {status === 'solved' ? (
                              <CheckCircle2 size={11} className="text-[#1fab54] shrink-0" />
                            ) : status === 'attempted' ? (
                              <span className="w-2 h-2 rounded-full bg-[#f5a623] shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-[#e4e6ea] shrink-0" />
                            )}
                            <span className="text-[12px] text-[#626975] group-hover:text-[#21242c] transition-colors truncate leading-snug">
                              {p.title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
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

        {/* Chapters 3–7 — textbook-style chapters */}
        {textbookChapters.map((chap) => {
          const isOpen = !!openChapters[chap.number];
          const shortTitle =
            chap.title.length > 22 ? chap.title.slice(0, 22) + '…' : chap.title;
          return (
            <div key={chap.id}>
              <button
                onClick={() => toggleChapter(chap.number)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#626975] uppercase tracking-wider hover:text-[#21242c] transition-colors"
              >
                <BookOpen size={13} />
                <span className="flex-1 text-left truncate">
                  Chapter {chap.number} · {shortTitle}
                </span>
                {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
              </button>

              {isOpen && (
                <div className="mb-2 space-y-0.5">
                  {chap.sections.map((sec) => {
                    const secKey = `ch${chap.number}-${sec.id}`;
                    const secOpen = !!openSections[secKey];
                    const sectionProblems = sec.blocks
                      .filter((b) => b.kind === 'problem')
                      .map((b: any) => b.problem);
                    return (
                      <div key={sec.id}>
                        <Link
                          href={`/read/chapter-${chap.number}#section-${sec.id}`}
                          onClick={() => toggleSection(secKey)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f0f1f3] transition-colors group"
                        >
                          <span className="text-[10px] font-bold text-[#9299a5] w-8 shrink-0">
                            {sec.id}
                          </span>
                          <span className="flex-1 text-[13px] text-[#626975] group-hover:text-[#21242c] leading-snug transition-colors truncate">
                            {sec.title}
                          </span>
                          {sec.problemCount > 0 &&
                            (secOpen ? (
                              <ChevronDown size={12} className="text-[#9299a5] shrink-0" />
                            ) : (
                              <ChevronRight size={12} className="text-[#9299a5] shrink-0" />
                            ))}
                        </Link>

                        {secOpen && sectionProblems.length > 0 && (
                          <div className="ml-5 mb-1 border-l border-[#e4e6ea] space-y-0.5">
                            {sectionProblems.map((p) => {
                              const status = getProblemStatus(p.id);
                              return (
                                <Link
                                  key={p.id}
                                  href={`/read/chapter-${chap.number}#${p.id}`}
                                  className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-r-lg hover:bg-[#f0f1f3] transition-colors group"
                                >
                                  {status === 'solved' ? (
                                    <CheckCircle2
                                      size={11}
                                      className="text-[#1fab54] shrink-0"
                                    />
                                  ) : status === 'attempted' ? (
                                    <span className="w-2 h-2 rounded-full bg-[#f5a623] shrink-0" />
                                  ) : (
                                    <span className="w-2 h-2 rounded-full bg-[#e4e6ea] shrink-0" />
                                  )}
                                  <span className="text-[12px] text-[#626975] group-hover:text-[#21242c] transition-colors truncate leading-snug">
                                    {p.title}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom — settings */}
      <div className="px-3 pb-4 pt-2 border-t border-[#e4e6ea] space-y-0.5 shrink-0">
        <Link href="/settings" className="sidebar-link">
          <Settings size={15} className="shrink-0" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
