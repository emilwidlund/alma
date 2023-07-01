import { Layer } from '@/../types/build';
import { produce } from 'immer';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { ProjectProviderProps, ProjectContextValue } from './ProjectProvider.types';
import { ProjectSchema } from '~/models/Project/Project';
import { Project } from '~/models/Project/Project.types';

export const defaultProjectContextValue: ProjectContextValue = {
    project: undefined,
    activeLayerId: undefined,
    setActiveLayerId: (layerId: string | undefined) => {},
    createLayer: (layer: Layer) => {},
    toggleLayer: (layerId: string, toggle: boolean) => {},
    renameLayer: (layerId: string, name: string) => {},
    updateLayerContext: (layerId: string, context: string) => {},
    reorderLayers: (layers: Layer[]) => {},
    activeLayer: undefined
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
                    }
                });
        }
    }, [projectId]);

    const createLayer = useCallback(
        (layer: Layer) => {
            setProject(
                produce(draft => {
                    if (draft) {
                        draft.layers.push(layer);
                    }
                })
            );

            setActiveLayerId(layer.id);
        },
        [project]
    );

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
            activeLayer: project?.layers.find(layer => layer.id === activeLayerId)
        }),
        [
            project,
            activeLayerId,
            setActiveLayerId,
            createLayer,
            toggleLayer,
            renameLayer,
            updateLayerContext,
            reorderLayers
        ]
    );

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjectContext = () => useContext(ProjectContext);
