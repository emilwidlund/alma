'use client';

import { useQuery } from '@apollo/client';
import { Session } from '@supabase/auth-helpers-nextjs';
import { LayerSchema, Project } from '@usealma/types';
import { clsx } from 'clsx';
import { useMemo, useRef } from 'react';

import { PROJECT_QUERY } from '~/apollo/queries';
import { Banner } from '~/components/Banner/Banner';
import { EditorHeader } from '~/containers/EditorHeader/EditorHeader';
import { ProjectTabsContainer } from '~/containers/ProjectTabsContainer/ProjectTabsContainer';
import { useRenderer } from '~/hooks/useRenderer/useRenderer';
import { ProjectProvider, useProject } from '~/providers/ProjectProvider/ProjectProvider';

export type EditorProps = { initialSession: Session; project: Project };

function PreviewContainer() {
    const previewRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { projectId, handleCompilationError, compilationError, handleCompilationSuccess } = useProject();

    const { data: { project: projectFromQuery } = { project: undefined } } = useQuery(PROJECT_QUERY, {
        variables: {
            id: projectId
        }
    });

    const layers = useMemo(
        () => (projectFromQuery ? projectFromQuery.layers.map(layer => LayerSchema.parse(layer)) : []),
        [projectFromQuery]
    );

    useRenderer(canvasRef, layers, false, handleCompilationError, handleCompilationSuccess);

    const mainContainerClassNames = clsx('rounded-3xl bg-neutral-900 drop-shadow-2xl overflow-hidden border-2 mx-40', {
        'border-none': !compilationError,
        'border-red-400': !!compilationError
    });

    return (
        <main className="relative flex flex-col items-center justify-center grow w-full h-full">
            <div ref={previewRef} className={mainContainerClassNames}>
                <canvas ref={canvasRef} className="rounded-2xl bg-neutral-700" width={1280} height={720} />
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
    return (
        <ProjectProvider>
            <main className="flex flex-row h-screen">
                <div className="flex flex-col flex-grow">
                    <EditorHeader />
                    <div className="flex flex-row flex-grow items-center">
                        <ProjectTabsContainer />
                        <PreviewContainer />
                    </div>
                </div>
            </main>
        </ProjectProvider>
    );
}
