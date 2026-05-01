'use client';

import StageShell from '../shared/StageShell';

interface Props {
  index: number;
  total: number;
  stageType: string;
  label?: string;
  onAdvance: () => void;
  isLast: boolean;
}

export default function UnsupportedStage({ index, total, stageType, label, onAdvance, isLast }: Props) {
  return (
    <StageShell
      index={index} total={total} label={label}
      prompt={`This stage type ("${stageType}") is not yet implemented.`}
      footer={(
        <div className="flex justify-end">
          <button
            type="button" onClick={onAdvance}
            className="rounded-md bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            {isLast ? 'Finish' : 'Skip stage →'}
          </button>
        </div>
      )}
    >
      <p className="text-sm text-zinc-500">
        Phase 2 will add support for self-grade, cloze, scenario, mc-multi, and reflection stages.
      </p>
    </StageShell>
  );
}
