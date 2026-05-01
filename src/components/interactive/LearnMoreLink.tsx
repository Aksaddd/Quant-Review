'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

import { getTechnique } from '@/lib/interactive/loader';

interface Props {
  techniqueId: string;
}

/**
 * Inline link to a technique deep-dive. Renders nothing if the technique id
 * doesn't resolve, so a typo in JSON degrades gracefully instead of crashing.
 */
export default function LearnMoreLink({ techniqueId }: Props) {
  const tech = getTechnique(techniqueId);
  if (!tech) return null;
  return (
    <Link
      href={`/techniques/${tech.id}`}
      className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:underline"
    >
      <BookOpen className="h-4 w-4" />
      Learn more about {tech.name}
      <span aria-hidden>→</span>
    </Link>
  );
}
