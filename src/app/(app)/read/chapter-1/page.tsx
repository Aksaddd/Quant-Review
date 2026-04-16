'use client';

import { useTextSettings } from '@/hooks/useTextSettings';
import { chapter1Principles } from '@/data/chapter1';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import TextControls from '@/components/reader/TextControls';
import Link from 'next/link';
import { ChevronRight, Lightbulb, ArrowRight } from 'lucide-react';

export default function Chapter1Page() {
  const { cssVars } = useTextSettings();

  return (
    <div className="bg-[#f7f8fa] min-h-screen">
      {/* Sticky breadcrumb bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#e4e6ea]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-[#9299a5] font-medium min-w-0">
            <span className="text-[#626975] font-semibold truncate">Quant Finance Interview Prep</span>
            <span>/</span>
            <span className="text-[#21242c] font-semibold truncate">Chapter 1: General Principles</span>
          </div>
          <TextControls />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Chapter header */}
        <div className="bg-white border border-[#e4e6ea] rounded-lg p-6 mb-6">
          <p className="text-xs font-bold text-[var(--ka-blue)] uppercase tracking-widest mb-1">Chapter 1</p>
          <h1 className="text-2xl font-extrabold text-[#21242c] mb-2">General Principles</h1>
          <p className="text-sm text-[#626975] leading-relaxed max-w-2xl">
            Before diving into the technical content, this chapter establishes the five principles
            that separate candidates who get offers from those who don't. These principles apply
            to every interview, regardless of the specific questions asked.
          </p>

          {/* Principle index pills */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#e4e6ea]">
            {chapter1Principles.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="px-2.5 py-1 rounded-full bg-[#f0f1f3] text-[#626975] text-xs font-medium
                  hover:bg-[var(--ka-blue-light)] hover:text-[var(--ka-blue)] transition-colors"
              >
                {p.number}. {p.title.replace('Principle ' + p.number + ': ', '')}
              </a>
            ))}
          </div>
        </div>

        {/* Principles */}
        <div className="reading-content space-y-6" style={cssVars}>
          {chapter1Principles.map((principle) => (
            <div
              key={principle.id}
              id={principle.id}
              className="bg-white border border-[#e4e6ea] rounded-lg overflow-hidden scroll-mt-16"
            >
              {/* Principle header */}
              <div className="px-6 pt-5 pb-4 border-b border-[#e4e6ea] bg-white">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[var(--ka-blue)] text-white flex items-center justify-center text-sm font-extrabold shrink-0 mt-0.5">
                    {principle.number}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-[#9299a5] uppercase tracking-wider mb-0.5">
                      Principle {principle.number}
                    </p>
                    <h2 className="text-lg font-extrabold text-[#21242c]">
                      {principle.title.replace(`Principle ${principle.number}: `, '')}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-5">
                <div className="prose-reading text-[#21242c]">
                  <MarkdownRenderer content={principle.content} />
                </div>
              </div>

              {/* Key takeaway */}
              <div className="px-6 pb-5">
                <div className="flex gap-3 p-4 rounded-lg bg-[var(--ka-blue-light)] border border-[#a8c4f8]">
                  <Lightbulb size={16} className="text-[var(--ka-blue)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-[var(--ka-blue)] uppercase tracking-wider mb-1">Key Takeaway</p>
                    <p className="text-sm font-medium text-[#21242c]">{principle.keyTakeaway}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next chapter CTA */}
        <div className="mt-8 bg-white border border-[#e4e6ea] rounded-lg p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-[#9299a5] uppercase tracking-wider mb-1">Up next</p>
            <p className="text-base font-extrabold text-[#21242c]">Chapter 2: Brain Teasers</p>
            <p className="text-sm text-[#626975] mt-0.5">37 problems across 9 technique categories</p>
          </div>
          <Link
            href="/read/chapter-2"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--ka-blue)] text-white text-sm font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors shrink-0"
          >
            Start Chapter 2 <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
