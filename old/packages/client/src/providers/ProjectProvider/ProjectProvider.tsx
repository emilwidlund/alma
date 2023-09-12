/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars */

import { WebGLContext } from '@usealma/webgl';
import { enableMapSet, produce } from 'immer';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

import { ProjectContextValue } from './ProjectProvider.types';

enableMapSet();

export const defaultProjectContextValue: ProjectContextValue = {
    projectId: '',
    activeLayerId: null,
    circuits: undefined,
    updateCircuits: (id: string, context: WebGLContext) => {},
    compilationError: undefined,
    handleCompilationError: (error: unknown) => {},
    handleCompilationSuccess: () => {}
};

export const ProjectContext = createContext(defaultProjectContextValue);

export const ProjectProvider = ({ children }: PropsWithChildren) => {
    const [circuits, setCircuits] = useState<Map<string, WebGLContext>>(new Map<string, WebGLContext>());
    const [compilationError, setCompilationError] = useState<string>();

    const {
        query: { projectId: projectIdFromQuery }
    } = useRouter();

    const projectId = typeof projectIdFromQuery === 'string' ? projectIdFromQuery : '';

    const params = useSearchParams();
    const activeLayerId = params.get('activeLayerId');

    const updateCircuits = useCallback(
        (id: string, circuit: WebGLContext) => {
            setCircuits(
                produce(draft => {
                    draft.set(id, circuit as any);
                })
            );
        },
        [setCircuits]
    );

    const handleCompilationError = useCallback(
        (error: unknown) => {
            setCompilationError((error as Error).message);
        },
        [setCompilationError]
    );

    const handleCompilationSuccess = useCallback(() => {
        setCompilationError(undefined);
    }, [setCompilationError]);

    const value: ProjectContextValue = useMemo(
        () => ({
            projectId,
            activeLayerId,
            circuits,
            updateCircuits,
            compilationError,
            handleCompilationError,
            handleCompilationSuccess
        }),
        [
            projectId,
            activeLayerId,
            circuits,
            updateCircuits,
            compilationError,
            handleCompilationError,
            handleCompilationSuccess
        ]
    );

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProject = () => useContext(ProjectContext);
