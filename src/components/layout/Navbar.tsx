'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useProgress } from '@/components/providers/ProgressProvider';

const NAV_LINKS = [
  { href: '/dashboard',      label: 'Dashboard' },
  { href: '/read/chapter-1', label: 'Chapter 1' },
  { href: '/read/chapter-2', label: 'Chapter 2' },
  { href: '/#library',       label: 'Library'   },
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
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
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link href="/login" className="hidden xs:block">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/signup" className="hidden sm:block">
            <Button size="sm">Get started</Button>
          </Link>
          {/* Compact CTA for very small screens */}
          <Link href="/signup" className="sm:hidden">
            <Button size="sm">Start</Button>
          </Link>
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-md text-[#626975] hover:text-[#21242c] hover:bg-[#f0f1f3] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="flex items-center justify-between px-3 py-3 min-h-[44px] rounded-lg text-[#626975] hover:text-[#21242c] hover:bg-[#f0f1f3] transition-colors text-sm font-medium"
            >
              {label}
              <ChevronRight size={14} />
            </Link>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-[#e4e6ea]">
            <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="secondary" size="sm" fullWidth>Sign in</Button>
            </Link>
            <Link href="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button size="sm" fullWidth>Get started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Top bar inside app shell (mobile only) ─────────────────────────────── */
interface AppTopBarProps {
  title?: string;
  onOpenMenu?: () => void;
}

export function AppTopBar({ title, onOpenMenu }: AppTopBarProps) {
  const { dueCards } = useProgress();
  const pathname = usePathname();

  // Build breadcrumb label
  const crumb =
    pathname.startsWith('/read/chapter-1')                     ? 'Chapter 1' :
    pathname.startsWith('/read/chapter-2')                     ? 'Chapter 2' :
    pathname.startsWith('/read/chapter-3')                     ? 'Chapter 3' :
    pathname.startsWith('/read/chapter-4')                     ? 'Chapter 4' :
    pathname.startsWith('/read/chapter-5')                     ? 'Chapter 5' :
    pathname.startsWith('/read/chapter-6')                     ? 'Chapter 6' :
    pathname.startsWith('/read/chapter-7')                     ? 'Chapter 7' :
    pathname.startsWith('/read/effective-cpp')                 ? 'Effective C++' :
    pathname.startsWith('/read/competitive-programmers-handbook') ? 'CP Handbook' :
    pathname.startsWith('/read/aops-vol1')                     ? 'AoPS Vol. 1' :
    pathname.startsWith('/flashcards')                         ? 'Flashcards' :
    pathname.startsWith('/dashboard')                          ? 'Dashboard' :
    pathname.startsWith('/settings')                           ? 'Settings'  :
    title ?? '';

  return (
    <header
      className="lg:hidden sticky top-0 z-30 px-2 sm:px-4 h-14 flex items-center justify-between gap-2"
      style={{
        background: 'var(--material-thin-light)',
        backdropFilter: 'var(--material-blur)',
        WebkitBackdropFilter: 'var(--material-blur)',
        borderBottom: '0.5px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Left — menu + logo + crumb */}
      <div className="flex items-center gap-1 min-w-0 flex-1">
        {onOpenMenu && (
          <button
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="w-11 h-11 flex items-center justify-center rounded-full text-[#626975] hover:text-[#21242c] hover:bg-[#f0f1f3] transition-colors shrink-0"
          >
            <Menu size={20} />
          </button>
        )}
        <Link href="/" className="flex items-center gap-2 shrink-0 min-w-0">
          <div
            className="w-7 h-7 flex items-center justify-center shrink-0"
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
          <span
            className="text-sm font-semibold text-[#1d1d1f] tracking-tight truncate"
            title={crumb}
          >
            {crumb}
          </span>
        )}
      </div>

      {/* Right — due badge */}
      {dueCards.length > 0 && (
        <Link
          href="/flashcards"
          className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-full text-xs font-semibold transition-colors duration-200 shrink-0"
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
