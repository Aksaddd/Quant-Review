// ─────────────────────────────────────────────
// POST /api/ai/interleaved
// Generate an interleaved or blocked practice set.
// ─────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import {
  selectInterleaved,
  analyzeDifficultyDistribution,
  analyzeChapterDistribution,
  DEFAULT_INTERLEAVED_CONFIG,
} from '@/lib/ai';
import type { InterleavedConfig, ProblemSM2Card } from '@/lib/ai';
import { chapter2Problems } from '@/data/problems';

// All available problems (extend as chapters 3–7 problem data grows)
const allProblems = [...chapter2Problems];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      config,
      sm2States,
    } = body as {
      config?: Partial<InterleavedConfig>;
      sm2States?: Record<string, ProblemSM2Card>;
    };

    const mergedConfig: InterleavedConfig = {
      ...DEFAULT_INTERLEAVED_CONFIG,
      ...config,
    };

    const selected = selectInterleaved(
      allProblems,
      mergedConfig,
      sm2States
    );

    const difficultyDist = analyzeDifficultyDistribution(selected);
    const chapterDist    = analyzeChapterDistribution(selected);

    return NextResponse.json({
      problems: selected.map((p) => ({
        id:         p.id,
        chapter:    p.chapter,
        section:    p.section,
        title:      p.title,
        difficulty: p.difficulty,
        tags:       p.tags,
      })),
      meta: {
        mode:          mergedConfig.mode,
        requested:     mergedConfig.problemCount,
        returned:      selected.length,
        difficulty:    difficultyDist,
        chapters:      chapterDist,
      },
    });
  } catch (err) {
    console.error('[interleaved]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
