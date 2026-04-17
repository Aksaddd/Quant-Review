import itemsJson from '../../content/Effective_C++/metadata/items.json';
import learningPathJson from '../../content/Effective_C++/metadata/learning_path.json';
import prereqJson from '../../content/Effective_C++/metadata/prerequisite_graph.json';

export type EcppDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface EcppParagraph {
  order: number;
  text: string;
}

export interface EcppCodeExample {
  order: number;
  language: string;
  code: string;
  preceding_paragraph_order: number | null;
  explanatory_paragraphs: number[];
}

export interface EcppSubsection {
  title: string;
  paragraph_range: number[];
}

export interface EcppCrossRef {
  to_item: number;
  anchor: string;
}

export interface EcppItem {
  item: number;
  title: string;
  chapter: { number: number; title: string };
  anchor: string;
  summary: string;
  paragraphs: EcppParagraph[];
  code_examples: EcppCodeExample[];
  subsections: EcppSubsection[];
  things_to_remember: string[];
  cross_references: EcppCrossRef[];
  has_missing_figure: boolean;
  difficulty: EcppDifficulty;
  prerequisites: number[];
  concept_tags: string[];
}

export interface EcppLearningPath {
  topo_order: number[];
  by_chapter: Array<{
    chapter: number;
    title: string;
    items: Array<{ item: number; title: string; difficulty: EcppDifficulty }>;
  }>;
}

export const effectiveCppItems = itemsJson as EcppItem[];
export const effectiveCppLearningPath = learningPathJson as EcppLearningPath;
export const effectiveCppPrereqGraph = prereqJson as {
  edges: Array<{ from: number; to: number }>;
  adjacency: Record<string, number[]>;
  study_together_clusters: number[][];
};

/** O(1) lookup by Item number (1..55). */
export const effectiveCppItemByNumber: Record<number, EcppItem> = Object.fromEntries(
  effectiveCppItems.map((it) => [it.item, it]),
);

/** Items grouped by book chapter (1..9). */
export const effectiveCppItemsByChapter: Record<number, EcppItem[]> = effectiveCppItems.reduce(
  (acc, it) => {
    const key = it.chapter.number;
    if (!acc[key]) acc[key] = [];
    acc[key].push(it);
    return acc;
  },
  {} as Record<number, EcppItem[]>,
);

/** Sorted list of chapter metadata derived from items. */
export const effectiveCppChapters = Object.values(
  effectiveCppItems.reduce((acc, it) => {
    const key = it.chapter.number;
    if (!acc[key]) {
      acc[key] = { number: it.chapter.number, title: it.chapter.title, items: [] as EcppItem[] };
    }
    acc[key].items.push(it);
    return acc;
  }, {} as Record<number, { number: number; title: string; items: EcppItem[] }>),
).sort((a, b) => a.number - b.number);
