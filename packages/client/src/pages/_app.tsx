import '~/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { __DEV__ } from '@apollo/client/utilities/globals';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import { useState } from 'react';

import { apolloClient } from '~/apollo/apollo';

if (__DEV__) {
    // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
}

export default function App({ Component, pageProps: { initialSession, ...pageProps } }: AppProps) {
    const [supabaseClient] = useState(() => createPagesBrowserClient());

    return (
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
            <ApolloProvider client={apolloClient}>
                <main>
                    <Component {...pageProps} />
                </main>
            </ApolloProvider>
        </SessionContextProvider>
    );
}
