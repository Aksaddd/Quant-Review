'use client';

import type { InteractiveDoc } from '@/types/interactive';
import ProblemWalkthroughPlayer from './ProblemWalkthroughPlayer';

interface Props {
  doc: InteractiveDoc;
}

export default function InteractivePlayer({ doc }: Props) {
  if (doc.kind === 'problem-walkthrough') {
    return <ProblemWalkthroughPlayer doc={doc} />;
  }
  // reading-section: Phase 2 will add ReadingSectionPlayer
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center text-zinc-500">
      Reading-section player coming in Phase 2.
      <div className="mt-2 text-xs">{doc.title}</div>
    </div>
  );
}
