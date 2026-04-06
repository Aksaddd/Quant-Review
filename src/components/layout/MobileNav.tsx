'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Layers } from 'lucide-react';
import { clsx } from 'clsx';
import { useProgress } from '@/components/providers/ProgressProvider';

const TABS = [
  { href: '/dashboard',      label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/read/chapter-2', label: 'Read',        icon: BookOpen        },
  { href: '/flashcards',     label: 'Flashcards',  icon: Layers          },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { dueCards } = useProgress();

  return (
    <nav className="
      lg:hidden fixed bottom-0 inset-x-0 z-30
      border-t border-[var(--surface-border)]
      bg-[var(--surface-1)]/95 backdrop-blur-xl
      safe-area-inset-bottom
    ">
      <div className="flex items-stretch">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          const hasBadge = label === 'Flashcards' && dueCards.length > 0;

          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-2',
                'transition-colors',
                active
                  ? 'text-brand-400'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              )}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={active ? 2.2 : 1.7} />
                {hasBadge && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 flex items-center justify-center rounded-full bg-brand-500 text-black text-[9px] font-bold">
                    {dueCards.length > 9 ? '9+' : dueCards.length}
                  </span>
                )}
              </div>
              <span className={clsx('text-[10px] font-medium', active && 'text-brand-400')}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
