'use client';

import { useQuery } from '@apollo/client';
import { StreamOutlined, ShapeLineOutlined, TuneOutlined } from '@mui/icons-material';
import { Session } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { Project } from '@usealma/types';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import NextImage from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';

import PROJECT_QUERY from '~/apollo/queries/project.gql';
import { Avatar } from '~/components/Avatar/Avatar';
import { Banner } from '~/components/Banner/Banner';
import { FloatingTabBar } from '~/components/FloatingTabBar/FloatingTabBar';
import { PropertyPanel } from '~/components/PropertyPanel/PropertyPanel';
import { CircuitContainer } from '~/containers/CircuitContainer/CircuitContainer';
import { FragmentEditor } from '~/containers/FragmentEditor/FragmentEditor';
import { CircuitProvider } from '~/providers/CircuitProvider/CircuitProvider';
import { ModalProvider } from '~/providers/ModalProvider/ModalProvider';
import { ProjectProvider, useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';
import { Size } from '~/types';

export type EditorProps = { initialSession: Session; project: Project };

function EditorHeader() {
    const session = useSession();
    const { project } = useProjectContext();

    return (
        <header className="absolute top-0 right-0 left-0 flex flex-row items-center justify-between p-12 pb-0 z-10">
            <Link className="z-10" href="/">
                <NextImage src="/alma_outline.png" alt="logo" width={40} height={40} quality={100} />
            </Link>
            {project && (
                <div className="absolute w-full flex flex-col items-center mx-auto">
                    <h2 className="text-lg font-medium text-slate-400">{project.name}</h2>
                    <span className="text-sm mt-1 opacity-50 text-slate-500">
                        {project.private ? 'Private' : 'Public'}
                    </span>
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

function EditorContainer({
    username,
    projectId
}: {
    username: string | string[] | undefined;
    projectId: string | string[] | undefined;
}) {
    const circuitRef = useRef<HTMLDivElement>(null);
    const { circuits, activeLayer, compilationError } = useProjectContext();

    const shouldRenderCircuit = useMemo(() => activeLayer?.type === 'CIRCUIT', [activeLayer]);
    const shouldRenderEditor = useMemo(() => activeLayer?.type === 'FRAGMENT', [activeLayer]);

    const circuit = useMemo(() => {
        if (!activeLayer) return;

        return circuits?.get(activeLayer.id);
    }, [activeLayer, circuits]);

    const circuitContainerClassNames = clsx('absolute top-0 right-0 bottom-0 left-0 overflow-auto');
    const fragmentEditorContainerClassNames = clsx(
        'absolute top-48 right-32 bottom-32 left-56 rounded-3xl bg-neutral-700 drop-shadow-2xl overflow-hidden border-2 border-transparent',
        {
            'border-red-400': !!compilationError
        }
    );

    return (
        <CircuitProvider context={circuit}>
            <main className="flex flex-row h-screen">
                <div className="relative flex flex-col flex-grow">
                    <EditorHeader />
                    <div className="relative flex flex-row flex-grow items-center">
                        <aside className="fixed flex flex-col h-full items-center justify-start pl-12 z-30">
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
                                            icon: <ShapeLineOutlined />
                                        },
                                        {
                                            name: 'Settings',
                                            path: `/${username}/${projectId}/settings`,
                                            icon: <TuneOutlined />
                                        }
                                    ]}
                                />
                            </div>
                        </aside>
                        <main className="relative flex flex-col items-center justify-center grow w-full h-full overflow-auto">
                            {shouldRenderCircuit && (
                                <div className={circuitContainerClassNames}>
                                    <CircuitContainer ref={circuitRef} />
                                </div>
                            )}
                            {shouldRenderEditor && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={fragmentEditorContainerClassNames}
                                >
                                    <FragmentEditor />
                                </motion.div>
                            )}
                            {compilationError && (
                                <div className="fixed bottom-8 mx-auto">
                                    <Banner text={compilationError} />
                                </div>
                            )}
                        </main>
                    </div>
                </div>
                <PropertyPanel />
            </main>
        </CircuitProvider>
    );
}

export default function Editor() {
    const {
        query: { username, projectId }
    } = useRouter();

    const results = useQuery(PROJECT_QUERY, { variables: { id: projectId } });

    return (
        results.data?.project && (
            <ProjectProvider project={results.data.project}>
                <ModalProvider>
                    <EditorContainer username={username} projectId={projectId} />
                </ModalProvider>
            </ProjectProvider>
        )
    );
}
