'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

const SPRING = { type: 'spring' as const, stiffness: 380, damping: 32, mass: 0.9 };

/**
 * Modal — Apple translucent HUD.
 *
 * Dim backdrop at low opacity + subtle blur so the canvas shows through,
 * never black. Panel is SF-style material with backdrop-filter blur.
 * Spring entrance/exit. Outside-tap and Escape dismiss.
 */
export default function Modal({
  open,
  onClose,
  title,
  size = 'md',
  children,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop — dim + subtle blur, outside-tap dismisses */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0"
            style={{
              background: 'rgba(0,0,0,0.18)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            onClick={onClose}
          />

          {/* Panel — translucent HUD */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={SPRING}
            className={clsx('relative w-full overflow-hidden', sizeStyles[size], className)}
            style={{
              background: 'var(--material-regular-light)',
              backdropFilter: 'var(--material-blur-strong)',
              WebkitBackdropFilter: 'var(--material-blur-strong)',
              border: '0.5px solid rgba(0,0,0,0.06)',
              borderRadius: 20,
              boxShadow: 'var(--shadow-hud)',
              color: '#1d1d1f',
            }}
          >
            {title && (
              <div
                className="flex items-center justify-between px-6 pt-5 pb-4"
                style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}
              >
                <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>
                <CloseButton onClose={onClose} />
              </div>
            )}

            {!title && (
              <div className="absolute top-4 right-4 z-10">
                <CloseButton onClose={onClose} />
              </div>
            )}

            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      className="p-1.5 rounded-lg text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-200 ease-standard"
      style={{ background: 'transparent' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <X size={16} />
    </button>
  );
}
