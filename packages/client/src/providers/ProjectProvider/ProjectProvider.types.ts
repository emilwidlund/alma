import { Layer, Project } from '@usealma/types';
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
    reorderLayers(layers: Layer[]): void;
    updateCircuits(id: string, context: WebGLContext): void;
    compilationError: string | undefined;
    handleCompilationError(error: unknown): void;
    handleCompilationSuccess(): void;
};
