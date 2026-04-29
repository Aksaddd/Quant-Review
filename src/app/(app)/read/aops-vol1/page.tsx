import Link from 'next/link';
import { BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import {
  aopsVol1Chapters,
  AOPS_VOL1_TOTAL_CHAPTERS,
} from '@/data/aops-vol1';

export default function AopsVol1IndexPage() {
  const ready = aopsVol1Chapters.length;
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#626975] mb-3">
          <BookOpen size={13} />
          <span>Sandor Lehoczky &amp; Richard Rusczyk · Volume 1</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-3">
          The Art of Problem Solving — The Basics
        </h1>
        <p className="text-[15px] text-[#626975] leading-relaxed max-w-2xl">
          The classic AoPS introduction covering algebra, number theory, geometry,
          counting, and probability. Each chapter weaves prose with worked
          examples, exercises, and end-of-chapter problem sets.
        </p>
        <div className="mt-5 flex gap-2 text-[12px] text-[#626975]">
          <span className="px-2.5 py-1 rounded-full bg-[#f0f1f3]">
            {ready} of {AOPS_VOL1_TOTAL_CHAPTERS} chapters ready
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#fff4de] text-[#8a5a00]">
            Chapters {ready + 1}–{AOPS_VOL1_TOTAL_CHAPTERS} in progress
          </span>
        </div>
      </header>

      <section>
        <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-[#e4e6ea]">
          <span className="text-[11px] font-bold text-[#9299a5] tabular-nums">
            AVAILABLE CHAPTERS
          </span>
          <span className="ml-auto text-[11px] text-[#9299a5] tabular-nums">
            {ready} chapters
          </span>
        </div>
        <ul className="space-y-1">
          {aopsVol1Chapters.map((ch) => (
            <li key={ch.number}>
              <Link
                href={`/read/aops-vol1/${ch.number}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f0f1f3] transition-colors group"
              >
                <span className="w-10 text-[11px] font-bold text-[#9299a5] tabular-nums shrink-0">
                  Ch {ch.number}
                </span>
                <span className="flex-1 text-[14px] text-[#21242c] group-hover:text-black leading-snug">
                  {ch.title}
                </span>
                {ch.highlight && (
                  <span
                    title="High-value chapter for quant prep"
                    className="text-[#d39800] shrink-0"
                  >
                    <Sparkles size={12} />
                  </span>
                )}
                <span className="text-[11px] text-[#9299a5] tabular-nums shrink-0">
                  pp {ch.bookPages[0]}–{ch.bookPages[1]}
                </span>
                <ChevronRight
                  size={14}
                  className="text-[#9299a5] group-hover:text-[#626975] shrink-0"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 p-5 rounded-xl bg-[#f6faff] border border-[#d8e6ff]">
        <h2 className="text-[13px] font-semibold text-[#1d1d1f] mb-2 uppercase tracking-wider">
          Coming soon
        </h2>
        <p className="text-[13px] text-[#626975] leading-relaxed">
          Chapters {aopsVol1Chapters.length + 1}–{AOPS_VOL1_TOTAL_CHAPTERS} (geometry deep-dives, transformations,
          functions &amp; inequalities, sequences &amp; series, counting &amp; probability,
          sets &amp; logic) are pending a high-fidelity transcription pass. The raw
          source PDF is available in the content folder.
        </p>
      </section>
    </div>
  );
}
