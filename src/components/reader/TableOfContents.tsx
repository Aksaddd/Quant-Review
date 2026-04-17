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
    <div
      className="overflow-hidden"
      style={{
        background: 'var(--material-thin-light)',
        backdropFilter: 'var(--material-blur)',
        WebkitBackdropFilter: 'var(--material-blur)',
        border: '0.5px solid rgba(0,0,0,0.06)',
        borderRadius: 14,
      }}
    >
      <button
        className="w-full flex items-center gap-2 px-4 py-3 text-[13px] font-semibold tracking-tight text-[#1d1d1f] transition-colors duration-200"
        style={{ transitionTimingFunction: 'var(--ease-standard)' }}
        onClick={() => setOpen(!open)}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.03)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <List size={15} className="text-[#6e6e73]" />
        <span className="flex-1 text-left">Table of Contents</span>
        <span className="text-[11px] text-[#86868b] font-normal tabular-nums">{totalSolved}/{problems.length} solved</span>
        {open ? <ChevronDown size={14} className="text-[#86868b]" /> : <ChevronRight size={14} className="text-[#86868b]" />}
      </button>

      {open && (
        <div className="max-h-[60vh] overflow-y-auto" style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
          {grouped.map((sec) => (
            <div key={sec.id}>
              <div
                className="px-4 py-2 sticky top-0 z-10"
                style={{
                  background: 'rgba(245,245,247,0.92)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderBottom: '0.5px solid rgba(0,0,0,0.06)',
                }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#86868b]">
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
                        className="flex items-center gap-3 px-4 py-2 text-[13px] tracking-tight transition-colors duration-200"
                        style={{
                          background: isActive ? 'var(--eureka-accent-tint)' : 'transparent',
                          color: isActive ? 'var(--eureka-accent)' : '#424245',
                          fontWeight: isActive ? 600 : 400,
                          transitionTimingFunction: 'var(--ease-standard)',
                        }}
                        onClick={() => setOpen(false)}
                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(0,0,0,0.03)'; }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                      >
                        {status === 'solved' ? (
                          <CheckCircle2 size={13} style={{ color: '#30d158' }} className="shrink-0" />
                        ) : (
                          <Circle size={13} style={{ color: '#d2d2d7' }} className="shrink-0" />
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
