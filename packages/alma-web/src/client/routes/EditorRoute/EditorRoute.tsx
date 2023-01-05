import { createRenderSequence } from 'alma-core';
import * as React from 'react';

import { Scene } from '../../components/Scene/Scene';

const layers = [{ id: '123', name: 'Test', context: '', enabled: true, blendingMode: 'NORMAL' }];

export const EditorRoute = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            const gl = canvasRef.current.getContext('webgl2');

            if (!gl) {
                throw new Error('WebGL Context could not be created');
            }

            const sequence = createRenderSequence(gl, layers);

            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }
    }, []);

    return (
        <Scene>
            <div></div>
            <div>
                <canvas ref={canvasRef} width={720} height={480} />
            </div>
            <div></div>
        </Scene>
    );
};
