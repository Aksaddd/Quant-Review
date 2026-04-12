import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

/* ── Fonts ──────────────────────────────────────────────────────────────── */
/* System font stack — zero network fetch, works offline / on restricted
   networks (school, corporate, VPN). macOS renders with SF Pro / SF Mono
   automatically. The CSS variables --font-inter / --font-lora / --font-mono
   are declared in globals.css so the existing Tailwind + component styles
   keep working unchanged. */
export const metadata: Metadata = {
  title: {
    default: 'Quant Review — Master the Interview',
    template: '%s · Quant Review',
  },
  description:
    'Every problem from Xinfeng Zhou\'s definitive guide — interactive, tracked, and spaced. Built for quant finance interview success.',
  keywords: [
    'quantitative finance',
    'interview prep',
    'brain teasers',
    'spaced repetition',
    'quant interviews',
    'flashcards',
  ],
  authors: [{ name: 'Quant Review' }],
  openGraph: {
    type: 'website',
    title: 'Quant Review — Master the Interview',
    description: 'Interactive study platform for quantitative finance interviews.',
    siteName: 'Quant Review',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#06060f',
};

/* ── Layout ─────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="bg-[var(--surface-0)] text-[var(--text-primary)] antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--surface-3)',
              color: 'var(--text-primary)',
              border: '1px solid var(--surface-border-strong)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-inter)',
            },
            success: {
              iconTheme: { primary: '#10b981', secondary: 'var(--surface-3)' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: 'var(--surface-3)' },
            },
          }}
        />
      </body>
    </html>
  );
}
