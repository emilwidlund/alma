/* eslint-disable @typescript-eslint/no-empty-function */
import { Layer, Project, ProjectSchema } from '@usealma/types';
import { produce } from 'immer';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { ProjectProviderProps, ProjectContextValue } from './ProjectProvider.types';

export const defaultProjectContextValue: ProjectContextValue = {
    project: undefined,
    activeLayerId: undefined,
    setActiveLayerId: (layerId: string | undefined) => {},
    createLayer: (layer: Layer) => {},
    toggleLayer: (layerId: string, toggle: boolean) => {},
    renameLayer: (layerId: string, name: string) => {},
    updateLayerContext: (layerId: string, context: string) => {},
    reorderLayers: (layers: Layer[]) => {},
    activeLayer: undefined,
    compilationError: undefined,
    handleCompilationError: (error: unknown) => {},
    handleCompilationSuccess: () => {}
};

export const ProjectContext = createContext(defaultProjectContextValue);

export const ProjectProvider = ({ projectId, children }: ProjectProviderProps) => {
    const [project, setProject] = useState<Project>();
    const [activeLayerId, setActiveLayerId] = useState<string>();
    const [compilationError, setCompilationError] = useState<string>();

    useEffect(() => {
        if (projectId) {
            fetch(`/api/project/${projectId}`)
                .then(v => v.json())
                .then((project: Project) => {
                    if (ProjectSchema.parse(project)) {
                        setProject(project);

                        if (project.layers.length > 0) {
                            setActiveLayerId(project.layers[project.layers.length - 1].id);
                        }
                    }
                });
        }
    }, [projectId]);

    const createLayer = useCallback((layer: Layer) => {
        setProject(
            produce(draft => {
                if (draft) {
                    draft.layers.push(layer);
                }
            })
        );

        setActiveLayerId(layer.id);
    }, []);

    const toggleLayer = useCallback((layerId: string, toggle: boolean) => {
        setProject(
            produce(draft => {
                if (draft) {
                    const index = draft.layers.findIndex(l => l.id === layerId);
                    draft.layers[index].enabled = toggle;
                }
            })
        );
    }, []);

    const updateLayerContext = useCallback((layerId: string, context: string) => {
        setProject(
            produce(draft => {
                if (draft) {
                    const index = draft.layers.findIndex(l => l.id === layerId);
                    draft.layers[index].context = context;
                }
            })
        );
    }, []);

    const renameLayer = useCallback((layerId: string, name: string) => {
        setProject(
            produce(draft => {
                if (draft) {
                    const index = draft.layers.findIndex(l => l.id === layerId);
                    draft.layers[index].name = name;
                }
            })
        );
    }, []);

    const reorderLayers = useCallback((layers: Layer[]) => {
        setProject(
            produce(draft => {
                if (draft) {
                    draft.layers = layers;
                }
            })
        );
    }, []);

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
            createLayer,
            toggleLayer,
            renameLayer,
            updateLayerContext,
            reorderLayers,
            activeLayer: project?.layers.find(layer => layer.id === activeLayerId),
            compilationError,
            handleCompilationError,
            handleCompilationSuccess
        }),
        [
            project,
            activeLayerId,
            setActiveLayerId,
            createLayer,
            toggleLayer,
            renameLayer,
            updateLayerContext,
            reorderLayers,
            compilationError,
            handleCompilationError,
            handleCompilationSuccess
        ]
    );

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjectContext = () => useContext(ProjectContext);