'use client';

import { SessionProvider, useSession } from 'next-auth/react';

import { Avatar } from '~/components/Avatar/Avatar';
import { Button } from '~/components/Button/Button';
import { ProjectCard } from '~/components/Cards/ProjectCard/ProjectCard';
import Header from '~/components/Header/Header';
import { Size } from '~/types';

function ProfileContainer() {
    const { data, status } = useSession();

    return (
        <main className="flex flex-col h-screen min-w-md max-w-7xl mx-auto">
            <Header />

            {status === 'authenticated' && data.user && (
                <section className="flex flex-row items-start justify-between mt-8">
                    <div className="relative">
                        <div className="sticky flex flex-col items-center text-center bg-neutral-100 drop-shadow-xl px-8 pt-12 pb-8 rounded-4xl w-80">
                            <Avatar size={Size.MD} source={data?.user.image || ''} />
                            <h3 className="text-xl mt-8 font-medium">{data?.user?.name}</h3>
                            <span className="mt-2 text-sm opacity-50">Stockholm, Sweden</span>
                            <span className="mt-6 text-sm">Design Technologist · Code at EA</span>
                            <a className="mt-2 text-sm text-accent" href="https://emilwidlund.com">
                                https://emilwidlund.com
                            </a>
                            <Button className="w-full justify-center mt-12">Follow</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
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
                    </div>
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
