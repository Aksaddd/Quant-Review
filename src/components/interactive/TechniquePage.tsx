import Link from 'next/link';
import { BookOpen, Target, ListOrdered, AlertTriangle, Sparkles } from 'lucide-react';

import type { Block, Technique } from '@/types/interactive';

interface Props {
  technique: Technique;
}

export default function TechniquePage({ technique }: Props) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <header>
        <div className="text-xs uppercase tracking-wide text-zinc-500 mb-1">
          Technique · {technique.category}
        </div>
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          {technique.name}
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {technique.tagline}
        </p>
        {technique.introducedIn && (
          <div className="mt-3 text-sm text-zinc-500">
            Introduced in Chapter {technique.introducedIn.chapter} ·
            Section {technique.introducedIn.section} — {technique.introducedIn.title}
          </div>
        )}
      </header>

      {/* Core explanation blocks */}
      <section className="space-y-4">
        {technique.blocks.map((block) => <BlockRenderer key={block.id} block={block} />)}
      </section>

      {/* When to use */}
      {technique.whenToUse && technique.whenToUse.length > 0 && (
        <Card icon={<Target className="h-5 w-5" />} title="When to reach for this">
          <ul className="space-y-1 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            {technique.whenToUse.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </Card>
      )}

      {/* Recipe */}
      {technique.recipe && technique.recipe.length > 0 && (
        <Card icon={<ListOrdered className="h-5 w-5" />} title="The recipe">
          <ol className="space-y-2 list-decimal pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            {technique.recipe.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </Card>
      )}

      {/* Common pitfalls */}
      {technique.commonPitfalls && technique.commonPitfalls.length > 0 && (
        <Card icon={<AlertTriangle className="h-5 w-5" />} title="Common pitfalls" tone="warn">
          <ul className="space-y-1 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            {technique.commonPitfalls.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </Card>
      )}

      {/* Appears in */}
      {technique.appearsIn.length > 0 && (
        <Card icon={<BookOpen className="h-5 w-5" />} title="Practice problems using this technique">
          <ul className="space-y-2">
            {technique.appearsIn.map((appearance) => (
              <li key={appearance.problemId}>
                <Link
                  href={`/interactive/ch${String(appearance.chapter).padStart(2, '0')}/${appearance.problemId}`}
                  className="block rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                >
                  <div className="text-xs text-zinc-500">
                    Ch. {appearance.chapter}{appearance.section ? ` · §${appearance.section}` : ''}
                  </div>
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {appearance.title}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Related techniques */}
      {technique.relatedTechniques && technique.relatedTechniques.length > 0 && (
        <Card icon={<Sparkles className="h-5 w-5" />} title="Related techniques">
          <ul className="space-y-1">
            {technique.relatedTechniques.map((id) => (
              <li key={id}>
                <Link
                  href={`/techniques/${id}`}
                  className="text-sm text-blue-700 dark:text-blue-300 hover:underline"
                >
                  → {id.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </article>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-base leading-relaxed text-zinc-800 dark:text-zinc-200">
          {block.text}
        </p>
      );
    case 'list-numbered':
      return (
        <div>
          {block.title && <p className="font-medium mb-2 text-zinc-900 dark:text-zinc-100">{block.title}</p>}
          <ol className="list-decimal pl-5 space-y-1 text-zinc-800 dark:text-zinc-200">
            {block.items.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        </div>
      );
    case 'list-bulleted':
      return (
        <div>
          {block.title && <p className="font-medium mb-2 text-zinc-900 dark:text-zinc-100">{block.title}</p>}
          <ul className="list-disc pl-5 space-y-1 text-zinc-800 dark:text-zinc-200">
            {block.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      );
    case 'callout':
      return (
        <div className="rounded-lg border border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/20 p-4">
          <div className="text-xs uppercase tracking-wide font-semibold text-blue-700 dark:text-blue-300 mb-1">
            {block.label}
          </div>
          <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{block.text}</p>
        </div>
      );
  }
}

function Card({
  icon, title, tone = 'neutral', children,
}: {
  icon: React.ReactNode;
  title: string;
  tone?: 'neutral' | 'warn';
  children: React.ReactNode;
}) {
  const toneClasses = tone === 'warn'
    ? 'border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20'
    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900';
  return (
    <section className={`rounded-2xl border ${toneClasses} p-5`}>
      <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}
