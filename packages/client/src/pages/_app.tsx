import '~/styles/globals.css';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import { useState } from 'react';

import { inter } from '~/styles/fonts';

export default function App({ Component, pageProps: { initialSession, ...pageProps } }: AppProps) {
    const [supabaseClient] = useState(() => createPagesBrowserClient());

    return (
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
            <main className={`${inter.className} font-sans`}>
                <Component {...pageProps} />
            </main>
        </SessionContextProvider>
    );
}
