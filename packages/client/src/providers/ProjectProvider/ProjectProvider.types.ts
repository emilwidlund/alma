import { Layer } from '@/../types/build';
import { PropsWithChildren } from 'react';

import { Project } from '~/models/Project/Project.types';

export type ProjectProviderProps = PropsWithChildren<{
    projectId: string | undefined;
}>;

export type ProjectContextValue = {
    project: Project | undefined;
    activeLayer: Layer | undefined;
    activeLayerId: string | undefined;
    setActiveLayerId(layerId: string | undefined): void;
    createLayer(layer: Layer): void;
    toggleLayer(layerId: string, toggle: boolean): void;
    renameLayer(layerId: string, name: string): void;
    updateLayerContext(layerId: string, context: string): void;
    reorderLayers(layers: Layer[]): void;
    compilationError: string | undefined;
    handleCompilationError(error: unknown): void;
    handleCompilationSuccess(): void;
};
