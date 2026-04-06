'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, Bell } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import Button from '@/components/ui/Button';
import { useProgress } from '@/components/providers/ProgressProvider';

const NAV_LINKS = [
  { href: '/dashboard',      label: 'Dashboard' },
  { href: '/read/chapter-2', label: 'Chapter 2' },
  { href: '/flashcards',     label: 'Flashcards' },
];

/* ── Top nav for landing + auth pages (no sidebar) ──────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="
      sticky top-0 z-40
      border-b border-[var(--surface-border)]
      bg-[var(--surface-0)]/80 backdrop-blur-xl
    ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="
            w-7 h-7 rounded-lg flex items-center justify-center
            bg-brand-500/10 border border-brand-500/20
            group-hover:bg-brand-500/20 transition-colors
          ">
            <Sparkles size={14} className="text-brand-400" />
          </div>
          <span className="font-bold text-sm text-[var(--text-primary)] tracking-tight hidden sm:block">
            Quant Review
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="
                px-3 py-1.5 rounded-lg text-sm text-[var(--text-secondary)]
                hover:text-[var(--text-primary)] hover:bg-white/5
                transition-colors
              "
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/auth/signup" className="hidden sm:block">
            <Button size="sm">Get Started</Button>
          </Link>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--surface-border)] bg-[var(--surface-1)] px-4 py-3 animate-fade-up">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-[var(--surface-border)]">
            <Link href="/auth/login" className="flex-1">
              <Button variant="secondary" size="sm" fullWidth>Sign in</Button>
            </Link>
            <Link href="/auth/signup" className="flex-1">
              <Button size="sm" fullWidth>Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Top bar inside the app shell (with sidebar) ────────────────────────── */
export function AppTopBar({ title }: { title?: string }) {
  const { dueCards } = useProgress();

  return (
    <header className="
      lg:hidden sticky top-0 z-30
      border-b border-[var(--surface-border)]
      bg-[var(--surface-0)]/90 backdrop-blur-xl
      px-4 h-13 flex items-center justify-between
    ">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-brand-500/10 border border-brand-500/20">
          <Sparkles size={14} className="text-brand-400" />
        </div>
        {title && (
          <span className="text-sm font-semibold text-[var(--text-primary)] ml-1">{title}</span>
        )}
      </Link>
      <div className="flex items-center gap-2">
        {dueCards.length > 0 && (
          <Link
            href="/flashcards"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/15 text-brand-400 text-xs font-semibold"
          >
            <Bell size={11} />
            {dueCards.length} due
          </Link>
        )}
      </div>
    </header>
  );
}
