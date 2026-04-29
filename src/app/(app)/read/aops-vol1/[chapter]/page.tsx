import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, Sparkles, Images } from 'lucide-react';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import {
  aopsVol1Chapters,
  aopsVol1ChapterByNumber,
  aopsFigureById,
  aopsFiguresOfChapter,
  type AopsChapter,
} from '@/data/aops-vol1';

const CONTENT_DIR = path.join(
  process.cwd(),
  'content',
  'The Art of Problem solving Volume 1: the BASICS by Sandor Lehoczky Richard Ruszyk',
);

/**
 * Normalize chapter markdown for rendering and inline figure crops.
 *
 * Source formats:
 *   - Ch 1-9: vision-transcribed prose with a metadata prelude (terminated by
 *     ---) and "<!-- PDF page N / book page M -->" markers at page breaks.
 *     Figures appear as italic placeholders: *[Figure: <caption>]*.
 *   - Ch 10+: clean "# Chapter N: Title" with ```figure-spec``` blocks
 *     containing structured figure metadata (id, caption, elements).
 *
 * Both formats are rewritten to standard markdown image syntax pointing at
 * code-generated SVG figures in /aops-figures/. For ch 10 the mapping is by
 * figure-spec id; for ch 3/9 it's a sequential match in reading order against
 * figures.json entries for that chapter.
 */
function preprocessChapterMarkdown(md: string, chapter: AopsChapter): string {
  let out = md.replace(/^[\s\S]*?\*This chapter spans[\s\S]*?\n---\s*\n/, '');
  // Strip page-tracking HTML comments — no longer rendered inline.
  out = out.replace(/<!--[\s\S]*?-->/g, '');
  out = out.replace(/^\s*#\s+Chapter\s+\d+[^\n]*\n+/, '');
  out = out.replace(/^\s*#\s+\*[^*\n]+\*\s*\n+/, '');

  // Ch 10: figure-spec block → cropped figure image (id-based lookup).
  out = out.replace(/```figure-spec\n([\s\S]*?)\n```/g, (_, body) => {
    const captionMatch = body.match(/^caption:\s*(.+?)$/m);
    const idMatch = body.match(/^id:\s*(\S+)/m);
    const caption = captionMatch ? captionMatch[1].trim() : 'figure';
    const id = idMatch ? idMatch[1].trim() : '';
    const fig = aopsFigureById[id];
    if (fig) return `![${caption}](/aops-figures/${fig.id}.${fig.format ?? 'svg'})`;
    // Fall back to italic placeholder if no crop mapping exists.
    return `*[Figure: ${caption}]*`;
  });

  // Ch 3, 9, 11: sequential placeholder match against chapter's figures.json
  // entries. The first *[Figure: ...]* gets the first figure, etc.
  const chapterFigures = aopsFiguresOfChapter(chapter.number);
  if (chapterFigures.length > 0) {
    let figIndex = 0;
    out = out.replace(/\*\[Figures?:\s*([^\]]+)\]\*/g, (_, captionText) => {
      const fig = chapterFigures[figIndex++];
      const cleanCaption = captionText.trim().replace(/\.$/, '');
      if (fig) return `![${cleanCaption}](/aops-figures/${fig.id}.${fig.format ?? 'svg'})`;
      return `*[Figure: ${captionText.trim()}]*`;
    });
  }

  return out.trimStart();
}

function loadChapterMarkdown(chapter: AopsChapter): string {
  const full = path.join(CONTENT_DIR, chapter.filename);
  return preprocessChapterMarkdown(fs.readFileSync(full, 'utf-8'), chapter);
}

/**
 * Renders a collapsible gallery of the original PDF page scans for the chapter.
 * Source jpegs live in content/ and are served via /api/aops-vol1/page/[n].
 * Used as a fallback for figures that aren't yet rendered as inline diagrams —
 * readers can pop open the gallery to see the original geometry diagrams.
 */
function SourcePages({
  chapter,
}: {
  chapter: { pdfPages: [number, number]; bookPages: [number, number] };
}) {
  const [start, end] = chapter.pdfPages;
  const [bookStart] = chapter.bookPages;
  const pages: Array<{ pdf: number; book: number }> = [];
  for (let i = start; i <= end; i++) {
    pages.push({ pdf: i, book: bookStart + (i - start) });
  }

  return (
    <details className="mt-12 group">
      <summary className="cursor-pointer list-none flex items-center gap-2 px-4 py-3 rounded-lg bg-[#f6faff] border border-[#d8e6ff] hover:bg-[#eef4fb] transition-colors">
        <Images size={14} className="text-[#1865f2]" />
        <span className="text-[13px] font-semibold text-[#1d1d1f]">
          Source pages from the original textbook
        </span>
        <span className="text-[12px] text-[#626975] tabular-nums">
          ({pages.length} pages, pp {chapter.bookPages[0]}–{chapter.bookPages[1]})
        </span>
        <ChevronRight
          size={14}
          className="ml-auto text-[#9299a5] transition-transform group-open:rotate-90"
        />
      </summary>
      <p className="mt-3 px-1 text-[12px] text-[#626975] leading-relaxed">
        Reference: full-page scans from the printed book. Individual figures
        are already extracted and inlined with the prose above; use this
        gallery to see surrounding context or to verify a transcription.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pages.map((p) => (
          <a
            key={p.pdf}
            href={`/api/aops-vol1/page/${p.pdf}`}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg overflow-hidden border border-[#e4e6ea] hover:border-[#1865f2] hover:shadow-md transition-all bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/aops-vol1/page/${p.pdf}`}
              alt={`Source page ${p.book} (PDF page ${p.pdf})`}
              loading="lazy"
              className="w-full h-auto block"
            />
            <div className="px-3 py-2 text-[11px] text-[#626975] flex items-center justify-between border-t border-[#e4e6ea]">
              <span className="font-semibold text-[#21242c]">Page {p.book}</span>
              <span className="tabular-nums text-[#9299a5]">PDF {p.pdf}</span>
            </div>
          </a>
        ))}
      </div>
    </details>
  );
}

export default async function AopsVol1ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter: chapterParam } = await params;
  const num = Number.parseInt(chapterParam, 10);
  const chapter = aopsVol1ChapterByNumber[num];
  if (!chapter) notFound();

  const prev = aopsVol1ChapterByNumber[num - 1];
  const next = aopsVol1ChapterByNumber[num + 1];
  const markdown = loadChapterMarkdown(chapter);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-[#626975] mb-6">
        <Link href="/read/aops-vol1" className="hover:text-[#21242c]">
          AoPS Vol. 1
        </Link>
        <ChevronRight size={12} />
        <span className="text-[#9299a5]">Chapter {chapter.number}</span>
      </nav>

      {/* Title */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-bold text-[#9299a5] tabular-nums">
            CHAPTER {chapter.number}
          </span>
          {chapter.highlight && (
            <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#fff4de] text-[#8a5a00]">
              <Sparkles size={10} />
              High-value
            </span>
          )}
          <span className="text-[11px] text-[#9299a5] tabular-nums">
            pp {chapter.bookPages[0]}–{chapter.bookPages[1]}
          </span>
        </div>
        <h1 className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] leading-tight">
          {chapter.title}
        </h1>
      </header>

      {/* Body */}
      <article>
        <MarkdownRenderer content={markdown} />
      </article>

      {/* Source pages from the original textbook — collapsed by default,
          lazy-loaded thumbnails, click any image to view full-size. */}
      <SourcePages chapter={chapter} />

      {/* Prev / Next */}
      <nav className="mt-12 pt-6 border-t border-[#e4e6ea] flex items-center justify-between">
        {prev ? (
          <Link
            href={`/read/aops-vol1/${prev.number}`}
            className="flex items-center gap-2 text-[13px] text-[#626975] hover:text-[#21242c] group"
          >
            <ChevronLeft size={14} />
            <span>
              <span className="block text-[10px] uppercase tracking-wider text-[#9299a5]">
                Previous
              </span>
              <span className="block">Ch {prev.number}: {prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/read/aops-vol1/${next.number}`}
            className="flex items-center gap-2 text-[13px] text-[#626975] hover:text-[#21242c] text-right group"
          >
            <span>
              <span className="block text-[10px] uppercase tracking-wider text-[#9299a5]">
                Next
              </span>
              <span className="block">Ch {next.number}: {next.title}</span>
            </span>
            <ChevronRight size={14} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

export function generateStaticParams() {
  return aopsVol1Chapters.map((c) => ({ chapter: String(c.number) }));
}
