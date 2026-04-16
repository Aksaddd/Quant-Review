// ─────────────────────────────────────────────
// Embeddings Service Layer
// AI/ML Engineer · Phase 1 Foundation
//
// Handles text → vector embedding generation and
// pgvector similarity search via Supabase.
// Powers: Technique Atlas, related problems, content retrieval.
// ─────────────────────────────────────────────

import type { ContentType, ContentEmbedding, SimilarityResult } from './types';

// ── Configuration ───────────────────────────────

// Default: Google text-embedding-005 — $0.00625/MTok, 768 dims, ~64% MTEB
// 3.2x cheaper than OpenAI text-embedding-3-small ($0.02/MTok, 1536 dims)
// Fallback: set EMBEDDING_PROVIDER=openai in .env.local to use OpenAI instead
const EMBEDDING_PROVIDER   = process.env.EMBEDDING_PROVIDER ?? 'google';
const EMBEDDING_MODEL      = process.env.EMBEDDING_MODEL
  ?? (EMBEDDING_PROVIDER === 'google' ? 'text-embedding-005' : 'text-embedding-3-small');
const EMBEDDING_DIMENSIONS = parseInt(
  process.env.EMBEDDING_DIMENSIONS ?? (EMBEDDING_PROVIDER === 'google' ? '768' : '1536'),
  10
);
const GOOGLE_API_KEY = () => process.env.GOOGLE_API_KEY ?? '';
const OPENAI_API_KEY = () => process.env.OPENAI_API_KEY ?? '';

// Max tokens per embedding request
const MAX_CHUNK_TOKENS = 8000;

// ── Types ───────────────────────────────────────

interface OpenAIEmbeddingResponse {
  data: Array<{ embedding: number[]; index: number }>;
  usage: { prompt_tokens: number; total_tokens: number };
}

interface GoogleEmbeddingResponse {
  embeddings: Array<{ values: number[] }>;
}

// ── Core Functions ──────────────────────────────

/**
 * Generate embeddings for one or more text strings.
 * Routes to Google text-embedding-005 (default) or OpenAI based on config.
 */
export async function generateEmbeddings(
  texts: string[]
): Promise<{ embeddings: number[][]; tokensUsed: number }> {
  if (EMBEDDING_PROVIDER === 'google') {
    return generateEmbeddingsGoogle(texts);
  }
  return generateEmbeddingsOpenAI(texts);
}

/**
 * Google text-embedding-005 — $0.00625/MTok, 768 dims
 */
async function generateEmbeddingsGoogle(
  texts: string[]
): Promise<{ embeddings: number[][]; tokensUsed: number }> {
  const apiKey = GOOGLE_API_KEY();
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY is not set. Add it to .env.local for embeddings.');
  }

  // Google Embedding API batches up to 100 texts per request
  const allEmbeddings: number[][] = [];
  let totalTokens = 0;

  for (let i = 0; i < texts.length; i += 100) {
    const batch = texts.slice(i, i + 100);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:batchEmbedContents?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: batch.map((text) => ({
            model: `models/${EMBEDDING_MODEL}`,
            content: { parts: [{ text }] },
          })),
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Google Embeddings API error (${response.status}): ${errorBody}`);
    }

    const result = (await response.json()) as GoogleEmbeddingResponse;
    allEmbeddings.push(...result.embeddings.map((e) => e.values));
    // Google doesn't return token counts; estimate ~1 token per 4 chars
    totalTokens += batch.reduce((sum, t) => sum + Math.ceil(t.length / 4), 0);
  }

  return { embeddings: allEmbeddings, tokensUsed: totalTokens };
}

/**
 * OpenAI text-embedding-3-small — $0.02/MTok, 1536 dims (fallback)
 */
async function generateEmbeddingsOpenAI(
  texts: string[]
): Promise<{ embeddings: number[][]; tokensUsed: number }> {
  const apiKey = OPENAI_API_KEY();
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set. Add it to .env.local for embeddings.');
  }

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model:      EMBEDDING_MODEL,
      input:      texts,
      dimensions: EMBEDDING_DIMENSIONS,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI Embeddings API error (${response.status}): ${errorBody}`);
  }

  const result = (await response.json()) as OpenAIEmbeddingResponse;
  const sorted = result.data.sort((a, b) => a.index - b.index);

  return {
    embeddings: sorted.map((d) => d.embedding),
    tokensUsed: result.usage.total_tokens,
  };
}

/**
 * Generate a single embedding vector.
 */
export async function generateEmbedding(
  text: string
): Promise<{ embedding: number[]; tokensUsed: number }> {
  const result = await generateEmbeddings([text]);
  return {
    embedding:  result.embeddings[0],
    tokensUsed: result.tokensUsed,
  };
}

// ── Content Chunking ────────────────────────────

/**
 * Split long content into chunks suitable for embedding.
 * Respects paragraph boundaries for coherent chunks.
 * Rough estimate: 1 token ≈ 4 characters.
 */
export function chunkContent(
  text: string,
  maxChars: number = MAX_CHUNK_TOKENS * 4
): string[] {
  if (text.length <= maxChars) return [text];

  const paragraphs = text.split(/\n\n+/);
  const chunks: string[] = [];
  let current = '';

  for (const para of paragraphs) {
    if (current.length + para.length + 2 > maxChars) {
      if (current) chunks.push(current.trim());
      current = para;
    } else {
      current += (current ? '\n\n' : '') + para;
    }
  }
  if (current) chunks.push(current.trim());

  return chunks;
}

// ── Bulk Embedding Pipeline ─────────────────────

export interface EmbeddingInput {
  contentType: ContentType;
  contentId: string;
  text: string;
  metadata?: Record<string, unknown>;
}

export interface EmbeddingOutput extends EmbeddingInput {
  chunkIndex: number;
  embedding: number[];
}

/**
 * Process a batch of content items into embeddings.
 * Handles chunking, batching, and rate limiting.
 * Returns ready-to-insert records for the content_embeddings table.
 */
export async function batchEmbed(
  inputs: EmbeddingInput[],
  batchSize: number = 100
): Promise<{ records: EmbeddingOutput[]; totalTokens: number }> {
  const records: EmbeddingOutput[] = [];
  let totalTokens = 0;

  // Expand inputs into chunks
  const expanded: Array<EmbeddingInput & { chunkIndex: number; chunkText: string }> = [];

  for (const input of inputs) {
    const chunks = chunkContent(input.text);
    for (let i = 0; i < chunks.length; i++) {
      expanded.push({ ...input, chunkIndex: i, chunkText: chunks[i] });
    }
  }

  // Process in batches
  for (let i = 0; i < expanded.length; i += batchSize) {
    const batch   = expanded.slice(i, i + batchSize);
    const texts   = batch.map((b) => b.chunkText);
    const result  = await generateEmbeddings(texts);
    totalTokens  += result.tokensUsed;

    for (let j = 0; j < batch.length; j++) {
      const item = batch[j];
      records.push({
        contentType: item.contentType,
        contentId:   item.contentId,
        text:        item.chunkText,
        chunkIndex:  item.chunkIndex,
        embedding:   result.embeddings[j],
        metadata:    item.metadata,
      });
    }

    // Rate limit: 3000 RPM for text-embedding-3-small, add small delay between batches
    if (i + batchSize < expanded.length) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  return { records, totalTokens };
}

// ── Similarity Search (client-side for Supabase RPC) ──

/**
 * Build the arguments for the Supabase match_embeddings RPC call.
 * The actual call is made by the caller using supabase.rpc().
 */
export function buildMatchQuery(
  queryEmbedding: number[],
  options: {
    matchCount?: number;
    matchThreshold?: number;
    filterType?: ContentType;
  } = {}
): {
  query_embedding: string;
  match_count: number;
  match_threshold: number;
  filter_type: string | null;
} {
  return {
    query_embedding: JSON.stringify(queryEmbedding),
    match_count:     options.matchCount ?? 10,
    match_threshold: options.matchThreshold ?? 0.7,
    filter_type:     options.filterType ?? null,
  };
}

/**
 * Find similar content by semantic search.
 * Generates embedding for query text, then searches pgvector.
 * Returns results sorted by similarity (highest first).
 */
export async function findSimilar(
  queryText: string,
  supabaseClient: {
    rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: SimilarityResult[] | null; error: unknown }>;
  },
  options: {
    matchCount?: number;
    matchThreshold?: number;
    filterType?: ContentType;
  } = {}
): Promise<SimilarityResult[]> {
  const { embedding } = await generateEmbedding(queryText);

  const { data, error } = await supabaseClient.rpc(
    'match_embeddings',
    buildMatchQuery(embedding, options)
  );

  if (error) {
    throw new Error(`Similarity search failed: ${JSON.stringify(error)}`);
  }

  return data ?? [];
}

export { EMBEDDING_MODEL, EMBEDDING_DIMENSIONS };
