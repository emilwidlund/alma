import { assign, defMain, FLOAT0, FLOAT1, vec4 } from '@thi.ng/shader-ast';
import {
    defQuadModel,
    defShader,
    defTexture,
    draw,
    ModelSpec,
    ShaderSpec,
    Texture,
    TextureFilter,
    defFBO,
    compileModel,
    ShaderUniformSpecs,
    BLEND_NORMAL
} from '@thi.ng/webgl';
import { Context, Layer } from '@usealma/types';

import { RenderDisposer, RenderSequence } from './Renderer.types';

const createShaderSpec = (
    context: Context,
    uniforms?: ShaderUniformSpecs,
    textures?: [string, Texture][]
): ShaderSpec => {
    const textureUniforms = textures?.reduce((acc, [key], index) => {
        return { ...acc, [key]: ['sampler2D', index] };
    }, {});

    return {
        vs: (gl, _, ins, outs) => [
            defMain(() => [assign(outs.vUv, ins.uv), assign(gl.gl_Position, vec4(ins.position, FLOAT0, FLOAT1))])
        ],
        fs: context,
        uniforms: {
            uTime: ['float', 0],
            ...uniforms,
            ...textureUniforms
        },
        attribs: { position: 'vec2', uv: 'vec2' },
        varying: { vUv: 'vec2' },
        state: {
            blend: true,
            blendFn: BLEND_NORMAL
        }
        // generateDecls: true
    };
};

const createModel = (gl: WebGL2RenderingContext, shaderSpec: ShaderSpec, textures: Texture[]): ModelSpec => {
    return compileModel(gl, {
        ...defQuadModel({ uv: true }),
        shader: defShader(gl, shaderSpec),
        textures
    });
};

export const render = (
    gl: WebGL2RenderingContext,
    layers: Layer[],
    uniforms?: ShaderUniformSpecs,
    onError?: (err: unknown) => void,
    onSuccess?: () => void
): { sequence: RenderSequence; dispose: RenderDisposer } => {
    let error: unknown;

    const { sequence } = layers
        .filter(layer => layer.enabled)
        .reduce<{ sequence: RenderSequence; previousLayerTexture: Texture | undefined }>(
            (
                {
                    sequence,
                    previousLayerTexture
                }: { sequence: RenderSequence; previousLayerTexture: Texture | undefined },
                currentLayer: Layer,
                index: number,
                entities
            ): { sequence: RenderSequence; previousLayerTexture: Texture | undefined } => {
                try {
                    const shouldRenderToCanvas = index === entities.length - 1;

                    const renderTarget = shouldRenderToCanvas
                        ? gl.canvas
                        : defTexture(gl, {
                              width: gl.drawingBufferWidth,
                              height: gl.drawingBufferHeight,
                              filter: TextureFilter.LINEAR,
                              image: null
                          });

                    const shaderSpec = createShaderSpec(
                        currentLayer.context,
                        uniforms,
                        previousLayerTexture ? [['uPreviousLayer', previousLayerTexture]] : undefined
                    );

                    const model = createModel(gl, shaderSpec, previousLayerTexture ? [previousLayerTexture] : []);

                    const fbo = renderTarget instanceof Texture ? defFBO(gl, { tex: [renderTarget] }) : undefined;

                    if (!error) {
                        onSuccess?.();
                    }

                    return {
                        sequence: [...sequence, { model, fbo }],
                        previousLayerTexture: renderTarget instanceof Texture ? renderTarget : undefined
                    };
                } catch (err) {
                    onError?.(err);
                    console.error(err);
                    error = err;
                    return { sequence, previousLayerTexture };
                }
            },
            { sequence: [], previousLayerTexture: undefined }
        );

    let animationFrame: number;
    const startTime = Date.now();

    const update = () => {
        animationFrame = requestAnimationFrame(update);

        for (const { model, fbo } of sequence) {
            fbo?.bind();

            model.uniforms!.uTime = (Date.now() - startTime) / 1000;

            draw(model);
            fbo?.unbind();
        }
    };

    if (!error) {
        animationFrame = requestAnimationFrame(update);
    }

    return {
        sequence,
        dispose: () => {
            cancelAnimationFrame(animationFrame);
        }
    };
};
