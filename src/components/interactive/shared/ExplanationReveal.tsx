'use client';

import { Lightbulb } from 'lucide-react';

interface ExplanationRevealProps {
  text: string;
}

export default function ExplanationReveal({ text }: ExplanationRevealProps) {
  return (
    <div className="rounded-lg border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 p-3 text-sm leading-relaxed text-amber-900 dark:text-amber-200">
      <div className="flex items-start gap-2">
        <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" />
        <p>{text}</p>
      </div>
    </div>
  );
}
