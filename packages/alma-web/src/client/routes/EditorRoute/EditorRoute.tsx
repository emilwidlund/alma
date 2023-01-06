import { fromRAF } from '@thi.ng/rstream';
import { Layer, Circuit, createRenderSequence, render, nodes, CompositionNode, LayerType } from 'alma-webgl';
import * as React from 'react';

import { Icon } from '../../components/Icon/Icon';
import { Scene } from '../../components/Scene/Scene';
import { LayerPanel } from '../../containers/LayerPanel/LayerPanel';
import {
    editorArtboardWrapperStyles,
    editorRouteWrapperStyles,
    editorToolbarWrapperStyles
} from './EditorRoute.styles';

const testShader = `void main() {
    // Time varying pixel color
    vec3 col = 0.5 + 0.5 * cos(time * .01 + v_uv.xyx + vec3(0., 2., 4.));

    // Output to screen
    fragColor = vec4(col, 1.0);
}`;

export const EditorRoute = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [layers, setLayers] = React.useState<Layer[]>([]);

    React.useEffect(() => {
        if (canvasRef.current) {
            const gl = canvasRef.current.getContext('webgl2');

            if (!gl) {
                throw new Error('WebGL Context could not be created');
            }

            const circuit = new Circuit(gl, {
                name: 'First Circuit',
                textureManager: { textureResolver: () => new Image() },
                cameraManager: { textureResolver: () => new Image() },
                nodesCollection: nodes
            });

            const circuit2 = new Circuit(gl, {
                name: 'Sampler Circuit',
                textureManager: { textureResolver: () => new Image() },
                cameraManager: { textureResolver: () => new Image() },
                nodesCollection: nodes
            });

            const layers: Layer[] = [
                new Layer({ type: LayerType.SOURCE, context: testShader }),
                new Layer({
                    context: circuit
                }),
                new Layer({
                    context: circuit2
                })
            ];

            const comp = new CompositionNode(circuit);
            comp.outputs.texture.connect(circuit.root.inputs.color);

            const comp2 = new CompositionNode(circuit2);
            comp2.outputs.texture.connect(circuit2.root.inputs.color);

            const sequence = createRenderSequence(gl, layers);

            setLayers(layers);

            fromRAF().subscribe({
                next(t) {
                    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

                    gl.clearColor(0, 0, 0, 1);
                    gl.clear(gl.COLOR_BUFFER_BIT);

                    render(sequence, t);
                }
            });
        }
    }, [setLayers]);

    return (
        <Scene className={editorRouteWrapperStyles}>
            <div className={editorToolbarWrapperStyles}>
                <Icon name="face" size={24} />
            </div>
            <div className={editorArtboardWrapperStyles}>
                <canvas ref={canvasRef} width={720} height={480} />
            </div>
            <LayerPanel layers={layers.reverse()} />
        </Scene>
    );
};
