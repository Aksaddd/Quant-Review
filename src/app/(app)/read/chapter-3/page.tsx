'use client';

import ChapterReader from '@/components/reader/ChapterReader';
import { chapter3 } from '@/data/chapters';

export default function Chapter3Page() {
  return (
    <ChapterReader
      chapter={chapter3}
      nextChapter={{ number: 4, title: 'Probability Theory', href: '/read/chapter-4' }}
    />
  );
}
