import itemsJson from '../../content/competitive_programmers_handbook/metadata/items.json';
import learningPathJson from '../../content/competitive_programmers_handbook/metadata/learning_path.json';
import prereqJson from '../../content/competitive_programmers_handbook/metadata/prerequisite_graph.json';

export type CphDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface CphParagraph {
  order: number;
  text: string;
}

export interface CphCodeExample {
  order: number;
  language: string;
  code: string;
  preceding_paragraph_order: number | null;
  explanatory_paragraphs: number[];
}

export interface CphSubsection {
  level: number;
  title: string;
  paragraph_range: number[];
}

export interface CphFigure {
  src: string;
  alt: string;
  preceding_paragraph_order: number | null;
}

export interface CphFootnote {
  marker: number;
  text: string;
}

export interface CphCrossRef {
  to_chapter: number;
}

export interface CphPart {
  number: number;
  roman: string;
  title: string;
}

export interface CphChapter {
  chapter: number;
  title: string;
  part: CphPart;
  anchor: string;
  slug: string;
  summary: string;
  paragraphs: CphParagraph[];
  code_examples: CphCodeExample[];
  subsections: CphSubsection[];
  figures: CphFigure[];
  footnotes: CphFootnote[];
  cross_references: CphCrossRef[];
  difficulty: CphDifficulty;
  prerequisites: number[];
  concept_tags: string[];
}

export interface CphLearningPath {
  topo_order: number[];
  by_part: Array<{
    part: number;
    roman: string;
    title: string;
    chapters: Array<{ chapter: number; title: string; difficulty: CphDifficulty }>;
  }>;
}

export const cpHandbookChapters = itemsJson as CphChapter[];
export const cpHandbookLearningPath = learningPathJson as CphLearningPath;
export const cpHandbookPrereqGraph = prereqJson as {
  edges: Array<{ from: number; to: number }>;
  adjacency: Record<string, number[]>;
  study_together_clusters: number[][];
};

/** O(1) lookup by chapter number (1..30). */
export const cpHandbookChapterByNumber: Record<number, CphChapter> = Object.fromEntries(
  cpHandbookChapters.map((c) => [c.chapter, c]),
);

/** Chapters grouped by Part, preserving chapter order within each Part. */
export const cpHandbookParts = Object.values(
  cpHandbookChapters.reduce((acc, c) => {
    const key = c.part.number;
    if (!acc[key]) {
      acc[key] = {
        number: c.part.number,
        roman: c.part.roman,
        title: c.part.title,
        chapters: [] as CphChapter[],
      };
    }
    acc[key].chapters.push(c);
    return acc;
  }, {} as Record<number, { number: number; roman: string; title: string; chapters: CphChapter[] }>),
).sort((a, b) => a.number - b.number);
