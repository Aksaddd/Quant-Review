import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import SectionPreview from '@/components/landing/SectionPreview';
import CTA from '@/components/landing/CTA';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-0)]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SectionPreview />
        <CTA />
      </main>
      <footer className="border-t border-[var(--surface-border)] py-8 px-4 text-center text-xs text-[var(--text-muted)]">
        <p>
          Content based on{' '}
          <em>A Practical Guide to Quantitative Finance Interviews</em> by
          Xinfeng Zhou.
        </p>
        <p className="mt-1">© {new Date().getFullYear()} Quant Review. All rights reserved.</p>
      </footer>
    </div>
  );
}
