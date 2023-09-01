import { WebGLContext } from '@usealma/webgl';

export type ProjectContextValue = {
    projectId: string;
    activeLayerId: string | null;
    circuits?: Map<string, WebGLContext>;
    updateCircuits(id: string, context: WebGLContext): void;
    compilationError: string | undefined;
    handleCompilationError(error: unknown): void;
    handleCompilationSuccess(): void;
};
