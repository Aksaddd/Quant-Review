'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import Button from '@/components/ui/Button';
import { useProgress } from '@/components/providers/ProgressProvider';

const NAV_LINKS = [
  { href: '/dashboard',      label: 'Dashboard' },
  { href: '/read/chapter-1', label: 'Chapter 1' },
  { href: '/read/chapter-2', label: 'Chapter 2' },
  { href: '/flashcards',     label: 'Practice'  },
];

/* ── Landing / auth navbar ─────────────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: 'var(--material-thin-light)',
        backdropFilter: 'var(--material-blur)',
        WebkitBackdropFilter: 'var(--material-blur)',
        borderBottom: '0.5px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.04]"
            style={{
              borderRadius: 10,
              background: 'var(--eureka-accent)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            <span className="text-white font-semibold text-sm tracking-tight">Q</span>
          </div>
          <span className="font-semibold text-[15px] text-[#1d1d1f] hidden sm:block tracking-tight">
            Quant Review
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-md text-sm text-[#626975] hover:text-[#21242c] hover:bg-[#f0f1f3] transition-colors font-medium"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/signup" className="hidden sm:block">
            <Button size="sm">Get started</Button>
          </Link>
          <button
            className="md:hidden p-2 rounded-md text-[#626975] hover:text-[#21242c] hover:bg-[#f0f1f3] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 py-3 animate-fade-up"
          style={{
            background: 'var(--material-regular-light)',
            backdropFilter: 'var(--material-blur)',
            WebkitBackdropFilter: 'var(--material-blur)',
            borderTop: '0.5px solid rgba(0,0,0,0.06)',
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-[#626975] hover:text-[#21242c] hover:bg-[#f0f1f3] transition-colors text-sm font-medium"
            >
              {label}
              <ChevronRight size={14} />
            </Link>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-[#e4e6ea]">
            <Link href="/login" className="flex-1">
              <Button variant="secondary" size="sm" fullWidth>Sign in</Button>
            </Link>
            <Link href="/signup" className="flex-1">
              <Button size="sm" fullWidth>Get started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Top bar inside app shell (mobile only) ─────────────────────────────── */
export function AppTopBar({ title }: { title?: string }) {
  const { dueCards } = useProgress();
  const pathname = usePathname();

  // Build breadcrumb label
  const crumb =
    pathname.startsWith('/read/chapter-2') ? 'Chapter 2' :
    pathname.startsWith('/flashcards')     ? 'Practice'  :
    pathname.startsWith('/dashboard')      ? 'Dashboard' :
    title ?? '';

  return (
    <header
      className="lg:hidden sticky top-0 z-30 px-4 h-14 flex items-center justify-between"
      style={{
        background: 'var(--material-thin-light)',
        backdropFilter: 'var(--material-blur)',
        WebkitBackdropFilter: 'var(--material-blur)',
        borderBottom: '0.5px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Logo + breadcrumb */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-7 h-7 flex items-center justify-center"
            style={{
              borderRadius: 8,
              background: 'var(--eureka-accent)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            }}
          >
            <span className="text-white font-semibold text-xs tracking-tight">Q</span>
          </div>
        </Link>
        {crumb && (
          <>
            <span className="text-[#d2d2d7]">/</span>
            <span className="text-sm font-semibold text-[#1d1d1f] tracking-tight">{crumb}</span>
          </>
        )}
      </div>

      {/* Due badge */}
      {dueCards.length > 0 && (
        <Link
          href="/flashcards"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors duration-200"
          style={{
            background: 'var(--eureka-accent-tint)',
            color: 'var(--eureka-accent)',
            transitionTimingFunction: 'var(--ease-standard)',
          }}
        >
          {dueCards.length} due
        </Link>
      )}
    </header>
  );
}
