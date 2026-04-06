import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SECTIONS } from '@/data/problems';
import { Badge } from '@/components/ui/Badge';

const SECTION_EMOJI: Record<string, string> = {
  '2.1': '🎯',
  '2.2': '🧠',
  '2.3': '💡',
  '2.4': '⚖️',
  '2.5': '∑',
  '2.6': '🕊️',
  '2.7': '🔢',
  '2.8': '📐',
  '2.9': '⚡',
};

export default function SectionPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-[var(--surface-border)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">
              Chapter 2 — Brain Teasers
            </p>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">
              9 sections · 37 problems
            </h2>
          </div>
          <Link
            href="/read/chapter-2"
            className="flex items-center gap-1.5 text-sm text-brand-400 font-medium hover:gap-2.5 transition-all"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SECTIONS.map(({ id, title }) => (
            <Link
              key={id}
              href={`/read/chapter-2#section-${id.replace('.', '-')}`}
              className="
                flex items-center gap-3 p-4 rounded-xl
                bg-[var(--surface-2)] border border-[var(--surface-border)]
                hover:border-[var(--surface-border-strong)] hover:bg-[var(--surface-3)]
                hover:-translate-y-0.5
                transition-all duration-150 group
              "
            >
              <span className="text-xl w-8 text-center shrink-0">
                {SECTION_EMOJI[id] ?? '📖'}
              </span>
              <div className="min-w-0">
                <Badge variant="muted" size="sm">{id}</Badge>
                <p className="text-sm font-medium text-[var(--text-primary)] mt-1 truncate">
                  {title}
                </p>
              </div>
              <ArrowRight
                size={14}
                className="ml-auto text-[var(--text-muted)] group-hover:text-brand-400 shrink-0 transition-colors"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
