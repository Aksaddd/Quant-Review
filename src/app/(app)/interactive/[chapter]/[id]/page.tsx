import { notFound } from 'next/navigation';

import { getInteractiveDoc, listInteractiveContent } from '@/lib/interactive/loader';
import InteractivePlayer from '@/components/interactive/InteractivePlayer';

interface PageProps {
  params: Promise<{ chapter: string; id: string }>;
}

export function generateStaticParams() {
  return listInteractiveContent().map((doc) => ({
    chapter: `ch${String(doc.chapter).padStart(2, '0')}`,
    id: doc.id,
  }));
}

export default async function InteractiveDocPage({ params }: PageProps) {
  const { id } = await params;
  const doc = getInteractiveDoc(id);
  if (!doc || doc.kind === 'technique') notFound();
  return <InteractivePlayer doc={doc} />;
}
