'use client';

import { SessionProvider } from 'next-auth/react';

import Header from '~/components/Header/Header';

function IndexContainer() {
    return (
        <main className="flex flex-col h-screen min-w-md max-w-7xl mx-auto">
            <Header />
        </main>
    );
}

export default function Index() {
    return (
        <SessionProvider>
            <IndexContainer />
        </SessionProvider>
    );
}
