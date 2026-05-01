import { notFound } from 'next/navigation';

import { getTechnique, listTechniques } from '@/lib/interactive/loader';
import TechniquePage from '@/components/interactive/TechniquePage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return listTechniques().map((t) => ({ id: t.id }));
}

export default async function TechniqueDetailPage({ params }: PageProps) {
  const { id } = await params;
  const technique = getTechnique(id);
  if (!technique) notFound();
  return <TechniquePage technique={technique} />;
}
