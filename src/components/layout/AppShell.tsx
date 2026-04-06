import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { AppTopBar } from './Navbar';
import { ProgressProvider } from '@/components/providers/ProgressProvider';
import { TextSettingsProvider } from '@/components/providers/TextSettingsProvider';

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function AppShell({ children, pageTitle }: AppShellProps) {
  return (
    <ProgressProvider>
      <TextSettingsProvider>
        <div className="flex h-screen overflow-hidden bg-[var(--surface-0)]">
          {/* Desktop sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Mobile top bar */}
            <AppTopBar title={pageTitle} />

            <main className="flex-1 overflow-y-auto pb-20 lg:pb-6 h-full">
              {children}
            </main>
          </div>

          {/* Mobile bottom nav */}
          <MobileNav />
        </div>
      </TextSettingsProvider>
    </ProgressProvider>
  );
}
