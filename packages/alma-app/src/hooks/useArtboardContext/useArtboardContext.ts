import { draw, ModelSpec } from '@thi.ng/webgl';
import { nodes, SimplexNoiseNode, TimeNode, UVNode, Vector2Node, WebGLContext } from 'alma-webgl';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { useCallback, useRef } from 'react';

export const useArtboardContext = () => {
    const glRef = useRef<GLView>(null);
    const frameId = useRef<number>();
    const renderingStartedTimestamp = useRef<number>();

    const renderingLoop = useCallback((gl: ExpoWebGLRenderingContext, model: ModelSpec) => {
        frameId.current = requestAnimationFrame(renderingLoop.bind(this, gl, model));

        if (renderingStartedTimestamp.current) {
            model.uniforms!.time = (Date.now() - renderingStartedTimestamp.current) * 0.001;
        }

        draw(model);
    }, []);

    const onContextCreate = useCallback(async (gl: ExpoWebGLRenderingContext) => {
        const context = new WebGLContext(gl, {
            nodesCollection: nodes,
            cameraManager: {
                textureResolver: () => null
            },
            textureManager: {
                textureResolver: () => null
            },
            onFrameEnd: () => {
                gl.endFrameEXP();
            }
        });

        const uv = new UVNode(context);
        const noise = new SimplexNoiseNode(context);

        const time = new TimeNode(context);
        const vec = new Vector2Node(context);

        time.outputs.time.connect(vec.inputs.x);
        vec.outputs.vector2.connect(noise.inputs.shift);
        uv.outputs.uv.connect(noise.inputs.uv);
        noise.outputs.output.connect(context.root.inputs.color);
    }, []);

    return {
        glRef,
        onContextCreate
    };
};
