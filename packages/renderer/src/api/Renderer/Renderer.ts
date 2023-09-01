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
    ShaderFn,
    Shader,
    BlendFunc
} from '@thi.ng/webgl';
import { BlendingMode, Layer } from '@usealma/types';
import { nodes, TextureResolver, WebGLContext } from '@usealma/webgl';

import { RenderDisposer, RenderSequence } from './Renderer.types';
import { BlendFn } from '../Blend/Blend';

const createShaderSpec = (
    gl: WebGL2RenderingContext,
    fragmentSource: string | ShaderFn,
    blendingMode: BlendingMode,
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
        fs: fragmentSource,
        uniforms: {
            uResolution: ['vec2', [gl.drawingBufferWidth, gl.drawingBufferHeight]],
            uTime: ['float', 0],
            ...uniforms,
            ...textureUniforms
        },
        attribs: { position: 'vec2', uv: 'vec2' },
        varying: { vUv: 'vec2' },
        state: {
            blend: true,
            blendFn: BlendFn[blendingMode] as BlendFunc
        }
        // generateDecls: true
    };
};

const createModel = (gl: WebGL2RenderingContext, shader: Shader, textures: Texture[]): ModelSpec => {
    return compileModel(gl, {
        ...defQuadModel({ uv: true }),
        shader,
        textures
    });
};

export const render = (
    gl: WebGL2RenderingContext,
    layers: Layer[],
    updateCircuits: (id: string, circuit: WebGLContext) => void,
    staticRender = false,
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

                    const isCircuitContext = 'circuit' in currentLayer;
                    let fragmentSource: string | ShaderFn;
                    let context: WebGLContext | undefined;

                    if (isCircuitContext) {
                        const video = document.createElement('video');
                        const webcamCanvas = document.createElement('canvas');
                        const webcamImage = new Image();

                        const onCameraResolverInit = () => {
                            return new Promise<void>(resolve => {
                                video.width = gl.drawingBufferWidth;
                                video.height = gl.drawingBufferHeight;
                                webcamCanvas.width = gl.drawingBufferWidth;
                                webcamCanvas.height = gl.drawingBufferHeight;
                                video.autoplay = true;
                                navigator.mediaDevices
                                    .getUserMedia({
                                        video: { width: gl.drawingBufferWidth, height: gl.drawingBufferHeight }
                                    })
                                    .then(stream => {
                                        video.srcObject = stream;
                                        resolve();
                                    });
                            });
                        };

                        const cameraTextureResolver = () => {
                            webcamCanvas
                                .getContext('2d')
                                ?.drawImage(video, 0, 0, webcamCanvas.width, webcamCanvas.height);

                            webcamImage.src = webcamCanvas.toDataURL('image/jpeg');

                            return webcamImage;
                        };

                        const textureResolver: TextureResolver = (uri?: string) =>
                            new Promise((resolve, reject) => {
                                const image = new Image();
                                image.crossOrigin = 'anonymous';
                                image.onload = () => resolve(image);
                                image.src = uri || '';
                            });

                        // @ts-ignore
                        context = new WebGLContext(gl, {
                            cameraManager: {
                                onInit: onCameraResolverInit,
                                textureResolver: cameraTextureResolver
                            },
                            textureManager: {
                                textureResolver: textureResolver
                            },
                            nodesCollection: nodes,
                            ...structuredClone(currentLayer.circuit)
                        });
                        fragmentSource = context.compileGraph.bind(context);
                    } else {
                        fragmentSource = currentLayer.fragment;
                    }

                    const shaderSpec = createShaderSpec(
                        gl,
                        fragmentSource,
                        currentLayer.blendingMode,
                        uniforms,
                        previousLayerTexture ? [['uPreviousLayer', previousLayerTexture]] : undefined
                    );

                    let shader = defShader(gl, shaderSpec);

                    if (context) {
                        context.root = context.initialize();
                        shader = defShader(gl, shaderSpec);
                    }

                    const model = createModel(gl, shader, previousLayerTexture ? [previousLayerTexture] : []);

                    if (context) {
                        context.model = model;
                        context.model.uniforms!['uResolution'] = [gl.drawingBufferWidth, gl.drawingBufferHeight];

                        updateCircuits(currentLayer.id, context);
                    }

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
        if (!staticRender) {
            animationFrame = requestAnimationFrame(update);
        }

        const time = (Date.now() - startTime) / 1000;

        for (const { model, fbo } of sequence) {
            model.uniforms!.uTime = time;

            // Draw to separate rendering texture if such exist
            if (fbo) {
                fbo.bind();
                draw(model);
                fbo.unbind();
            }

            // Draw to GL context
            draw(model);
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
