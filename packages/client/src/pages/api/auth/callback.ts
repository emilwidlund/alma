import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { Database } from '@/lib/database.types';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const requestUrl = new URL(req.url || '');
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const supabase = createPagesServerClient<Database>({ req, res });
        await supabase.auth.exchangeCodeForSession(code);
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin);
}
