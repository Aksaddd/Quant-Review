import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import '@excalidraw/excalidraw/index.css';

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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f7' },
    { media: '(prefers-color-scheme: dark)',  color: '#1c1c1e' },
  ],
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
      <body className="eureka-active bg-[var(--surface-0)] text-[var(--text-primary)] antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--material-thin-light)',
              backdropFilter: 'var(--material-blur)',
              WebkitBackdropFilter: 'var(--material-blur)',
              color: 'var(--text-primary)',
              border: '0.5px solid rgba(0,0,0,0.08)',
              borderRadius: 'var(--radius-hud)',
              boxShadow: 'var(--shadow-hud)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-inter)',
            },
            success: {
              iconTheme: { primary: 'var(--eureka-accent)', secondary: 'transparent' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: 'transparent' },
            },
          }}
        />
      </body>
    </html>
  );
}
