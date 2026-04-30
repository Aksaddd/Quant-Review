'use client';

import ChapterReader from '@/components/reader/ChapterReader';
import { chapter4 } from '@/data/chapters';

export default function Chapter4Page() {
  return (
    <ChapterReader
      chapter={chapter4}
      prevChapter={{ number: 3, title: 'Calculus and Linear Algebra', href: '/read/chapter-3' }}
      nextChapter={{ number: 5, title: 'Stochastic Processes and Stochastic Calculus', href: '/read/chapter-5' }}
    />
  );
}
