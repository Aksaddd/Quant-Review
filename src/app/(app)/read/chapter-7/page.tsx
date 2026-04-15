'use client';

import ChapterReader from '@/components/reader/ChapterReader';
import { chapter7 } from '@/data/chapters';

export default function Chapter7Page() {
  return (
    <ChapterReader chapter={chapter7} />
  );
}
