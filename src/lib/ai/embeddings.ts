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

const EMBEDDING_MODEL      = process.env.EMBEDDING_MODEL ?? 'text-embedding-3-small';
const EMBEDDING_DIMENSIONS = parseInt(process.env.EMBEDDING_DIMENSIONS ?? '1536', 10);
const OPENAI_API_KEY       = () => process.env.OPENAI_API_KEY ?? '';

// Max tokens per embedding request (text-embedding-3-small: 8191)
const MAX_CHUNK_TOKENS = 8000;

// ── Types ───────────────────────────────────────

interface OpenAIEmbeddingResponse {
  data: Array<{ embedding: number[]; index: number }>;
  usage: { prompt_tokens: number; total_tokens: number };
}

// ── Core Functions ──────────────────────────────

/**
 * Generate embeddings for one or more text strings.
 * Uses OpenAI's text-embedding-3-small for cost efficiency.
 * Batches automatically (API supports up to 2048 inputs).
 */
export async function generateEmbeddings(
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

  // Sort by index to maintain input order
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
