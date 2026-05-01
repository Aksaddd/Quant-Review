import Link from 'next/link';
import { BookOpen } from 'lucide-react';

import { listTechniques } from '@/lib/interactive/loader';

export default function TechniquesIndex() {
  const techniques = listTechniques();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold mb-1 text-zinc-900 dark:text-zinc-100">
          Technique library
        </h1>
        <p className="text-sm text-zinc-500">
          Deep-dives on the recurring techniques used across the book. Each entry
          links to the problems where the technique appears.
        </p>
      </header>

      {techniques.length === 0 && (
        <p className="text-sm text-zinc-500 italic">No techniques yet.</p>
      )}

      <ul className="space-y-3">
        {techniques.map((tech) => (
          <li key={tech.id}>
            <Link
              href={`/techniques/${tech.id}`}
              className="block rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            >
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-wide text-zinc-500 mb-0.5">
                    {tech.category}
                  </div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    {tech.name}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {tech.tagline}
                  </div>
                  <div className="text-xs text-zinc-500 mt-2">
                    Used in {tech.appearsIn.length} problem{tech.appearsIn.length === 1 ? '' : 's'}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
