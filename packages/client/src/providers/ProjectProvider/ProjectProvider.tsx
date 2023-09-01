/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars */

import { Layer, Project } from '@usealma/types';
import { WebGLContext } from '@usealma/webgl';
import { enableMapSet, produce } from 'immer';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { ProjectProviderProps, ProjectContextValue } from './ProjectProvider.types';

enableMapSet();

export const defaultProjectContextValue: ProjectContextValue = {
    project: undefined,
    activeLayerId: undefined,
    reorderLayers: (layers: Layer[]) => {},
    circuits: undefined,
    updateCircuits: (id: string, context: WebGLContext) => {},
    activeLayer: undefined,
    compilationError: undefined,
    handleCompilationError: (error: unknown) => {},
    handleCompilationSuccess: () => {}
};

export const ProjectContext = createContext(defaultProjectContextValue);

export const ProjectProvider = ({ project: apolloProject, children }: ProjectProviderProps) => {
    const [project, setProject] = useState<Project | undefined>();
    const [circuits, setCircuits] = useState<Map<string, WebGLContext>>(new Map<string, WebGLContext>());
    const [activeLayerId, setActiveLayerId] = useState<string>();
    const [compilationError, setCompilationError] = useState<string>();

    useEffect(() => {
        if (apolloProject) {
            setProject(apolloProject);

            if (apolloProject.layers.length > 0) {
                const hasLayerId = apolloProject.layers.find(layer => layer.id === activeLayerId);

                if (!hasLayerId) {
                    setActiveLayerId(apolloProject?.layers[apolloProject.layers.length - 1].id);
                }
            }
        }
    }, [apolloProject]);

    const reorderLayers = useCallback((layers: Layer[]) => {
        setProject(
            produce(draft => {
                if (draft) {
                    draft.layers = layers;
                }
            })
        );
    }, []);

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
            project,
            setProject,
            activeLayerId,
            setActiveLayerId,
            reorderLayers,
            circuits,
            updateCircuits,
            activeLayer: project?.layers.find(layer => layer.id === activeLayerId),
            compilationError,
            handleCompilationError,
            handleCompilationSuccess
        }),
        [
            project,
            activeLayerId,
            setActiveLayerId,
            reorderLayers,
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
