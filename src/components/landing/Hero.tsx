'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Sparkles, BookOpen, Brain, Trophy, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 px-4 sm:px-6">
      {/* Background glow */}
      <div
        aria-hidden
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[900px] h-[600px]
          bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08)_0%,transparent_60%)]
          pointer-events-none
        "
      />

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-500/20 bg-brand-500/8 text-xs font-medium text-brand-400 mb-8 animate-fade-up">
          <Sparkles size={12} />
          Based on Zhou's Practical Guide to Quant Finance Interviews
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-up [animation-delay:60ms]">
          Land the
          <span className="text-gradient"> quant role</span>
          <br className="hidden sm:block" />
          {' '}you're after.
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up [animation-delay:120ms]">
          Every problem from the definitive quant interview guide — now
          interactive, tracked, and spaced. Read word-for-word, then drill with
          adaptive flashcards until it's second nature.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up [animation-delay:180ms]">
          <Link href="/dashboard">
            <Button size="lg" iconRight={<ArrowRight size={18} />}>
              Start Studying — It's Free
            </Button>
          </Link>
          <Link href="/read/chapter-2">
            <Button variant="secondary" size="lg" icon={<BookOpen size={17} />}>
              Browse Chapter 2
            </Button>
          </Link>
        </div>

        {/* Social proof numbers */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-14 animate-fade-up [animation-delay:240ms]">
          {[
            { icon: Brain,  value: '37', label: 'Problems' },
            { icon: Sparkles, value: '56', label: 'Flashcards' },
            { icon: BookOpen, value: '9',  label: 'Techniques' },
            { icon: Trophy,   value: 'SM-2', label: 'Spaced Repetition' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon size={18} className="text-brand-400 mb-0.5" />
              <span className="text-2xl font-bold text-[var(--text-primary)]">{value}</span>
              <span className="text-xs text-[var(--text-muted)]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating problem card preview */}
      <div className="max-w-2xl mx-auto mt-16 animate-fade-up [animation-delay:300ms]">
        <PreviewCard />
      </div>
    </section>
  );
}

function PreviewCard() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="
      rounded-2xl border border-[var(--surface-border-strong)]
      bg-[var(--surface-2)] overflow-hidden
      shadow-[0_24px_60px_rgba(0,0,0,0.5)]
    ">
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--surface-border)] bg-[var(--surface-3)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-[var(--text-muted)] font-mono">
          quant-review.app/read/chapter-2
        </span>
      </div>

      {/* Problem preview */}
      <div className="p-5 sm:p-7">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success)]/20">
            Easy
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--info-bg)] text-[var(--info)] border border-[var(--info)]/20">
            2.2 Logic
          </span>
        </div>

        <h3 className="font-bold text-lg text-[var(--text-primary)] mb-3">
          Trailing Zeros
        </h3>

        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
          How many trailing zeros does{' '}
          <code className="text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded text-xs font-mono">
            100!
          </code>{' '}
          have?
        </p>

        {/* Reveal / solution */}
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="
              w-full py-2.5 rounded-xl
              border border-dashed border-[var(--surface-border-strong)]
              text-xs text-[var(--text-muted)] font-medium
              hover:border-brand-500/40 hover:text-brand-400 hover:bg-brand-500/5
              transition-all duration-200
              flex items-center justify-center gap-2
            "
          >
            <Eye size={13} />
            Reveal Solution
          </button>
        ) : (
          <div className="rounded-xl border border-[var(--surface-border)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-[var(--surface-3)] border-b border-[var(--surface-border)]">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Solution</span>
              <button
                onClick={() => setRevealed(false)}
                className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <EyeOff size={11} /> Hide
              </button>
            </div>
            <div className="px-4 py-3 bg-[var(--surface-2)]">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                A trailing zero is created by a factor of <strong className="text-[var(--text-primary)]">10 = 2 × 5</strong>.
                Since factors of 2 are plentiful, count the factors of 5 in 100!
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
                ⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = <strong className="text-[var(--text-primary)]">24</strong>
              </p>
              <div className="mt-3 px-3 py-2 rounded-lg bg-[var(--success-bg)] border border-[var(--success)]/20">
                <p className="text-xs font-bold text-[var(--success)]">Answer: 24 trailing zeros</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
