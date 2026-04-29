import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import {
  aopsVol1Chapters,
  aopsVol1ChapterByNumber,
} from '@/data/aops-vol1';

const CONTENT_DIR = path.join(
  process.cwd(),
  'content',
  'The Art of Problem solving Volume 1: the BASICS by Sandor Lehoczky Richard Ruszyk',
);

/**
 * Strip the metadata prelude and the duplicated chapter-title H1s that appear
 * at the top of every transcribed chapter. The page header renders this info
 * itself, so the body should start with the first section heading (or prose,
 * for chapters with a single section).
 */
function preprocessChapterMarkdown(md: string): string {
  let out = md.replace(/^[\s\S]*?\n---\s*\n/, '');
  out = out.replace(/^(\s*<!--[^>]*-->\s*\n+)?# Chapter \d+\s*\n+/, '$1');
  out = out.replace(/^(\s*<!--[^>]*-->\s*\n+)?# \*[^*]+\*\s*\n+/, '$1');
  return out.trimStart();
}

function loadChapterMarkdown(filename: string): string {
  const full = path.join(CONTENT_DIR, filename);
  return preprocessChapterMarkdown(fs.readFileSync(full, 'utf-8'));
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
  const markdown = loadChapterMarkdown(chapter.filename);

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
