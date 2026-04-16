'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, List } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { SECTIONS } from '@/data/problems';
import type { Problem } from '@/lib/types';

interface TableOfContentsProps {
  problems: Problem[];
}

export default function TableOfContents({ problems }: TableOfContentsProps) {
  const { getProblemStatus } = useProgress();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    problems.forEach((p) => {
      const el = document.getElementById(p.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(p.id); },
        { threshold: 0.15, rootMargin: '-60px 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [problems]);

  const grouped = SECTIONS.map((sec) => ({
    ...sec,
    problems: problems.filter((p) => p.section === sec.id),
  }));

  const totalSolved = problems.filter((p) => getProblemStatus(p.id) === 'solved').length;

  return (
    <div className="bg-white border border-[#e4e6ea] rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#21242c] hover:bg-[#f7f8fa] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <List size={15} className="text-[#626975]" />
        <span className="flex-1 text-left">Table of Contents</span>
        <span className="text-xs text-[#9299a5] font-normal">{totalSolved}/{problems.length} solved</span>
        {open ? <ChevronDown size={14} className="text-[#9299a5]" /> : <ChevronRight size={14} className="text-[#9299a5]" />}
      </button>

      {open && (
        <div className="border-t border-[#e4e6ea] max-h-[60vh] overflow-y-auto">
          {grouped.map((sec) => (
            <div key={sec.id}>
              <div className="px-4 py-2 bg-[#f7f8fa] sticky top-0 z-10 border-b border-[#e4e6ea]">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#9299a5]">
                  {sec.id} · {sec.title}
                </p>
              </div>
              <ul>
                {sec.problems.map((p) => {
                  const status = getProblemStatus(p.id);
                  const isActive = activeId === p.id;
                  return (
                    <li key={p.id}>
                      <a
                        href={`#${p.id}`}
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                          ${isActive
                            ? 'bg-[var(--ka-blue-light)] text-[var(--ka-blue)] font-semibold'
                            : 'text-[#626975] hover:bg-[#f7f8fa] hover:text-[#21242c]'
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        {status === 'solved' ? (
                          <CheckCircle2 size={13} className="text-[#1fab54] shrink-0" />
                        ) : (
                          <Circle size={13} className="text-[#c8ccd4] shrink-0" />
                        )}
                        <span className="truncate">{p.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
