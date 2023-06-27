import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import { inter } from '~/styles/fonts';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const [supabaseClient] = useState(() => createPagesBrowserClient());

    return (
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <main className={`${inter.className} font-sans`}>
                <Component {...pageProps} />
            </main>
        </SessionContextProvider>
    );
}
