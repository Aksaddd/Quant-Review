import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'aops-vol1');

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ n: string }> },
) {
  const { n } = await params;
  const num = Number.parseInt(n, 10);
  if (!Number.isFinite(num) || num < 1 || num > 288) {
    return NextResponse.json({ error: 'invalid page' }, { status: 404 });
  }
  const file = path.join(CONTENT_DIR, `page-${String(num).padStart(3, '0')}.jpg`);
  try {
    const buf = fs.readFileSync(file);
    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
}
