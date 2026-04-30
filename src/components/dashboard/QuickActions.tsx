'use client';

import Link from 'next/link';
import { BookOpen, Layers, ArrowRight, Library, Settings as SettingsIcon } from 'lucide-react';

const ACTIONS = [
  {
    icon: BookOpen,
    label: 'Continue reading',
    description: 'Chapter 2: Brain Teasers',
    href: '/read/chapter-2',
    color: 'var(--eureka-accent)',
    tint: 'var(--eureka-accent-tint)',
  },
  {
    icon: Layers,
    label: 'Practice flashcards',
    description: 'Spaced repetition review',
    href: '/flashcards',
    color: '#30d158',
    tint: 'rgba(48,209,88,0.12)',
  },
  {
    icon: Library,
    label: 'Browse the library',
    description: 'Chapters 1–7 + reference books',
    href: '/read/chapter-1',
    color: '#0a84ff',
    tint: 'rgba(10,132,255,0.12)',
  },
  {
    icon: SettingsIcon,
    label: 'Tune your study',
    description: 'Daily new cards · review queue',
    href: '/settings',
    color: '#8a44c2',
    tint: 'rgba(191,90,242,0.12)',
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {ACTIONS.map(({ icon: Icon, label, description, href, color, tint }) => (
        <Link
          key={href}
          href={href}
          className="group flex items-center gap-4 p-4 transition-all duration-200"
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
            className="w-10 h-10 flex items-center justify-center shrink-0"
            style={{
              background: tint,
              borderRadius: 12,
              border: '0.5px solid rgba(0,0,0,0.04)',
            }}
          >
            <Icon size={18} style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-[14px] font-semibold tracking-tight text-[#1d1d1f] group-hover:text-[color:var(--eureka-accent)] transition-colors duration-200"
              style={{ transitionTimingFunction: 'var(--ease-standard)' }}
            >
              {label}
            </p>
            <p className="text-[11px] text-[#86868b] truncate">{description}</p>
          </div>
          <ArrowRight
            size={15}
            className="text-[#86868b] group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
            style={{ transitionTimingFunction: 'var(--ease-standard)' }}
          />
        </Link>
      ))}
    </div>
  );
}
