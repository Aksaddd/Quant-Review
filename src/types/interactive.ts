// Types matching the JSON schema in content/interactive/.
// Two top-level kinds: reading-section (Ch.1 style) and problem-walkthrough (Ch.2+).

export type ContentKind = 'reading-section' | 'problem-walkthrough';

// ── Source citation ──────────────────────────────────────────────

export interface SourceRef {
  file: string;
  lines: string;
}

// ── Blocks (reading-section only) ────────────────────────────────

export type Block =
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'list-numbered'; title?: string; items: string[] }
  | { id: string; type: 'list-bulleted'; title?: string; items: string[] }
  | { id: string; type: 'callout'; label: string; text: string };

// ── Stage primitives ─────────────────────────────────────────────

export interface Option {
  id: string;
  text: string;
  correct: boolean;
}

export interface RatingTier {
  value: number;
  label: string;
}

export interface ClozeBlank {
  id: string;
  answers: string[];
  caseInsensitive?: boolean;
}

export interface NumericRow {
  id: string;
  label: string;
  answer: number;
}

export type GridConstraint =
  | { type: 'sum-equals'; value: number }
  | { type: 'none' };

// ── Stages ───────────────────────────────────────────────────────

interface StageBase {
  id: string;
  label?: string;
  prompt: string;
  targetBlocks?: string[];
  explanation?: string;
}

export interface MCSingleStage extends StageBase {
  type: 'mc-single';
  options: Option[];
}

export interface MCMultiStage extends StageBase {
  type: 'mc-multi';
  options: Option[];
  exactCount?: number;
}

export interface ScenarioStage extends StageBase {
  type: 'scenario';
  options: Option[];
}

export interface SelfGradeStage extends StageBase {
  type: 'self-grade';
  canonicalAnswer: string;
  ratingScale: RatingTier[];
  hint?: string;
}

export interface LadderStepStage extends StageBase {
  type: 'ladder-step';
  answerType: 'numeric' | 'mc-single';
  answer?: number;            // when answerType === 'numeric'
  options?: Option[];         // when answerType === 'mc-single'
  followUp?: {
    prompt: string;
    type: 'mc-single' | 'mc-multi';
    options: Option[];
    exactCount?: number;
  };
}

export interface ClozeStage extends StageBase {
  type: 'cloze';
  template: string;           // e.g. "P5 keeps __[d]__ coins."
  blanks: ClozeBlank[];
}

export interface NumericGridStage extends StageBase {
  type: 'numeric-grid';
  rows: NumericRow[];
  constraint: GridConstraint;
}

export interface ReflectionStage {
  id: string;
  type: 'reflection';
  label?: string;
  targetBlocks?: string[];
  prompts: string[];
  prompt?: never;
}

export type Stage =
  | MCSingleStage
  | MCMultiStage
  | ScenarioStage
  | SelfGradeStage
  | LadderStepStage
  | ClozeStage
  | NumericGridStage
  | ReflectionStage;

// ── Problem mechanism (for variant generation) ───────────────────

export interface Mechanism {
  primary: string;
  structure: string;
  insight: string;
  variantAxes: string[];
}

// ── Setup (problem-walkthrough only) ─────────────────────────────

export interface ProblemSetup {
  narrative: string;
  rules?: string[];
  question: string;
}

// ── Top-level documents ──────────────────────────────────────────

export interface ReadingSection {
  id: string;
  kind: 'reading-section';
  chapter: number;
  section: string;
  title: string;
  source?: SourceRef;
  blocks: Block[];
  learningObjectives?: string[];
  stages: Stage[];
}

export interface Variant {
  id: string;
  parentId: string;
  kind: 'drill' | 'stretch';
  axes: Record<string, string | number>;
  title: string;
  setup: ProblemSetup;
  stages: Stage[];
}

export interface ProblemWalkthrough {
  id: string;
  kind: 'problem-walkthrough';
  chapter: number;
  section: string;
  title: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  source?: SourceRef;
  mechanism: Mechanism;
  setup: ProblemSetup;
  skipToCommitStageId?: string;
  learningObjectives?: string[];
  stages: Stage[];
  variants?: Variant[];
}

export type InteractiveDoc = ReadingSection | ProblemWalkthrough;

// ── Per-stage answer payloads stored by the session store ────────

export type StageAnswer =
  | { kind: 'mc-single'; selectedId: string; correct: boolean }
  | { kind: 'mc-multi'; selectedIds: string[]; correct: boolean }
  | { kind: 'self-grade'; typed: string; rating: number }
  | { kind: 'ladder-step'; numeric?: number; selectedId?: string; followUpIds?: string[]; correct: boolean }
  | { kind: 'cloze'; values: Record<string, string>; correct: boolean }
  | { kind: 'numeric-grid'; values: Record<string, number>; correct: boolean }
  | { kind: 'reflection'; entries: string[] };
