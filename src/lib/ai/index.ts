// ─────────────────────────────────────────────
// AI / ML Infrastructure — Public API
// AI/ML Engineer · Phase 1 Foundation
//
// Central barrel export for all AI services.
// Import from '@/lib/ai' for clean access.
// ─────────────────────────────────────────────

// ── Types ───────────────────────────────────────
export type {
  // Error taxonomy
  ErrorType,
  ProblemSession,
  ProblemError,
  // SM-2 for problems
  ProblemSM2State,
  ProblemSM2Card,
  ReviewGradeAI,
  // Approach evaluation
  StudentApproach,
  ApproachEvaluation,
  // Technique Atlas
  Technique,
  ProblemTechnique,
  // Weakness profiles
  WeaknessProfile,
  DifficultySignals,
  AdaptiveRecommendation,
  // Interleaved practice
  InterleavedConfig,
  InterleavedSession,
  // Socratic sessions
  SocraticRole,
  SocraticMessage,
  SocraticScore,
  SocraticSession,
  // Prompt management
  PromptVersion,
  // Embeddings
  ContentType,
  ContentEmbedding,
  SimilarityResult,
} from './types';

export { GRADE_QUALITY_MAP } from './types';

// ── Claude API Service ──────────────────────────
export {
  complete,
  stream,
  completeJSON,
  parseJSON,
  healthCheck,
  CLAUDE_MODEL,
} from './claude';
export type { ClaudeMessage, ClaudeResponse, ClaudeStreamCallbacks } from './claude';

// ── Embeddings Service ──────────────────────────
export {
  generateEmbedding,
  generateEmbeddings,
  batchEmbed,
  chunkContent,
  findSimilar,
  buildMatchQuery,
  EMBEDDING_MODEL,
  EMBEDDING_DIMENSIONS,
} from './embeddings';

// ── Prompt Templates ────────────────────────────
export {
  renderPrompt,
  PROMPT_REGISTRY,
  EVALUATE_APPROACH,
  SOCRATIC_INTERVIEWER,
  WEAKNESS_ANALYSIS,
  TECHNIQUE_CLASSIFIER,
  HINT_GENERATOR,
} from './prompts';
export type { PromptTemplate } from './prompts';

// ── SM-2 for Problems ───────────────────────────
export {
  createProblemSM2,
  applyProblemSM2,
  isProblemDue,
  getProblemsDue,
  getNewProblems,
  getMasteredProblems,
  getProblemSM2Stats,
  prioritizeProblems,
  MASTERY_THRESHOLD_DAYS,
} from './sm2-problems';

// ── Interleaved Practice Engine ─────────────────
export {
  selectInterleaved,
  analyzeDifficultyDistribution,
  analyzeChapterDistribution,
  DEFAULT_INTERLEAVED_CONFIG,
} from './interleave';

// ── Adaptive Difficulty Engine ──────────────────
export {
  computeSignals,
  recommend,
  recommendByTechnique,
  evaluateTime,
  TARGET_SUCCESS_RATE,
  DIFFICULTY_NUMERIC,
} from './adaptive-difficulty';

// ── Generate-Before-Reveal ──────────────────────
export {
  evaluateApproach,
  generateHint,
  evaluationToGrade,
  isValidApproach,
  computeCompletionRate,
} from './generate-before-reveal';

// ── Technique Atlas ─────────────────────────────
export {
  classifyProblemTechniques,
  findRelatedByTechnique,
  findSimilarProblems,
  buildAtlasIndex,
  getTechniqueStats,
  SEED_TECHNIQUES,
} from './technique-atlas';

// ── Socratic Simulation ─────────────────────────
export {
  startSession as startSocraticSession,
  sendMessage as sendSocraticMessage,
  streamMessage as streamSocraticMessage,
  scoreSession as scoreSocraticSession,
  getSessionStats as getSocraticStats,
  MAX_HINTS,
  MAX_TURNS,
} from './socratic';

// ── Weakness Profiling ──────────────────────────
export {
  computeWeaknessProfiles,
  analyzeWeaknesses,
  computeReadinessScore,
  getWeakestTechniques,
  getImprovingTechniques,
} from './weakness-profile';
export type { WeaknessAnalysis } from './weakness-profile';
