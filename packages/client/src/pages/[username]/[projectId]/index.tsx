import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { PrismaClient } from '@prisma/client';
import { ProjectSchema } from '~/models/Project/Project';
import { OwnerSchema } from '~/models/Profile/Profile';
import { LayerSchema } from '@/../types/build';
import { EditorHeaderProps, EditorProps } from './index.types';

import { FullscreenOutlined, MemoryOutlined, StreamOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Avatar } from '~/components/Avatar/Avatar';
import { Banner } from '~/components/Banner/Banner';
import { CodeEditor } from '~/components/CodeEditor/CodeEditor';
import { FloatingTabBar } from '~/components/FloatingTabBar/FloatingTabBar';
import { PropertyPanel } from '~/components/PropertyPanel/PropertyPanel';

export const getServerSideProps: GetServerSideProps<EditorProps> = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createPagesServerClient(ctx);
    // Check if we have a session
    const {
        data: { session }
    } = await supabase.auth.getSession();

    const projectId =
        typeof ctx.params === 'object' && typeof ctx.params['projectId'] === 'string'
            ? ctx.params['projectId']
            : undefined;

    const prisma = new PrismaClient();
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { owner: true, layers: true }
    });

    if (!session || !project) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    return {
        props: {
            initialSession: session,
            project: ProjectSchema.parse({
                id: project.id,
                private: project.private,
                name: project.name,
                image: project.image,
                owner: OwnerSchema.parse({
                    ...project.owner,
                    createdAt: project.owner.createdAt.toJSON(),
                    updatedAt: project.owner.updatedAt.toJSON()
                }),
                layers: project.layers.map(layer =>
                    LayerSchema.parse({
                        id: layer.id,
                        name: layer.name,
                        type: layer.type,
                        context: layer.type === 'CIRCUIT' ? JSON.stringify(layer.circuit) : layer.fragment,
                        enabled: layer.enabled,
                        blendingMode: layer.blendingMode
                    })
                ),
                createdAt: project.createdAt.toJSON(),
                updatedAt: project.updatedAt.toJSON()
            })
        }
    };
};

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

export default function Editor({ project }: EditorProps) {
    const [activeLayerIndex, setActiveLayerIndex] = useState(0);
    const [fragmentSource, setFragmentSource] = useState<string>(project.layers[0].context);
    const [compilationError, setCompilationError] = useState<string | undefined>();

    const mainContainerClassNames = clsx(
        'absolute top-32 right-32 bottom-32 left-32 rounded-3xl bg-neutral-100 drop-shadow-2xl overflow-hidden border-2',
        {
            'border-red-400': !!compilationError
        }
    );

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
