'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Layers } from 'lucide-react';
import { useProgress } from '@/components/providers/ProgressProvider';

const TABS = [
  { href: '/dashboard',      label: 'Dashboard', icon: LayoutDashboard },
  { href: '/read/chapter-2', label: 'Read',       icon: BookOpen        },
  { href: '/flashcards',     label: 'Flashcards', icon: Layers          },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { dueCards } = useProgress();

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
    >
      <div className="flex items-stretch">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          const hasBadge = label === 'Flashcards' && dueCards.length > 0;

          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5"
              style={{
                color: active ? 'var(--eureka-accent)' : '#86868b',
                transition: 'color 180ms var(--ease-standard)',
              }}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
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
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
