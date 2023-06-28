import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { Database } from '@/lib/database.types';

export async function GET(req: NextRequest, res: NextResponse) {
    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const supabase = createPagesServerClient<Database>({ req, res });
        await supabase.auth.exchangeCodeForSession(code);
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin);
}
