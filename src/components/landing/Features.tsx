import { BookOpen, Layers, BarChart3, Settings2, Zap, Brain } from 'lucide-react';

const FEATURES = [
  {
    icon: BookOpen,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10 border-blue-400/20',
    title: 'Word-for-Word Reader',
    description:
      'Every problem reproduced exactly from the source. Collapsible solutions, progressive hints, and a sticky table of contents keep you oriented.',
  },
  {
    icon: Layers,
    color: 'text-brand-400',
    bg: 'bg-brand-400/10 border-brand-400/20',
    title: 'Adaptive Flashcards',
    description:
      'SM-2 spaced repetition schedules your reviews so you see cards right before you forget. 56 cards across problems, concepts, and formulas.',
  },
  {
    icon: BarChart3,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border-emerald-400/20',
    title: 'Progress Dashboard',
    description:
      'Track every problem and card per section. See your weakest areas at a glance and know exactly where to focus next.',
  },
  {
    icon: Settings2,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10 border-purple-400/20',
    title: 'Reading Customization',
    description:
      'Adjust font size, family, line height, and letter spacing. Switch between dark, sepia, and light themes — all saved automatically.',
  },
  {
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10 border-yellow-400/20',
    title: 'Works Offline',
    description:
      'Your progress lives in localStorage — no login required to get started. Sign up to sync across devices and never lose your streak.',
  },
  {
    icon: Brain,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10 border-rose-400/20',
    title: 'Built by Quant Experts',
    description:
      'Flashcard content written by a quant interview expert — not scraped. Concept cards explain the technique; formula cards encode the closed forms.',
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-[var(--surface-border)]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">
            Everything you need
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Study smarter, not longer
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            A focused platform built for one goal: getting you through a quant
            interview. No noise, no fluff — just the material and the tools to
            learn it.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, color, bg, title, description }) => (
            <div
              key={title}
              className="
                p-5 rounded-2xl
                bg-[var(--surface-2)] border border-[var(--surface-border)]
                hover:border-[var(--surface-border-strong)] hover:bg-[var(--surface-3)]
                hover:-translate-y-0.5
                transition-all duration-200
              "
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border mb-4 ${bg}`}>
                <Icon size={18} className={color} />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">
                {title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
