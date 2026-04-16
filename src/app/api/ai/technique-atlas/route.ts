// ─────────────────────────────────────────────
// POST /api/ai/technique-atlas
// Technique Atlas: classify problems and query relationships.
//
// Actions:
//   { action: "classify", problemId }   — classify techniques for a problem
//   { action: "related", problemId }    — find related problems by technique
//   { action: "stats" }                 — get technique statistics
//   { action: "seed" }                  — get seed technique data
// ─────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import {
  classifyProblemTechniques,
  findRelatedByTechnique,
  getTechniqueStats,
  SEED_TECHNIQUES,
} from '@/lib/ai';
import type { ProblemTechnique, Technique } from '@/lib/ai';
import { chapter2Problems } from '@/data/problems';

const problemMap = new Map(chapter2Problems.map((p) => [p.id, p]));
const allProblems = [...chapter2Problems];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body as { action: string };

    switch (action) {
      case 'classify': {
        const { problemId } = body as { problemId: string };
        const problem = problemMap.get(problemId);
        if (!problem) {
          return NextResponse.json({ error: `Problem not found: ${problemId}` }, { status: 404 });
        }

        const { techniques, tokensUsed } = await classifyProblemTechniques(problem);
        return NextResponse.json({ techniques, tokensUsed });
      }

      case 'related': {
        const { problemId, problemTechniques } = body as {
          problemId: string;
          problemTechniques: ProblemTechnique[];
        };

        if (!problemTechniques) {
          return NextResponse.json(
            { error: 'problemTechniques array is required for related queries.' },
            { status: 400 }
          );
        }

        const related = findRelatedByTechnique(problemId, allProblems, problemTechniques);
        return NextResponse.json({
          related: related.map((r) => ({
            problemId:        r.problem.id,
            title:            r.problem.title,
            chapter:          r.problem.chapter,
            difficulty:       r.problem.difficulty,
            sharedTechniques: r.sharedTechniques,
            maxRelevance:     r.maxRelevance,
          })),
        });
      }

      case 'stats': {
        const { techniques, problemTechniques } = body as {
          techniques: Technique[];
          problemTechniques: ProblemTechnique[];
        };

        if (!techniques || !problemTechniques) {
          return NextResponse.json(
            { error: 'techniques and problemTechniques arrays are required.' },
            { status: 400 }
          );
        }

        const stats = getTechniqueStats(techniques, problemTechniques, allProblems);
        return NextResponse.json({ stats });
      }

      case 'seed': {
        return NextResponse.json({ techniques: SEED_TECHNIQUES });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}. Use "classify", "related", "stats", or "seed".` },
          { status: 400 }
        );
    }
  } catch (err) {
    console.error('[technique-atlas]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
