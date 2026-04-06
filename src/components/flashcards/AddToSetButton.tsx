'use client';

import { useState, useRef, useEffect } from 'react';
import { Plus, Check, FolderPlus, X } from 'lucide-react';
import type { CustomSet } from '@/lib/types';

interface Props {
  cardId: string;
  sets: CustomSet[];
  isCardInSet: (setId: string, cardId: string) => boolean;
  onAddToSet: (setId: string, cardId: string) => void;
  onRemoveFromSet: (setId: string, cardId: string) => void;
  onCreateSet: (title: string, cardId: string) => void;
  align?: 'left' | 'right' | 'center';
}

export default function AddToSetButton({
  cardId, sets, isCardInSet, onAddToSet, onRemoveFromSet, onCreateSet, align = 'right',
}: Props) {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setCreating(false);
        setTitle('');
      }
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  useEffect(() => {
    if (creating) inputRef.current?.focus();
  }, [creating]);

  function handleCreate() {
    if (!title.trim()) return;
    onCreateSet(title.trim(), cardId);
    setTitle('');
    setCreating(false);
    setOpen(false);
  }

  // How many sets already contain this card
  const inCount = sets.filter((s) => isCardInSet(s.id, cardId)).length;

  const dropdownPos: React.CSSProperties =
    align === 'left'  ? { left: 0 } :
    align === 'right' ? { right: 0 } :
    { left: '50%', transform: 'translateX(-50%)' };

  return (
    <div ref={containerRef} className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-semibold transition-colors ${
          inCount > 0
            ? 'border-[var(--ka-blue)] text-[var(--ka-blue)] bg-[#e8f0fe]'
            : 'border-[#e4e6ea] text-[#626975] hover:border-[var(--ka-blue)] hover:text-[var(--ka-blue)]'
        }`}
        title="Add to set"
      >
        <Plus size={10} />
        {inCount > 0 ? `In ${inCount} set${inCount > 1 ? 's' : ''}` : 'Add to set'}
      </button>

      {open && (
        <div
          style={{ ...dropdownPos, bottom: 'calc(100% + 4px)', minWidth: 210 }}
          className="absolute bg-white border border-[#e4e6ea] rounded-lg shadow-lg z-30 overflow-hidden"
        >
          {sets.length > 0 && (
            <div className="max-h-48 overflow-y-auto border-b border-[#e4e6ea]">
              {sets.map((s) => {
                const inSet = isCardInSet(s.id, cardId);
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      inSet ? onRemoveFromSet(s.id, cardId) : onAddToSet(s.id, cardId);
                      setOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#f7f8fa] transition-colors text-left"
                  >
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                      inSet ? 'bg-[var(--ka-blue)] border-[var(--ka-blue)]' : 'border-[#c8ccd4]'
                    }`}>
                      {inSet && <Check size={9} className="text-white" strokeWidth={3} />}
                    </span>
                    <span className="flex-1 text-sm truncate text-[#21242c]">{s.title}</span>
                    <span className="text-[10px] text-[#9299a5] shrink-0">{s.cardIds.length}</span>
                  </button>
                );
              })}
            </div>
          )}

          {!creating ? (
            <button
              onClick={() => setCreating(true)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--ka-blue)] hover:bg-[#f7f8fa] transition-colors"
            >
              <FolderPlus size={13} /> New set…
            </button>
          ) : (
            <div className="p-2 flex gap-1.5 items-center">
              <input
                ref={inputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreate();
                  if (e.key === 'Escape') { setCreating(false); setTitle(''); }
                }}
                placeholder="Set name…"
                className="flex-1 text-xs border border-[#c8ccd4] rounded px-2 py-1.5 outline-none focus:border-[var(--ka-blue)]"
              />
              <button
                onClick={handleCreate}
                className="p-1.5 rounded bg-[var(--ka-blue)] text-white hover:bg-[var(--ka-blue-dark)] transition-colors"
              >
                <Check size={11} />
              </button>
              <button
                onClick={() => { setCreating(false); setTitle(''); }}
                className="p-1.5 rounded border border-[#e4e6ea] text-[#9299a5] hover:text-[#626975] transition-colors"
              >
                <X size={11} />
              </button>
            </div>
          )}

          {sets.length === 0 && !creating && (
            <p className="px-3 py-2 text-xs text-[#9299a5]">No sets yet — create your first!</p>
          )}
        </div>
      )}
    </div>
  );
}
