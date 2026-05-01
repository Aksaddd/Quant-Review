import { notFound } from 'next/navigation';

import { getInteractiveDoc, listInteractiveDocs } from '@/lib/interactive/loader';
import InteractivePlayer from '@/components/interactive/InteractivePlayer';

interface PageProps {
  params: Promise<{ chapter: string; id: string }>;
}

export function generateStaticParams() {
  return listInteractiveDocs().map((doc) => ({
    chapter: `ch${String(doc.chapter).padStart(2, '0')}`,
    id: doc.id,
  }));
}

export default async function InteractiveDocPage({ params }: PageProps) {
  const { id } = await params;
  const doc = getInteractiveDoc(id);
  if (!doc) notFound();
  return <InteractivePlayer doc={doc} />;
}
