/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars */

import { BlendingMode, Layer, Project, ProjectSchema } from '@usealma/types';
import { WebGLContext } from '@usealma/webgl';
import { enableMapSet, produce } from 'immer';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

enableMapSet();

import { ProjectProviderProps, ProjectContextValue } from './ProjectProvider.types';

export const defaultProjectContextValue: ProjectContextValue = {
    project: undefined,
    activeLayerId: undefined,
    setActiveLayerId: (layerId: string | undefined) => {},
    createLayer: (layer: Layer) => {},
    toggleLayer: (layerId: string, toggle: boolean) => {},
    renameLayer: (layerId: string, name: string) => {},
    updateLayerBlendingMode: (layerId: string, blendingMode: BlendingMode) => {},
    updateLayerContext: (layerId: string, context: string) => {},
    removeLayer: (layerId: string) => {},
    reorderLayers: (layers: Layer[]) => {},
    circuits: undefined,
    updateCircuits: (id: string, context: WebGLContext) => {},
    activeLayer: undefined,
    compilationError: undefined,
    handleCompilationError: (error: unknown) => {},
    handleCompilationSuccess: () => {}
};

export const ProjectContext = createContext(defaultProjectContextValue);

export const ProjectProvider = ({ projectId, children }: ProjectProviderProps) => {
    const [project, setProject] = useState<Project>();
    const [circuits, setCircuits] = useState<Map<string, WebGLContext>>(new Map<string, WebGLContext>());
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

    const removeLayer = useCallback(
        (layerId: string) => {
            const layerIndex = project?.layers.findIndex(layer => layer.id === layerId);

            setProject(
                produce(draft => {
                    if (draft) {
                        draft.layers = draft.layers.filter(layer => layerId !== layer.id);

                        if (typeof layerIndex !== 'undefined') {
                            const candidateIndex = layerIndex - 1 <= 0 ? 0 : layerIndex - 1;
                            const layerId = draft?.layers[candidateIndex]?.id;
                            setActiveLayerId(layerId);
                        }
                    }
                })
            );
        },
        [project]
    );

    const updateLayerBlendingMode = useCallback((layerId: string, blendingMode: BlendingMode) => {
        setProject(
            produce(draft => {
                if (draft) {
                    const index = draft.layers.findIndex(l => l.id === layerId);
                    draft.layers[index].blendingMode = blendingMode;
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
            createLayer,
            toggleLayer,
            renameLayer,
            removeLayer,
            updateLayerBlendingMode,
            updateLayerContext,
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
            createLayer,
            toggleLayer,
            renameLayer,
            removeLayer,
            updateLayerBlendingMode,
            updateLayerContext,
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

export const useProjectContext = () => useContext(ProjectContext);
