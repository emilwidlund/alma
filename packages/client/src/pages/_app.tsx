import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { inter } from '~/styles/fonts';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <main className={`${inter.className} font-sans`}>
                <Component {...pageProps} />
            </main>
        </SessionProvider>
    );
}
