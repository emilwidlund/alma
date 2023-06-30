import { Layer } from '@/../types/build';
import { PropsWithChildren } from 'react';
import { Project } from '~/models/Project/Project.types';

export type ProjectProviderProps = PropsWithChildren<{
    projectId: string | undefined;
}>;

export type ProjectProviderValue = {
    project: Project | undefined;
    activeLayerIndex: number;
    setActiveLayerIndex(layerIndex: number): void;
    createLayer(layer: Layer): void;
    updateLayer(layer: Layer): void;
    activeLayer: Layer | undefined;
};
