'use client';

import { useParams } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

import Header from '~/components/Header/Header';

function UserProfileContainer() {
    const params = useParams();

    return (
        <main className="flex flex-col h-screen min-w-md max-w-6xl mx-auto">
            <Header />
            <section>
                <h1>{params?.username}</h1>
            </section>
        </main>
    );
}

export default function UserProfile() {
    return (
        <SessionProvider>
            <UserProfileContainer />
        </SessionProvider>
    );
}
