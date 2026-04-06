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
    <header className="sticky top-0 z-40 bg-white border-b border-[#e4e6ea]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--ka-blue)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="font-bold text-[15px] text-[#21242c] hidden sm:block">
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
        <div className="md:hidden border-t border-[#e4e6ea] bg-white px-4 py-3 animate-fade-up">
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
    <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-[#e4e6ea] px-4 h-14 flex items-center justify-between">
      {/* Logo + breadcrumb */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--ka-blue)] flex items-center justify-center">
            <span className="text-white font-bold text-xs">Q</span>
          </div>
        </Link>
        {crumb && (
          <>
            <span className="text-[#e4e6ea]">/</span>
            <span className="text-sm font-semibold text-[#21242c]">{crumb}</span>
          </>
        )}
      </div>

      {/* Due badge */}
      {dueCards.length > 0 && (
        <Link
          href="/flashcards"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--ka-blue-light)] text-[var(--ka-blue)] text-xs font-semibold"
        >
          {dueCards.length} due
        </Link>
      )}
    </header>
  );
}
