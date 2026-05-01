'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, Layers, Settings,
  ChevronDown, ChevronRight, CheckCircle2,
  Sparkles, Compass,
} from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useProgress } from '@/components/providers/ProgressProvider';
import { SECTIONS, problemsBySection } from '@/data/problems';
import { textbookChapters } from '@/data/chapters';
import { effectiveCppChapters } from '@/data/effective-cpp';
import { cpHandbookParts } from '@/data/competitive-programmers-handbook';
import { aopsVol1Chapters, AOPS_VOL1_TOTAL_CHAPTERS } from '@/data/aops-vol1';

const TOP_NAV = [
  { href: '/dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/flashcards',  label: 'Flashcards',  icon: Layers },
  { href: '/interactive', label: 'Interactive', icon: Sparkles },
  { href: '/techniques',  label: 'Techniques',  icon: Compass },
];

function masteryLevel(pct: number): 0 | 1 | 2 | 3 {
  if (pct === 0)  return 0;
  if (pct < 50)   return 1;
  if (pct < 100)  return 2;
  return 3;
}

const MASTERY_COLORS = ['bg-[#e4e6ea]', 'bg-[#a3c4f3]', 'bg-[#1865f2]', 'bg-[#1fab54]'];

interface SidebarNavProps {
  /** Optional callback invoked when a navigation link is tapped (used to close the mobile drawer). */
  onNavigate?: () => void;
  /** When true, renders without the brand logo header (drawer provides its own). */
  hideBrand?: boolean;
}

/**
 * Inner sidebar navigation — usable on the desktop sticky rail and inside the
 * mobile drawer. Structurally identical so users build a single mental model.
 */
export default function SidebarNav({ onNavigate, hideBrand = false }: SidebarNavProps) {
  const pathname = usePathname();
  const { sectionStats, totalSolved, totalProblems, reviewDue, newCardsQueue, getProblemStatus } = useProgress();
  const [chapOpen, setChapOpen] = useState(true);
  const [ch1Open, setCh1Open] = useState(false);
  const [openChapters, setOpenChapters] = useState<Record<number, boolean>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [ecppOpen, setEcppOpen] = useState(false);
  const [openEcppChapters, setOpenEcppChapters] = useState<Record<number, boolean>>({});
  const [cphOpen, setCphOpen] = useState(false);
  const [openCphParts, setOpenCphParts] = useState<Record<number, boolean>>({});
  const [aopsOpen, setAopsOpen] = useState(false);

  function toggleEcppChapter(n: number) {
    setOpenEcppChapters((prev) => ({ ...prev, [n]: !prev[n] }));
  }
  function toggleCphPart(n: number) {
    setOpenCphParts((prev) => ({ ...prev, [n]: !prev[n] }));
  }
  function toggleSection(id: string) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }
  function toggleChapter(num: number) {
    setOpenChapters((prev) => ({ ...prev, [num]: !prev[num] }));
  }

  const pct = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;
  const handleNav = onNavigate ?? (() => {});

  return (
    <div className="flex flex-col h-full">
      {!hideBrand && (
        <div className="px-5 py-4 shrink-0" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
          <Link href="/" onClick={handleNav} className="flex items-center gap-2.5 group">
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
              <p className="text-[10px] text-[#86868b]">Zhou&apos;s Guide</p>
            </div>
          </Link>
        </div>
      )}

      {/* Top nav */}
      <nav className="px-3 pt-3 pb-1 space-y-0.5 shrink-0">
        {TOP_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={handleNav}
              className={clsx('sidebar-link group min-h-[44px]', active && 'active')}
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
          className="w-full flex items-center gap-2 px-3 py-2.5 min-h-[44px] text-xs font-bold text-[#626975] uppercase tracking-wider hover:text-[#21242c] transition-colors"
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
                onClick={handleNav}
                href={`/read/chapter-1#ch1-0${i + 1}-${['broad-knowledge','practice-skills','listen-carefully','speak-your-mind','reasonable-assumptions'][i]}`}
                className="flex items-center gap-2.5 px-3 py-2.5 min-h-[40px] rounded-lg hover:bg-[#f0f1f3] transition-colors group"
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
          className="w-full flex items-center gap-2 px-3 py-2.5 min-h-[44px] text-xs font-bold text-[#626975] uppercase tracking-wider hover:text-[#21242c] transition-colors"
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
                  <Link
                    href={`/read/chapter-2#section-${sec.id}`}
                    onClick={() => { toggleSection(sec.id); handleNav(); }}
                    className="flex items-center gap-2.5 px-3 py-2.5 min-h-[40px] rounded-lg hover:bg-[#f0f1f3] transition-colors group"
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

                  {isOpen && (
                    <div className="ml-5 mb-1 border-l border-[#e4e6ea] space-y-0.5">
                      {problems.map((p) => {
                        const status = getProblemStatus(p.id);
                        return (
                          <Link
                            key={p.id}
                            onClick={handleNav}
                            href={`/read/chapter-2#${p.id}`}
                            className="flex items-center gap-2 pl-3 pr-2 py-2 min-h-[36px] rounded-r-lg hover:bg-[#f0f1f3] transition-colors group"
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
          </div>
        )}

        {/* Chapters 3–7 */}
        {textbookChapters.map((chap) => {
          const isOpen = !!openChapters[chap.number];
          const shortTitle =
            chap.title.length > 22 ? chap.title.slice(0, 22) + '…' : chap.title;
          return (
            <div key={chap.id}>
              <button
                onClick={() => toggleChapter(chap.number)}
                className="w-full flex items-center gap-2 px-3 py-2.5 min-h-[44px] text-xs font-bold text-[#626975] uppercase tracking-wider hover:text-[#21242c] transition-colors"
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
                          onClick={() => { toggleSection(secKey); handleNav(); }}
                          className="flex items-center gap-2.5 px-3 py-2.5 min-h-[40px] rounded-lg hover:bg-[#f0f1f3] transition-colors group"
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
                                  onClick={handleNav}
                                  href={`/read/chapter-${chap.number}#${p.id}`}
                                  className="flex items-center gap-2 pl-3 pr-2 py-2 min-h-[36px] rounded-r-lg hover:bg-[#f0f1f3] transition-colors group"
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

        {/* Effective C++ */}
        <div className="mt-3 pt-3 border-t border-[#e4e6ea]">
          <button
            onClick={() => setEcppOpen(!ecppOpen)}
            className="w-full flex items-center gap-2 px-3 py-2.5 min-h-[44px] text-xs font-bold text-[#626975] uppercase tracking-wider hover:text-[#21242c] transition-colors"
          >
            <BookOpen size={13} />
            <span className="flex-1 text-left truncate">Effective C++ · Meyers</span>
            {ecppOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </button>

          {ecppOpen && (
            <div className="mb-2 space-y-0.5">
              <Link
                href="/read/effective-cpp"
                onClick={handleNav}
                className="flex items-center gap-2.5 px-3 py-2 min-h-[40px] rounded-lg hover:bg-[#f0f1f3] transition-colors group"
              >
                <span className="w-4 h-4 rounded-md bg-[#1865f2] text-white flex items-center justify-center text-[9px] font-semibold shrink-0">
                  55
                </span>
                <span className="flex-1 text-[12px] text-[#626975] group-hover:text-[#21242c] transition-colors truncate">
                  All items
                </span>
              </Link>
              {effectiveCppChapters.map((ec) => {
                const open = !!openEcppChapters[ec.number];
                return (
                  <div key={ec.number}>
                    <button
                      onClick={() => toggleEcppChapter(ec.number)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 min-h-[40px] rounded-lg hover:bg-[#f0f1f3] transition-colors group"
                    >
                      <span className="text-[10px] font-bold text-[#9299a5] w-8 shrink-0">
                        Ch {ec.number}
                      </span>
                      <span className="flex-1 text-[12px] text-[#626975] group-hover:text-[#21242c] leading-snug transition-colors text-left truncate">
                        {ec.title}
                      </span>
                      {open ? (
                        <ChevronDown size={12} className="text-[#9299a5] shrink-0" />
                      ) : (
                        <ChevronRight size={12} className="text-[#9299a5] shrink-0" />
                      )}
                    </button>
                    {open && (
                      <div className="ml-5 mb-1 border-l border-[#e4e6ea] space-y-0.5">
                        {ec.items.map((it) => (
                          <Link
                            key={it.item}
                            onClick={handleNav}
                            href={`/read/effective-cpp/${it.item}`}
                            className="flex items-center gap-2 pl-3 pr-2 py-2 min-h-[36px] rounded-r-lg hover:bg-[#f0f1f3] transition-colors group"
                          >
                            <span className="text-[10px] font-semibold text-[#9299a5] tabular-nums shrink-0 w-7">
                              #{it.item}
                            </span>
                            <span className="text-[12px] text-[#626975] group-hover:text-[#21242c] transition-colors truncate leading-snug">
                              {it.title.replace(/\.$/, '')}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Competitive Programmer's Handbook */}
        <div className="mt-3 pt-3 border-t border-[#e4e6ea]">
          <button
            onClick={() => setCphOpen(!cphOpen)}
            className="w-full flex items-center gap-2 px-3 py-2.5 min-h-[44px] text-xs font-bold text-[#626975] uppercase tracking-wider hover:text-[#21242c] transition-colors"
          >
            <BookOpen size={13} />
            <span className="flex-1 text-left truncate">CP Handbook · Laaksonen</span>
            {cphOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </button>

          {cphOpen && (
            <div className="mb-2 space-y-0.5">
              <Link
                href="/read/competitive-programmers-handbook"
                onClick={handleNav}
                className="flex items-center gap-2.5 px-3 py-2 min-h-[40px] rounded-lg hover:bg-[#f0f1f3] transition-colors group"
              >
                <span className="w-4 h-4 rounded-md bg-[#1865f2] text-white flex items-center justify-center text-[9px] font-semibold shrink-0">
                  30
                </span>
                <span className="flex-1 text-[12px] text-[#626975] group-hover:text-[#21242c] transition-colors truncate">
                  All chapters
                </span>
              </Link>
              {cpHandbookParts.map((part) => {
                const open = !!openCphParts[part.number];
                return (
                  <div key={part.number}>
                    <button
                      onClick={() => toggleCphPart(part.number)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 min-h-[40px] rounded-lg hover:bg-[#f0f1f3] transition-colors group"
                    >
                      <span className="text-[10px] font-bold text-[#9299a5] w-8 shrink-0">
                        Pt {part.roman}
                      </span>
                      <span className="flex-1 text-[12px] text-[#626975] group-hover:text-[#21242c] leading-snug transition-colors text-left truncate">
                        {part.title}
                      </span>
                      {open ? (
                        <ChevronDown size={12} className="text-[#9299a5] shrink-0" />
                      ) : (
                        <ChevronRight size={12} className="text-[#9299a5] shrink-0" />
                      )}
                    </button>
                    {open && (
                      <div className="ml-5 mb-1 border-l border-[#e4e6ea] space-y-0.5">
                        {part.chapters.map((ch) => (
                          <Link
                            key={ch.chapter}
                            onClick={handleNav}
                            href={`/read/competitive-programmers-handbook/${ch.chapter}`}
                            className="flex items-center gap-2 pl-3 pr-2 py-2 min-h-[36px] rounded-r-lg hover:bg-[#f0f1f3] transition-colors group"
                          >
                            <span className="text-[10px] font-semibold text-[#9299a5] tabular-nums shrink-0 w-7">
                              Ch {ch.chapter}
                            </span>
                            <span className="text-[12px] text-[#626975] group-hover:text-[#21242c] transition-colors truncate leading-snug">
                              {ch.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Art of Problem Solving */}
        <div className="mt-3 pt-3 border-t border-[#e4e6ea]">
          <button
            onClick={() => setAopsOpen(!aopsOpen)}
            className="w-full flex items-center gap-2 px-3 py-2.5 min-h-[44px] text-xs font-bold text-[#626975] uppercase tracking-wider hover:text-[#21242c] transition-colors"
          >
            <BookOpen size={13} />
            <span className="flex-1 text-left truncate">AoPS Vol. 1 · Lehoczky &amp; Rusczyk</span>
            {aopsOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </button>

          {aopsOpen && (
            <div className="mb-2 space-y-0.5">
              <Link
                href="/read/aops-vol1"
                onClick={handleNav}
                className="flex items-center gap-2.5 px-3 py-2 min-h-[40px] rounded-lg hover:bg-[#f0f1f3] transition-colors group"
              >
                <span className="w-4 h-4 rounded-md bg-[#1865f2] text-white flex items-center justify-center text-[9px] font-semibold shrink-0">
                  {aopsVol1Chapters.length}
                </span>
                <span className="flex-1 text-[12px] text-[#626975] group-hover:text-[#21242c] transition-colors truncate">
                  All chapters
                </span>
              </Link>
              {aopsVol1Chapters.map((ch) => (
                <Link
                  key={ch.number}
                  onClick={handleNav}
                  href={`/read/aops-vol1/${ch.number}`}
                  className="flex items-center gap-2.5 px-3 py-2 min-h-[40px] rounded-lg hover:bg-[#f0f1f3] transition-colors group"
                >
                  <span className="text-[10px] font-bold text-[#9299a5] w-8 shrink-0">
                    Ch {ch.number}
                  </span>
                  <span className="flex-1 text-[12px] text-[#626975] group-hover:text-[#21242c] leading-snug transition-colors text-left truncate">
                    {ch.title}
                  </span>
                </Link>
              ))}
              <div className="px-3 py-1.5 text-[10px] text-[#9299a5] italic">
                Ch {aopsVol1Chapters.length + 1}–{AOPS_VOL1_TOTAL_CHAPTERS} coming soon
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom — settings */}
      <div className="px-3 pb-4 pt-2 border-t border-[#e4e6ea] space-y-0.5 shrink-0">
        <Link
          href="/settings"
          onClick={handleNav}
          className="sidebar-link min-h-[44px]"
        >
          <Settings size={15} className="shrink-0" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}
