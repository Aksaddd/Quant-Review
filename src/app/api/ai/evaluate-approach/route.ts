// ─────────────────────────────────────────────
// POST /api/ai/evaluate-approach
// Generate-Before-Reveal: evaluate student approach.
// ─────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { evaluateApproach, isValidApproach } from '@/lib/ai';
import { chapter2Problems } from '@/data/problems';

// Build a lookup map for all problems
const problemMap = new Map(chapter2Problems.map((p) => [p.id, p]));

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { problemId, approachText, confidence } = body as {
      problemId: string;
      approachText: string;
      confidence?: number;
    };

    if (!problemId || !approachText) {
      return NextResponse.json(
        { error: 'problemId and approachText are required.' },
        { status: 400 }
      );
    }

    const problem = problemMap.get(problemId);
    if (!problem) {
      return NextResponse.json(
        { error: `Problem not found: ${problemId}` },
        { status: 404 }
      );
    }

    if (!isValidApproach(approachText)) {
      return NextResponse.json(
        { error: 'Approach is too short or does not contain meaningful content. Please write at least a few sentences describing your thinking.' },
        { status: 422 }
      );
    }

    const { evaluation, tokensUsed } = await evaluateApproach(problem, approachText);

    return NextResponse.json({
      evaluation,
      tokensUsed,
    });
  } catch (err) {
    console.error('[evaluate-approach]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
