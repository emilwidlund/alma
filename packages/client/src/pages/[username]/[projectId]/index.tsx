'use client';

import { MemoryOutlined, StreamOutlined, SettingsOutlined } from '@mui/icons-material';
import { Session } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { Project } from '@usealma/types';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { Avatar } from '~/components/Avatar/Avatar';
import { Banner } from '~/components/Banner/Banner';
import { FloatingTabBar } from '~/components/FloatingTabBar/FloatingTabBar';
import { useRenderer } from '~/hooks/useRenderer/useRenderer';
import { ProjectProvider, useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';
import { Size } from '~/types';

export type EditorProps = { initialSession: Session; project: Project };

function EditorHeader() {
    const session = useSession();
    const { project } = useProjectContext();

    return (
        <header className="relative flex flex-row items-center justify-between p-12 pb-0">
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

function PreviewContainer() {
    const previewRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { project, activeLayer, handleCompilationError, compilationError, handleCompilationSuccess } =
        useProjectContext();

    useRenderer(
        canvasRef,
        project
            ? [...project.layers.slice(undefined, project.layers.findIndex(layer => layer.id === activeLayer?.id) + 1)]
            : [],
        handleCompilationError,
        handleCompilationSuccess
    );

    useEffect(() => {
        if (previewRef.current && canvasRef.current) {
            const { width, height } = previewRef.current.getBoundingClientRect();
            canvasRef.current.width = width;
            canvasRef.current.height = height;
        }
    }, []);

    const mainContainerClassNames = clsx('rounded-3xl bg-neutral-100 drop-shadow-2xl overflow-hidden border-2 mx-40', {
        'border-none': !compilationError,
        'border-red-400': !!compilationError
    });

    return (
        <main className="relative flex flex-col items-center justify-center grow w-full h-full">
            <div ref={previewRef} className={mainContainerClassNames}>
                <canvas ref={canvasRef} className="rounded-2xl bg-neutral-300" width={1280} height={720} />
            </div>
            {compilationError && (
                <div className="fixed bottom-8 mx-auto">
                    <Banner text={compilationError} />
                </div>
            )}
        </main>
    );
}

export default function Preview() {
    const {
        query: { username, projectId }
    } = useRouter();

    return (
        <ProjectProvider projectId={projectId as string}>
            <main className="flex flex-row h-screen">
                <div className="flex flex-col flex-grow">
                    <EditorHeader />
                    <div className="flex flex-row flex-grow items-center">
                        <aside className="flex flex-col h-full items-center justify-start pl-12">
                            <div className="my-auto">
                                <FloatingTabBar
                                    items={[
                                        {
                                            name: 'Preview',
                                            path: `/${username}/${projectId}`,
                                            icon: <StreamOutlined />
                                        },
                                        {
                                            name: 'Edit',
                                            path: `/${username}/${projectId}/edit`,
                                            icon: <MemoryOutlined />
                                        },
                                        {
                                            name: 'Settings',
                                            path: `/${username}/${projectId}/settings`,
                                            icon: <SettingsOutlined />
                                        }
                                    ]}
                                />
                            </div>
                        </aside>
                        <PreviewContainer />
                    </div>
                </div>
            </main>
        </ProjectProvider>
    );
}
