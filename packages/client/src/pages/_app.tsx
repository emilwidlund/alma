import '~/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import { useState } from 'react';

import { apolloClient } from '~/apollo/apollo';
import { inter } from '~/styles/fonts';

export default function App({ Component, pageProps: { initialSession, ...pageProps } }: AppProps) {
    const [supabaseClient] = useState(() => createPagesBrowserClient());

    return (
        <>
            <style jsx global>
                {`
                    html {
                        font-family: ${inter.style.fontFamily};
                    }
                `}
            </style>
            <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
                <ApolloProvider client={apolloClient}>
                    <main>
                        <Component {...pageProps} />
                    </main>
                </ApolloProvider>
            </SessionContextProvider>
        </>
    );
}
