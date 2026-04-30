'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, LayoutDashboard, Layers } from 'lucide-react';

export interface ChapterRef {
  number: number;
  title: string;
  href: string;
}

interface ChapterPagerProps {
  prev?: ChapterRef;
  next?: ChapterRef;
  /** Where the "All chapters" link should go. Defaults to /dashboard. */
  libraryHref?: string;
  /** Where the "Practice cards" link should go. Defaults to /flashcards. */
  flashcardsHref?: string;
  /** Variant — "between" sits inline at the foot of a chapter when there is a
   *  next chapter; "end" is shown after the last chapter / after completion. */
  variant?: 'between' | 'end';
  /** Optional message rendered above the buttons in "end" variant. */
  endMessage?: React.ReactNode;
}

/**
 * Chapter footer navigation — gives the reader an explicit prev / next /
 * library / flashcards entry point at the bottom of every chapter, instead
 * of forcing them back to the drawer or sidebar to move sequentially.
 */
export default function ChapterPager({
  prev,
  next,
  libraryHref = '/dashboard',
  flashcardsHref = '/flashcards',
  variant = 'between',
  endMessage,
}: ChapterPagerProps) {
  if (variant === 'end') {
    return (
      <div
        className="mt-12 py-8 px-5 sm:px-8 text-center"
        style={{
          borderRadius: 20,
          background: '#ffffff',
          border: '0.5px solid rgba(0,0,0,0.06)',
        }}
      >
        <p className="text-3xl mb-2">🎓</p>
        {endMessage ?? (
          <p className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">End of book</p>
        )}
        <p className="text-[13px] text-[#6e6e73] mt-1 max-w-md mx-auto">
          Lock it in with spaced-repetition flashcards, or jump back to your dashboard.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 mt-6">
          <Link
            href={flashcardsHref}
            className="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-[13px] font-semibold tracking-tight transition-all duration-200 active:scale-[0.97] w-full sm:w-auto"
            style={{
              borderRadius: 12,
              background: 'var(--eureka-accent)',
              color: '#ffffff',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            <Layers size={15} /> Review flashcards
          </Link>
          <Link
            href={libraryHref}
            className="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-[13px] font-semibold tracking-tight border transition-all duration-200 active:scale-[0.97] w-full sm:w-auto"
            style={{
              borderRadius: 12,
              borderColor: 'rgba(0,0,0,0.1)',
              color: '#424245',
              background: '#ffffff',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            <LayoutDashboard size={15} /> Back to dashboard
          </Link>
          {prev && (
            <Link
              href={prev.href}
              className="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-[13px] font-semibold tracking-tight border transition-all duration-200 active:scale-[0.97] w-full sm:w-auto"
              style={{
                borderRadius: 12,
                borderColor: 'rgba(0,0,0,0.1)',
                color: '#424245',
                background: '#ffffff',
                transitionTimingFunction: 'var(--ease-standard)',
              }}
            >
              <ArrowLeft size={15} /> Re-read Ch {prev.number}
            </Link>
          )}
        </div>
      </div>
    );
  }

  // "between" — used when there's a next chapter
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
      {/* Previous */}
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-3 p-4 min-h-[60px] transition-all duration-200"
          style={{
            borderRadius: 16,
            background: '#ffffff',
            border: '0.5px solid rgba(0,0,0,0.06)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            transitionTimingFunction: 'var(--ease-standard)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <ArrowLeft
            size={16}
            className="text-[#86868b] group-hover:text-[var(--eureka-accent)] transition-colors shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#86868b]">
              Previous
            </p>
            <p className="text-[13px] font-semibold tracking-tight text-[#1d1d1f] truncate">
              Ch {prev.number}: {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden />
      )}

      {/* Library / dashboard */}
      <Link
        href={libraryHref}
        className="flex flex-col items-center justify-center gap-1 p-4 min-h-[60px] transition-all duration-200"
        style={{
          borderRadius: 16,
          background: 'var(--eureka-accent-tint)',
          border: '0.5px solid var(--eureka-accent-tint-strong)',
          transitionTimingFunction: 'var(--ease-standard)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <LayoutDashboard size={15} style={{ color: 'var(--eureka-accent)' }} />
        <span
          className="text-[12px] font-semibold tracking-tight"
          style={{ color: 'var(--eureka-accent)' }}
        >
          All chapters
        </span>
      </Link>

      {/* Next */}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center justify-end gap-3 p-4 min-h-[60px] transition-all duration-200"
          style={{
            borderRadius: 16,
            background: '#ffffff',
            border: '0.5px solid rgba(0,0,0,0.06)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            transitionTimingFunction: 'var(--ease-standard)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div className="min-w-0 flex-1 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#86868b]">
              Up next
            </p>
            <p className="text-[13px] font-semibold tracking-tight text-[#1d1d1f] truncate">
              Ch {next.number}: {next.title}
            </p>
          </div>
          <ArrowRight
            size={16}
            className="text-[#86868b] group-hover:text-[var(--eureka-accent)] transition-colors shrink-0"
          />
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden />
      )}
    </div>
  );
}
