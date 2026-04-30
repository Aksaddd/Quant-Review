'use client';

import ChapterReader from '@/components/reader/ChapterReader';
import { chapter5 } from '@/data/chapters';

export default function Chapter5Page() {
  return (
    <ChapterReader
      chapter={chapter5}
      prevChapter={{ number: 4, title: 'Probability Theory', href: '/read/chapter-4' }}
      nextChapter={{ number: 6, title: 'Finance', href: '/read/chapter-6' }}
    />
  );
}
