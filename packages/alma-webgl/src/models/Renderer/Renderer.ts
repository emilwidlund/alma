import {
    defQuadModel,
    defShader,
    defTexture,
    draw,
    ModelSpec,
    PASSTHROUGH_VS_UV,
    ShaderSpec,
    Texture,
    TextureFilter,
    defFBO,
    compileModel
} from '@thi.ng/webgl';

import { compileCircuit } from '../Circuit/Circuit';
import { Layer } from '../Layer/Layer';
import { LayerContext } from '../Layer/Layer.types';
import { RenderSequence } from './Renderer.types';

const createShaderSpec = (
    gl: WebGL2RenderingContext,
    context: LayerContext,
    textures?: [string, Texture][]
): ShaderSpec => {
    const textureUniforms = textures?.reduce((acc, [key, value], index) => {
        return { ...acc, [key]: ['sampler2D', index] };
    }, {});

    return {
        vs: PASSTHROUGH_VS_UV,
        fs: typeof context === 'string' ? context : compileCircuit(context),
        uniforms: {
            resolution: ['vec2', [0, 0]],
            time: ['float', 0],
            mouse: ['vec2', [0, 0]],
            ...textureUniforms
        },
        attribs: { position: 'vec2', uv: 'vec2' },
        varying: { v_uv: 'vec2' }
    };
};

const createModel = (gl: WebGL2RenderingContext, shaderSpec: ShaderSpec, textures: Texture[]): ModelSpec => {
    return compileModel(gl, {
        ...defQuadModel({ uv: true }),
        shader: defShader(gl, shaderSpec),
        textures
    });
};

export const createRenderSequence = (gl: WebGL2RenderingContext, layers: Layer[]) => {
    const { sequence } = layers.reduce<{ sequence: RenderSequence; previousLayerTexture: Texture | undefined }>(
        (
            { sequence, previousLayerTexture }: { sequence: RenderSequence; previousLayerTexture: Texture | undefined },
            currentLayer: Layer,
            index: number
        ): { sequence: RenderSequence; previousLayerTexture: Texture | undefined } => {
            const shouldRenderToCanvas = index === layers.length - 1;

            const renderTarget = shouldRenderToCanvas
                ? gl.canvas
                : defTexture(gl, {
                      width: gl.drawingBufferWidth,
                      height: gl.drawingBufferHeight,
                      filter: TextureFilter.LINEAR,
                      image: null
                  });

            const shaderSpec = createShaderSpec(
                gl,
                currentLayer.context,
                previousLayerTexture ? [['previousTexture', previousLayerTexture]] : undefined
            );

            const model = createModel(gl, shaderSpec, previousLayerTexture ? [previousLayerTexture] : []);
            const fbo = renderTarget instanceof Texture ? defFBO(gl, { tex: [renderTarget] }) : undefined;

            return {
                sequence: [...sequence, { model, fbo }],
                previousLayerTexture: renderTarget instanceof Texture ? renderTarget : undefined
            };
        },
        { sequence: [], previousLayerTexture: undefined }
    );

    return sequence;
};

export const render = (sequence: RenderSequence, t: number) => {
    for (const { model, fbo } of sequence) {
        model.uniforms!.time = t;

        fbo?.bind();
        draw(model);
        fbo?.unbind();
    }
};
