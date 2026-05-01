import Link from 'next/link';
import { Sparkles, BookOpen } from 'lucide-react';

import { listInteractiveContent, getTechnique } from '@/lib/interactive/loader';
import type { ProblemWalkthrough, ReadingSection } from '@/types/interactive';

type Doc = ProblemWalkthrough | ReadingSection;

interface SectionGroup {
  chapter: number;
  section: string;
  docs: Doc[];
}

function difficultyClasses(d: ProblemWalkthrough['difficulty']): string {
  if (d === 'easy')   return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
  if (d === 'medium') return 'bg-amber-100   text-amber-800   dark:bg-amber-900/30   dark:text-amber-300';
  if (d === 'hard')   return 'bg-rose-100    text-rose-800    dark:bg-rose-900/30    dark:text-rose-300';
  return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300';
}

function groupBySection(docs: Doc[]): SectionGroup[] {
  const map = new Map<string, SectionGroup>();
  for (const d of docs) {
    const key = `ch${d.chapter}-${d.section}`;
    const existing = map.get(key);
    if (existing) existing.docs.push(d);
    else map.set(key, { chapter: d.chapter, section: d.section, docs: [d] });
  }
  return Array.from(map.values()).sort((a, b) => {
    if (a.chapter !== b.chapter) return a.chapter - b.chapter;
    return a.section.localeCompare(b.section);
  });
}

export default function InteractiveIndex() {
  const docs = listInteractiveContent();
  const groups = groupBySection(docs);
  const totalProblems = docs.filter((d) => d.kind === 'problem-walkthrough').length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500 mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          Interactive walkthroughs
        </div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
          Practice problems as guided games
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Each problem becomes a multi-stage walkthrough that teaches the technique step by step.
          {totalProblems} problems available across {groups.length} sections.
        </p>
      </header>

      <div className="space-y-8">
        {groups.map((group) => (
          <section key={`${group.chapter}-${group.section}`}>
            <h2 className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-1">
              <BookOpen className="h-3.5 w-3.5" />
              Chapter {group.chapter} · Section {group.section}
            </h2>
            <ul className="space-y-1.5">
              {group.docs.map((doc) => {
                const isProblem = doc.kind === 'problem-walkthrough';
                const techId = isProblem ? doc.mechanism.primary : null;
                const tech = techId ? getTechnique(techId) : null;
                return (
                  <li key={doc.id}>
                    <Link
                      href={`/interactive/ch${String(doc.chapter).padStart(2, '0')}/${doc.id}`}
                      className="flex items-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">{doc.title}</span>
                          {isProblem && doc.difficulty && (
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${difficultyClasses(doc.difficulty)}`}>
                              {doc.difficulty}
                            </span>
                          )}
                          {tech && (
                            <span className="text-[10px] text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                              {tech.name}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5">
                          {isProblem
                            ? `${doc.stages.length} stages${doc.variants && doc.variants.length > 0 ? ` · ${doc.variants.length} variant${doc.variants.length > 1 ? 's' : ''}` : ''}`
                            : 'Reading section'}
                        </div>
                      </div>
                      <span className="text-zinc-400 text-sm shrink-0">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
