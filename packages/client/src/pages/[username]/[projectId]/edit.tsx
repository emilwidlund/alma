'use client';

import { useQuery } from '@apollo/client';
import { Session } from '@supabase/auth-helpers-nextjs';
import { Project } from '@usealma/types';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';

import { graphql } from '~/apollo/generated';
import { Banner } from '~/components/Banner/Banner';
import { PropertyPanel } from '~/components/PropertyPanel/PropertyPanel';
import { CircuitContainer } from '~/containers/CircuitContainer/CircuitContainer';
import { EditorHeader } from '~/containers/EditorHeader/EditorHeader';
import { FragmentEditor } from '~/containers/FragmentEditor/FragmentEditor';
import { ProjectTabsContainer } from '~/containers/ProjectTabsContainer/ProjectTabsContainer';
import { CircuitProvider } from '~/providers/CircuitProvider/CircuitProvider';
import { ModalProvider } from '~/providers/ModalProvider/ModalProvider';
import { ProjectProvider, useProject } from '~/providers/ProjectProvider/ProjectProvider';

export type EditorProps = { initialSession: Session; project: Project };

const editorContainerQuery = graphql(`
    query EditorContainer($id: ID!) {
        layer(id: $id) {
            ... on CircuitLayer {
                id
                type
            }
            ... on FragmentLayer {
                id
                type
            }
        }
    }
`);

const EditorContainer = () => {
    const circuitRef = useRef<HTMLDivElement>(null);
    const { activeLayerId, circuits, compilationError } = useProject();

    const { data: { layer: activeLayer } = { layer: undefined } } = useQuery(editorContainerQuery, {
        variables: {
            id: activeLayerId || ''
        }
    });

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
                        <ProjectTabsContainer />
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
};

export default function Editor() {
    return (
        <ProjectProvider>
            <ModalProvider>
                <EditorContainer />
            </ModalProvider>
        </ProjectProvider>
    );
}
