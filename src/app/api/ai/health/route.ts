// ─────────────────────────────────────────────
// GET /api/ai/health
// Health check for AI services.
// ─────────────────────────────────────────────

import { NextResponse } from 'next/server';
import { healthCheck, CLAUDE_MODEL, EMBEDDING_MODEL } from '@/lib/ai';

export async function GET() {
  const claude = await healthCheck();

  return NextResponse.json({
    status:    claude.ok ? 'healthy' : 'degraded',
    services: {
      claude: {
        ok:    claude.ok,
        model: claude.model,
        error: claude.error,
      },
      embeddings: {
        model:      EMBEDDING_MODEL,
        dimensions: 1536,
        configured: !!process.env.OPENAI_API_KEY,
      },
    },
    timestamp: new Date().toISOString(),
  });
}
