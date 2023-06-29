'use client';

import { FullscreenOutlined, MemoryOutlined, StreamOutlined } from '@mui/icons-material';
import { Session } from '@supabase/auth-helpers-nextjs';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Banner } from '~/components/Banner/Banner';
import { CodeEditor } from '~/components/CodeEditor/CodeEditor';
import { FloatingTabBar } from '~/components/FloatingTabBar/FloatingTabBar';
import { PropertyPanel } from '~/components/PropertyPanel/PropertyPanel';
import { ProjectSchema } from '~/models/Project/Project';
import { Project } from '~/models/Project/Project.types';

export type EditorProps = { initialSession: Session; project: Project };
export type EditorHeaderProps = { project: Project };

function EditorHeader({ project }: EditorHeaderProps) {
    return (
        <header className="relative flex flex-row items-center justify-between p-12 pb-0">
            <Link className="z-10" href="/">
                <Image src="/alma_outline.png" alt="logo" width={40} height={40} quality={100} />
            </Link>
            <div className="absolute w-full flex flex-col items-center mx-auto">
                <h2 className="text-lg font-medium">My Gradient Project</h2>
                <span className="text-sm mt-1 opacity-50">{project.private ? 'Private' : 'Public'}</span>
            </div>
            <div className="z-10"></div>
        </header>
    );
}

export default function Editor() {
    const [project, setProject] = useState<Project>();
    const [activeLayerIndex, setActiveLayerIndex] = useState(0);
    const [fragmentSource, setFragmentSource] = useState<string>();
    const [compilationError, setCompilationError] = useState<string | undefined>();

    const {
        query: { projectId }
    } = useRouter();

    useEffect(() => {
        if (project) {
            setFragmentSource(project.layers[0].context);
        }
    }, [project]);

    useEffect(() => {
        if (projectId) {
            fetch(`/api/project/${projectId}`)
                .then(v => v.json())
                .then(project => (ProjectSchema.parse(project) ? setProject(project) : undefined));
        }
    }, [projectId]);

    const mainContainerClassNames = clsx(
        'absolute top-32 right-32 bottom-32 left-32 rounded-3xl bg-neutral-100 drop-shadow-2xl overflow-hidden border-2',
        {
            'border-red-400': !!compilationError
        }
    );

    if (!project || fragmentSource === undefined) {
        return null;
    }

    return (
        <main className="flex flex-row h-screen">
            <div className="flex flex-col flex-grow">
                <EditorHeader project={project} />
                <div className="flex flex-row flex-grow items-center">
                    <aside className="flex flex-col h-full items-center justify-start pl-12">
                        <div className="my-auto">
                            <FloatingTabBar
                                items={[
                                    { name: 'Edit', path: '/', icon: <MemoryOutlined /> },
                                    { name: 'Preview', path: '/preview', icon: <StreamOutlined /> },
                                    { name: 'Settings', path: '/settings', icon: <FullscreenOutlined /> }
                                ]}
                            />
                        </div>
                    </aside>
                    <main className="relative flex flex-col items-center justify-center grow w-full h-full">
                        <div className={mainContainerClassNames}>
                            <CodeEditor
                                value={fragmentSource}
                                onChange={value => {
                                    if (compilationError) {
                                        setCompilationError(undefined);
                                    }

                                    setFragmentSource(value || '');
                                }}
                            />
                        </div>
                        {compilationError && (
                            <div className="fixed bottom-8 mx-auto">
                                <Banner text={compilationError} />
                            </div>
                        )}
                    </main>
                </div>
            </div>
            <PropertyPanel
                project={project}
                activeLayerIndex={activeLayerIndex}
                setActiveLayerIndex={setActiveLayerIndex}
                fragmentSource={fragmentSource}
                onFragmentCompilationError={() => {
                    setCompilationError('Fragment compilation failed.');
                }}
            />
        </main>
    );
}
