'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SidebarNav from './SidebarNav';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Slide-in left drawer for mobile/tablet — hosts the full course tree
 * (the same SidebarNav used on desktop). Tap-outside closes; Escape
 * closes; body scroll is locked while open.
 */
export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  // Lock body scroll while open + close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            key="drawer-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
            style={{ background: 'rgba(0,0,0,0.4)' }}
            onClick={onClose}
            aria-hidden
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer-panel"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36, mass: 0.9 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed top-0 bottom-0 left-0 z-50 lg:hidden flex flex-col w-[86vw] max-w-[320px]"
            style={{
              background: '#ffffff',
              borderRight: '0.5px solid rgba(0,0,0,0.06)',
              boxShadow: '8px 0 32px -12px rgba(0,0,0,0.25)',
              paddingTop: 'env(safe-area-inset-top, 0)',
              paddingBottom: 'env(safe-area-inset-bottom, 0)',
            }}
          >
            {/* Drawer header — brand + close */}
            <div
              className="px-4 py-3 flex items-center justify-between shrink-0"
              style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}
            >
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5 group">
                <div
                  className="w-8 h-8 flex items-center justify-center"
                  style={{
                    borderRadius: 10,
                    background: 'var(--eureka-accent)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                  }}
                >
                  <span className="text-white font-semibold text-sm tracking-tight">Q</span>
                </div>
                <div>
                  <p className="font-semibold text-[14px] text-[#1d1d1f] leading-tight tracking-tight">Quant Review</p>
                  <p className="text-[10px] text-[#86868b]">Zhou&apos;s Guide</p>
                </div>
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-11 h-11 -mr-2 flex items-center justify-center rounded-full text-[#626975] hover:text-[#21242c] hover:bg-[#f0f1f3] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav body — same component as desktop */}
            <div className="flex-1 overflow-hidden">
              <SidebarNav onNavigate={onClose} hideBrand />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
