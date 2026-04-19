import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, ListOrdered, Link as LinkIcon } from 'lucide-react';
import { clsx } from 'clsx';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import RecallMask from '@/components/study-overlay/RecallMask';
import RecallQueue, { type RecallPrompt } from '@/components/study-overlay/RecallQueue';
import StudyOverlayBar from '@/components/study-overlay/StudyOverlayBar';
import {
  effectiveCppItemByNumber,
  effectiveCppItems,
  type EcppItem,
} from '@/data/effective-cpp';

const DIFFICULTY_STYLES: Record<string, { bg: string; fg: string; label: string }> = {
  beginner:     { bg: 'bg-[#e6f4ea]', fg: 'text-[#1e6b34]', label: 'Beginner' },
  intermediate: { bg: 'bg-[#fff4de]', fg: 'text-[#8a5a00]', label: 'Intermediate' },
  advanced:     { bg: 'bg-[#fde8e6]', fg: 'text-[#a21f1f]', label: 'Advanced' },
};

type Segment =
  | { kind: 'prose'; order: number; text: string }
  | { kind: 'code'; order: number; language: string; code: string };

/**
 * Interleave paragraphs and code examples back into reading order. Paragraphs
 * carry an `order` that increments across the whole item; each code example
 * records the paragraph order it followed via `preceding_paragraph_order`,
 * so we slot it right after that paragraph.
 */
function weaveSegments(item: EcppItem): Segment[] {
  const segments: Segment[] = [];
  const codeByPreceding = new Map<number | 'leading', EcppItem['code_examples']>();
  for (const ce of item.code_examples) {
    const key = ce.preceding_paragraph_order === null ? 'leading' : ce.preceding_paragraph_order;
    const bucket = codeByPreceding.get(key) ?? [];
    bucket.push(ce);
    codeByPreceding.set(key, bucket);
  }

  // Leading code (appears before any paragraph).
  for (const ce of codeByPreceding.get('leading') ?? []) {
    segments.push({ kind: 'code', order: ce.order, language: ce.language, code: ce.code });
  }

  for (const p of item.paragraphs) {
    segments.push({ kind: 'prose', order: p.order, text: p.text });
    for (const ce of codeByPreceding.get(p.order) ?? []) {
      segments.push({ kind: 'code', order: ce.order, language: ce.language, code: ce.code });
    }
  }

  return segments;
}

/**
 * Rewrite Meyers' cross-reference anchors ([Item N](<#anchor>)) so they point
 * to our own /read/effective-cpp/N routes.
 */
function rewriteCrossRefs(text: string): string {
  return text.replace(/\[Item\s+(\d+)\]\(<#[^>]+>\)/g, (_, n) => `[Item ${n}](/read/effective-cpp/${n})`);
}

export default async function EffectiveCppItemPage({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const { item: itemParam } = await params;
  const num = Number.parseInt(itemParam, 10);
  const item = effectiveCppItemByNumber[num];
  if (!item) notFound();

  const prev = effectiveCppItemByNumber[num - 1];
  const next = effectiveCppItemByNumber[num + 1];
  const d = DIFFICULTY_STYLES[item.difficulty] ?? DIFFICULTY_STYLES.intermediate;
  const segments = weaveSegments(item);

  /* Priming cues surfaced at the top when the recall overlay is on. Subsections
   * make the strongest cues (each is a self-contained sub-topic); when an item
   * has none, we fall back to the Things-to-Remember count as a single prompt. */
  const recallPrompts: RecallPrompt[] = item.subsections.length > 0
    ? item.subsections.map((s, i) => ({
        anchorId: `ecpp-sub-${item.item}-${i}`,
        label: s.title,
      }))
    : item.things_to_remember.length > 0
      ? [{
          anchorId: `ecpp-ttr-${item.item}`,
          label: `Recall all ${item.things_to_remember.length} "Things to Remember" for this item.`,
        }]
      : [];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-[#626975] mb-6">
        <Link href="/read/effective-cpp" className="hover:text-[#21242c]">
          Effective C++
        </Link>
        <ChevronRight size={12} />
        <span className="text-[#9299a5]">
          Chapter {item.chapter.number} · {item.chapter.title}
        </span>
      </nav>

      {/* Title */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-bold text-[#9299a5] tabular-nums">
            ITEM {item.item}
          </span>
          <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full', d.bg, d.fg)}>
            {d.label}
          </span>
        </div>
        <h1 className="text-[26px] font-semibold tracking-tight text-[#1d1d1f] leading-tight mb-4">
          {item.title.replace(/\.$/, '')}
        </h1>
        <p className="text-[14px] text-[#626975] italic leading-relaxed">{item.summary}</p>
        {item.concept_tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.concept_tags.map((tag) => (
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
      <RecallQueue heading="Subsections in this item" prompts={recallPrompts} />

      {/* Prose + code */}
      <article className="space-y-5">
        {segments.map((seg) =>
          seg.kind === 'prose' ? (
            <MarkdownRenderer
              key={`p-${seg.order}`}
              content={rewriteCrossRefs(seg.text)}
            />
          ) : (
            <RecallMask
              key={`c-${seg.order}`}
              id={`ecpp-${item.item}-code-${seg.order}`}
              kind="Code example"
              prompt="What does the code demonstrated here look like? Sketch it mentally — types, qualifiers, structure — before revealing."
            >
              <pre
                className="bg-[#1d1d1f] text-[#f6f7f8] rounded-lg px-4 py-3 overflow-x-auto text-[13px] leading-relaxed font-mono"
              >
                <code>{seg.code}</code>
              </pre>
            </RecallMask>
          ),
        )}
      </article>

      {/* Things to Remember */}
      {item.things_to_remember.length > 0 && (
        <aside
          id={`ecpp-ttr-${item.item}`}
          className="mt-12 p-5 rounded-xl bg-[#f6faff] border border-[#d8e6ff]"
        >
          <h2 className="flex items-center gap-2 text-[13px] font-semibold text-[#1d1d1f] mb-3 uppercase tracking-wider">
            <ListOrdered size={14} />
            Things to Remember
          </h2>
          <ul className="space-y-2.5">
            {item.things_to_remember.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-[14px] text-[#21242c] leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-[#1865f2] text-white text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <RecallMask
                    id={`ecpp-${item.item}-ttr-${i}`}
                    kind={`Key point ${i + 1} of ${item.things_to_remember.length}`}
                    prompt="Try to recall this point in your own words first, then reveal to verify."
                  >
                    <MarkdownRenderer content={bullet} className="ecpp-bullet-prose" />
                  </RecallMask>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Cross-references */}
      {item.cross_references.length > 0 && (
        <aside className="mt-8">
          <h2 className="flex items-center gap-2 text-[12px] font-semibold text-[#626975] mb-3 uppercase tracking-wider">
            <LinkIcon size={12} />
            Related Items
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {item.cross_references.map((ref) => {
              const target = effectiveCppItemByNumber[ref.to_item];
              if (!target) return null;
              return (
                <Link
                  key={ref.to_item}
                  href={`/read/effective-cpp/${ref.to_item}`}
                  className="text-[12px] text-[#1865f2] hover:underline px-2.5 py-1 rounded-md bg-[#f0f4fb] hover:bg-[#e4edf8]"
                >
                  Item {ref.to_item}: {target.title.replace(/\.$/, '')}
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
            href={`/read/effective-cpp/${prev.item}`}
            className="flex items-center gap-2 text-[13px] text-[#626975] hover:text-[#21242c] group"
          >
            <ChevronLeft size={14} />
            <span>
              <span className="block text-[10px] uppercase tracking-wider text-[#9299a5]">
                Previous
              </span>
              <span className="block">Item {prev.item}: {prev.title.replace(/\.$/, '')}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/read/effective-cpp/${next.item}`}
            className="flex items-center gap-2 text-[13px] text-[#626975] hover:text-[#21242c] text-right group"
          >
            <span>
              <span className="block text-[10px] uppercase tracking-wider text-[#9299a5]">
                Next
              </span>
              <span className="block">Item {next.item}: {next.title.replace(/\.$/, '')}</span>
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
  return effectiveCppItems.map((it) => ({ item: String(it.item) }));
}
