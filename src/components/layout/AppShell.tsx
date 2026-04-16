'use client';

import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { AppTopBar } from './Navbar';
import { ProgressProvider } from '@/components/providers/ProgressProvider';
import { TextSettingsProvider } from '@/components/providers/TextSettingsProvider';
import XPToast from '@/components/gamification/XPToast';
import FieroOverlay from '@/components/gamification/FieroOverlay';
import SessionNudge from '@/components/gamification/SessionNudge';
import FocusModeToggle from '@/components/layout/FocusModeToggle';
import { useSessionStore } from '@/stores/useSessionStore';

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function AppShell({ children, pageTitle }: AppShellProps) {
  const focusModeActive = useSessionStore((s) => s.focusModeActive);

  return (
    <ProgressProvider>
      <TextSettingsProvider>
        <div className="flex h-screen overflow-hidden bg-[var(--surface-0)]">
          {/* Desktop sidebar — hidden in focus mode */}
          {!focusModeActive && <Sidebar />}

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Mobile top bar — hidden in focus mode */}
            {!focusModeActive && <AppTopBar title={pageTitle} />}

            <main className={`flex-1 overflow-y-auto h-full ${focusModeActive ? 'pb-6' : 'pb-20 lg:pb-6'}`}>
              {children}
            </main>
          </div>

          {/* Mobile bottom nav — hidden in focus mode */}
          {!focusModeActive && <MobileNav />}

          {/* Focus mode toggle — always visible */}
          <FocusModeToggle />

          {/* Gamification overlays */}
          <XPToast />
          <FieroOverlay />
          <SessionNudge />
        </div>
      </TextSettingsProvider>
    </ProgressProvider>
  );
}
