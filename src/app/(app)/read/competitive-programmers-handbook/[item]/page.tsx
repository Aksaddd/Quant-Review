import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, ListOrdered, Link as LinkIcon } from 'lucide-react';
import { clsx } from 'clsx';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import RecallMask from '@/components/study-overlay/RecallMask';
import RecallQueue, { type RecallPrompt } from '@/components/study-overlay/RecallQueue';
import StudyOverlayBar from '@/components/study-overlay/StudyOverlayBar';
import {
  cpHandbookChapterByNumber,
  cpHandbookChapters,
  type CphChapter,
} from '@/data/competitive-programmers-handbook';

const DIFFICULTY_STYLES: Record<string, { bg: string; fg: string; label: string }> = {
  beginner:     { bg: 'bg-[#e6f4ea]', fg: 'text-[#1e6b34]', label: 'Beginner' },
  intermediate: { bg: 'bg-[#fff4de]', fg: 'text-[#8a5a00]', label: 'Intermediate' },
  advanced:     { bg: 'bg-[#fde8e6]', fg: 'text-[#a21f1f]', label: 'Advanced' },
};

type Segment =
  | { kind: 'prose'; order: number; text: string }
  | { kind: 'code'; order: number; language: string; code: string }
  | { kind: 'figure'; order: number; src: string; alt: string }
  | { kind: 'subhead'; order: number; level: number; title: string };

/**
 * Interleave paragraphs, code, figures, and subsection headings into reading
 * order. Each non-prose segment records the paragraph order it follows
 * (preceding_paragraph_order / paragraph_range[0]), so we slot it right after
 * that paragraph.
 */
function weaveSegments(chapter: CphChapter): Segment[] {
  // Bucket non-prose segments by the paragraph order they follow.
  const bucket = new Map<number | 'leading', Segment[]>();
  const push = (key: number | 'leading', seg: Segment) => {
    const arr = bucket.get(key) ?? [];
    arr.push(seg);
    bucket.set(key, arr);
  };

  for (const ce of chapter.code_examples) {
    const key = ce.preceding_paragraph_order === null ? 'leading' : ce.preceding_paragraph_order;
    push(key, { kind: 'code', order: ce.order, language: ce.language, code: ce.code });
  }
  for (const fig of chapter.figures) {
    const key = fig.preceding_paragraph_order === null ? 'leading' : fig.preceding_paragraph_order;
    push(key, { kind: 'figure', order: -1, src: fig.src, alt: fig.alt });
  }
  for (const sub of chapter.subsections) {
    // Subsection heading sits just before its first paragraph — attach it to the
    // paragraph *before* the range start (so it precedes the subsection body).
    const firstInSub = sub.paragraph_range[0];
    const key = firstInSub === 0 ? 'leading' : firstInSub - 1;
    push(key, { kind: 'subhead', order: firstInSub, level: sub.level, title: sub.title });
  }

  const segments: Segment[] = [];
  for (const seg of bucket.get('leading') ?? []) segments.push(seg);
  for (const p of chapter.paragraphs) {
    segments.push({ kind: 'prose', order: p.order, text: p.text });
    for (const seg of bucket.get(p.order) ?? []) segments.push(seg);
  }
  return segments;
}

/**
 * Rewrite "Chapter N" mentions in prose so they link to /read/competitive-programmers-handbook/N.
 */
function rewriteCrossRefs(text: string, ownChapter: number): string {
  return text.replace(/\bChapter\s+(\d+)\b/g, (match, n) => {
    const target = Number.parseInt(n, 10);
    if (target === ownChapter || target < 1 || target > 30) return match;
    return `[Chapter ${n}](/read/competitive-programmers-handbook/${n})`;
  });
}

export default async function CpHandbookChapterPage({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const { item: itemParam } = await params;
  const num = Number.parseInt(itemParam, 10);
  const chapter = cpHandbookChapterByNumber[num];
  if (!chapter) notFound();

  const prev = cpHandbookChapterByNumber[num - 1];
  const next = cpHandbookChapterByNumber[num + 1];
  const d = DIFFICULTY_STYLES[chapter.difficulty] ?? DIFFICULTY_STYLES.intermediate;
  const segments = weaveSegments(chapter);

  /* CP chapters are long; subsection titles are the natural retrieval cues.
   * Clicking a cue jumps to the heading's anchor in the article below. */
  const subsectionAnchorId = (i: number) => `cph-sub-${chapter.chapter}-${i}`;
  const recallPrompts: RecallPrompt[] = chapter.subsections.map((s, i) => ({
    anchorId: subsectionAnchorId(i),
    label: s.title,
  }));

  /* Map subhead segments to their chapter-level subsection index so the ids
   * match the queue's anchors. */
  const subheadIndexByTitle = new Map<string, number>();
  chapter.subsections.forEach((s, i) => subheadIndexByTitle.set(s.title, i));

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-[#626975] mb-6">
        <Link href="/read/competitive-programmers-handbook" className="hover:text-[#21242c]">
          Competitive Programmer&apos;s Handbook
        </Link>
        <ChevronRight size={12} />
        <span className="text-[#9299a5]">
          Part {chapter.part.roman} · {chapter.part.title}
        </span>
      </nav>

      {/* Title */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-bold text-[#9299a5] tabular-nums">
            CHAPTER {chapter.chapter}
          </span>
          <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full', d.bg, d.fg)}>
            {d.label}
          </span>
        </div>
        <h1 className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] leading-tight mb-4">
          {chapter.title}
        </h1>
        <p className="text-[14px] text-[#626975] italic leading-relaxed">{chapter.summary}</p>
        {chapter.concept_tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {chapter.concept_tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-[#626975] bg-[#f0f1f3] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Recall queue (hidden unless overlay is on) */}
      <RecallQueue heading="Subsections in this chapter" prompts={recallPrompts} />

      {/* Weaved prose + code + figures + subheadings */}
      <article className="space-y-5">
        {segments.map((seg, idx) => {
          if (seg.kind === 'prose') {
            return (
              <MarkdownRenderer
                key={`p-${seg.order}`}
                content={rewriteCrossRefs(seg.text, chapter.chapter)}
              />
            );
          }
          if (seg.kind === 'code') {
            return (
              <RecallMask
                key={`c-${seg.order}-${idx}`}
                id={`cph-${chapter.chapter}-code-${seg.order}-${idx}`}
                kind="Code example"
                prompt="Before revealing, sketch the algorithm or data structure in your head — names, loops, recurrence — then check yourself."
              >
                <pre
                  className="bg-[#1d1d1f] text-[#f6f7f8] rounded-lg px-4 py-3 overflow-x-auto text-[13px] leading-relaxed font-mono"
                >
                  <code>{seg.code}</code>
                </pre>
              </RecallMask>
            );
          }
          if (seg.kind === 'figure') {
            return (
              <figure
                key={`f-${idx}`}
                className="my-2 p-3 rounded-lg bg-[#fafafa] border border-[#e4e6ea] flex flex-col items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={seg.src}
                  alt={seg.alt}
                  className="max-w-full h-auto"
                  loading="lazy"
                />
                {seg.alt && !/^Figure from page/.test(seg.alt) && (
                  <figcaption className="mt-2 text-[11px] text-[#626975] italic leading-snug text-center max-w-prose">
                    {seg.alt}
                  </figcaption>
                )}
              </figure>
            );
          }
          if (seg.kind === 'subhead') {
            const Tag = seg.level === 2 ? 'h2' : 'h3';
            const cls =
              seg.level === 2
                ? 'text-[18px] font-semibold text-[#1d1d1f] tracking-tight mt-6 scroll-mt-16'
                : 'text-[15px] font-semibold text-[#21242c] tracking-tight mt-4 scroll-mt-16';
            const subIdx = subheadIndexByTitle.get(seg.title);
            const id = subIdx !== undefined ? subsectionAnchorId(subIdx) : undefined;
            return (
              <Tag key={`h-${idx}`} id={id} className={cls}>
                {seg.title}
              </Tag>
            );
          }
          return null;
        })}
      </article>

      {/* Footnotes */}
      {chapter.footnotes.length > 0 && (
        <aside className="mt-12 p-5 rounded-xl bg-[#fafafa] border border-[#e4e6ea]">
          <h2 className="flex items-center gap-2 text-[12px] font-semibold text-[#626975] mb-3 uppercase tracking-wider">
            <ListOrdered size={12} />
            Footnotes
          </h2>
          <ol className="space-y-2">
            {chapter.footnotes.map((fn) => (
              <li key={fn.marker} className="flex gap-3 text-[13px] text-[#21242c] leading-relaxed">
                <span className="text-[11px] font-bold text-[#9299a5] tabular-nums shrink-0">
                  [{fn.marker}]
                </span>
                <MarkdownRenderer content={fn.text} className="ecpp-bullet-prose" />
              </li>
            ))}
          </ol>
        </aside>
      )}

      {/* Cross-references */}
      {chapter.cross_references.length > 0 && (
        <aside className="mt-8">
          <h2 className="flex items-center gap-2 text-[12px] font-semibold text-[#626975] mb-3 uppercase tracking-wider">
            <LinkIcon size={12} />
            Related Chapters
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {chapter.cross_references.map((ref) => {
              const target = cpHandbookChapterByNumber[ref.to_chapter];
              if (!target) return null;
              return (
                <Link
                  key={ref.to_chapter}
                  href={`/read/competitive-programmers-handbook/${ref.to_chapter}`}
                  className="text-[12px] text-[#1865f2] hover:underline px-2.5 py-1 rounded-md bg-[#f0f4fb] hover:bg-[#e4edf8]"
                >
                  Chapter {ref.to_chapter}: {target.title}
                </Link>
              );
            })}
          </div>
        </aside>
      )}

      {/* Prev / Next */}
      <nav className="mt-12 pt-6 border-t border-[#e4e6ea] flex items-center justify-between">
        {prev ? (
          <Link
            href={`/read/competitive-programmers-handbook/${prev.chapter}`}
            className="flex items-center gap-2 text-[13px] text-[#626975] hover:text-[#21242c] group"
          >
            <ChevronLeft size={14} />
            <span>
              <span className="block text-[10px] uppercase tracking-wider text-[#9299a5]">
                Previous
              </span>
              <span className="block">Chapter {prev.chapter}: {prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/read/competitive-programmers-handbook/${next.chapter}`}
            className="flex items-center gap-2 text-[13px] text-[#626975] hover:text-[#21242c] text-right group"
          >
            <span>
              <span className="block text-[10px] uppercase tracking-wider text-[#9299a5]">
                Next
              </span>
              <span className="block">Chapter {next.chapter}: {next.title}</span>
            </span>
            <ChevronRight size={14} />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <StudyOverlayBar />
    </div>
  );
}

export function generateStaticParams() {
  return cpHandbookChapters.map((c) => ({ item: String(c.chapter) }));
}
