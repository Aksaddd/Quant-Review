'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Layers, Menu, Settings, type LucideIcon } from 'lucide-react';
import { useProgress } from '@/components/providers/ProgressProvider';

interface MobileNavProps {
  onOpenMenu?: () => void;
}

type Tab =
  | { kind: 'link'; href: string; label: string; icon: LucideIcon }
  | { kind: 'action'; label: string; icon: LucideIcon; onClick: () => void };

/**
 * Bottom-bar nav for phones. Five thumb-zone targets:
 *  Dashboard · Read · Cards · Browse (drawer) · Settings
 *
 * The "Browse" tap opens the same full course tree the desktop sidebar shows,
 * so every chapter / item / section is one tap away even on a phone.
 */
export default function MobileNav({ onOpenMenu }: MobileNavProps) {
  const pathname = usePathname();
  const { dueCards } = useProgress();

  const tabs: Tab[] = [
    { kind: 'link',   href: '/dashboard',      label: 'Home',      icon: LayoutDashboard },
    { kind: 'link',   href: '/read/chapter-2', label: 'Read',      icon: BookOpen },
    { kind: 'link',   href: '/flashcards',     label: 'Cards',     icon: Layers },
    { kind: 'action', label: 'Browse',         icon: Menu,         onClick: () => onOpenMenu?.() },
    { kind: 'link',   href: '/settings',       label: 'Settings',  icon: Settings },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-30"
      style={{
        background: 'var(--material-thin-light)',
        backdropFilter: 'var(--material-blur)',
        WebkitBackdropFilter: 'var(--material-blur)',
        borderTop: '0.5px solid rgba(0,0,0,0.06)',
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
      }}
      aria-label="Primary"
    >
      <div className="flex items-stretch">
        {tabs.map((tab) => {
          const active =
            tab.kind === 'link' &&
            (pathname === tab.href || pathname.startsWith(tab.href + '/'));
          const hasBadge = tab.label === 'Cards' && dueCards.length > 0;
          const Icon = tab.icon;

          const inner = (
            <div
              className="flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px]"
              style={{
                color: active ? 'var(--eureka-accent)' : '#86868b',
                transition: 'color 180ms var(--ease-standard)',
              }}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
                {hasBadge && (
                  <span
                    className="absolute -top-1.5 -right-2 min-w-[16px] h-4 flex items-center justify-center rounded-full text-white text-[9px] font-semibold px-1"
                    style={{ background: 'var(--eureka-accent)' }}
                  >
                    {dueCards.length > 9 ? '9+' : dueCards.length}
                  </span>
                )}
              </div>
              <span
                className="text-[10px] font-semibold tracking-tight"
                style={{ color: active ? 'var(--eureka-accent)' : '#86868b' }}
              >
                {tab.label}
              </span>
            </div>
          );

          if (tab.kind === 'action') {
            return (
              <button
                key={tab.label}
                onClick={tab.onClick}
                aria-label={tab.label}
                className="flex-1 flex items-stretch active:opacity-60"
              >
                <div className="flex-1">{inner}</div>
              </button>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
              className="flex-1 flex items-stretch active:opacity-60"
            >
              <div className="flex-1">{inner}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
