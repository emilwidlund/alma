'use client';

import { useSession } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar } from '~/components/Avatar/Avatar';
import { PropertyPanel } from '~/components/PropertyPanel/PropertyPanel';
import { ProjectTabsContainer } from '~/containers/ProjectTabsContainer/ProjectTabsContainer';
import { ProjectProvider, useProject } from '~/providers/ProjectProvider/ProjectProvider';
import { Size } from '~/types';

function ProjectHeader() {
    const session = useSession();
    const { project } = useProject();

    return (
        <header className="fixed flex flex-row items-center justify-between p-12 pb-0 w-full">
            <Link className="z-10" href="/">
                <Image src="/alma_outline.png" alt="logo" width={40} height={40} quality={100} />
            </Link>
            {project && (
                <div className="absolute w-full flex flex-col items-center mx-auto">
                    <h2 className="text-lg font-medium">{project.name}</h2>
                    <span className="text-sm mt-1 opacity-50">{project.private ? 'Private' : 'Public'}</span>
                </div>
            )}
            {session && (
                <div className="z-10">
                    <Link href="/profile">
                        <Avatar size={Size.SM} source={session.user.user_metadata.picture} />
                    </Link>
                </div>
            )}
        </header>
    );
}

export default function Settings() {
    return (
        <ProjectProvider>
            <div className="flex flex-row h-screen">
                <ProjectHeader />
                <ProjectTabsContainer />
                <PropertyPanel />
            </div>
        </ProjectProvider>
    );
}
