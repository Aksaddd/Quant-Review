import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section
      className="py-14 sm:py-20 px-4 sm:px-6"
      style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
    >
      <div className="max-w-3xl mx-auto text-center relative">
        {/* Accent halo */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, var(--eureka-accent-tint) 0%, transparent 65%)',
          }}
        />

        <div
          className="inline-flex items-center gap-2 px-3 py-1 mb-7 text-[11px] font-medium tracking-tight"
          style={{
            borderRadius: 9999,
            background: 'var(--eureka-accent-tint)',
            border: '0.5px solid var(--eureka-accent-tint-strong)',
            color: 'var(--eureka-accent)',
          }}
        >
          <Sparkles size={11} />
          Free to start — no credit card
        </div>

        <h2
          className="font-semibold tracking-[-0.025em] text-[#1d1d1f] mb-5"
          style={{ fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.08 }}
        >
          Ready to crack the{' '}
          <span style={{ color: 'var(--eureka-accent)' }}>quant interview?</span>
        </h2>

        <p
          className="text-[#6e6e73] mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(16px, 1.8vw, 18px)', letterSpacing: '-0.01em' }}
        >
          Join and start working through Chapter 2 today. Track every problem
          you solve, review every concept with spaced repetition, and walk into
          your interview confident.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" iconRight={<ArrowRight size={18} />} fullWidth>
              Start Studying Free
            </Button>
          </Link>
          <Link href="/read/chapter-2" className="w-full sm:w-auto">
            <Button variant="ghost" size="lg" fullWidth>
              Try without signing up →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
