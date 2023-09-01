import { BlendingMode, Layer, Project } from '@usealma/types';
import { WebGLContext } from '@usealma/webgl';
import { PropsWithChildren } from 'react';

export type ProjectProviderProps = PropsWithChildren<{
    project: Project | undefined;
}>;

export type ProjectContextValue = {
    project: Project | undefined;
    activeLayer: Layer | undefined;
    activeLayerId: string | undefined;
    circuits?: Map<string, WebGLContext>;
    setActiveLayerId(layerId: string | undefined): void;
    createLayer(layer: Layer): void;
    toggleLayer(layerId: string, toggle: boolean): void;
    renameLayer(layerId: string, name: string): void;
    removeLayer(layerId: string): void;
    updateLayerBlendingMode(layerId: string, blendingMode: BlendingMode): void;
    updateLayerContext(layerId: string, context: string): void;
    reorderLayers(layers: Layer[]): void;
    updateCircuits(id: string, context: WebGLContext): void;
    compilationError: string | undefined;
    handleCompilationError(error: unknown): void;
    handleCompilationSuccess(): void;
};
