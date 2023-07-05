import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { Database } from '@/lib/database.types';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const supabase = createMiddlewareClient<Database>({ req, res });
    await supabase.auth.getSession();
    return res;
}
