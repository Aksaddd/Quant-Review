import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import SectionPreview from '@/components/landing/SectionPreview';
import CTA from '@/components/landing/CTA';

export default function LandingPage() {
  return (
    <div
      className="eureka-active min-h-screen"
      style={{ background: '#ffffff' }}
    >
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SectionPreview />
        <CTA />
      </main>
      <footer
        className="py-8 px-4 text-center text-[11px] text-[#86868b]"
        style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
      >
        <p className="tracking-tight">
          Content based on{' '}
          <em>A Practical Guide to Quantitative Finance Interviews</em> by
          Xinfeng Zhou.
        </p>
        <p className="mt-1 tabular-nums">© {new Date().getFullYear()} Quant Review. All rights reserved.</p>
      </footer>
    </div>
  );
}
