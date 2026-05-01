import Link from 'next/link';
import { Compass, BookOpen } from 'lucide-react';

import { listTechniques } from '@/lib/interactive/loader';
import type { Technique } from '@/types/interactive';

interface CategoryGroup {
  category: string;
  techniques: Technique[];
}

const CATEGORY_LABELS: Record<string, string> = {
  'game-theory':    'Game Theory',
  'logic':          'Logic',
  'combinatorics':  'Combinatorics',
  'calculus':       'Calculus',
  'probability':    'Probability',
};

function groupByCategory(techniques: Technique[]): CategoryGroup[] {
  const map = new Map<string, CategoryGroup>();
  for (const t of techniques) {
    const existing = map.get(t.category);
    if (existing) existing.techniques.push(t);
    else map.set(t.category, { category: t.category, techniques: [t] });
  }
  return Array.from(map.values()).sort((a, b) => a.category.localeCompare(b.category));
}

export default function TechniquesIndex() {
  const techniques = listTechniques();
  const groups = groupByCategory(techniques);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500 mb-2">
          <Compass className="h-3.5 w-3.5" />
          Technique library
        </div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
          Deep-dives on the recurring techniques
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {techniques.length} techniques used across the book. Each entry explains when to reach for it,
          a recipe for applying it, common pitfalls, and links to every problem that uses it.
        </p>
      </header>

      {techniques.length === 0 && (
        <p className="text-sm text-zinc-500 italic">No techniques yet.</p>
      )}

      <div className="space-y-8">
        {groups.map((group) => (
          <section key={group.category}>
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-1">
              {CATEGORY_LABELS[group.category] ?? group.category}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {group.techniques.map((tech) => (
                <li key={tech.id}>
                  <Link
                    href={`/techniques/${tech.id}`}
                    className="block h-full rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-zinc-900 dark:text-zinc-100 leading-snug">
                          {tech.name}
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                          {tech.tagline}
                        </p>
                        <div className="text-[11px] text-zinc-500 mt-2">
                          Used in {tech.appearsIn.length} problem{tech.appearsIn.length === 1 ? '' : 's'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
