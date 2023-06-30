import { Layer } from '@/../types/build';
import { produce } from 'immer';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ProjectSchema } from '~/models/Project/Project';
import { Project } from '~/models/Project/Project.types';
import { ProjectProviderProps, ProjectProviderValue } from './ProjectProvider.types';

export const defaultProjectContextValue: ProjectProviderValue = {
    project: undefined,
    activeLayerIndex: -1,
    setActiveLayerIndex: () => {},
    createLayer: (layer: Layer) => {},
    updateLayer: (layer: Layer) => {},
    activeLayer: undefined
};

export const ProjectContext = createContext(defaultProjectContextValue);

export const ProjectProvider = ({ projectId, children }: ProjectProviderProps) => {
    const [project, setProject] = useState<Project>();
    const [activeLayerIndex, setActiveLayerIndex] = useState(-1);
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

    const updateLayer = useCallback(
        (layer: Layer) => {
            setProject(
                produce(draft => {
                    if (draft) {
                        const index = draft.layers.findIndex(l => l.id === layer.id);
                        draft.layers[index] = layer;
                    }
                })
            );
        },
        [activeLayerIndex]
    );

    const createLayer = useCallback((layer: Layer) => {
        setProject(
            produce(draft => {
                if (draft) {
                    draft.layers.push(layer);
                }
            })
        );
    }, []);

    const value = useMemo(
        () => ({
            project,
            setProject,
            activeLayerIndex,
            setActiveLayerIndex,
            createLayer,
            updateLayer,
            activeLayer: project?.layers[activeLayerIndex]
        }),
        [project, activeLayerIndex, updateLayer]
    );

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjectContext = () => useContext(ProjectContext);
