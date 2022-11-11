import { float, Sym } from '@thi.ng/shader-ast';
import { GLSLTarget } from '@thi.ng/shader-ast-glsl';
import { compileModel, defQuadModel, defShader, FX_SHADER_SPEC, ShaderFn } from '@thi.ng/webgl';

import { TimeNode } from '../../nodes/webgl/core/TimeNode/TimeNode';
import { UVNode } from '../../nodes/webgl/core/UVNode/UVNode';
import { ModuloNode } from '../../nodes/webgl/math/ModuloNode/ModuloNode';
import { SimplexNoiseNode } from '../../nodes/webgl/noise/SimplexNoiseNode/SimplexNoiseNode';
import { WebGLContext } from './models/WebGLContext/WebGLContext';
import { IUniforms } from './models/WebGLContext/WebGLContext.types';

export const setupWebGL = (canvas: HTMLCanvasElement | null) => {
    let context: WebGLContext;

    const ctx = canvas?.getContext('webgl');

    if (!canvas || !ctx) {
        throw new Error('WebGL Context could not be initialized');
    }

    const compileFragmentShader = (): ShaderFn => {
        return (
            gl: GLSLTarget,
            uniforms: Record<string, Sym<any>>,
            _: Record<string, Sym<any>>,
            outs: Record<string, Sym<any>>
        ) => {
            context = new WebGLContext(gl, uniforms as unknown as IUniforms);

            const time = new TimeNode(context, { data: { position: { x: 60, y: 500 } } });
            const modulo = new ModuloNode(context, { data: { position: { x: 400, y: 500 } } });
            time.outputs.time.connect(modulo.inputs.a);
            modulo.inputs.b.value = float(2);

            const uv = new UVNode(context, { data: { position: { x: 120, y: 750 } } });
            const simplexNoise = new SimplexNoiseNode(context, { data: { position: { x: 800, y: 600 } } });

            context.root.data.position = { x: 1200, y: 600 };

            modulo.outputs.result.connect(simplexNoise.inputs.decay);

            uv.outputs.uv.connect(simplexNoise.inputs.uv);
            simplexNoise.outputs.output.connect(context.root.inputs.color);

            const serialized = JSON.parse(JSON.stringify(context));
            const restored = new WebGLContext(gl, uniforms as unknown as IUniforms, serialized);

            context = restored;

            return context.render(outs);
        };
    };

    const model = compileModel(ctx, {
        ...defQuadModel({ uv: false }),
        shader: defShader(ctx, {
            ...FX_SHADER_SPEC,
            fs: compileFragmentShader(),
            uniforms: {
                resolution: ['vec2', [ctx.drawingBufferWidth, ctx.drawingBufferHeight]],
                time: ['float', 0],
                mouse: ['vec2', [0, 0]]
            }
        })
    });

    // @ts-ignore
    return { model, context };
};
