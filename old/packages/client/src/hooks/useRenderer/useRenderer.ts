import { render } from '@usealma/renderer';
import { Layer } from '@usealma/types';
import { useEffect, RefObject } from 'react';

import { useProject } from '~/providers/ProjectProvider/ProjectProvider';

export const useRenderer = (
    ref: RefObject<HTMLCanvasElement>,
    layers: Layer[],
    staticRender = false,
    onFragmentCompilationError?: (error: unknown) => void,
    onFragmentCompilationSuccess?: () => void
) => {
    const { updateCircuits } = useProject();

    useEffect(() => {
        if (ref.current) {
            const { width, height } = ref.current.getBoundingClientRect();
            ref.current.width = width;
            ref.current.height = height;
        }

        const context = ref.current?.getContext('webgl2');

        if (!context) {
            throw new Error('WebGL2 Context could not be retrieved');
        }

        const renderer = render(
            context,
            layers,
            updateCircuits,
            staticRender,
            { uResolution: ['vec2', [context.drawingBufferWidth, context.drawingBufferHeight]] },
            onFragmentCompilationError,
            onFragmentCompilationSuccess
        );

        return () => {
            renderer.dispose();
        };
    }, [ref, layers, onFragmentCompilationError, onFragmentCompilationSuccess, updateCircuits, staticRender]);
};
