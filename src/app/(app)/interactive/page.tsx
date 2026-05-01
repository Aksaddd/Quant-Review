import Link from 'next/link';

import { listInteractiveDocs } from '@/lib/interactive/loader';

export default function InteractiveIndex() {
  const docs = listInteractiveDocs();
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-1 text-zinc-900 dark:text-zinc-100">
        Interactive walkthroughs
      </h1>
      <p className="text-sm text-zinc-500 mb-6">
        Step-by-step guided practice. Every problem becomes a multi-stage game.
      </p>
      <ul className="space-y-2">
        {docs.map((doc) => (
          <li key={doc.id}>
            <Link
              href={`/interactive/ch${String(doc.chapter).padStart(2, '0')}/${doc.id}`}
              className="block rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            >
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                Chapter {doc.chapter} · {doc.kind}
              </div>
              <div className="font-medium text-zinc-900 dark:text-zinc-100">{doc.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
