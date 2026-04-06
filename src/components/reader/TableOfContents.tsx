'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';
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

  // Track active problem via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    problems.forEach((p) => {
      const el = document.getElementById(p.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(p.id);
        },
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

  return (
    <div className="bg-[var(--surface-2)] border border-[var(--surface-border)] rounded-2xl overflow-hidden">
      {/* Toggle header */}
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-3)] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span>Table of Contents</span>
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>

      {open && (
        <div className="border-t border-[var(--surface-border)] max-h-[60vh] overflow-y-auto">
          {grouped.map((sec) => (
            <div key={sec.id}>
              <div className="px-4 py-2 bg-[var(--surface-3)] sticky top-0 z-10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  §{sec.id} · {sec.title}
                </p>
              </div>
              <ul>
                {sec.problems.map((p, i) => {
                  const status = getProblemStatus(p.id);
                  const isActive = activeId === p.id;
                  return (
                    <li key={p.id}>
                      <a
                        href={`#${p.id}`}
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                          ${isActive
                            ? 'bg-brand-500/10 text-brand-300'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)]'
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        {status === 'solved' ? (
                          <CheckCircle2 size={13} className="text-[var(--success)] shrink-0" />
                        ) : (
                          <Circle size={13} className="text-[var(--text-muted)] shrink-0" />
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
