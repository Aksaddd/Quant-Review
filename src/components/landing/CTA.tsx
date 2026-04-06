import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-[var(--surface-border)]">
      <div className="max-w-3xl mx-auto text-center relative">
        {/* Glow */}
        <div
          aria-hidden
          className="
            absolute inset-0 -z-10
            bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.07)_0%,transparent_65%)]
          "
        />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/8 border border-brand-500/20 text-xs font-medium text-brand-400 mb-7">
          <Sparkles size={11} />
          Free to start — no credit card
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] leading-tight mb-5">
          Ready to crack the
          <span className="text-gradient"> quant interview?</span>
        </h2>

        <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-xl mx-auto">
          Join and start working through Chapter 2 today. Track every problem
          you solve, review every concept with spaced repetition, and walk into
          your interview confident.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/auth/signup">
            <Button size="lg" iconRight={<ArrowRight size={18} />}>
              Create Free Account
            </Button>
          </Link>
          <Link href="/read/chapter-2">
            <Button variant="ghost" size="lg">
              Try without signing up →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
