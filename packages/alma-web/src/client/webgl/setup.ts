import { Sym } from '@thi.ng/shader-ast';
import { GLSLTarget } from '@thi.ng/shader-ast-glsl';
import { compileModel, defQuadModel, defShader, FX_SHADER_SPEC, ShaderFn } from '@thi.ng/webgl';

import { UVNode } from '../../nodes/webgl/core/UVNode/UVNode';
import { SimplexNoiseNode } from '../../nodes/webgl/noise/SimplexNoiseNode/SimplexNoiseNode';
import { WebGLContext } from '../models/WebGLContext/WebGLContext';
import { IUniforms } from '../models/WebGLContext/WebGLContext.types';

export const setupWebGL = (ctx: WebGLRenderingContext, size: { width: number; height: number }) => {
    const compileFragmentShader = (): ShaderFn => {
        return (
            gl: GLSLTarget,
            uniforms: Record<string, Sym<any>>,
            _: Record<string, Sym<any>>,
            outs: Record<string, Sym<any>>
        ) => {
            const a = new WebGLContext(gl, uniforms as unknown as IUniforms);

            const uv = new UVNode(a);
            a.add(uv);

            const simplexNoise = new SimplexNoiseNode(a);
            a.add(simplexNoise);

            uv.outputs.uv.connect(simplexNoise.inputs.uv);

            simplexNoise.outputs.output.connect(a.root.inputs.color);

            const serialized = JSON.parse(JSON.stringify(a));

            const restored = new WebGLContext(gl, uniforms as unknown as IUniforms, serialized);

            console.log(serialized);

            return restored.render(outs);
        };
    };

    const model = compileModel(ctx, {
        ...defQuadModel({ uv: false }),
        shader: defShader(ctx, {
            ...FX_SHADER_SPEC,
            fs: compileFragmentShader(),
            uniforms: {
                resolution: ['vec2', [size.width, size.height]],
                time: ['float', 0],
                mouse: ['vec2', [0, 0]]
            }
        })
    });

    return model;
};
