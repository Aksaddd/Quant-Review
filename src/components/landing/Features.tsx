'use client';

import { BookOpen, Layers, BarChart3, Settings2, Zap, Brain } from 'lucide-react';

/**
 * Features use iOS hues for icon tiles — monochromatic accent for the
 * two "reading" features, iOS green/orange/purple/red for the rest.
 * Tiles are 12% rgba tints with matching desaturated glyph foregrounds.
 */
const FEATURES = [
  {
    icon: BookOpen,
    color: 'var(--eureka-accent)',
    bg: 'var(--eureka-accent-tint)',
    title: 'Word-for-Word Reader',
    description:
      'Every problem reproduced exactly from the source. Collapsible solutions, progressive hints, and a sticky table of contents keep you oriented.',
  },
  {
    icon: Layers,
    color: 'var(--eureka-accent)',
    bg: 'var(--eureka-accent-tint)',
    title: 'Adaptive Flashcards',
    description:
      'SM-2 spaced repetition schedules your reviews so you see cards right before you forget. 56 cards across problems, concepts, and formulas.',
  },
  {
    icon: BarChart3,
    color: '#1f9b46',
    bg: 'rgba(48,209,88,0.14)',
    title: 'Progress Dashboard',
    description:
      'Track every problem and card per section. See your weakest areas at a glance and know exactly where to focus next.',
  },
  {
    icon: Settings2,
    color: '#8a44c2',
    bg: 'rgba(191,90,242,0.12)',
    title: 'Reading Customization',
    description:
      'Adjust font size, family, line height, and letter spacing. Switch between dark, sepia, and light themes — all saved automatically.',
  },
  {
    icon: Zap,
    color: '#b76d07',
    bg: 'rgba(255,159,10,0.14)',
    title: 'Works Offline',
    description:
      'Your progress lives in localStorage — no login required to get started. Sign up to sync across devices and never lose your streak.',
  },
  {
    icon: Brain,
    color: '#d1365c',
    bg: 'rgba(255,55,95,0.12)',
    title: 'Built by Quant Experts',
    description:
      'Flashcard content written by a quant interview expert — not scraped. Concept cards explain the technique; formula cards encode the closed forms.',
  },
];

export default function Features() {
  return (
    <section
      className="py-14 sm:py-20 px-4 sm:px-6"
      style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-3"
            style={{ color: 'var(--eureka-accent)' }}
          >
            Everything you need
          </p>
          <h2
            className="font-semibold tracking-[-0.02em] text-[#1d1d1f] mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.1 }}
          >
            Study smarter, not longer
          </h2>
          <p className="text-[#6e6e73] max-w-xl mx-auto text-[15px] leading-relaxed">
            A focused platform built for one goal: getting you through a quant
            interview. No noise, no fluff — just the material and the tools to
            learn it.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {FEATURES.map(({ icon: Icon, color, bg, title, description }) => (
            <div
              key={title}
              className="p-4 sm:p-5 transition-all duration-200"
              style={{
                background: '#ffffff',
                border: '0.5px solid rgba(0,0,0,0.06)',
                borderRadius: 16,
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                transitionTimingFunction: 'var(--ease-standard)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div
                className="w-9 h-9 flex items-center justify-center mb-4"
                style={{
                  background: bg,
                  borderRadius: 10,
                  border: '0.5px solid rgba(0,0,0,0.04)',
                }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <h3 className="font-semibold text-[#1d1d1f] mb-2 text-[14px] tracking-tight">
                {title}
              </h3>
              <p className="text-[12px] text-[#6e6e73] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
