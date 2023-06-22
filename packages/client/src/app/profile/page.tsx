'use client';

import { SessionProvider, useSession } from 'next-auth/react';

import { Avatar } from '~/components/Avatar/Avatar';
import { ProjectCard } from '~/components/Cards/ProjectCard/ProjectCard';
import Header from '~/components/Header/Header';
import { Size } from '~/types';

function ProfileContainer() {
    const { data, status } = useSession();

    return (
        <main className="flex flex-col h-screen min-w-md max-w-6xl mx-auto">
            <Header />

            {status === 'authenticated' && data.user && (
                <>
                    <section className="flex flex-col items-center text-center mt-12">
                        <Avatar size={Size.LG} source={data?.user.image || ''} />
                        <h1 className="text-3xl mt-8">{data?.user?.name}</h1>
                    </section>
                    <section className="grid grid-cols-3 mt-24">
                        <ProjectCard
                            name="Test"
                            projectId="123"
                            author={{ username: 'emilwidlund', image: '' }}
                            preview="https://pbs.twimg.com/profile_images/1663109022411522049/drU-8nEM_400x400.jpg"
                            layers={[]}
                        />
                        <ProjectCard
                            name="Test"
                            projectId="123"
                            author={{ username: 'emilwidlund', image: '' }}
                            preview="https://pbs.twimg.com/profile_images/1663109022411522049/drU-8nEM_400x400.jpg"
                            layers={[]}
                        />
                        <ProjectCard
                            name="Test"
                            projectId="123"
                            author={{ username: 'emilwidlund', image: '' }}
                            preview="https://pbs.twimg.com/profile_images/1663109022411522049/drU-8nEM_400x400.jpg"
                            layers={[
                                {
                                    id: '123',
                                    name: 'Test',
                                    context: `void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = vUv;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));

    // Output to screen
    fragColor = vec4(col, 1.0);
}`,
                                    enabled: true,
                                    blendingMode: 'NORMAL'
                                }
                            ]}
                        />
                    </section>
                </>
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
