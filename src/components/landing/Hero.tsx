'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Sparkles, BookOpen, Brain, Trophy, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6">
      {/* Accent halo */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, var(--eureka-accent-tint-strong) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Pill badge */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-medium mb-6 sm:mb-8 animate-fade-up tracking-tight max-w-full"
          style={{
            borderRadius: 9999,
            background: 'var(--eureka-accent-tint)',
            border: '0.5px solid var(--eureka-accent-tint-strong)',
            color: 'var(--eureka-accent)',
          }}
        >
          <Sparkles size={12} />
          Based on Zhou&apos;s Practical Guide to Quant Finance Interviews
        </div>

        {/* Headline — Apple display treatment */}
        <h1
          className="font-semibold leading-[1.04] mb-5 sm:mb-6 animate-fade-up [animation-delay:60ms] text-[#1d1d1f]"
          style={{
            fontSize: 'clamp(34px, 7vw, 72px)',
            letterSpacing: '-0.035em',
          }}
        >
          Land the{' '}
          <span style={{ color: 'var(--eureka-accent)' }}>quant role</span>
          <br className="hidden sm:block" />
          {' '}you&rsquo;re after.
        </h1>

        {/* Subheading */}
        <p
          className="max-w-2xl mx-auto mb-10 animate-fade-up [animation-delay:120ms] text-[#6e6e73] leading-[1.45]"
          style={{ fontSize: 'clamp(17px, 2vw, 20px)', letterSpacing: '-0.01em' }}
        >
          Every problem from the definitive quant interview guide — now
          interactive, tracked, and spaced. Read word-for-word, then drill with
          adaptive flashcards until it&apos;s second nature.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 animate-fade-up [animation-delay:180ms]">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" iconRight={<ArrowRight size={18} />} fullWidth>
              Start Studying
            </Button>
          </Link>
          <Link href="/read/chapter-2" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" iconLeft={<BookOpen size={17} />} fullWidth>
              Browse Chapter 2
            </Button>
          </Link>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10 sm:mt-14 animate-fade-up [animation-delay:240ms]">
          {[
            { icon: Brain,    value: '37',   label: 'Problems' },
            { icon: Sparkles, value: '56',   label: 'Flashcards' },
            { icon: BookOpen, value: '9',    label: 'Techniques' },
            { icon: Trophy,   value: 'SM-2', label: 'Spaced Repetition' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon size={18} style={{ color: 'var(--eureka-accent)' }} className="mb-0.5" />
              <span className="text-[26px] font-semibold tabular-nums tracking-[-0.02em] text-[#1d1d1f]">{value}</span>
              <span className="text-[11px] text-[#86868b] tracking-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating problem card preview */}
      <div className="max-w-2xl mx-auto mt-10 sm:mt-16 animate-fade-up [animation-delay:300ms]">
        <PreviewCard />
      </div>
    </section>
  );
}

function PreviewCard() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className="overflow-hidden"
      style={{
        background: '#ffffff',
        border: '0.5px solid rgba(0,0,0,0.06)',
        borderRadius: 20,
        boxShadow: '0 24px 60px -24px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.05)',
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-1.5 px-4 py-3"
        style={{
          borderBottom: '0.5px solid rgba(0,0,0,0.06)',
          background: 'rgba(245,245,247,0.8)',
        }}
      >
        <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#febc2e' }} />
        <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#28c840' }} />
        <span className="ml-3 text-[11px] text-[#86868b] font-mono">
          quant-review.app/read/chapter-2
        </span>
      </div>

      {/* Problem preview */}
      <div className="p-5 sm:p-7">
        <div className="flex items-start gap-2 mb-4">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-md tracking-tight"
            style={{ background: 'rgba(48,209,88,0.14)', color: '#1f9b46' }}
          >
            Easy
          </span>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-md tracking-tight"
            style={{ background: 'var(--eureka-accent-tint)', color: 'var(--eureka-accent)' }}
          >
            2.2 Logic
          </span>
        </div>

        <h3 className="font-semibold text-[20px] tracking-tight text-[#1d1d1f] mb-3">
          Trailing Zeros
        </h3>

        <p className="text-[#424245] text-[14px] leading-relaxed mb-5">
          How many trailing zeros does{' '}
          <code
            className="px-1.5 py-0.5 rounded-md text-[12px] font-mono"
            style={{ background: 'var(--eureka-accent-tint)', color: 'var(--eureka-accent)' }}
          >
            100!
          </code>{' '}
          have?
        </p>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full py-2.5 text-[12px] font-medium flex items-center justify-center gap-2 transition-all duration-200"
            style={{
              borderRadius: 12,
              border: '0.5px dashed rgba(0,0,0,0.15)',
              color: '#86868b',
              transitionTimingFunction: 'var(--ease-standard)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--eureka-accent-tint-strong)';
              e.currentTarget.style.color = 'var(--eureka-accent)';
              e.currentTarget.style.background = 'var(--eureka-accent-tint)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)';
              e.currentTarget.style.color = '#86868b';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Eye size={13} />
            Reveal Solution
          </button>
        ) : (
          <div
            className="overflow-hidden"
            style={{
              borderRadius: 12,
              border: '0.5px solid rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{
                background: 'rgba(245,245,247,0.8)',
                borderBottom: '0.5px solid rgba(0,0,0,0.06)',
              }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.08em]"
                style={{ color: 'var(--eureka-accent)' }}
              >
                Solution
              </span>
              <button
                onClick={() => setRevealed(false)}
                className="flex items-center gap-1 text-[10px] text-[#86868b] hover:text-[#424245] transition-colors duration-200"
                style={{ transitionTimingFunction: 'var(--ease-standard)' }}
              >
                <EyeOff size={11} /> Hide
              </button>
            </div>
            <div className="px-4 py-3 bg-white">
              <p className="text-[13px] text-[#424245] leading-relaxed">
                A trailing zero is created by a factor of <strong className="text-[#1d1d1f] font-semibold">10 = 2 × 5</strong>.
                Since factors of 2 are plentiful, count the factors of 5 in 100!
              </p>
              <p className="text-[13px] text-[#424245] leading-relaxed mt-2">
                ⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = <strong className="text-[#1d1d1f] font-semibold">24</strong>
              </p>
              <div
                className="mt-3 px-3 py-2"
                style={{
                  borderRadius: 10,
                  background: 'rgba(48,209,88,0.12)',
                  border: '0.5px solid rgba(48,209,88,0.25)',
                }}
              >
                <p className="text-[11px] font-semibold tracking-tight" style={{ color: '#1f9b46' }}>
                  Answer: 24 trailing zeros
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
