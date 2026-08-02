import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace(/^Bearer\s+/i, '');

    const expectedToken = process.env.HACKX_REVALIDATION_TOKEN || process.env.REVALIDATION_SECRET;

    if (!expectedToken || token !== expectedToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    (revalidateTag as any)('hackx-team');
    revalidatePath('/team', 'page');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: (err as Error).message },
      { status: 500 }
    );
  }
}
