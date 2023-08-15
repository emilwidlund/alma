import { render } from '@usealma/renderer';
import { Layer } from '@usealma/types';
import { useEffect, RefObject } from 'react';
import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';

export const useRenderer = (
    ref: RefObject<HTMLCanvasElement>,
    layers: Layer[],
    onFragmentCompilationError?: (error: unknown) => void,
    onFragmentCompilationSuccess?: () => void
) => {
    const { updateCircuits } = useProjectContext();

    useEffect(() => {
        const context = ref.current?.getContext('webgl2');

        if (!context) {
            throw new Error('WebGL2 Context could not be retrieved');
        }

        const renderer = render(
            context,
            layers,
            updateCircuits,
            { uResolution: ['vec2', [context.drawingBufferWidth, context.drawingBufferHeight]] },
            onFragmentCompilationError,
            onFragmentCompilationSuccess
        );

        return () => {
            renderer.dispose();
        };
    }, [ref, layers, onFragmentCompilationError, onFragmentCompilationSuccess]);
};
