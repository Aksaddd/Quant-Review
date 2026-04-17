'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { AppTopBar } from './Navbar';
import { ProgressProvider } from '@/components/providers/ProgressProvider';
import ReadingSettingsSync from '@/components/providers/ReadingSettingsSync';
import XPToast from '@/components/gamification/XPToast';
import FieroOverlay from '@/components/gamification/FieroOverlay';
import SessionNudge from '@/components/gamification/SessionNudge';
import FocusModeToggle from '@/components/layout/FocusModeToggle';
import { useSessionStore } from '@/stores/useSessionStore';
import { useIdleChrome } from '@/hooks/useIdleChrome';

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const CHROME_SPRING = { type: 'spring' as const, stiffness: 380, damping: 32, mass: 0.9 };

export default function AppShell({ children, pageTitle }: AppShellProps) {
  const focusModeActive = useSessionStore((s) => s.focusModeActive);
  const { visible: chromeVisible } = useIdleChrome();

  // Chrome is shown when: focus mode off AND (auto-hide off OR user active)
  const showChrome = !focusModeActive && chromeVisible;

  return (
    <ProgressProvider>
      <ReadingSettingsSync />
      <div className="eureka-active flex h-screen overflow-hidden bg-[var(--surface-0)]">
        {/* Desktop sidebar — fades on idle / focus */}
        <AnimatePresence>
          {showChrome && (
            <motion.div
              key="sidebar"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16, pointerEvents: 'none' }}
              transition={CHROME_SPRING}
              className="contents"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile top bar */}
          <AnimatePresence>
            {showChrome && (
              <motion.div
                key="topbar"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, pointerEvents: 'none' }}
                transition={CHROME_SPRING}
              >
                <AppTopBar title={pageTitle} />
              </motion.div>
            )}
          </AnimatePresence>

          <main className={`flex-1 overflow-y-auto h-full ${focusModeActive ? 'pb-6' : 'pb-20 lg:pb-6'}`}>
            {children}
          </main>
        </div>

        {/* Mobile bottom nav */}
        <AnimatePresence>
          {showChrome && (
            <motion.div
              key="mobilenav"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12, pointerEvents: 'none' }}
              transition={CHROME_SPRING}
            >
              <MobileNav />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Focus mode toggle — always visible */}
        <FocusModeToggle />

        {/* Gamification overlays */}
        <XPToast />
        <FieroOverlay />
        <SessionNudge />
      </div>
    </ProgressProvider>
  );
}
