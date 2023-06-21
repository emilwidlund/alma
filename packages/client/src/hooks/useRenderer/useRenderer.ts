import { render, Layer } from '@usealma/renderer';
import { useEffect, RefObject } from 'react';

export const useRenderer = (
    ref: RefObject<HTMLCanvasElement>,
    layers: Layer[],
    onFragmentCompilationError?: () => void
) => {
    useEffect(() => {
        const context = ref.current?.getContext('webgl2');

        if (!context) {
            throw new Error('WebGL2 Context could not be retrieved');
        }

        const renderer = render(
            context,
            layers,
            { uResolution: ['vec2', [context.drawingBufferWidth, context.drawingBufferHeight]] },
            onFragmentCompilationError
        );

        return () => {
            renderer.dispose();
        };
    }, [ref, layers, onFragmentCompilationError]);
};
