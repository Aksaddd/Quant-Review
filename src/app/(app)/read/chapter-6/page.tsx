'use client';

import ChapterReader from '@/components/reader/ChapterReader';
import { chapter6 } from '@/data/chapters';

export default function Chapter6Page() {
  return (
    <ChapterReader
      chapter={chapter6}
      prevChapter={{ number: 5, title: 'Stochastic Processes and Stochastic Calculus', href: '/read/chapter-5' }}
      nextChapter={{ number: 7, title: 'Algorithms and Numerical Methods', href: '/read/chapter-7' }}
    />
  );
}
