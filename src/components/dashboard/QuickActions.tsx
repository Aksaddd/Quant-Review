'use client';

import Link from 'next/link';
import { BookOpen, Layers, ArrowRight } from 'lucide-react';

const ACTIONS = [
  {
    icon: BookOpen,
    label: 'Continue reading',
    description: 'Chapter 2: Brain Teasers',
    href: '/read/chapter-2',
    color: 'var(--ka-blue)',
    bg: 'var(--ka-blue-light)',
    border: '#a8c4f8',
  },
  {
    icon: Layers,
    label: 'Practice flashcards',
    description: 'Spaced repetition review',
    href: '/flashcards',
    color: '#1fab54',
    bg: '#e6f4ea',
    border: '#a8d5b5',
  },
];

export default function QuickActions() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {ACTIONS.map(({ icon: Icon, label, description, href, color, bg, border }) => (
        <Link
          key={href}
          href={href}
          className="group flex items-center gap-4 p-4 bg-white border border-[#e4e6ea] rounded-lg hover:border-[#c8ccd4] hover:shadow-sm transition-all duration-150"
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
            style={{ backgroundColor: bg, borderColor: border }}
          >
            <Icon size={18} style={{ color }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#21242c] group-hover:text-[var(--ka-blue)] transition-colors">{label}</p>
            <p className="text-xs text-[#9299a5]">{description}</p>
          </div>
          <ArrowRight size={15} className="text-[#9299a5] group-hover:text-[var(--ka-blue)] group-hover:translate-x-0.5 transition-all shrink-0" />
        </Link>
      ))}
    </div>
  );
}
