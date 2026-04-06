'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Layers } from 'lucide-react';
import { clsx } from 'clsx';
import { useProgress } from '@/components/providers/ProgressProvider';

const TABS = [
  { href: '/dashboard',      label: 'Dashboard', icon: LayoutDashboard },
  { href: '/read/chapter-2', label: 'Read',       icon: BookOpen        },
  { href: '/flashcards',     label: 'Practice',   icon: Layers          },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { dueCards } = useProgress();

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-[#e4e6ea]">
      <div className="flex items-stretch">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          const hasBadge = label === 'Practice' && dueCards.length > 0;

          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors',
                active ? 'text-[var(--ka-blue)]' : 'text-[#9299a5] hover:text-[#626975]'
              )}
            >
              <div className="relative">
                <Icon size={21} strokeWidth={active ? 2.5 : 1.8} />
                {hasBadge && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-[var(--ka-blue)] text-white text-[9px] font-bold px-1">
                    {dueCards.length > 9 ? '9+' : dueCards.length}
                  </span>
                )}
              </div>
              <span className={clsx('text-[10px] font-semibold', active ? 'text-[var(--ka-blue)]' : 'text-[#9299a5]')}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
