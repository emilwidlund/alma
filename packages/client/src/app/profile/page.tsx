'use client';

import { SessionProvider, useSession } from 'next-auth/react';

import { Avatar } from '~/components/Avatar/Avatar';
import Header from '~/components/Header/Header';
import { Size } from '~/types';

function ProfileContainer() {
    const { data, status } = useSession();

    return (
        <main className="flex flex-col h-screen min-w-md max-w-6xl mx-auto">
            <Header />
            {status === 'authenticated' && data.user && (
                <section className="flex flex-col items-center text-center mt-12">
                    <Avatar size={Size.LG} source={data?.user.image || ''} />
                    <h1 className="text-3xl mt-8">{data?.user?.name}</h1>
                </section>
            )}
        </main>
    );
}

export default function Profile() {
    return (
        <SessionProvider>
            <ProfileContainer />
        </SessionProvider>
    );
}
